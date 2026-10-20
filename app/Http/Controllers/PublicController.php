<?php

namespace App\Http\Controllers;

use App\Enums\ReportStatus;
use App\Models\ExternalObservation;
use App\Models\Report;
use App\Models\ReportCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Landing page with live metrics, featured reports, and platform mission.
     */
    public function index(): Response
    {
        $stats = [
            'total_reports' => Report::count(),
            'verified_reports' => Report::whereIn('report_status', [
                ReportStatus::VERIFIED,
                ReportStatus::DISPATCHED,
                ReportStatus::RESOLUTION_REVIEW,
                ReportStatus::RESOLVED_VERIFIED,
            ])->count(),
            'active_dispatched' => Report::where('report_status', ReportStatus::DISPATCHED)->count(),
            'resolved_reports' => Report::where('report_status', ReportStatus::RESOLVED_VERIFIED)->count(),
            'simulated_hotspots' => ExternalObservation::where('is_simulated', true)->count(),
        ];

        $recentReports = Report::publiclyVisible()
            ->with(['category', 'evidence', 'latestAssignment.agency'])
            ->latest()
            ->take(6)
            ->get()
            ->map(fn (Report $r) => $r->toPublicArray());

        return Inertia::render('public/home', [
            'stats' => $stats,
            'recentReports' => $recentReports,
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

        $provinces = [
            'Kalimantan Barat',
            'Kalimantan Tengah',
            'Kalimantan Selatan',
            'Kalimantan Timur',
            'Kalimantan Utara',
        ];

        return Inertia::render('public/map', [
            'reports' => $reports,
            'observations' => $observations,
            'categories' => $categories,
            'provinces' => $provinces,
            'filters' => [
                'category' => $categorySlug,
                'province' => $province,
                'status' => $status,
            ],
        ]);
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
