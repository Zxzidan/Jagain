import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Eye,
    Filter,
    History,
    RotateCcw,
    Search,
    Shield,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as auditLogsIndex } from '@/routes/admin/audit-logs';
import type { AuditLog, PaginatedResponse } from '@/types';

type AuditLogsIndexProps = {
    auditLogs: PaginatedResponse<AuditLog>;
    actions: string[];
    entityTypes: string[];
    filters: {
        action?: string;
        entity_type?: string;
        search?: string;
    };
};

export default function AuditLogsIndex({
    auditLogs,
    actions,
    entityTypes,
    filters,
}: AuditLogsIndexProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const [search, setSearch] = useState(filters.search ?? '');
    const [action, setAction] = useState(filters.action ?? '');
    const [entityType, setEntityType] = useState(filters.entity_type ?? '');
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

    const applyFilters = (newAction?: string, newEntity?: string, newSearch?: string) => {
        const query: Record<string, string> = {};

        const a = newAction !== undefined ? newAction : action;
        const e = newEntity !== undefined ? newEntity : entityType;
        const s = newSearch !== undefined ? newSearch : search;

        if (a) query.action = a;
        if (e) query.entity_type = e;
        if (s) query.search = s;

        router.get(auditLogsIndex.url({ query }), {}, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters(undefined, undefined, search);
    };

    const handleReset = () => {
        setSearch('');
        setAction('');
        setEntityType('');
        router.get(auditLogsIndex.url(), {}, { replace: true });
    };

    const formatDate = (isoString?: string | null) => {
        if (!isoString) return '-';
        try {
            const date = new Date(isoString);
            return (
                new Intl.DateTimeFormat('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }).format(date) + ' WIB'
            );
        } catch {
            return isoString;
        }
    };

    return (
        <>
            <Head title="Jejak Audit Transparan - JAGAIN Admin" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Flash Messages */}
                {flash?.success && (
                    <div
                        role="status"
                        className="flex items-center gap-3 rounded-xl border border-leaf-green/30 bg-soft-green/70 p-4 text-sm text-forest-green shadow-xs transition-all duration-200"
                    >
                        <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div
                        role="alert"
                        className="flex items-center gap-3 rounded-xl border border-border-neutral bg-white p-4 text-sm text-dark-neutral shadow-xs transition-all duration-200"
                    >
                        <AlertCircle className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Header Title & Actions */}
                <header className="flex flex-col justify-between gap-4 rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-green">
                            <Shield className="size-4" />
                            <span>Pusat Kendali Administrasi &bull; Audit Trail Permanen</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-dark-neutral sm:text-2xl">
                            Jejak Audit Sistem JAGAIN
                        </h1>
                        <p className="text-xs text-gray-neutral sm:text-sm">
                            Seluruh mutasi status laporan, disposisi ke OPD, dan konfigurasi master terekam permanen (append-only).
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-border-neutral bg-white text-xs font-semibold text-dark-neutral hover:bg-pale-green"
                        >
                            <Link href={adminDashboard().url}>
                                <span>Kembali ke Dasbor</span>
                            </Link>
                        </Button>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex flex-col gap-3 rounded-xl border border-border-neutral bg-white p-4 shadow-xs sm:flex-row sm:items-center">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-neutral" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari tindakan, alasan, atau nomor ID entitas..."
                            className="w-full rounded-lg border border-border-neutral bg-pale-green/40 py-2 pr-3.5 pl-10 text-xs text-dark-neutral placeholder-gray-neutral/70 transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
                        />
                    </form>

                    <div className="flex flex-wrap items-center gap-2">
                        <select
                            value={action}
                            onChange={(e) => {
                                setAction(e.target.value);
                                applyFilters(e.target.value, undefined, undefined);
                            }}
                            aria-label="Filter berdasarkan aksi audit"
                            className="rounded-lg border border-border-neutral bg-pale-green/40 px-3 py-2 text-xs text-dark-neutral transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
                        >
                            <option value="">Semua Tindakan</option>
                            {actions.map((act) => (
                                <option key={act} value={act}>
                                    {act}
                                </option>
                            ))}
                        </select>

                        <select
                            value={entityType}
                            onChange={(e) => {
                                setEntityType(e.target.value);
                                applyFilters(undefined, e.target.value, undefined);
                            }}
                            aria-label="Filter berdasarkan tipe entitas"
                            className="rounded-lg border border-border-neutral bg-pale-green/40 px-3 py-2 text-xs text-dark-neutral transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
                        >
                            <option value="">Semua Entitas</option>
                            {entityTypes.map((ent) => (
                                <option key={ent} value={ent}>
                                    {ent}
                                </option>
                            ))}
                        </select>

                        {(search || action || entityType) && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-border-neutral bg-white px-3 py-2 text-xs font-semibold text-gray-neutral transition hover:bg-pale-green hover:text-dark-neutral"
                                title="Reset filter"
                            >
                                <RotateCcw className="size-3.5" />
                                <span>Reset</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="rounded-xl border border-border-neutral bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
                    {auditLogs.data.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border-neutral/70 bg-pale-green text-gray-neutral">
                                <History className="size-6 text-gray-neutral" />
                            </div>
                            <h3 className="mt-3.5 text-base font-semibold text-dark-neutral">
                                Tidak Ada Rekaman Jejak Audit
                            </h3>
                            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-gray-neutral">
                                Tidak ada rekaman audit yang sesuai dengan kriteria penyaringan Anda.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-border-neutral bg-pale-green/60 text-[11px] font-bold text-forest-green uppercase tracking-wider">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5">Waktu Pencatatan</th>
                                        <th scope="col" className="px-6 py-3.5">Tindakan (Action)</th>
                                        <th scope="col" className="px-6 py-3.5">Aktor</th>
                                        <th scope="col" className="px-6 py-3.5">Objek Entitas</th>
                                        <th scope="col" className="px-6 py-3.5">Catatan / Alasan</th>
                                        <th scope="col" className="px-6 py-3.5 text-right">Snapshot</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-neutral text-xs">
                                    {auditLogs.data.map((log) => (
                                        <tr
                                            key={log.id}
                                            className="transition-colors hover:bg-pale-green/30"
                                        >
                                            <td className="px-6 py-4 font-medium text-dark-neutral">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="size-3.5 text-primary-green" />
                                                    <span>{formatDate(log.created_at)}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-block font-mono text-[11px] font-semibold text-forest-green bg-soft-green border border-leaf-green/30 px-2 py-0.5 rounded">
                                                    {log.action}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 font-medium text-dark-neutral">
                                                {log.actor?.name ?? 'Sistem Otomatis'}
                                            </td>

                                            <td className="px-6 py-4 text-xs">
                                                <span className="font-semibold text-dark-neutral">
                                                    {log.entity_type}
                                                </span>{' '}
                                                <span className="text-gray-neutral font-mono">#{log.entity_id}</span>
                                            </td>

                                            <td className="px-6 py-4 text-xs text-gray-neutral max-w-xs truncate">
                                                {log.reason ?? '-'}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {(log.before_snapshot || log.after_snapshot) && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedLog(log)}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-border-neutral bg-white px-2.5 py-1.5 text-xs font-semibold text-primary-green transition hover:bg-pale-green hover:border-gray-neutral/40"
                                                    >
                                                        <Eye className="size-3" />
                                                        <span>Detail</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {auditLogs.links.length > 3 && (
                        <div className="flex flex-col gap-3 border-t border-border-neutral bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs text-gray-neutral">
                                Menampilkan <span className="font-semibold text-dark-neutral">{auditLogs.from ?? 0}</span> - <span className="font-semibold text-dark-neutral">{auditLogs.to ?? 0}</span> dari <span className="font-semibold text-dark-neutral">{auditLogs.total}</span> catatan
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5">
                                {auditLogs.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                                            link.active
                                                ? 'border-leaf-green/50 bg-soft-green font-semibold text-forest-green'
                                                : link.url
                                                ? 'border-border-neutral bg-white text-dark-neutral hover:border-gray-neutral/40 hover:bg-pale-green'
                                                : 'border-border-neutral/40 bg-pale-green/40 text-gray-neutral/50 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal: Snapshot Detail */}
            {selectedLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-xl rounded-2xl border border-border-neutral bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-dark-neutral">
                                    Detail Snapshot Perubahan Data
                                </h3>
                                <p className="text-xs text-gray-neutral">
                                    {selectedLog.action} &bull; {selectedLog.entity_type} #{selectedLog.entity_id}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedLog(null)}
                                className="rounded p-1 text-gray-neutral hover:bg-pale-green"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                                <span className="text-xs font-semibold text-gray-neutral">
                                    Sebelum Perubahan (Before):
                                </span>
                                <pre className="mt-1 max-h-56 overflow-auto rounded-lg border border-border-neutral bg-pale-green/60 p-3 font-mono text-[11px] text-dark-neutral">
                                    {selectedLog.before_snapshot
                                        ? JSON.stringify(selectedLog.before_snapshot, null, 2)
                                        : 'null (Entitas Baru)'}
                                </pre>
                            </div>

                            <div>
                                <span className="text-xs font-semibold text-forest-green">
                                    Setelah Perubahan (After):
                                </span>
                                <pre className="mt-1 max-h-56 overflow-auto rounded-lg border border-leaf-green/30 bg-soft-green/50 p-3 font-mono text-[11px] text-forest-green">
                                    {selectedLog.after_snapshot
                                        ? JSON.stringify(selectedLog.after_snapshot, null, 2)
                                        : 'null'}
                                </pre>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end">
                            <Button
                                type="button"
                                onClick={() => setSelectedLog(null)}
                                className="bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
