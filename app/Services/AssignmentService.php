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
use Illuminate\Validation\ValidationException;

class AssignmentService
{
    public function __construct(
        protected readonly AuditLogService $auditLogService,
    ) {}

    /**
     * Dispatch/assign a verified report to an active agency.
     *
     * @throws ValidationException
     */
    public function assign(
        Report $report,
        Agency $agency,
        User $actor,
        ?string $note = null,
        ?int $expectedLockVersion = null,
    ): Assignment {
        $statusStr = $report->report_status instanceof ReportStatus
            ? $report->report_status->value
            : (string) $report->report_status;

        if (! in_array($statusStr, ['VERIFIED', 'DISPATCHED'], true)) {
            throw ValidationException::withMessages([
                'report' => "Laporan berstatus {$statusStr} tidak dapat ditugaskan. Laporan harus terverifikasi terlebih dahulu.",
            ]);
        }

        if (! $agency->is_active) {
            throw ValidationException::withMessages([
                'agency_id' => 'Instansi yang dipilih sedang tidak aktif.',
            ]);
        }

        if ($expectedLockVersion !== null && isset($report->lock_version) && $report->lock_version !== $expectedLockVersion) {
            throw ValidationException::withMessages([
                'lock_version' => 'Data laporan telah diperbarui oleh pengguna lain. Silakan muat ulang halaman untuk melihat data terkini.',
            ]);
        }

        return DB::transaction(function () use ($report, $agency, $actor, $note, $statusStr) {
            $assignment = Assignment::create([
                'report_id' => $report->id,
                'agency_id' => $agency->id,
                'assigned_by_user_id' => $actor->id,
                'assignment_status' => 'ASSIGNED',
                'assigned_at' => now(),
                'notes' => $note,
            ]);

            AssignmentHistory::create([
                'assignment_id' => $assignment->id,
                'from_status' => null,
                'to_status' => 'ASSIGNED',
                'actor_user_id' => $actor->id,
                'reason' => 'Penugasan baru oleh Admin',
                'note' => $note,
                'created_at' => now(),
            ]);

            $previousStatus = $statusStr;
            if ($statusStr !== 'DISPATCHED') {
                $report->report_status = ReportStatus::tryFrom('DISPATCHED') ?? 'DISPATCHED';
                if (isset($report->lock_version)) {
                    $report->lock_version += 1;
                }
                $report->save();

                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => $previousStatus,
                    'to_status' => 'DISPATCHED',
                    'actor_user_id' => $actor->id,
                    'reason' => "Ditugaskan ke instansi: {$agency->name}",
                    'note' => $note,
                    'created_at' => now(),
                ]);
            }

            $this->auditLogService->log(
                actor: $actor,
                action: 'REPORT_ASSIGNED_TO_AGENCY',
                entityType: 'Assignment',
                entityId: $assignment->id,
                before: ['report_status' => $previousStatus],
                after: [
                    'assignment_id' => $assignment->id,
                    'agency_id' => $agency->id,
                    'agency_name' => $agency->name,
                    'report_status' => 'DISPATCHED',
                ],
                reason: $note,
            );

            return $assignment;
        });
    }

    /**
     * Dispatch/Assign a report to an official agency (convenience alias).
     */
    public function assignReport(
        Report $report,
        Agency $agency,
        User $actor,
        ?string $notes = null
    ): Assignment {
        return $this->assign($report, $agency, $actor, $notes);
    }

    /**
     * Agency officer responds to an assignment (accept or decline).
     */
    public function respondToAssignment(
        Assignment $assignment,
        User $actor,
        bool|AssignmentStatus|string $accepted = true,
        ?string $declineReason = null,
        AssignmentStatus|string|null $targetStatus = null
    ): Assignment {
        if ($targetStatus !== null) {
            $statusVal = $targetStatus instanceof \BackedEnum ? $targetStatus->value : (string) $targetStatus;
            $accepted = $statusVal === 'RECEIVED_BY_AGENCY';
        } elseif (! is_bool($accepted)) {
            $statusVal = $accepted instanceof \BackedEnum ? $accepted->value : (string) $accepted;
            $accepted = $statusVal === 'RECEIVED_BY_AGENCY';
        }

        return DB::transaction(function () use ($assignment, $actor, $accepted, $declineReason) {
            $fromStatus = $assignment->assignment_status instanceof AssignmentStatus
                ? $assignment->assignment_status
                : AssignmentStatus::tryFrom((string) $assignment->assignment_status) ?? AssignmentStatus::ASSIGNED;

            $targetStatus = $accepted
                ? AssignmentStatus::RECEIVED_BY_AGENCY
                : AssignmentStatus::DECLINED_BY_AGENCY;

            $assignment->assignment_status = $targetStatus->value;
            if ($accepted) {
                $assignment->acknowledged_at = now();
            } else {
                $assignment->declined_at = now();
                $assignment->decline_reason = $declineReason;
            }
            $assignment->save();

            AssignmentHistory::create([
                'assignment_id' => $assignment->id,
                'from_status' => $fromStatus->value,
                'to_status' => $targetStatus->value,
                'actor_user_id' => $actor->id,
                'reason' => $accepted ? 'Tugas diterima oleh OPD' : 'Tugas ditolak oleh OPD',
                'note' => $declineReason,
                'created_at' => now(),
            ]);

            $this->auditLogService->log(
                actor: $actor,
                action: 'ASSIGNMENT_STATUS_TRANSITION',
                entityType: 'Assignment',
                entityId: $assignment->id,
                before: ['assignment_status' => $fromStatus->value],
                after: [
                    'assignment_status' => $targetStatus->value,
                    'decline_reason' => $declineReason,
                ],
                reason: $declineReason,
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
            $currentStatus = $assignment->assignment_status instanceof AssignmentStatus
                ? $assignment->assignment_status->value
                : (string) $assignment->assignment_status;

            if ($currentStatus === AssignmentStatus::RECEIVED_BY_AGENCY->value || $currentStatus === 'RECEIVED_BY_AGENCY') {
                $assignment->assignment_status = AssignmentStatus::IN_PROGRESS->value;
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

            if ($fireConditionObserved !== null) {
                $report = $assignment->report;
                $report->fire_condition = $fireConditionObserved;
                $report->fire_condition_source = "Laporan Operasional Lapangan {$assignment->agency->name} oleh {$actor->name}";
                $report->fire_condition_observed_at = now();
                $report->save();
            }

            $this->auditLogService->log(
                actor: $actor,
                action: 'OPERATIONAL_UPDATE_ADDED',
                entityType: 'OperationalUpdate',
                entityId: $update->id,
                before: null,
                after: [
                    'assignment_id' => $assignment->id,
                    'update_type' => $updateType,
                    'note' => $note,
                    'fire_condition_observed' => $fireConditionObserved?->value,
                ],
                reason: $note,
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
            $fromStatus = $assignment->assignment_status instanceof AssignmentStatus
                ? $assignment->assignment_status->value
                : (string) $assignment->assignment_status;

            $assignment->assignment_status = AssignmentStatus::SUBMITTED_FOR_REVIEW->value;
            $assignment->save();

            AssignmentHistory::create([
                'assignment_id' => $assignment->id,
                'from_status' => $fromStatus,
                'to_status' => AssignmentStatus::SUBMITTED_FOR_REVIEW->value,
                'actor_user_id' => $actor->id,
                'reason' => 'Pengajuan penyelesaian penanganan untuk review admin',
                'note' => $summary,
                'created_at' => now(),
            ]);

            $report = $assignment->report;
            $reportStatusStr = $report->report_status instanceof ReportStatus
                ? $report->report_status->value
                : (string) $report->report_status;

            if ($reportStatusStr === 'DISPATCHED') {
                $report->report_status = ReportStatus::tryFrom('RESOLUTION_REVIEW') ?? 'RESOLUTION_REVIEW';
                $report->save();

                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => 'DISPATCHED',
                    'to_status' => 'RESOLUTION_REVIEW',
                    'actor_user_id' => $actor->id,
                    'reason' => "Tindak lanjut diajukan oleh {$assignment->agency->name}",
                    'note' => $summary,
                    'created_at' => now(),
                ]);
            }

            $this->auditLogService->log(
                actor: $actor,
                action: 'ASSIGNMENT_SUBMITTED_FOR_REVIEW',
                entityType: 'Assignment',
                entityId: $assignment->id,
                before: ['assignment_status' => $fromStatus],
                after: [
                    'assignment_status' => AssignmentStatus::SUBMITTED_FOR_REVIEW->value,
                    'summary' => $summary,
                ],
                reason: $summary,
            );

            return $assignment;
        });
    }
}
