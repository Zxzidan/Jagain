<?php

namespace App\Services;

use App\Enums\AssignmentStatus;
use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Models\Agency;
use App\Models\Assignment;
use App\Models\AssignmentHistory;
use App\Models\OperationalUpdate;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class AssignmentService
{
    public function __construct(
        protected AuditLogService $auditLogService
    ) {}

    /**
     * Dispatch/Assign a report to an official agency.
     */
    public function assignReport(
        Report $report,
        Agency $agency,
        User $actor,
        ?string $notes = null
    ): Assignment {
        return DB::transaction(function () use ($report, $agency, $actor, $notes) {
            $assignment = Assignment::create([
                'report_id' => $report->id,
                'agency_id' => $agency->id,
                'assigned_by_user_id' => $actor->id,
                'assignment_status' => AssignmentStatus::ASSIGNED,
                'assigned_at' => now(),
                'notes' => $notes,
            ]);

            AssignmentHistory::create([
                'assignment_id' => $assignment->id,
                'from_status' => null,
                'to_status' => AssignmentStatus::ASSIGNED->value,
                'actor_user_id' => $actor->id,
                'reason' => 'Penugasan baru oleh Admin',
                'note' => $notes,
                'created_at' => now(),
            ]);

            // Transition report to DISPATCHED if not already in dispatched or further
            if ($report->report_status !== ReportStatus::DISPATCHED) {
                $previousReportStatus = $report->report_status;
                $report->report_status = ReportStatus::DISPATCHED;
                $report->save();

                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => $previousReportStatus->value,
                    'to_status' => ReportStatus::DISPATCHED->value,
                    'actor_user_id' => $actor->id,
                    'reason' => "Ditugaskan kepada {$agency->name}",
                    'note' => $notes,
                    'created_at' => now(),
                ]);
            }

            $this->auditLogService->record(
                action: 'ASSIGNMENT_CREATED',
                entity: $assignment,
                before: null,
                after: [
                    'report_id' => $report->id,
                    'agency_id' => $agency->id,
                    'agency_name' => $agency->name,
                    'assignment_status' => AssignmentStatus::ASSIGNED->value,
                ],
                reason: $notes,
                actor: $actor
            );

            return $assignment;
        });
    }

    /**
     * Agency officer accepts or declines assignment.
     */
    public function respondToAssignment(
        Assignment $assignment,
        AssignmentStatus $targetStatus,
        User $actor,
        ?string $declineReason = null
    ): Assignment {
        if (! $assignment->assignment_status->canTransitionTo($targetStatus)) {
            throw new InvalidArgumentException(
                "Transisi status penugasan ke '{$targetStatus->label()}' tidak diizinkan dari status saat ini."
            );
        }

        if ($targetStatus === AssignmentStatus::DECLINED_BY_AGENCY && empty(trim((string) $declineReason))) {
            throw new InvalidArgumentException('Penolakan penugasan wajib menyertakan alasan yang jelas.');
        }

        return DB::transaction(function () use ($assignment, $targetStatus, $actor, $declineReason) {
            $fromStatus = $assignment->assignment_status;
            $assignment->assignment_status = $targetStatus;

            if ($targetStatus === AssignmentStatus::DECLINED_BY_AGENCY) {
                $assignment->decline_reason = $declineReason;
            }

            $assignment->save();

            AssignmentHistory::create([
                'assignment_id' => $assignment->id,
                'from_status' => $fromStatus->value,
                'to_status' => $targetStatus->value,
                'actor_user_id' => $actor->id,
                'reason' => $declineReason,
                'note' => $targetStatus === AssignmentStatus::RECEIVED_BY_AGENCY ? 'Diterima oleh petugas instansi' : 'Ditolak oleh instansi',
                'created_at' => now(),
            ]);

            $this->auditLogService->record(
                action: 'ASSIGNMENT_STATUS_TRANSITION',
                entity: $assignment,
                before: ['assignment_status' => $fromStatus->value],
                after: [
                    'assignment_status' => $targetStatus->value,
                    'decline_reason' => $declineReason,
                ],
                reason: $declineReason,
                actor: $actor
            );

            return $assignment;
        });
    }

    /**
     * Add operational progress update.
     */
    public function recordOperationalUpdate(
        Assignment $assignment,
        User $actor,
        string $updateType,
        string $note,
        ?FireCondition $fireConditionObserved = null,
        ?string $evidencePath = null
    ): OperationalUpdate {
        return DB::transaction(function () use ($assignment, $actor, $updateType, $note, $fireConditionObserved, $evidencePath) {
            // Automatically advance to IN_PROGRESS if currently RECEIVED_BY_AGENCY
            if ($assignment->assignment_status === AssignmentStatus::RECEIVED_BY_AGENCY) {
                $assignment->assignment_status = AssignmentStatus::IN_PROGRESS;
                $assignment->save();

                AssignmentHistory::create([
                    'assignment_id' => $assignment->id,
                    'from_status' => AssignmentStatus::RECEIVED_BY_AGENCY->value,
                    'to_status' => AssignmentStatus::IN_PROGRESS->value,
                    'actor_user_id' => $actor->id,
                    'reason' => 'Dimulainya tindakan penanganan lapangan',
                    'note' => $note,
                    'created_at' => now(),
                ]);
            }

            $update = OperationalUpdate::create([
                'assignment_id' => $assignment->id,
                'created_by_user_id' => $actor->id,
                'update_type' => $updateType,
                'note' => $note,
                'fire_condition_observed' => $fireConditionObserved?->value,
                'evidence_path' => $evidencePath,
            ]);

            // If fire condition was observed on the ground, update the report's fire condition with provenance
            if ($fireConditionObserved !== null) {
                $report = $assignment->report;
                $report->fire_condition = $fireConditionObserved;
                $report->fire_condition_source = "Laporan Operasional Lapangan {$assignment->agency->name} oleh {$actor->name}";
                $report->fire_condition_observed_at = now();
                $report->save();
            }

            $this->auditLogService->record(
                action: 'OPERATIONAL_UPDATE_ADDED',
                entity: $update,
                before: null,
                after: [
                    'assignment_id' => $assignment->id,
                    'update_type' => $updateType,
                    'note' => $note,
                    'fire_condition_observed' => $fireConditionObserved?->value,
                ],
                reason: $note,
                actor: $actor
            );

            return $update;
        });
    }

    /**
     * Agency submits assignment for resolution review.
     */
    public function submitForResolutionReview(
        Assignment $assignment,
        User $actor,
        string $summary
    ): Assignment {
        return DB::transaction(function () use ($assignment, $actor, $summary) {
            $fromStatus = $assignment->assignment_status;
            $assignment->assignment_status = AssignmentStatus::SUBMITTED_FOR_REVIEW;
            $assignment->save();

            AssignmentHistory::create([
                'assignment_id' => $assignment->id,
                'from_status' => $fromStatus->value,
                'to_status' => AssignmentStatus::SUBMITTED_FOR_REVIEW->value,
                'actor_user_id' => $actor->id,
                'reason' => 'Pengajuan penyelesaian penanganan untuk review admin',
                'note' => $summary,
                'created_at' => now(),
            ]);

            // Transition report to RESOLUTION_REVIEW
            $report = $assignment->report;
            if ($report->report_status === ReportStatus::DISPATCHED) {
                $report->report_status = ReportStatus::RESOLUTION_REVIEW;
                $report->save();

                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => ReportStatus::DISPATCHED->value,
                    'to_status' => ReportStatus::RESOLUTION_REVIEW->value,
                    'actor_user_id' => $actor->id,
                    'reason' => "Tindak lanjut diajukan oleh {$assignment->agency->name}",
                    'note' => $summary,
                    'created_at' => now(),
                ]);
            }

            $this->auditLogService->record(
                action: 'ASSIGNMENT_SUBMITTED_FOR_REVIEW',
                entity: $assignment,
                before: ['assignment_status' => $fromStatus->value],
                after: [
                    'assignment_status' => AssignmentStatus::SUBMITTED_FOR_REVIEW->value,
                    'summary' => $summary,
                ],
                reason: $summary,
                actor: $actor
            );

            return $assignment;
        });
    }
}
