<?php

namespace App\Models;

use Database\Factories\DataSourceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $source_type
 * @property string $attribution_text
 * @property string|null $documentation_url
 * @property string $integration_status
 * @property Carbon|null $last_successful_sync_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'source_type',
    'attribution_text',
    'documentation_url',
    'integration_status',
    'last_successful_sync_at',
])]
class DataSource extends Model
{
    /** @use HasFactory<DataSourceFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'last_successful_sync_at' => 'datetime',
        ];
    }
}
