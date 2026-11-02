import { Head, Link, router } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    Building2,
    Calendar,
    Check,
    CheckCircle2,
    Clock,
    Copy,
    Download,
    Eye,
    FileCheck2,
    FileText,
    Filter,
    Flame,
    History,
    Info,
    PlusCircle,
    RotateCcw,
    Search,
    Shield,
    Tags,
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
    request_id: string | null;
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
    const [copiedRequestId, setCopiedRequestId] = useState(false);

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

    const handleCopyRequestId = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedRequestId(true);
        setTimeout(() => setCopiedRequestId(false), 2000);
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
                                placeholder="Cari catatan, alasan, nama aktor, request ID, atau ID entitas..."
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
                                <option value="">Semua Tindakan (Action)</option>
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
                                <option value="">Semua Objek Entitas</option>
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
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[960px] text-left text-sm">
                                <thead className="border-b border-[#DDE3DE] bg-[#F3F7F4] text-xs font-bold uppercase tracking-wider text-[#343B36] dark:border-neutral-800 dark:bg-neutral-800/70 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-5 py-3.5 text-center w-44">WAKTU PENCATATAN</th>
                                        <th scope="col" className="px-5 py-3.5 text-center w-56">TINDAKAN (ACTION)</th>
                                        <th scope="col" className="px-5 py-3.5 text-center w-48">AKTOR</th>
                                        <th scope="col" className="px-5 py-3.5 text-center w-64">OBJEK ENTITAS</th>
                                        <th scope="col" className="px-5 py-3.5 text-center">CATATAN / ALASAN</th>
                                        <th scope="col" className="px-5 py-3.5 text-center w-36">SNAPSHOT DATA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                    {auditLogs.data.map((log) => (
                                        <tr
                                            key={log.id}
                                            className="transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40"
                                        >
                                            {/* Waktu Pencatatan */}
                                            <td className="px-5 py-4 align-top text-xs text-[#171C19] dark:text-neutral-200">
                                                <div className="flex items-start gap-1.5">
                                                    <Clock className="size-3.5 text-[#216B49] dark:text-emerald-400 shrink-0 mt-0.5" />
                                                    <div>
                                                        <div className="font-semibold whitespace-nowrap">
                                                            {log.created_at_formatted}
                                                        </div>
                                                        <div className="text-[11px] text-neutral-400 dark:text-neutral-500">
                                                            {log.created_at_human}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Tindakan (Action) */}
                                            <td className="px-5 py-4 align-top">
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border shadow-2xs ${log.action_badge_class}`}>
                                                        {log.action_label}
                                                    </span>
                                                    <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 tracking-tight">
                                                        {log.action}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Aktor */}
                                            <td className="px-5 py-4 align-top text-xs">
                                                <div className="font-bold text-[#171C19] dark:text-white flex items-center gap-1.5">
                                                    <UserIcon className="size-3 text-neutral-400" />
                                                    <span>{log.actor_name}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700">
                                                        {log.actor_role}
                                                    </span>
                                                    {log.ip_address && (
                                                        <span className="text-[10px] text-neutral-400 font-mono">
                                                            IP: {log.ip_address}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Objek Entitas */}
                                            <td className="px-5 py-4 align-top text-xs">
                                                {log.entity_summary ? (
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5">
                                                            {log.entity_summary.url ? (
                                                                <Link
                                                                    href={log.entity_summary.url}
                                                                    className="font-bold text-[#216B49] hover:underline dark:text-emerald-400 inline-flex items-center gap-1"
                                                                >
                                                                    <span>{log.entity_summary.name}</span>
                                                                    <ArrowRight className="size-3" />
                                                                </Link>
                                                            ) : (
                                                                <span className="font-bold text-[#171C19] dark:text-white">
                                                                    {log.entity_summary.name}
                                                                </span>
                                                            )}
                                                            {log.entity_summary.badge && (
                                                                <span className="rounded bg-neutral-100 px-1.5 py-0.2 text-[9px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                                                    {log.entity_summary.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed dark:text-neutral-400">
                                                            {log.entity_summary.subtext}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <span className="font-semibold text-[#171C19] dark:text-white">
                                                            {log.entity_type_label}
                                                        </span>
                                                        <span className="text-neutral-400 ml-1">#{log.entity_id}</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Catatan / Alasan */}
                                            <td className="px-5 py-4 align-top text-xs text-neutral-600 dark:text-neutral-300">
                                                <div className="leading-relaxed break-words max-w-sm">
                                                    {log.reason || (
                                                        <span className="text-neutral-400 italic">
                                                            Tidak ada catatan tambahan
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Snapshot Data */}
                                            <td className="px-5 py-4 align-top text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedLog(log);
                                                        setShowJsonMode(false);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE3DE] bg-white px-3 py-1.5 text-xs font-bold text-[#216B49] hover:bg-[#E8F1EB] hover:border-[#216B49] transition-all shadow-2xs cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-emerald-400 dark:hover:bg-neutral-700"
                                                >
                                                    <Eye className="size-3.5" />
                                                    <span>Rincian</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900 max-h-[90vh] flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${selectedLog.action_badge_class}`}>
                                        {selectedLog.action_label}
                                    </span>
                                    <span className="text-xs text-neutral-400">•</span>
                                    <span className="text-xs font-mono text-neutral-500">Log #{selectedLog.id}</span>
                                </div>
                                <h3 className="mt-1.5 text-lg font-extrabold text-[#171C19] dark:text-white">
                                    Rincian Jejak Audit & Snapshot Data
                                </h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    {selectedLog.created_at_formatted} ({selectedLog.created_at_human})
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/80 dark:bg-neutral-800/60 dark:border-neutral-700/80 text-xs">
                                <div>
                                    <span className="text-neutral-400 font-medium">Aktor Pelaksana:</span>
                                    <div className="font-bold text-neutral-900 dark:text-white mt-0.5">
                                        {selectedLog.actor_name}
                                    </div>
                                    <div className="text-[11px] text-neutral-500">
                                        Peran: <strong className="text-neutral-700 dark:text-neutral-300">{selectedLog.actor_role}</strong>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-neutral-400 font-medium">Objek Sasaran:</span>
                                    <div className="font-bold text-neutral-900 dark:text-white mt-0.5">
                                        {selectedLog.entity_summary?.name ?? `${selectedLog.entity_type} #${selectedLog.entity_id}`}
                                    </div>
                                    <div className="text-[11px] text-neutral-500 truncate">
                                        {selectedLog.entity_summary?.subtext ?? '-'}
                                    </div>
                                </div>
                            </div>

                            {/* Alasan / Catatan Lengkap */}
                            {selectedLog.reason && (
                                <div className="rounded-xl border border-neutral-200/80 bg-white p-3.5 dark:border-neutral-800 dark:bg-neutral-900">
                                    <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1 flex items-center gap-1.5">
                                        <FileText className="size-3.5 text-[#216B49] dark:text-emerald-400" />
                                        <span>Catatan / Alasan Tindakan:</span>
                                    </div>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                        {selectedLog.reason}
                                    </p>
                                </div>
                            )}

                            {/* Snapshot Visual Comparison or JSON */}
                            <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                                        Data Snapshot Perubahan
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setShowJsonMode(!showJsonMode)}
                                        className="text-[11px] font-semibold text-[#216B49] hover:underline dark:text-emerald-400 cursor-pointer"
                                    >
                                        {showJsonMode ? 'Tampilkan Mode Visual' : 'Tampilkan Raw JSON'}
                                    </button>
                                </div>

                                {showJsonMode ? (
                                    /* Raw JSON View */
                                    <div className="grid gap-3 sm:grid-cols-2 pt-3">
                                        <div>
                                            <span className="text-xs font-bold text-neutral-500">
                                                Sebelum (Before):
                                            </span>
                                            <pre className="mt-1 max-h-56 overflow-auto rounded-lg bg-neutral-100 p-3 font-mono text-[11px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                {selectedLog.before_snapshot
                                                    ? JSON.stringify(selectedLog.before_snapshot, null, 2)
                                                    : 'null (Tidak Ada Data Sebelumnya)'}
                                            </pre>
                                        </div>

                                        <div>
                                            <span className="text-xs font-bold text-[#216B49] dark:text-emerald-400">
                                                Sesudah (After):
                                            </span>
                                            <pre className="mt-1 max-h-56 overflow-auto rounded-lg bg-neutral-100 p-3 font-mono text-[11px] text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
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
                                                            <th className="py-2 px-3 w-1/3">Properti Data</th>
                                                            <th className="py-2 px-3 w-1/3 text-rose-600 dark:text-rose-400">Nilai Sebelum</th>
                                                            <th className="py-2 px-3 w-1/3 text-emerald-600 dark:text-emerald-400">Nilai Sesudah</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                                        {diffKeys.map((key) => {
                                                            const beforeVal = selectedLog.before_snapshot?.[key];
                                                            const afterVal = selectedLog.after_snapshot?.[key];
                                                            const isChanged = JSON.stringify(beforeVal) !== JSON.stringify(afterVal);

                                                            return (
                                                                <tr key={key} className={isChanged ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''}>
                                                                    <td className="py-2 px-3 font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                                                                        {key}
                                                                    </td>
                                                                    <td className="py-2 px-3 text-neutral-500 font-mono">
                                                                        {beforeVal !== undefined && beforeVal !== null
                                                                            ? String(beforeVal)
                                                                            : <span className="text-neutral-300 italic">kosong</span>}
                                                                    </td>
                                                                    <td className="py-2 px-3 font-mono font-bold text-neutral-900 dark:text-white">
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
                                                        className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60"
                                                    >
                                                        <span className="font-mono text-neutral-500 font-medium">
                                                            {k}:
                                                        </span>
                                                        <span className="font-mono font-bold text-neutral-900 dark:text-white">
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
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400 pt-2 px-1 font-mono">
                                <div className="flex items-center gap-1.5">
                                    <span>Request ID:</span>
                                    <span className="truncate max-w-[200px] text-neutral-600 dark:text-neutral-300">
                                        {selectedLog.request_id || 'N/A'}
                                    </span>
                                    {selectedLog.request_id && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopyRequestId(selectedLog.request_id!)}
                                            className="hover:text-black dark:hover:text-white cursor-pointer ml-1"
                                            title="Salin Request ID"
                                        >
                                            {copiedRequestId ? (
                                                <Check className="size-3 text-emerald-600" />
                                            ) : (
                                                <Copy className="size-3" />
                                            )}
                                        </button>
                                    )}
                                </div>
                                <div>
                                    IP Address: {selectedLog.ip_address || '127.0.0.1'}
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
