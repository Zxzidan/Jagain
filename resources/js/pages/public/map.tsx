import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import AnimatedList from '@/components/react-bits/AnimatedList';
import { RotateCcw, Satellite, ArrowRight, ShieldAlert, Filter, ChevronDown, Flame } from 'lucide-react';

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
    reports,
    observations,
    categories,
    provinces,
    filters,
}: MapPageProps) {
    const [selectedProvince, setSelectedProvince] = useState(filters.province || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [showSatelliteHotspots, setShowSatelliteHotspots] = useState(true);
    const [selectedReportForFocus, setSelectedReportForFocus] = useState<MapReport | null>(null);

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

    const mapReportItems = reports.map((rep) => ({
        id: rep.id,
        tracking_code: rep.tracking_code,
        icon: <Flame className="size-4 text-emerald-600" />,
        title: rep.title,
        description: (
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span className="font-mono font-bold text-neutral-700 text-[11px]">{rep.tracking_code}</span>
                <span>•</span>
                <span className="truncate">{rep.regency_city}, {rep.province}</span>
            </span>
        ),
        meta: (
            <div className="flex items-center gap-1.5">
                <StatusBadge status={rep.report_status} label={rep.status_label} size="sm" />
                <Link
                    href={`/laporan-publik/${rep.tracking_code}`}
                    onClick={(e) => e.stopPropagation()}
                    className="size-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black flex items-center justify-center transition-colors shrink-0"
                    title="Buka Detail Laporan"
                >
                    <ArrowRight className="size-3" />
                </Link>
            </div>
        ),
        report: rep,
    }));

    return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#10e57a] selection:text-black font-sans antialiased overflow-x-hidden w-full max-w-full">
            <Head title="Peta Sebaran Karhutla Kalimantan — JAGAIN" />
            <Navbar />

            <main className="flex-1 pb-24 pt-20">
                {/* Header & Filter Strip */}
                <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-neutral-100">
                    <AnimatedContent distance={25} duration={0.8} threshold={0.1}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <p className="font-mono text-[11px] text-neutral-400 tracking-wide mb-1">
                                    01 / Observasi Geospasial
                                </p>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight">
                                    Peta Sebaran Karhutla
                                    <span className="text-neutral-400"> Kalimantan.</span>
                                </h1>
                                <p className="text-sm text-neutral-500 mt-2 font-medium max-w-2xl leading-relaxed">
                                    Menampilkan <span className="font-bold text-neutral-900 tabular-nums">{reports.length}</span> laporan warga terverifikasi &{' '}
                                    <span className="font-bold text-emerald-600 tabular-nums">{displayedObservations.length}</span> anomali termal satelit FIRMS.
                                </p>
                            </div>

                            {/* Satellite Hotspot Layer Switch (Matching Beranda) */}
                            {observations.length > 0 && (
                                <button
                                    id="toggle-satellite-layer"
                                    type="button"
                                    role="switch"
                                    aria-checked={showSatelliteHotspots}
                                    onClick={() => setShowSatelliteHotspots((v) => !v)}
                                    className="group inline-flex items-center gap-2.5 h-10 pl-3.5 pr-2 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-800 hover:border-neutral-300 active:scale-[0.98] transition-[transform,border-color] duration-200 cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
                                >
                                    <Satellite className="size-3.5 text-neutral-500" />
                                    <span>Layer Satelit ({observations.length})</span>
                                    <span
                                        className={`relative h-6 w-10 rounded-full transition-colors duration-300 ${
                                            showSatelliteHotspots ? 'bg-[#10e57a]' : 'bg-neutral-200'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                                showSatelliteHotspots ? 'translate-x-4' : 'translate-x-0'
                                            }`}
                                        />
                                    </span>
                                </button>
                            )}
                        </div>

                        {/* Filter Bar with Sleek Responsive Pill Elements */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 font-sans text-xs">
                            <div className="relative w-full sm:w-auto">
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    className="w-full sm:w-auto appearance-none bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 rounded-full pl-4 pr-9 py-2.5 text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer font-medium text-xs transition-colors shadow-xs"
                                >
                                    <option value="">Seluruh Provinsi Kalimantan</option>
                                    {provinces.map((prov) => (
                                        <option key={prov} value={prov} className="bg-white text-neutral-900">
                                            {prov}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="size-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full sm:w-auto appearance-none bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 rounded-full pl-4 pr-9 py-2.5 text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer font-medium text-xs transition-colors shadow-xs"
                                >
                                    <option value="">Seluruh Kategori Laporan</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.slug} className="bg-white text-neutral-900">
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="size-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full sm:w-auto appearance-none bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 rounded-full pl-4 pr-9 py-2.5 text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer font-medium text-xs transition-colors shadow-xs"
                                >
                                    <option value="">Seluruh Status Laporan</option>
                                    <option value="SUBMITTED">Baru Dikirim</option>
                                    <option value="UNDER_REVIEW">Sedang Ditinjau</option>
                                    <option value="VERIFIED">Terverifikasi</option>
                                    <option value="DISPATCHED">Ditugaskan ke OPD</option>
                                    <option value="RESOLVED_VERIFIED">Selesai Terverifikasi</option>
                                </select>
                                <ChevronDown className="size-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <button
                                type="button"
                                onClick={handleApplyFilter}
                                className="w-full sm:w-auto bg-[#10e57a] hover:bg-[#0ba856] text-black font-bold px-5 py-2.5 rounded-full text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer sm:ml-auto"
                            >
                                <Filter className="size-3.5" />
                                <span>Terapkan Filter</span>
                            </button>

                            {(selectedProvince || selectedCategory || selectedStatus) && (
                                <button
                                    type="button"
                                    onClick={handleResetFilter}
                                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black border border-neutral-200 bg-white rounded-full hover:bg-neutral-100 flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                                    title="Reset Filter"
                                >
                                    <RotateCcw className="size-3.5" />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </AnimatedContent>
                </section>

                {/* Main Geospatial Registry Area (Matching Beranda Map Structure) */}
                <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <AnimatedContent distance={30} duration={0.9} threshold={0.1}>
                        <div className="rounded-[28px] border border-neutral-200/80 bg-white p-3 sm:p-4 shadow-xs">
                            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-4 items-stretch">
                                {/* Left: Frameless Precision Map Column */}
                                <div className="flex flex-col min-w-0">
                                    <div className="relative flex-1 rounded-[20px] overflow-hidden ring-1 ring-neutral-200/80 bg-neutral-100 min-h-[380px] sm:min-h-[460px] lg:min-h-[580px]">
                                        <KarhutlaMap
                                            reports={reports}
                                            observations={displayedObservations}
                                            selectedCoordinates={
                                                selectedReportForFocus
                                                    ? { lat: selectedReportForFocus.latitude, lng: selectedReportForFocus.longitude }
                                                    : null
                                            }
                                            height="500px"
                                            minHeight="380px"
                                            showLegend={false}
                                            showSimulatedNotice={true}
                                            className="rounded-none border-0 w-full"
                                        />
                                    </div>

                                    {/* Bottom Info Strip matching Beranda */}
                                    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-3.5 px-1 text-[12px] text-neutral-500">
                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                                            <span className="inline-flex items-center gap-2">
                                                <span className="size-2 rounded-full bg-neutral-900" />
                                                <span className="font-semibold text-neutral-900 tabular-nums">{reports.length}</span>
                                                laporan warga
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <span className="size-2 rounded-full bg-[#10e57a]" />
                                                <span className="font-semibold text-neutral-900 tabular-nums">{displayedObservations.length}</span>
                                                anomali termal FIRMS
                                            </span>
                                            {selectedReportForFocus && (
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-800 bg-neutral-100 pl-2.5 pr-1.5 py-0.5 rounded-full">
                                                    <span>Fokus: {selectedReportForFocus.tracking_code}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedReportForFocus(null)}
                                                        className="size-4 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center text-[10px] cursor-pointer"
                                                        title="Hapus fokus kamera"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-neutral-400">Sumber: NASA FIRMS, BMKG, validasi publik</span>
                                    </div>
                                </div>

                                {/* Right: Clean White Sidebar Registry (Matching Beranda Right Panel) */}
                                <aside className="relative flex flex-col rounded-[20px] bg-white border border-neutral-200/80 text-neutral-950 p-5 sm:p-6 shadow-xs h-[640px]">
                                    <div className="pb-4 border-b border-neutral-100">
                                        <div className="flex items-center justify-between">
                                            <p className="font-mono text-[11px] text-neutral-400 tracking-wide">02 / Arsip Laporan</p>
                                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-neutral-800 border border-emerald-200/80 tabular-nums">
                                                {reports.length} Titik
                                            </span>
                                        </div>
                                        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] leading-tight text-neutral-950">
                                            Daftar Titik Laporan
                                        </h2>
                                        <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                                            Pilih baris laporan untuk memusatkan posisi kamera peta.
                                        </p>
                                    </div>

                                    <div className="flex-1 min-h-0 pt-3">
                                        {reports.length === 0 ? (
                                            <div className="text-center py-24 text-xs text-neutral-400 px-4 space-y-3">
                                                <ShieldAlert className="size-8 mx-auto text-neutral-400" />
                                                <p className="font-medium">Tidak ada laporan yang sesuai dengan kriteria filter saat ini.</p>
                                                <button
                                                    type="button"
                                                    onClick={handleResetFilter}
                                                    className="text-xs font-bold text-neutral-900 hover:text-black underline cursor-pointer"
                                                >
                                                    Reset seluruh filter
                                                </button>
                                            </div>
                                        ) : (
                                            <AnimatedList
                                                items={mapReportItems}
                                                onItemSelect={(item) => {
                                                    if (item?.report) {
                                                        setSelectedReportForFocus(item.report);
                                                    }
                                                }}
                                                animation="pop"
                                                theme="light"
                                                accentColor="#10e57a"
                                                radius={12}
                                                gap={8}
                                                width="100%"
                                                maxHeight={480}
                                                frame={false}
                                                showGradients={true}
                                                displayScrollbar={true}
                                            />
                                        )}
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </AnimatedContent>
                </section>
            </main>

            <Footer />
        </div>
    );
}
