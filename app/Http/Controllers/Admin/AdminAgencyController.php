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
        protected AuditLogService $auditLogService
    ) {}

    public function index(): Response
    {
        $agencies = Agency::withCount(['memberships', 'assignments'])->latest()->get();

        return Inertia::render('admin/agencies-index', [
            'agencies' => $agencies,
            'jurisdictions' => [
                'Kalimantan Barat',
                'Kalimantan Tengah',
                'Kalimantan Selatan',
                'Kalimantan Timur',
                'Kalimantan Utara',
            ],
            'agencyTypes' => [
                'BPBD' => 'Badan Penanggulangan Bencana Daerah (BPBD)',
                'MANGGALA_AGNI' => 'Manggala Agni (KLHK)',
                'DISDAMKAR' => 'Dinas Pemadam Kebakaran & Penyelamatan',
                'DINAS_KEHUTANAN' => 'Dinas Kehutanan Provinsi/Kabupaten',
                'OTHER' => 'Instansi/Satgas Terkait Lainnya',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'code' => ['required', 'string', 'max:50', 'unique:agencies,code'],
            'agency_type' => ['required', 'string'],
            'jurisdiction' => ['required', 'string'],
            'contact_email' => ['nullable', 'email', 'max:100'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
        ]);

        $agency = Agency::create([
            ...$validated,
            'is_active' => true,
        ]);

        $this->auditLogService->record(
            action: 'AGENCY_CREATED',
            entity: $agency,
            before: null,
            after: $agency->toArray(),
            reason: 'Penambahan instansi baru oleh Administrator',
            actor: $request->user()
        );

        return back()->with('success', "Instansi {$agency->name} berhasil ditambahkan.");
    }

    public function toggleActive(Request $request, Agency $agency): RedirectResponse
    {
        $before = ['is_active' => $agency->is_active];
        $agency->is_active = ! $agency->is_active;
        $agency->save();

        $this->auditLogService->record(
            action: 'AGENCY_STATUS_TOGGLED',
            entity: $agency,
            before: $before,
            after: ['is_active' => $agency->is_active],
            reason: 'Pengubahan status aktif instansi',
            actor: $request->user()
        );

        $statusText = $agency->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Instansi {$agency->name} berhasil {$statusText}.");
    }
}
