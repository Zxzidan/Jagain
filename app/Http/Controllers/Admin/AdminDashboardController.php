<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AssignmentStatus;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Assignment;
use App\Models\Report;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $statusCounts = [
            'submitted' => Report::where('report_status', ReportStatus::SUBMITTED)->count(),
            'under_review' => Report::where('report_status', ReportStatus::UNDER_REVIEW)->count(),
            'needs_information' => Report::where('report_status', ReportStatus::NEEDS_INFORMATION)->count(),
            'verified' => Report::where('report_status', ReportStatus::VERIFIED)->count(),
            'dispatched' => Report::where('report_status', ReportStatus::DISPATCHED)->count(),
            'resolution_review' => Report::where('report_status', ReportStatus::RESOLUTION_REVIEW)->count(),
            'resolved_verified' => Report::where('report_status', ReportStatus::RESOLVED_VERIFIED)->count(),
            'closed_with_reason' => Report::where('report_status', ReportStatus::CLOSED_WITH_REASON)->count(),
        ];

        $pendingReviews = Report::whereIn('report_status', [
            ReportStatus::SUBMITTED,
            ReportStatus::UNDER_REVIEW,
            ReportStatus::RESOLUTION_REVIEW,
        ])->with(['category', 'createdByUser'])->latest()->take(6)->get();

        $activeAssignments = Assignment::whereIn('assignment_status', [
            AssignmentStatus::ASSIGNED,
            AssignmentStatus::RECEIVED_BY_AGENCY,
            AssignmentStatus::IN_PROGRESS,
            AssignmentStatus::SUBMITTED_FOR_REVIEW,
        ])->with(['report.category', 'agency'])->latest()->take(6)->get();

        $agencyStats = Agency::where('is_active', true)
            ->withCount([
                'assignments as total_assignments_count',
                'assignments as in_progress_count' => fn ($q) => $q->where('assignment_status', AssignmentStatus::IN_PROGRESS),
                'assignments as completed_count' => fn ($q) => $q->where('assignment_status', AssignmentStatus::COMPLETED),
            ])
            ->get();

        return Inertia::render('admin/dashboard', [
            'statusCounts' => $statusCounts,
            'pendingReviews' => $pendingReviews,
            'activeAssignments' => $activeAssignments,
            'agencyStats' => $agencyStats,
        ]);
    }
}
