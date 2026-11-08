import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import {
    ArrowLeft,
    Satellite,
    Flame,
    Filter,
    RotateCcw,
    ChevronDown,
    ListFilter,
    X,
    MapPin,
    ArrowRight,
    Layers,
} from 'lucide-react';

interface MapPageProps {
    reports: MapReport[];
    observations: MapObservation[];
    categories: Array<{ id: number; name: string; slug: string }>;
    provinces: string[];
    filters: {
        category?: string;
        province?: string;
        status?: string;
    };
}

export default function MapPage({
    reports = [],
    observations = [],
    categories = [],
    provinces = [],
    filters = {},
}: MapPageProps) {
    const [selectedProvince, setSelectedProvince] = useState(filters.province || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [showSatelliteHotspots, setShowSatelliteHotspots] = useState(true);
    const [selectedReportForFocus, setSelectedReportForFocus] = useState<MapReport | null>(null);
    const [showReportsList, setShowReportsList] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const handleApplyFilter = () => {
        router.get(
            '/peta',
            {
                province: selectedProvince || undefined,
                category: selectedCategory || undefined,
                status: selectedStatus || undefined,
            },
            { preserveState: true }
        );
    };

    const handleResetFilter = () => {
        setSelectedProvince('');
        setSelectedCategory('');
        setSelectedStatus('');
        router.get('/peta', {}, { preserveState: true });
    };

    const displayedObservations = showSatelliteHotspots ? observations : [];
    const hasActiveFilters = Boolean(selectedProvince || selectedCategory || selectedStatus);

    const filteredReports = reports.filter((rep) => {
        if (!searchFilter.trim()) return true;
        const q = searchFilter.toLowerCase();
        return (
            rep.title?.toLowerCase().includes(q) ||
            rep.tracking_code?.toLowerCase().includes(q) ||
            rep.regency_city?.toLowerCase().includes(q) ||
            rep.province?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden bg-neutral-900 text-neutral-900 font-sans antialiased">
            <Head title="Peta Sebaran Karhutla Publik — JAGAIN" />

            {/* Top Navigation & Controls Header (No landing page navbar) */}
            <header className="z-30 flex h-14 w-full shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-3 sm:px-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
                {/* Left: Back button & Title */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-800 shadow-2xs transition-colors cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        title="Kembali ke halaman sebelumnya"
                    >
                        <ArrowLeft className="size-3.5 text-neutral-600 dark:text-neutral-300" />
                        <span>Kembali</span>
                    </button>

                    <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <div className="size-7 rounded-lg bg-[#0c4e33] text-white flex items-center justify-center font-black text-sm tracking-tight shrink-0">
                            J
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-tight">
                                    Peta Sebaran Karhutla Publik
                                </h1>
                                <span className="hidden md:inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800">
                                    5 Provinsi Kalimantan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center / Stats Counter */}
                <div className="hidden lg:flex items-center gap-3 text-xs bg-neutral-100 dark:bg-neutral-800/80 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                    <span className="inline-flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{reports.length} Laporan Warga</span>
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-600">&bull;</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-violet-700 dark:text-violet-300">
                        <span className="size-2.5 rotate-45 rounded-[2px] bg-[#7c3aed] inline-block" />
                        <span>{displayedObservations.length} Hotspot Satelit (FIRMS)</span>
                    </span>
                </div>

                {/* Right: Quick Tools */}
                <div className="flex items-center gap-2">
                    {/* Satellite layer switch button */}
                    {observations.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowSatelliteHotspots(!showSatelliteHotspots)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs cursor-pointer ${
                                showSatelliteHotspots
                                    ? 'bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
                                    : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'
                            }`}
                            title="Nyalakan/matikan layer anomali termal satelit"
                        >
                            <Satellite className="size-3.5 text-orange-500" />
                            <span className="hidden sm:inline">Layer Satelit</span>
                            <span className="font-mono text-[11px] tabular-nums">({observations.length})</span>
                        </button>
                    )}

                    {/* Toggle Report List Drawer */}
                    <button
                        type="button"
                        onClick={() => setShowReportsList(!showReportsList)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs cursor-pointer ${
                            showReportsList
                                ? 'bg-[#0c4e33] text-white border-[#0c4e33]'
                                : 'bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700'
                        }`}
                        title="Tampilkan daftar laporan"
                    >
                        <ListFilter className="size-3.5" />
                        <span className="hidden sm:inline">Daftar Titik</span>
                        <span className="font-mono text-[11px] tabular-nums">({reports.length})</span>
                    </button>
                </div>
            </header>

            {/* Filter Strip Sub-header */}
            <div className="z-20 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50/90 px-3 sm:px-6 py-2 backdrop-blur-xs text-xs dark:border-neutral-800 dark:bg-neutral-900/90">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                    {/* Province dropdown */}
                    <div className="relative">
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            aria-label="Filter Provinsi"
                            className="appearance-none rounded-lg border border-neutral-300 bg-white pl-3 pr-7 py-1.5 text-xs text-neutral-800 font-medium focus:outline-none focus:border-[#0c4e33] cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        >
                            <option value="">Semua Provinsi</option>
                            {provinces.map((prov) => (
                                <option key={prov} value={prov}>
                                    {prov}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="size-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Category dropdown */}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            aria-label="Filter Kategori"
                            className="appearance-none rounded-lg border border-neutral-300 bg-white pl-3 pr-7 py-1.5 text-xs text-neutral-800 font-medium focus:outline-none focus:border-[#0c4e33] cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.slug}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="size-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Status dropdown */}
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            aria-label="Filter Status"
                            className="appearance-none rounded-lg border border-neutral-300 bg-white pl-3 pr-7 py-1.5 text-xs text-neutral-800 font-medium focus:outline-none focus:border-[#0c4e33] cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        >
                            <option value="">Semua Status Laporan</option>
                            <option value="SUBMITTED">Menunggu Verifikasi</option>
                            <option value="UNDER_REVIEW">Dalam Peninjauan</option>
                            <option value="NEEDS_INFORMATION">Membutuhkan Informasi Tambahan</option>
                            <option value="VERIFIED">Terverifikasi</option>
                            <option value="DISPATCHED">Diteruskan ke Instansi / Penanganan</option>
                            <option value="RESOLUTION_REVIEW">Menunggu Validasi Penyelesaian</option>
                            <option value="RESOLVED_VERIFIED">Selesai Terverifikasi</option>
                            <option value="CLOSED_WITH_REASON">Ditutup dengan Alasan</option>
                        </select>
                        <ChevronDown className="size-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Apply Filter Button */}
                    <button
                        type="button"
                        onClick={handleApplyFilter}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c4e33] hover:bg-[#083824] text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
                    >
                        <Filter className="size-3" />
                        <span>Filter</span>
                    </button>

                    {/* Reset Button */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={handleResetFilter}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            title="Reset seluruh filter"
                        >
                            <RotateCcw className="size-3" />
                            <span>Reset</span>
                        </button>
                    )}
                </div>

                {/* Focus Active Notice */}
                {selectedReportForFocus && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1 rounded-lg text-xs font-semibold">
                        <MapPin className="size-3 text-emerald-700" />
                        <span>Fokus Kamera: <strong>{selectedReportForFocus.tracking_code}</strong></span>
                        <button
                            type="button"
                            onClick={() => setSelectedReportForFocus(null)}
                            className="size-4 rounded-full bg-emerald-200 text-emerald-800 hover:bg-emerald-300 flex items-center justify-center text-[10px] cursor-pointer ml-1"
                            title="Lepas fokus"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>

            {/* Main Full-Height Interactive Map Container */}
            <main className="relative flex-1 w-full h-[calc(100vh-6.5rem)] overflow-hidden bg-neutral-100">
                <KarhutlaMap
                    reports={reports}
                    observations={displayedObservations}
                    selectedCoordinates={
                        selectedReportForFocus
                            ? { lat: selectedReportForFocus.latitude, lng: selectedReportForFocus.longitude }
                            : null
                    }
                    height="100%"
                    minHeight="100%"
                    showLegend={true}
                    showSimulatedNotice={false}
                    className="w-full h-full rounded-none border-0"
                />

                {/* Floating Collapsible Reports Panel */}
                {showReportsList && (
                    <div className="absolute top-3 right-3 bottom-3 z-[600] w-80 sm:w-96 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-2xl flex flex-col overflow-hidden dark:bg-neutral-900/95 dark:border-neutral-800 animate-in slide-in-from-right duration-200">
                        {/* Drawer Header */}
                        <div className="p-4 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Flame className="size-4 text-emerald-600" />
                                    <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                                        Daftar Titik Laporan
                                    </h2>
                                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-950 dark:text-emerald-300">
                                        {filteredReports.length}
                                    </span>
                                </div>
                                <p className="text-[11px] text-neutral-500 mt-0.5">
                                    Klik baris untuk memusatkan posisi kamera peta.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowReportsList(false)}
                                className="size-7 rounded-xl flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-white transition-colors"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* Search in Drawer */}
                        <div className="p-3 border-b border-neutral-100 dark:border-neutral-800">
                            <input
                                type="text"
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                                placeholder="Cari nama lokasi atau kode..."
                                className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#0c4e33] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                            />
                        </div>

                        {/* Reports List */}
                        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800 p-2">
                            {filteredReports.length === 0 ? (
                                <div className="py-12 text-center text-xs text-neutral-400">
                                    Tidak ada laporan yang sesuai pencarian.
                                </div>
                            ) : (
                                filteredReports.map((rep) => {
                                    const isFocused = selectedReportForFocus?.id === rep.id;
                                    return (
                                        <div
                                            key={rep.id}
                                            onClick={() => setSelectedReportForFocus(rep)}
                                            className={`p-3 rounded-xl cursor-pointer transition-colors text-left ${
                                                isFocused
                                                    ? 'bg-emerald-50/80 border border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-700'
                                                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                                                    {rep.title.replace(/^\[(BERAT|SEDANG|RINGAN)\]\s*/i, '')}
                                                </h3>
                                                <StatusBadge status={rep.report_status} label={rep.status_label} size="sm" />
                                            </div>
                                            <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-500">
                                                <span className="font-mono font-bold text-neutral-700 dark:text-neutral-300">
                                                    {rep.tracking_code}
                                                </span>
                                                <span className="truncate max-w-[160px]">
                                                    {rep.regency_city || rep.province}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/80 text-[10px]">
                                                <span className="font-mono text-neutral-400">
                                                    {rep.latitude.toFixed(4)}, {rep.longitude.toFixed(4)}
                                                </span>
                                                <Link
                                                    href={`/laporan-publik/${rep.tracking_code}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1 font-bold text-[#0c4e33] hover:underline dark:text-emerald-400"
                                                >
                                                    <span>Detail</span>
                                                    <ArrowRight className="size-2.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
