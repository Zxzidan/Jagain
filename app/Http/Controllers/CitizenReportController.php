<?php

namespace App\Http\Controllers;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Models\Evidence;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\ReportStatusHistory;
use App\Services\AuditLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CitizenReportController extends Controller
{
    public function __construct(
        protected AuditLogService $auditLogService
    ) {}

    /**
     * Show report creation form.
     */
    public function create(): Response
    {
        $categories = ReportCategory::where('is_active', true)->get(['id', 'name', 'slug', 'description']);

        $provinces = [
            'Kalimantan Barat',
            'Kalimantan Tengah',
            'Kalimantan Selatan',
            'Kalimantan Timur',
            'Kalimantan Utara',
        ];

        return Inertia::render('citizen/create-report', [
            'categories' => $categories,
            'provinces' => $provinces,
        ]);
    }

    /**
     * Store new report submitted by authenticated citizen.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'min:5', 'max:200'],
            'description' => ['required', 'string', 'min:15', 'max:3000'],
            'category_id' => ['required', 'exists:report_categories,id'],
            'latitude' => ['required', 'numeric', 'between:-5,5'],
            'longitude' => ['required', 'numeric', 'between:108,120'],
            'province' => ['required', 'string', 'in:Kalimantan Barat,Kalimantan Tengah,Kalimantan Selatan,Kalimantan Timur,Kalimantan Utara'],
            'regency_city' => ['required', 'string', 'max:100'],
            'location_description' => ['required', 'string', 'min:5', 'max:500'],
            'reported_occurrence_at' => ['nullable', 'date', 'before_or_equal:now'],
            'evidence_file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'safety_acknowledged' => ['required', 'accepted'],
        ], [
            'latitude.between' => 'Koordinat lintang harus berada dalam wilayah Kalimantan (-5 s/d 5).',
            'longitude.between' => 'Koordinat bujur harus berada dalam wilayah Kalimantan (108 s/d 120).',
            'safety_acknowledged.accepted' => 'Anda wajib mengonfirmasi bahwa Anda mematuhi panduan keselamatan dan tidak membahayakan diri untuk mengambil data.',
        ]);

        $user = $request->user();

        $report = DB::transaction(function () use ($validated, $request, $user) {
            $report = Report::create([
                'created_by_user_id' => $user->id,
                'category_id' => $validated['category_id'],
                'title' => $validated['title'],
                'description' => $validated['description'],
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'province' => $validated['province'],
                'regency_city' => $validated['regency_city'],
                'location_description' => $validated['location_description'],
                'reported_occurrence_at' => $validated['reported_occurrence_at'] ?? now(),
                'report_status' => ReportStatus::SUBMITTED,
                'fire_condition' => FireCondition::UNKNOWN,
                'visibility' => 'PUBLIC',
                'is_simulated' => false,
                'reporter_name' => $user->name,
                'reporter_phone' => $user->phone,
            ]);

            // Append initial status history
            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => null,
                'to_status' => ReportStatus::SUBMITTED->value,
                'actor_user_id' => $user->id,
                'note' => 'Laporan berhasil dibuat oleh pelapor.',
                'created_at' => now(),
            ]);

            // Handle evidence file upload safely
            if ($request->hasFile('evidence_file')) {
                $file = $request->file('evidence_file');
                $filename = 'evidence_'.Str::random(24).'.'.$file->getClientOriginalExtension();
                $path = $file->storeAs('evidence/'.$report->id, $filename, 'public');

                Evidence::create([
                    'report_id' => $report->id,
                    'uploaded_by_user_id' => $user->id,
                    'file_path' => '/storage/'.$path,
                    'original_filename' => $file->getClientOriginalName(),
                    'media_type' => $file->getClientMimeType() ?: 'image/jpeg',
                    'size_bytes' => $file->getSize(),
                    'caption' => 'Bukti foto laporan awal',
                    'visibility' => 'PUBLIC',
                    'captured_at' => now(),
                ]);
            }

            // Write audit log
            $this->auditLogService->record(
                action: 'REPORT_SUBMITTED',
                entity: $report,
                before: null,
                after: [
                    'tracking_code' => $report->tracking_code,
                    'title' => $report->title,
                    'category_id' => $report->category_id,
                    'province' => $report->province,
                ],
                reason: 'Pengiriman laporan baru oleh masyarakat',
                actor: $user
            );

            return $report;
        });

        return redirect()->route('citizen.reports.show', ['tracking_code' => $report->tracking_code])
            ->with('success', 'Laporan berhasil dikirim dengan kode lacak: '.$report->tracking_code);
    }

    /**
     * List current user's submitted reports.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $status = $request->query('status');

        $query = Report::where('created_by_user_id', $user->id)
            ->with(['category', 'evidence', 'latestAssignment.agency'])
            ->latest();

        if ($status) {
            $query->where('report_status', $status);
        }

        $reports = $query->paginate(10)->withQueryString();

        return Inertia::render('citizen/my-reports', [
            'reports' => $reports,
            'filters' => [
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show citizen tracking page for a specific report.
     */
    public function show(Request $request, string $tracking_code): Response
    {
        $report = Report::where('tracking_code', $tracking_code)
            ->with(['category', 'evidence', 'statusHistories', 'assignments.agency', 'assignments.operationalUpdates'])
            ->firstOrFail();

        // Enforce object-level policy
        Gate::authorize('view', $report);

        return Inertia::render('citizen/report-tracker', [
            'report' => [
                'id' => $report->id,
                'tracking_code' => $report->tracking_code,
                'title' => $report->title,
                'description' => $report->description,
                'category' => $report->category,
                'latitude' => $report->latitude,
                'longitude' => $report->longitude,
                'province' => $report->province,
                'regency_city' => $report->regency_city,
                'location_description' => $report->location_description,
                'reported_occurrence_at' => $report->reported_occurrence_at?->toIso8601String(),
                'report_status' => $report->report_status->value,
                'status_label' => $report->report_status->label(),
                'fire_condition' => $report->fire_condition->value,
                'fire_condition_label' => $report->fire_condition->label(),
                'fire_condition_source' => $report->fire_condition_source,
                'fire_condition_observed_at' => $report->fire_condition_observed_at?->toIso8601String(),
                'information_requested' => $report->information_requested,
                'close_reason' => $report->close_reason,
                'created_at' => $report->created_at?->toIso8601String(),
                'evidence' => $report->evidence,
                'status_history' => $report->statusHistories->map(fn ($h) => [
                    'id' => $h->id,
                    'from_status' => $h->from_status,
                    'to_status' => $h->to_status,
                    'reason' => $h->reason,
                    'note' => $h->note,
                    'created_at' => $h->created_at->toIso8601String(),
                ]),
                'assignments' => $report->assignments->map(fn ($a) => [
                    'id' => $a->id,
                    'agency_name' => $a->agency->name,
                    'jurisdiction' => $a->agency->jurisdiction,
                    'status' => $a->assignment_status->value,
                    'status_label' => $a->assignment_status->label(),
                    'assigned_at' => $a->assigned_at->toIso8601String(),
                    'operational_updates' => $a->operationalUpdates->map(fn ($u) => [
                        'id' => $u->id,
                        'update_type' => $u->update_type,
                        'note' => $u->note,
                        'fire_condition_observed' => $u->fire_condition_observed,
                        'created_at' => $u->created_at?->toIso8601String(),
                    ]),
                ]),
            ],
        ]);
    }

    /**
     * Provide additional requested information when report is in NEEDS_INFORMATION.
     */
    public function provideInformation(Request $request, string $tracking_code): RedirectResponse
    {
        $report = Report::where('tracking_code', $tracking_code)->firstOrFail();
        Gate::authorize('provideInformation', $report);

        $validated = $request->validate([
            'supplementary_info' => ['required', 'string', 'min:10', 'max:2000'],
        ]);

        $user = $request->user();

        DB::transaction(function () use ($report, $validated, $user) {
            $fromStatus = $report->report_status;

            // Revert back to UNDER_REVIEW so admin reviews the completed information
            $report->report_status = ReportStatus::UNDER_REVIEW;
            $report->description = $report->description."\n\n[Informasi Tambahan dari Pelapor ".now()->format('d/m/Y H:i')."]:\n".$validated['supplementary_info'];
            $report->information_requested = null;
            $report->save();

            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => $fromStatus->value,
                'to_status' => ReportStatus::UNDER_REVIEW->value,
                'actor_user_id' => $user->id,
                'note' => 'Pelapor telah melengkapi informasi: '.$validated['supplementary_info'],
                'created_at' => now(),
            ]);

            $this->auditLogService->record(
                action: 'REPORT_INFORMATION_PROVIDED',
                entity: $report,
                before: ['report_status' => $fromStatus->value],
                after: ['report_status' => ReportStatus::UNDER_REVIEW->value],
                reason: 'Pelapor melengkapi informasi yang diminta',
                actor: $user
            );
        });

        return back()->with('success', 'Informasi tambahan berhasil dikirim. Laporan kembali dalam antrean peninjauan petugas.');
    }
}
