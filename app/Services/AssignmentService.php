<?php

namespace App\Services;

use App\Models\Agency;
use App\Models\Assignment;
use App\Models\AssignmentHistory;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AssignmentService
{
    public function __construct(
        private readonly AuditLogService $auditLogService,
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
        if (! in_array($report->report_status, ['VERIFIED', 'DISPATCHED'], true)) {
            throw ValidationException::withMessages([
                'report' => "Laporan berstatus {$report->report_status} tidak dapat ditugaskan. Laporan harus terverifikasi terlebih dahulu.",
            ]);
        }

        if (! $agency->is_active) {
            throw ValidationException::withMessages([
                'agency_id' => 'Instansi yang dipilih sedang tidak aktif.',
            ]);
        }

        if ($expectedLockVersion !== null && $report->lock_version !== $expectedLockVersion) {
            throw ValidationException::withMessages([
                'lock_version' => 'Data laporan telah diperbarui oleh pengguna lain. Silakan muat ulang halaman untuk melihat data terkini.',
            ]);
        }

        return DB::transaction(function () use ($report, $agency, $actor, $note) {
            $assignment = Assignment::create([
                'report_id' => $report->id,
                'agency_id' => $agency->id,
                'assigned_by_user_id' => $actor->id,
                'assignment_status' => 'ASSIGNED',
                'assigned_at' => now(),
            ]);

            AssignmentHistory::create([
                'assignment_id' => $assignment->id,
                'from_status' => null,
                'to_status' => 'ASSIGNED',
                'actor_user_id' => $actor->id,
                'note' => $note,
                'created_at' => now(),
            ]);

            $previousStatus = $report->report_status;
            if ($report->report_status !== 'DISPATCHED') {
                $report->report_status = 'DISPATCHED';
                $report->lock_version += 1;
                $report->save();

                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => $previousStatus,
                    'to_status' => 'DISPATCHED',
                    'actor_user_id' => $actor->id,
                    'note' => "Penugasan kepada instansi {$agency->name}. ".($note ?? ''),
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
                    'report_status' => $report->report_status,
                ],
                reason: $note,
            );

            return $assignment;
        });
    }
}
