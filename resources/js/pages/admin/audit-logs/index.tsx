import { Head, router } from '@inertiajs/react';
import {
    Clock,
    Eye,
    Filter,
    History,
    RotateCcw,
    Search,
    Shield,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/jagain/empty-state';
import { FlashMessage } from '@/components/jagain/flash-message';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as auditLogsIndex } from '@/routes/admin/audit-logs';
import type { AuditLog, BreadcrumbItem, PaginatedResponse } from '@/types';

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
    const [search, setSearch] = useState(filters.search ?? '');
    const [action, setAction] = useState(filters.action ?? '');
    const [entityType, setEntityType] = useState(filters.entity_type ?? '');
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin JAGAIN',
            href: adminDashboard(),
        },
        {
            title: 'Jejak Audit Sistem',
            href: auditLogsIndex(),
        },
    ];

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jejak Audit Transparan - JAGAIN Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <FlashMessage />

                {/* Header Title */}
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#216B49] dark:text-emerald-400">
                        <Shield className="size-4" />
                        <span>Akuntabilitas & Audit Trail (FR-09)</span>
                    </div>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#171C19] dark:text-white">
                        Jejak Audit Sistem JAGAIN
                    </h1>
                    <p className="mt-1 text-sm text-[#68716B] dark:text-neutral-400">
                        Seluruh mutasi status laporan, penugasan ke OPD, dan konfigurasi tercatat secara permanen dan tidak dapat diubah (append-only).
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-3 rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-xs sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-900">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#68716B] dark:text-neutral-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari tindakan, alasan, atau nomor ID entitas..."
                            className="w-full rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 py-2 pr-3 pl-9 text-xs text-[#171C19] placeholder-[#68716B] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-white dark:placeholder-neutral-500"
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
                            className="rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 px-3 py-2 text-xs text-[#343B36] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
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
                            className="rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 px-3 py-2 text-xs text-[#343B36] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
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
                                className="inline-flex items-center gap-1 rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[#68716B] hover:text-[#171C19] dark:text-neutral-400"
                                title="Reset filter"
                            >
                                <RotateCcw className="size-3.5" />
                                <span>Reset</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="rounded-xl border border-[#DDE3DE] bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    {auditLogs.data.length === 0 ? (
                        <div className="p-12">
                            <EmptyState
                                icon={History}
                                title="Tidak ada rekaman jejak audit"
                                description="Tidak ada rekaman audit yang sesuai dengan kriteria penyaringan."
                            />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left text-sm">
                                <thead className="border-b border-[#DDE3DE] bg-[#F3F7F4] text-xs font-semibold uppercase tracking-wider text-[#343B36] dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Waktu Pencatatan</th>
                                        <th scope="col" className="px-6 py-4">Tindakan (Action)</th>
                                        <th scope="col" className="px-6 py-4">Aktor</th>
                                        <th scope="col" className="px-6 py-4">Objek Entitas</th>
                                        <th scope="col" className="px-6 py-4">Catatan / Alasan</th>
                                        <th scope="col" className="px-6 py-4 text-right">Snapshot</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                    {auditLogs.data.map((log) => (
                                        <tr
                                            key={log.id}
                                            className="transition-colors hover:bg-[#F3F7F4]/40 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-6 py-5 align-middle text-xs font-medium text-[#171C19] dark:text-neutral-200">
                                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                    <Clock className="size-3.5 text-[#216B49] dark:text-emerald-400" />
                                                    <span>
                                                        {new Date(log.created_at).toLocaleString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                        })}{' '}
                                                        WIB
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 align-middle font-mono text-xs font-semibold text-[#174B35] dark:text-emerald-400 whitespace-nowrap">
                                                <span className="rounded bg-[#E8F1EB] px-2.5 py-1 text-xs font-medium text-[#174B35] dark:bg-emerald-950 dark:text-emerald-300">
                                                    {log.action}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-xs font-medium text-[#343B36] dark:text-neutral-300">
                                                {log.actor?.name ?? 'Sistem Otomatis'}
                                            </td>

                                            <td className="px-6 py-4 text-xs">
                                                <span className="font-semibold text-[#171C19] dark:text-white">
                                                    {log.entity_type}
                                                </span>{' '}
                                                <span className="text-[#68716B]">#{log.entity_id}</span>
                                            </td>

                                            <td className="px-6 py-4 text-xs text-[#68716B] max-w-xs truncate dark:text-neutral-400">
                                                {log.reason ?? '-'}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {(log.before_snapshot || log.after_snapshot) && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedLog(log)}
                                                        className="inline-flex items-center gap-1 rounded border border-[#DDE3DE] px-2.5 py-1 text-xs font-medium text-[#216B49] hover:bg-[#E8F1EB] dark:border-neutral-700 dark:text-emerald-400 dark:hover:bg-neutral-800"
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
                        <div className="flex items-center justify-between border-t border-[#DDE3DE] px-6 py-3.5 dark:border-neutral-800">
                            <div className="text-xs text-[#68716B] dark:text-neutral-400">
                                Menampilkan <span className="font-medium text-[#171C19] dark:text-white">{auditLogs.from ?? 0}</span> sampai{' '}
                                <span className="font-medium text-[#171C19] dark:text-white">{auditLogs.to ?? 0}</span> dari{' '}
                                <span className="font-medium text-[#171C19] dark:text-white">{auditLogs.total}</span> catatan
                            </div>

                            <div className="flex items-center gap-1">
                                {auditLogs.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                                            link.active
                                                ? 'bg-[#216B49] text-white'
                                                : link.url
                                                ? 'text-[#343B36] hover:bg-[#F3F7F4] dark:text-neutral-300 dark:hover:bg-neutral-800'
                                                : 'text-neutral-400 cursor-not-allowed'
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                    Detail Snapshot Perubahan Data
                                </h3>
                                <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                    {selectedLog.action} &bull; {selectedLog.entity_type} #{selectedLog.entity_id}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedLog(null)}
                                className="rounded p-1 text-[#68716B] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                                <span className="text-xs font-bold text-[#68716B] dark:text-neutral-400">
                                    Sebelum Perubahan (Before):
                                </span>
                                <pre className="mt-1 max-h-56 overflow-auto rounded-lg bg-neutral-100 p-3 font-mono text-[11px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                    {selectedLog.before_snapshot
                                        ? JSON.stringify(selectedLog.before_snapshot, null, 2)
                                        : 'null (Entitas Baru)'}
                                </pre>
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#216B49] dark:text-emerald-400">
                                    Setelah Perubahan (After):
                                </span>
                                <pre className="mt-1 max-h-56 overflow-auto rounded-lg bg-neutral-100 p-3 font-mono text-[11px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                    {selectedLog.after_snapshot
                                        ? JSON.stringify(selectedLog.after_snapshot, null, 2)
                                        : 'null'}
                                </pre>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedLog(null)}
                                className="rounded-lg bg-[#216B49] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#174B35]"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
