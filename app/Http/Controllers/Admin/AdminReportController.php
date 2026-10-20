<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Report;
use App\Services\AssignmentService;
use App\Services\ReportTransitionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminReportController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();
        $categoryId = $request->integer('category_id');
        $search = $request->string('search')->toString();

        $query = Report::query()
            ->with(['category', 'creator', 'latestAssignment.agency']);

        if (! empty($status)) {
            $query->where('report_status', $status);
        }

        if (! empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location_description', 'like', "%{$search}%")
                    ->orWhere('id', $search);
            });
        }

        $reports = $query->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        $categories = Category::where('is_active', true)->orderBy('name')->get(['id', 'name']);

        $statusCounts = [
            'ALL' => Report::count(),
            'SUBMITTED' => Report::where('report_status', 'SUBMITTED')->count(),
            'UNDER_REVIEW' => Report::where('report_status', 'UNDER_REVIEW')->count(),
            'NEEDS_INFORMATION' => Report::where('report_status', 'NEEDS_INFORMATION')->count(),
            'VERIFIED' => Report::where('report_status', 'VERIFIED')->count(),
            'DISPATCHED' => Report::where('report_status', 'DISPATCHED')->count(),
            'RESOLUTION_REVIEW' => Report::where('report_status', 'RESOLUTION_REVIEW')->count(),
            'RESOLVED_VERIFIED' => Report::where('report_status', 'RESOLVED_VERIFIED')->count(),
            'CLOSED_WITH_REASON' => Report::where('report_status', 'CLOSED_WITH_REASON')->count(),
        ];

        return Inertia::render('admin/reports/index', [
            'reports' => $reports,
            'categories' => $categories,
            'filters' => [
                'status' => $status,
                'category_id' => $categoryId ?: null,
                'search' => $search,
            ],
            'statusCounts' => $statusCounts,
        ]);
    }

    public function show(Report $report): Response
    {
        $report->load([
            'category',
            'creator',
            'evidence',
            'statusHistories.actor',
            'assignments.agency',
            'assignments.assigner',
            'assignments.histories.actor',
            'assignments.updates.creator',
            'assignments.updates.evidence',
        ]);

        $activeAgencies = Agency::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'agency_type', 'jurisdiction']);

        $allowedTransitions = ReportTransitionService::VALID_TRANSITIONS[$report->report_status] ?? [];

        // Check potential duplicates: reports nearby or same category within recent days
        $potentialDuplicates = Report::query()
            ->where('id', '!=', $report->id)
            ->where('category_id', $report->category_id)
            ->whereBetween('latitude', [$report->latitude - 0.1, $report->latitude + 0.1])
            ->whereBetween('longitude', [$report->longitude - 0.1, $report->longitude + 0.1])
            ->limit(5)
            ->get(['id', 'title', 'report_status', 'created_at', 'location_description']);

        return Inertia::render('admin/reports/show', [
            'report' => $report,
            'activeAgencies' => $activeAgencies,
            'allowedTransitions' => $allowedTransitions,
            'potentialDuplicates' => $potentialDuplicates,
        ]);
    }

    public function transition(
        Request $request,
        Report $report,
        ReportTransitionService $transitionService,
    ): RedirectResponse {
        $validated = $request->validate([
            'target_status' => ['required', 'string'],
            'reason' => ['nullable', 'string', 'max:1000'],
            'note' => ['nullable', 'string', 'max:1000'],
            'public_note' => ['nullable', 'string', 'max:1000'],
            'lock_version' => ['required', 'integer'],
        ]);

        $transitionService->transition(
            report: $report,
            targetStatus: $validated['target_status'],
            actor: $request->user(),
            reason: $validated['reason'] ?? null,
            note: $validated['note'] ?? null,
            publicNote: $validated['public_note'] ?? null,
            expectedLockVersion: (int) $validated['lock_version'],
        );

        return back()->with('success', "Status laporan berhasil diubah menjadi {$validated['target_status']}.");
    }

    public function assign(
        Request $request,
        Report $report,
        AssignmentService $assignmentService,
    ): RedirectResponse {
        $validated = $request->validate([
            'agency_id' => ['required', 'exists:agencies,id'],
            'note' => ['nullable', 'string', 'max:1000'],
            'lock_version' => ['required', 'integer'],
        ]);

        $agency = Agency::whereKey((int) $validated['agency_id'])->firstOrFail();

        $assignmentService->assign(
            report: $report,
            agency: $agency,
            actor: $request->user(),
            note: $validated['note'] ?? null,
            expectedLockVersion: (int) $validated['lock_version'],
        );

        return back()->with('success', "Laporan berhasil ditugaskan kepada {$agency->name}.");
    }
}
