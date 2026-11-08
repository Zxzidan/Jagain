import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import {
    Activity,
    BarChart3,
    Building2,
    CheckCircle2,
    ChevronDown,
    Clock,
    Eye,
    Flame,
    Layers,
    Lock,
    MapPin,
    RotateCcw,
    Satellite,
    Shield,
    ShieldCheck,
    TrendingUp,
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface ExecutiveDashboardProps {
    filters: {
        province?: string | null;
    };
    provinces: string[];
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
    fireConditionCounts: {
        reported_active: number;
        observed_active: number;
        observed_contained: number;
        observed_extinguished: number;
        unknown: number;
    };
    kpis: {
        verification_rate: number;
        resolution_rate: number;
        total_actionable: number;
    };
    provincialBreakdown: Array<{
        province: string;
        total: number;
        pending_review: number;
        in_progress: number;
        resolved: number;
        closed: number;
        active_fire: number;
        hotspots: number;
        resolution_rate: number;
    }>;
    trendSeries: Array<{
        period: string;
        total: number;
        resolved: number;
        in_progress: number;
    }>;
    agencyPerformance: Array<{
        id: number;
        name: string;
        code: string;
        type: string;
        jurisdiction: string;
        total_assignments: number;
        in_progress: number;
        completed: number;
        completion_rate: number;
    }>;
    mapReports: MapReport[];
    mapObservations: MapObservation[];
    dataIntegrity: {
        actual_reports: number;
        simulated_reports: number;
        total_hotspots: number;
        simulated_hotspots: number;
        actual_hotspots: number;
        last_report_at?: string | null;
        last_hotspot_at?: string | null;
        data_sources: Array<{
            id: number;
            name: string;
            code: string;
            type: string;
            provider: string;
        }>;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Eksekutif (Read-Only)',
        href: '/executive/dashboard',
    },
];

export default function ExecutiveDashboard({
    filters,
    provinces = [],
    statusCounts,
    fireConditionCounts,
    kpis,
    provincialBreakdown = [],
    trendSeries = [],
    agencyPerformance = [],
    mapReports = [],
    mapObservations = [],
    dataIntegrity,
}: ExecutiveDashboardProps) {
    const [selectedProvince, setSelectedProvince] = useState<string>(filters?.province || '');

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

    const handleProvinceChange = (provinceValue: string) => {
        setSelectedProvince(provinceValue);
        router.get(
            '/executive/dashboard',
            { province: provinceValue || undefined },
            { preserveState: true, preserveScroll: true }
        );
    };

    const formatDate = (isoString?: string | null) => {
        if (!isoString) return 'Belum tersedia';
        try {
            return (
                new Intl.DateTimeFormat('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(new Date(isoString)) + ' WIB'
            );
        } catch {
            return isoString;
        }
    };

    const maxTrendTotal = Math.max(...trendSeries.map((t) => t.total), 1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Eksekutif (Read-Only) — JAGAIN" />

            <div className="min-h-screen bg-[#f8faf9] py-6 sm:py-8 px-4 sm:px-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">
                    {/* =========================================================================
                        1. READ-ONLY EXECUTIVE PERSPECTIVE BANNER
                        ========================================================================= */}
                    <div className="rounded-2xl border border-emerald-200/90 bg-white p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-[#0c4e33] text-white shrink-0 shadow-2xs">
                                <BarChart3 className="size-5" />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0c4e33]">
                                        <Lock className="size-3" />
                                        Perspektif Eksekutif • Hanya Baca (Read-Only)
                                    </span>
                                    <span className="text-[11px] font-semibold text-neutral-500">
                                        Cakupan: 5 Provinsi Kalimantan
                                    </span>
                                </div>
                                <h1 className="text-lg sm:text-xl font-extrabold text-neutral-900 mt-1 tracking-tight">
                                    Ringkasan Eksekutif & Pemantauan Strategis Karhutla
                                </h1>
                                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed max-w-3xl">
                                    Tampilan analitik pimpinan untuk memantau kondisi kebakaran hutan dan lahan, efektivitas verifikasi, progres penanganan lintas provinsi, dan kinerja instansi (OPD) tanpa hak akses perubahan data operasional.
                                </p>
                            </div>
                        </div>

                        {/* Province Filter Control */}
                        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
                            <div className="relative">
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => handleProvinceChange(e.target.value)}
                                    aria-label="Filter Provinsi Kalimantan"
                                    className="appearance-none rounded-xl border border-neutral-300 bg-white pl-3.5 pr-9 py-2 text-xs font-bold text-neutral-800 shadow-2xs focus:outline-none focus:border-[#0c4e33] cursor-pointer"
                                >
                                    <option value="">Seluruh Provinsi Kalimantan (5 Provinsi)</option>
                                    {provinces.map((prov) => (
                                        <option key={prov} value={prov}>
                                            {prov}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="size-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {selectedProvince && (
                                <button
                                    type="button"
                                    onClick={() => handleProvinceChange('')}
                                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 cursor-pointer"
                                >
                                    <RotateCcw className="size-3.5" />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* =========================================================================
                        2. EXECUTIVE KPI CARDS (4 Strategic Metrics)
                        ========================================================================= */}
                    <section aria-label="Indikator Kinerja Utama Eksekutif" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* KPI 1: Total Laporan Masuk */}
                        <div className="rounded-2xl bg-gradient-to-br from-[#0c4e33] via-[#094029] to-[#052819] text-white p-6 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                                    Total Laporan Masyarakat
                                </span>
                                <div className="size-9 rounded-xl bg-white/15 flex items-center justify-center text-emerald-300">
                                    <Flame className="size-4.5" />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="text-3xl font-extrabold tabular-nums">{statusCounts.total}</div>
                                <div className="text-[11px] text-emerald-100/90 mt-1">
                                    {dataIntegrity.actual_reports} Aktual • {dataIntegrity.simulated_reports} Simulasi
                                </div>
                            </div>
                            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-100">
                                <span>Menunggu Telaah Awal:</span>
                                <strong className="font-mono text-white">
                                    {statusCounts.submitted + statusCounts.under_review}
                                </strong>
                            </div>
                        </div>

                        {/* KPI 2: Tingkat Verifikasi Laporan */}
                        <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Tingkat Verifikasi
                                </span>
                                <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-[#0c4e33]">
                                    <ShieldCheck className="size-4.5" />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="text-3xl font-extrabold text-neutral-900 tabular-nums">
                                    {kpis.verification_rate}%
                                </div>
                                <div className="text-[11px] text-neutral-500 mt-1">
                                    {kpis.total_actionable} laporan terverifikasi faktual
                                </div>
                            </div>
                            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                                <span>Ditutup dengan Alasan:</span>
                                <strong className="font-mono text-neutral-900">{statusCounts.closed_with_reason}</strong>
                            </div>
                        </div>

                        {/* KPI 3: Progres Penyelesaian Lapangan */}
                        <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Rasio Penyelesaian
                                </span>
                                <div className="size-9 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700">
                                    <CheckCircle2 className="size-4.5" />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="text-3xl font-extrabold text-neutral-900 tabular-nums">
                                    {kpis.resolution_rate}%
                                </div>
                                <div className="text-[11px] text-neutral-500 mt-1">
                                    {statusCounts.resolved_verified} selesai dari {kpis.total_actionable} laporan valid
                                </div>
                            </div>
                            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                                <span>Sedang Ditangani OPD:</span>
                                <strong className="font-mono text-blue-700">
                                    {statusCounts.dispatched + statusCounts.resolution_review}
                                </strong>
                            </div>
                        </div>

                        {/* KPI 4: Observasi Hotspot Satelit vs Kondisi Api */}
                        <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Anomali Termal Satelit
                                </span>
                                <div className="size-9 rounded-xl bg-violet-50 border border-violet-200/60 flex items-center justify-center text-violet-700">
                                    <Satellite className="size-4.5" />
                                </div>
                            </div>
                            <div className="my-4">
                                <div className="text-3xl font-extrabold text-violet-900 tabular-nums">
                                    {dataIntegrity.total_hotspots}
                                </div>
                                <div className="text-[11px] text-neutral-500 mt-1">
                                    Titik panas terdeteksi sensor satelit
                                </div>
                            </div>
                            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                                <span>Api Aktif Teramati:</span>
                                <strong className="font-mono text-red-600">
                                    {fireConditionCounts.observed_active + fireConditionCounts.reported_active}
                                </strong>
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        3. GEOSPATIAL VISUALIZATION (Interactive GIS Map + Status Separation)
                        ========================================================================= */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left 8 Cols: Interactive GIS Map */}
                        <div className="lg:col-span-8 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <h2 className="text-base font-bold text-neutral-900">
                                            Peta Geospasial Sebaran Laporan & Hotspot Satelit
                                        </h2>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        Pin lingkaran menunjukkan laporan masyarakat; simbol belah ketupat ungu menunjukkan anomali termal satelit (belum tentu kebakaran aktif).
                                    </p>
                                </div>
                                <Link
                                    href="/peta"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors"
                                >
                                    <MapPin className="size-3.5 text-[#0c4e33]" />
                                    <span>Buka Peta Publik Penuh</span>
                                </Link>
                            </div>

                            <div className="rounded-2xl overflow-hidden border border-neutral-200">
                                <KarhutlaMap
                                    reports={mapReports}
                                    observations={mapObservations}
                                    height="360px"
                                    showLegend={true}
                                />
                            </div>
                        </div>

                        {/* Right 4 Cols: Separation of Administrative Status vs Physical Fire Condition */}
                        <div className="lg:col-span-4 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                                    <Layers className="size-4 text-[#0c4e33]" />
                                    <h2 className="text-sm font-bold text-neutral-900">
                                        Distribusi Tahap Penanganan
                                    </h2>
                                </div>

                                <div className="mt-3 space-y-2 text-xs">
                                    {[
                                        { label: '1. Menunggu Verifikasi', val: statusCounts.submitted, color: 'bg-neutral-500' },
                                        { label: '2. Dalam Peninjauan', val: statusCounts.under_review, color: 'bg-amber-500' },
                                        { label: '3. Butuh Info Tambahan', val: statusCounts.needs_information, color: 'bg-yellow-500' },
                                        { label: '4. Terverifikasi Faktual', val: statusCounts.verified, color: 'bg-teal-600' },
                                        { label: '5. Diteruskan / Ditangani OPD', val: statusCounts.dispatched, color: 'bg-blue-600' },
                                        { label: '6. Validasi Penyelesaian', val: statusCounts.resolution_review, color: 'bg-indigo-600' },
                                        { label: '7. Selesai Terverifikasi', val: statusCounts.resolved_verified, color: 'bg-emerald-600' },
                                        { label: '8. Ditutup dengan Alasan', val: statusCounts.closed_with_reason, color: 'bg-rose-500' },
                                    ].map((st) => (
                                        <div key={st.label} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                                            <div className="flex items-center gap-2">
                                                <span className={`size-2 rounded-full ${st.color}`} />
                                                <span className="font-medium text-neutral-700">{st.label}</span>
                                            </div>
                                            <strong className="font-mono text-neutral-900">{st.val}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3 border-t border-neutral-100">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                                    Kondisi Fisik Kebakaran (Lapangan)
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-[11px]">
                                    <div className="p-2 rounded-lg bg-red-50/70 border border-red-200/70">
                                        <div className="text-red-700 font-medium">Api Aktif (Dilaporkan/Teramati)</div>
                                        <div className="text-sm font-extrabold text-red-900 font-mono mt-0.5">
                                            {fireConditionCounts.reported_active + fireConditionCounts.observed_active}
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/70">
                                        <div className="text-amber-800 font-medium">Terkendali / Tersekat</div>
                                        <div className="text-sm font-extrabold text-amber-900 font-mono mt-0.5">
                                            {fireConditionCounts.observed_contained}
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/70">
                                        <div className="text-emerald-800 font-medium">Padam Teramati</div>
                                        <div className="text-sm font-extrabold text-emerald-900 font-mono mt-0.5">
                                            {fireConditionCounts.observed_extinguished}
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-200/70">
                                        <div className="text-neutral-600 font-medium">Belum Diketahui</div>
                                        <div className="text-sm font-extrabold text-neutral-800 font-mono mt-0.5">
                                            {fireConditionCounts.unknown}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        4. PROVINCIAL DISTRIBUTION & TIME TREND COMPARISON
                        ========================================================================= */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Provincial Comparison Table & Bars (7 Cols) */}
                        <div className="lg:col-span-7 rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs">
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                                <div>
                                    <h2 className="text-base font-bold text-neutral-900">
                                        Statistik & Progres Penanganan per Provinsi (Kalimantan)
                                    </h2>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        Perbandingan jumlah laporan masuk, penanganan berjalan, dan penyelesaian terverifikasi
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-500 uppercase">
                                            <th className="py-2.5 pr-3">Provinsi</th>
                                            <th className="py-2.5 px-2 text-center">Total</th>
                                            <th className="py-2.5 px-2 text-center">Telaah</th>
                                            <th className="py-2.5 px-2 text-center">Ditangani</th>
                                            <th className="py-2.5 px-2 text-center">Selesai</th>
                                            <th className="py-2.5 px-2 text-center">Hotspot</th>
                                            <th className="py-2.5 pl-2 text-right">Rasio Selesai</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {provincialBreakdown.map((row) => (
                                            <tr key={row.province} className="hover:bg-neutral-50/80">
                                                <td className="py-3 pr-3 font-bold text-neutral-900">
                                                    {row.province}
                                                </td>
                                                <td className="py-3 px-2 text-center font-mono font-bold text-neutral-900">
                                                    {row.total}
                                                </td>
                                                <td className="py-3 px-2 text-center font-mono text-amber-700">
                                                    {row.pending_review}
                                                </td>
                                                <td className="py-3 px-2 text-center font-mono text-blue-700">
                                                    {row.in_progress}
                                                </td>
                                                <td className="py-3 px-2 text-center font-mono font-bold text-emerald-700">
                                                    {row.resolved}
                                                </td>
                                                <td className="py-3 px-2 text-center font-mono text-violet-700">
                                                    {row.hotspots}
                                                </td>
                                                <td className="py-3 pl-2 text-right">
                                                    <div className="inline-flex items-center gap-2">
                                                        <div className="w-16 h-2 rounded-full bg-neutral-200 overflow-hidden hidden sm:block">
                                                            <div
                                                                className="h-full bg-[#0c4e33] rounded-full"
                                                                style={{ width: `${row.resolution_rate}%` }}
                                                            />
                                                        </div>
                                                        <span className="font-mono font-bold text-neutral-800">
                                                            {row.resolution_rate}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Time-Series Trend & Data Provenance (5 Cols) */}
                        <div className="lg:col-span-5 rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between gap-5">
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                                    <div>
                                        <h2 className="text-base font-bold text-neutral-900">
                                            Tren Waktu Laporan & Penyelesaian
                                        </h2>
                                        <p className="text-xs text-neutral-500 mt-0.5">
                                            Berdasarkan rekaman riil basis data JAGAIN
                                        </p>
                                    </div>
                                    <TrendingUp className="size-4 text-[#0c4e33]" />
                                </div>

                                {trendSeries.length === 0 ? (
                                    <div className="py-8 text-center text-xs text-neutral-500">
                                        Belum ada data tren periode berjalan.
                                    </div>
                                ) : (
                                    <div className="mt-4 space-y-3">
                                        {trendSeries.map((item) => {
                                            const totalPct = Math.round((item.total / maxTrendTotal) * 100);
                                            const resolvedPct = item.total > 0 ? Math.round((item.resolved / item.total) * 100) : 0;
                                            return (
                                                <div key={item.period} className="space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="font-bold text-neutral-800">{item.period}</span>
                                                        <span className="text-[11px] text-neutral-600 font-mono">
                                                            Masuk: <strong>{item.total}</strong> • Ditangani: <strong>{item.in_progress}</strong> • Selesai: <strong className="text-emerald-700">{item.resolved}</strong>
                                                        </span>
                                                    </div>
                                                    <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden flex">
                                                        <div
                                                            className="h-full bg-[#0c4e33] transition-all"
                                                            style={{ width: `${Math.max(totalPct, 6)}%` }}
                                                            title={`Total: ${item.total} (${resolvedPct}% Selesai)`}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Data Provenance & Timestamp Card */}
                            <div className="rounded-xl bg-neutral-50 border border-neutral-200/80 p-3.5 text-xs space-y-1.5">
                                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                                    <Shield className="size-3.5 text-[#0c4e33]" />
                                    <span>Keterlacakan Sumber & Waktu Pembaruan Data</span>
                                </div>
                                <div className="text-[11px] text-neutral-600">
                                    <strong>Laporan Terakhir:</strong> {formatDate(dataIntegrity.last_report_at)}
                                </div>
                                <div className="text-[11px] text-neutral-600">
                                    <strong>Observasi Satelit Terakhir:</strong> {formatDate(dataIntegrity.last_hotspot_at)}
                                </div>
                                {dataIntegrity.data_sources?.length > 0 && (
                                    <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200/60">
                                        <strong>Sumber Terdaftar:</strong>{' '}
                                        {dataIntegrity.data_sources.map((ds) => ds.name).join(' • ')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        5. AGENCY / OPD PERFORMANCE INDICATORS (READ-ONLY)
                        ========================================================================= */}
                    <section className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                            <div className="flex items-center gap-2.5">
                                <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-[#0c4e33]">
                                    <Building2 className="size-4.5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-neutral-900">
                                        Indikator Kinerja Instansi & Unit Respons Lapangan (OPD)
                                    </h2>
                                    <p className="text-xs text-neutral-500">
                                        Rekapitulasi beban penugasan dan tingkat penyelesaian operasional per instansi
                                    </p>
                                </div>
                            </div>
                            <span className="text-[11px] font-semibold text-neutral-500">
                                Total Instansi Aktif: {agencyPerformance.length}
                            </span>
                        </div>

                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-neutral-100 text-[11px] font-bold text-neutral-500 uppercase">
                                        <th className="py-3 pr-4">Nama Instansi / OPD</th>
                                        <th className="py-3 px-3">Wilayah Yurisdiksi</th>
                                        <th className="py-3 px-3 text-center">Total Penugasan</th>
                                        <th className="py-3 px-3 text-center">Operasi Berjalan</th>
                                        <th className="py-3 px-3 text-center">Tuntas Selesai</th>
                                        <th className="py-3 pl-3 text-right">Tingkat Penyelesaian</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {agencyPerformance.map((agency) => (
                                        <tr key={agency.id} className="hover:bg-neutral-50/80">
                                            <td className="py-3.5 pr-4">
                                                <div className="font-bold text-neutral-900">{agency.name}</div>
                                                <div className="text-[11px] text-neutral-400 font-mono">{agency.code}</div>
                                            </td>
                                            <td className="py-3.5 px-3 text-neutral-700 font-medium">
                                                {agency.jurisdiction || 'Kalimantan'}
                                            </td>
                                            <td className="py-3.5 px-3 text-center font-mono font-bold text-neutral-900">
                                                {agency.total_assignments}
                                            </td>
                                            <td className="py-3.5 px-3 text-center font-mono text-blue-700 font-semibold">
                                                {agency.in_progress}
                                            </td>
                                            <td className="py-3.5 px-3 text-center font-mono text-emerald-700 font-bold">
                                                {agency.completed}
                                            </td>
                                            <td className="py-3.5 pl-3 text-right font-mono font-bold text-neutral-900">
                                                {agency.completion_rate}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

