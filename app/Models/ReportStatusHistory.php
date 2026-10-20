<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $report_id
 * @property string|null $from_status
 * @property string $to_status
 * @property int|null $actor_user_id
 * @property string|null $reason
 * @property string|null $note
 * @property Carbon $created_at
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

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
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
    public function actorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
