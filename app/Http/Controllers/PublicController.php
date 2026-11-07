<?php

namespace App\Http\Controllers;

use App\Enums\ReportStatus;
use App\Models\ExternalObservation;
use App\Models\Report;
use App\Models\ReportCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Landing page with live metrics, featured reports, and platform mission.
     */
    public function index(): Response
    {
        $payload = Cache::remember('public_homepage_data', 30, function () {
            $reportCounts = Report::toBase()
                ->selectRaw('
                    COUNT(*) as total,
                    COUNT(CASE WHEN report_status IN (?, ?, ?, ?) THEN 1 END) as verified,
                    COUNT(CASE WHEN report_status = ? THEN 1 END) as dispatched,
                    COUNT(CASE WHEN report_status = ? THEN 1 END) as resolved
                ', [
                    ReportStatus::VERIFIED->value,
                    ReportStatus::DISPATCHED->value,
                    ReportStatus::RESOLUTION_REVIEW->value,
                    ReportStatus::RESOLVED_VERIFIED->value,
                    ReportStatus::DISPATCHED->value,
                    ReportStatus::RESOLVED_VERIFIED->value,
                ])
                ->first();

            $stats = [
                'total_reports' => (int) ($reportCounts->total ?? 0),
                'verified_reports' => (int) ($reportCounts->verified ?? 0),
                'active_dispatched' => (int) ($reportCounts->dispatched ?? 0),
                'resolved_reports' => (int) ($reportCounts->resolved ?? 0),
                'simulated_hotspots' => ExternalObservation::where('is_simulated', true)->count(),
            ];

            $reports = Report::publiclyVisible()
                ->with(['category', 'evidence', 'latestAssignment.agency', 'statusHistories'])
                ->latest()
                ->take(50)
                ->get()
                ->map(fn (Report $r) => $r->toPublicArray());

            $recentReports = $reports->take(6)->values();

            // External observations (hotspots from NASA FIRMS & BMKG)
            $observations = ExternalObservation::with('dataSource')
                ->latest('observed_at')
                ->take(50)
                ->get()
                ->map(fn (ExternalObservation $obs) => [
                    'id' => $obs->id,
                    'external_record_id' => $obs->external_record_id,
                    'satellite_instrument' => $obs->satellite_instrument,
                    'confidence_level' => $obs->confidence_level,
                    'brightness_kelvin' => $obs->brightness_kelvin,
                    'frp_mw' => $obs->frp_mw,
                    'latitude' => $obs->latitude,
                    'longitude' => $obs->longitude,
                    'province' => $obs->province,
                    'regency_city' => $obs->regency_city,
                    'observed_at' => $obs->observed_at->toIso8601String(),
                    'is_simulated' => $obs->is_simulated,
                    'data_source' => [
                        'name' => $obs->dataSource->name,
                        'attribution' => $obs->dataSource->attribution_text,
                        'source_type' => $obs->dataSource->source_type,
                    ],
                ]);

            $categories = ReportCategory::where('is_active', true)->get(['id', 'name', 'slug']);

            return [
                'stats' => $stats,
                'recentReports' => $recentReports,
                'reports' => $reports,
                'observations' => $observations,
                'categories' => $categories,
            ];
        });

        $provinces = [
            'Kalimantan Barat',
            'Kalimantan Tengah',
            'Kalimantan Selatan',
            'Kalimantan Timur',
            'Kalimantan Utara',
        ];

        return Inertia::render('public/home', [
            'stats' => $payload['stats'],
            'recentReports' => $payload['recentReports'],
            'reports' => $payload['reports'],
            'observations' => $payload['observations'],
            'categories' => $payload['categories'],
            'provinces' => $provinces,
        ]);
    }

    /**
     * Interactive map of Karhutla reports and external satellite observations.
     */
    public function map(Request $request): Response
    {
        $categorySlug = $request->query('category');
        $province = $request->query('province');
        $status = $request->query('status');

        $isDefault = ! $categorySlug && ! $province && ! $status;

        $mapData = $isDefault
            ? Cache::remember('public_map_default_payload', 30, fn () => $this->resolveMapPayload(null, null, null))
            : $this->resolveMapPayload($categorySlug, $province, $status);

        $provinces = [
            'Kalimantan Barat',
            'Kalimantan Tengah',
            'Kalimantan Selatan',
            'Kalimantan Timur',
            'Kalimantan Utara',
        ];

        return Inertia::render('public/map', [
            'reports' => $mapData['reports'],
            'observations' => $mapData['observations'],
            'categories' => $mapData['categories'],
            'provinces' => $provinces,
            'filters' => [
                'category' => $categorySlug,
                'province' => $province,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Resolve payload for interactive karhutla map.
     *
     * @return array<string, mixed>
     */
    protected function resolveMapPayload(?string $categorySlug, ?string $province, ?string $status): array
    {
        $reportsQuery = Report::publiclyVisible()
            ->with(['category', 'evidence', 'latestAssignment.agency', 'statusHistories']);

        if ($categorySlug) {
            $reportsQuery->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
        }

        if ($province) {
            $reportsQuery->where('province', $province);
        }

        if ($status) {
            $reportsQuery->where('report_status', $status);
        }

        $reports = $reportsQuery->latest()->get()->map(fn (Report $r) => $r->toPublicArray());

        // External observations (hotspots)
        $observations = ExternalObservation::with('dataSource')
            ->latest('observed_at')
            ->take(50)
            ->get()
            ->map(fn (ExternalObservation $obs) => [
                'id' => $obs->id,
                'external_record_id' => $obs->external_record_id,
                'satellite_instrument' => $obs->satellite_instrument,
                'confidence_level' => $obs->confidence_level,
                'brightness_kelvin' => $obs->brightness_kelvin,
                'frp_mw' => $obs->frp_mw,
                'latitude' => $obs->latitude,
                'longitude' => $obs->longitude,
                'province' => $obs->province,
                'regency_city' => $obs->regency_city,
                'observed_at' => $obs->observed_at->toIso8601String(),
                'is_simulated' => $obs->is_simulated,
                'data_source' => [
                    'name' => $obs->dataSource->name,
                    'attribution' => $obs->dataSource->attribution_text,
                    'source_type' => $obs->dataSource->source_type,
                ],
            ]);

        $categories = ReportCategory::where('is_active', true)->get(['id', 'name', 'slug']);

        return [
            'reports' => $reports,
            'observations' => $observations,
            'categories' => $categories,
        ];
    }

    /**
     * Public detail for a report identified by tracking_code (safe, PII redacted).
     */
    public function showReport(string $tracking_code): Response
    {
        $report = Report::where('tracking_code', $tracking_code)
            ->publiclyVisible()
            ->with(['category', 'evidence', 'latestAssignment.agency', 'statusHistories'])
            ->firstOrFail();

        return Inertia::render('public/report-detail', [
            'report' => $report->toPublicArray(),
        ]);
    }

    /**
     * Safety Guide page.
     */
    public function safetyGuide(): Response
    {
        return Inertia::render('public/safety-guide');
    }

    /**
     * About, transparency, data provenance, and emergency disclaimer page.
     */
    public function about(): Response
    {
        return Inertia::render('public/about');
    }
}
