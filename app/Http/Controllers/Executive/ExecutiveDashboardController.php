<?php

namespace App\Http\Controllers\Executive;

use App\Enums\AssignmentStatus;
use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\DataSource;
use App\Models\ExternalObservation;
use App\Models\OperationalUpdate;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExecutiveDashboardController extends Controller
{
    /**
     * Read-only Executive Analytics Dashboard for decision makers.
     * Exposes aggregated statistics, provincial distribution, status progression,
     * agency performance indicators, and geospatial visualization without PII or write actions.
     */
    public function index(Request $request): Response
    {
        $selectedProvince = $request->query('province');

        $provincesList = [
            'Kalimantan Barat',
            'Kalimantan Tengah',
            'Kalimantan Selatan',
            'Kalimantan Timur',
            'Kalimantan Utara',
        ];

        $reportsQuery = Report::query()
            ->with(['category', 'latestAssignment.agency']);

        if ($selectedProvince && in_array($selectedProvince, $provincesList, true)) {
            $reportsQuery->where('province', $selectedProvince);
        }

        $allReports = Report::select([
            'id',
            'tracking_code',
            'title',
            'category_id',
            'province',
            'regency_city',
            'report_status',
            'fire_condition',
            'is_simulated',
            'reported_occurrence_at',
            'created_at',
            'updated_at',
        ])->get();

        $filteredReportsCollection = ($selectedProvince && in_array($selectedProvince, $provincesList, true))
            ? $allReports->where('province', $selectedProvince)
            : $allReports;

        $statusVal = fn ($r) => $r->report_status instanceof ReportStatus ? $r->report_status->value : (string) $r->report_status;
        $fireVal = fn ($r) => $r->fire_condition instanceof FireCondition ? $r->fire_condition->value : (string) ($r->fire_condition ?? 'UNKNOWN');

        $statusCounts = [
            'submitted' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'SUBMITTED')->count(),
            'under_review' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'UNDER_REVIEW')->count(),
            'needs_information' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'NEEDS_INFORMATION')->count(),
            'verified' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'VERIFIED')->count(),
            'dispatched' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'DISPATCHED')->count(),
            'resolution_review' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'RESOLUTION_REVIEW')->count(),
            'resolved_verified' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'RESOLVED_VERIFIED')->count(),
            'closed_with_reason' => $filteredReportsCollection->filter(fn ($r) => $statusVal($r) === 'CLOSED_WITH_REASON')->count(),
            'total' => $filteredReportsCollection->count(),
        ];

        $fireConditionCounts = [
            'observed_active' => $filteredReportsCollection->filter(fn ($r) => $fireVal($r) === 'OBSERVED_ACTIVE')->count(),
            'reported_active' => $filteredReportsCollection->filter(fn ($r) => $fireVal($r) === 'REPORTED_ACTIVE')->count(),
            'observed_contained' => $filteredReportsCollection->filter(fn ($r) => $fireVal($r) === 'OBSERVED_CONTAINED')->count(),
            'observed_extinguished' => $filteredReportsCollection->filter(fn ($r) => $fireVal($r) === 'OBSERVED_EXTINGUISHED')->count(),
            'unknown' => $filteredReportsCollection->filter(fn ($r) => $fireVal($r) === 'UNKNOWN')->count(),
        ];

        $allObservations = ExternalObservation::with('dataSource')->latest('observed_at')->get();

        // Provincial Breakdown across all 5 Kalimantan provinces
        $provincialBreakdown = collect($provincesList)->map(function (string $prov) use ($allReports, $allObservations, $statusVal, $fireVal) {
            $provReports = $allReports->where('province', $prov);
            $total = $provReports->count();
            $pending = $provReports->filter(fn ($r) => in_array($statusVal($r), ['SUBMITTED', 'UNDER_REVIEW', 'NEEDS_INFORMATION'], true))->count();
            $inHandling = $provReports->filter(fn ($r) => in_array($statusVal($r), ['VERIFIED', 'DISPATCHED', 'RESOLUTION_REVIEW'], true))->count();
            $resolved = $provReports->filter(fn ($r) => $statusVal($r) === 'RESOLVED_VERIFIED')->count();
            $closed = $provReports->filter(fn ($r) => $statusVal($r) === 'CLOSED_WITH_REASON')->count();
            $activeFire = $provReports->filter(fn ($r) => in_array($fireVal($r), ['OBSERVED_ACTIVE', 'REPORTED_ACTIVE'], true))->count();
            $hotspots = $allObservations->where('province', $prov)->count();

            $resolutionRate = ($inHandling + $resolved) > 0
                ? round(($resolved / ($inHandling + $resolved)) * 100, 1)
                : 0.0;

            return [
                'province' => $prov,
                'total' => $total,
                'pending' => $pending,
                'in_handling' => $inHandling,
                'resolved' => $resolved,
                'closed' => $closed,
                'active_fire' => $activeFire,
                'hotspots' => $hotspots,
                'resolution_rate' => $resolutionRate,
            ];
        })->values()->all();

        // Monthly Trend derived from actual database timestamps
        $monthNames = [
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
            5 => 'Mei', 6 => 'Jun', 7 => 'Jul', 8 => 'Agu',
            9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des',
        ];

        $groupedByMonth = $filteredReportsCollection->groupBy(function ($r) {
            $dt = $r->reported_occurrence_at ?? $r->created_at;

            return $dt ? $dt->format('Y-m') : now()->format('Y-m');
        })->sortKeys();

        $trendSeries = $groupedByMonth->map(function ($items, $ym) use ($statusVal, $monthNames) {
            $parts = explode('-', $ym);
            $monthNum = isset($parts[1]) ? (int) $parts[1] : (int) now()->format('m');
            $yearStr = $parts[0] ?? now()->format('Y');
            $total = $items->count();
            $verifiedOrHandled = $items->filter(fn ($r) => in_array($statusVal($r), ['VERIFIED', 'DISPATCHED', 'RESOLUTION_REVIEW', 'RESOLVED_VERIFIED'], true))->count();
            $resolved = $items->filter(fn ($r) => $statusVal($r) === 'RESOLVED_VERIFIED')->count();

            return [
                'period' => ($monthNames[$monthNum] ?? $ym).' '.$yearStr,
                'raw_period' => $ym,
                'total' => $total,
                'verified_or_handled' => $verifiedOrHandled,
                'in_progress' => max(0, $verifiedOrHandled - $resolved),
                'resolved' => $resolved,
            ];
        })->values()->all();

        // Agency Performance Indicators (Read-only)
        $agencyPerformance = Agency::where('is_active', true)
            ->withCount([
                'assignments as total_assignments_count',
                'assignments as received_count' => fn ($q) => $q->whereIn('assignment_status', ['RECEIVED_BY_AGENCY', AssignmentStatus::RECEIVED_BY_AGENCY->value]),
                'assignments as in_progress_count' => fn ($q) => $q->whereIn('assignment_status', ['IN_PROGRESS', 'SUBMITTED_FOR_REVIEW', AssignmentStatus::IN_PROGRESS->value, AssignmentStatus::SUBMITTED_FOR_REVIEW->value]),
                'assignments as completed_count' => fn ($q) => $q->whereIn('assignment_status', ['COMPLETED', AssignmentStatus::COMPLETED->value]),
                'assignments as declined_count' => fn ($q) => $q->whereIn('assignment_status', ['DECLINED_BY_AGENCY', AssignmentStatus::DECLINED_BY_AGENCY->value]),
            ])
            ->get()
            ->map(fn (Agency $ag) => [
                'id' => $ag->id,
                'name' => $ag->name,
                'code' => $ag->code,
                'agency_type' => $ag->agency_type,
                'jurisdiction' => $ag->jurisdiction,
                'total_assignments' => $ag->total_assignments_count,
                'in_progress' => $ag->in_progress_count + $ag->received_count,
                'completed' => $ag->completed_count,
                'declined' => $ag->declined_count,
                'completion_rate' => $ag->total_assignments_count > 0
                    ? round(($ag->completed_count / $ag->total_assignments_count) * 100, 1)
                    : 0.0,
            ])
            ->values()
            ->all();

        // Map Data (PII stripped via toPublicArray)
        $mapReports = $reportsQuery
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->latest()
            ->take(100)
            ->get()
            ->map(fn (Report $r) => $r->toPublicArray())
            ->values()
            ->all();

        $filteredObservations = ($selectedProvince && in_array($selectedProvince, $provincesList, true))
            ? $allObservations->where('province', $selectedProvince)
            : $allObservations;

        $mapObservations = $filteredObservations
            ->take(50)
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
                    'attribution' => $obs->dataSource?->attribution_text ?? 'NASA FIRMS & BMKG',
                    'source_type' => $obs->dataSource?->source_type ?? 'SATELLITE',
                ],
            ])
            ->values()
            ->all();

        $totalActionable = $statusCounts['verified'] + $statusCounts['dispatched'] + $statusCounts['resolution_review'] + $statusCounts['resolved_verified'];
        $verificationRate = $statusCounts['total'] > 0
            ? round(($totalActionable / $statusCounts['total']) * 100, 1)
            : 0.0;
        $resolutionRate = $totalActionable > 0
            ? round(($statusCounts['resolved_verified'] / $totalActionable) * 100, 1)
            : 0.0;

        $lastReportIso = $allReports->max('updated_at')?->toIso8601String();
        $lastHotspotIso = $allObservations->max('observed_at')?->toIso8601String();
        $sourcesArray = DataSource::get(['id', 'name', 'code', 'source_type', 'attribution_text'])->toArray();

        $dataIntegrity = [
            'actual_reports' => $filteredReportsCollection->where('is_simulated', false)->count(),
            'simulated_reports' => $filteredReportsCollection->where('is_simulated', true)->count(),
            'total_hotspots' => $filteredObservations->count(),
            'actual_hotspots' => $filteredObservations->where('is_simulated', false)->count(),
            'simulated_hotspots' => $filteredObservations->where('is_simulated', true)->count(),
            'operational_updates_count' => OperationalUpdate::count(),
            'last_report_at' => $lastReportIso,
            'last_report_updated_at' => $lastReportIso,
            'last_hotspot_at' => $lastHotspotIso,
            'last_satellite_observed_at' => $lastHotspotIso,
            'sources' => $sourcesArray,
            'data_sources' => $sourcesArray,
        ];

        return Inertia::render('executive/dashboard', [
            'statusCounts' => $statusCounts,
            'fireConditionCounts' => $fireConditionCounts,
            'kpis' => [
                'verification_rate' => $verificationRate,
                'resolution_rate' => $resolutionRate,
                'total_actionable' => $totalActionable,
            ],
            'provincialBreakdown' => $provincialBreakdown,
            'trendSeries' => $trendSeries,
            'agencyPerformance' => $agencyPerformance,
            'mapReports' => $mapReports,
            'mapObservations' => $mapObservations,
            'dataIntegrity' => $dataIntegrity,
            'provinces' => $provincesList,
            'filters' => [
                'province' => $selectedProvince,
            ],
        ]);
    }
}
