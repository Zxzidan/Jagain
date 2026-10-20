import { Flame, CheckCircle, ShieldAlert, HelpCircle } from 'lucide-react';

interface FireConditionBadgeProps {
    condition: string;
    source?: string | null;
    observedAt?: string | null;
    className?: string;
}

const conditionConfig: Record<string, { label: string; bg: string; text: string; border: string; icon: any }> = {
    UNKNOWN: {
        label: 'Kondisi Lapangan Belum Dicek Langsung',
        bg: 'bg-[#F3F7F4]',
        text: 'text-[#68716B]',
        border: 'border-[#DDE3DE]',
        icon: HelpCircle,
    },
    REPORTED_ACTIVE: {
        label: 'Dilaporkan Ada Api Aktif',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#216B49]',
        icon: Flame,
    },
    OBSERVED_ACTIVE: {
        label: 'Terobservasi Api Aktif Lapangan',
        bg: 'bg-[#174B35]',
        text: 'text-white',
        border: 'border-[#174B35]',
        icon: Flame,
    },
    OBSERVED_CONTAINED: {
        label: 'Terkendali / Pembuatan Sekat Bakar',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#216B49]',
        border: 'border-[#39845C]',
        icon: ShieldAlert,
    },
    OBSERVED_EXTINGUISHED: {
        label: 'Terobservasi Padam / Asap Sisa',
        bg: 'bg-[#E8F1EB]',
        text: 'text-[#174B35]',
        border: 'border-[#216B49]',
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
        <div className={`inline-flex flex-col gap-0.5 ${className}`}>
            <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.bg} ${config.text} ${config.border}`}
            >
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{config.label}</span>
            </span>
            {source && (
                <span className="text-[11px] text-[#68716B] pl-1">
                    Sumber: {source} {observedAt && `(${new Date(observedAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })})`}
                </span>
            )}
        </div>
    );
}
