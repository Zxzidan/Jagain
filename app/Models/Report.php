<?php

namespace App\Models;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $tracking_code
 * @property int|null $created_by_user_id
 * @property int $category_id
 * @property string $title
 * @property string $description
 * @property float $latitude
 * @property float $longitude
 * @property string $province
 * @property string $regency_city
 * @property string $location_description
 * @property Carbon|CarbonImmutable|null $reported_occurrence_at
 * @property ReportStatus $report_status
 * @property FireCondition $fire_condition
 * @property string|null $fire_condition_source
 * @property Carbon|CarbonImmutable|null $fire_condition_observed_at
 * @property string $visibility
 * @property bool $is_simulated
 * @property string|null $information_requested
 * @property string|null $close_reason
 * @property string|null $reporter_name
 * @property string|null $reporter_phone
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Report extends Model
{
    protected $fillable = [
        'tracking_code',
        'created_by_user_id',
        'category_id',
        'title',
        'description',
        'latitude',
        'longitude',
        'province',
        'regency_city',
        'location_description',
        'reported_occurrence_at',
        'report_status',
        'fire_condition',
        'fire_condition_source',
        'fire_condition_observed_at',
        'visibility',
        'is_simulated',
        'information_requested',
        'close_reason',
        'reporter_name',
        'reporter_phone',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'reported_occurrence_at' => 'datetime',
            'fire_condition_observed_at' => 'datetime',
            'report_status' => ReportStatus::class,
            'fire_condition' => FireCondition::class,
            'is_simulated' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Report $report) {
            if (empty($report->tracking_code)) {
                $report->tracking_code = self::generateTrackingCode();
            }
        });
    }

    public static function generateTrackingCode(): string
    {
        $prefix = 'JGN-'.date('Ym').'-';
        do {
            $code = $prefix.strtoupper(Str::random(5));
        } while (self::where('tracking_code', $code)->exists());

        return $code;
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function createdByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /**
     * @return BelongsTo<ReportCategory, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ReportCategory::class, 'category_id');
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
        return $this->hasMany(Assignment::class)->orderBy('created_at', 'desc');
    }

    /**
     * @return HasOne<Assignment, $this>
     */
    public function latestAssignment(): HasOne
    {
        return $this->hasOne(Assignment::class)->latestOfMany();
    }

    /**
     * Scope for public viewing (excludes RESTRICTED or PRIVATE reports).
     *
     * @param  Builder<$this>  $query
     */
    public function scopePubliclyVisible(Builder $query): void
    {
        $query->where('visibility', 'PUBLIC');
    }

    /**
     * Safely format for public view without any PII (reporter_name/reporter_phone are stripped).
     *
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'id' => $this->id,
            'tracking_code' => $this->tracking_code,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ] : null,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'province' => $this->province,
            'regency_city' => $this->regency_city,
            'location_description' => $this->location_description,
            'reported_occurrence_at' => $this->reported_occurrence_at?->toIso8601String(),
            'report_status' => $this->report_status->value,
            'status_label' => $this->report_status->label(),
            'fire_condition' => $this->fire_condition->value,
            'fire_condition_label' => $this->fire_condition->label(),
            'fire_condition_source' => $this->fire_condition_source,
            'fire_condition_observed_at' => $this->fire_condition_observed_at?->toIso8601String(),
            'is_simulated' => $this->is_simulated,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'evidence' => $this->evidence->where('visibility', 'PUBLIC')->map(fn ($ev) => [
                'id' => $ev->id,
                'file_path' => $ev->file_path,
                'caption' => $ev->caption,
                'media_type' => $ev->media_type,
            ])->values()->all(),
            'status_history' => $this->statusHistories->map(fn ($h) => [
                'id' => $h->id,
                'from_status' => $h->from_status,
                'to_status' => $h->to_status,
                'reason' => $h->reason,
                'note' => $h->note,
                'created_at' => $h->created_at->toIso8601String(),
            ])->values()->all(),
            'active_agency' => $this->latestAssignment?->agency ? [
                'id' => $this->latestAssignment->agency->id,
                'name' => $this->latestAssignment->agency->name,
                'jurisdiction' => $this->latestAssignment->agency->jurisdiction,
            ] : null,
        ];
    }
}
