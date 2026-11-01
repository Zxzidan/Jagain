import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Satellite, Flame } from 'lucide-react';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import type { BreadcrumbItem } from '@/types';

interface AdminMapProps {
    reports: MapReport[];
    observations: MapObservation[];
}

export default function AdminMapPage({
    reports = [],
    observations = [],
}: AdminMapProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pusat Kendali', href: '/admin/dashboard' },
        { title: 'Peta Karhutla', href: '/admin/map' },
    ];

    const [showSatelliteHotspots, setShowSatelliteHotspots] = useState(true);
    const displayedObservations = showSatelliteHotspots ? observations : [];

    return (
        <>
            <Head title="Peta Sebaran Karhutla - Pusat Kendali JAGAIN" />

            <div className="relative w-full h-[calc(100vh-4rem)] flex-1 overflow-hidden bg-neutral-100 flex flex-col">
                {/* Floating Quick Controls Overlay */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[500] flex items-center gap-2 pointer-events-auto">
                    {/* Hotspot Count Pill */}
                    <div className="hidden sm:inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200/80 shadow-md text-xs font-semibold text-neutral-800 dark:bg-neutral-900/95 dark:border-neutral-700 dark:text-neutral-200">
                        <Flame className="size-3.5 text-emerald-600" />
                        <span>{reports.length} Laporan Warga</span>
                    </div>

                    {/* Satellite Layer Switch Pill */}
                    {observations.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowSatelliteHotspots((v) => !v)}
                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-md text-xs font-semibold transition-all cursor-pointer backdrop-blur-md ${
                                showSatelliteHotspots
                                    ? 'bg-white/95 border-orange-300 text-orange-950 dark:bg-neutral-900/95 dark:border-orange-800 dark:text-orange-300'
                                    : 'bg-white/80 border-neutral-200 text-neutral-500 dark:bg-neutral-900/80 dark:border-neutral-700'
                            }`}
                        >
                            <Satellite className="size-3.5 text-orange-500" />
                            <span>Layer Satelit ({observations.length})</span>
                            <span
                                className={`relative inline-block h-3.5 w-6 rounded-full transition-colors ${
                                    showSatelliteHotspots ? 'bg-orange-500' : 'bg-neutral-300 dark:bg-neutral-600'
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 size-2.5 rounded-full bg-white transition-transform ${
                                        showSatelliteHotspots ? 'translate-x-2.5' : 'translate-x-0'
                                    }`}
                                />
                            </span>
                        </button>
                    )}
                </div>

                {/* Pure Full-Area Map */}
                <KarhutlaMap
                    reports={reports}
                    observations={displayedObservations}
                    reportUrlPrefix="/admin/reports"
                    height="100%"
                    minHeight="100%"
                    showLegend={true}
                    showSimulatedNotice={false}
                    className="h-full w-full rounded-none border-0 flex-1"
                />
            </div>
        </>
    );
}
