import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    Building2,
    CheckCircle2,
    Clock,
    FileCheck2,
    Flame,
    History,
    MapPin,
    Send,
    Shield,
    Users,
} from 'lucide-react';
import { EmptyState } from '@/components/jagain/empty-state';
import { FlashMessage } from '@/components/jagain/flash-message';
import { StatusBadge } from '@/components/jagain/status-badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as agenciesIndex } from '@/routes/admin/agencies';
import { index as auditLogsIndex } from '@/routes/admin/audit-logs';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { index as reportsIndex, show as reportShow } from '@/routes/admin/reports';
import type { AuditLog, BreadcrumbItem, Report } from '@/types';

type DashboardProps = {
    statusCounts: {
        submitted: number;
        under_review: number;
        needs_information: number;
        verified: number;
        dispatched: number;
        resolution_review: number;
        resolved_verified: number;
        closed_with_reason: number;
        total: number;
    };
    priorityQueue: Report[];
    recentAuditLogs: AuditLog[];
};

export default function AdminDashboard({
    statusCounts,
    priorityQueue,
    recentAuditLogs,
}: DashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin JAGAIN',
            href: adminDashboard(),
        },
        {
            title: 'Ringkasan Operasional',
            href: adminDashboard(),
        },
    ];

    const pendingReviewTotal = statusCounts.submitted + statusCounts.under_review;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard - JAGAIN" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <FlashMessage />

                {/* Header Banner */}
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#DDE3DE] bg-gradient-to-r from-[#F3F7F4] to-white p-6 md:flex-row md:items-center dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-900/60">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#216B49] dark:text-emerald-400">
                            <Shield className="size-4" />
                            <span>Pusat Kendali Admin JAGAIN</span>
                        </div>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#171C19] dark:text-white">
                            Monitoring & Akuntabilitas Karhutla
                        </h1>
                        <p className="mt-1 text-sm text-[#68716B] dark:text-neutral-400">
                            Kelola antrean verifikasi laporan warga, koordinasi penugasan OPD, dan pantau jejak audit secara transparan.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href={reportsIndex()}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#216B49] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174B35] focus:outline-none focus:ring-2 focus:ring-[#216B49] focus:ring-offset-2"
                        >
                            <Clock className="size-4" />
                            <span>Buka Antrean Review ({pendingReviewTotal})</span>
                        </Link>
                    </div>
                </div>

                {/* Key Metric Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-[#DDE3DE] bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#68716B] dark:text-neutral-400">
                                Perlu Review
                            </span>
                            <span className="flex size-9 items-center justify-center rounded-lg bg-[#E8F1EB] text-[#216B49] dark:bg-emerald-950 dark:text-emerald-400">
                                <Clock className="size-5" />
                            </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold tracking-tight text-[#171C19] dark:text-white">
                                {pendingReviewTotal}
                            </span>
                            <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                ({statusCounts.submitted} baru, {statusCounts.under_review} telaah)
                            </span>
                        </div>
                        <div className="mt-3">
                            <Link
                                href={reportsIndex({ query: { status: 'SUBMITTED' } })}
                                className="text-xs font-semibold text-[#216B49] hover:underline dark:text-emerald-400"
                            >
                                Lihat antrean belum diperiksa &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#DDE3DE] bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#68716B] dark:text-neutral-400">
                                Butuh Info Tambahan
                            </span>
                            <span className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                <AlertTriangle className="size-5" />
                            </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold tracking-tight text-[#171C19] dark:text-white">
                                {statusCounts.needs_information}
                            </span>
                            <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                menunggu klarifikasi warga
                            </span>
                        </div>
                        <div className="mt-3">
                            <Link
                                href={reportsIndex({ query: { status: 'NEEDS_INFORMATION' } })}
                                className="text-xs font-semibold text-amber-700 hover:underline dark:text-amber-400"
                            >
                                Cek laporan menunggu info &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#DDE3DE] bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#68716B] dark:text-neutral-400">
                                Terverifikasi / Ditugaskan
                            </span>
                            <span className="flex size-9 items-center justify-center rounded-lg bg-[#E8F1EB] text-[#216B49] dark:bg-emerald-950 dark:text-emerald-400">
                                <Send className="size-5" />
                            </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold tracking-tight text-[#171C19] dark:text-white">
                                {statusCounts.verified + statusCounts.dispatched}
                            </span>
                            <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                ({statusCounts.verified} siap, {statusCounts.dispatched} di OPD)
                            </span>
                        </div>
                        <div className="mt-3">
                            <Link
                                href={reportsIndex({ query: { status: 'VERIFIED' } })}
                                className="text-xs font-semibold text-[#216B49] hover:underline dark:text-emerald-400"
                            >
                                Tugaskan ke instansi &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#DDE3DE] bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#68716B] dark:text-neutral-400">
                                Selesai Terverifikasi
                            </span>
                            <span className="flex size-9 items-center justify-center rounded-lg bg-[#E8F1EB] text-[#174B35] dark:bg-emerald-950 dark:text-emerald-300">
                                <CheckCircle2 className="size-5" />
                            </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold tracking-tight text-[#171C19] dark:text-white">
                                {statusCounts.resolved_verified}
                            </span>
                            <span className="text-xs text-[#68716B] dark:text-neutral-400">
                                ({statusCounts.closed_with_reason} ditutup berdasar)
                            </span>
                        </div>
                        <div className="mt-3">
                            <Link
                                href={reportsIndex({ query: { status: 'RESOLVED_VERIFIED' } })}
                                className="text-xs font-semibold text-[#216B49] hover:underline dark:text-emerald-400"
                            >
                                Arsip penyelesaian laporan &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Priority Queue Section */}
                <div className="rounded-xl border border-[#DDE3DE] bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between border-b border-[#DDE3DE] px-6 py-4 dark:border-neutral-800">
                        <div>
                            <h2 className="text-base font-semibold text-[#171C19] dark:text-white">
                                Antrean Prioritas Peninjauan
                            </h2>
                            <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                Laporan masyarakat yang memerlukan tindakan verifikasi atau telaah awal admin.
                            </p>
                        </div>
                        <Link
                            href={reportsIndex()}
                            className="text-xs font-semibold text-[#216B49] hover:underline dark:text-emerald-400"
                        >
                            Lihat Semua ({statusCounts.total}) &rarr;
                        </Link>
                    </div>

                    {priorityQueue.length === 0 ? (
                        <div className="p-8">
                            <EmptyState
                                icon={FileCheck2}
                                title="Tidak ada antrean tertunda"
                                description="Seluruh laporan yang masuk saat ini telah diperiksa atau ditugaskan."
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
                                        <th scope="col" className="px-6 py-3.5">Status</th>
                                        <th scope="col" className="px-6 py-3.5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                    {priorityQueue.map((report) => (
                                        <tr
                                            key={report.id}
                                            className="transition-colors hover:bg-[#F3F7F4]/50 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-[#171C19] dark:text-white">
                                                    #{report.id} — {report.title}
                                                </div>
                                                <div className="mt-0.5 text-xs text-[#68716B] dark:text-neutral-400">
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
                                                <span className="rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                    {report.category?.name ?? 'Umum'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-[#68716B] dark:text-neutral-400">
                                                <div className="flex items-center gap-1.5 font-medium text-[#171C19] dark:text-neutral-200">
                                                    <MapPin className="size-3.5 shrink-0 text-[#216B49]" />
                                                    <span className="truncate max-w-[200px]">
                                                        {report.location_description ?? `${report.latitude}, ${report.longitude}`}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={report.report_status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={reportShow(report.id)}
                                                    className="inline-flex items-center gap-1 rounded-md border border-[#216B49] bg-white px-3 py-1.5 text-xs font-semibold text-[#216B49] transition hover:bg-[#E8F1EB] dark:bg-transparent dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                                                >
                                                    <span>Tinjau</span>
                                                    <span>&rarr;</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Secondary Grid: Recent Audit Logs & Navigation Shortcuts */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-[#DDE3DE] bg-white p-6 shadow-xs lg:col-span-2 dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between border-b border-[#DDE3DE] pb-4 dark:border-neutral-800">
                            <div>
                                <h3 className="text-base font-semibold text-[#171C19] dark:text-white">
                                    Catatan Jejak Audit Terbaru
                                </h3>
                                <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                    Transparansi perubahan data, keputusan verifikasi, dan mutasi penugasan.
                                </p>
                            </div>
                            <Link
                                href={auditLogsIndex()}
                                className="text-xs font-semibold text-[#216B49] hover:underline dark:text-emerald-400"
                            >
                                Log Lengkap &rarr;
                            </Link>
                        </div>

                        {recentAuditLogs.length === 0 ? (
                            <div className="py-6 text-center text-xs text-[#68716B]">
                                Belum ada aktivitas audit yang tercatat.
                            </div>
                        ) : (
                            <ul className="mt-4 divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                {recentAuditLogs.map((log) => (
                                    <li key={log.id} className="flex items-start justify-between py-3 text-xs">
                                        <div className="flex items-start gap-2.5">
                                            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#E8F1EB] text-[#216B49] dark:bg-emerald-950 dark:text-emerald-400">
                                                <History className="size-3.5" />
                                            </span>
                                            <div>
                                                <span className="font-semibold text-[#171C19] dark:text-white">
                                                    {log.action}
                                                </span>{' '}
                                                <span className="text-[#68716B] dark:text-neutral-400">
                                                    pada {log.entity_type} #{log.entity_id}
                                                </span>
                                                {log.reason && (
                                                    <p className="mt-0.5 text-neutral-600 dark:text-neutral-300 italic">
                                                        "{log.reason}"
                                                    </p>
                                                )}
                                                <div className="mt-0.5 text-[11px] text-[#68716B] dark:text-neutral-500">
                                                    Aktor: {log.actor?.name ?? 'Sistem'}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-[#68716B] dark:text-neutral-500 shrink-0">
                                            {new Date(log.created_at).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}{' '}
                                            WIB
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Quick Configuration Links */}
                    <div className="flex flex-col gap-4 rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <h3 className="text-base font-semibold text-[#171C19] dark:text-white">
                            Akses Konfigurasi Admin
                        </h3>
                        <p className="text-xs text-[#68716B] dark:text-neutral-400">
                            Kelola data master instansi kewenangan dan kategori karhutla sesuai FR-10 PRD.
                        </p>

                        <div className="mt-2 flex flex-col gap-2.5">
                            <Link
                                href={agenciesIndex()}
                                className="flex items-center justify-between rounded-lg border border-[#DDE3DE] bg-white p-3.5 text-sm font-medium text-[#171C19] transition hover:border-[#216B49] hover:bg-[#E8F1EB]/30 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Building2 className="size-4 text-[#216B49]" />
                                    <span>Instansi & OPD Yurisdiksi</span>
                                </div>
                                <span className="text-xs text-[#68716B]">&rarr;</span>
                            </Link>

                            <Link
                                href={categoriesIndex()}
                                className="flex items-center justify-between rounded-lg border border-[#DDE3DE] bg-white p-3.5 text-sm font-medium text-[#171C19] transition hover:border-[#216B49] hover:bg-[#E8F1EB]/30 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Flame className="size-4 text-[#216B49]" />
                                    <span>Kategori Laporan</span>
                                </div>
                                <span className="text-xs text-[#68716B]">&rarr;</span>
                            </Link>

                            <Link
                                href={auditLogsIndex()}
                                className="flex items-center justify-between rounded-lg border border-[#DDE3DE] bg-white p-3.5 text-sm font-medium text-[#171C19] transition hover:border-[#216B49] hover:bg-[#E8F1EB]/30 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Shield className="size-4 text-[#216B49]" />
                                    <span>Audit Trail Lengkap</span>
                                </div>
                                <span className="text-xs text-[#68716B]">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
