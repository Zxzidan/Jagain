import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Clock,
    FileText,
    Filter,
    MapPin,
    PlusCircle,
    Search,
    X,
    ArrowRight,
    Camera,
    Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge, FireConditionBadge } from '@/components/reports/status-badge';
import type { ReportPagination } from '@/types';
import { dashboard } from '@/routes';

interface Props {
    reports: ReportPagination;
    filters: {
        status: string;
        search: string;
    };
    statuses: {
        value: string;
        label: string;
    }[];
}

const CATEGORY_LABELS: Record<string, string> = {
    hutan: 'Kebakaran Hutan',
    gambut: 'Lahan Gambut',
    perkebunan: 'Pertanian / Perkebunan',
    pemukiman: 'Dekat Pemukiman',
    lainnya: 'Lainnya',
};

export default function ReportsIndex({ reports, filters, statuses }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const handleFilterSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get(
            '/reports',
            {
                search: search || undefined,
                status: selectedStatus || undefined,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setSelectedStatus('');
        router.get('/reports', {}, { replace: true });
    };

    const formatDate = (isoString?: string | null) => {
        if (!isoString) return '-';
        try {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date) + ' WIB';
        } catch {
            return isoString;
        }
    };

    return (
        <>
            <Head title="Daftar & Riwayat Laporan - JAGAIN" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-dark-neutral">
                            Daftar & Riwayat Laporan Karhutla
                        </h1>
                        <p className="text-xs text-gray-neutral mt-0.5">
                            Semua laporan kebakaran hutan dan lahan yang pernah Anda kirimkan
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-primary-green text-white hover:bg-forest-green text-xs font-semibold shrink-0"
                    >
                        <Link href="/reports/create">
                            <PlusCircle className="size-4 mr-2" />
                            Buat Laporan Baru
                        </Link>
                    </Button>
                </div>

                {/* Filter and Search Bar */}
                <div className="rounded-xl border border-border-neutral bg-white p-4 shadow-2xs">
                    <form onSubmit={handleFilterSubmit} className="flex flex-col sm:flex-row gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 size-4 text-gray-neutral pointer-events-none" />
                            <Input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nomor laporan, judul, atau patokan lokasi..."
                                className="pl-9 text-xs border-border-neutral focus:border-primary-green focus:ring-primary-green"
                            />
                        </div>

                        {/* Status Select */}
                        <div className="w-full sm:w-60">
                            <select
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                }}
                                className="h-9 w-full rounded-md border border-border-neutral bg-white px-3 py-1 text-xs text-dark-neutral focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green"
                            >
                                <option value="">Semua Status Laporan</option>
                                {statuses.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Submit & Reset buttons */}
                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                size="sm"
                                className="bg-primary-green text-white hover:bg-forest-green text-xs"
                            >
                                <Filter className="size-3.5 mr-1" />
                                Terapkan
                            </Button>
                            {(search || selectedStatus) && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleReset}
                                    className="border-border-neutral text-xs text-gray-neutral hover:bg-soft-green"
                                >
                                    <X className="size-3.5 mr-1" />
                                    Reset
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Reports List */}
                {reports.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border-neutral bg-white p-12 text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-soft-green text-forest-green">
                            <FileText className="size-6" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-dark-neutral">
                            {search || selectedStatus
                                ? 'Tidak Ada Laporan yang Cocok'
                                : 'Belum Ada Laporan'}
                        </h3>
                        <p className="mx-auto mt-1 max-w-sm text-xs text-gray-neutral">
                            {search || selectedStatus
                                ? 'Coba ubah kata kunci pencarian atau reset filter status laporan Anda.'
                                : 'Anda belum pernah mengirimkan laporan karhutla. Laporan Anda akan tersimpan di sini.'}
                        </p>
                        <div className="mt-6 flex justify-center gap-3">
                            {search || selectedStatus ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleReset}
                                    className="border-border-neutral text-xs"
                                >
                                    Hapus Filter Pencarian
                                </Button>
                            ) : (
                                <Button
                                    asChild
                                    size="sm"
                                    className="bg-primary-green text-white hover:bg-forest-green text-xs"
                                >
                                    <Link href="/reports/create">
                                        <PlusCircle className="size-4 mr-2" />
                                        Kirim Laporan Pertama
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-xs text-gray-neutral">
                            Menampilkan <strong>{reports.data.length}</strong> dari total <strong>{reports.total}</strong> laporan Anda
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {reports.data.map((report) => (
                                <div
                                    key={report.id}
                                    className="rounded-xl border border-border-neutral bg-white p-5 transition-colors hover:border-primary-green/50 hover:bg-pale-green/30 shadow-2xs"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-neutral/60 pb-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-forest-green bg-soft-green px-2 py-0.5 rounded-md">
                                                {report.report_number}
                                            </span>
                                            <StatusBadge status={report.report_status} />
                                            <FireConditionBadge condition={report.fire_condition} />
                                            {report.evidence_count !== undefined && report.evidence_count > 0 && (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-gray-neutral">
                                                    <Camera className="size-3" />
                                                    <span>{report.evidence_count} Foto Bukti</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-gray-neutral">
                                            <Calendar className="size-3.5 text-leaf-green" />
                                            <span>Dikirim: {formatDate(report.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1.5 flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-green">
                                                        {CATEGORY_LABELS[report.category] || report.category}
                                                    </span>
                                                </div>

                                                <h3 className="text-base font-semibold text-dark-neutral truncate">
                                                    {report.title}
                                                </h3>

                                                <p className="text-xs text-gray-neutral line-clamp-2">
                                                    {report.description}
                                                </p>

                                                <div className="flex items-center gap-1.5 text-xs text-dark-neutral/80 pt-1">
                                                    <MapPin className="size-3.5 text-primary-green shrink-0" />
                                                    <span className="truncate">{report.location_description}</span>
                                                </div>
                                            </div>

                                            <div className="shrink-0 self-center">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-border-neutral text-xs text-forest-green hover:border-primary-green hover:bg-soft-green"
                                                >
                                                    <Link href={`/reports/${report.id}`}>
                                                        <span>Lacak & Detail</span>
                                                        <ArrowRight className="size-3.5 ml-1" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {reports.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-border-neutral pt-4 text-xs text-gray-neutral">
                                <div>
                                    Halaman {reports.current_page} dari {reports.last_page}
                                </div>
                                <div className="flex gap-2">
                                    {reports.prev_page_url ? (
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                            className="border-border-neutral text-xs"
                                        >
                                            <Link href={reports.prev_page_url} preserveState>
                                                Sebelumnya
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled
                                            className="border-border-neutral text-xs opacity-50"
                                        >
                                            Sebelumnya
                                        </Button>
                                    )}

                                    {reports.next_page_url ? (
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                            className="border-border-neutral text-xs"
                                        >
                                            <Link href={reports.next_page_url} preserveState>
                                                Selanjutnya
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled
                                            className="border-border-neutral text-xs opacity-50"
                                        >
                                            Selanjutnya
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

ReportsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Laporan Saya',
            href: '/reports',
        },
    ],
};
