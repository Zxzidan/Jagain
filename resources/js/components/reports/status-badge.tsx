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
}

export function StatusBadge({
    status,
    className = '',
    showIcon = true,
}: StatusBadgeProps) {
    switch (status) {
        case 'SUBMITTED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/40 bg-soft-green/80 px-2.5 py-0.5 text-xs font-semibold text-forest-green ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/30 bg-soft-green/40 px-2.5 py-0.5 text-xs font-medium text-forest-green ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/30 bg-soft-green/50 px-2.5 py-0.5 text-xs font-semibold text-forest-green ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-pale-green px-2.5 py-0.5 text-xs font-medium text-gray-neutral ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral ${className}`}
                >
                    {status}
                </span>
            );
    }
}

interface FireConditionBadgeProps {
    condition: FireCondition;
    className?: string;
}

export function FireConditionBadge({
    condition,
    className = '',
}: FireConditionBadgeProps) {
    switch (condition) {
        case 'REPORTED_ACTIVE':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral ${className}`}
                    title="Kondisi kebakaran berdasarkan pengamatan pelapor"
                >
                    <Flame className="size-3.5 shrink-0 text-primary-green" />
                    <span>Laporan: Api Aktif</span>
                </span>
            );
        case 'OBSERVED_ACTIVE':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/40 bg-soft-green/50 px-2.5 py-0.5 text-xs font-semibold text-forest-green ${className}`}
                    title="Kondisi kebakaran terkonfirmasi aktif oleh petugas di lapangan"
                >
                    <ShieldAlert className="size-3.5 shrink-0 text-primary-green" />
                    <span>Terobservasi: Api Aktif</span>
                </span>
            );
        case 'OBSERVED_CONTAINED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral ${className}`}
                    title="Api telah disekat / terkendali"
                >
                    <Eye className="size-3.5 shrink-0 text-leaf-green" />
                    <span>Tersekat / Terkendali</span>
                </span>
            );
        case 'OBSERVED_EXTINGUISHED':
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border border-leaf-green/30 bg-soft-green/40 px-2.5 py-0.5 text-xs font-medium text-forest-green ${className}`}
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
                    className={`inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-pale-green px-2.5 py-0.5 text-xs font-medium text-gray-neutral ${className}`}
                    title="Kondisi fisik kebakaran di lapangan belum diobservasi secara langsung"
                >
                    <HelpCircle className="size-3.5 shrink-0 text-gray-neutral" />
                    <span>Belum Terpantau Lapangan</span>
                </span>
            );
    }
}
