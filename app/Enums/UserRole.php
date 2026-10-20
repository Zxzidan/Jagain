<?php

namespace App\Enums;

enum UserRole: string
{
    case COMMUNITY = 'COMMUNITY';
    case ADMIN = 'ADMIN';
    case AGENCY = 'AGENCY';

    public function label(): string
    {
        return match ($this) {
            self::COMMUNITY => 'Masyarakat',
            self::ADMIN => 'Administrator',
            self::AGENCY => 'Instansi / OPD',
        };
    }
}
