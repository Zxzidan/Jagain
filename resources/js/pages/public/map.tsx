import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import { Filter, Layers, MapPin, Eye, RotateCcw } from 'lucide-react';

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
            <Head title="Peta Sebaran Karhutla — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            {/* Header / Filter Toolbar */}
            <div className="bg-[#F3F7F4] border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-[#171C19] flex items-center gap-2">
                            <Layers className="size-5 text-[#216B49]" />
                            Peta Sebaran Karhutla Kalimantan
                        </h1>
                        <p className="text-xs text-[#68716B] mt-0.5">
                            Menampilkan {reports.length} laporan warga terverifikasi & {displayedObservations.length} observasi satelit
                        </p>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Province Select */}
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="text-xs bg-white border border-[#DDE3DE] rounded-md px-3 py-1.5 text-[#171C19] focus:outline-none focus:ring-1 focus:ring-[#216B49]"
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
                            className="text-xs bg-white border border-[#DDE3DE] rounded-md px-3 py-1.5 text-[#171C19] focus:outline-none focus:ring-1 focus:ring-[#216B49]"
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
                            className="text-xs bg-white border border-[#DDE3DE] rounded-md px-3 py-1.5 text-[#171C19] focus:outline-none focus:ring-1 focus:ring-[#216B49]"
                        >
                            <option value="">Semua Status</option>
                            <option value="SUBMITTED">Baru Dikirim</option>
                            <option value="UNDER_REVIEW">Sedang Ditinjau</option>
                            <option value="VERIFIED">Terverifikasi</option>
                            <option value="DISPATCHED">Ditugaskan ke OPD</option>
                            <option value="RESOLVED_VERIFIED">Selesai Terverifikasi</option>
                        </select>

                        <button
                            type="button"
                            onClick={handleApplyFilter}
                            className="px-3 py-1.5 text-xs font-semibold bg-[#216B49] text-white rounded-md hover:bg-[#174B35] transition-colors"
                        >
                            Terapkan
                        </button>

                        {(selectedProvince || selectedCategory || selectedStatus) && (
                            <button
                                type="button"
                                onClick={handleResetFilter}
                                className="p-1.5 text-xs text-[#68716B] hover:text-[#171C19] rounded-md border border-[#DDE3DE] bg-white"
                                title="Reset Filter"
                            >
                                <RotateCcw className="size-3.5" />
                            </button>
                        )}

                        {/* Satellite Hotspot Layer Toggle */}
                        <label className="flex items-center gap-1.5 text-xs text-[#343B36] ml-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={showSatelliteHotspots}
                                onChange={(e) => setShowSatelliteHotspots(e.target.checked)}
                                className="rounded text-[#216B49] focus:ring-[#216B49]"
                            />
                            <span>Layer Satelit ({observations.length})</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Main Map View & Side Panel */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left 3 cols: Full Interactive Map */}
                    <div className="lg:col-span-3 flex flex-col">
                        <KarhutlaMap
                            reports={reports}
                            observations={displayedObservations}
                            selectedCoordinates={
                                selectedReportForFocus
                                    ? { lat: selectedReportForFocus.latitude, lng: selectedReportForFocus.longitude }
                                    : null
                            }
                            height="620px"
                        />
                    </div>

                    {/* Right 1 col: Laporan List Sidebar */}
                    <div className="lg:col-span-1 flex flex-col h-[620px] bg-[#F3F7F4] border border-[#DDE3DE] rounded-xl p-4 overflow-hidden">
                        <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE] mb-3">
                            <h2 className="text-xs font-bold text-[#171C19] uppercase tracking-wider">
                                Laporan Terfilter ({reports.length})
                            </h2>
                            <span className="text-[11px] text-[#68716B]">Klik untuk fokus</span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                            {reports.length === 0 ? (
                                <div className="text-center py-12 text-xs text-[#68716B]">
                                    Tidak ada laporan yang sesuai dengan kriteria filter saat ini.
                                </div>
                            ) : (
                                reports.map((rep) => {
                                    const isSelected = selectedReportForFocus?.id === rep.id;
                                    return (
                                        <div
                                            key={rep.id}
                                            onClick={() => setSelectedReportForFocus(rep)}
                                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'bg-white border-[#216B49] shadow-sm ring-1 ring-[#216B49]'
                                                    : 'bg-white border-[#DDE3DE] hover:border-[#68716B]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-mono text-[10px] text-[#68716B]">
                                                    {rep.tracking_code}
                                                </span>
                                                <StatusBadge status={rep.report_status} label={rep.status_label} size="sm" />
                                            </div>
                                            <div className="font-semibold text-xs text-[#171C19] line-clamp-1 mb-1">
                                                {rep.title}
                                            </div>
                                            <div className="text-[11px] text-[#68716B] flex items-center gap-1 mb-2">
                                                <MapPin className="size-3 text-[#216B49] shrink-0" />
                                                <span className="truncate">{rep.regency_city}, {rep.province}</span>
                                            </div>
                                            <div className="pt-2 border-t border-[#DDE3DE] flex items-center justify-between text-[11px]">
                                                <span className="text-[#68716B]">
                                                    {rep.category?.name || 'Umum'}
                                                </span>
                                                <a
                                                    href={`/laporan-publik/${rep.tracking_code}`}
                                                    className="font-semibold text-[#216B49] hover:underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Detail
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
