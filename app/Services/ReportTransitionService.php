<?php

namespace App\Services;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class ReportTransitionService
{
    public function __construct(
        protected AuditLogService $auditLogService
    ) {}

    /**
     * Transition a report to a target status with validation and transactional audit logging.
     *
     * @throws InvalidArgumentException
     */
    public function transition(
        Report $report,
        ReportStatus $targetStatus,
        User $actor,
        ?string $reason = null,
        ?string $note = null,
        ?FireCondition $fireCondition = null
    ): Report {
        if (! $report->report_status->canTransitionTo($targetStatus)) {
            throw new InvalidArgumentException(
                "Transisi status dari '{$report->report_status->label()}' ke '{$targetStatus->label()}' tidak diizinkan."
            );
        }

        if ($targetStatus === ReportStatus::CLOSED_WITH_REASON && empty(trim((string) $reason))) {
            throw new InvalidArgumentException('Penutupan laporan wajib menyertakan alasan yang jelas.');
        }

        if ($targetStatus === ReportStatus::NEEDS_INFORMATION && empty(trim((string) $note))) {
            throw new InvalidArgumentException('Permintaan informasi tambahan wajib menjelaskan informasi apa yang dibutuhkan.');
        }

        return DB::transaction(function () use ($report, $targetStatus, $actor, $reason, $note, $fireCondition) {
            $previousStatus = $report->report_status;
            $beforeSnapshot = [
                'report_status' => $report->report_status->value,
                'fire_condition' => $report->fire_condition->value,
                'information_requested' => $report->information_requested,
                'close_reason' => $report->close_reason,
            ];

            $report->report_status = $targetStatus;

            if ($targetStatus === ReportStatus::CLOSED_WITH_REASON) {
                $report->close_reason = $reason;
            } elseif ($targetStatus === ReportStatus::NEEDS_INFORMATION) {
                $report->information_requested = $note;
            }

            if ($fireCondition !== null) {
                $report->fire_condition = $fireCondition;
                $report->fire_condition_source = "Pembaruan oleh {$actor->name} ({$actor->role->label()})";
                $report->fire_condition_observed_at = now();
            }

            $report->save();

            // Record status history
            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => $previousStatus->value,
                'to_status' => $targetStatus->value,
                'actor_user_id' => $actor->id,
                'reason' => $reason,
                'note' => $note,
                'created_at' => now(),
            ]);

            $afterSnapshot = [
                'report_status' => $report->report_status->value,
                'fire_condition' => $report->fire_condition->value,
                'information_requested' => $report->information_requested,
                'close_reason' => $report->close_reason,
            ];

            // Record audit log
            $this->auditLogService->record(
                action: 'REPORT_STATUS_TRANSITION',
                entity: $report,
                before: $beforeSnapshot,
                after: $afterSnapshot,
                reason: $reason ?? $note,
                actor: $actor
            );

            return $report;
        });
    }
}
