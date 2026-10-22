import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileQuestion,
    Flame,
    Send,
    ShieldAlert,
    XCircle,
} from 'lucide-react';
import type { AssignmentStatus, ReportStatus } from '@/types';

type StatusBadgeProps = {
    status: ReportStatus | AssignmentStatus | string;
    className?: string;
};

const statusConfig: Record<
    string,
    { label: string; bg: string; text: string; border: string; icon: typeof Clock }
> = {
    // Report statuses
    SUBMITTED: {
        label: 'Menunggu Telaah',
        bg: 'bg-[#F3F7F4]',
        text: 'text-[#343B36]',
        border: 'border-[#DDE3DE]',
        icon: Clock,
    },
    UNDER_REVIEW: {
        label: 'Sedang Diperiksa',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#39845C]/30',
        icon: Clock,
    },
    NEEDS_INFORMATION: {
        label: 'Perlu Informasi Tambahan',
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-800 dark:text-amber-200',
        border: 'border-amber-200 dark:border-amber-800/50',
        icon: FileQuestion,
    },
    VERIFIED: {
        label: 'Terverifikasi Valid',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#216B49]',
        border: 'border-[#216B49]/40',
        icon: CheckCircle2,
    },
    DISPATCHED: {
        label: 'Ditugaskan ke OPD',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#39845C]',
        icon: Send,
    },
    RESOLUTION_REVIEW: {
        label: 'Meninjau Hasil Penanganan',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#216B49]',
        border: 'border-[#216B49]/50',
        icon: Clock,
    },
    RESOLVED_VERIFIED: {
        label: 'Tindak Lanjut Selesai',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#174B35]',
        icon: CheckCircle2,
    },
    CLOSED_WITH_REASON: {
        label: 'Ditutup dengan Alasan',
        bg: 'bg-neutral-100 dark:bg-neutral-900',
        text: 'text-neutral-700 dark:text-neutral-300',
        border: 'border-neutral-300 dark:border-neutral-700',
        icon: XCircle,
    },

    // Assignment statuses
    ASSIGNED: {
        label: 'Penugasan Dikirim',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#216B49]',
        border: 'border-[#39845C]/30',
        icon: Send,
    },
    RECEIVED_BY_AGENCY: {
        label: 'Diterima Instansi',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#174B35]/40',
        icon: CheckCircle2,
    },
    DECLINED_BY_AGENCY: {
        label: 'Ditolak Instansi',
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-800 dark:text-rose-200',
        border: 'border-rose-200 dark:border-rose-800/50',
        icon: AlertCircle,
    },
    IN_PROGRESS: {
        label: 'Penanganan Berlangsung',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#216B49]',
        icon: Flame,
    },
    SUBMITTED_FOR_REVIEW: {
        label: 'Diajukan untuk Review',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#216B49]',
        border: 'border-[#39845C]',
        icon: Clock,
    },
    COMPLETED: {
        label: 'Penugasan Selesai',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#174B35]',
        icon: CheckCircle2,
    },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const config = statusConfig[status] || {
        label: status,
        bg: 'bg-neutral-100 dark:bg-neutral-800',
        text: 'text-neutral-800 dark:text-neutral-200',
        border: 'border-neutral-200 dark:border-neutral-700',
        icon: ShieldAlert,
    };

    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text} ${config.border} ${className}`}
        >
            <Icon className="size-3.5 shrink-0" />
            <span>{config.label}</span>
        </span>
    );
}
