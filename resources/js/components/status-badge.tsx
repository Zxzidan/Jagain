import { CheckCircle2, Clock, AlertCircle, Send, CheckCheck, XCircle, Search } from 'lucide-react';

interface StatusBadgeProps {
    status: string;
    label?: string;
    className?: string;
    size?: 'sm' | 'md';
}

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string; icon: any }> = {
    // Report Statuses
    SUBMITTED: {
        label: 'Baru Dikirim',
        bg: 'bg-[#F3F7F4]',
        text: 'text-[#343B36]',
        border: 'border-[#DDE3DE]',
        icon: Clock,
    },
    UNDER_REVIEW: {
        label: 'Sedang Ditinjau',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#216B49]/30',
        icon: Search,
    },
    NEEDS_INFORMATION: {
        label: 'Perlu Informasi Tambahan',
        bg: 'bg-white',
        text: 'text-[#171C19]',
        border: 'border-[#68716B]',
        icon: AlertCircle,
    },
    VERIFIED: {
        label: 'Terverifikasi Internal',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#216B49]',
        border: 'border-[#216B49]',
        icon: CheckCircle2,
    },
    DISPATCHED: {
        label: 'Ditugaskan ke OPD',
        bg: 'bg-[#174B35]',
        text: 'text-white',
        border: 'border-[#174B35]',
        icon: Send,
    },
    RESOLUTION_REVIEW: {
        label: 'Review Penanganan',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#39845C]',
        icon: Search,
    },
    RESOLVED_VERIFIED: {
        label: 'Selesai Terverifikasi',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#216B49]',
        icon: CheckCheck,
    },
    CLOSED_WITH_REASON: {
        label: 'Ditutup dengan Alasan',
        bg: 'bg-[#F3F7F4]',
        text: 'text-[#68716B]',
        border: 'border-[#DDE3DE]',
        icon: XCircle,
    },

    // Assignment Statuses
    ASSIGNED: {
        label: 'Penugasan Baru',
        bg: 'bg-[#F3F7F4]',
        text: 'text-[#174B35]',
        border: 'border-[#DDE3DE]',
        icon: Clock,
    },
    RECEIVED_BY_AGENCY: {
        label: 'Diterima OPD',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#216B49]',
        border: 'border-[#216B49]/30',
        icon: CheckCircle2,
    },
    DECLINED_BY_AGENCY: {
        label: 'Ditolak OPD',
        bg: 'bg-[#F3F7F4]',
        text: 'text-[#171C19]',
        border: 'border-[#343B36]',
        icon: XCircle,
    },
    IN_PROGRESS: {
        label: 'Sedang Ditangani Lapangan',
        bg: 'bg-[#216B49]',
        text: 'text-white',
        border: 'border-[#216B49]',
        icon: Clock,
    },
    SUBMITTED_FOR_REVIEW: {
        label: 'Diajukan untuk Ditinjau',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#39845C]',
        icon: Send,
    },
    COMPLETED: {
        label: 'Penugasan Selesai',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#216B49]',
        icon: CheckCheck,
    },
};

export default function StatusBadge({ status, label, className = '', size = 'md' }: StatusBadgeProps) {
    const config = statusConfig[status] || {
        label: label || status,
        bg: 'bg-[#F3F7F4]',
        text: 'text-[#343B36]',
        border: 'border-[#DDE3DE]',
        icon: Clock,
    };

    const displayText = label || config.label;
    const Icon = config.icon;

    const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px] gap-1' : 'px-2.5 py-1 text-xs gap-1.5';

    return (
        <span
            className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
        >
            <Icon className={size === 'sm' ? 'size-3 shrink-0' : 'size-3.5 shrink-0'} aria-hidden="true" />
            <span>{displayText}</span>
        </span>
    );
}
