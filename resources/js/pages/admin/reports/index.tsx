import { Head, Link, router } from '@inertiajs/react';
import {
    Download,
    FileText,
    Filter,
    MapPin,
    RotateCcw,
    Search,
    Shield,
} from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/jagain/empty-state';
import { FlashMessage } from '@/components/jagain/flash-message';
import { StatusBadge } from '@/components/jagain/status-badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import { reports as reportsExport } from '@/routes/admin/exports';
import { index as reportsIndex, show as reportShow } from '@/routes/admin/reports';
import type { BreadcrumbItem, Category, PaginatedResponse, Report, ReportStatus } from '@/types';

type ReportsIndexProps = {
    reports: PaginatedResponse<Report>;
    categories: Pick<Category, 'id' | 'name'>[];
    filters: {
        status?: string;
        category_id?: number | null;
        search?: string;
    };
    statusCounts: Record<string, number>;
};

const statusTabs: { key: string; label: string }[] = [
    { key: '', label: 'Semua Laporan' },
    { key: 'SUBMITTED', label: 'Menunggu Telaah' },
    { key: 'UNDER_REVIEW', label: 'Sedang Diperiksa' },
    { key: 'NEEDS_INFORMATION', label: 'Butuh Info' },
    { key: 'VERIFIED', label: 'Terverifikasi' },
    { key: 'DISPATCHED', label: 'Ditugaskan ke OPD' },
    { key: 'RESOLUTION_REVIEW', label: 'Review Hasil' },
    { key: 'RESOLVED_VERIFIED', label: 'Selesai' },
    { key: 'CLOSED_WITH_REASON', label: 'Ditutup' },
];

export default function ReportsIndex({
    reports,
    categories,
    filters,
    statusCounts,
}: ReportsIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [categoryId, setCategoryId] = useState<string>(
        filters.category_id ? String(filters.category_id) : ''
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin JAGAIN',
            href: adminDashboard(),
        },
        {
            title: 'Antrean & Laporan Karhutla',
            href: reportsIndex(),
        },
    ];

    const applyFilters = (newStatus?: string, newCategory?: string, newSearch?: string) => {
        const query: Record<string, string | number> = {};

        const s = newStatus !== undefined ? newStatus : status;
        const c = newCategory !== undefined ? newCategory : categoryId;
        const q = newSearch !== undefined ? newSearch : search;

        if (s) query.status = s;
        if (c) query.category_id = Number(c);
        if (q) query.search = q;

        router.get(reportsIndex.url({ query }), {}, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters(undefined, undefined, search);
    };

    const handleStatusClick = (statusKey: string) => {
        setStatus(statusKey);
        applyFilters(statusKey, undefined, undefined);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setCategoryId(val);
        applyFilters(undefined, val, undefined);
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        setCategoryId('');
        router.get(reportsIndex.url(), {}, { replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Antrean & Laporan Karhutla - JAGAIN Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <FlashMessage />

                {/* Page Title & Actions */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#171C19] dark:text-white">
                            Antrean & Daftar Laporan Karhutla
                        </h1>
                        <p className="mt-1 text-sm text-[#68716B] dark:text-neutral-400">
                            Pemeriksaan validitas, permintaan klarifikasi tambahan, dan koordinasi penugasan instansi.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={reportsExport.url({
                                query: {
                                    status: status || undefined,
                                    category_id: categoryId || undefined,
                                },
                            })}
                            className="inline-flex items-center gap-2 rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2 text-xs font-semibold text-[#343B36] shadow-xs transition hover:bg-[#F3F7F4] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                            <Download className="size-4 text-[#216B49]" />
                            <span>Ekspor CSV</span>
                        </a>
                    </div>
                </div>

                {/* Status Tab Filter Bar */}
                <div className="flex gap-1.5 overflow-x-auto border-b border-[#DDE3DE] pb-2 dark:border-neutral-800">
                    {statusTabs.map((tab) => {
                        const countKey = tab.key || 'ALL';
                        const count = statusCounts[countKey] ?? 0;
                        const isActive = status === tab.key;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => handleStatusClick(tab.key)}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                                    isActive
                                        ? 'bg-[#216B49] text-white shadow-xs'
                                        : 'text-[#68716B] hover:bg-[#E8F1EB] hover:text-[#174B35] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                                        isActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search & Category Filter Section */}
                <div className="flex flex-col gap-3 rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-xs sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-900">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#68716B] dark:text-neutral-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari berdasarkan nomor ID, kata kunci judul, atau nama lokasi..."
                            className="w-full rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 py-2 pr-3 pl-9 text-xs text-[#171C19] placeholder-[#68716B] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-white dark:placeholder-neutral-500"
                        />
                    </form>

                    <div className="flex items-center gap-2">
                        <select
                            value={categoryId}
                            onChange={handleCategoryChange}
                            aria-label="Pilih Kategori Karhutla"
                            className="rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 px-3 py-2 text-xs text-[#343B36] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-200"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        {(search || status || categoryId) && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center gap-1 rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[#68716B] hover:text-[#171C19] dark:text-neutral-400 dark:hover:text-white"
                                title="Reset filter"
                            >
                                <RotateCcw className="size-3.5" />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Reports Table */}
                <div className="rounded-xl border border-[#DDE3DE] bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    {reports.data.length === 0 ? (
                        <div className="p-12">
                            <EmptyState
                                icon={FileText}
                                title="Tidak ada laporan yang sesuai kriteria"
                                description="Ubah kata kunci pencarian atau reset filter untuk menampilkan data lainnya."
                                action={
                                    (search || status || categoryId) ? (
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#216B49] px-4 py-2 text-xs font-semibold text-white hover:bg-[#174B35]"
                                        >
                                            <RotateCcw className="size-3.5" />
                                            <span>Reset Semua Filter</span>
                                        </button>
                                    ) : undefined
                                }
                            />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-[#DDE3DE] bg-[#F3F7F4] text-xs font-semibold text-[#343B36] uppercase dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5">ID & Judul Laporan</th>
                                        <th scope="col" className="px-6 py-3.5">Kategori</th>
                                        <th scope="col" className="px-6 py-3.5">Lokasi</th>
                                        <th scope="col" className="px-6 py-3.5">Status Laporan</th>
                                        <th scope="col" className="px-6 py-3.5">Penugasan OPD</th>
                                        <th scope="col" className="px-6 py-3.5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                    {reports.data.map((report) => (
                                        <tr
                                            key={report.id}
                                            className="transition-colors hover:bg-[#F3F7F4]/40 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-xs font-bold text-[#216B49] dark:text-emerald-400">
                                                        #{report.id}
                                                    </span>
                                                    <span className="font-semibold text-[#171C19] dark:text-white">
                                                        {report.title}
                                                    </span>
                                                    {report.is_simulated && (
                                                        <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                                                            SIMULASI
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1 text-xs text-[#68716B] dark:text-neutral-400">
                                                    Pelapor: {report.creator?.name ?? 'Anonim'} &bull; Dibuat:{' '}
                                                    {new Date(report.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })} WIB
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-block rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                    {report.category?.name ?? 'Umum'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-xs text-[#68716B] dark:text-neutral-400">
                                                <div className="flex items-center gap-1 text-[#171C19] dark:text-neutral-200">
                                                    <MapPin className="size-3.5 shrink-0 text-[#216B49]" />
                                                    <span className="truncate max-w-[200px] font-medium">
                                                        {report.location_description ?? `${report.latitude}, ${report.longitude}`}
                                                    </span>
                                                </div>
                                                <div className="mt-0.5 font-mono text-[10px] text-neutral-400">
                                                    {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge status={report.report_status} />
                                            </td>

                                            <td className="px-6 py-4 text-xs">
                                                {report.latest_assignment ? (
                                                    <div>
                                                        <span className="font-semibold text-[#171C19] dark:text-white">
                                                            {report.latest_assignment.agency?.name ?? 'Instansi'}
                                                        </span>
                                                        <div className="mt-0.5 text-[11px] text-[#68716B] dark:text-neutral-400">
                                                            Status: {report.latest_assignment.assignment_status}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-[#68716B] dark:text-neutral-500 italic">
                                                        Belum ditugaskan
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={reportShow(report.id)}
                                                    className="inline-flex items-center gap-1 rounded-md bg-[#216B49] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-[#174B35]"
                                                >
                                                    <span>Review</span>
                                                    <span>&rarr;</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination Links */}
                    {reports.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-[#DDE3DE] px-6 py-3.5 dark:border-neutral-800">
                            <div className="text-xs text-[#68716B] dark:text-neutral-400">
                                Menampilkan <span className="font-medium text-[#171C19] dark:text-white">{reports.from ?? 0}</span> sampai{' '}
                                <span className="font-medium text-[#171C19] dark:text-white">{reports.to ?? 0}</span> dari{' '}
                                <span className="font-medium text-[#171C19] dark:text-white">{reports.total}</span> laporan
                            </div>

                            <div className="flex items-center gap-1">
                                {reports.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url ?? '#'}
                                        preserveState
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
        </AppLayout>
    );
}
