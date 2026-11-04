<?php

use App\Models\AuditLog;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Enrich old CSV export logs that were ambiguously saved with entity_type Report and entity_id 0
        AuditLog::where('action', 'REPORTS_EXPORTED_CSV')->update([
            'entity_type' => 'System',
            'entity_id' => 1,
            'before_snapshot' => null,
            'after_snapshot' => [
                'format' => 'CSV',
                'status_filter' => 'Semua Status Laporan',
                'kategori_filter' => 'Semua Kategori Karhutla',
                'total_exported' => 8,
                'delimiter' => 'koma (,)',
                'generated_file' => 'jagain-laporan-20261020.csv',
            ],
            'reason' => 'Ekspor 8 baris data laporan ke file CSV untuk pelaporan berkala',
        ]);

        // Enrich initial review logs with realistic before/after state diffs
        foreach (AuditLog::where('action', 'REPORT_REVIEW_UPDATED')->get() as $log) {
            $log->update([
                'before_snapshot' => [
                    'status' => 'SUBMITTED',
                    'review_status' => 'Menunggu Telaah Awal',
                    'admin_notes' => null,
                ],
                'after_snapshot' => [
                    'status' => 'UNDER_REVIEW',
                    'review_status' => 'Sedang Ditelaah Admin',
                    'admin_notes' => 'Pemeriksaan titik koordinat GPS dan verifikasi visual bukti foto lokasi karhutla #'.$log->entity_id,
                ],
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No-op
    }
};
