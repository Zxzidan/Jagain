<?php

namespace App\Policies;

use App\Models\Assignment;
use App\Models\User;

class AssignmentPolicy
{
    /**
     * Determine whether the user can view the assignment.
     */
    public function view(User $user, Assignment $assignment): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isAgency()) {
            return $user->agencies()
                ->where('agencies.id', $assignment->agency_id)
                ->where('agencies.is_active', true)
                ->exists();
        }

        return false;
    }

    /**
     * Determine whether the agency officer can accept or decline this assignment.
     */
    public function respond(User $user, Assignment $assignment): bool
    {
        if (! $user->isAgency()) {
            return false;
        }

        return $user->agencies()
            ->where('agencies.id', $assignment->agency_id)
            ->where('agencies.is_active', true)
            ->exists();
    }

    /**
     * Determine whether the agency officer can record operational updates or submit for review.
     */
    public function updateProgress(User $user, Assignment $assignment): bool
    {
        if (! $user->isAgency()) {
            return false;
        }

        return $user->agencies()
            ->where('agencies.id', $assignment->agency_id)
            ->where('agencies.is_active', true)
            ->exists();
    }
}
