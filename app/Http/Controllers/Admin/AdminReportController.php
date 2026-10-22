<?php

namespace App\Http\Controllers\Admin;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Services\AssignmentService;
use App\Services\ReportTransitionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminReportController extends Controller
{
    public function __construct(
        protected ReportTransitionService $transitionService,
        protected AssignmentService $assignmentService
    ) {}

    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $categoryId = $request->query('category_id');
        $search = $request->query('search');
        $province = $request->query('province');

        $query = Report::query()
            ->with(['category', 'creator', 'createdByUser', 'latestAssignment.agency']);

        if ($status) {
            $query->where('report_status', $status);
        }

        if ($province) {
            $query->where('province', $province);
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location_description', 'like', "%{$search}%")
                    ->orWhere('tracking_code', 'like', "%{$search}%")
                    ->orWhere('report_number', 'like', "%{$search}%")
                    ->orWhere('id', $search);
            });
        }

        $reports = $query->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        $categories = Category::where('is_active', true)->orderBy('name')->get();
        if ($categories->isEmpty()) {
            $categories = ReportCategory::where('is_active', true)->orderBy('name')->get();
        }

        $statusCounts = [
            'all' => Report::count(),
            'SUBMITTED' => Report::where('report_status', 'SUBMITTED')->orWhere('report_status', ReportStatus::SUBMITTED)->count(),
            'UNDER_REVIEW' => Report::where('report_status', 'UNDER_REVIEW')->orWhere('report_status', ReportStatus::UNDER_REVIEW)->count(),
            'NEEDS_INFORMATION' => Report::where('report_status', 'NEEDS_INFORMATION')->orWhere('report_status', ReportStatus::NEEDS_INFORMATION)->count(),
            'VERIFIED' => Report::where('report_status', 'VERIFIED')->orWhere('report_status', ReportStatus::VERIFIED)->count(),
            'DISPATCHED' => Report::where('report_status', 'DISPATCHED')->orWhere('report_status', ReportStatus::DISPATCHED)->count(),
            'RESOLUTION_REVIEW' => Report::where('report_status', 'RESOLUTION_REVIEW')->orWhere('report_status', ReportStatus::RESOLUTION_REVIEW)->count(),
            'RESOLVED_VERIFIED' => Report::where('report_status', 'RESOLVED_VERIFIED')->orWhere('report_status', ReportStatus::RESOLVED_VERIFIED)->count(),
            'CLOSED_WITH_REASON' => Report::where('report_status', 'CLOSED_WITH_REASON')->orWhere('report_status', ReportStatus::CLOSED_WITH_REASON)->count(),
        ];

        return Inertia::render('admin/reports/index', [
            'reports' => $reports,
            'categories' => $categories,
            'filters' => [
                'status' => $status,
                'category_id' => $categoryId ?: null,
                'province' => $province ?: null,
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
            'createdByUser',
            'evidence',
            'statusHistories.actor',
            'statusHistories.actorUser',
            'assignments.agency',
            'assignments.assigner',
            'assignments.histories.actor',
            'assignments.histories.actorUser',
            'assignments.operationalUpdates.createdByUser',
            'assignments.updates.creator',
            'assignments.updates.evidence',
        ]);

        $activeAgencies = Agency::where('is_active', true)
            ->orderBy('name')
            ->get();

        $statusStr = $report->report_status instanceof ReportStatus
            ? $report->report_status->value
            : (string) $report->report_status;

        $allowedTransitions = ReportTransitionService::VALID_TRANSITIONS[$statusStr] ?? [];

        $potentialDuplicates = Report::query()
            ->where('id', '!=', $report->id)
            ->where(function ($q) use ($report) {
                if ($report->category_id) {
                    $q->where('category_id', $report->category_id);
                }
                $q->orWhereBetween('latitude', [$report->latitude - 0.5, $report->latitude + 0.5]);
            })
            ->limit(5)
            ->get(['id', 'title', 'report_status', 'created_at', 'location_description', 'latitude', 'longitude']);

        return Inertia::render('admin/reports/show', [
            'report' => $report,
            'activeAgencies' => $activeAgencies,
            'agencies' => $activeAgencies,
            'allowedTransitions' => $allowedTransitions,
            'availableTransitions' => array_values(array_map(fn ($s) => [
                'value' => $s,
                'label' => ReportStatus::tryFrom($s)?->label() ?? $s,
            ], $allowedTransitions)),
            'potentialDuplicates' => $potentialDuplicates,
            'fireConditionOptions' => array_map(fn (FireCondition $f) => [
                'value' => $f->value,
                'label' => $f->label(),
            ], FireCondition::cases()),
        ]);
    }

    public function transition(
        Request $request,
        Report $report,
        ?ReportTransitionService $transitionService = null,
    ): RedirectResponse {
        $svc = $transitionService ?? $this->transitionService;

        $validated = $request->validate([
            'target_status' => ['required', 'string'],
            'reason' => ['nullable', 'string', 'max:1000'],
            'note' => ['nullable', 'string', 'max:1000'],
            'public_note' => ['nullable', 'string', 'max:1000'],
            'lock_version' => ['nullable', 'integer'],
            'fire_condition' => ['nullable', 'string'],
        ]);

        $svc->transition(
            report: $report,
            targetStatus: $validated['target_status'],
            actor: $request->user(),
            reason: $validated['reason'] ?? null,
            note: $validated['note'] ?? $validated['public_note'] ?? null,
            publicNote: $validated['public_note'] ?? null,
            expectedLockVersion: isset($validated['lock_version']) ? (int) $validated['lock_version'] : null,
            fireCondition: $validated['fire_condition'] ?? null,
        );

        return back()->with('success', "Status laporan berhasil diubah menjadi {$validated['target_status']}.");
    }

    public function assign(
        Request $request,
        Report $report,
        ?AssignmentService $assignmentService = null,
    ): RedirectResponse {
        $svc = $assignmentService ?? $this->assignmentService;

        $validated = $request->validate([
            'agency_id' => ['required', 'exists:agencies,id'],
            'note' => ['nullable', 'string', 'max:1000'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'lock_version' => ['nullable', 'integer'],
        ]);

        $agency = Agency::whereKey((int) $validated['agency_id'])->firstOrFail();

        $svc->assign(
            report: $report,
            agency: $agency,
            actor: $request->user(),
            note: $validated['note'] ?? $validated['notes'] ?? null,
            expectedLockVersion: isset($validated['lock_version']) ? (int) $validated['lock_version'] : null,
        );

        return back()->with('success', "Laporan berhasil ditugaskan kepada {$agency->name}.");
    }
}
