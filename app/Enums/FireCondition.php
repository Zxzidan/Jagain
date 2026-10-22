<?php

namespace App\Enums;

enum FireCondition: string
{
    case UNKNOWN = 'UNKNOWN';
    case REPORTED_ACTIVE = 'REPORTED_ACTIVE';
    case OBSERVED_ACTIVE = 'OBSERVED_ACTIVE';
    case OBSERVED_CONTAINED = 'OBSERVED_CONTAINED';
    case OBSERVED_EXTINGUISHED = 'OBSERVED_EXTINGUISHED';

    public function label(): string
    {
        return match ($this) {
            self::UNKNOWN => 'Kondisi Belum Terverifikasi Lapangan',
            self::REPORTED_ACTIVE => 'Dilaporkan Masih Aktif',
            self::OBSERVED_ACTIVE => 'Terobservasi Api Aktif',
            self::OBSERVED_CONTAINED => 'Terobservasi Terkendali/Sekat Bakar',
            self::OBSERVED_EXTINGUISHED => 'Terobservasi Padam/Asap Sisa',
        };
    }
}
