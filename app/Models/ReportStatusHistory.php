<?php

namespace App\Models;

use App\Enums\ReportStatus;
use Database\Factories\ReportStatusHistoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $report_id
 * @property ReportStatus|string|null $from_status
 * @property ReportStatus|string $to_status
 * @property int|null $actor_user_id
 * @property string|null $reason
 * @property string|null $note
 * @property string|null $public_note
 * @property Carbon $created_at
 * @property User|null $actor
 * @property User|null $actorUser
 */
class ReportStatusHistory extends Model
{
    /** @use HasFactory<ReportStatusHistoryFactory> */
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (ReportStatusHistory $history) {
            if (empty($history->created_at)) {
                $history->created_at = now();
            }
        });
    }

    protected $fillable = [
        'report_id',
        'from_status',
        'to_status',
        'actor_user_id',
        'reason',
        'note',
        'public_note',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'to_status' => ReportStatus::class,
            'created_at' => 'datetime',
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
    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function actorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
