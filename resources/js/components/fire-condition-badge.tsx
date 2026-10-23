import { Flame, CheckCircle, ShieldAlert, HelpCircle } from 'lucide-react';

interface FireConditionBadgeProps {
    condition: string;
    source?: string | null;
    observedAt?: string | null;
    className?: string;
}

const conditionConfig: Record<string, { label: string; bg: string; text: string; border: string; icon: any }> = {
    UNKNOWN: {
        label: 'Kondisi Lapangan Belum Dicek',
        bg: 'bg-neutral-100',
        text: 'text-neutral-700',
        border: 'border-neutral-200',
        icon: HelpCircle,
    },
    REPORTED_ACTIVE: {
        label: 'Dilaporkan Ada Api Aktif',
        bg: 'bg-neutral-100',
        text: 'text-neutral-800 font-semibold',
        border: 'border-neutral-200',
        icon: Flame,
    },
    OBSERVED_ACTIVE: {
        label: 'Terobservasi Api Aktif Lapangan',
        bg: 'bg-neutral-900',
        text: 'text-white font-bold',
        border: 'border-neutral-800',
        icon: Flame,
    },
    OBSERVED_CONTAINED: {
        label: 'Terkendali / Sekat Dibuat',
        bg: 'bg-emerald-50',
        text: 'text-neutral-800 font-semibold',
        border: 'border-emerald-200',
        icon: ShieldAlert,
    },
    OBSERVED_EXTINGUISHED: {
        label: 'Terobservasi Padam / Asap Sisa',
        bg: 'bg-[#10e57a]',
        text: 'text-black font-bold',
        border: 'border-[#10e57a]',
        icon: CheckCircle,
    },
};

export default function FireConditionBadge({
    condition,
    source,
    observedAt,
    className = '',
}: FireConditionBadgeProps) {
    const config = conditionConfig[condition] || conditionConfig.UNKNOWN;
    const Icon = config.icon;

    return (
        <div className={`inline-flex flex-col gap-1 ${className}`}>
            <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-sans font-medium rounded-full border backdrop-blur-md ${config.bg} ${config.text} ${config.border}`}
            >
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{config.label}</span>
            </span>
            {source && (
                <span className="text-[10px] text-neutral-400 font-mono tracking-tight pl-1.5">
                    Sumber: {source} {observedAt && `(${new Date(observedAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })})`}
                </span>
            )}
        </div>
    );
}
