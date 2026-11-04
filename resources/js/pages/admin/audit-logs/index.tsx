import { Head, Link, router } from '@inertiajs/react';
import {
    Activity,
    Building2,
    Clock,
    Download,
    Eye,
    FileText,
    Flame,
    History,
    RotateCcw,
    Search,
    User as UserIcon,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/jagain/empty-state';
import { FlashMessage } from '@/components/jagain/flash-message';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as auditLogsIndex } from '@/routes/admin/audit-logs';
import type { BreadcrumbItem, PaginatedResponse } from '@/types';

interface AuditLogItem {
    id: number;
    action: string;
    action_label: string;
    action_category: string;
    action_badge_class: string;
    action_icon: string;
    entity_type: string;
    entity_type_label: string;
    entity_id: number;
    entity_summary: {
        name: string;
        subtext: string;
        url?: string | null;
        badge?: string;
    } | null;
    actor_name: string;
    actor_role: string;
    actor_email?: string | null;
    reason: string | null;
    raw_reason?: string | null;
    request_id?: string | null;
    ip_address: string | null;
    before_snapshot: Record<string, any> | null;
    after_snapshot: Record<string, any> | null;
    has_snapshot: boolean;
    created_at: string;
    created_at_formatted: string;
    created_at_human: string;
}

interface OptionItem {
    value: string;
    label: string;
}

interface AuditLogsIndexProps {
    auditLogs: PaginatedResponse<AuditLogItem>;
    actionOptions: OptionItem[];
    entityTypeOptions: OptionItem[];
    stats: {
        total_logs: number;
        report_actions: number;
        dispatch_actions: number;
        system_actions: number;
    };
    filters: {
        action?: string;
        entity_type?: string;
        search?: string;
        date_preset?: string;
        from_date?: string;
        to_date?: string;
    };
}

export default function AuditLogsIndex({
    auditLogs,
    actionOptions = [],
    entityTypeOptions = [],
    stats,
    filters = {},
}: AuditLogsIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [action, setAction] = useState(filters.action ?? '');
    const [entityType, setEntityType] = useState(filters.entity_type ?? '');
    const [datePreset, setDatePreset] = useState(filters.date_preset ?? '');
    const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);
    const [showJsonMode, setShowJsonMode] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Pusat Kendali',
            href: adminDashboard(),
        },
        {
            title: 'Jejak Audit Sistem',
            href: auditLogsIndex(),
        },
    ];

    const applyFilters = (updates: Partial<typeof filters>) => {
        const query: Record<string, string> = {};

        const a = updates.action !== undefined ? updates.action : action;
        const e = updates.entity_type !== undefined ? updates.entity_type : entityType;
        const s = updates.search !== undefined ? updates.search : search;
        const d = updates.date_preset !== undefined ? updates.date_preset : datePreset;

        if (a) query.action = a;
        if (e) query.entity_type = e;
        if (s) query.search = s;
        if (d) query.date_preset = d;

        router.get(auditLogsIndex.url({ query }), {}, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleReset = () => {
        setSearch('');
        setAction('');
        setEntityType('');
        setDatePreset('');
        router.get(auditLogsIndex.url(), {}, { replace: true });
    };

    const hasActiveFilters = Boolean(search || action || entityType || datePreset);

    // Compute diff keys if both before and after snapshots exist
    const diffKeys = selectedLog && selectedLog.before_snapshot && selectedLog.after_snapshot
        ? Array.from(new Set([
            ...Object.keys(selectedLog.before_snapshot),
            ...Object.keys(selectedLog.after_snapshot),
        ]))
        : [];

    return (
        <>
            <Head title="Jejak Audit Sistem (Audit Trail) - JAGAIN Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <FlashMessage />

                {/* Header Title */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#171C19] dark:text-white">
                        Jejak Audit Sistem JAGAIN
                    </h1>
                    <p className="mt-1 text-sm text-[#68716B] dark:text-neutral-400">
                        Seluruh mutasi status laporan, penugasan ke OPD, dan konfigurasi tercatat secara permanen dan tidak dapat diubah (append-only).
                    </p>
                </div>

                {/* Metric Summary Cards */}
                {stats && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-[#68716B] dark:text-neutral-400">
                                    Total Aktivitas Log
                                </span>
                                <div className="rounded-lg bg-neutral-100 p-2 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                    <Activity className="size-4" />
                                </div>
                            </div>
                            <div className="mt-2 text-2xl font-extrabold text-[#171C19] dark:text-white tabular-nums">
                                {stats.total_logs}
                            </div>
                            <span className="text-[11px] text-neutral-500">Terekam dalam basis data</span>
                        </div>

                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-[#68716B] dark:text-neutral-400">
                                    Laporan & Telaah
                                </span>
                                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                    <Flame className="size-4" />
                                </div>
                            </div>
                            <div className="mt-2 text-2xl font-extrabold text-[#171C19] dark:text-white tabular-nums">
                                {stats.report_actions}
                            </div>
                            <span className="text-[11px] text-neutral-500">Mutasi & validasi status</span>
                        </div>

                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-[#68716B] dark:text-neutral-400">
                                    Disposisi OPD
                                </span>
                                <div className="rounded-lg bg-blue-50 p-2 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                                    <Building2 className="size-4" />
                                </div>
                            </div>
                            <div className="mt-2 text-2xl font-extrabold text-[#171C19] dark:text-white tabular-nums">
                                {stats.dispatch_actions}
                            </div>
                            <span className="text-[11px] text-neutral-500">Penugasan instansi dinas</span>
                        </div>

                        <div className="rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-[#68716B] dark:text-neutral-400">
                                    Sistem & Ekspor
                                </span>
                                <div className="rounded-lg bg-purple-50 p-2 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
                                    <Download className="size-4" />
                                </div>
                            </div>
                            <div className="mt-2 text-2xl font-extrabold text-[#171C19] dark:text-white tabular-nums">
                                {stats.system_actions}
                            </div>
                            <span className="text-[11px] text-neutral-500">Ekspor data & pengaturan</span>
                        </div>
                    </div>
                )}

                {/* Filter & Search Bar */}
                <div className="rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        {/* Search Input */}
                        <form onSubmit={handleSearchSubmit} className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#68716B] dark:text-neutral-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari aktivitas, nama aktor, nomor laporan, atau catatan..."
                                className="w-full rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 py-2.5 pr-10 pl-9 text-xs text-[#171C19] placeholder-[#68716B] focus:border-[#216B49] focus:bg-white focus:outline-none transition-colors dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-white dark:placeholder-neutral-500"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        applyFilters({ search: '' });
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </form>

                        {/* Dropdown Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Filter: Tindakan */}
                            <select
                                value={action}
                                onChange={(e) => {
                                    setAction(e.target.value);
                                    applyFilters({ action: e.target.value });
                                }}
                                aria-label="Filter jenis tindakan"
                                className="rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 px-3 py-2.5 text-xs text-[#343B36] focus:border-[#216B49] focus:bg-white focus:outline-none cursor-pointer transition-colors dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 font-medium"
                            >
                                <option value="">Semua Aktivitas</option>
                                {actionOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>

                            {/* Filter: Objek Entitas */}
                            <select
                                value={entityType}
                                onChange={(e) => {
                                    setEntityType(e.target.value);
                                    applyFilters({ entity_type: e.target.value });
                                }}
                                aria-label="Filter tipe objek"
                                className="rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 px-3 py-2.5 text-xs text-[#343B36] focus:border-[#216B49] focus:bg-white focus:outline-none cursor-pointer transition-colors dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 font-medium"
                            >
                                <option value="">Semua Objek Data</option>
                                {entityTypeOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>

                            {/* Filter: Rentang Waktu */}
                            <select
                                value={datePreset}
                                onChange={(e) => {
                                    setDatePreset(e.target.value);
                                    applyFilters({ date_preset: e.target.value });
                                }}
                                aria-label="Filter rentang waktu"
                                className="rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 px-3 py-2.5 text-xs text-[#343B36] focus:border-[#216B49] focus:bg-white focus:outline-none cursor-pointer transition-colors dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 font-medium"
                            >
                                <option value="">Semua Waktu</option>
                                <option value="today">Hari Ini</option>
                                <option value="last_7_days">7 Hari Terakhir</option>
                                <option value="this_month">Bulan Ini</option>
                            </select>

                            {/* Reset Button */}
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                    title="Reset seluruh filter"
                                >
                                    <RotateCcw className="size-3.5" />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="rounded-xl border border-[#DDE3DE] bg-white shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden">
                    {auditLogs.data.length === 0 ? (
                        <div className="p-12">
                            <EmptyState
                                icon={History}
                                title="Tidak ada rekaman jejak audit"
                                description="Tidak ada rekaman audit yang sesuai dengan kriteria penyaringan saat ini."
                            />
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View (>= md) */}
                            <div className="hidden md:block w-full overflow-hidden">
                                <table className="w-full table-fixed text-left text-xs">
                                    <thead className="border-b border-[#DDE3DE] bg-[#F3F7F4] text-[11px] font-bold uppercase tracking-wider text-[#343B36] dark:border-neutral-800 dark:bg-neutral-800/70 dark:text-neutral-300">
                                        <tr>
                                            <th scope="col" className="w-[17%] px-3 py-3 text-center">WAKTU</th>
                                            <th scope="col" className="w-[13%] px-2.5 py-3 text-center">AKTIVITAS</th>
                                            <th scope="col" className="w-[15%] px-2.5 py-3 text-center">PELAKSANA</th>
                                            <th scope="col" className="w-[22%] px-3 py-3 text-center">OBJEK TERKAIT</th>
                                            <th scope="col" className="w-[24%] px-3 py-3 text-center">KETERANGAN</th>
                                            <th scope="col" className="w-[9%] px-2 py-3 text-center">RINCIAN</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                        {auditLogs.data.map((log) => (
                                            <tr
                                                key={log.id}
                                                className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40"
                                            >
                                                {/* Waktu Pencatatan */}
                                                <td className="px-3 py-3 align-middle text-xs text-[#171C19] dark:text-neutral-200">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="size-3.5 text-[#216B49] dark:text-emerald-400 shrink-0" />
                                                        <div className="min-w-0">
                                                            <div className="font-semibold truncate">
                                                                {log.created_at_formatted}
                                                            </div>
                                                            <div className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                                                                {log.created_at_human}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Aktivitas (Action Badge) */}
                                                <td className="px-2.5 py-3 align-middle">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border shadow-2xs whitespace-nowrap ${log.action_badge_class}`}>
                                                        {log.action_label}
                                                    </span>
                                                </td>

                                                {/* Pelaksana / Aktor */}
                                                <td className="px-2.5 py-3 align-middle text-xs">
                                                    <div className="flex items-center gap-1.5 min-w-0" title={log.actor_name}>
                                                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                                                            <UserIcon className="size-2.5" />
                                                        </div>
                                                        <span className="font-semibold text-[#171C19] dark:text-white truncate">
                                                            {log.actor_name}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Objek Terkait */}
                                                <td className="px-3 py-3 align-middle text-xs">
                                                    {log.entity_summary ? (
                                                        <div className="min-w-0">
                                                            <div className="truncate font-semibold">
                                                                {log.entity_summary.url ? (
                                                                    <Link
                                                                        href={log.entity_summary.url}
                                                                        className="text-[#216B49] hover:underline dark:text-emerald-400"
                                                                        title={log.entity_summary.name}
                                                                    >
                                                                        {log.entity_summary.name}
                                                                    </Link>
                                                                ) : (
                                                                    <span className="text-[#171C19] dark:text-white" title={log.entity_summary.name}>
                                                                        {log.entity_summary.name}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {log.entity_summary.subtext && (
                                                                <div
                                                                    className="text-[11px] text-neutral-500 truncate dark:text-neutral-400 mt-0.5"
                                                                    title={log.entity_summary.subtext}
                                                                >
                                                                    {log.entity_summary.subtext}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="font-semibold text-[#171C19] dark:text-white truncate">
                                                            {log.entity_type_label}
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Catatan / Keterangan */}
                                                <td className="px-3 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                                                    <div
                                                        className="leading-snug break-words line-clamp-2"
                                                        title={log.reason ?? ''}
                                                    >
                                                        {log.reason || (
                                                            <span className="text-neutral-400 italic">Tidak ada catatan</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Rincian Data */}
                                                <td className="px-2 py-3 align-middle text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedLog(log);
                                                            setShowJsonMode(false);
                                                        }}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-[#DDE3DE] bg-white px-2.5 py-1 text-xs font-semibold text-[#216B49] hover:bg-[#E8F1EB] hover:border-[#216B49] transition-all shadow-2xs cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-emerald-400 dark:hover:bg-neutral-700 whitespace-nowrap"
                                                    >
                                                        <Eye className="size-3" />
                                                        <span>Rincian</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card List View (< md) */}
                            <div className="block md:hidden divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                {auditLogs.data.map((log) => (
                                    <div key={log.id} className="p-4 space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${log.action_badge_class}`}>
                                                {log.action_label}
                                            </span>
                                            <span className="font-mono text-[11px] text-neutral-400">
                                                {log.created_at_human}
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="text-xs font-bold text-neutral-900 dark:text-white">
                                                {log.entity_summary?.name ?? log.entity_type_label}
                                            </div>
                                            {log.entity_summary?.subtext && (
                                                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                                                    {log.entity_summary.subtext}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                                            <UserIcon className="size-3.5 text-neutral-400 shrink-0" />
                                            <span>Oleh: <strong className="text-neutral-800 dark:text-neutral-200">{log.actor_name}</strong></span>
                                        </div>

                                        {log.reason && (
                                            <p className="text-xs text-neutral-600 dark:text-neutral-300 bg-[#F3F7F4]/60 dark:bg-neutral-800/60 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 leading-relaxed">
                                                {log.reason}
                                            </p>
                                        )}

                                        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                                            <span className="font-mono text-[11px] text-neutral-400">
                                                {log.created_at_formatted}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedLog(log);
                                                    setShowJsonMode(false);
                                                }}
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-[#216B49] text-white px-3.5 py-1.5 text-xs font-semibold shadow-xs hover:bg-[#174B35] transition cursor-pointer"
                                            >
                                                <Eye className="size-3.5" />
                                                <span>Rincian</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pagination Links */}
                    {auditLogs.links && auditLogs.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#DDE3DE] px-6 py-3.5 gap-3 dark:border-neutral-800">
                            <div className="text-xs text-[#68716B] dark:text-neutral-400">
                                Menampilkan <span className="font-medium text-[#171C19] dark:text-white">{auditLogs.from ?? 0}</span> sampai{' '}
                                <span className="font-medium text-[#171C19] dark:text-white">{auditLogs.to ?? 0}</span> dari{' '}
                                <span className="font-medium text-[#171C19] dark:text-white">{auditLogs.total}</span> catatan audit
                            </div>

                            <div className="flex items-center gap-1">
                                {auditLogs.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                            link.active
                                                ? 'bg-[#216B49] text-white shadow-2xs'
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

            {/* Interactive Modal: Snapshot Detail & Audit Inspection */}
            {selectedLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity">
                    <div className="w-full max-w-2xl sm:max-w-3xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900 max-h-[90vh] flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${selectedLog.action_badge_class}`}>
                                        {selectedLog.action_label}
                                    </span>
                                </div>
                                <h3 className="mt-1.5 text-lg font-extrabold text-[#171C19] dark:text-white">
                                    Rincian Aktivitas & Perubahan Data
                                </h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    Dicatat pada {selectedLog.created_at_formatted} ({selectedLog.created_at_human})
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedLog(null)}
                                className="rounded-xl p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-white transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                            {/* Actor & Entity Info Card */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 dark:bg-neutral-800/60 dark:border-neutral-700/80 text-xs">
                                <div className="space-y-1">
                                    <span className="text-neutral-400 font-medium block">Pelaksana Aktivitas:</span>
                                    <div className="font-bold text-neutral-900 dark:text-white text-sm break-words">
                                        {selectedLog.actor_name}
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-1 break-words">
                                        Peran: <strong className="text-neutral-700 dark:text-neutral-300">
                                            {selectedLog.actor_role === 'ADMIN'
                                                ? 'Administrator Sistem'
                                                : selectedLog.actor_role === 'AGENCY'
                                                ? 'Petugas Instansi OPD'
                                                : selectedLog.actor_role === 'COMMUNITY'
                                                ? 'Masyarakat Pelapor'
                                                : selectedLog.actor_role}
                                        </strong>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-neutral-400 font-medium block">Objek Sasaran:</span>
                                    <div className="font-bold text-neutral-900 dark:text-white text-sm break-words">
                                        {selectedLog.entity_summary?.name ?? `${selectedLog.entity_type_label}`}
                                    </div>
                                    {selectedLog.entity_summary?.subtext && (
                                        <div className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 break-words leading-relaxed">
                                            {selectedLog.entity_summary.subtext}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Alasan / Catatan Lengkap */}
                            {selectedLog.reason && (
                                <div className="rounded-xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                                    <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1.5 flex items-center gap-1.5">
                                        <FileText className="size-3.5 text-[#216B49] dark:text-emerald-400 shrink-0" />
                                        <span>Keterangan / Catatan:</span>
                                    </div>
                                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed break-words whitespace-pre-wrap">
                                        {selectedLog.reason}
                                    </p>
                                </div>
                            )}

                            {/* Snapshot Visual Comparison or JSON */}
                            <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                                        Data Perubahan Nilai
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setShowJsonMode(!showJsonMode)}
                                        className="text-[11px] font-semibold text-[#216B49] hover:underline dark:text-emerald-400 cursor-pointer"
                                    >
                                        {showJsonMode ? 'Tampilkan Mode Visual' : 'Tampilkan Data Teknis'}
                                    </button>
                                </div>

                                {showJsonMode ? (
                                    /* Raw JSON View */
                                    <div className="grid gap-3 sm:grid-cols-2 pt-3">
                                        <div>
                                            <span className="text-xs font-bold text-neutral-500">
                                                Sebelum (Before):
                                            </span>
                                            <pre className="mt-1 max-h-56 overflow-auto rounded-lg bg-neutral-100 p-3 font-mono text-[11px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 break-words whitespace-pre-wrap">
                                                {selectedLog.before_snapshot
                                                    ? JSON.stringify(selectedLog.before_snapshot, null, 2)
                                                    : 'null (Tidak Ada Data Sebelumnya)'}
                                            </pre>
                                        </div>

                                        <div>
                                            <span className="text-xs font-bold text-[#216B49] dark:text-emerald-400">
                                                Sesudah (After):
                                            </span>
                                            <pre className="mt-1 max-h-56 overflow-auto rounded-lg bg-neutral-100 p-3 font-mono text-[11px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 break-words whitespace-pre-wrap">
                                                {selectedLog.after_snapshot
                                                    ? JSON.stringify(selectedLog.after_snapshot, null, 2)
                                                    : 'null'}
                                            </pre>
                                        </div>
                                    </div>
                                ) : (
                                    /* Structured Visual Table */
                                    <div className="pt-3">
                                        {diffKeys.length > 0 ? (
                                            /* Side-by-Side Diff Table */
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-xs text-left">
                                                    <thead>
                                                        <tr className="border-b border-neutral-100 text-neutral-400 uppercase text-[10px] font-bold dark:border-neutral-800">
                                                            <th className="py-2.5 px-3 w-1/3">Data / Atribut</th>
                                                            <th className="py-2.5 px-3 w-1/3 text-rose-600 dark:text-rose-400">Nilai Sebelum</th>
                                                            <th className="py-2.5 px-3 w-1/3 text-emerald-600 dark:text-emerald-400">Nilai Sesudah</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                                        {diffKeys.map((key) => {
                                                            const beforeVal = selectedLog.before_snapshot?.[key];
                                                            const afterVal = selectedLog.after_snapshot?.[key];
                                                            const isChanged = JSON.stringify(beforeVal) !== JSON.stringify(afterVal);

                                                            return (
                                                                <tr key={key} className={isChanged ? 'bg-amber-50/50 dark:bg-amber-950/20' : ''}>
                                                                    <td className="py-2.5 px-3 font-semibold text-neutral-700 dark:text-neutral-300 align-top break-words">
                                                                        {key}
                                                                    </td>
                                                                    <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-300 font-medium align-top break-words leading-relaxed">
                                                                        {beforeVal !== undefined && beforeVal !== null
                                                                            ? String(beforeVal)
                                                                            : <span className="text-neutral-300 italic">kosong</span>}
                                                                    </td>
                                                                    <td className="py-2.5 px-3 font-bold text-neutral-900 dark:text-white align-top break-words leading-relaxed">
                                                                        {afterVal !== undefined && afterVal !== null
                                                                            ? String(afterVal)
                                                                            : <span className="text-neutral-300 italic">kosong</span>}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : selectedLog.after_snapshot ? (
                                            /* Single State / Parameters Key-Value Table */
                                            <div className="space-y-2">
                                                {Object.entries(selectedLog.after_snapshot).map(([k, v]) => (
                                                    <div
                                                        key={k}
                                                        className="flex items-start justify-between gap-4 text-xs py-2 px-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60"
                                                    >
                                                        <span className="text-neutral-600 dark:text-neutral-400 font-medium shrink-0">
                                                            {k}:
                                                        </span>
                                                        <span className="font-bold text-neutral-900 dark:text-white text-right break-words leading-relaxed">
                                                            {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center text-xs text-neutral-400">
                                                Tidak ada perubahan status fisik yang tercatat pada event ini.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Technical Metadata Footer */}
                            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 px-1">
                                <div>
                                    Alamat IP: <span className="font-mono text-neutral-600 dark:text-neutral-300">{selectedLog.ip_address || '127.0.0.1'}</span>
                                </div>
                                <div>
                                    Waktu: <span className="font-medium text-neutral-600 dark:text-neutral-300">{selectedLog.created_at_formatted}</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedLog(null)}
                                className="rounded-xl bg-[#216B49] hover:bg-[#174B35] px-5 py-2 text-xs font-bold text-white transition-colors cursor-pointer shadow-2xs"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
