<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AssignmentStatus;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Assignment;
use App\Models\AuditLog;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $statusCounts = [
            'submitted' => Report::where('report_status', 'SUBMITTED')->orWhere('report_status', ReportStatus::SUBMITTED)->count(),
            'under_review' => Report::where('report_status', 'UNDER_REVIEW')->orWhere('report_status', ReportStatus::UNDER_REVIEW)->count(),
            'needs_information' => Report::where('report_status', 'NEEDS_INFORMATION')->orWhere('report_status', ReportStatus::NEEDS_INFORMATION)->count(),
            'verified' => Report::where('report_status', 'VERIFIED')->orWhere('report_status', ReportStatus::VERIFIED)->count(),
            'dispatched' => Report::where('report_status', 'DISPATCHED')->orWhere('report_status', ReportStatus::DISPATCHED)->count(),
            'resolution_review' => Report::where('report_status', 'RESOLUTION_REVIEW')->orWhere('report_status', ReportStatus::RESOLUTION_REVIEW)->count(),
            'resolved_verified' => Report::where('report_status', 'RESOLVED_VERIFIED')->orWhere('report_status', ReportStatus::RESOLVED_VERIFIED)->count(),
            'closed_with_reason' => Report::where('report_status', 'CLOSED_WITH_REASON')->orWhere('report_status', ReportStatus::CLOSED_WITH_REASON)->count(),
            'total' => Report::count(),
        ];

        $priorityQueue = Report::query()
            ->with(['category', 'createdByUser', 'creator'])
            ->whereIn('report_status', ['SUBMITTED', 'UNDER_REVIEW', 'NEEDS_INFORMATION'])
            ->orderByDesc('created_at')
            ->limit(6)
            ->get();

        $recentAuditLogs = AuditLog::query()
            ->with(['actor', 'actorUser'])
            ->orderByDesc('created_at')
            ->limit(6)
            ->get();

        $activeAssignments = Assignment::whereIn('assignment_status', [
            'ASSIGNED',
            'RECEIVED_BY_AGENCY',
            'IN_PROGRESS',
            'SUBMITTED_FOR_REVIEW',
            AssignmentStatus::ASSIGNED->value,
            AssignmentStatus::RECEIVED_BY_AGENCY->value,
            AssignmentStatus::IN_PROGRESS->value,
            AssignmentStatus::SUBMITTED_FOR_REVIEW->value,
        ])->with(['report.category', 'agency'])->latest()->take(6)->get();

        $agencyStats = Agency::where('is_active', true)
            ->withCount([
                'assignments as total_assignments_count',
                'assignments as in_progress_count' => fn ($q) => $q->whereIn('assignment_status', ['IN_PROGRESS', AssignmentStatus::IN_PROGRESS->value]),
                'assignments as completed_count' => fn ($q) => $q->whereIn('assignment_status', ['COMPLETED', AssignmentStatus::COMPLETED->value]),
            ])->get();

        return Inertia::render('admin/dashboard', [
            'statusCounts' => $statusCounts,
            'priorityQueue' => $priorityQueue,
            'pendingReviews' => $priorityQueue,
            'recentAuditLogs' => $recentAuditLogs,
            'activeAssignments' => $activeAssignments,
            'agencyStats' => $agencyStats,
        ]);
    }

    public function index(Request $request): Response
    {
        return $this->__invoke($request);
    }
}
