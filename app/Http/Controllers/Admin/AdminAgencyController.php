<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Services\AuditLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAgencyController extends Controller
{
    public function __construct(
        private readonly AuditLogService $auditLogService,
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $query = Agency::query()
            ->withCount('assignments');

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('jurisdiction', 'like', "%{$search}%")
                    ->orWhere('agency_type', 'like', "%{$search}%");
            });
        }

        $agencies = $query->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/agencies/index', [
            'agencies' => $agencies,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'agency_type' => ['required', 'string', 'max:100'],
            'jurisdiction' => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $agency = Agency::create([
            'name' => $validated['name'],
            'agency_type' => $validated['agency_type'],
            'jurisdiction' => $validated['jurisdiction'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $this->auditLogService->log(
            actor: $request->user(),
            action: 'AGENCY_CREATED',
            entityType: 'Agency',
            entityId: $agency->id,
            after: $agency->toArray(),
        );

        return back()->with('success', "Instansi {$agency->name} berhasil ditambahkan.");
    }

    public function update(Request $request, Agency $agency): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'agency_type' => ['required', 'string', 'max:100'],
            'jurisdiction' => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $before = $agency->toArray();
        $agency->update($validated);

        $this->auditLogService->log(
            actor: $request->user(),
            action: 'AGENCY_UPDATED',
            entityType: 'Agency',
            entityId: $agency->id,
            before: $before,
            after: $agency->toArray(),
        );

        return back()->with('success', "Data instansi {$agency->name} berhasil diperbarui.");
    }

    public function toggleStatus(Request $request, Agency $agency): RedirectResponse
    {
        $before = ['is_active' => $agency->is_active];
        $agency->is_active = ! $agency->is_active;
        $agency->save();

        $this->auditLogService->log(
            actor: $request->user(),
            action: 'AGENCY_STATUS_TOGGLED',
            entityType: 'Agency',
            entityId: $agency->id,
            before: $before,
            after: ['is_active' => $agency->is_active],
        );

        $statusLabel = $agency->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Status instansi {$agency->name} berhasil {$statusLabel}.");
    }
}
