<?php

namespace App\Models;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $report_number
 * @property int $created_by_user_id
 * @property string $title
 * @property string $description
 * @property string $category
 * @property float $latitude
 * @property float $longitude
 * @property string $location_description
 * @property Carbon|null $reported_occurrence_at
 * @property ReportStatus $report_status
 * @property string $visibility
 * @property bool $is_simulated
 * @property FireCondition $fire_condition
 * @property string|null $admin_notes
 * @property string|null $information_requested
 * @property string|null $additional_information
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Evidence> $evidence
 * @property-read Collection<int, ReportStatusHistory> $statusHistories
 */
class Report extends Model
{
    protected $fillable = [
        'report_number',
        'created_by_user_id',
        'title',
        'description',
        'category',
        'latitude',
        'longitude',
        'location_description',
        'reported_occurrence_at',
        'report_status',
        'visibility',
        'is_simulated',
        'fire_condition',
        'admin_notes',
        'information_requested',
        'additional_information',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'report_status' => ReportStatus::class,
            'fire_condition' => FireCondition::class,
            'reported_occurrence_at' => 'datetime',
            'is_simulated' => 'boolean',
            'latitude' => 'float',
            'longitude' => 'float',
        ];
    }

    /**
     * Relationship to the user who created the report.
     *
     * @return BelongsTo<User, $this>
     */
    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /**
     * Alias relationship to user.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->reporter();
    }

    /**
     * Evidence attached to this report.
     *
     * @return HasMany<Evidence, $this>
     */
    public function evidence(): HasMany
    {
        return $this->hasMany(Evidence::class, 'report_id');
    }

    /**
     * Status history log for this report.
     *
     * @return HasMany<ReportStatusHistory, $this>
     */
    public function statusHistories(): HasMany
    {
        return $this->hasMany(ReportStatusHistory::class, 'report_id')->orderBy('created_at', 'asc');
    }

    /**
     * Generate unique report number: JGN-YYYYMMDD-XXXX
     */
    public static function generateReportNumber(): string
    {
        $datePrefix = 'JGN-'.now()->format('Ymd').'-';

        do {
            $candidate = $datePrefix.strtoupper(Str::random(4));
        } while (static::where('report_number', $candidate)->exists());

        return $candidate;
    }
}
