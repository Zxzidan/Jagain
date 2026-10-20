<?php

namespace App\Enums;

enum AssignmentStatus: string
{
    case ASSIGNED = 'ASSIGNED';
    case RECEIVED_BY_AGENCY = 'RECEIVED_BY_AGENCY';
    case DECLINED_BY_AGENCY = 'DECLINED_BY_AGENCY';
    case IN_PROGRESS = 'IN_PROGRESS';
    case SUBMITTED_FOR_REVIEW = 'SUBMITTED_FOR_REVIEW';
    case COMPLETED = 'COMPLETED';

    public function label(): string
    {
        return match ($this) {
            self::ASSIGNED => 'Penugasan Baru',
            self::RECEIVED_BY_AGENCY => 'Diterima oleh OPD',
            self::DECLINED_BY_AGENCY => 'Ditolak oleh OPD',
            self::IN_PROGRESS => 'Sedang Ditangani',
            self::SUBMITTED_FOR_REVIEW => 'Diajukan untuk Ditinjau',
            self::COMPLETED => 'Penugasan Selesai',
        };
    }

    public function canTransitionTo(self $target): bool
    {
        if ($this === $target) {
            return false;
        }

        return match ($this) {
            self::ASSIGNED => in_array($target, [
                self::RECEIVED_BY_AGENCY,
                self::DECLINED_BY_AGENCY,
            ]),
            self::RECEIVED_BY_AGENCY => in_array($target, [
                self::IN_PROGRESS,
                self::DECLINED_BY_AGENCY,
            ]),
            self::DECLINED_BY_AGENCY => false,
            self::IN_PROGRESS => in_array($target, [
                self::SUBMITTED_FOR_REVIEW,
            ]),
            self::SUBMITTED_FOR_REVIEW => in_array($target, [
                self::COMPLETED,
                self::IN_PROGRESS, // Requested more action
            ]),
            self::COMPLETED => false,
        };
    }
}
