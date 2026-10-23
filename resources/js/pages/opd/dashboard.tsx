import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle2,
    CheckCheck,
    Clock,
    FileText,
    Flame,
    Info,
    MapPin,
    Shield,
    ShieldAlert,
    Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Banner,
    BannerIcon,
    BannerTitle,
    BannerAction,
    BannerClose,
} from '@/components/kibo-ui/banner';
import { Pill, PillIndicator } from '@/components/kibo-ui/pill';

interface OpdDashboardProps {
    agency: {
        id: number;
        name: string;
        code: string;
        agency_type: string;
        jurisdiction: string;
        contact_email?: string;
        contact_phone?: string;
    };
    statusCounts: {
        assigned: number;
        received: number;
        in_progress: number;
        submitted_for_review: number;
        completed: number;
    };
    pendingTasks: Array<{
        id: number;
        assignment_status: string;
        assigned_at: string;
        report: {
            id: number;
            tracking_code: string;
            report_number?: string;
            title: string;
            regency_city: string;
            province: string;
            location_description?: string;
            category?: { name: string } | null;
        };
    }>;
}

function AssignmentStatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'ASSIGNED':
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-leaf-green/40 bg-soft-green/80 px-2.5 py-0.5 text-xs font-semibold text-forest-green">
                    <Clock className="size-3.5 shrink-0 text-primary-green" />
                    <span>Penugasan Baru</span>
                </span>
            );
        case 'RECEIVED_BY_AGENCY':
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral">
                    <CheckCircle2 className="size-3.5 shrink-0 text-gray-neutral" />
                    <span>Diterima OPD</span>
                </span>
            );
        case 'IN_PROGRESS':
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-leaf-green/50 bg-soft-green px-2.5 py-0.5 text-xs font-semibold text-forest-green">
                    <Flame className="size-3.5 shrink-0 text-primary-green" />
                    <span>Sedang Ditangani</span>
                </span>
            );
        case 'SUBMITTED_FOR_REVIEW':
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral">
                    <Send className="size-3.5 shrink-0 text-gray-neutral" />
                    <span>Diajukan Review</span>
                </span>
            );
        case 'COMPLETED':
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-leaf-green/30 bg-soft-green/50 px-2.5 py-0.5 text-xs font-semibold text-forest-green">
                    <CheckCheck className="size-3.5 shrink-0 text-forest-green" />
                    <span>Selesai Terverifikasi</span>
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border-neutral bg-white px-2.5 py-0.5 text-xs font-medium text-dark-neutral">
                    {status}
                </span>
            );
    }
}

export default function OpdDashboard({
    agency,
    statusCounts,
    pendingTasks = [],
}: OpdDashboardProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const totalActive =
        statusCounts.assigned +
        statusCounts.received +
        statusCounts.in_progress;
    const totalAll =
        totalActive +
        statusCounts.submitted_for_review +
        statusCounts.completed;

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
            <Head title={`Posko Operasional ${agency.code} - JAGAIN`} />

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

                {/* Top Actionable Priority Alert (Kibo UI Banner) */}
                {statusCounts.assigned > 0 && (
                    <Banner
                        inset
                        className="border-leaf-green/40 bg-soft-green/90 p-4 text-dark-neutral shadow-xs transition-all duration-200 hover:border-leaf-green/60 sm:p-5"
                    >
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="flex items-start gap-3.5">
                                <BannerIcon
                                    icon={AlertCircle}
                                    className="size-9 border-leaf-green/30 bg-white text-primary-green shadow-xs"
                                />
                                <div className="space-y-0.5">
                                    <BannerTitle className="text-sm font-semibold text-forest-green">
                                        Tindakan Diperlukan: {statusCounts.assigned} Penugasan Baru Menunggu Konfirmasi Lapangan
                                    </BannerTitle>
                                    <p className="text-xs leading-relaxed text-dark-neutral/85">
                                        Laporan kebakaran hutan & lahan telah diverifikasi admin dan dialokasikan ke {agency.name}. Segera konfirmasi penerimaan penugasan dan kerahkan tim satgas ke lokasi.
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                                <BannerAction asChild>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="shrink-0 bg-primary-green text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98]"
                                    >
                                        <Link
                                            href="/opd/tugas?status=ASSIGNED"
                                            className="flex items-center gap-1.5"
                                        >
                                            <span>Konfirmasi Penugasan</span>
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
                <header className="relative overflow-hidden rounded-2xl border border-forest-green/20 p-5 shadow-xs sm:p-6 lg:p-7">
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
                        className="absolute inset-0 bg-gradient-to-b from-[#174B35]/90 via-[#174B35]/80 to-[#216B49]/60 sm:bg-gradient-to-r sm:from-[#174B35]/92 sm:via-[#174B35]/78 sm:to-[#216B49]/60"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100 backdrop-blur-xs">
                                <Building2 className="size-3.5 shrink-0 text-emerald-200" />
                                <span>Posko Operasional Lapangan &bull; {agency.code}</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                {agency.name}
                            </h1>
                            <p className="text-sm leading-relaxed text-white/90 sm:text-base sm:leading-relaxed">
                                Wilayah Yurisdiksi: <strong className="text-white font-semibold">{agency.jurisdiction}</strong>. Kendalikan penanganan titik api di lapangan, koordinasikan satgas pemadam, dan perbarui linimasa penanganan secara terbuka.
                            </p>
                        </div>

                        {/* Quick CTA Actions */}
                        <div className="flex shrink-0 flex-wrap items-center gap-2.5 pt-1 lg:pt-0">
                            <Button
                                asChild
                                className="h-auto border border-white/40 bg-white px-4 py-2.5 text-xs font-semibold text-forest-green shadow-xs transition-all duration-150 hover:bg-pale-green hover:text-forest-green hover:shadow-sm active:scale-[0.98] sm:text-sm"
                            >
                                <Link
                                    href="/opd/tugas"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="size-4 shrink-0 text-primary-green" />
                                    <span>Daftar Seluruh Penugasan</span>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="h-auto border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-xs transition-colors duration-150 hover:bg-white/20 hover:text-white sm:text-sm"
                            >
                                <Link
                                    href="/opd/tugas?status=IN_PROGRESS"
                                    className="flex items-center gap-2"
                                >
                                    <Flame className="size-4 shrink-0 text-emerald-200" />
                                    <span>Tugas Aktif Berjalan ({statusCounts.in_progress})</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Metrics Summary Grid */}
                <section aria-labelledby="opd-metrics-summary-heading">
                    <h2 id="opd-metrics-summary-heading" className="sr-only">
                        Ringkasan Statistik Beban Operasional OPD
                    </h2>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                        {/* Metric 1: Penugasan Baru */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.11)] sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Penugasan Baru
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-pale-green text-dark-neutral transition-colors">
                                    <Clock className="size-3.5 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {statusCounts.assigned}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    tugas
                                </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between gap-1">
                                <p className="text-xs leading-tight text-gray-neutral/90">
                                    Menunggu konfirmasi penerimaan
                                </p>
                                {statusCounts.assigned > 0 && (
                                    <Pill className="border-leaf-green/40 bg-soft-green/90 px-2 py-0.5 text-[10px] text-forest-green">
                                        <PillIndicator variant="warning" pulse />
                                        <span className="font-semibold text-forest-green">
                                            butuh respon
                                        </span>
                                    </Pill>
                                )}
                            </div>
                        </div>

                        {/* Metric 2: Telah Diterima */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.11)] sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Telah Diterima
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-pale-green text-dark-neutral transition-colors">
                                    <CheckCircle2 className="size-3.5 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {statusCounts.received}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    siap satgas
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-tight text-gray-neutral/90">
                                Mobilisasi tim dan peralatan lapangan
                            </p>
                        </div>

                        {/* Metric 3: Sedang Ditangani */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.11)] sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Sedang Ditangani
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-soft-green/70 text-primary-green transition-colors">
                                    <Flame className="size-3.5 text-primary-green" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {statusCounts.in_progress}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    operasi
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-tight text-gray-neutral/90">
                                Ground check & pembasahan aktif
                            </p>
                        </div>

                        {/* Metric 4: Selesai / Review */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.11)] sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Selesai Penanganan
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-pale-green text-dark-neutral transition-colors">
                                    <Shield className="size-3.5 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {statusCounts.completed + statusCounts.submitted_for_review}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    tuntas
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-tight text-gray-neutral/90">
                                {statusCounts.submitted_for_review} review, {statusCounts.completed} terverifikasi
                            </p>
                        </div>
                    </div>
                </section>

                {/* Fast Status Filter Chips (Quick Access Bar) */}
                <nav
                    aria-label="Filter cepat berdasarkan status penugasan"
                    className="no-scrollbar flex items-center gap-2 overflow-x-auto py-0.5 text-xs text-dark-neutral"
                >
                    <span className="mr-1 hidden shrink-0 font-medium text-gray-neutral sm:inline">
                        Pintasan Status:
                    </span>
                    <Link
                        href="/opd/tugas"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Semua ({totalAll})
                    </Link>
                    <Link
                        href="/opd/tugas?status=ASSIGNED"
                        className={`shrink-0 rounded-lg border px-3 py-1.5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden ${
                            statusCounts.assigned > 0
                                ? 'border-leaf-green/50 bg-soft-green font-semibold text-forest-green'
                                : 'border-border-neutral bg-white text-dark-neutral hover:bg-pale-green'
                        }`}
                    >
                        Baru ({statusCounts.assigned})
                    </Link>
                    <Link
                        href="/opd/tugas?status=RECEIVED_BY_AGENCY"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Diterima ({statusCounts.received})
                    </Link>
                    <Link
                        href="/opd/tugas?status=IN_PROGRESS"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Sedang Ditangani ({statusCounts.in_progress})
                    </Link>
                    <Link
                        href="/opd/tugas?status=SUBMITTED_FOR_REVIEW"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Diajukan Review ({statusCounts.submitted_for_review})
                    </Link>
                    <Link
                        href="/opd/tugas?status=COMPLETED"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden"
                    >
                        Selesai ({statusCounts.completed})
                    </Link>
                </nav>

                {/* Task List / Queue Section */}
                <section
                    aria-labelledby="pending-tasks-heading"
                    className="space-y-4"
                >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2
                                id="pending-tasks-heading"
                                className="text-base font-bold tracking-tight text-dark-neutral sm:text-lg"
                            >
                                Antrean Tugas Lapangan Butuh Tindakan
                            </h2>
                            <p className="text-xs text-gray-neutral">
                                Konfirmasi penerimaan tugas, laporkan perkembangan operasi lapangan, dan ajukan peninjauan tuntas
                            </p>
                        </div>
                        {pendingTasks.length > 0 && (
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="h-8 self-start px-2.5 text-xs font-medium text-primary-green hover:bg-pale-green hover:text-forest-green sm:self-center"
                            >
                                <Link
                                    href="/opd/tugas"
                                    className="group flex items-center gap-1.5"
                                >
                                    <span>Lihat Semua ({totalAll})</span>
                                    <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Empty State */}
                    {pendingTasks.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border-neutral bg-white p-8 text-center shadow-xs sm:p-12">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border-neutral/70 bg-pale-green text-gray-neutral">
                                <CheckCircle2 className="size-6 text-primary-green" />
                            </div>
                            <h3 className="mt-3.5 text-base font-semibold text-dark-neutral">
                                Tidak Ada Tugas Menunggu Tindakan
                            </h3>
                            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-gray-neutral">
                                Seluruh penugasan pemadaman dan pemantauan karhutla yang dialokasikan ke instansi Anda telah direspon atau diselesaikan.
                            </p>
                            <div className="mt-5">
                                <Button
                                    asChild
                                    className="h-auto bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98]"
                                >
                                    <Link
                                        href="/opd/tugas"
                                        className="flex items-center gap-2"
                                    >
                                        <FileText className="size-4 shrink-0" />
                                        <span>Buka Arsip Penugasan</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingTasks.map((asg) => (
                                <article
                                    key={asg.id}
                                    className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-neutral/30 hover:shadow-md sm:p-5"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Task Core Details */}
                                        <div className="min-w-0 flex-1 space-y-2">
                                            {/* Meta & Badges Row */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="badge badge-light font-mono font-bold">
                                                    {asg.report.tracking_code || asg.report.report_number || `#${asg.report.id}`}
                                                </span>
                                                <AssignmentStatusBadge
                                                    status={asg.assignment_status}
                                                />
                                                {asg.report.category && (
                                                    <span className="badge badge-light">
                                                        {asg.report.category.name}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="line-clamp-1 text-base font-semibold text-dark-neutral transition-colors group-hover:text-primary-green sm:line-clamp-2">
                                                <Link href={`/opd/tugas/${asg.id}`}>
                                                    {asg.report.title}
                                                </Link>
                                            </h3>

                                            {/* Location & Time Metadata */}
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-neutral">
                                                <div className="flex min-w-0 items-center gap-1.5">
                                                    <MapPin className="size-3.5 shrink-0 text-primary-green" />
                                                    <span className="max-w-[280px] truncate font-medium text-forest-green sm:max-w-md">
                                                        {asg.report.location_description || `${asg.report.regency_city}, ${asg.report.province}`}
                                                    </span>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-1.5">
                                                    <Clock className="size-3.5 shrink-0 text-gray-neutral" />
                                                    <span>
                                                        Ditugaskan: {formatDate(asg.assigned_at)}
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
                                                    href={`/opd/tugas/${asg.id}`}
                                                    className="flex items-center justify-center gap-1.5 text-white"
                                                >
                                                    <span>Buka Tindak Lanjut</span>
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

                {/* SOP & Operational Guidelines Footer */}
                <footer className="rounded-xl border border-border-neutral bg-pale-green/60 p-5 shadow-xs sm:p-6 lg:p-7">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                        {/* Column 1: SOP Penanganan Satuan Tugas */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-forest-green">
                                <ShieldAlert className="size-4 shrink-0 text-primary-green" />
                                <h3 className="text-sm font-bold tracking-tight text-dark-neutral">
                                    Protokol Operasi Satuan Tugas Lapangan
                                </h3>
                            </div>
                            <ul className="space-y-2 text-xs leading-relaxed text-gray-neutral">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Respon Cepat Konfirmasi:
                                        </strong>{' '}
                                        Konfirmasi penerimaan tugas paling lambat 2 jam setelah disposisi masuk agar koordinasi lapangan segera terpetakan.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Ground Check & Sekat Basah:
                                        </strong>{' '}
                                        Untuk kebakaran lahan gambut, pastikan pembuatan sekat parit basah guna memutus bara di lapisan bawah permukaan.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Keselamatan Personel:
                                        </strong>{' '}
                                        Gunakan APD standar pemadaman karhutla dan pastikan jalur evakuasi aman terhadap perubahan arah angin mendadak.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Integritas dan Pelaporan */}
                        <div className="space-y-3 border-t border-border-neutral/80 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6 lg:pl-8">
                            <div className="flex items-center gap-2 text-forest-green">
                                <Info className="size-4 shrink-0 text-primary-green" />
                                <h3 className="text-sm font-bold tracking-tight text-dark-neutral">
                                    Integritas Pelaporan & Akuntabilitas Publik
                                </h3>
                            </div>
                            <ul className="space-y-2 text-xs leading-relaxed text-gray-neutral">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Dokumentasi Geotagging:
                                        </strong>{' '}
                                        Sertakan foto kondisi sebelum dan sesudah penanganan dengan koordinat nyata untuk keperluan verifikasi akhir.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Pembaruan Berkala:
                                        </strong>{' '}
                                        Setiap catatan progres yang diinputkan akan tersinkronisasi ke pembuat laporan demi transparansi penanganan.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Penutupan Tugas Berjenjang:
                                        </strong>{' '}
                                        Status tuntas diverifikasi oleh admin penilai setelah observasi lapangan membuktikan nihil bara aktif.
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
