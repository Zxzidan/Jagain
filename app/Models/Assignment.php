<?php

namespace App\Models;

use App\Enums\AssignmentStatus;
use Database\Factories\AssignmentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $report_id
 * @property int $agency_id
 * @property int $assigned_by_user_id
 * @property AssignmentStatus|string $assignment_status
 * @property string|null $decline_reason
 * @property Carbon|null $assigned_at
 * @property Carbon|null $acknowledged_at
 * @property Carbon|null $declined_at
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Assignment extends Model
{
    /** @use HasFactory<AssignmentFactory> */
    use HasFactory;

    protected $fillable = [
        'report_id',
        'agency_id',
        'assigned_by_user_id',
        'assignment_status',
        'decline_reason',
        'assigned_at',
        'acknowledged_at',
        'declined_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'assignment_status' => AssignmentStatus::class,
            'assigned_at' => 'datetime',
            'acknowledged_at' => 'datetime',
            'declined_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<Report, $this>
     */
    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    /**
     * @return BelongsTo<Agency, $this>
     */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function assignedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by_user_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function assigner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by_user_id');
    }

    /**
     * @return HasMany<AssignmentHistory, $this>
     */
    public function histories(): HasMany
    {
        return $this->hasMany(AssignmentHistory::class)->orderBy('created_at', 'desc');
    }

    /**
     * @return HasMany<OperationalUpdate, $this>
     */
    public function operationalUpdates(): HasMany
    {
        return $this->hasMany(OperationalUpdate::class)->orderBy('created_at', 'desc');
    }

    /**
     * @return HasMany<OperationalUpdate, $this>
     */
    public function updates(): HasMany
    {
        return $this->hasMany(OperationalUpdate::class)->orderBy('created_at', 'desc');
    }
}
