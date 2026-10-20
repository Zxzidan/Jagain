<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
            'submitted' => Report::where('report_status', 'SUBMITTED')->count(),
            'under_review' => Report::where('report_status', 'UNDER_REVIEW')->count(),
            'needs_information' => Report::where('report_status', 'NEEDS_INFORMATION')->count(),
            'verified' => Report::where('report_status', 'VERIFIED')->count(),
            'dispatched' => Report::where('report_status', 'DISPATCHED')->count(),
            'resolution_review' => Report::where('report_status', 'RESOLUTION_REVIEW')->count(),
            'resolved_verified' => Report::where('report_status', 'RESOLVED_VERIFIED')->count(),
            'closed_with_reason' => Report::where('report_status', 'CLOSED_WITH_REASON')->count(),
            'total' => Report::count(),
        ];

        $priorityQueue = Report::query()
            ->with(['category', 'creator'])
            ->whereIn('report_status', ['SUBMITTED', 'UNDER_REVIEW', 'NEEDS_INFORMATION'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        $recentAuditLogs = AuditLog::query()
            ->with('actor')
            ->orderByDesc('created_at')
            ->limit(6)
            ->get();

        return Inertia::render('admin/dashboard', [
            'statusCounts' => $statusCounts,
            'priorityQueue' => $priorityQueue,
            'recentAuditLogs' => $recentAuditLogs,
        ]);
    }
}
