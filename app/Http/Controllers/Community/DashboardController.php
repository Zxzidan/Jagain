<?php

namespace App\Http\Controllers\Community;

use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the community member dashboard with real report summaries.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Calculate statistics based on real user reports
        $totalReports = $user->reports()->count();
        $submittedCount = $user->reports()->where('report_status', ReportStatus::SUBMITTED->value)->count();
        $inReviewCount = $user->reports()->whereIn('report_status', [
            ReportStatus::UNDER_REVIEW->value,
            ReportStatus::NEEDS_INFORMATION->value,
        ])->count();
        $verifiedCount = $user->reports()->whereIn('report_status', [
            ReportStatus::VERIFIED->value,
            ReportStatus::DISPATCHED->value,
            ReportStatus::RESOLUTION_REVIEW->value,
        ])->count();
        $resolvedCount = $user->reports()->whereIn('report_status', [
            ReportStatus::RESOLVED_VERIFIED->value,
            ReportStatus::CLOSED_WITH_REASON->value,
        ])->count();

        // Needs information count to highlight actionable reports
        $needsInfoCount = $user->reports()->where('report_status', ReportStatus::NEEDS_INFORMATION->value)->count();

        // Latest 5 reports for quick overview
        $recentReports = $user->reports()
            ->with(['evidence'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Report $report) => [
                'id' => $report->id,
                'report_number' => $report->report_number,
                'title' => $report->title,
                'category' => $report->category,
                'location_description' => $report->location_description,
                'report_status' => $report->report_status->value,
                'status_label' => $report->report_status->label(),
                'fire_condition' => $report->fire_condition->value,
                'fire_condition_label' => $report->fire_condition->label(),
                'created_at' => $report->created_at?->toISOString(),
                'reported_occurrence_at' => $report->reported_occurrence_at?->toISOString(),
                'has_evidence' => $report->evidence->isNotEmpty(),
                'evidence_count' => $report->evidence->count(),
            ]);

        return Inertia::render('dashboard', [
            'metrics' => [
                'total' => $totalReports,
                'submitted' => $submittedCount,
                'in_review' => $inReviewCount,
                'verified' => $verifiedCount,
                'resolved' => $resolvedCount,
                'needs_info' => $needsInfoCount,
            ],
            'recentReports' => $recentReports,
        ]);
    }
}
