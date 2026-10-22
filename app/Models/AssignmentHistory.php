<?php

namespace App\Models;

use Database\Factories\AssignmentHistoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $assignment_id
 * @property string|null $from_status
 * @property string $to_status
 * @property int|null $actor_user_id
 * @property string|null $reason
 * @property string|null $note
 * @property Carbon $created_at
 */
class AssignmentHistory extends Model
{
    /** @use HasFactory<AssignmentHistoryFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'assignment_id',
        'from_status',
        'to_status',
        'actor_user_id',
        'reason',
        'note',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<Assignment, $this>
     */
    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function actorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
