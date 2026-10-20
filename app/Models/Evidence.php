<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $report_id
 * @property int|null $uploaded_by_user_id
 * @property string $file_path
 * @property string $original_filename
 * @property string $media_type
 * @property int $size_bytes
 * @property string|null $caption
 * @property string $visibility
 * @property Carbon|null $captured_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Evidence extends Model
{
    protected $table = 'evidence';

    protected $fillable = [
        'report_id',
        'uploaded_by_user_id',
        'file_path',
        'original_filename',
        'media_type',
        'size_bytes',
        'caption',
        'visibility',
        'captured_at',
    ];

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
        return $this->belongsTo(Report::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function uploadedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by_user_id');
    }
}
