<?php

namespace App\Services;

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
        'RESOLVED_VERIFIED' => [],
        'CLOSED_WITH_REASON' => [],
    ];

    public function __construct(
        private readonly AuditLogService $auditLogService,
    ) {}

    /**
     * Execute a validated report state transition.
     *
     * @throws ValidationException
     */
    public function transition(
        Report $report,
        string $targetStatus,
        User $actor,
        ?string $reason = null,
        ?string $note = null,
        ?string $publicNote = null,
        ?int $expectedLockVersion = null,
    ): Report {
        $currentStatus = $report->report_status;

        $allowedNextStatuses = self::VALID_TRANSITIONS[$currentStatus] ?? [];
        if (! in_array($targetStatus, $allowedNextStatuses, true)) {
            throw ValidationException::withMessages([
                'target_status' => "Transisi dari status {$currentStatus} ke {$targetStatus} tidak diperbolehkan.",
            ]);
        }

        if ($expectedLockVersion !== null && $report->lock_version !== $expectedLockVersion) {
            throw ValidationException::withMessages([
                'lock_version' => 'Data laporan telah diperbarui oleh pengguna lain. Silakan muat ulang halaman untuk melihat data terkini.',
            ]);
        }

        if ($targetStatus === 'CLOSED_WITH_REASON' && blank($reason)) {
            throw ValidationException::withMessages([
                'reason' => 'Alasan wajib diisi ketika menutup laporan.',
            ]);
        }

        if ($targetStatus === 'NEEDS_INFORMATION' && blank($publicNote) && blank($note)) {
            throw ValidationException::withMessages([
                'note' => 'Catatan klarifikasi wajib diisi ketika meminta informasi tambahan dari pelapor.',
            ]);
        }

        return DB::transaction(function () use (
            $report,
            $currentStatus,
            $targetStatus,
            $actor,
            $reason,
            $note,
            $publicNote,
        ) {
            $beforeSnapshot = [
                'report_status' => $currentStatus,
                'lock_version' => $report->lock_version,
            ];

            $report->report_status = $targetStatus;
            $report->lock_version += 1;
            $report->save();

            $afterSnapshot = [
                'report_status' => $targetStatus,
                'lock_version' => $report->lock_version,
            ];

            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => $currentStatus,
                'to_status' => $targetStatus,
                'actor_user_id' => $actor->id,
                'reason' => $reason,
                'note' => $note,
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
                reason: $reason ?? $note,
            );

            return $report;
        });
    }
}
