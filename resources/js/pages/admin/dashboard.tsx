import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle2,
    Clock,
    Download,
    FileCheck2,
    FileText,
    Flame,
    History,
    Info,
    MapPin,
    Send,
    Shield,
    ShieldAlert,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/reports/status-badge';
import {
    Banner,
    BannerIcon,
    BannerTitle,
    BannerAction,
    BannerClose,
} from '@/components/kibo-ui/banner';
import { Pill, PillIndicator } from '@/components/kibo-ui/pill';
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
    priorityQueue: Array<
        Report & {
            tracking_code?: string;
            report_number?: string;
            creator?: { name: string; email?: string } | null;
            created_by_user?: { name: string; email?: string } | null;
        }
    >;
    recentAuditLogs: Array<
        AuditLog & {
            actor?: { name: string } | null;
            actor_user?: { name: string } | null;
        }
    >;
    activeAssignments?: Array<{
        id: number;
        assignment_status: string;
        assigned_at: string;
        agency?: { name: string; code?: string } | null;
        report?: {
            id: number;
            tracking_code?: string;
            title: string;
            category?: { name: string } | null;
        } | null;
    }>;
    agencyStats?: Array<{
        id: number;
        name: string;
        code: string;
        jurisdiction: string;
        total_assignments_count?: number;
        in_progress_count?: number;
        completed_count?: number;
    }>;
};

export default function AdminDashboard({
    statusCounts,
    priorityQueue = [],
    recentAuditLogs = [],
    activeAssignments = [],
    agencyStats = [],
}: DashboardProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const pendingReviewTotal =
        statusCounts.submitted + statusCounts.under_review;

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
            <Head title="Admin Dashboard - JAGAIN" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-7 sm:gap-8 p-4 sm:p-6 lg:p-8">
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

                {/* Top Actionable Priority Alert (Kibo UI Banner) */}
                {pendingReviewTotal > 0 && (
                    <Banner
                        inset
                        className="rounded-2xl border-leaf-green/40 bg-soft-green/90 p-4.5 sm:p-5.5 lg:px-6 text-dark-neutral shadow-xs transition-all duration-200 hover:border-leaf-green/60"
                    >
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="flex items-start gap-4">
                                <BannerIcon
                                    icon={Clock}
                                    className="size-10 border-leaf-green/30 bg-white text-primary-green shadow-xs rounded-xl"
                                />
                                <div className="space-y-1">
                                    <BannerTitle className="text-sm sm:text-base font-bold text-forest-green tracking-tight">
                                        Tindakan Diperlukan: {pendingReviewTotal} Laporan Menunggu Telaah Admin
                                    </BannerTitle>
                                    <p className="text-xs sm:text-[13px] leading-relaxed text-dark-neutral/85">
                                        Terdapat {statusCounts.submitted} laporan baru dan {statusCounts.under_review} laporan dalam telaah yang memerlukan validasi koordinat GPS dan bukti foto sebelum didisposisikan ke instansi OPD.
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                                <BannerAction asChild>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="h-10 px-4 rounded-xl shrink-0 bg-primary-green text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98]"
                                    >
                                        <Link
                                            href={reportsIndex({ query: { status: 'SUBMITTED' } }).url}
                                            className="flex items-center gap-1.5"
                                        >
                                            <span>Buka Antrean Review</span>
                                            <ArrowRight className="size-3.5" />
                                        </Link>
                                    </Button>
                                </BannerAction>
                                <BannerClose />
                            </div>
                        </div>
                    </Banner>
                )}

                {/* Hero Header with Karhutla Background & Transparent Forest Green Overlay */}
                <header className="relative overflow-hidden rounded-2xl border border-forest-green/20 p-6 sm:p-8 lg:p-10 shadow-sm">
                    {/* Background Wildfire Photo */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/images/karhutla-hero.png')",
                        }}
                        aria-hidden="true"
                    />

                    {/* Dark Green Gradient Overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#174B35]/92 via-[#174B35]/82 to-[#216B49]/65 sm:bg-gradient-to-r sm:from-[#174B35]/95 sm:via-[#174B35]/82 sm:to-[#216B49]/65"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl space-y-3.5 sm:space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-100 backdrop-blur-md shadow-2xs">
                                <Shield className="size-3.5 shrink-0 text-emerald-200" />
                                <span>Pusat Kendali Administrator JAGAIN</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-tight sm:leading-snug">
                                Monitoring & Akuntabilitas Karhutla
                            </h1>
                            <p className="text-sm sm:text-base leading-relaxed text-emerald-50/90 font-normal max-w-xl">
                                Kelola antrean verifikasi laporan warga, koordinasikan penugasan instansi OPD lintas yurisdiksi, dan kawal transparansi penanganan karhutla secara terpadu.
                            </p>
                        </div>

                        {/* Quick CTA Actions */}
                        <div className="flex shrink-0 flex-wrap items-center gap-3 pt-2 lg:pt-0">
                            <Button
                                asChild
                                className="h-11 rounded-xl border border-white/40 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-forest-green shadow-xs transition-all duration-150 hover:bg-emerald-50 hover:text-forest-green hover:shadow-sm active:scale-[0.98]"
                            >
                                <Link
                                    href={reportsIndex().url}
                                    className="flex items-center gap-2"
                                >
                                    <Clock className="size-4 shrink-0 text-primary-green" />
                                    <span>Buka Antrean Review ({pendingReviewTotal})</span>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="h-11 rounded-xl border border-white/30 bg-white/10 px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/20 hover:text-white active:scale-[0.98]"
                            >
                                <Link
                                    href={agenciesIndex().url}
                                    className="flex items-center gap-2"
                                >
                                    <Building2 className="size-4 shrink-0 text-emerald-200" />
                                    <span>Instansi & OPD</span>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="h-11 rounded-xl border border-white/30 bg-white/10 px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/20 hover:text-white active:scale-[0.98]"
                            >
                                <Link
                                    href={auditLogsIndex().url}
                                    className="flex items-center gap-2"
                                >
                                    <History className="size-4 shrink-0 text-emerald-200" />
                                    <span>Log Audit</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Metrics Summary Grid */}
                <section aria-labelledby="admin-metrics-heading">
                    <h2 id="admin-metrics-heading" className="sr-only">
                        Ringkasan Statistik Penanganan Karhutla
                    </h2>

                    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                        {/* Metric 1: Perlu Review Awal */}
                        <div className="group rounded-2xl border border-border-neutral bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase">
                                    Perlu Review Awal
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-green text-dark-neutral transition-colors">
                                    <Clock className="size-4 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="my-3 flex items-baseline gap-2 sm:gap-2.5">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-forest-green tabular-nums">
                                    {pendingReviewTotal}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-gray-neutral">
                                    laporan
                                </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between gap-1">
                                <p className="text-xs leading-normal text-gray-500">
                                    {statusCounts.submitted} baru, {statusCounts.under_review} dalam telaah
                                </p>
                                {statusCounts.submitted > 0 && (
                                    <Pill className="border-leaf-green/40 bg-soft-green/90 px-2.5 py-1 text-[11px] text-forest-green rounded-full">
                                        <PillIndicator variant="warning" pulse />
                                        <span className="font-semibold text-forest-green">
                                            {statusCounts.submitted} baru
                                        </span>
                                    </Pill>
                                )}
                            </div>
                        </div>

                        {/* Metric 2: Butuh Info Tambahan */}
                        <div className="group rounded-2xl border border-border-neutral bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase">
                                    Butuh Info Tambahan
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-green text-dark-neutral transition-colors">
                                    <AlertCircle className="size-4 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="my-3 flex items-baseline gap-2 sm:gap-2.5">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-forest-green tabular-nums">
                                    {statusCounts.needs_information}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-gray-neutral">
                                    laporan
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-normal text-gray-500">
                                Menunggu respon klarifikasi pelapor
                            </p>
                        </div>

                        {/* Metric 3: Terverifikasi / Ditugaskan OPD */}
                        <div className="group rounded-2xl border border-border-neutral bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase">
                                    Terverifikasi / OPD
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-soft-green/70 text-primary-green transition-colors">
                                    <Send className="size-4 text-primary-green" />
                                </div>
                            </div>
                            <div className="my-3 flex items-baseline gap-2 sm:gap-2.5">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-forest-green tabular-nums">
                                    {statusCounts.verified + statusCounts.dispatched}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-gray-neutral">
                                    laporan
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-normal text-gray-500">
                                {statusCounts.verified} siap disposisi, {statusCounts.dispatched} di OPD
                            </p>
                        </div>

                        {/* Metric 4: Selesai Ditangani */}
                        <div className="group rounded-2xl border border-border-neutral bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase">
                                    Selesai Ditangani
                                </span>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-green text-dark-neutral transition-colors">
                                    <CheckCircle2 className="size-4 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="my-3 flex items-baseline gap-2 sm:gap-2.5">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-forest-green tabular-nums">
                                    {statusCounts.resolved_verified}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-gray-neutral">
                                    tuntas
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-normal text-gray-500">
                                {statusCounts.closed_with_reason} ditutup berdasar catatan
                            </p>
                        </div>
                    </div>
                </section>

                {/* Fast Status Filter Chips (Quick Access Bar) */}
                <nav
                    aria-label="Filter cepat berdasarkan status laporan"
                    className="no-scrollbar flex items-center gap-2.5 overflow-x-auto py-1 text-xs text-dark-neutral"
                >
                    <span className="mr-1.5 hidden shrink-0 text-xs sm:text-sm font-semibold text-gray-neutral sm:inline">
                        Pintasan Status:
                    </span>
                    <Link
                        href={reportsIndex().url}
                        className="shrink-0 rounded-xl border border-border-neutral bg-white px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-dark-neutral transition-all hover:border-gray-neutral/40 hover:bg-pale-green shadow-2xs focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Semua ({statusCounts.total})
                    </Link>
                    <Link
                        href={reportsIndex({ query: { status: 'SUBMITTED' } }).url}
                        className={`shrink-0 rounded-xl border px-3.5 py-2 text-xs sm:text-[13px] font-semibold transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden ${
                            statusCounts.submitted > 0
                                ? 'border-leaf-green/50 bg-soft-green font-bold text-forest-green'
                                : 'border-border-neutral bg-white text-dark-neutral hover:bg-pale-green'
                        }`}
                    >
                        Baru ({statusCounts.submitted})
                    </Link>
                    <Link
                        href={reportsIndex({ query: { status: 'UNDER_REVIEW' } }).url}
                        className="shrink-0 rounded-xl border border-border-neutral bg-white px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-dark-neutral transition-all hover:border-gray-neutral/40 hover:bg-pale-green shadow-2xs focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Dalam Telaah ({statusCounts.under_review})
                    </Link>
                    <Link
                        href={reportsIndex({ query: { status: 'NEEDS_INFORMATION' } }).url}
                        className="shrink-0 rounded-xl border border-border-neutral bg-white px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-dark-neutral transition-all hover:border-gray-neutral/40 hover:bg-pale-green shadow-2xs focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Butuh Info ({statusCounts.needs_information})
                    </Link>
                    <Link
                        href={reportsIndex({ query: { status: 'VERIFIED' } }).url}
                        className="shrink-0 rounded-xl border border-border-neutral bg-white px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-dark-neutral transition-all hover:border-gray-neutral/40 hover:bg-pale-green shadow-2xs focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Terverifikasi ({statusCounts.verified})
                    </Link>
                    <Link
                        href={reportsIndex({ query: { status: 'DISPATCHED' } }).url}
                        className="shrink-0 rounded-xl border border-border-neutral bg-white px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-dark-neutral transition-all hover:border-gray-neutral/40 hover:bg-pale-green shadow-2xs focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Ditugaskan ({statusCounts.dispatched})
                    </Link>
                    <Link
                        href={reportsIndex({ query: { status: 'RESOLVED_VERIFIED' } }).url}
                        className="shrink-0 rounded-xl border border-border-neutral bg-white px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-dark-neutral transition-all hover:border-gray-neutral/40 hover:bg-pale-green shadow-2xs focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Tuntas Selesai ({statusCounts.resolved_verified})
                    </Link>
                </nav>

                {/* Priority Queue Section (Antrean Prioritas Peninjauan) */}
                <section
                    aria-labelledby="priority-queue-heading"
                    className="space-y-4 pt-1"
                >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2
                                id="priority-queue-heading"
                                className="text-lg sm:text-xl font-extrabold tracking-tight text-dark-neutral"
                            >
                                Antrean Prioritas Peninjauan Laporan
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-neutral mt-0.5">
                                Laporan masyarakat yang memerlukan tindakan telaah awal, klarifikasi data, atau disposisi dinas
                            </p>
                        </div>
                        {priorityQueue.length > 0 && (
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="h-8 self-start px-2.5 text-xs font-medium text-primary-green hover:bg-pale-green hover:text-forest-green sm:self-center"
                            >
                                <Link
                                    href={reportsIndex().url}
                                    className="group flex items-center gap-1.5"
                                >
                                    <span>Lihat Semua ({statusCounts.total})</span>
                                    <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Empty State */}
                    {priorityQueue.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border-neutral bg-white p-8 text-center shadow-xs sm:p-12">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border-neutral/70 bg-pale-green text-gray-neutral">
                                <CheckCircle2 className="size-6 text-primary-green" />
                            </div>
                            <h3 className="mt-3.5 text-base font-semibold text-dark-neutral">
                                Tidak Ada Antrean Tertunda
                            </h3>
                            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-gray-neutral">
                                Seluruh laporan yang masuk saat ini telah selesai diperiksa, diverifikasi, atau diteruskan ke instansi penanganan terkait.
                            </p>
                            <div className="mt-5">
                                <Button
                                    asChild
                                    className="h-auto bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98]"
                                >
                                    <Link
                                        href={reportsIndex().url}
                                        className="flex items-center gap-2"
                                    >
                                        <FileText className="size-4 shrink-0" />
                                        <span>Buka Arsip Seluruh Laporan</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {priorityQueue.map((report) => (
                                <article
                                    key={report.id}
                                    className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-neutral/30 hover:shadow-md sm:p-5"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Report Details */}
                                        <div className="min-w-0 flex-1 space-y-2">
                                            {/* Badges Row */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="badge badge-light font-mono font-bold">
                                                    {report.tracking_code || report.report_number || `#${report.id}`}
                                                </span>
                                                <StatusBadge
                                                    status={report.report_status as any}
                                                    variant="neutral"
                                                />
                                                {report.category && (
                                                    <span className="badge badge-light">
                                                        {report.category.name}
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-neutral">
                                                    Pelapor: <strong className="font-medium text-dark-neutral">{report.creator?.name || report.created_by_user?.name || 'Masyarakat'}</strong>
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="line-clamp-1 text-base font-semibold text-dark-neutral transition-colors group-hover:text-primary-green sm:line-clamp-2">
                                                <Link href={reportShow(report.id).url}>
                                                    {report.title}
                                                </Link>
                                            </h3>

                                            {/* Location & Time */}
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-neutral">
                                                <div className="flex min-w-0 items-center gap-1.5">
                                                    <MapPin className="size-3.5 shrink-0 text-primary-green" />
                                                    <span className="max-w-[280px] truncate font-medium text-forest-green sm:max-w-md">
                                                        {report.location_description || `${report.latitude}, ${report.longitude}`}
                                                    </span>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-1.5">
                                                    <Clock className="size-3.5 shrink-0 text-gray-neutral" />
                                                    <span>
                                                        Diterima: {formatDate(report.created_at)}
                                                    </span>
                                                </div>
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
                                                    <span>Tinjau & Verifikasi</span>
                                                    <ArrowRight className="size-3.5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Secondary Grid: Recent Audit Logs & Navigation Shortcuts */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Audit Logs Column */}
                    <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6 lg:col-span-2">
                        <div className="flex items-center justify-between border-b border-border-neutral pb-4">
                            <div>
                                <h3 className="text-base font-bold tracking-tight text-dark-neutral">
                                    Catatan Jejak Audit Terbaru
                                </h3>
                                <p className="text-xs text-gray-neutral">
                                    Transparansi mutasi status, telaah verifikator, dan disposisi ke satuan OPD
                                </p>
                            </div>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2.5 text-xs font-medium text-primary-green hover:bg-pale-green hover:text-forest-green"
                            >
                                <Link
                                    href={auditLogsIndex().url}
                                    className="group flex items-center gap-1"
                                >
                                    <span>Log Lengkap</span>
                                    <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                                </Link>
                            </Button>
                        </div>

                        {recentAuditLogs.length === 0 ? (
                            <div className="py-8 text-center text-xs text-gray-neutral">
                                Belum ada aktivitas mutasi audit yang tercatat.
                            </div>
                        ) : (
                            <ul className="mt-4 divide-y divide-border-neutral">
                                {recentAuditLogs.map((log) => (
                                    <li
                                        key={log.id}
                                        className="flex items-start justify-between gap-3 py-3 text-xs"
                                    >
                                        <div className="flex items-start gap-2.5 min-w-0">
                                            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-soft-green text-primary-green">
                                                <History className="size-3.5" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-dark-neutral truncate">
                                                    {log.action}{' '}
                                                    <span className="font-normal text-gray-neutral">
                                                        pada {log.entity_type} #{log.entity_id}
                                                    </span>
                                                </p>
                                                {log.reason && (
                                                    <p className="mt-0.5 italic text-gray-neutral/90 line-clamp-1">
                                                        "{log.reason}"
                                                    </p>
                                                )}
                                                <p className="mt-0.5 text-[11px] text-gray-neutral">
                                                    Aktor: {log.actor?.name || log.actor_user?.name || 'Sistem JAGAIN'}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="shrink-0 text-[11px] text-gray-neutral">
                                            {formatDate(log.created_at)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Quick Configuration Links */}
                    <div className="flex flex-col gap-4 rounded-xl border border-border-neutral bg-pale-green/60 p-5 shadow-xs sm:p-6">
                        <div>
                            <h3 className="text-base font-bold tracking-tight text-dark-neutral">
                                Akses Konfigurasi Admin
                            </h3>
                            <p className="text-xs text-gray-neutral">
                                Kelola master data instansi dan kategori laporan karhutla
                            </p>
                        </div>

                        <div className="mt-1 flex flex-col gap-2.5">
                            <Link
                                href={agenciesIndex().url}
                                className="group flex items-center justify-between rounded-lg border border-border-neutral bg-white p-3.5 text-sm font-medium text-dark-neutral shadow-xs transition-all hover:border-leaf-green/50 hover:bg-soft-green/30 hover:text-forest-green"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Building2 className="size-4 text-primary-green" />
                                    <span>Instansi & OPD Yurisdiksi</span>
                                </div>
                                <ArrowRight className="size-4 text-gray-neutral transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-forest-green" />
                            </Link>

                            <Link
                                href={categoriesIndex().url}
                                className="group flex items-center justify-between rounded-lg border border-border-neutral bg-white p-3.5 text-sm font-medium text-dark-neutral shadow-xs transition-all hover:border-leaf-green/50 hover:bg-soft-green/30 hover:text-forest-green"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Flame className="size-4 text-primary-green" />
                                    <span>Kategori Laporan Karhutla</span>
                                </div>
                                <ArrowRight className="size-4 text-gray-neutral transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-forest-green" />
                            </Link>

                            <Link
                                href={auditLogsIndex().url}
                                className="group flex items-center justify-between rounded-lg border border-border-neutral bg-white p-3.5 text-sm font-medium text-dark-neutral shadow-xs transition-all hover:border-leaf-green/50 hover:bg-soft-green/30 hover:text-forest-green"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Shield className="size-4 text-primary-green" />
                                    <span>Audit Trail Lengkap</span>
                                </div>
                                <ArrowRight className="size-4 text-gray-neutral transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-forest-green" />
                            </Link>

                            <a
                                href="/admin/exports/reports"
                                className="group flex items-center justify-between rounded-lg border border-border-neutral bg-white p-3.5 text-sm font-medium text-dark-neutral shadow-xs transition-all hover:border-leaf-green/50 hover:bg-soft-green/30 hover:text-forest-green"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Download className="size-4 text-primary-green" />
                                    <span>Ekspor Rekap Laporan</span>
                                </div>
                                <ArrowRight className="size-4 text-gray-neutral transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-forest-green" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* SOP & Governance Guidelines Footer */}
                <footer className="rounded-xl border border-border-neutral bg-pale-green/60 p-5 shadow-xs sm:p-6 lg:p-7">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                        {/* Column 1: SOP Verifikasi Admin */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-forest-green">
                                <ShieldAlert className="size-4 shrink-0 text-primary-green" />
                                <h3 className="text-sm font-bold tracking-tight text-dark-neutral">
                                    Standar Operasional Verifikasi Laporan Masuk
                                </h3>
                            </div>
                            <ul className="space-y-2 text-xs leading-relaxed text-gray-neutral">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Validasi Koordinat & Foto:
                                        </strong>{' '}
                                        Pastikan koordinat lokasi masuk ke wilayah yurisdiksi yang tepat serta foto bukti menunjukkan tanda kebakaran nyata atau kepulan asap pekat.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Permintaan Informasi Tambahan:
                                        </strong>{' '}
                                        Gunakan status "Perlu Info Tambahan" dengan catatan yang jelas dan santun jika lokasi belum memiliki patokan atau foto bukti kurang memadai.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Disposisi Instansi Berwenang:
                                        </strong>{' '}
                                        Teruskan segera laporan yang terverifikasi ke BPBD, Manggala Agni, atau Damkar setempat dengan catatan prioritas wilayah.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Integritas dan Transparansi */}
                        <div className="space-y-3 border-t border-border-neutral/80 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6 lg:pl-8">
                            <div className="flex items-center gap-2 text-forest-green">
                                <Info className="size-4 shrink-0 text-primary-green" />
                                <h3 className="text-sm font-bold tracking-tight text-dark-neutral">
                                    Integritas Audit Trail & Akuntabilitas Penutupan
                                </h3>
                            </div>
                            <ul className="space-y-2 text-xs leading-relaxed text-gray-neutral">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Pencatatan Audit Otomatis:
                                        </strong>{' '}
                                        Setiap mutasi status, catatan internal, dan pembatalan penugasan terekam permanen dalam log audit sistem untuk menjamin tata kelola yang bersih.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Kriteria Penutupan Laporan:
                                        </strong>{' '}
                                        Penutupan status "Selesai Terverifikasi" wajib menyertakan bukti ground check atau hasil pemadaman tuntas dari instansi lapangan.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Transparansi Terhadap Masyarakat:
                                        </strong>{' '}
                                        Masyarakat pelapor dapat memantau setiap langkah disposisi dinas secara real-time pada dashboard publik dan pelacak laporan.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
