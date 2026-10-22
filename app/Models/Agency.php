<?php

namespace App\Models;

use Database\Factories\AgencyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $code
 * @property string $agency_type
 * @property string $jurisdiction
 * @property string|null $contact_email
 * @property string|null $contact_phone
 * @property bool $is_active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Agency extends Model
{
    /** @use HasFactory<AgencyFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'agency_type',
        'jurisdiction',
        'contact_email',
        'contact_phone',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return HasMany<AgencyMembership, $this>
     */
    public function memberships(): HasMany
    {
        return $this->hasMany(AgencyMembership::class);
    }

    /**
     * @return BelongsToMany<User, $this>
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'agency_memberships')
            ->withPivot('membership_status', 'role_in_agency')
            ->withTimestamps();
    }

    /**
     * @return HasMany<Assignment, $this>
     */
    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class);
    }
}
