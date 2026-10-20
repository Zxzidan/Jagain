<?php

namespace App\Policies;

use App\Models\Report;
use App\Models\User;

class ReportPolicy
{
    /**
     * Determine whether the user can view any reports.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the specific report.
     * Enforces object-level authorization: Citizen can only view own private report,
     * Agency can only view reports assigned to their agency, Admin can view all.
     */
    public function view(User $user, Report $report): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($report->created_by_user_id === $user->id) {
            return true;
        }

        if ($user->isAgency()) {
            // Check if this report is assigned to any of user's active agencies
            $userAgencyIds = $user->agencies()->where('agencies.is_active', true)->pluck('agencies.id');

            return $report->assignments()->whereIn('agency_id', $userAgencyIds)->exists();
        }

        return false;
    }

    /**
     * Determine whether the user can create reports.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the citizen can provide additional information.
     */
    public function provideInformation(User $user, Report $report): bool
    {
        return $report->created_by_user_id === $user->id;
    }

    /**
     * Determine whether the user can review reports (Admin only).
     */
    public function review(User $user, Report $report): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can assign reports to an agency (Admin only).
     */
    public function assign(User $user, Report $report): bool
    {
        return $user->isAdmin();
    }
}
