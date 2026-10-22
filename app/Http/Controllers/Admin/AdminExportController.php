<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Services\AuditLogService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminExportController extends Controller
{
    public function __construct(
        private readonly AuditLogService $auditLogService,
    ) {}

    public function reports(Request $request): StreamedResponse
    {
        $status = $request->string('status')->toString();
        $categoryId = $request->integer('category_id');

        $query = Report::query()->with(['category', 'creator']);

        if (! empty($status)) {
            $query->where('report_status', $status);
        }

        if (! empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        $this->auditLogService->log(
            actor: $request->user(),
            action: 'REPORTS_EXPORTED_CSV',
            entityType: 'Report',
            entityId: 0,
            reason: "Ekspor laporan ke CSV dengan filter: status='{$status}', category_id='{$categoryId}'",
        );

        $filename = 'jagain-laporan-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($query) {
            $handle = fopen('php://output', 'w');
            if ($handle === false) {
                return;
            }

            fputcsv($handle, [
                'ID Laporan',
                'Judul',
                'Status Laporan',
                'Kategori',
                'Latitude',
                'Longitude',
                'Deskripsi Lokasi',
                'Pelapor',
                'Waktu Kejadian Dilaporkan',
                'Waktu Dibuat',
                'Data Simulasi',
            ]);

            $query->chunk(200, function ($reports) use ($handle) {
                foreach ($reports as $report) {
                    fputcsv($handle, [
                        $report->id,
                        $report->title,
                        $report->report_status,
                        is_object($report->category) ? $report->category->name : ($report->category ?? '-'),
                        $report->latitude,
                        $report->longitude,
                        $report->location_description,
                        $report->creator->name ?? 'Anonim',
                        $report->reported_occurrence_at?->toIso8601String() ?? '-',
                        $report->created_at?->toIso8601String() ?? '-',
                        $report->is_simulated ? 'Ya' : 'Tidak',
                    ]);
                }
            });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }
}
