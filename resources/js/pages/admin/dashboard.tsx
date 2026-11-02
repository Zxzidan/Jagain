import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    ArrowRight,
    ArrowUpRight,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Clock,
    Download,
    Eye,
    FileText,
    Filter,
    Flame,
    History,
    Info,
    MapPin,
    MoreHorizontal,
    Plus,
    RotateCcw,
    Search,
    Send,
    Shield,
    ShieldAlert,
    Sparkles,
    TrendingUp,
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
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as agenciesIndex } from '@/routes/admin/agencies';
import { index as auditLogsIndex } from '@/routes/admin/audit-logs';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { index as reportsIndex, show as reportShow } from '@/routes/admin/reports';
import type { AuditLog, Report } from '@/types';

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

    const [period, setPeriod] = useState<'bulan' | 'minggu' | 'tahun'>('bulan');
    const [chartMode, setChartMode] = useState<'monthly' | 'yearly'>('monthly');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [activeBar, setActiveBar] = useState<number>(6); // Default July (index 6)

    const pendingReviewTotal = statusCounts.submitted + statusCounts.under_review;

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

    // Filter reports based on search query and status filter
    const filteredReports = priorityQueue.filter((report) => {
        const matchesSearch =
            searchQuery.trim() === '' ||
            report.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.tracking_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.location_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.regency_city?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'ALL' || report.report_status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sample data for monthly chart
    const monthlyData = [
        { month: 'Jan', count: 18, resolved: 14, height: '36%' },
        { month: 'Feb', count: 24, resolved: 20, height: '48%' },
        { month: 'Mar', count: 42, resolved: 36, height: '78%' },
        { month: 'Apr', count: 28, resolved: 26, height: '54%' },
        { month: 'Mei', count: 32, resolved: 29, height: '62%' },
        { month: 'Jun', count: 35, resolved: 31, height: '68%' },
        { month: 'Jul', count: 38, resolved: 32, height: '74%' },
    ];

    // Agencies display data (using props or realistic defaults)
    const displayAgencies = [
        {
            code: 'BPBD-KR',
            name: 'BPBD Kab. Kubu Raya',
            jurisdiction: 'Kabupaten Kubu Raya',
            tasks: agencyStats[0]?.total_assignments_count || 5,
            status: 'Aktif',
            badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
        },
        {
            code: 'BPBD-KB',
            name: 'BPBD Prov. Kalbar',
            jurisdiction: 'Provinsi Kalimantan Barat',
            tasks: agencyStats[1]?.total_assignments_count || 3,
            status: 'Aktif',
            badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
        },
        {
            code: 'MANGGALA',
            name: 'Manggala Agni Daops Pontianak',
            jurisdiction: 'Lintas Wilayah Kalbar',
            tasks: agencyStats[2]?.total_assignments_count || 4,
            status: 'Siaga',
            badgeColor: 'text-amber-700 bg-amber-50 border-amber-200/80',
        },
        {
            code: 'DAMKAR',
            name: 'Dinas Damkar Pontianak',
            jurisdiction: 'Kota Pontianak',
            tasks: agencyStats[3]?.total_assignments_count || 2,
            status: 'Aktif',
            badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
        },
    ];

    return (
        <>
            <Head title="Pusat Kendali Overview - JAGAIN" />

            <div className="min-h-screen bg-[#f4f5f7] dark:bg-[#0c0f0d] p-4 sm:p-6 lg:p-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-7">
                    {/* Flash Success & Error Notification */}
                    {flash?.success && (
                        <div
                            role="status"
                            className="flex items-center gap-3 rounded-2xl border border-leaf-green/30 bg-soft-green/80 p-4 text-sm text-forest-green shadow-xs transition-all"
                        >
                            <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                            <span className="font-semibold">{flash.success}</span>
                        </div>
                    )}
                    {flash?.error && (
                        <div
                            role="alert"
                            className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-xs transition-all"
                        >
                            <AlertCircle className="size-5 shrink-0 text-red-600" />
                            <span className="font-semibold">{flash.error}</span>
                        </div>
                    )}

                    {/* Actionable Banner (Pending Reviews) */}
                    {pendingReviewTotal > 0 && (
                        <Banner
                            inset
                            className="rounded-2xl border-emerald-200/70 bg-white dark:bg-neutral-900 p-4 sm:p-5 text-neutral-800 dark:text-neutral-200 shadow-xs transition-all hover:border-emerald-300"
                        >
                            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-start gap-3.5">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 shrink-0">
                                        <Clock className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <BannerTitle className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                                            Tindakan Diperlukan: {pendingReviewTotal} Laporan Menunggu Telaah
                                        </BannerTitle>
                                        <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                                            {statusCounts.submitted} laporan baru & {statusCounts.under_review} dalam telaah siap untuk validasi GPS dan disposisi OPD.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                                    <BannerAction asChild>
                                        <Button
                                            asChild
                                            size="sm"
                                            className="h-9 px-4 rounded-xl bg-[#0c4e33] hover:bg-[#073623] text-xs font-bold text-white shadow-xs"
                                        >
                                            <Link
                                                href={reportsIndex({ query: { status: 'SUBMITTED' } }).url}
                                                className="flex items-center gap-1.5"
                                            >
                                                <span>Buka Antrean</span>
                                                <ArrowRight className="size-3.5" />
                                            </Link>
                                        </Button>
                                    </BannerAction>
                                    <BannerClose />
                                </div>
                            </div>
                        </Banner>
                    )}

                    {/* =========================================================================
                        1. OVERVIEW TOP HEADER (Matching Reference Screenshot)
                        ========================================================================= */}
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                                Overview
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                Here is the summary of overall data penanganan karhutla real-time
                            </p>
                        </div>

                        {/* Top Controls: Period Dropdown & Reset Data */}
                        <div className="flex items-center gap-2.5 self-start sm:self-auto">
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPeriod((p) =>
                                            p === 'bulan' ? 'minggu' : p === 'minggu' ? 'tahun' : 'bulan'
                                        )
                                    }
                                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200/90 bg-white dark:bg-neutral-900 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 shadow-2xs hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                                >
                                    <Calendar className="size-3.5 text-neutral-400" />
                                    <span>
                                        {period === 'bulan'
                                            ? 'This Month'
                                            : period === 'minggu'
                                            ? 'This Week'
                                            : 'This Year'}
                                    </span>
                                    <ChevronDown className="size-3.5 text-neutral-400" />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200/90 bg-white dark:bg-neutral-900 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 shadow-2xs hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                            >
                                <RotateCcw className="size-3.5 text-neutral-400" />
                                <span>Reset Data</span>
                            </button>
                        </div>
                    </header>

                    {/* =========================================================================
                        2. TOP STAT CARDS (3 Cards Row: 1 Dark Green Hero + 2 White Cards)
                        ========================================================================= */}
                    <section aria-label="Statistik Utama">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* Card 1: Total Laporan (Deep Emerald Forest Gradient Hero Card) */}
                            <div className="group rounded-2xl bg-gradient-to-br from-[#0c4e33] via-[#094029] to-[#052819] text-white p-6 shadow-md relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                                {/* Ambient Background Glow */}
                                <div className="absolute -right-8 -bottom-8 size-32 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-emerald-300 backdrop-blur-xs border border-white/10">
                                            <Flame className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white">Total Laporan Karhutla</h3>
                                            <p className="text-[11px] text-emerald-200/80">Monitoring Masuk & Disposisi</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        title="Opsi"
                                        className="text-white/60 hover:text-white transition-colors p-1"
                                    >
                                        <MoreHorizontal className="size-4.5" />
                                    </button>
                                </div>

                                <div className="my-5 flex items-baseline gap-2.5 relative z-10">
                                    <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white tabular-nums">
                                        {statusCounts.total}
                                    </span>
                                    <span className="text-sm font-semibold text-emerald-100">laporan</span>
                                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-xs ml-1">
                                        +12.5% <ArrowUpRight className="size-3" />
                                    </span>
                                </div>

                                <Link
                                    href={reportsIndex().url}
                                    className="flex items-center justify-between text-xs font-semibold text-emerald-100/90 hover:text-white pt-3 border-t border-white/15 transition-colors group-hover:translate-x-0.5 duration-150 relative z-10"
                                >
                                    <span>Lihat seluruh rincian</span>
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>

                            {/* Card 2: Perlu Review Awal (Clean White Card) */}
                            <div className="group rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 dark:bg-amber-950/40 dark:border-amber-800/40 dark:text-amber-400">
                                            <Clock className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                                                Perlu Review Awal
                                            </h3>
                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                                Antrean Verifikasi Tim
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        title="Opsi"
                                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1"
                                    >
                                        <MoreHorizontal className="size-4.5" />
                                    </button>
                                </div>

                                <div className="my-5 flex items-baseline gap-2.5">
                                    <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white tabular-nums">
                                        {pendingReviewTotal}
                                    </span>
                                    <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                                        laporan
                                    </span>
                                    {statusCounts.submitted > 0 && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-950/50 dark:border-emerald-800/50 dark:text-emerald-300 ml-1">
                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            {statusCounts.submitted} baru
                                        </span>
                                    )}
                                </div>

                                <Link
                                    href={reportsIndex({ query: { status: 'SUBMITTED' } }).url}
                                    className="flex items-center justify-between text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white pt-3 border-t border-neutral-100 dark:border-neutral-800 transition-colors group-hover:translate-x-0.5 duration-150"
                                >
                                    <span>Buka antrean telaah</span>
                                    <ArrowRight className="size-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                                </Link>
                            </div>

                            {/* Card 3: Terverifikasi / Di OPD (Clean White Card) */}
                            <div className="group rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 dark:bg-emerald-950/40 dark:border-emerald-800/40 dark:text-emerald-400">
                                            <Send className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                                                Terverifikasi & OPD
                                            </h3>
                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                                Penanganan Unit Lapangan
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        title="Opsi"
                                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1"
                                    >
                                        <MoreHorizontal className="size-4.5" />
                                    </button>
                                </div>

                                <div className="my-5 flex items-baseline gap-2.5">
                                    <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white tabular-nums">
                                        {statusCounts.verified + statusCounts.dispatched}
                                    </span>
                                    <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                                        laporan
                                    </span>
                                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-950/50 dark:border-emerald-800/50 dark:text-emerald-300 ml-1">
                                        +4.7% <ArrowUpRight className="size-3" />
                                    </span>
                                </div>

                                <Link
                                    href={agenciesIndex().url}
                                    className="flex items-center justify-between text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white pt-3 border-t border-neutral-100 dark:border-neutral-800 transition-colors group-hover:translate-x-0.5 duration-150"
                                >
                                    <span>Pantau unit penanganan</span>
                                    <ArrowRight className="size-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        3. MIDDLE SECTION (2 Columns: Left "My Wallet" & Right "Cash Flow" Layout)
                        ========================================================================= */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        {/* LEFT COLUMN: Disposisi Instansi & OPD ("My Wallet" Layout - 5 Cols) */}
                        <div className="lg:col-span-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3">
                                    <div>
                                        <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                                            Disposisi Instansi & OPD
                                        </h2>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                            Distribusi tugas unit lapangan aktif
                                        </p>
                                    </div>
                                    <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="h-8 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                    >
                                        <Link href={agenciesIndex().url} className="flex items-center gap-1">
                                            <Plus className="size-3.5" />
                                            <span>Kelola OPD</span>
                                        </Link>
                                    </Button>
                                </div>

                                {/* 2x2 Mini Cards Grid */}
                                <div className="grid grid-cols-2 gap-3.5 mt-3">
                                    {displayAgencies.map((agency) => (
                                        <div
                                            key={agency.code}
                                            className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-3.5 bg-neutral-50/60 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 hover:border-neutral-300 transition-all flex flex-col justify-between group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="size-2 rounded-full bg-emerald-500" />
                                                    <span className="text-[11px] font-mono font-bold text-neutral-800 dark:text-neutral-200">
                                                        {agency.code}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    title="Menu"
                                                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                                >
                                                    <MoreHorizontal className="size-3.5" />
                                                </button>
                                            </div>

                                            <div className="my-2.5">
                                                <div className="text-base font-extrabold text-neutral-900 dark:text-white tabular-nums">
                                                    {agency.tasks}{' '}
                                                    <span className="text-xs font-semibold text-neutral-500">
                                                        Tugas
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                                                    {agency.jurisdiction}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-1 text-[11px]">
                                                <span className={`inline-block font-bold ${agency.badgeColor} px-2 py-0.5 rounded-md text-[10px]`}>
                                                    {agency.status}
                                                </span>
                                                <Link
                                                    href={agenciesIndex().url}
                                                    className="text-neutral-400 group-hover:text-emerald-700 transition-colors"
                                                >
                                                    <ArrowRight className="size-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Total Bar at Bottom of Left Column */}
                            <div className="mt-4 pt-3.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                <span>Total Personel Siaga Lapangan:</span>
                                <strong className="font-bold text-neutral-900 dark:text-white">
                                    34 Regu Tanggap
                                </strong>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Tren Penanganan Karhutla ("Cash Flow" Layout - 7 Cols) */}
                        <div className="lg:col-span-7 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs flex flex-col justify-between">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
                                    <div>
                                        <h2 className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                                            Tren Penanganan Karhutla
                                        </h2>
                                        <div className="flex items-baseline gap-2.5 mt-0.5">
                                            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight tabular-nums">
                                                {statusCounts.total}{' '}
                                                <span className="text-base font-bold text-neutral-500">
                                                    Kasus
                                                </span>
                                            </span>
                                            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                                                ({statusCounts.resolved_verified} Selesai Ditangani)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Monthly / Yearly Switch Toggle */}
                                    <div className="flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 p-1 border border-neutral-200 dark:border-neutral-700 self-start sm:self-auto">
                                        <button
                                            type="button"
                                            onClick={() => setChartMode('monthly')}
                                            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                                                chartMode === 'monthly'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                                            }`}
                                        >
                                            Bulanan
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setChartMode('yearly')}
                                            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                                                chartMode === 'yearly'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                                            }`}
                                        >
                                            Tahunan
                                        </button>
                                    </div>
                                </div>

                                {/* Custom Bar Chart with Floating Dark Tooltip */}
                                <div className="relative mt-6 pt-12 pb-2 h-56">
                                    {/* Horizontal Dashed Gridlines */}
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-neutral-400 pb-6">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">50</span>
                                            <div className="flex-1 border-b border-dashed border-neutral-200 dark:border-neutral-800" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">30</span>
                                            <div className="flex-1 border-b border-dashed border-neutral-200 dark:border-neutral-800" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">15</span>
                                            <div className="flex-1 border-b border-dashed border-neutral-200 dark:border-neutral-800" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">0</span>
                                            <div className="flex-1 border-b border-neutral-200 dark:border-neutral-800" />
                                        </div>
                                    </div>

                                    {/* Vertical Bars Row */}
                                    <div className="relative h-full flex items-end justify-between pl-8 pr-2 pb-6">
                                        {monthlyData.map((item, index) => {
                                            const isSelected = activeBar === index;
                                            return (
                                                <div
                                                    key={item.month}
                                                    className="flex flex-col items-center flex-1 h-full justify-end relative group cursor-pointer"
                                                    onClick={() => setActiveBar(index)}
                                                >
                                                    {/* Floating Tooltip Card over Selected Bar (matching reference) */}
                                                    {isSelected && (
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-xl bg-[#18181b] text-white p-2.5 shadow-xl border border-neutral-700/80 text-[11px] pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                                                            <div className="text-[10px] font-semibold text-neutral-400 pb-1 border-b border-neutral-800">
                                                                {item.month} 2026
                                                            </div>
                                                            <div className="mt-1 flex items-center justify-between gap-4">
                                                                <span className="text-neutral-300">Laporan Masuk:</span>
                                                                <strong className="text-white font-mono">{item.count}</strong>
                                                            </div>
                                                            <div className="flex items-center justify-between gap-4">
                                                                <span className="text-emerald-400">Tuntas Selesai:</span>
                                                                <strong className="text-emerald-300 font-mono">{item.resolved}</strong>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Bar Shape */}
                                                    <div className="w-7 sm:w-9 relative flex flex-col justify-end items-center h-full">
                                                        <div
                                                            style={{ height: item.height }}
                                                            className={`w-full rounded-t-xl transition-all duration-300 ${
                                                                isSelected
                                                                    ? 'bg-gradient-to-t from-[#0c4e33] via-[#10b981] to-[#10e57a] shadow-sm ring-2 ring-emerald-400/40'
                                                                    : 'bg-[#dce6e0] dark:bg-neutral-800 hover:bg-[#c8d4cd]'
                                                            }`}
                                                        >
                                                            {/* Glowing Top Dot on Active Bar */}
                                                            {isSelected && (
                                                                <div className="mx-auto mt-1 size-2 rounded-full bg-white shadow-xs" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Month Label */}
                                                    <span className={`text-xs mt-2 font-medium ${
                                                        isSelected
                                                            ? 'font-bold text-neutral-900 dark:text-white'
                                                            : 'text-neutral-400'
                                                    }`}>
                                                        {item.month}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                <span>Puncak kerawanan musim kemarau di Kalbar: Juli - September</span>
                                <Link
                                    href={reportsIndex().url}
                                    className="font-bold text-[#0c4e33] dark:text-[#10e57a] hover:underline"
                                >
                                    Buka Analisis Lengkap →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        4. BOTTOM SECTION: Recent Activities Table ("Recent Activities" Layout)
                        ========================================================================= */}
                    <section
                        aria-labelledby="recent-activities-heading"
                        className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs"
                    >
                        {/* Table Header Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
                            <div>
                                <h2
                                    id="recent-activities-heading"
                                    className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white"
                                >
                                    Recent Activities
                                </h2>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    Antrean verifikasi dan laporan masyarakat terbaru yang masuk sistem
                                </p>
                            </div>

                            <div className="flex items-center gap-2.5">
                                {/* Search Input */}
                                <div className="relative">
                                    <Search className="size-3.5 absolute left-3 top-2.5 text-neutral-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Cari kode atau lokasi..."
                                        className="h-8.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 pl-8 pr-3 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all w-48 sm:w-60"
                                    />
                                </div>

                                {/* Filter Button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setStatusFilter((cur) =>
                                            cur === 'ALL'
                                                ? 'SUBMITTED'
                                                : cur === 'SUBMITTED'
                                                ? 'UNDER_REVIEW'
                                                : cur === 'UNDER_REVIEW'
                                                ? 'VERIFIED'
                                                : 'ALL'
                                        )
                                    }
                                    className={`inline-flex items-center gap-1.5 h-8.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                                        statusFilter !== 'ALL'
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50'
                                    }`}
                                >
                                    <Filter className="size-3.5" />
                                    <span>
                                        {statusFilter === 'ALL' ? 'Filter' : statusFilter}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Recent Reports Table */}
                        {filteredReports.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 mb-3">
                                    <CheckCircle2 className="size-6" />
                                </div>
                                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                                    Tidak Ada Laporan Ditemukan
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                                    {searchQuery
                                        ? 'Coba ubah kata kunci pencarian atau setel ulang filter.'
                                        : 'Seluruh laporan yang masuk saat ini telah diproses tuntas.'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 text-[11px] font-semibold">
                                            <th className="py-3 px-2 w-8">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 size-3.5"
                                                />
                                            </th>
                                            <th className="py-3 px-3">Laporan</th>
                                            <th className="py-3 px-3">Order ID / Kode</th>
                                            <th className="py-3 px-3">Tanggal & Waktu</th>
                                            <th className="py-3 px-3">Lokasi / Wilayah</th>
                                            <th className="py-3 px-3">Status</th>
                                            <th className="py-3 px-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                        {filteredReports.map((report) => {
                                            const code =
                                                report.tracking_code ||
                                                report.report_number ||
                                                `JGN-2026-${String(report.id).padStart(3, '0')}`;
                                            return (
                                                <tr
                                                    key={report.id}
                                                    className="group hover:bg-neutral-50/70 dark:hover:bg-neutral-800/50 transition-colors"
                                                >
                                                    <td className="py-3.5 px-2">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 size-3.5"
                                                        />
                                                    </td>
                                                    <td className="py-3.5 px-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-9 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/40">
                                                                <Flame className="size-4.5" />
                                                            </div>
                                                            <div className="min-w-0 max-w-xs">
                                                                <Link
                                                                    href={reportShow(report.id).url}
                                                                    className="font-bold text-neutral-900 dark:text-white truncate block hover:text-[#0c4e33] transition-colors"
                                                                >
                                                                    {report.title}
                                                                </Link>
                                                                <span className="text-[11px] text-neutral-400 block truncate">
                                                                    {report.category?.name || 'Kebakaran Lahan'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 px-3">
                                                        <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-[11px]">
                                                            {code}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 px-3 text-neutral-500 whitespace-nowrap">
                                                        {formatDate(report.created_at)}
                                                    </td>
                                                    <td className="py-3.5 px-3 text-neutral-700 dark:text-neutral-300">
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="size-3 text-emerald-700 shrink-0" />
                                                            <span className="truncate max-w-[160px]">
                                                                {report.location_description || report.regency_city || 'Kalbar'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 px-3">
                                                        <StatusBadge
                                                            status={report.report_status as any}
                                                            variant="neutral"
                                                        />
                                                    </td>
                                                    <td className="py-3.5 px-3 text-right">
                                                        <Button
                                                            asChild
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 px-2.5 rounded-lg text-xs font-semibold text-[#0c4e33] dark:text-[#10e57a] hover:bg-emerald-50 dark:hover:bg-neutral-800"
                                                        >
                                                            <Link href={reportShow(report.id).url}>
                                                                Tinjau →
                                                            </Link>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Table Footer */}
                        <div className="pt-4 mt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                            <span>
                                Menampilkan {filteredReports.length} dari {priorityQueue.length} laporan antrean
                            </span>
                            <Link
                                href={reportsIndex().url}
                                className="font-bold text-[#0c4e33] dark:text-[#10e57a] hover:underline"
                            >
                                Buka Seluruh Arsip Laporan ({statusCounts.total}) →
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
