<?php

namespace App\Policies;

use App\Enums\ReportStatus;
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
     */
    public function view(User $user, Report $report): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($report->created_by_user_id === $user->id) {
            return true;
        }

        if ($report->visibility === 'PUBLIC') {
            return true;
        }

        if ($user->isAgency()) {
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
     * Determine whether the user can provide additional information (status constrained).
     */
    public function provideAdditionalInfo(User $user, Report $report): bool
    {
        $statusValue = $report->report_status instanceof \BackedEnum
            ? $report->report_status->value
            : (string) $report->report_status;

        return $report->created_by_user_id === $user->id
            && ($statusValue === 'NEEDS_INFORMATION' || $report->report_status === ReportStatus::NEEDS_INFORMATION);
    }

    /**
     * Determine whether the user can upload evidence for the report.
     */
    public function uploadEvidence(User $user, Report $report): bool
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
