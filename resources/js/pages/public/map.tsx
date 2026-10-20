import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import { Filter, Layers, MapPin, Eye, RotateCcw, Satellite, ArrowRight, ShieldAlert } from 'lucide-react';

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

    return (
        <div className="min-h-screen flex flex-col bg-white text-[#171C19]">
            <Head title="Peta Sebaran Karhutla Kalimantan — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            {/* Filter Toolbar Header */}
            <div className="bg-[#F3F7F4] border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#216B49] mb-1">
                            <Layers className="size-3.5" />
                            <span>Sistem Informasi Geospasial</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] tracking-tight">
                            Peta Sebaran Karhutla Kalimantan
                        </h1>
                        <p className="text-xs text-[#68716B] mt-0.5">
                            Menampilkan <span className="font-semibold text-[#174B35] font-mono">{reports.length}</span> laporan warga terverifikasi &{' '}
                            <span className="font-semibold text-amber-700 font-mono">{displayedObservations.length}</span> titik observasi satelit
                        </p>
                    </div>

                    {/* Filter Controls Bar */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Province Select */}
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="text-xs bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-[#171C19] focus:outline-none focus:ring-2 focus:ring-[#216B49] shadow-xs"
                        >
                            <option value="">Semua Provinsi</option>
                            {provinces.map((prov) => (
                                <option key={prov} value={prov}>
                                    {prov}
                                </option>
                            ))}
                        </select>

                        {/* Category Select */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-xs bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-[#171C19] focus:outline-none focus:ring-2 focus:ring-[#216B49] shadow-xs"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.slug}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Status Select */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="text-xs bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-[#171C19] focus:outline-none focus:ring-2 focus:ring-[#216B49] shadow-xs"
                        >
                            <option value="">Semua Status Laporan</option>
                            <option value="SUBMITTED">Baru Dikirim</option>
                            <option value="UNDER_REVIEW">Sedang Ditinjau</option>
                            <option value="VERIFIED">Terverifikasi</option>
                            <option value="DISPATCHED">Ditugaskan ke OPD</option>
                            <option value="RESOLVED_VERIFIED">Selesai Terverifikasi</option>
                        </select>

                        <button
                            type="button"
                            onClick={handleApplyFilter}
                            className="px-4 py-2 text-xs font-semibold bg-[#216B49] hover:bg-[#174B35] text-white rounded-lg shadow-xs active:scale-[0.98] transition-all"
                        >
                            Terapkan
                        </button>

                        {(selectedProvince || selectedCategory || selectedStatus) && (
                            <button
                                type="button"
                                onClick={handleResetFilter}
                                className="p-2 text-xs text-[#68716B] hover:text-[#171C19] rounded-lg border border-[#DDE3DE] bg-white hover:bg-[#F3F7F4] shadow-xs"
                                title="Reset Filter"
                            >
                                <RotateCcw className="size-3.5" />
                            </button>
                        )}

                        {/* Satellite Hotspot Toggle Pill */}
                        <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#DDE3DE] text-xs text-[#343B36] cursor-pointer select-none shadow-xs hover:bg-[#F3F7F4] transition-colors ml-1">
                            <input
                                type="checkbox"
                                checked={showSatelliteHotspots}
                                onChange={(e) => setShowSatelliteHotspots(e.target.checked)}
                                className="rounded text-[#216B49] focus:ring-[#216B49]"
                            />
                            <Satellite className="size-3.5 text-amber-600" />
                            <span>Layer Satelit ({observations.length})</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Main Map & Side Feed Panel */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left 3 cols: Full Interactive Map */}
                    <div className="lg:col-span-3 flex flex-col rounded-2xl border border-[#DDE3DE] overflow-hidden shadow-xs">
                        <KarhutlaMap
                            reports={reports}
                            observations={displayedObservations}
                            selectedCoordinates={
                                selectedReportForFocus
                                    ? { lat: selectedReportForFocus.latitude, lng: selectedReportForFocus.longitude }
                                    : null
                            }
                            height="640px"
                        />
                    </div>

                    {/* Right 1 col: Laporan List Sidebar */}
                    <div className="lg:col-span-1 flex flex-col h-[640px] bg-[#F3F7F4] border border-[#DDE3DE] rounded-2xl p-4 overflow-hidden shadow-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE] mb-3">
                            <div>
                                <h2 className="text-xs font-bold text-[#171C19] uppercase tracking-wider">
                                    Laporan Terfilter
                                </h2>
                                <span className="text-[10px] text-[#68716B]">Klik kartu untuk fokus pada peta</span>
                            </div>
                            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-white border border-[#DDE3DE] text-[#216B49]">
                                {reports.length}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                            {reports.length === 0 ? (
                                <div className="text-center py-16 text-xs text-[#68716B] px-4 space-y-2">
                                    <ShieldAlert className="size-8 mx-auto text-[#68716B]/50" />
                                    <p>Tidak ada laporan yang sesuai dengan kriteria filter saat ini.</p>
                                    <button
                                        type="button"
                                        onClick={handleResetFilter}
                                        className="text-[11px] font-semibold text-[#216B49] underline"
                                    >
                                        Reset seluruh filter
                                    </button>
                                </div>
                            ) : (
                                reports.map((rep) => {
                                    const isSelected = selectedReportForFocus?.id === rep.id;
                                    return (
                                        <div
                                            key={rep.id}
                                            onClick={() => setSelectedReportForFocus(rep)}
                                            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'bg-white border-[#216B49] shadow-sm ring-1 ring-[#216B49]'
                                                    : 'bg-white border-[#DDE3DE] hover:border-[#68716B] hover:shadow-xs'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-1 mb-2">
                                                <span className="font-mono text-[10px] text-[#68716B] bg-[#F3F7F4] px-1.5 py-0.5 rounded border border-[#DDE3DE]">
                                                    {rep.tracking_code}
                                                </span>
                                                <StatusBadge status={rep.report_status} label={rep.status_label} size="sm" />
                                            </div>

                                            <div className="font-semibold text-xs text-[#171C19] line-clamp-1 mb-1 leading-snug">
                                                {rep.title}
                                            </div>

                                            <div className="text-[11px] text-[#68716B] flex items-center gap-1.5 mb-2.5">
                                                <MapPin className="size-3 text-[#216B49] shrink-0" />
                                                <span className="truncate">{rep.regency_city}, {rep.province}</span>
                                            </div>

                                            <div className="pt-2 border-t border-[#DDE3DE]/60 flex items-center justify-between text-[11px]">
                                                <span className="text-[#68716B] truncate max-w-[100px]">
                                                    {rep.category?.name || 'Umum'}
                                                </span>
                                                <a
                                                    href={`/laporan-publik/${rep.tracking_code}`}
                                                    className="font-semibold text-[#216B49] hover:text-[#174B35] inline-flex items-center gap-0.5"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span>Lihat Detail</span>
                                                    <ArrowRight className="size-3" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
