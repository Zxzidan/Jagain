<?php

namespace App\Http\Controllers\Community;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\SubmitAdditionalInfoRequest;
use App\Models\Evidence;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Display a listing of reports belonging to the authenticated user.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $query = $user->reports()->with(['evidence'])->latest();

        // Optional filter by status
        if ($request->filled('status')) {
            $statusValue = $request->input('status');
            if (ReportStatus::tryFrom($statusValue)) {
                $query->where('report_status', $statusValue);
            }
        }

        // Optional search by report number, title, or location
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('report_number', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('location_description', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $reports = $query->paginate(10)->withQueryString()->through(fn (Report $report) => [
            'id' => $report->id,
            'report_number' => $report->report_number,
            'title' => $report->title,
            'category' => is_object($report->category)
                ? ($report->category->name ?? $report->category->slug ?? 'Umum')
                : ($report->category ?? 'Umum'),
            'description' => Str::limit($report->description, 120),
            'location_description' => $report->location_description,
            'report_status' => $report->report_status->value,
            'status_label' => $report->report_status->label(),
            'fire_condition' => $report->fire_condition->value,
            'fire_condition_label' => $report->fire_condition->label(),
            'created_at' => $report->created_at?->toISOString(),
            'reported_occurrence_at' => $report->reported_occurrence_at?->toISOString(),
            'evidence_count' => $report->evidence->count(),
        ]);

        return Inertia::render('community/reports/index', [
            'reports' => $reports,
            'filters' => [
                'status' => $request->input('status', ''),
                'search' => $request->input('search', ''),
            ],
            'statuses' => collect(ReportStatus::cases())->map(fn (ReportStatus $status) => [
                'value' => $status->value,
                'label' => $status->label(),
            ]),
        ]);
    }

    /**
     * Show the form for creating a new report.
     */
    public function create(): Response
    {
        return Inertia::render('community/reports/create');
    }

    /**
     * Store a newly created report in storage.
     */
    public function store(StoreReportRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = $request->user();

        $report = DB::transaction(function () use ($validated, $user, $request) {
            // Generate distinct report number
            $reportNumber = Report::generateReportNumber();

            $report = Report::create([
                'report_number' => $reportNumber,
                'created_by_user_id' => $user->id,
                'title' => $validated['title'],
                'category' => $validated['category'],
                'description' => $validated['description'],
                'location_description' => $validated['location_description'],
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'reported_occurrence_at' => $validated['reported_occurrence_at'] ?? now(),
                'report_status' => ReportStatus::SUBMITTED,
                'visibility' => 'PRIVATE',
                'is_simulated' => false,
                'fire_condition' => FireCondition::REPORTED_ACTIVE,
            ]);

            // Create initial status history entry
            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => null,
                'to_status' => ReportStatus::SUBMITTED,
                'actor_user_id' => $user->id,
                'note' => 'Laporan baru berhasil dikirim dan menunggu verifikasi.',
            ]);

            // Handle evidence file upload securely
            if ($request->hasFile('evidence')) {
                $file = $request->file('evidence');
                $extension = $file->getClientOriginalExtension();
                $safeName = Str::uuid().'.'.$extension;
                $path = $file->storeAs('evidence', $safeName, 'public');

                Evidence::create([
                    'report_id' => $report->id,
                    'uploaded_by_user_id' => $user->id,
                    'storage_key' => $path,
                    'original_filename' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME).'.'.$extension,
                    'media_type' => $file->getClientMimeType() ?: 'image/jpeg',
                    'size_bytes' => $file->getSize(),
                    'visibility' => 'PRIVATE',
                ]);
            }

            return $report;
        });

        return redirect()->route('reports.show', $report)
            ->with('success', "Laporan Anda berhasil dibuat dengan nomor {$report->report_number}.");
    }

    /**
     * Display the specified report and tracking timeline.
     */
    public function show(Report $report, Request $request): Response
    {
        // Enforce authorization policy (only owner or authorized role can view)
        Gate::authorize('view', $report);

        $report->load([
            'evidence',
            'statusHistories.actor:id,name',
        ]);

        return Inertia::render('community/reports/show', [
            'report' => [
                'id' => $report->id,
                'report_number' => $report->report_number,
                'title' => $report->title,
                'category' => is_object($report->category)
                    ? ($report->category->name ?? $report->category->slug ?? 'Umum')
                    : ($report->category ?? 'Umum'),
                'description' => $report->description,
                'location_description' => $report->location_description,
                'latitude' => $report->latitude,
                'longitude' => $report->longitude,
                'report_status' => $report->report_status->value,
                'status_label' => $report->report_status->label(),
                'status_description' => $report->report_status->description(),
                'fire_condition' => $report->fire_condition->value,
                'fire_condition_label' => $report->fire_condition->label(),
                'admin_notes' => $report->admin_notes,
                'information_requested' => $report->information_requested,
                'additional_information' => $report->additional_information,
                'created_at' => $report->created_at?->toISOString(),
                'updated_at' => $report->updated_at?->toISOString(),
                'reported_occurrence_at' => $report->reported_occurrence_at?->toISOString(),
                'can_provide_additional_info' => $report->created_by_user_id === $request->user()->id
                    && $report->report_status === ReportStatus::NEEDS_INFORMATION,
                'evidence' => $report->evidence->map(fn (Evidence $item) => [
                    'id' => $item->id,
                    'original_filename' => $item->original_filename,
                    'media_type' => $item->media_type,
                    'size_bytes' => $item->size_bytes,
                    'url' => $item->url,
                    'created_at' => $item->created_at?->toISOString(),
                ]),
                'status_histories' => $report->statusHistories->map(fn (ReportStatusHistory $history) => [
                    'id' => $history->id,
                    'from_status' => $history->from_status instanceof \BackedEnum ? $history->from_status->value : ($history->from_status ? (string) $history->from_status : null),
                    'to_status' => $history->to_status instanceof \BackedEnum ? $history->to_status->value : (string) $history->to_status,
                    'to_status_label' => $history->to_status instanceof ReportStatus ? $history->to_status->label() : (ReportStatus::tryFrom((string) $history->to_status)?->label() ?? (string) $history->to_status),
                    'reason' => $history->reason,
                    'note' => $history->note,
                    'actor_name' => $history->actor !== null ? $history->actor->name : 'Sistem',
                    'created_at' => $history->created_at?->toISOString() ?? now()->toISOString(),
                ]),
            ],
        ]);
    }

    /**
     * Submit additional information requested by admin for a report in NEEDS_INFORMATION status.
     */
    public function submitAdditionalInfo(Report $report, SubmitAdditionalInfoRequest $request): RedirectResponse
    {
        Gate::authorize('provideAdditionalInfo', $report);

        $validated = $request->validated();
        $user = $request->user();

        DB::transaction(function () use ($report, $validated, $user, $request) {
            $fromStatus = $report->report_status;

            // Update report with the additional information and revert status back to UNDER_REVIEW
            $report->additional_information = $validated['additional_information'];
            $report->report_status = ReportStatus::UNDER_REVIEW;
            $report->save();

            // Record status change in history
            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => $fromStatus,
                'to_status' => ReportStatus::UNDER_REVIEW,
                'actor_user_id' => $user->id,
                'note' => 'Pelapor telah melengkapi informasi tambahan: '.$validated['additional_information'],
            ]);

            // Save additional evidence file if provided
            if ($request->hasFile('evidence')) {
                $file = $request->file('evidence');
                $extension = $file->getClientOriginalExtension();
                $safeName = Str::uuid().'.'.$extension;
                $path = $file->storeAs('evidence', $safeName, 'public');

                Evidence::create([
                    'report_id' => $report->id,
                    'uploaded_by_user_id' => $user->id,
                    'storage_key' => $path,
                    'original_filename' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME).'.'.$extension,
                    'media_type' => $file->getClientMimeType() ?: 'image/jpeg',
                    'size_bytes' => $file->getSize(),
                    'caption' => 'Bukti susulan dari pelapor',
                    'visibility' => 'PRIVATE',
                ]);
            }
        });

        return redirect()->route('reports.show', $report)
            ->with('success', 'Informasi tambahan berhasil dikirim. Laporan Anda sedang ditinjau kembali oleh tim verifikator.');
    }
}
