<?php

namespace App\Http\Controllers\Agency;

use App\Enums\AssignmentStatus;
use App\Enums\FireCondition;
use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Services\AssignmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use InvalidArgumentException;

class AgencyAssignmentController extends Controller
{
    public function __construct(
        protected AssignmentService $assignmentService
    ) {}

    /**
     * List assignments assigned to the logged-in officer's agency.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $agency = $user->currentAgency();

        if (! $agency) {
            abort(403, 'Akun Anda belum terhubung dengan instansi aktif.');
        }

        $status = $request->query('status');

        $query = Assignment::where('agency_id', $agency->id)
            ->with(['report.category'])
            ->latest('assigned_at');

        if ($status) {
            $query->where('assignment_status', $status);
        }

        $assignments = $query->paginate(12)->withQueryString();

        return Inertia::render('opd/assignments-index', [
            'agency' => $agency,
            'assignments' => $assignments,
            'filters' => [
                'status' => $status,
            ],
            'statusOptions' => array_map(fn (AssignmentStatus $s) => [
                'value' => $s->value,
                'label' => $s->label(),
            ], AssignmentStatus::cases()),
        ]);
    }

    /**
     * Show assignment detail.
     */
    public function show(Assignment $assignment): Response
    {
        Gate::authorize('view', $assignment);

        $assignment->load([
            'agency',
            'report.category',
            'report.evidence',
            'operationalUpdates.createdByUser',
            'histories.actorUser',
        ]);

        return Inertia::render('opd/assignment-show', [
            'assignment' => $assignment,
            'fireConditionOptions' => array_map(fn (FireCondition $f) => [
                'value' => $f->value,
                'label' => $f->label(),
            ], [
                FireCondition::OBSERVED_ACTIVE,
                FireCondition::OBSERVED_CONTAINED,
                FireCondition::OBSERVED_EXTINGUISHED,
            ]),
        ]);
    }

    /**
     * Accept or decline assignment.
     */
    public function respond(Request $request, Assignment $assignment): RedirectResponse
    {
        Gate::authorize('respond', $assignment);

        $validated = $request->validate([
            'response_type' => ['required', 'in:ACCEPT,DECLINE'],
            'decline_reason' => ['nullable', 'required_if:response_type,DECLINE', 'string', 'min:5', 'max:1000'],
        ], [
            'decline_reason.required_if' => 'Penolakan penugasan wajib menyertakan alasan yang jelas.',
        ]);

        $targetStatus = $validated['response_type'] === 'ACCEPT'
            ? AssignmentStatus::RECEIVED_BY_AGENCY
            : AssignmentStatus::DECLINED_BY_AGENCY;

        try {
            $this->assignmentService->respondToAssignment(
                assignment: $assignment,
                targetStatus: $targetStatus,
                actor: $request->user(),
                declineReason: $validated['decline_reason'] ?? null
            );

            $msg = $targetStatus === AssignmentStatus::RECEIVED_BY_AGENCY
                ? 'Penugasan berhasil diterima. Silakan perbarui progres penanganan di lapangan.'
                : 'Penugasan telah ditolak beserta alasan yang tercatat.';

            return back()->with('success', $msg);
        } catch (InvalidArgumentException $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Add operational progress update.
     */
    public function updateProgress(Request $request, Assignment $assignment): RedirectResponse
    {
        Gate::authorize('updateProgress', $assignment);

        $validated = $request->validate([
            'update_type' => ['required', 'string', 'in:PATROL,CONTAINMENT,EXTINGUISHING,STATUS_CHECK,GENERAL_UPDATE'],
            'note' => ['required', 'string', 'min:10', 'max:2000'],
            'fire_condition_observed' => ['nullable', 'string'],
            'evidence_file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $fireCondition = ! empty($validated['fire_condition_observed'])
            ? FireCondition::tryFrom($validated['fire_condition_observed'])
            : null;

        $evidencePath = null;
        if ($request->hasFile('evidence_file')) {
            $file = $request->file('evidence_file');
            $filename = 'opd_update_'.Str::random(24).'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('evidence/'.$assignment->report_id, $filename, 'public');
            $evidencePath = '/storage/'.$path;
        }

        $this->assignmentService->recordOperationalUpdate(
            assignment: $assignment,
            actor: $request->user(),
            updateType: $validated['update_type'],
            note: $validated['note'],
            fireConditionObserved: $fireCondition,
            evidencePath: $evidencePath
        );

        return back()->with('success', 'Catatan progres operasional berhasil ditambahkan.');
    }

    /**
     * Submit assignment for resolution review.
     */
    public function submitReview(Request $request, Assignment $assignment): RedirectResponse
    {
        Gate::authorize('updateProgress', $assignment);

        $validated = $request->validate([
            'summary' => ['required', 'string', 'min:15', 'max:2000'],
        ]);

        $this->assignmentService->submitForResolutionReview(
            assignment: $assignment,
            actor: $request->user(),
            summary: $validated['summary']
        );

        return back()->with('success', 'Hasil penanganan berhasil diajukan untuk ditinjau oleh Administrator.');
    }
}
