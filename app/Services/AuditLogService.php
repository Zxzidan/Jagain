<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

class AuditLogService
{
    /**
     * Record an audit log entry safely.
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
            'before_snapshot' => $this->sanitizeSnapshot($before),
            'after_snapshot' => $this->sanitizeSnapshot($after),
            'reason' => $reason,
            'request_id' => $requestId ?? Request::header('X-Request-ID') ?? (string) Str::uuid(),
            'ip_address' => Request::ip(),
            'created_at' => now(),
        ]);
    }

    /**
     * Record an audit log entry for a Model instance.
     *
     * @param  array<string, mixed>|null  $before
     * @param  array<string, mixed>|null  $after
     */
    public function record(
        string $action,
        Model $entity,
        ?array $before = null,
        ?array $after = null,
        ?string $reason = null,
        ?User $actor = null
    ): AuditLog {
        $actorUser = $actor ?? auth()->user();

        return $this->log(
            actor: $actorUser,
            action: $action,
            entityType: class_basename($entity),
            entityId: (int) $entity->getKey(),
            before: $before,
            after: $after,
            reason: $reason,
        );
    }

    /**
     * @param  array<string, mixed>|null  $data
     * @return array<string, mixed>|null
     */
    private function sanitizeSnapshot(?array $data): ?array
    {
        if ($data === null) {
            return null;
        }

        $redactedKeys = [
            'password',
            'password_hash',
            'two_factor_secret',
            'two_factor_recovery_codes',
            'remember_token',
            'reporter_phone',
        ];

        foreach ($redactedKeys as $key) {
            if (array_key_exists($key, $data)) {
                $data[$key] = '[REDACTED]';
            }
        }

        return $data;
    }
}
