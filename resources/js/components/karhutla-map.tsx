import { useEffect, useRef } from 'react';
import type * as LeafletType from 'leaflet';
import { Info, AlertTriangle } from 'lucide-react';

export interface MapReport {
    id: number;
    tracking_code: string;
    title: string;
    category?: { name: string; slug?: string } | null;
    latitude: number;
    longitude: number;
    province: string;
    regency_city: string;
    location_description: string;
    report_status: string;
    status_label: string;
    fire_condition?: string;
    fire_condition_label?: string;
    reported_occurrence_at?: string | null;
    is_simulated?: boolean;
}

export interface MapObservation {
    id: number;
    external_record_id?: string | null;
    satellite_instrument: string;
    confidence_level: string;
    brightness_kelvin?: number | null;
    frp_mw?: number | null;
    latitude: number;
    longitude: number;
    province?: string | null;
    regency_city?: string | null;
    observed_at: string;
    is_simulated: boolean;
    data_source: {
        name: string;
        attribution: string;
        source_type: string;
    };
}

interface KarhutlaMapProps {
    reports?: MapReport[];
    observations?: MapObservation[];
    interactiveSelectMode?: boolean;
    selectedCoordinates?: { lat: number; lng: number } | null;
    onSelectCoordinates?: (coords: { lat: number; lng: number }) => void;
    className?: string;
    height?: string;
    minHeight?: string;
    showLegend?: boolean;
    showSimulatedNotice?: boolean;
}

export default function KarhutlaMap({
    reports = [],
    observations = [],
    interactiveSelectMode = false,
    selectedCoordinates = null,
    onSelectCoordinates,
    className = '',
    height = '500px',
    minHeight,
    showLegend = true,
    showSimulatedNotice = true,
}: KarhutlaMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<LeafletType.Map | null>(null);
    const markersLayerRef = useRef<LeafletType.LayerGroup | null>(null);
    const selectedMarkerRef = useRef<LeafletType.Marker | null>(null);

    const hasSimulatedData = reports.some(r => r.is_simulated) || observations.some(o => o.is_simulated);

    useEffect(() => {
        if (!mapContainerRef.current || typeof window === 'undefined') return;

        let isMounted = true;
        let timer: any = null;
        let resizeObserver: ResizeObserver | null = null;

        import('leaflet').then((leafletModule) => {
            if (!isMounted || !mapContainerRef.current) return;
            const L = (leafletModule.default || leafletModule) as typeof LeafletType;

            // Initialize Map centered on Kalimantan
            if (!mapInstanceRef.current) {
                const initialLat = selectedCoordinates ? selectedCoordinates.lat : -0.7893;
                const initialLng = selectedCoordinates ? selectedCoordinates.lng : 113.9213;
                const initialZoom = selectedCoordinates ? 10 : 6;

                const map = L.map(mapContainerRef.current, {
                    center: [initialLat, initialLng],
                    zoom: initialZoom,
                    minZoom: 5,
                    maxZoom: 17,
                    attributionControl: true,
                });

                // ESRI World Light Gray Canvas & Reference for modern, keyless, watermark-free map
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | JAGAIN',
                    maxZoom: 16,
                }).addTo(map);

                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
                    maxZoom: 16,
                }).addTo(map);

                const markersLayer = L.layerGroup().addTo(map);
                markersLayerRef.current = markersLayer;
                mapInstanceRef.current = map;

                // Handle Click for coordinate picker mode
                if (interactiveSelectMode && onSelectCoordinates) {
                    map.on('click', (e: LeafletType.LeafletMouseEvent) => {
                        const { lat, lng } = e.latlng;
                        onSelectCoordinates({
                            lat: parseFloat(lat.toFixed(6)),
                            lng: parseFloat(lng.toFixed(6)),
                        });
                    });
                }
            }

        const map = mapInstanceRef.current;
        const layer = markersLayerRef.current;

        if (!map || !layer) return;

        // Auto-fit to Kalimantan and active reports
        if (reports.length > 0 && !selectedCoordinates) {
            const latLngs = reports.map(r => [r.latitude, r.longitude] as [number, number]);
            const bounds = L.latLngBounds(latLngs);
            // Ensure island bounds remain comfortably visible
            bounds.extend([-3.8, 109.2]);
            bounds.extend([1.5, 117.8]);
            map.fitBounds(bounds, { padding: [25, 25], maxZoom: 7 });
        } else if (!selectedCoordinates) {
            map.setView([-1.2, 114.0], 6);
        }

        // Clear existing markers
        layer.clearLayers();

        // Icon Generators (Clean, professional GIS markers - NO tacky AI droplet icons or neon glows)
        const createCitizenIcon = (status: string) => {
            const isVerified = ['VERIFIED', 'DISPATCHED', 'RESOLUTION_REVIEW', 'RESOLVED_VERIFIED'].includes(status);
            const pinColor = isVerified ? '#10e57a' : '#171717';
            const innerColor = isVerified ? '#0a0a0a' : '#ffffff';

            return L.divIcon({
                className: 'custom-map-pin',
                html: `
                    <div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${pinColor}; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                        <div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${innerColor};"></div>
                    </div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                popupAnchor: [0, -10],
            });
        };

        const createSatelliteIcon = () => {
            return L.divIcon({
                className: 'custom-map-pin-sat',
                html: `
                    <div style="width: 16px; height: 16px; border-radius: 50%; background-color: #f97316; border: 2px solid #ffffff; box-shadow: 0 1px 4px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center;">
                        <div style="width: 4px; height: 4px; border-radius: 50%; background-color: #ffffff;"></div>
                    </div>
                `,
                iconSize: [16, 16],
                iconAnchor: [8, 8],
                popupAnchor: [0, -8],
            });
        };

        const createSelectedPickerIcon = () => {
            return L.divIcon({
                className: 'custom-selected-pin',
                html: `
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #10e57a; border: 3px solid #000000; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #000000;"></div>
                    </div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
                popupAnchor: [0, -12],
            });
        };

        // Invalidate map size after rendering to avoid blank/collapsed tiles
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 200);

        // Render Reports
        reports.forEach((rep) => {
            const marker = L.marker([rep.latitude, rep.longitude], {
                icon: createCitizenIcon(rep.report_status),
            });

            const popupContent = `
                <div style="min-width: 240px; font-family: Inter, sans-serif; font-size: 12px; color: #111827; background: #ffffff; padding: 14px; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #111827; font-family: monospace; background: #e5e7eb; padding: 2px 8px; border-radius: 9999px;">
                            ${rep.tracking_code}
                        </span>
                        <span style="font-size: 11px; color: #6b7280; font-weight: 500;">
                            ${rep.regency_city}
                        </span>
                    </div>
                    <div style="font-size: 13px; font-weight: 800; color: #111827; margin-bottom: 8px; line-height: 1.3;">
                        ${rep.title}
                    </div>
                    <div style="background: #f9fafb; padding: 8px 10px; border-radius: 12px; margin-bottom: 10px; border: 1px solid #f3f4f6;">
                        <div style="font-weight: 600; color: #111827; font-size: 11px;">Status: ${rep.status_label}</div>
                        ${rep.fire_condition_label ? `<div style="font-size: 10px; color: #4b5563; margin-top: 2px; font-weight: 500;">Kondisi: ${rep.fire_condition_label}</div>` : ''}
                    </div>
                    <a href="/laporan-publik/${rep.tracking_code}" style="display: block; text-align: center; background: #111827; color: #ffffff; padding: 7px 14px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 11px;">
                        Lihat Register Publik →
                    </a>
                </div>
            `;

            marker.bindPopup(popupContent);
            layer.addLayer(marker);
        });

        // Render Satellite Observations (Hotspots)
        observations.forEach((obs) => {
            const marker = L.marker([obs.latitude, obs.longitude], {
                icon: createSatelliteIcon(),
            });

            const simulationBadge = obs.is_simulated
                ? `<div style="display: inline-block; background: #f3f4f6; border: 1px solid #e5e7eb; color: #111827; font-weight: 700; font-size: 9px; padding: 2px 6px; border-radius: 9999px; margin-bottom: 6px;">
                     DATA SIMULASI
                   </div>`
                : '';

            const popupContent = `
                <div style="min-width: 230px; font-family: Inter, sans-serif; font-size: 12px; color: #111827; background: #ffffff; padding: 14px; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
                    ${simulationBadge}
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #111827; margin-bottom: 4px; font-family: monospace;">
                        Titik Panas Satelit • ${obs.satellite_instrument}
                    </div>
                    <div style="font-size: 13px; font-weight: 800; color: #111827; margin-bottom: 8px;">
                        Deteksi Suhu Termal Radiatif
                    </div>
                    <div style="background: #f9fafb; border: 1px solid #f3f4f6; padding: 8px; border-radius: 12px; margin-bottom: 8px; font-size: 11px; color: #374151;">
                        <div>Tingkat Kepercayaan: <strong style="color: #111827;">${obs.confidence_level}</strong></div>
                        ${obs.frp_mw ? `<div>Daya Radiasi (FRP): <strong>${obs.frp_mw} MW</strong></div>` : ''}
                        ${obs.brightness_kelvin ? `<div>Suhu Kecerahan: <strong>${obs.brightness_kelvin} K</strong></div>` : ''}
                        <div style="font-size: 10px; color: #6b7280; margin-top: 2px;">Waktu: ${new Date(obs.observed_at).toLocaleString('id-ID')}</div>
                    </div>
                    <div style="font-size: 10px; color: #6b7280; line-height: 1.3;">
                        Sumber: ${obs.data_source.name}
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent);
            layer.addLayer(marker);
        });

        // Render interactive Selected Coordinates Pin
        if (selectedCoordinates) {
            if (selectedMarkerRef.current) {
                layer.removeLayer(selectedMarkerRef.current);
            }
            const selMarker = L.marker([selectedCoordinates.lat, selectedCoordinates.lng], {
                icon: createSelectedPickerIcon(),
            });
            selMarker.bindPopup(`<strong>Titik Dipilih</strong><br/>Lat: ${selectedCoordinates.lat}<br/>Lng: ${selectedCoordinates.lng}`).openPopup();
            layer.addLayer(selMarker);
            selectedMarkerRef.current = selMarker;
        }

        // ResizeObserver to ensure map properly measures and never centers in ocean
        if (mapContainerRef.current) {
            resizeObserver = new ResizeObserver(() => {
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.invalidateSize();
                }
            });
            resizeObserver.observe(mapContainerRef.current);
        }
        });

        return () => {
            isMounted = false;
            if (timer) {
                clearTimeout(timer);
            }
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [reports, observations, selectedCoordinates, interactiveSelectMode]);

    return (
        <div className={`relative flex flex-col overflow-hidden bg-neutral-100 ${className || 'border border-neutral-200 rounded-3xl'}`}>
            {/* Simulation Warning Banner if simulated data is visible */}
            {hasSimulatedData && showSimulatedNotice && (
                <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2 flex items-center justify-between text-xs text-neutral-700 z-20 font-sans">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="size-3.5 text-neutral-800" />
                        <span>
                            <strong>Transparansi Data:</strong> Sebagian titik di peta merupakan <span className="font-semibold underline">DATA SIMULASI</span> berlabel untuk tujuan pengujian sistem.
                        </span>
                    </div>
                    <span className="hidden sm:inline-block text-[11px] text-neutral-500 font-sans font-semibold">
                        Validasi Mandiri
                    </span>
                </div>
            )}

            {/* Map Container */}
            <div ref={mapContainerRef} style={{ height, width: '100%', minHeight: minHeight ?? (height ? 'auto' : '350px') }} className="z-10 focus:outline-none" />

            {/* Interactive Mode Helper overlay */}
            {interactiveSelectMode && (
                <div className="absolute top-12 left-4 z-20 bg-white/95 border border-neutral-200 px-3.5 py-2 rounded-xl text-xs text-neutral-800 shadow-md font-sans">
                    Klik pada peta untuk menandai titik koordinat kejadian
                </div>
            )}

            {/* Map Legend */}
            {showLegend && (
                <div className="bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-4 sm:px-6 py-3 text-xs text-neutral-700 flex flex-wrap items-center justify-between gap-3 z-20 font-sans">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                        <span className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Keterangan:</span>
                        <div className="flex items-center gap-1.5 bg-neutral-100/80 px-2.5 py-1 rounded-full border border-neutral-200/70">
                            <span className="size-2 rounded-full bg-[#10e57a] ring-2 ring-emerald-500/30 animate-pulse" />
                            <span className="font-semibold text-neutral-800 text-[11px]">Laporan Terverifikasi</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-neutral-100/80 px-2.5 py-1 rounded-full border border-neutral-200/70">
                            <span className="size-2 rounded-full bg-neutral-500 ring-2 ring-neutral-400/20" />
                            <span className="font-semibold text-neutral-800 text-[11px]">Laporan Baru</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-neutral-100/80 px-2.5 py-1 rounded-full border border-neutral-200/70">
                            <span className="size-2 rounded-full bg-neutral-900 ring-2 ring-neutral-700/20" />
                            <span className="font-semibold text-neutral-800 text-[11px]">Titik Panas Satelit</span>
                        </div>
                    </div>

                    <div className="text-[11px] text-neutral-600 flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-full border border-neutral-200/70 font-medium">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        <span>Cakupan: 5 Provinsi Kalimantan</span>
                    </div>
                </div>
            )}
        </div>
    );
}
