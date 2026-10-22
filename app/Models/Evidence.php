<?php

namespace App\Models;

use Database\Factories\EvidenceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int $report_id
 * @property int|null $uploaded_by_user_id
 * @property string $file_path
 * @property string|null $storage_key
 * @property string $original_filename
 * @property string $media_type
 * @property int $size_bytes
 * @property string|null $caption
 * @property string $visibility
 * @property Carbon|null $captured_at
 * @property-read string $url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Evidence extends Model
{
    /** @use HasFactory<EvidenceFactory> */
    use HasFactory;

    protected $table = 'evidence';

    protected $fillable = [
        'report_id',
        'uploaded_by_user_id',
        'file_path',
        'storage_key',
        'original_filename',
        'media_type',
        'size_bytes',
        'caption',
        'visibility',
        'captured_at',
    ];

    protected $appends = ['url'];

    protected function casts(): array
    {
        return [
            'captured_at' => 'datetime',
            'size_bytes' => 'integer',
        ];
    }

    public function getStorageKeyAttribute(): ?string
    {
        return $this->attributes['storage_key'] ?? $this->attributes['file_path'] ?? null;
    }

    public function getFilePathAttribute(): ?string
    {
        return $this->attributes['file_path'] ?? $this->attributes['storage_key'] ?? null;
    }

    /**
     * Get URL for accessing the evidence file.
     */
    public function getUrlAttribute(): string
    {
        $path = $this->file_path ?? $this->storage_key ?? '';
        return Storage::disk('public')->url($path);
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
     * @return BelongsTo<User, $this>
     */
    public function uploadedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by_user_id');
    }
}
