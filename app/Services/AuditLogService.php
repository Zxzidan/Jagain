<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Support\Str;

class AuditLogService
{
    /**
     * Record an immutable audit log entry.
     *
     * @param  array<string, mixed>|null  $before
     * @param  array<string, mixed>|null  $after
     */
    public function log(
        ?User $actor,
        string $action,
        string $entityType,
        int $entityId,
        ?array $before = null,
        ?array $after = null,
        ?string $reason = null,
        ?string $requestId = null,
    ): AuditLog {
        return AuditLog::create([
            'actor_user_id' => $actor?->id,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'before_snapshot' => $before,
            'after_snapshot' => $after,
            'reason' => $reason,
            'request_id' => $requestId ?? (string) Str::uuid(),
            'created_at' => now(),
        ]);
    }
}
