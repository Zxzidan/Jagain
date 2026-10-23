import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import AnimatedList from '@/components/react-bits/AnimatedList';
import { MapPin, RotateCcw, Satellite, ArrowRight, ShieldAlert, Filter, ChevronDown, Activity, Flame } from 'lucide-react';

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
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#10e57a] selection:text-black font-sans antialiased">
            <Head title="Peta Sebaran Karhutla Kalimantan — JAGAIN" />
            <Navbar />

            <main className="flex-1 pb-24 pt-20">
                {/* Header & Filter Strip */}
                <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-neutral-100">
                    <AnimatedContent distance={25} duration={0.8} threshold={0.1}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight">
                                    Peta Sebaran Karhutla
                                </h1>
                                <p className="text-sm text-neutral-500 mt-2 font-medium max-w-2xl leading-relaxed">
                                    Menampilkan <span className="font-bold text-neutral-900 tabular-nums">{reports.length}</span> laporan warga terverifikasi &{' '}
                                    <span className="font-bold text-emerald-600 tabular-nums">{displayedObservations.length}</span> anomali termal satelit FIRMS.
                                </p>
                            </div>

                            {/* Satellite Hotspot Layer Toggle */}
                            <label className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/90 rounded-full text-xs font-semibold text-neutral-800 cursor-pointer select-none transition-all shrink-0 shadow-xs">
                                <input
                                    type="checkbox"
                                    checked={showSatelliteHotspots}
                                    onChange={(e) => setShowSatelliteHotspots(e.target.checked)}
                                    className="accent-[#10e57a] size-4 rounded cursor-pointer"
                                />
                                <Satellite className="size-4 text-emerald-600" />
                                <span>Layer Satelit FIRMS ({observations.length})</span>
                            </label>
                        </div>

                        {/* Filter Bar with Pill Elements */}
                        <div className="flex flex-wrap items-center gap-2.5 font-sans text-xs">
                            <div className="relative">
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    className="appearance-none bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 rounded-full pl-4 pr-9 py-2.5 text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer font-medium text-xs transition-colors shadow-xs"
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

                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="appearance-none bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 rounded-full pl-4 pr-9 py-2.5 text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer font-medium text-xs transition-colors shadow-xs"
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

                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="appearance-none bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 rounded-full pl-4 pr-9 py-2.5 text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer font-medium text-xs transition-colors shadow-xs"
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
                                className="bg-[#10e57a] hover:bg-[#0ba856] text-black font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer ml-auto sm:ml-0"
                            >
                                <Filter className="size-3.5" />
                                <span>Terapkan Filter</span>
                            </button>

                            {(selectedProvince || selectedCategory || selectedStatus) && (
                                <button
                                    type="button"
                                    onClick={handleResetFilter}
                                    className="px-4 py-2.5 text-xs text-neutral-600 hover:text-black border border-neutral-200 bg-white rounded-full hover:bg-neutral-100 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                                    title="Reset Filter"
                                >
                                    <RotateCcw className="size-3.5" />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                    </AnimatedContent>
                </section>

                {/* Main Geospatial Registry Area */}
                <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <AnimatedContent distance={30} duration={0.9} threshold={0.1}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Map Container: 8 cols */}
                            <div className="lg:col-span-8 rounded-3xl p-2 bg-neutral-50/70 border border-neutral-200/80 shadow-sm relative">
                                <KarhutlaMap
                                    reports={reports}
                                    observations={displayedObservations}
                                    selectedCoordinates={
                                        selectedReportForFocus
                                            ? { lat: selectedReportForFocus.latitude, lng: selectedReportForFocus.longitude }
                                            : null
                                    }
                                    height="680px"
                                    className="rounded-2xl border-0 w-full"
                                />
                            </div>

                            {/* Sidebar Registry: 4 cols */}
                            <div className="lg:col-span-4 bg-white border border-neutral-200/90 rounded-3xl flex flex-col h-[696px] p-5 sm:p-6 font-sans shadow-sm">
                                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-2">
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900">
                                                Daftar Titik Laporan
                                            </h2>
                                        </div>
                                        <span className="text-xs text-neutral-400 block font-medium">
                                            Klik baris untuk memusatkan peta
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 tabular-nums">
                                        {reports.length} Titik
                                    </span>
                                </div>

                                <div className="flex-1 min-h-0 pt-2">
                                    {reports.length === 0 ? (
                                        <div className="text-center py-24 text-xs text-neutral-400 px-4 space-y-3">
                                            <ShieldAlert className="size-8 mx-auto text-neutral-400" />
                                            <p className="font-medium">Tidak ada laporan yang sesuai dengan kriteria filter saat ini.</p>
                                            <button
                                                type="button"
                                                onClick={handleResetFilter}
                                                className="text-xs font-bold text-emerald-700 hover:underline"
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
                                            maxHeight={580}
                                            frame={false}
                                            showGradients={true}
                                            displayScrollbar={true}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </section>
            </main>

            <Footer />
        </div>
    );
}
