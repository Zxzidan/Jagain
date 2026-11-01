<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\ExternalObservation;
use App\Models\Report;
use App\Models\ReportCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminMapController extends Controller
{
    /**
     * Display the admin geospatial wildfire monitoring map.
     */
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('category');
        $province = $request->query('province');
        $status = $request->query('status');

        $reportsQuery = Report::query()
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

        // External observations (hotspots from NASA FIRMS & BMKG)
        $observations = ExternalObservation::with('dataSource')
            ->latest('observed_at')
            ->take(100)
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
                    'name' => $obs->dataSource?->name ?? 'NASA FIRMS / BMKG',
                    'attribution' => $obs->dataSource?->attribution_text ?? 'Satelit Penginderaan Jauh',
                    'source_type' => $obs->dataSource?->source_type ?? 'SATELLITE_HOTSPOT',
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

        $stats = [
            'total_reports' => Report::count(),
            'needs_action' => Report::whereIn('report_status', [
                ReportStatus::SUBMITTED,
                ReportStatus::UNDER_REVIEW,
                ReportStatus::NEEDS_INFORMATION,
            ])->count(),
            'active_in_field' => Report::whereIn('report_status', [
                ReportStatus::VERIFIED,
                ReportStatus::DISPATCHED,
                ReportStatus::RESOLUTION_REVIEW,
            ])->count(),
            'total_hotspots' => ExternalObservation::count(),
        ];

        return Inertia::render('admin/map', [
            'reports' => $reports,
            'observations' => $observations,
            'categories' => $categories,
            'provinces' => $provinces,
            'stats' => $stats,
            'filters' => [
                'category' => $categorySlug,
                'province' => $province,
                'status' => $status,
            ],
        ]);
    }
}
