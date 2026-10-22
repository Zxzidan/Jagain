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
            self::SUBMITTED => 'Baru Dikirim',
            self::UNDER_REVIEW => 'Sedang Ditinjau',
            self::NEEDS_INFORMATION => 'Perlu Informasi',
            self::VERIFIED => 'Terverifikasi',
            self::DISPATCHED => 'Ditugaskan ke OPD',
            self::RESOLUTION_REVIEW => 'Review Penanganan',
            self::RESOLVED_VERIFIED => 'Selesai Terverifikasi',
            self::CLOSED_WITH_REASON => 'Ditutup dengan Alasan',
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

    /**
     * Check if transition from current status to target status is valid.
     */
    public function canTransitionTo(self $target): bool
    {
        if ($this === $target) {
            return false;
        }

        return match ($this) {
            self::SUBMITTED => in_array($target, [
                self::UNDER_REVIEW,
                self::CLOSED_WITH_REASON,
            ]),
            self::UNDER_REVIEW => in_array($target, [
                self::NEEDS_INFORMATION,
                self::VERIFIED,
                self::CLOSED_WITH_REASON,
            ]),
            self::NEEDS_INFORMATION => in_array($target, [
                self::UNDER_REVIEW,
                self::CLOSED_WITH_REASON,
            ]),
            self::VERIFIED => in_array($target, [
                self::DISPATCHED,
                self::CLOSED_WITH_REASON,
            ]),
            self::DISPATCHED => in_array($target, [
                self::RESOLUTION_REVIEW,
                self::CLOSED_WITH_REASON,
            ]),
            self::RESOLUTION_REVIEW => in_array($target, [
                self::RESOLVED_VERIFIED,
                self::DISPATCHED,
                self::CLOSED_WITH_REASON,
            ]),
            self::RESOLVED_VERIFIED => in_array($target, [
                self::UNDER_REVIEW, // Admin reopen
            ]),
            self::CLOSED_WITH_REASON => in_array($target, [
                self::UNDER_REVIEW, // Admin reopen
            ]),
        };
    }
}
