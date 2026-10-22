<?php

namespace App\Models;

use Database\Factories\OperationalUpdateFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
 * @property int|null $evidence_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class OperationalUpdate extends Model
{
    /** @use HasFactory<OperationalUpdateFactory> */
    use HasFactory;

    protected $fillable = [
        'assignment_id',
        'created_by_user_id',
        'update_type',
        'note',
        'fire_condition_observed',
        'evidence_path',
        'evidence_id',
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
    public function createdByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /**
     * @return BelongsTo<Evidence, $this>
     */
    public function evidence(): BelongsTo
    {
        return $this->belongsTo(Evidence::class);
    }
}
