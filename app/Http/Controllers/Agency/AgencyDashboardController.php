<?php

namespace App\Http\Controllers\Agency;

use App\Enums\AssignmentStatus;
use App\Http\Controllers\Controller;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AgencyDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $agency = $user->currentAgency();

        if (! $agency) {
            abort(403, 'Akun Anda belum terhubung dengan instansi penanganan resmi yang aktif.');
        }

        $agencyAssignments = Assignment::where('agency_id', $agency->id);

        $statusCounts = [
            'assigned' => (clone $agencyAssignments)->where('assignment_status', AssignmentStatus::ASSIGNED)->count(),
            'received' => (clone $agencyAssignments)->where('assignment_status', AssignmentStatus::RECEIVED_BY_AGENCY)->count(),
            'in_progress' => (clone $agencyAssignments)->where('assignment_status', AssignmentStatus::IN_PROGRESS)->count(),
            'submitted_for_review' => (clone $agencyAssignments)->where('assignment_status', AssignmentStatus::SUBMITTED_FOR_REVIEW)->count(),
            'completed' => (clone $agencyAssignments)->where('assignment_status', AssignmentStatus::COMPLETED)->count(),
        ];

        $pendingTasks = Assignment::where('agency_id', $agency->id)
            ->whereIn('assignment_status', [
                AssignmentStatus::ASSIGNED,
                AssignmentStatus::RECEIVED_BY_AGENCY,
                AssignmentStatus::IN_PROGRESS,
            ])
            ->with(['report.category'])
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('opd/dashboard', [
            'agency' => $agency,
            'statusCounts' => $statusCounts,
            'pendingTasks' => $pendingTasks,
        ]);
    }
}
