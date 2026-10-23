import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Clock,
    Download,
    FileText,
    Filter,
    MapPin,
    RotateCcw,
    Search,
    Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/reports/status-badge';
import { dashboard as adminDashboard } from '@/routes/admin';
import { reports as reportsExport } from '@/routes/admin/exports';
import { index as reportsIndex, show as reportShow } from '@/routes/admin/reports';
import type { Category, PaginatedResponse, Report } from '@/types';

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
    const page = usePage();
    const flash = (page.props as any).flash;

    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [categoryId, setCategoryId] = useState<string>(
        filters.category_id ? String(filters.category_id) : ''
    );

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
                }).format(date) + ' WIB'
            );
        } catch {
            return isoString;
        }
    };

    return (
        <>
            <Head title="Antrean & Laporan Karhutla - JAGAIN Admin" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Flash Success & Error Notification */}
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
                            <span>Pusat Kendali Administrasi &bull; Review Pelaporan</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-dark-neutral sm:text-2xl">
                            Antrean & Daftar Laporan Karhutla
                        </h1>
                        <p className="text-xs text-gray-neutral sm:text-sm">
                            Telaah keabsahan bukti foto, verifikasi koordinat lapangan, dan teruskan penugasan satuan OPD terkait.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                        <a
                            href={reportsExport.url({
                                query: {
                                    status: status || undefined,
                                    category_id: categoryId || undefined,
                                },
                            })}
                            className="inline-flex items-center gap-2 rounded-lg border border-border-neutral bg-white px-3.5 py-2 text-xs font-semibold text-dark-neutral shadow-xs transition hover:bg-pale-green hover:border-gray-neutral/40"
                        >
                            <Download className="size-4 text-primary-green" />
                            <span>Ekspor Data CSV</span>
                        </a>

                        <Button
                            asChild
                            size="sm"
                            className="bg-primary-green text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                        >
                            <Link href={adminDashboard().url}>
                                <span>Kembali ke Dasbor</span>
                            </Link>
                        </Button>
                    </div>
                </header>

                {/* Status Tab Filter Bar */}
                <nav
                    aria-label="Filter berdasarkan status laporan"
                    className="no-scrollbar flex items-center gap-2 overflow-x-auto py-0.5 text-xs text-dark-neutral"
                >
                    {statusTabs.map((tab) => {
                        const countKey = tab.key || 'ALL';
                        const count = statusCounts[countKey] ?? 0;
                        const isActive = status === tab.key;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => handleStatusClick(tab.key)}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden ${
                                    isActive
                                        ? 'border-leaf-green/50 bg-soft-green font-semibold text-forest-green'
                                        : 'border-border-neutral bg-white text-dark-neutral hover:border-gray-neutral/40 hover:bg-pale-green'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                        isActive
                                            ? 'bg-primary-green text-white'
                                            : 'bg-pale-green text-gray-neutral border border-border-neutral'
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                {/* Search & Category Filter Section */}
                <div className="flex flex-col gap-3 rounded-xl border border-border-neutral bg-white p-4 shadow-xs sm:flex-row sm:items-center">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-neutral" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari berdasarkan nomor ID, kata kunci judul, atau nama lokasi..."
                            className="w-full rounded-lg border border-border-neutral bg-pale-green/40 py-2 pr-3.5 pl-10 text-xs text-dark-neutral placeholder-gray-neutral/70 transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
                        />
                    </form>

                    <div className="flex items-center gap-2">
                        <select
                            value={categoryId}
                            onChange={handleCategoryChange}
                            aria-label="Pilih Kategori Karhutla"
                            className="rounded-lg border border-border-neutral bg-pale-green/40 px-3 py-2 text-xs text-dark-neutral transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
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
                                className="inline-flex items-center gap-1.5 rounded-lg border border-border-neutral bg-white px-3 py-2 text-xs font-semibold text-gray-neutral transition hover:bg-pale-green hover:text-dark-neutral"
                                title="Reset filter"
                            >
                                <RotateCcw className="size-3.5" />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Reports Container */}
                <div className="space-y-4">
                    {reports.data.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border-neutral bg-white p-8 text-center shadow-xs sm:p-12">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border-neutral/70 bg-pale-green text-gray-neutral">
                                <FileText className="size-6 text-gray-neutral" />
                            </div>
                            <h3 className="mt-3.5 text-base font-semibold text-dark-neutral">
                                Tidak Ada Laporan yang Sesuai Kriteria
                            </h3>
                            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-gray-neutral">
                                Coba ubah kata kunci pencarian, ubah status filter, atau reset filter untuk menampilkan data lainnya.
                            </p>
                            {(search || status || categoryId) && (
                                <div className="mt-5">
                                    <Button
                                        type="button"
                                        onClick={handleReset}
                                        className="h-auto bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                    >
                                        <RotateCcw className="size-3.5 mr-1.5" />
                                        <span>Reset Semua Filter</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {reports.data.map((report) => (
                                <article
                                    key={report.id}
                                    className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-neutral/30 hover:shadow-md sm:p-5"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Core Details */}
                                        <div className="min-w-0 flex-1 space-y-2">
                                            {/* Badges Row */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="badge badge-light font-mono font-bold">
                                                    #{report.id}
                                                </span>
                                                <StatusBadge
                                                    status={report.report_status}
                                                    variant="neutral"
                                                />
                                                {report.category && (
                                                    <span className="badge badge-light">
                                                        {report.category.name}
                                                    </span>
                                                )}
                                                {report.is_simulated && (
                                                    <span className="badge badge-light text-amber-700 bg-amber-50 border border-amber-200">
                                                        SIMULASI
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-neutral">
                                                    Pelapor: <strong className="font-medium text-dark-neutral">{report.creator?.name || 'Anonim'}</strong>
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="line-clamp-1 text-base font-semibold text-dark-neutral transition-colors group-hover:text-primary-green sm:line-clamp-2">
                                                <Link href={reportShow(report.id).url}>
                                                    {report.title}
                                                </Link>
                                            </h3>

                                            {/* Location, OPD Assignment, and Time */}
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-neutral">
                                                <div className="flex min-w-0 items-center gap-1.5">
                                                    <MapPin className="size-3.5 shrink-0 text-primary-green" />
                                                    <span className="max-w-[280px] truncate font-medium text-forest-green sm:max-w-md">
                                                        {report.location_description || `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`}
                                                    </span>
                                                </div>

                                                <div className="flex shrink-0 items-center gap-1.5">
                                                    <Clock className="size-3.5 shrink-0 text-gray-neutral" />
                                                    <span>Dibuat: {formatDate(report.created_at)}</span>
                                                </div>

                                                {report.latest_assignment && (
                                                    <div className="inline-flex items-center gap-1.5 rounded bg-soft-green/60 px-2 py-0.5 text-[11px] font-medium text-forest-green">
                                                        <span>Disposisi: {report.latest_assignment.agency?.name ?? 'OPD'} ({report.latest_assignment.assignment_status})</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex shrink-0 items-center justify-end pt-1 sm:justify-start lg:justify-end lg:pt-0">
                                            <Button
                                                asChild
                                                size="sm"
                                                className="h-9 w-full bg-primary-green px-3.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98] sm:w-auto"
                                            >
                                                <Link
                                                    href={reportShow(report.id).url}
                                                    className="flex items-center justify-center gap-1.5 text-white"
                                                >
                                                    <span>Review & Tindak Lanjut</span>
                                                    <ArrowRight className="size-3.5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {reports.links.length > 3 && (
                        <div className="flex flex-col gap-3 rounded-xl border border-border-neutral bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs text-gray-neutral">
                                Menampilkan <span className="font-semibold text-dark-neutral">{reports.from ?? 0}</span> - <span className="font-semibold text-dark-neutral">{reports.to ?? 0}</span> dari <span className="font-semibold text-dark-neutral">{reports.total}</span> laporan
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5">
                                {reports.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url ?? '#'}
                                        preserveState
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
        </>
    );
}
