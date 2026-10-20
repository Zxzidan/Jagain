<?php

namespace App\Models;

use Database\Factories\ReportFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $created_by_user_id
 * @property int $category_id
 * @property string $title
 * @property string $description
 * @property float $latitude
 * @property float $longitude
 * @property string|null $location_description
 * @property Carbon|null $reported_occurrence_at
 * @property string $report_status
 * @property string $visibility
 * @property bool $is_simulated
 * @property int $lock_version
 * @property string $actual_fire_condition
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'created_by_user_id',
    'category_id',
    'title',
    'description',
    'latitude',
    'longitude',
    'location_description',
    'reported_occurrence_at',
    'report_status',
    'visibility',
    'is_simulated',
    'lock_version',
    'actual_fire_condition',
])]
class Report extends Model
{
    /** @use HasFactory<ReportFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'reported_occurrence_at' => 'datetime',
            'is_simulated' => 'boolean',
            'lock_version' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return HasMany<Evidence, $this>
     */
    public function evidence(): HasMany
    {
        return $this->hasMany(Evidence::class);
    }

    /**
     * @return HasMany<ReportStatusHistory, $this>
     */
    public function statusHistories(): HasMany
    {
        return $this->hasMany(ReportStatusHistory::class)->orderBy('created_at', 'desc');
    }

    /**
     * @return HasMany<Assignment, $this>
     */
    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class)->orderBy('assigned_at', 'desc');
    }

    /**
     * @return HasOne<Assignment, $this>
     */
    public function latestAssignment(): HasOne
    {
        return $this->hasOne(Assignment::class)->latestOfMany('assigned_at');
    }
}
