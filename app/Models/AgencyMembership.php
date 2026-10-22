<?php

namespace App\Models;

use Database\Factories\AgencyMembershipFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property int $agency_id
 * @property string $membership_status
 * @property string|null $role_in_agency
 * @property array<string, mixed>|null $permissions
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class AgencyMembership extends Model
{
    /** @use HasFactory<AgencyMembershipFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'agency_id',
        'membership_status',
        'role_in_agency',
        'permissions',
    ];

    protected function casts(): array
    {
        return [
            'permissions' => 'array',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Agency, $this>
     */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }
}
