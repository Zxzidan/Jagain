<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $source_type
 * @property string $attribution_text
 * @property string|null $documentation_url
 * @property string $integration_status
 * @property Carbon|null $last_successful_sync_at
 */
class DataSource extends Model
{
    protected $fillable = [
        'name',
        'code',
        'source_type',
        'attribution_text',
        'documentation_url',
        'integration_status',
        'last_successful_sync_at',
    ];

    protected function casts(): array
    {
        return [
            'last_successful_sync_at' => 'datetime',
        ];
    }

    /**
     * @return HasMany<ExternalObservation, $this>
     */
    public function observations(): HasMany
    {
        return $this->hasMany(ExternalObservation::class);
    }
}
