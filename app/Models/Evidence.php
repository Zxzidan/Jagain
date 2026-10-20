<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int $report_id
 * @property int $uploaded_by_user_id
 * @property string $storage_key
 * @property string $original_filename
 * @property string $media_type
 * @property int $size_bytes
 * @property string|null $caption
 * @property Carbon|null $captured_at
 * @property string $visibility
 * @property-read string $url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Evidence extends Model
{
    protected $table = 'evidence';

    protected $fillable = [
        'report_id',
        'uploaded_by_user_id',
        'storage_key',
        'original_filename',
        'media_type',
        'size_bytes',
        'caption',
        'captured_at',
        'visibility',
    ];

    protected $appends = ['url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'captured_at' => 'datetime',
            'size_bytes' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<Report, $this>
     */
    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class, 'report_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by_user_id');
    }

    /**
     * Get URL for accessing the evidence file.
     */
    public function getUrlAttribute(): string
    {
        return Storage::disk('public')->url($this->storage_key);
    }
}
