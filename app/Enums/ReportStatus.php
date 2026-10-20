<?php

namespace App\Enums;

enum ReportStatus: string
{
    case SUBMITTED = 'SUBMITTED';
    case UNDER_REVIEW = 'UNDER_REVIEW';
    case NEEDS_INFORMATION = 'NEEDS_INFORMATION';
    case VERIFIED = 'VERIFIED';
    case DISPATCHED = 'DISPATCHED';
    case RESOLUTION_REVIEW = 'RESOLUTION_REVIEW';
    case RESOLVED_VERIFIED = 'RESOLVED_VERIFIED';
    case CLOSED_WITH_REASON = 'CLOSED_WITH_REASON';

    public function label(): string
    {
        return match ($this) {
            self::SUBMITTED => 'Terkirim',
            self::UNDER_REVIEW => 'Sedang Diperiksa',
            self::NEEDS_INFORMATION => 'Perlu Informasi Tambahan',
            self::VERIFIED => 'Terverifikasi',
            self::DISPATCHED => 'Diteruskan ke Instansi',
            self::RESOLUTION_REVIEW => 'Penanganan Ditinjau',
            self::RESOLVED_VERIFIED => 'Penanganan Selesai',
            self::CLOSED_WITH_REASON => 'Ditutup',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::SUBMITTED => 'Laporan baru telah diterima sistem dan menunggu pemeriksaan awal.',
            self::UNDER_REVIEW => 'Laporan sedang dalam proses peninjauan oleh tim verifikator.',
            self::NEEDS_INFORMATION => 'Dibutuhkan informasi atau bukti tambahan dari pelapor.',
            self::VERIFIED => 'Laporan telah dinilai valid dan memenuhi kriteria verifikasi.',
            self::DISPATCHED => 'Laporan telah dikoordinasikan dan diteruskan ke instansi penanganan terkait.',
            self::RESOLUTION_REVIEW => 'Pembaruan tindakan penanganan telah diajukan dan sedang dievaluasi.',
            self::RESOLVED_VERIFIED => 'Tindakan penanganan administratif dinilai selesai berdasarkan bukti yang tercatat.',
            self::CLOSED_WITH_REASON => 'Laporan ditutup dengan alasan yang telah dicatat (misal: duplikat atau tidak valid).',
        };
    }
}
