import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
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
import {
    StatusBadge,
    FireConditionBadge,
} from '@/components/reports/status-badge';
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
            { preserveState: true, replace: true },
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
            <Head title="Daftar & Riwayat Laporan - JAGAIN" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-xl font-bold text-dark-neutral md:text-2xl">
                            Daftar & Riwayat Laporan Karhutla
                        </h1>
                        <p className="mt-0.5 text-xs text-gray-neutral">
                            Semua laporan kebakaran hutan dan lahan yang pernah
                            Anda kirimkan
                        </p>
                    </div>
                    <Button
                        asChild
                        className="shrink-0 bg-primary-green text-xs font-semibold text-white hover:bg-forest-green"
                    >
                        <Link href="/reports/create">
                            <PlusCircle className="mr-2 size-4" />
                            Buat Laporan Baru
                        </Link>
                    </Button>
                </div>

                {/* Filter and Search Bar */}
                <div className="rounded-xl border border-border-neutral bg-white p-4 shadow-2xs">
                    <form
                        onSubmit={handleFilterSubmit}
                        className="flex flex-col gap-3 sm:flex-row"
                    >
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-gray-neutral" />
                            <Input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nomor laporan, judul, atau patokan lokasi..."
                                className="border-border-neutral pl-9 text-xs focus:border-primary-green focus:ring-primary-green"
                            />
                        </div>

                        {/* Status Select */}
                        <div className="w-full sm:w-60">
                            <select
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                }}
                                className="h-9 w-full rounded-md border border-border-neutral bg-white px-3 py-1 text-xs text-dark-neutral focus:border-primary-green focus:ring-1 focus:ring-primary-green focus:outline-none"
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
                                className="bg-primary-green text-xs text-white hover:bg-forest-green"
                            >
                                <Filter className="mr-1 size-3.5" />
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
                                    <X className="mr-1 size-3.5" />
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
                                    className="bg-primary-green text-xs text-white hover:bg-forest-green"
                                >
                                    <Link href="/reports/create">
                                        <PlusCircle className="mr-2 size-4" />
                                        Kirim Laporan Pertama
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-xs text-gray-neutral">
                            Menampilkan <strong>
                                {reports.data.length}
                            </strong>{' '}
                            dari total <strong>{reports.total}</strong> laporan
                            Anda
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {reports.data.map((report) => (
                                <div
                                    key={report.id}
                                    className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-neutral/30 hover:shadow-md"
                                >
                                    <div className="flex flex-col justify-between gap-3 border-b border-border-neutral/60 pb-3 sm:flex-row sm:items-center">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-md border border-border-neutral bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-neutral">
                                                {report.report_number}
                                            </span>
                                            <StatusBadge
                                                status={report.report_status}
                                                variant="neutral"
                                            />
                                            <FireConditionBadge
                                                condition={
                                                    report.fire_condition
                                                }
                                                variant="neutral"
                                            />
                                            {report.evidence_count !==
                                                undefined &&
                                                report.evidence_count > 0 && (
                                                    <span className="inline-flex items-center gap-1 rounded-md border border-border-neutral bg-neutral-100 px-2 py-0.5 text-xs text-gray-neutral">
                                                        <Camera className="size-3 text-gray-neutral" />
                                                        <span>
                                                            {
                                                                report.evidence_count
                                                            }{' '}
                                                            Foto Bukti
                                                        </span>
                                                    </span>
                                                )}
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-gray-neutral">
                                            <Calendar className="size-3.5 text-gray-neutral" />
                                            <span>
                                                Dikirim:{' '}
                                                {formatDate(report.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0 flex-1 space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[11px] font-semibold tracking-wider text-primary-green uppercase">
                                                        {CATEGORY_LABELS[
                                                            report.category
                                                        ] || report.category}
                                                    </span>
                                                </div>

                                                <h3 className="truncate text-base font-semibold text-dark-neutral">
                                                    {report.title}
                                                </h3>

                                                <p className="line-clamp-2 text-xs text-gray-neutral">
                                                    {report.description}
                                                </p>

                                                <div className="flex items-center gap-1.5 pt-1 text-xs">
                                                    <MapPin className="size-3.5 shrink-0 text-primary-green" />
                                                    <span className="truncate font-medium text-forest-green">
                                                        {
                                                            report.location_description
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="shrink-0 self-center">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="bg-primary-green px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98]"
                                                >
                                                    <Link
                                                        href={`/reports/${report.id}`}
                                                        className="inline-flex items-center text-white"
                                                    >
                                                        <span>
                                                            Lacak & Detail
                                                        </span>
                                                        <ArrowRight className="ml-1 size-3.5 text-white" />
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
                                    Halaman {reports.current_page} dari{' '}
                                    {reports.last_page}
                                </div>
                                <div className="flex gap-2">
                                    {reports.prev_page_url ? (
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                            className="border-border-neutral text-xs"
                                        >
                                            <Link
                                                href={reports.prev_page_url}
                                                preserveState
                                            >
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
                                            <Link
                                                href={reports.next_page_url}
                                                preserveState
                                            >
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
