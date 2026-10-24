import React from 'react';
import type { FireCondition, ReportStatus } from '@/types';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileCheck,
    FileText,
    HelpCircle,
    Send,
    XCircle,
    Flame,
    Eye,
    ShieldAlert,
} from 'lucide-react';

interface StatusBadgeProps {
    status: ReportStatus;
    className?: string;
    showIcon?: boolean;
    variant?: 'default' | 'neutral';
}

export function StatusBadge({
    status,
    className = '',
    showIcon = true,
    variant = 'default',
}: StatusBadgeProps) {
    if (variant === 'neutral') {
        let label = status as string;
        let Icon = Clock;
        switch (status) {
            case 'SUBMITTED':
                label = 'Terkirim';
                Icon = Clock;
                break;
            case 'UNDER_REVIEW':
                label = 'Sedang Diperiksa';
                Icon = FileText;
                break;
            case 'NEEDS_INFORMATION':
                label = 'Perlu Info Tambahan';
                Icon = AlertCircle;
                break;
            case 'VERIFIED':
                label = 'Terverifikasi';
                Icon = CheckCircle2;
                break;
            case 'DISPATCHED':
                label = 'Diteruskan ke Instansi';
                Icon = Send;
                break;
            case 'RESOLUTION_REVIEW':
                label = 'Penanganan Ditinjau';
                Icon = FileCheck;
                break;
            case 'RESOLVED_VERIFIED':
                label = 'Penanganan Selesai';
                Icon = CheckCircle2;
                break;
            case 'CLOSED_WITH_REASON':
                label = 'Ditutup';
                Icon = XCircle;
                break;
        }
        return (
            <span
                className={`badge badge-light ${className}`}
            >
                {showIcon && (
                    <Icon className="size-3.5 shrink-0 text-[#212529] dark:text-zinc-200" />
                )}
                <span>{label}</span>
            </span>
        );
    }

    switch (status) {
        case 'SUBMITTED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral dark:border-border dark:bg-card dark:text-foreground ${className}`}
                >
                    {showIcon && (
                        <Clock className="size-3.5 shrink-0 text-gray-neutral" />
                    )}
                    <span>Terkirim</span>
                </span>
            );
        case 'UNDER_REVIEW':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral dark:border-border dark:bg-card dark:text-foreground ${className}`}
                >
                    {showIcon && (
                        <FileText className="size-3.5 shrink-0 text-gray-neutral" />
                    )}
                    <span>Sedang Diperiksa</span>
                </span>
            );
        case 'NEEDS_INFORMATION':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/40 bg-soft-green/80 px-2.5 py-0.5 text-xs font-semibold text-forest-green dark:border-leaf-green/50 dark:bg-soft-green ${className}`}
                >
                    {showIcon && (
                        <AlertCircle className="size-3.5 shrink-0 text-primary-green" />
                    )}
                    <span>Perlu Info Tambahan</span>
                </span>
            );
        case 'VERIFIED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/30 bg-soft-green/40 px-2.5 py-0.5 text-xs font-medium text-forest-green dark:border-leaf-green/40 dark:bg-soft-green ${className}`}
                >
                    {showIcon && (
                        <CheckCircle2 className="size-3.5 shrink-0 text-primary-green" />
                    )}
                    <span>Terverifikasi</span>
                </span>
            );
        case 'DISPATCHED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral dark:border-border dark:bg-card dark:text-foreground ${className}`}
                >
                    {showIcon && (
                        <Send className="size-3.5 shrink-0 text-primary-green" />
                    )}
                    <span>Diteruskan ke Instansi</span>
                </span>
            );
        case 'RESOLUTION_REVIEW':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral dark:border-border dark:bg-card dark:text-foreground ${className}`}
                >
                    {showIcon && (
                        <FileCheck className="size-3.5 shrink-0 text-leaf-green" />
                    )}
                    <span>Penanganan Ditinjau</span>
                </span>
            );
        case 'RESOLVED_VERIFIED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/30 bg-soft-green/50 px-2.5 py-0.5 text-xs font-semibold text-forest-green dark:border-leaf-green/40 dark:bg-soft-green ${className}`}
                >
                    {showIcon && (
                        <CheckCircle2 className="size-3.5 shrink-0 text-forest-green" />
                    )}
                    <span>Penanganan Selesai</span>
                </span>
            );
        case 'CLOSED_WITH_REASON':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-pale-green px-2.5 py-0.5 text-xs font-medium text-gray-neutral dark:border-border dark:bg-pale-green ${className}`}
                >
                    {showIcon && (
                        <XCircle className="size-3.5 shrink-0 text-gray-neutral" />
                    )}
                    <span>Ditutup</span>
                </span>
            );
        default:
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral dark:border-border dark:bg-card dark:text-foreground ${className}`}
                >
                    {status}
                </span>
            );
    }
}

interface FireConditionBadgeProps {
    condition: FireCondition;
    className?: string;
    variant?: 'default' | 'neutral';
}

export function FireConditionBadge({
    condition,
    className = '',
    variant = 'default',
}: FireConditionBadgeProps) {
    if (variant === 'neutral') {
        let label = 'Belum Terpantau Lapangan';
        let Icon = HelpCircle;
        let title =
            'Kondisi fisik kebakaran di lapangan belum diobservasi secara langsung';
        switch (condition) {
            case 'REPORTED_ACTIVE':
                label = 'Laporan: Api Aktif';
                Icon = Flame;
                title = 'Kondisi kebakaran berdasarkan pengamatan pelapor';
                break;
            case 'OBSERVED_ACTIVE':
                label = 'Terobservasi: Api Aktif';
                Icon = ShieldAlert;
                title =
                    'Kondisi kebakaran terkonfirmasi aktif oleh petugas di lapangan';
                break;
            case 'OBSERVED_CONTAINED':
                label = 'Tersekat / Terkendali';
                Icon = Eye;
                title = 'Api telah disekat / terkendali';
                break;
            case 'OBSERVED_EXTINGUISHED':
                label = 'Terobservasi: Padam';
                Icon = CheckCircle2;
                title =
                    'Kondisi kebakaran terobservasi telah padam oleh petugas berwenang';
                break;
            case 'UNKNOWN':
            default:
                break;
        }
        return (
            <span
                className={`badge badge-light ${className}`}
                title={title}
            >
                <Icon className="size-3.5 shrink-0 text-[#212529] dark:text-zinc-200" />
                <span>{label}</span>
            </span>
        );
    }

    switch (condition) {
        case 'REPORTED_ACTIVE':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral dark:border-border dark:bg-card dark:text-foreground ${className}`}
                    title="Kondisi kebakaran berdasarkan pengamatan pelapor"
                >
                    <Flame className="size-3.5 shrink-0 text-primary-green" />
                    <span>Laporan: Api Aktif</span>
                </span>
            );
        case 'OBSERVED_ACTIVE':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/40 bg-soft-green/50 px-2.5 py-0.5 text-xs font-semibold text-forest-green dark:border-leaf-green/50 dark:bg-soft-green ${className}`}
                    title="Kondisi kebakaran terkonfirmasi aktif oleh petugas di lapangan"
                >
                    <ShieldAlert className="size-3.5 shrink-0 text-primary-green" />
                    <span>Terobservasi: Api Aktif</span>
                </span>
            );
        case 'OBSERVED_CONTAINED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral dark:border-border dark:bg-card dark:text-foreground ${className}`}
                    title="Api telah disekat / terkendali"
                >
                    <Eye className="size-3.5 shrink-0 text-leaf-green" />
                    <span>Tersekat / Terkendali</span>
                </span>
            );
        case 'OBSERVED_EXTINGUISHED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/30 bg-soft-green/40 px-2.5 py-0.5 text-xs font-medium text-forest-green dark:border-leaf-green/40 dark:bg-soft-green ${className}`}
                    title="Kondisi kebakaran terobservasi telah padam oleh petugas berwenang"
                >
                    <CheckCircle2 className="size-3.5 shrink-0 text-forest-green" />
                    <span>Terobservasi: Padam</span>
                </span>
            );
        case 'UNKNOWN':
        default:
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-pale-green px-2.5 py-0.5 text-xs font-medium text-gray-neutral dark:border-border dark:bg-pale-green ${className}`}
                    title="Kondisi fisik kebakaran di lapangan belum diobservasi secara langsung"
                >
                    <HelpCircle className="size-3.5 shrink-0 text-gray-neutral" />
                    <span>Belum Terpantau Lapangan</span>
                </span>
            );
    }
}
