<?php

namespace App\Http\Controllers\Admin;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Services\AssignmentService;
use App\Services\ReportTransitionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use InvalidArgumentException;

class AdminReportController extends Controller
{
    public function __construct(
        protected ReportTransitionService $transitionService,
        protected AssignmentService $assignmentService
    ) {}

    /**
     * List all reports with search and filter controls.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $province = $request->query('province');
        $categorySlug = $request->query('category');
        $search = $request->query('search');

        $query = Report::with(['category', 'createdByUser', 'latestAssignment.agency'])
            ->latest();

        if ($status) {
            $query->where('report_status', $status);
        }

        if ($province) {
            $query->where('province', $province);
        }

        if ($categorySlug) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('tracking_code', 'like', "%{$search}%")
                    ->orWhere('regency_city', 'like', "%{$search}%");
            });
        }

        $reports = $query->paginate(12)->withQueryString();
        $categories = ReportCategory::where('is_active', true)->get(['id', 'name', 'slug']);

        $provinces = [
            'Kalimantan Barat',
            'Kalimantan Tengah',
            'Kalimantan Selatan',
            'Kalimantan Timur',
            'Kalimantan Utara',
        ];

        return Inertia::render('admin/reports-index', [
            'reports' => $reports,
            'categories' => $categories,
            'provinces' => $provinces,
            'filters' => [
                'status' => $status,
                'province' => $province,
                'category' => $categorySlug,
                'search' => $search,
            ],
            'statusOptions' => array_map(fn (ReportStatus $s) => [
                'value' => $s->value,
                'label' => $s->label(),
            ], ReportStatus::cases()),
        ]);
    }

    /**
     * Inspect single report with duplicate check, evidence, and actions.
     */
    public function show(Report $report): Response
    {
        $report->load([
            'category',
            'createdByUser',
            'evidence',
            'statusHistories.actorUser',
            'assignments.agency',
            'assignments.operationalUpdates.createdByUser',
            'assignments.histories.actorUser',
        ]);

        // Duplicate check: Find other reports within ~0.5 degrees (~55km) within 7 days
        $potentialDuplicates = Report::where('id', '!=', $report->id)
            ->whereBetween('latitude', [$report->latitude - 0.5, $report->latitude + 0.5])
            ->whereBetween('longitude', [$report->longitude - 0.5, $report->longitude + 0.5])
            ->where('created_at', '>=', $report->created_at->subDays(7))
            ->where('created_at', '<=', $report->created_at->addDays(7))
            ->with('category')
            ->take(5)
            ->get();

        // Active agencies available for assignment
        $agencies = Agency::where('is_active', true)->orderBy('name')->get();

        // Determine which statuses current report can transition to
        $availableTransitions = array_filter(
            ReportStatus::cases(),
            fn (ReportStatus $target) => $report->report_status->canTransitionTo($target)
        );

        return Inertia::render('admin/report-show', [
            'report' => $report,
            'potentialDuplicates' => $potentialDuplicates,
            'agencies' => $agencies,
            'availableTransitions' => array_values(array_map(fn (ReportStatus $s) => [
                'value' => $s->value,
                'label' => $s->label(),
            ], $availableTransitions)),
            'fireConditionOptions' => array_map(fn (FireCondition $f) => [
                'value' => $f->value,
                'label' => $f->label(),
            ], FireCondition::cases()),
        ]);
    }

    /**
     * Perform validated status transition.
     */
    public function transition(Request $request, Report $report): RedirectResponse
    {
        $validated = $request->validate([
            'target_status' => ['required', 'string'],
            'reason' => ['nullable', 'required_if:target_status,CLOSED_WITH_REASON', 'string', 'max:1000'],
            'note' => ['nullable', 'required_if:target_status,NEEDS_INFORMATION', 'string', 'max:1000'],
            'fire_condition' => ['nullable', 'string'],
        ], [
            'reason.required_if' => 'Penutupan laporan wajib menyertakan alasan yang jelas.',
            'note.required_if' => 'Permintaan informasi tambahan wajib menjelaskan informasi apa yang dibutuhkan.',
        ]);

        $targetStatus = ReportStatus::tryFrom($validated['target_status']);
        if (! $targetStatus) {
            return back()->withErrors(['target_status' => 'Status tujuan tidak valid.']);
        }

        if (! $report->report_status->canTransitionTo($targetStatus)) {
            return back()->withErrors(['target_status' => "Transisi status dari '{$report->report_status->label()}' ke '{$targetStatus->label()}' tidak diizinkan."]);
        }

        $fireCondition = ! empty($validated['fire_condition'])
            ? FireCondition::tryFrom($validated['fire_condition'])
            : null;

        try {
            $this->transitionService->transition(
                report: $report,
                targetStatus: $targetStatus,
                actor: $request->user(),
                reason: $validated['reason'] ?? null,
                note: $validated['note'] ?? null,
                fireCondition: $fireCondition
            );

            return back()->with('success', "Status laporan berhasil diperbarui menjadi: {$targetStatus->label()}");
        } catch (InvalidArgumentException $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Dispatch report to an agency.
     */
    public function assign(Request $request, Report $report): RedirectResponse
    {
        $validated = $request->validate([
            'agency_id' => ['required', 'exists:agencies,id'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $agency = Agency::where('id', $validated['agency_id'])->firstOrFail();

        if (! $agency->is_active) {
            return back()->with('error', 'Instansi yang dipilih tidak sedang aktif.');
        }

        $this->assignmentService->assignReport(
            report: $report,
            agency: $agency,
            actor: $request->user(),
            notes: $validated['notes'] ?? null
        );

        return back()->with('success', "Laporan berhasil ditugaskan kepada: {$agency->name}");
    }
}
