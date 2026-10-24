<?php

namespace App\Models;

use Database\Factories\AuditLogFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $actor_user_id
 * @property string $action
 * @property string $entity_type
 * @property int $entity_id
 * @property array<string, mixed>|null $before_snapshot
 * @property array<string, mixed>|null $after_snapshot
 * @property string|null $reason
 * @property string|null $request_id
 * @property string|null $ip_address
 * @property Carbon $created_at
 */
class AuditLog extends Model
{
    /** @use HasFactory<AuditLogFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'actor_user_id',
        'action',
        'entity_type',
        'entity_id',
        'before_snapshot',
        'after_snapshot',
        'reason',
        'request_id',
        'ip_address',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'before_snapshot' => 'array',
            'after_snapshot' => 'array',
            'created_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }

    public function newEloquentBuilder($query)
    {
        return new class($query) extends Builder
        {
            public function where($column, $operator = null, $value = null, $boolean = 'and')
            {
                if ($column === 'entity_type' && is_string($operator) && $value === null) {
                    $val = $operator;
                    $short = class_basename($val);
                    $full = str_contains($val, '\\') ? $val : 'App\\Models\\'.$val;

                    return parent::whereIn('entity_type', array_unique([$val, $short, $full]), $boolean);
                }

                return parent::where($column, $operator, $value, $boolean);
            }
        };
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function actorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
