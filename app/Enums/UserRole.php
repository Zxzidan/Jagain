<?php

namespace App\Enums;

enum UserRole: string
{
    case PUBLIC = 'PUBLIC';
    case COMMUNITY = 'COMMUNITY';
    case ADMIN = 'ADMIN';
    case AGENCY = 'AGENCY';
    case EXECUTIVE = 'EXECUTIVE';

    public function label(): string
    {
        return match ($this) {
            self::PUBLIC => 'Pengunjung',
            self::COMMUNITY => 'Masyarakat',
            self::ADMIN => 'Administrator',
            self::AGENCY => 'Instansi / OPD',
            self::EXECUTIVE => 'Eksekutif / Pimpinan',
        };
    }
}
