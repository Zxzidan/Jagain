<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $assignment_id
 * @property int $created_by_user_id
 * @property string $update_type
 * @property string $note
 * @property string|null $fire_condition_observed
 * @property string|null $evidence_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class OperationalUpdate extends Model
{
    protected $fillable = [
        'assignment_id',
        'created_by_user_id',
        'update_type',
        'note',
        'fire_condition_observed',
        'evidence_path',
    ];

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
    public function createdByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
}
