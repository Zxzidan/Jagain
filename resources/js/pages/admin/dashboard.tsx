import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Clock,
    Compass,
    Download,
    Droplets,
    Eye,
    FileText,
    Filter,
    Flame,
    Globe,
    History,
    Info,
    Layers,
    MapPin,
    Maximize2,
    PieChart,
    Plus,
    Search,
    Send,
    Shield,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
    TreePine,
    Trees,
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
    forestryMetrics?: {
        summary: {
            total_damaged_hectares: number;
            total_recovered_hectares: number;
            active_burning_hectares: number;
            recovery_rate_percentage: number;
            carbon_emissions_saved_tons: number;
            peat_canal_blocks_active: number;
            active_hotspots_count: number;
        };
        ecosystem_breakdown: Array<{
            name: string;
            slug: string;
            description: string;
            damaged_ha: number;
            recovered_ha: number;
            recovery_rate: number;
            carbon_risk: string;
            risk_color: string;
            incidents: number;
        }>;
        monthly_trend: Array<{
            month: string;
            damaged_ha: number;
            recovered_ha: number;
            incidents: number;
            recovery_rate: number;
        }>;
        provincial_gis: Array<{
            province: string;
            active_hotspots: number;
            damaged_ha: number;
            recovered_ha: number;
            recovery_rate: number;
            risk_status: string;
            key_zones: string;
        }>;
    };
};

export default function AdminDashboard({
    statusCounts,
    priorityQueue = [],
    recentAuditLogs = [],
    activeAssignments = [],
    agencyStats = [],
    mapReports = [],
    mapObservations = [],
    forestryMetrics,
}: DashboardProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const [period, setPeriod] = useState<'bulan' | 'minggu' | 'tahun'>('bulan');
    const [chartMode, setChartMode] = useState<'monthly' | 'yearly'>('monthly');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeBar, setActiveBar] = useState<number>(6); // Default July (index 6)

    // Forestry Geospatial & Analytics State
    const [selectedForestProvince, setSelectedForestProvince] = useState<string>('');
    const [selectedLayer, setSelectedLayer] = useState<'all' | 'gambut' | 'lindung' | 'satelit' | 'padam'>('all');
    const [forestryTab, setForestryTab] = useState<'trend' | 'ecosystem' | 'provinces'>('trend');
    const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(6);

    const defaultForestryMetrics = {
        summary: {
            total_damaged_hectares: 142.8,
            total_recovered_hectares: 89.4,
            active_burning_hectares: 53.4,
            recovery_rate_percentage: 62.6,
            carbon_emissions_saved_tons: 4950,
            peat_canal_blocks_active: 48,
            active_hotspots_count: 32,
        },
        ecosystem_breakdown: [
            {
                name: 'Lahan Gambut',
                slug: 'lahan-gambut',
                description: 'Gambut dalam kalimantan (Kubah Gambut)',
                damaged_ha: 64.5,
                recovered_ha: 41.2,
                recovery_rate: 63.9,
                carbon_risk: 'KRITIS',
                risk_color: '#ef4444',
                incidents: 14,
            },
            {
                name: 'Hutan Lindung & Konservasi',
                slug: 'hutan-lindung',
                description: 'Taman Nasional & Hutan Lindung Tangkapan Air',
                damaged_ha: 48.0,
                recovered_ha: 32.5,
                recovery_rate: 67.7,
                carbon_risk: 'TINGGI',
                risk_color: '#f97316',
                incidents: 8,
            },
            {
                name: 'Perkebunan Rakyat & Konsesi',
                slug: 'perkebunan',
                description: 'Areal kelapa sawit & karet',
                damaged_ha: 19.3,
                recovered_ha: 11.2,
                recovery_rate: 58.0,
                carbon_risk: 'SEDANG',
                risk_color: '#eab308',
                incidents: 6,
            },
            {
                name: 'Semak Belukar & Lahan Terbuka',
                slug: 'semak-belukar',
                description: 'Vegetasi sekunder rawan terbakar',
                damaged_ha: 11.0,
                recovered_ha: 4.5,
                recovery_rate: 40.9,
                carbon_risk: 'RENDAH',
                risk_color: '#10b981',
                incidents: 5,
            },
        ],
        monthly_trend: [
            { month: 'Jan', damaged_ha: 18.2, recovered_ha: 16.4, incidents: 5, recovery_rate: 90.1 },
            { month: 'Feb', damaged_ha: 24.5, recovered_ha: 21.0, incidents: 7, recovery_rate: 85.7 },
            { month: 'Mar', damaged_ha: 39.8, recovered_ha: 31.5, incidents: 12, recovery_rate: 79.1 },
            { month: 'Apr', damaged_ha: 29.4, recovered_ha: 24.2, incidents: 9, recovery_rate: 82.3 },
            { month: 'Mei', damaged_ha: 35.1, recovered_ha: 28.0, incidents: 11, recovery_rate: 79.8 },
            { month: 'Jun', damaged_ha: 48.6, recovered_ha: 36.2, incidents: 15, recovery_rate: 74.5 },
            { month: 'Jul', damaged_ha: 54.2, recovered_ha: 38.8, incidents: 18, recovery_rate: 71.6 },
        ],
        provincial_gis: [
            {
                province: 'Kalimantan Barat',
                active_hotspots: 12,
                damaged_ha: 56.4,
                recovered_ha: 36.8,
                recovery_rate: 65.2,
                risk_status: 'PRIORITAS TINGGI',
                key_zones: 'Kubu Raya & Ketapang (Kawasan Gambut Rasau)',
            },
            {
                province: 'Kalimantan Tengah',
                active_hotspots: 15,
                damaged_ha: 49.8,
                recovered_ha: 31.4,
                recovery_rate: 63.1,
                risk_status: 'PRIORITAS TINGGI',
                key_zones: 'Palangka Raya & Kotawaringin (Taman Nasional Sebangau)',
            },
            {
                province: 'Kalimantan Selatan',
                active_hotspots: 6,
                damaged_ha: 18.5,
                recovered_ha: 12.0,
                recovery_rate: 64.9,
                risk_status: 'WASPADA',
                key_zones: 'Banjarbaru & Barito Kuala (Ring-1 Bandara Syamsudin Noor)',
            },
            {
                province: 'Kalimantan Timur',
                active_hotspots: 4,
                damaged_ha: 12.1,
                recovered_ha: 7.2,
                recovery_rate: 59.5,
                risk_status: 'WASPADA',
                key_zones: 'Kutai Kartanegara & Buffer Penajam Paser Utara',
            },
            {
                province: 'Kalimantan Utara',
                active_hotspots: 2,
                damaged_ha: 6.0,
                recovered_ha: 2.0,
                recovery_rate: 33.3,
                risk_status: 'TERKENDALI',
                key_zones: 'Bulungan & Malinau (Kayan Mentarang)',
            },
        ],
    };

    const metrics = forestryMetrics || defaultForestryMetrics;

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

    const defaultMapObservations: MapObservation[] = [
        {
            id: 801,
            external_record_id: 'NASA-VIIRS-KB01',
            satellite_instrument: 'VIIRS NOAA-20',
            confidence_level: 'High (Tinggi)',
            brightness_kelvin: 374.5,
            frp_mw: 54.2,
            latitude: -0.162,
            longitude: 109.395,
            province: 'Kalimantan Barat',
            regency_city: 'Kabupaten Kubu Raya',
            observed_at: new Date(Date.now() - 3600000 * 2).toISOString(),
            is_simulated: true,
            data_source: {
                name: 'NASA FIRMS / BMKG Satelit',
                attribution: 'Sensor VIIRS NOAA-20 (Thermal Radiative Power)',
                source_type: 'SATELLITE',
            },
        },
        {
            id: 802,
            external_record_id: 'NASA-MODIS-KB02',
            satellite_instrument: 'MODIS Aqua',
            confidence_level: 'Nominal',
            brightness_kelvin: 342.1,
            frp_mw: 28.6,
            latitude: -0.091,
            longitude: 109.445,
            province: 'Kalimantan Barat',
            regency_city: 'Kabupaten Kubu Raya',
            observed_at: new Date(Date.now() - 3600000 * 4).toISOString(),
            is_simulated: true,
            data_source: {
                name: 'NASA FIRMS / BMKG Satelit',
                attribution: 'Sensor MODIS Aqua',
                source_type: 'SATELLITE',
            },
        },
        {
            id: 803,
            external_record_id: 'NASA-VIIRS-KT01',
            satellite_instrument: 'VIIRS SNPP',
            confidence_level: 'High (Tinggi)',
            brightness_kelvin: 382.4,
            frp_mw: 68.4,
            latitude: -2.235,
            longitude: 113.89,
            province: 'Kalimantan Tengah',
            regency_city: 'Kota Palangka Raya',
            observed_at: new Date(Date.now() - 3600000 * 1).toISOString(),
            is_simulated: true,
            data_source: {
                name: 'NASA FIRMS / BMKG Satelit',
                attribution: 'Sensor Suomi NPP VIIRS',
                source_type: 'SATELLITE',
            },
        },
        {
            id: 804,
            external_record_id: 'NASA-VIIRS-KT02',
            satellite_instrument: 'NOAA-21 VIIRS',
            confidence_level: 'High (Tinggi)',
            brightness_kelvin: 366.8,
            frp_mw: 42.1,
            latitude: -2.535,
            longitude: 112.95,
            province: 'Kalimantan Tengah',
            regency_city: 'Kabupaten Kotawaringin Timur',
            observed_at: new Date(Date.now() - 3600000 * 3).toISOString(),
            is_simulated: true,
            data_source: {
                name: 'NASA FIRMS / BMKG Satelit',
                attribution: 'Sensor NOAA-21 VIIRS',
                source_type: 'SATELLITE',
            },
        },
        {
            id: 805,
            external_record_id: 'NASA-MODIS-KS01',
            satellite_instrument: 'MODIS Terra',
            confidence_level: 'Nominal',
            brightness_kelvin: 348.2,
            frp_mw: 33.7,
            latitude: -3.425,
            longitude: 114.82,
            province: 'Kalimantan Selatan',
            regency_city: 'Kota Banjarbaru',
            observed_at: new Date(Date.now() - 3600000 * 5).toISOString(),
            is_simulated: true,
            data_source: {
                name: 'NASA FIRMS / BMKG Satelit',
                attribution: 'Sensor MODIS Terra',
                source_type: 'SATELLITE',
            },
        },
        {
            id: 806,
            external_record_id: 'NASA-VIIRS-KI01',
            satellite_instrument: 'VIIRS NOAA-20',
            confidence_level: 'High (Tinggi)',
            brightness_kelvin: 371.0,
            frp_mw: 49.3,
            latitude: -0.42,
            longitude: 116.98,
            province: 'Kalimantan Timur',
            regency_city: 'Kabupaten Kutai Kartanegara',
            observed_at: new Date(Date.now() - 3600000 * 2).toISOString(),
            is_simulated: true,
            data_source: {
                name: 'NASA FIRMS / BMKG Satelit',
                attribution: 'Sensor VIIRS NOAA-20',
                source_type: 'SATELLITE',
            },
        },
    ];

    const effectiveMapReports = mapReports.length > 0 ? mapReports : defaultMapReports;
    const effectiveMapObservations = (mapObservations && mapObservations.length > 0)
        ? mapObservations
        : defaultMapObservations;

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
                        2.5 INTEGRASI DATA & VISUALISASI GEOSPASIAL KEHUTANAN (GIS & KERUSAKAN/PEMULIHAN HUTAN)
                        ========================================================================= */}
                    <section aria-label="Visualisasi Geospasial & Pemulihan Kehutanan" className="space-y-6 sm:space-y-7">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                                    Data Geospasial & Pemulihan Hutan
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                                    Pantauan luasan kebakaran, status pemulihan, dan sebaran titik api di Kalimantan.
                                </p>
                            </div>

                            {/* View Switcher Tabs - Styled with Brand Deep Green (#0c4e33) */}
                            <div className="flex items-center rounded-xl bg-neutral-100 p-1 border border-neutral-200/90 shrink-0 self-start sm:self-auto">
                                <button
                                    type="button"
                                    onClick={() => setForestryTab('trend')}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        forestryTab === 'trend'
                                            ? 'bg-[#0c4e33] text-white shadow-xs'
                                            : 'text-neutral-600 hover:text-neutral-900'
                                    }`}
                                >
                                    Tren Bulanan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setForestryTab('ecosystem')}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        forestryTab === 'ecosystem'
                                            ? 'bg-[#0c4e33] text-white shadow-xs'
                                            : 'text-neutral-600 hover:text-neutral-900'
                                    }`}
                                >
                                    Tutupan Lahan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setForestryTab('provinces')}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        forestryTab === 'provinces'
                                            ? 'bg-[#0c4e33] text-white shadow-xs'
                                            : 'text-neutral-600 hover:text-neutral-900'
                                    }`}
                                >
                                    5 Provinsi
                                </button>
                            </div>
                        </div>

                        {/* Forestry Executive Metrics Strip (4 Clean Cards without AI Icon Boxes) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                            {/* Card 1: Luas Terdampak */}
                            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                                        Estimasi Luas Terdampak
                                    </span>
                                    <div className="mt-3 flex items-baseline gap-1.5">
                                        <span className="text-3xl font-extrabold text-neutral-900 tracking-tight tabular-nums">
                                            {metrics.summary.total_damaged_hectares}
                                        </span>
                                        <span className="text-sm font-semibold text-neutral-500">Ha</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        Total estimasi area terbakar
                                    </p>
                                </div>
                                <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                                    <span className="text-neutral-500 font-medium">Titik Pantau</span>
                                    <span className="font-semibold text-neutral-800">
                                        {metrics.summary.active_hotspots_count} Titik
                                    </span>
                                </div>
                            </div>

                            {/* Card 2: Luas Terpulihkan (Highlighted with Website Core Forest Green #0c4e33) */}
                            <div className="rounded-2xl border border-[#0c4e33]/30 bg-gradient-to-br from-emerald-50/50 via-white to-white p-5 shadow-xs flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0c4e33] block">
                                        Luas Terpulihkan
                                    </span>
                                    <div className="mt-3 flex items-baseline gap-1.5">
                                        <span className="text-3xl font-extrabold text-[#0c4e33] tracking-tight tabular-nums">
                                            {metrics.summary.total_recovered_hectares}
                                        </span>
                                        <span className="text-sm font-semibold text-emerald-700">Ha</span>
                                    </div>
                                    <p className="text-xs text-neutral-600 mt-1">
                                        Tuntas dipadamkan & disekat
                                    </p>
                                </div>
                                <div className="pt-3 mt-4 border-t border-emerald-100 flex items-center justify-between text-xs">
                                    <span className="text-neutral-600 font-medium">Tingkat Pemulihan</span>
                                    <span className="font-bold text-[#0c4e33] bg-emerald-100/80 px-2 py-0.5 rounded-md text-[11px]">
                                        {metrics.summary.recovery_rate_percentage}%
                                    </span>
                                </div>
                            </div>

                            {/* Card 3: Kawasan Api Aktif (Guaranteed Clean Line with NO text overlap) */}
                            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                                        Kawasan Api Aktif
                                    </span>
                                    <div className="mt-3 flex items-baseline gap-1.5">
                                        <span className="text-3xl font-extrabold text-neutral-900 tracking-tight tabular-nums">
                                            {metrics.summary.active_burning_hectares}
                                        </span>
                                        <span className="text-sm font-semibold text-neutral-500">Ha</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        Operasi pemadaman satgas
                                    </p>
                                </div>
                                <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                                    <span className="text-neutral-500 font-medium">Status</span>
                                    <span className="font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full text-[11px] whitespace-nowrap">
                                        Dalam Penanganan
                                    </span>
                                </div>
                            </div>

                            {/* Card 4: Sekat Kanal Gambut */}
                            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                                        Sekat Kanal Gambut
                                    </span>
                                    <div className="mt-3 flex items-baseline gap-1.5">
                                        <span className="text-3xl font-extrabold text-neutral-900 tracking-tight tabular-nums">
                                            {metrics.summary.peat_canal_blocks_active}
                                        </span>
                                        <span className="text-sm font-semibold text-neutral-500">Unit</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        Infrastruktur pembasahan gambut
                                    </p>
                                </div>
                                <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                                    <span className="text-neutral-500 font-medium">Kondisi</span>
                                    <span className="font-bold text-[#0c4e33] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px] whitespace-nowrap">
                                        Aktif Terawat
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* =========================================================================
                            GIS MAP & FORESTRY ANALYTICS GRID (2 COLUMNS)
                            Left: Full Interactive GIS Leaflet Map with Forestry Filters (7 cols)
                            Right: Dual Damage vs Recovery Visualizer Charts (5 cols)
                            ========================================================================= */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
                            {/* LEFT COLUMN: Peta Geospasial Interaktif GIS Kehutanan (7 Cols) */}
                            <div className="lg:col-span-7 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                                <div>
                                    {/* Map Header & Controls */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="relative flex size-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                    <span className="relative inline-flex rounded-full size-2 bg-[#0c4e33]" />
                                                </span>
                                                <h3 className="text-base font-bold text-neutral-900">
                                                    Peta Sebaran Titik Api & Lahan
                                                </h3>
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                Koordinat kejadian lapangan dan pantauan satelit NASA / BMKG
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {/* Province Filter Dropdown */}
                                            <select
                                                value={selectedForestProvince}
                                                onChange={(e) => setSelectedForestProvince(e.target.value)}
                                                className="h-8 px-2.5 text-xs font-semibold rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#0c4e33] cursor-pointer transition-colors"
                                            >
                                                <option value="">Semua Wilayah</option>
                                                <option value="Kalimantan Barat">Kalbar</option>
                                                <option value="Kalimantan Tengah">Kalteng</option>
                                                <option value="Kalimantan Selatan">Kalsel</option>
                                                <option value="Kalimantan Timur">Kaltim</option>
                                                <option value="Kalimantan Utara">Kaltara</option>
                                            </select>

                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                                className="h-8 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 shadow-2xs"
                                            >
                                                <Link href="/admin/map" className="flex items-center gap-1.5">
                                                    <Maximize2 className="size-3 text-[#0c4e33]" />
                                                    <span>Layar Penuh</span>
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Quick Layer Filter Buttons - Matching Brand Forest Green */}
                                    <div className="flex flex-wrap items-center gap-2 py-2.5 border-t border-neutral-100">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLayer('all')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                                selectedLayer === 'all'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                                            }`}
                                        >
                                            Semua
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLayer('gambut')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                                selectedLayer === 'gambut'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                                            }`}
                                        >
                                            Gambut
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLayer('lindung')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                                selectedLayer === 'lindung'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                                            }`}
                                        >
                                            Hutan Lindung
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLayer('satelit')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                                selectedLayer === 'satelit'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                                            }`}
                                        >
                                            Satelit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLayer('padam')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                                selectedLayer === 'padam'
                                                    ? 'bg-[#0c4e33] text-white shadow-xs'
                                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                                            }`}
                                        >
                                            Padam
                                        </button>
                                    </div>

                                    {/* Leaflet Interactive Map View with Clean Spacing */}
                                    <div className="mt-3.5 rounded-xl overflow-hidden border border-neutral-200/80 shadow-2xs relative">
                                        <KarhutlaMap
                                            reports={effectiveMapReports.filter((r) => {
                                                if (selectedForestProvince && r.province !== selectedForestProvince) return false;
                                                if (selectedLayer === 'gambut') return r.category?.name?.toLowerCase().includes('gambut');
                                                if (selectedLayer === 'lindung') return r.category?.name?.toLowerCase().includes('lindung');
                                                if (selectedLayer === 'satelit') {
                                                    const src = (r.fire_condition_source || '').toLowerCase();
                                                    return src.includes('satelit') || src.includes('bmkg') || src.includes('nasa') || r.is_simulated;
                                                }
                                                if (selectedLayer === 'padam') {
                                                    return (
                                                        r.report_status === 'RESOLVED_VERIFIED' ||
                                                        r.fire_condition === 'OBSERVED_EXTINGUISHED' ||
                                                        r.fire_condition === 'OBSERVED_CONTAINED'
                                                    );
                                                }
                                                return true;
                                            })}
                                            observations={(selectedLayer === 'padam' || selectedLayer === 'gambut' || selectedLayer === 'lindung' ? [] : effectiveMapObservations).filter((o) => {
                                                if (selectedForestProvince && o.province !== selectedForestProvince) return false;
                                                return true;
                                            })}
                                            reportUrlPrefix="/admin/reports"
                                            height="350px"
                                            showLegend={false}
                                            showFloatingLegend={false}
                                            showSimulatedNotice={false}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* GIS Map Footer & Color Legend */}
                                <div className="mt-4 pt-3.5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 font-sans">
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                        <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 whitespace-nowrap">
                                            <span className="size-2 rounded-full bg-red-600 inline-block shrink-0" />
                                            <span>Api Aktif</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 whitespace-nowrap">
                                            <span className="size-2 rounded-full bg-amber-500 inline-block shrink-0" />
                                            <span>Sekat Parit</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 whitespace-nowrap">
                                            <span className="size-2 rounded-full bg-[#0c4e33] inline-block shrink-0" />
                                            <span>Padam</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 font-medium text-neutral-700 whitespace-nowrap">
                                            <span className="size-2 rounded-full bg-[#f97316] inline-block shrink-0" />
                                            <span>Satelit Hotspot</span>
                                        </span>
                                    </div>

                                    <Link
                                        href="/admin/map"
                                        className="font-bold text-[#0c4e33] hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap"
                                    >
                                        <span>Buka Peta Lengkap</span>
                                        <ArrowUpRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Visualisasi Statistik Kerusakan & Pemulihan Hutan (5 Cols) */}
                            <div className="lg:col-span-5 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                                <div>
                                    {/* Tab View 1: Tren Kerusakan vs Pemulihan Bulanan */}
                                    {forestryTab === 'trend' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                                                        Tren Kerusakan vs Pemulihan
                                                    </h3>
                                                    <p className="text-xs text-neutral-500 mt-0.5 truncate">Perbandingan luas per bulan (Ha)</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs font-semibold shrink-0">
                                                    <span className="inline-flex items-center gap-1.5 text-neutral-700 whitespace-nowrap">
                                                        <span className="size-2.5 rounded-xs bg-neutral-800 shrink-0" />
                                                        <span>Terbakar</span>
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 text-[#0c4e33] whitespace-nowrap">
                                                        <span className="size-2.5 rounded-xs bg-[#0c4e33] shrink-0" />
                                                        <span>Pulih</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Selected Month Spotlight Card */}
                                            {metrics.monthly_trend[selectedMonthIndex] && (
                                                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-bold text-neutral-800 truncate">
                                                            {metrics.monthly_trend[selectedMonthIndex].month} 2026
                                                        </div>
                                                        <div className="text-[11px] text-neutral-500 mt-0.5 truncate">
                                                            {metrics.monthly_trend[selectedMonthIndex].incidents} kejadian terdata
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-right shrink-0">
                                                        <div>
                                                            <div className="text-xs font-bold text-neutral-900 tabular-nums whitespace-nowrap">
                                                                {metrics.monthly_trend[selectedMonthIndex].damaged_ha} Ha
                                                            </div>
                                                            <div className="text-[10px] text-neutral-400 whitespace-nowrap">Terbakar</div>
                                                        </div>
                                                        <div className="h-6 w-px bg-neutral-200 shrink-0" />
                                                        <div>
                                                            <div className="text-xs font-black text-[#0c4e33] tabular-nums whitespace-nowrap">
                                                                {metrics.monthly_trend[selectedMonthIndex].recovered_ha} Ha
                                                            </div>
                                                            <div className="text-[10px] text-[#0c4e33] font-bold whitespace-nowrap">
                                                                {metrics.monthly_trend[selectedMonthIndex].recovery_rate}% Pulih
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Dual Comparative Bar Chart with Dedicated Baseline and Non-wrapping Y-axis */}
                                            <div className="pt-2 pb-1">
                                                {/* Chart Plot Area (176px tall with perfect 60 Ha ceiling) */}
                                                <div className="relative h-44 w-full">
                                                    {/* Background Grid Lines & Non-Wrapping Y-Axis Labels */}
                                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-neutral-400">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-12 text-right shrink-0 whitespace-nowrap tabular-nums font-mono">60 Ha</span>
                                                            <div className="flex-1 border-b border-dashed border-neutral-200" />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-12 text-right shrink-0 whitespace-nowrap tabular-nums font-mono">40 Ha</span>
                                                            <div className="flex-1 border-b border-dashed border-neutral-200" />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-12 text-right shrink-0 whitespace-nowrap tabular-nums font-mono">20 Ha</span>
                                                            <div className="flex-1 border-b border-dashed border-neutral-200" />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-12 text-right shrink-0 whitespace-nowrap tabular-nums font-mono">0 Ha</span>
                                                            <div className="flex-1 border-b border-neutral-300" />
                                                        </div>
                                                    </div>

                                                    {/* Comparative Bars Aligned 1:1 with Grid Lines */}
                                                    <div className="relative h-full flex items-end justify-between pl-14 pr-1">
                                                        {metrics.monthly_trend.map((m, idx) => {
                                                            const isSelected = selectedMonthIndex === idx;
                                                            const damagedPct = Math.min(Math.round((m.damaged_ha / 60) * 100), 100);
                                                            const recoveredPct = Math.min(Math.round((m.recovered_ha / 60) * 100), 100);

                                                            return (
                                                                <div
                                                                    key={m.month}
                                                                    onClick={() => setSelectedMonthIndex(idx)}
                                                                    className={`flex flex-col items-center flex-1 h-full justify-end cursor-pointer group px-0.5 rounded-lg transition-colors ${
                                                                        isSelected ? 'bg-neutral-100/90 ring-1 ring-[#0c4e33]/25' : 'hover:bg-neutral-50'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-end justify-center gap-1 sm:gap-1.5 w-full h-full pb-0.5">
                                                                        {/* Damaged Area Bar */}
                                                                        <div
                                                                            style={{ height: `${damagedPct}%` }}
                                                                            className={`w-2.5 sm:w-3.5 rounded-t-xs transition-all duration-300 ${
                                                                                isSelected
                                                                                    ? 'bg-neutral-900 shadow-xs'
                                                                                    : 'bg-neutral-300 group-hover:bg-neutral-400'
                                                                            }`}
                                                                            title={`Terbakar: ${m.damaged_ha} Ha`}
                                                                        />
                                                                        {/* Recovered Area Bar */}
                                                                        <div
                                                                            style={{ height: `${recoveredPct}%` }}
                                                                            className={`w-2.5 sm:w-3.5 rounded-t-xs transition-all duration-300 ${
                                                                                isSelected
                                                                                    ? 'bg-[#0c4e33] shadow-xs ring-1 ring-[#10e57a]'
                                                                                    : 'bg-emerald-400 group-hover:bg-emerald-500'
                                                                            }`}
                                                                            title={`Terpulihkan: ${m.recovered_ha} Ha`}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* X-Axis Month Labels Row Sitting Cleanly Below 0 Ha Grid Line */}
                                                <div className="flex items-center justify-between pl-14 pr-1 pt-2">
                                                    {metrics.monthly_trend.map((m, idx) => {
                                                        const isSelected = selectedMonthIndex === idx;
                                                        return (
                                                            <div
                                                                key={`month-label-${m.month}`}
                                                                onClick={() => setSelectedMonthIndex(idx)}
                                                                className="flex-1 text-center cursor-pointer"
                                                            >
                                                                <span
                                                                    className={`text-[11px] block transition-colors ${
                                                                        isSelected
                                                                            ? 'font-bold text-[#0c4e33]'
                                                                            : 'font-medium text-neutral-400 hover:text-neutral-700'
                                                                    }`}
                                                                >
                                                                    {m.month}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab View 2: Tutupan Lahan & Ekosistem Breakdown */}
                                    {forestryTab === 'ecosystem' && (
                                        <div className="space-y-3.5">
                                            <div className="border-b border-neutral-100 pb-2.5">
                                                <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                                                    Kerusakan Berdasarkan Tutupan Lahan
                                                </h3>
                                                <p className="text-xs text-neutral-500 mt-0.5">Klasifikasi area terdampak karhutla</p>
                                            </div>

                                            <div className="space-y-2.5">
                                                {metrics.ecosystem_breakdown.map((eco) => (
                                                    <div
                                                        key={eco.slug}
                                                        className="p-3 rounded-xl border border-neutral-200/80 bg-neutral-50/70 hover:bg-neutral-100/80 transition-all space-y-1.5"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-xs text-neutral-900">
                                                                {eco.name}
                                                            </span>
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 whitespace-nowrap">
                                                                {eco.carbon_risk}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center justify-between text-xs text-neutral-600">
                                                            <span className="text-[11px] whitespace-nowrap">
                                                                {eco.damaged_ha} Ha Terbakar • {eco.recovered_ha} Ha Pulih
                                                            </span>
                                                            <span className="font-bold text-[#0c4e33] tabular-nums whitespace-nowrap">
                                                                {eco.recovery_rate}%
                                                            </span>
                                                        </div>

                                                        {/* Progress recovery bar with Brand Forest Green */}
                                                        <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full bg-[#0c4e33] transition-all duration-500"
                                                                style={{ width: `${eco.recovery_rate}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab View 3: Matriks Evaluasi Spasial 5 Provinsi */}
                                    {forestryTab === 'provinces' && (
                                        <div className="space-y-3">
                                            <div className="border-b border-neutral-100 pb-2.5">
                                                <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                                                    Matriks 5 Provinsi Kalimantan
                                                </h3>
                                                <p className="text-xs text-neutral-500 mt-0.5">Distribusi wilayah dan progres pemadaman</p>
                                            </div>

                                            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                                                {metrics.provincial_gis.map((prov) => (
                                                    <div
                                                        key={prov.province}
                                                        className="p-3 rounded-xl border border-neutral-200/80 bg-neutral-50/70 space-y-1.5"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-xs text-neutral-900">
                                                                {prov.province}
                                                            </span>
                                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                                                                prov.risk_status === 'PRIORITAS TINGGI'
                                                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                                                    : prov.risk_status === 'WASPADA'
                                                                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                                                    : 'bg-emerald-50 text-[#0c4e33] border border-emerald-200'
                                                            }`}>
                                                                {prov.risk_status}
                                                            </span>
                                                        </div>
                                                        <div className="text-[11px] text-neutral-500 truncate">
                                                            {prov.key_zones}
                                                        </div>
                                                        <div className="flex items-center justify-between text-xs pt-1">
                                                            <span className="text-neutral-500 text-[11px] whitespace-nowrap">
                                                                {prov.damaged_ha} Ha (Pulih {prov.recovered_ha} Ha)
                                                            </span>
                                                            <span className="font-bold text-[#0c4e33] tabular-nums whitespace-nowrap">
                                                                {prov.recovery_rate}% Selesai
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column Footer */}
                                <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                                    <span className="text-neutral-400 text-[11px] whitespace-nowrap">
                                        Data terintegrasi BPBD & Satelit
                                    </span>
                                    <Link
                                        href={reportsIndex().url}
                                        className="font-bold text-[#0c4e33] hover:underline whitespace-nowrap"
                                    >
                                        Buka Register Terbuka
                                    </Link>
                                </div>
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
