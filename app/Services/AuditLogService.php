<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class AuditLogService
{
    /**
     * Record an audit log entry safely without storing passwords, tokens, or sensitive secrets.
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
        $actorId = $actor !== null ? $actor->id : auth()->id();

        return AuditLog::create([
            'actor_user_id' => $actorId,
            'action' => $action,
            'entity_type' => get_class($entity),
            'entity_id' => $entity->getKey(),
            'before_snapshot' => $this->sanitizeSnapshot($before),
            'after_snapshot' => $this->sanitizeSnapshot($after),
            'reason' => $reason,
            'request_id' => Request::header('X-Request-ID') ?? null,
            'ip_address' => Request::ip(),
            'created_at' => now(),
        ]);
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
