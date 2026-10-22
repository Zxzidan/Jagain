<?php

namespace App\Services;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReportTransitionService
{
    /**
     * Permitted report state transitions according to PRD section 8.1.
     *
     * @var array<string, array<int, string>>
     */
    public const VALID_TRANSITIONS = [
        'SUBMITTED' => ['UNDER_REVIEW', 'CLOSED_WITH_REASON'],
        'UNDER_REVIEW' => ['NEEDS_INFORMATION', 'VERIFIED', 'CLOSED_WITH_REASON'],
        'NEEDS_INFORMATION' => ['UNDER_REVIEW', 'CLOSED_WITH_REASON'],
        'VERIFIED' => ['DISPATCHED', 'CLOSED_WITH_REASON'],
        'DISPATCHED' => ['RESOLUTION_REVIEW', 'CLOSED_WITH_REASON'],
        'RESOLUTION_REVIEW' => ['RESOLVED_VERIFIED', 'DISPATCHED', 'CLOSED_WITH_REASON'],
        'RESOLVED_VERIFIED' => ['UNDER_REVIEW'],
        'CLOSED_WITH_REASON' => ['UNDER_REVIEW'],
    ];

    public function __construct(
        protected readonly AuditLogService $auditLogService,
    ) {}

    /**
     * Execute a validated report state transition.
     *
     * @throws ValidationException
     */
    public function transition(
        Report $report,
        ReportStatus|string $targetStatus,
        User $actor,
        ?string $reason = null,
        ?string $note = null,
        ?string $publicNote = null,
        ?int $expectedLockVersion = null,
        FireCondition|string|null $fireCondition = null
    ): Report {
        $currentStatusStr = $report->report_status instanceof ReportStatus
            ? $report->report_status->value
            : (string) $report->report_status;

        $targetStatusStr = $targetStatus instanceof ReportStatus
            ? $targetStatus->value
            : (string) $targetStatus;

        $allowedNextStatuses = self::VALID_TRANSITIONS[$currentStatusStr] ?? [];
        if (! in_array($targetStatusStr, $allowedNextStatuses, true)) {
            throw ValidationException::withMessages([
                'target_status' => "Transisi dari status {$currentStatusStr} ke {$targetStatusStr} tidak diperbolehkan.",
            ]);
        }

        if ($expectedLockVersion !== null && isset($report->lock_version) && $report->lock_version !== $expectedLockVersion) {
            throw ValidationException::withMessages([
                'lock_version' => 'Data laporan telah diperbarui oleh pengguna lain. Silakan muat ulang halaman untuk melihat data terkini.',
            ]);
        }

        if ($targetStatusStr === 'CLOSED_WITH_REASON' && blank($reason)) {
            throw ValidationException::withMessages([
                'reason' => 'Alasan wajib diisi ketika menutup laporan.',
            ]);
        }

        if ($targetStatusStr === 'NEEDS_INFORMATION' && blank($publicNote) && blank($note)) {
            throw ValidationException::withMessages([
                'note' => 'Catatan klarifikasi wajib diisi ketika meminta informasi tambahan dari pelapor.',
            ]);
        }

        return DB::transaction(function () use (
            $report,
            $currentStatusStr,
            $targetStatusStr,
            $actor,
            $reason,
            $note,
            $publicNote,
            $fireCondition
        ) {
            $beforeSnapshot = [
                'report_status' => $currentStatusStr,
                'fire_condition' => $report->fire_condition instanceof FireCondition ? $report->fire_condition->value : $report->fire_condition,
                'lock_version' => $report->lock_version ?? 1,
            ];

            $report->report_status = ReportStatus::tryFrom($targetStatusStr) ?? $targetStatusStr;
            if (isset($report->lock_version)) {
                $report->lock_version += 1;
            }

            if ($targetStatusStr === 'CLOSED_WITH_REASON') {
                $report->close_reason = $reason;
            } elseif ($targetStatusStr === 'NEEDS_INFORMATION') {
                $report->information_requested = $publicNote ?? $note;
            }

            if ($fireCondition !== null) {
                $report->fire_condition = $fireCondition instanceof FireCondition ? $fireCondition : (FireCondition::tryFrom($fireCondition) ?? $fireCondition);
                $report->fire_condition_source = "Pembaruan oleh {$actor->name}";
                $report->fire_condition_observed_at = now();
            }

            $report->save();

            $afterSnapshot = [
                'report_status' => $targetStatusStr,
                'fire_condition' => $report->fire_condition instanceof FireCondition ? $report->fire_condition->value : $report->fire_condition,
                'lock_version' => $report->lock_version ?? 1,
            ];

            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => $currentStatusStr,
                'to_status' => $targetStatusStr,
                'actor_user_id' => $actor->id,
                'reason' => $reason,
                'note' => $note ?? $publicNote,
                'public_note' => $publicNote,
                'created_at' => now(),
            ]);

            $this->auditLogService->log(
                actor: $actor,
                action: 'REPORT_STATUS_TRANSITION',
                entityType: 'Report',
                entityId: $report->id,
                before: $beforeSnapshot,
                after: $afterSnapshot,
                reason: $reason ?? $note ?? $publicNote,
            );

            return $report;
        });
    }
}
