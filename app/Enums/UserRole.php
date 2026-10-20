<?php

namespace App\Enums;

enum UserRole: string
{
    case PUBLIC = 'PUBLIC';
    case COMMUNITY = 'COMMUNITY';
    case ADMIN = 'ADMIN';
    case AGENCY = 'AGENCY';

    public function label(): string
    {
        return match ($this) {
            self::PUBLIC => 'Pengunjung',
            self::COMMUNITY => 'Masyarakat',
            self::ADMIN => 'Administrator',
            self::AGENCY => 'Petugas OPD / Instansi',
        };
    }
}
