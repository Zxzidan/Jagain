<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $data_source_id
 * @property string|null $external_record_id
 * @property string $satellite_instrument
 * @property string $confidence_level
 * @property float|null $brightness_kelvin
 * @property float|null $frp_mw
 * @property float $latitude
 * @property float $longitude
 * @property string|null $province
 * @property string|null $regency_city
 * @property Carbon $observed_at
 * @property Carbon $ingested_at
 * @property bool $is_simulated
 * @property array<string, mixed>|null $raw_metadata
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class ExternalObservation extends Model
{
    protected $fillable = [
        'data_source_id',
        'external_record_id',
        'satellite_instrument',
        'confidence_level',
        'brightness_kelvin',
        'frp_mw',
        'latitude',
        'longitude',
        'province',
        'regency_city',
        'observed_at',
        'ingested_at',
        'is_simulated',
        'raw_metadata',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'brightness_kelvin' => 'float',
            'frp_mw' => 'float',
            'observed_at' => 'datetime',
            'ingested_at' => 'datetime',
            'is_simulated' => 'boolean',
            'raw_metadata' => 'array',
        ];
    }

    /**
     * @return BelongsTo<DataSource, $this>
     */
    public function dataSource(): BelongsTo
    {
        return $this->belongsTo(DataSource::class);
    }
}
