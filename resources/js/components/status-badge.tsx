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
        bg: 'bg-neutral-100',
        text: 'text-neutral-700',
        border: 'border-neutral-200',
        icon: Clock,
    },
    UNDER_REVIEW: {
        label: 'Sedang Ditinjau',
        bg: 'bg-blue-50',
        text: 'text-blue-700 font-semibold',
        border: 'border-blue-200',
        icon: Search,
    },
    NEEDS_INFORMATION: {
        label: 'Perlu Info Tambahan',
        bg: 'bg-amber-50',
        text: 'text-amber-800 font-semibold',
        border: 'border-amber-200',
        icon: AlertCircle,
    },
    VERIFIED: {
        label: 'Terverifikasi Valid',
        bg: 'bg-emerald-50',
        text: 'text-emerald-800 font-semibold',
        border: 'border-emerald-200',
        icon: CheckCircle2,
    },
    DISPATCHED: {
        label: 'Ditugaskan ke OPD',
        bg: 'bg-[#10e57a]',
        text: 'text-black font-bold',
        border: 'border-[#10e57a]',
        icon: Send,
    },
    RESOLUTION_REVIEW: {
        label: 'Review Penanganan',
        bg: 'bg-sky-50',
        text: 'text-sky-800 font-semibold',
        border: 'border-sky-200',
        icon: Search,
    },
    RESOLVED_VERIFIED: {
        label: 'Selesai Terverifikasi',
        bg: 'bg-emerald-100',
        text: 'text-emerald-900 font-bold',
        border: 'border-emerald-300',
        icon: CheckCheck,
    },
    CLOSED_WITH_REASON: {
        label: 'Ditutup',
        bg: 'bg-neutral-100',
        text: 'text-neutral-600',
        border: 'border-neutral-200',
        icon: XCircle,
    },

    // Assignment Statuses
    ASSIGNED: {
        label: 'Penugasan Baru',
        bg: 'bg-neutral-100',
        text: 'text-neutral-700',
        border: 'border-neutral-200',
        icon: Clock,
    },
    RECEIVED_BY_AGENCY: {
        label: 'Diterima OPD',
        bg: 'bg-emerald-50',
        text: 'text-emerald-800 font-semibold',
        border: 'border-emerald-200',
        icon: CheckCircle2,
    },
    DECLINED_BY_AGENCY: {
        label: 'Ditolak OPD',
        bg: 'bg-rose-50',
        text: 'text-rose-700 font-semibold',
        border: 'border-rose-200',
        icon: XCircle,
    },
    IN_PROGRESS: {
        label: 'Sedang Ditangani',
        bg: 'bg-emerald-100',
        text: 'text-emerald-900 font-semibold',
        border: 'border-emerald-200',
        icon: Clock,
    },
    SUBMITTED_FOR_REVIEW: {
        label: 'Diajukan Review',
        bg: 'bg-sky-50',
        text: 'text-sky-800 font-semibold',
        border: 'border-sky-200',
        icon: Send,
    },
    COMPLETED: {
        label: 'Penugasan Selesai',
        bg: 'bg-[#10e57a]',
        text: 'text-black font-bold',
        border: 'border-[#10e57a]',
        icon: CheckCheck,
    },
};

export default function StatusBadge({ status, label, className = '', size = 'md' }: StatusBadgeProps) {
    const config = statusConfig[status] || {
        label: label || status,
        bg: 'bg-white/10',
        text: 'text-white',
        border: 'border-white/20',
        icon: Clock,
    };

    const displayText = label || config.label;
    const Icon = config.icon;

    const sizeClasses = size === 'sm' ? 'px-3 py-1 text-[11px] gap-1.5' : 'px-3.5 py-1.5 text-xs gap-2';

    return (
        <span
            className={`inline-flex items-center font-sans font-medium rounded-full border backdrop-blur-md tracking-tight ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
        >
            <Icon className={size === 'sm' ? 'size-3 shrink-0' : 'size-3.5 shrink-0'} aria-hidden="true" />
            <span>{displayText}</span>
        </span>
    );
}
