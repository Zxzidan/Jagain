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
     * Determine whether the user can view the report.
     */
    public function view(User $user, Report $report): bool
    {
        // Admin can view all reports
        if ($user->isAdmin()) {
            return true;
        }

        // Community user can only view their own reports or public reports
        return $report->created_by_user_id === $user->id || $report->visibility === 'PUBLIC';
    }

    /**
     * Determine whether the user can create reports.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can provide additional information.
     */
    public function provideAdditionalInfo(User $user, Report $report): bool
    {
        // Only report owner can provide additional information, and only when status is NEEDS_INFORMATION
        return $report->created_by_user_id === $user->id
            && $report->report_status === ReportStatus::NEEDS_INFORMATION;
    }

    /**
     * Determine whether the user can upload evidence for the report.
     */
    public function uploadEvidence(User $user, Report $report): bool
    {
        // Only report owner can upload evidence to their report
        return $report->created_by_user_id === $user->id;
    }
}
