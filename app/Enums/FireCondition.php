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
            self::UNKNOWN => 'Belum Terpantau',
            self::REPORTED_ACTIVE => 'Dilaporkan Aktif oleh Warga',
            self::OBSERVED_ACTIVE => 'Api Aktif Terobservasi',
            self::OBSERVED_CONTAINED => 'Terkendali / Tersekat',
            self::OBSERVED_EXTINGUISHED => 'Api Padam Terobservasi',
        };
    }
}
