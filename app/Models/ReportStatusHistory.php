<?php

namespace App\Models;

use App\Enums\ReportStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $report_id
 * @property ReportStatus|null $from_status
 * @property ReportStatus $to_status
 * @property int|null $actor_user_id
 * @property string|null $reason
 * @property string|null $note
 * @property Carbon $created_at
 * @property User|null $actor
 */
class ReportStatusHistory extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'report_id',
        'from_status',
        'to_status',
        'actor_user_id',
        'reason',
        'note',
        'created_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'from_status' => ReportStatus::class,
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
}
