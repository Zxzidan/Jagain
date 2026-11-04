import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Clock,
    Download,
    Eye,
    FileText,
    Flame,
    History,
    Info,
    MapPin,
    Plus,
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
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
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
    mapReports?: MapReport[];
    mapObservations?: MapObservation[];
};

export default function AdminDashboard({
    statusCounts,
    priorityQueue = [],
    recentAuditLogs = [],
    activeAssignments = [],
    agencyStats = [],
    mapReports = [],
    mapObservations = [],
}: DashboardProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const [period, setPeriod] = useState<'bulan' | 'minggu' | 'tahun'>('bulan');
    const [chartMode, setChartMode] = useState<'monthly' | 'yearly'>('monthly');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeBar, setActiveBar] = useState<number>(6); // Default July (index 6)

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

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

    // Filter reports based on search query
    const filteredReports = priorityQueue.filter((report) => {
        return (
            searchQuery.trim() === '' ||
            report.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.tracking_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.location_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.regency_city?.toLowerCase().includes(searchQuery.toLowerCase())
        );
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

    // Dummy reports categorized by severity: BERAT (Red), SEDANG (Orange), RINGAN (Yellow)
    const defaultMapReports: MapReport[] = [
        // --- BERAT (Kritis / Gambut Dalam / Ancaman Pemukiman) ---
        {
            id: 101,
            tracking_code: 'JGN-202611-BRT01',
            title: 'Kebakaran Gambut Dalam Parit H. Ali - Asap Pekat Kritis',
            category: { name: 'Lahan Gambut' },
            latitude: -0.155823,
            longitude: 109.387234,
            province: 'Kalimantan Barat',
            regency_city: 'Kabupaten Kubu Raya',
            location_description: 'Parit H. Ali, Dusun Mekar Sari, Desa Rasau Jaya Tiga',
            report_status: 'DISPATCHED',
            status_label: 'Penanganan Lapangan',
            fire_condition: 'OBSERVED_ACTIVE',
            fire_condition_label: 'Api Aktif Gambut',
            severity: 'BERAT',
            severity_label: 'Berat',
        },
        {
            id: 102,
            tracking_code: 'JGN-202611-BRT02',
            title: 'Titik Api Merambat ke Zona Penyangga Hutan Lindung Sebangau',
            category: { name: 'Hutan Lindung' },
            latitude: -2.254100,
            longitude: 113.882000,
            province: 'Kalimantan Tengah',
            regency_city: 'Kota Palangka Raya',
            location_description: 'Kanal Primer Sebangau Km 16, Hutan Lindung',
            report_status: 'VERIFIED',
            status_label: 'Terverifikasi',
            fire_condition: 'OBSERVED_ACTIVE',
            fire_condition_label: 'Api Meluas Cepat',
            severity: 'BERAT',
            severity_label: 'Berat',
        },
        {
            id: 103,
            tracking_code: 'JGN-202611-BRT03',
            title: 'Kebakaran Lahan Gambut Dekat Pemukiman Ambawang',
            category: { name: 'Lahan Gambut' },
            latitude: -0.065200,
            longitude: 109.412000,
            province: 'Kalimantan Barat',
            regency_city: 'Kabupaten Kubu Raya',
            location_description: 'Jl. Trans Kalimantan Km 12, Sungai Ambawang',
            report_status: 'VERIFIED',
            status_label: 'Terverifikasi',
            fire_condition: 'OBSERVED_ACTIVE',
            fire_condition_label: 'Ancaman Pemukiman',
            severity: 'BERAT',
            severity_label: 'Berat',
        },

        // --- SEDANG (Semak Belukar / Perkebunan) ---
        {
            id: 201,
            tracking_code: 'JGN-202611-SDG01',
            title: 'Api Semak Belukar Merambat Sepanjang Parit Jalan Poros',
            category: { name: 'Semak Belukar' },
            latitude: -0.089400,
            longitude: 109.432100,
            province: 'Kalimantan Barat',
            regency_city: 'Kabupaten Kubu Raya',
            location_description: 'Jl. Poros Rasau Jaya - Ambawang Km 8',
            report_status: 'UNDER_REVIEW',
            status_label: 'Sedang Diperiksa',
            fire_condition: 'REPORTED_ACTIVE',
            fire_condition_label: 'Api Permukaan',
            severity: 'SEDANG',
            severity_label: 'Sedang',
        },
        {
            id: 202,
            tracking_code: 'JGN-202611-SDG02',
            title: 'Kebakaran Semak Terbuka Dekat Lahan Sawit Sampit',
            category: { name: 'Perkebunan' },
            latitude: -2.535000,
            longitude: 112.955000,
            province: 'Kalimantan Tengah',
            regency_city: 'Kabupaten Kotawaringin Timur',
            location_description: 'Desa Bagendang Hilir, Sampit',
            report_status: 'SUBMITTED',
            status_label: 'Terkirim',
            fire_condition: 'REPORTED_ACTIVE',
            fire_condition_label: 'Asap Kelabu Tebal',
            severity: 'SEDANG',
            severity_label: 'Sedang',
        },
        {
            id: 203,
            tracking_code: 'JGN-202611-SDG03',
            title: 'Titik Panas Merambat di Semak Perkebunan Karet',
            category: { name: 'Perkebunan' },
            latitude: -3.012500,
            longitude: 114.765400,
            province: 'Kalimantan Selatan',
            regency_city: 'Kabupaten Barito Kuala',
            location_description: 'Kecamatan Marabahan, Barito Kuala',
            report_status: 'SUBMITTED',
            status_label: 'Terkirim',
            fire_condition: 'REPORTED_ACTIVE',
            fire_condition_label: 'Vegetasi Kering',
            severity: 'SEDANG',
            severity_label: 'Sedang',
        },

        // --- RINGAN (Asap Tipis / Terkendali / Sisa Bara Padam) ---
        {
            id: 301,
            tracking_code: 'JGN-202611-RGN01',
            title: 'Asap Tipis Terkendali di Lahan Terbuka Siantan',
            category: { name: 'Semak Belukar' },
            latitude: -0.012000,
            longitude: 109.345000,
            province: 'Kalimantan Barat',
            regency_city: 'Kota Pontianak',
            location_description: 'Siantan Tengah, Pontianak Utara',
            report_status: 'RESOLVED_VERIFIED',
            status_label: 'Padam Terverifikasi',
            fire_condition: 'OBSERVED_EXTINGUISHED',
            fire_condition_label: 'Sisa Asap Terkendali',
            severity: 'RINGAN',
            severity_label: 'Ringan',
        },
        {
            id: 302,
            tracking_code: 'JGN-202611-RGN02',
            title: 'Bara Terisolasi Sekat Parit di Sungai Kakap',
            category: { name: 'Lahan Gambut' },
            latitude: -0.055000,
            longitude: 109.185000,
            province: 'Kalimantan Barat',
            regency_city: 'Kabupaten Kubu Raya',
            location_description: 'Desa Sungai Kakap, parit keliling',
            report_status: 'VERIFIED',
            status_label: 'Terverifikasi',
            fire_condition: 'OBSERVED_CONTAINED',
            fire_condition_label: 'Tersekat Parit',
            severity: 'RINGAN',
            severity_label: 'Ringan',
        },
        {
            id: 303,
            tracking_code: 'JGN-202611-RGN03',
            title: 'Titik Panas Rendah Vegetasi Kering Banjarbaru',
            category: { name: 'Semak Belukar' },
            latitude: -3.445000,
            longitude: 114.835000,
            province: 'Kalimantan Selatan',
            regency_city: 'Kota Banjarbaru',
            location_description: 'Kawasan Cempaka, Banjarbaru',
            report_status: 'RESOLVED_VERIFIED',
            status_label: 'Selesai Terkendali',
            fire_condition: 'OBSERVED_EXTINGUISHED',
            fire_condition_label: 'Suhu Panas Normal',
            severity: 'RINGAN',
            severity_label: 'Ringan',
        },
    ];

    const effectiveMapReports = mapReports.length > 0 ? mapReports : defaultMapReports;

    return (
        <>
            <Head title="Dashboard - JAGAIN" />

            <div className="min-h-screen bg-[#f8faf9] py-8 sm:py-10 px-5 sm:px-8 lg:px-10">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-9">
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
                            className="rounded-2xl border border-emerald-200/80 bg-white p-4 sm:p-5 text-neutral-800 shadow-xs transition-all hover:border-emerald-300"
                        >
                            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-start gap-3.5">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 shrink-0">
                                        <Clock className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <BannerTitle className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                                            Tindakan Diperlukan: {pendingReviewTotal} Laporan Menunggu Telaah
                                        </BannerTitle>
                                        <p className="text-xs sm:text-[13px] text-neutral-500">
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
                                            >
                                                Buka Antrean
                                            </Link>
                                        </Button>
                                    </BannerAction>
                                    <BannerClose />
                                </div>
                            </div>
                        </Banner>
                    )}

                    {/* =========================================================================
                        1. DASHBOARD TOP HEADER
                        ========================================================================= */}
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                                Dashboard
                            </h1>
                        </div>

                        {/* Top Controls: Period Selector */}
                        <div className="flex items-center gap-2.5 self-start sm:self-auto">
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPeriod((p) =>
                                            p === 'bulan' ? 'minggu' : p === 'minggu' ? 'tahun' : 'bulan'
                                        )
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200/90 bg-white text-xs font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-50 transition-colors cursor-pointer"
                                >
                                    <Calendar className="size-3.5 text-neutral-400" />
                                    <span>
                                        {period === 'bulan'
                                            ? 'Bulan Ini'
                                            : period === 'minggu'
                                            ? 'Minggu Ini'
                                            : 'Tahun Ini'}
                                    </span>
                                    <ChevronDown className="size-3.5 text-neutral-400" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* =========================================================================
                        2. TOP STAT CARDS (3 Cards Row: 1 Emerald Forest Hero + 2 Clean White Cards)
                        ========================================================================= */}
                    <section aria-label="Statistik Utama">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
                            {/* Card 1: Total Laporan (Deep Emerald Hero Card) */}
                            <div className="group rounded-2xl bg-gradient-to-br from-[#0c4e33] via-[#094029] to-[#052819] text-white p-7 shadow-sm hover:shadow-md relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5">
                                {/* Ambient Background Glow */}
                                <div className="absolute -right-8 -bottom-8 size-32 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-emerald-300 backdrop-blur-xs border border-white/10">
                                            <Flame className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white">Total Laporan Karhutla</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-6 flex items-baseline gap-2.5 relative z-10">
                                    <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white tabular-nums">
                                        {statusCounts.total}
                                    </span>
                                    <span className="text-sm font-semibold text-emerald-100">laporan</span>
                                </div>

                                <Link
                                    href={reportsIndex().url}
                                    className="text-xs font-semibold text-emerald-100/90 hover:text-white pt-3.5 border-t border-white/15 transition-colors relative z-10 block"
                                >
                                    Lihat seluruh rincian
                                </Link>
                            </div>

                            {/* Card 2: Perlu Review Awal (Clean White Card) */}
                            <div className="group rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60">
                                            <Clock className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-900">
                                                Perlu Review Awal
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-6 flex items-baseline gap-2.5">
                                    <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 tabular-nums">
                                        {pendingReviewTotal}
                                    </span>
                                    <span className="text-sm font-semibold text-neutral-500">
                                        laporan
                                    </span>
                                    {statusCounts.submitted > 0 && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 ml-1">
                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            {statusCounts.submitted} baru
                                        </span>
                                    )}
                                </div>

                                <Link
                                    href={reportsIndex({ query: { status: 'SUBMITTED' } }).url}
                                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 pt-3.5 border-t border-neutral-100 transition-colors block"
                                >
                                    Buka antrean telaah
                                </Link>
                            </div>

                            {/* Card 3: Terverifikasi & OPD (Clean White Card) */}
                            <div className="group rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                                            <Send className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-900">
                                                Terverifikasi & OPD
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-6 flex items-baseline gap-2.5">
                                    <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 tabular-nums">
                                        {statusCounts.verified + statusCounts.dispatched}
                                    </span>
                                    <span className="text-sm font-semibold text-neutral-500">
                                        laporan
                                    </span>
                                </div>

                                <Link
                                    href={agenciesIndex().url}
                                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 pt-3.5 border-t border-neutral-100 transition-colors block"
                                >
                                    Pantau unit penanganan
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        3. MIDDLE SECTION (2 Columns: Peta Sebaran Karhutla & Tren Penanganan Karhutla)
                        ========================================================================= */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
                        {/* LEFT COLUMN: Peta Wilayah Kebakaran Hutan (6 Cols) */}
                        <div className="lg:col-span-6 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex size-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
                                        </span>
                                        <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                                            Peta Wilayah Kebakaran Hutan
                                        </h2>
                                    </div>
                                    <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="h-8 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 shadow-2xs"
                                    >
                                        <Link href="/admin/map" className="flex items-center gap-1.5">
                                            <MapPin className="size-3.5 text-emerald-600" />
                                            <span>Layar Penuh</span>
                                        </Link>
                                    </Button>
                                </div>

                                {/* Leaflet Interactive Map View */}
                                <div className="mt-3 sm:mt-4 rounded-xl overflow-hidden border border-neutral-200/80 shadow-2xs relative">
                                    <KarhutlaMap
                                        reports={effectiveMapReports}
                                        observations={mapObservations}
                                        reportUrlPrefix="/admin/reports"
                                        height="275px"
                                        showLegend={false}
                                        showSimulatedNotice={false}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Clean Bottom Link */}
                            <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                                <span className="flex items-center gap-1.5">
                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                    <span>Cakupan Kalimantan • Titik Sebaran Aktif</span>
                                </span>
                                <Link
                                    href="/admin/map"
                                    className="font-bold text-[#0c4e33] hover:underline"
                                >
                                    Buka Peta Lengkap
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Tren Penanganan Karhutla (6 Cols) */}
                        <div className="lg:col-span-6 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
                                    <div>
                                        <h2 className="text-xs sm:text-sm font-semibold text-neutral-500">
                                            Tren Penanganan Karhutla
                                        </h2>
                                        <div className="flex items-baseline gap-2.5 mt-0.5">
                                            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight tabular-nums">
                                                {statusCounts.total}{' '}
                                                <span className="text-base font-bold text-neutral-500">
                                                    Kasus
                                                </span>
                                            </span>
                                            <span className="text-xs text-emerald-700 font-semibold">
                                                ({statusCounts.resolved_verified} Selesai)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Monthly / Yearly Switch Toggle */}
                                    <div className="flex items-center rounded-full bg-neutral-100 p-1 border border-neutral-200 self-start sm:self-auto">
                                        <button
                                            type="button"
                                            onClick={() => setChartMode('monthly')}
                                            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                                                chartMode === 'monthly'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'text-neutral-500 hover:text-neutral-900'
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
                                                    : 'text-neutral-500 hover:text-neutral-900'
                                            }`}
                                        >
                                            Tahunan
                                        </button>
                                    </div>
                                </div>

                                {/* Custom Bar Chart with Floating Tooltip */}
                                <div className="relative mt-6 pt-12 pb-2 h-56">
                                    {/* Horizontal Dashed Gridlines */}
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-neutral-400 pb-6">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">50</span>
                                            <div className="flex-1 border-b border-dashed border-neutral-200" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">30</span>
                                            <div className="flex-1 border-b border-dashed border-neutral-200" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">15</span>
                                            <div className="flex-1 border-b border-dashed border-neutral-200" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 text-right">0</span>
                                            <div className="flex-1 border-b border-neutral-200" />
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
                                                    {/* Floating Tooltip Card over Selected Bar */}
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
                                                                    : 'bg-[#dce6e0] hover:bg-[#c8d4cd]'
                                                            }`}
                                                        >
                                                            {isSelected && (
                                                                <div className="mx-auto mt-1 size-2 rounded-full bg-white shadow-xs" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Month Label */}
                                                    <span className={`text-xs mt-2 font-medium ${
                                                        isSelected
                                                            ? 'font-bold text-neutral-900'
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

                            <div className="pt-3 flex items-center justify-between text-xs text-neutral-500">
                                <span>Periode observasi aktif tahun 2026</span>
                                <Link
                                    href={reportsIndex().url}
                                    className="font-bold text-[#0c4e33] hover:underline"
                                >
                                    Seluruh Laporan
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        4. BOTTOM SECTION: Recent Activities Table
                        ========================================================================= */}
                    <section
                        aria-labelledby="recent-activities-heading"
                        className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-xs"
                    >
                        {/* Table Header Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
                            <div>
                                <h2
                                    id="recent-activities-heading"
                                    className="text-base sm:text-lg font-bold text-neutral-900"
                                >
                                    Laporan Terbaru
                                </h2>
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
                                        className="h-9 rounded-xl border border-neutral-200 bg-neutral-50 pl-8 pr-3 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all w-52 sm:w-64"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recent Reports Table */}
                        {filteredReports.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 mb-3">
                                    <CheckCircle2 className="size-6" />
                                </div>
                                <h3 className="text-sm font-bold text-neutral-900">
                                    Tidak Ada Laporan Ditemukan
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                                    {searchQuery
                                        ? 'Coba ubah kata kunci pencarian.'
                                        : 'Seluruh laporan yang masuk saat ini telah diproses tuntas.'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto -mx-2 sm:mx-0">
                                <table className="w-full min-w-[960px] text-center text-xs">
                                    <thead>
                                        <tr className="border-b border-neutral-100 text-neutral-500 text-[11px] font-semibold">
                                            <th className="py-3.5 px-4 whitespace-nowrap min-w-[260px] text-center">Laporan</th>
                                            <th className="py-3.5 px-4 whitespace-nowrap min-w-[150px] text-center">Kode Laporan</th>
                                            <th className="py-3.5 px-4 whitespace-nowrap min-w-[150px] text-center">Tanggal & Waktu</th>
                                            <th className="py-3.5 px-4 whitespace-nowrap min-w-[220px] text-center">Lokasi / Wilayah</th>
                                            <th className="py-3.5 px-4 whitespace-nowrap min-w-[140px] text-center">Status</th>
                                            <th className="py-3.5 px-4 whitespace-nowrap min-w-[100px] text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {filteredReports.map((report) => {
                                            const code =
                                                report.tracking_code ||
                                                report.report_number ||
                                                `JGN-2026-${String(report.id).padStart(3, '0')}`;
                                            return (
                                                <tr
                                                    key={report.id}
                                                    className="group hover:bg-[#fafbfa] transition-colors"
                                                >
                                                    <td className="py-4 px-4 min-w-[260px] text-center">
                                                        <div className="inline-flex items-center gap-3 text-left">
                                                            <div className="size-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60">
                                                                <Flame className="size-4.5" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <Link
                                                                    href={reportShow(report.id).url}
                                                                    className="font-bold text-neutral-900 hover:text-[#0c4e33] transition-colors leading-snug block"
                                                                >
                                                                    {report.title.replace(/^\[(BERAT|SEDANG|RINGAN)\]\s*/i, '')}
                                                                </Link>
                                                                <span className="text-[11px] text-neutral-400 font-medium mt-0.5 block">
                                                                    {report.category?.name || 'Kebakaran Lahan'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 whitespace-nowrap text-center">
                                                        <span className="font-mono font-bold text-neutral-800 bg-neutral-100 border border-neutral-200/70 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap inline-block tracking-tight">
                                                            {code}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-neutral-500 whitespace-nowrap text-center">
                                                        {formatDate(report.created_at)}
                                                    </td>
                                                    <td className="py-4 px-4 text-neutral-700 min-w-[220px] text-center">
                                                        <div className="inline-flex items-start justify-center gap-1.5 leading-snug text-left">
                                                            <MapPin className="size-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                                            <span className="text-xs">
                                                                {report.location_description || report.regency_city || 'Kalimantan Barat'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 whitespace-nowrap text-center">
                                                        <div className="flex justify-center">
                                                            <StatusBadge
                                                                status={report.report_status as any}
                                                                variant="neutral"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 whitespace-nowrap text-center">
                                                        <div className="flex justify-center">
                                                            <Button
                                                                asChild
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 px-3.5 rounded-lg text-xs font-semibold text-[#0c4e33] border-emerald-200 hover:bg-emerald-50 hover:text-[#073623] shadow-2xs"
                                                            >
                                                                <Link href={reportShow(report.id).url}>
                                                                    Tinjau
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Table Footer */}
                        <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                            <span>
                                Menampilkan {filteredReports.length} dari {priorityQueue.length} laporan antrean
                            </span>
                            <Link
                                href={reportsIndex().url}
                                className="font-bold text-[#0c4e33] hover:underline"
                            >
                                Buka Seluruh Arsip Laporan ({statusCounts.total})
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
