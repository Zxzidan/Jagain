import { useEffect, useRef } from 'react';
import L from 'leaflet';
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
}

export default function KarhutlaMap({
    reports = [],
    observations = [],
    interactiveSelectMode = false,
    selectedCoordinates = null,
    onSelectCoordinates,
    className = '',
    height = '500px',
}: KarhutlaMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersLayerRef = useRef<L.LayerGroup | null>(null);
    const selectedMarkerRef = useRef<L.Marker | null>(null);

    const hasSimulatedData = reports.some(r => r.is_simulated) || observations.some(o => o.is_simulated);

    useEffect(() => {
        if (!mapContainerRef.current) return;

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

            // OpenStreetMap Standard Tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | JAGAIN Platform',
                maxZoom: 19,
            }).addTo(map);

            const markersLayer = L.layerGroup().addTo(map);
            markersLayerRef.current = markersLayer;
            mapInstanceRef.current = map;

            // Handle Click for coordinate picker mode
            if (interactiveSelectMode && onSelectCoordinates) {
                map.on('click', (e: L.LeafletMouseEvent) => {
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

        // Clear existing markers
        layer.clearLayers();

        // Icon Generators
        const createCitizenIcon = (status: string) => {
            const isVerified = ['VERIFIED', 'DISPATCHED', 'RESOLUTION_REVIEW', 'RESOLVED_VERIFIED'].includes(status);
            const bgColor = isVerified ? '#174B35' : '#343B36';

            return L.divIcon({
                className: 'custom-map-pin',
                html: `
                    <div style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.3); color: white; font-size: 13px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2c0 4-4 7-4 11a4 4 0 0 0 8 0c0-4-4-7-4-11z"/>
                        </svg>
                    </div>
                `,
                iconSize: [28, 28],
                iconAnchor: [14, 14],
                popupAnchor: [0, -14],
            });
        };

        const createSatelliteIcon = () => {
            return L.divIcon({
                className: 'custom-map-pin-sat',
                html: `
                    <div style="background-color: #D97706; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.3); color: white;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="2"/>
                            <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
                            <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
                        </svg>
                    </div>
                `,
                iconSize: [26, 26],
                iconAnchor: [13, 13],
                popupAnchor: [0, -13],
            });
        };

        const createSelectedPickerIcon = () => {
            return L.divIcon({
                className: 'custom-selected-pin',
                html: `
                    <div style="background-color: #216B49; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #FFFFFF; box-shadow: 0 3px 8px rgba(0,0,0,0.4); color: white;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                    </div>
                `,
                iconSize: [34, 34],
                iconAnchor: [17, 34],
                popupAnchor: [0, -34],
            });
        };

        // Render Reports
        reports.forEach((rep) => {
            const marker = L.marker([rep.latitude, rep.longitude], {
                icon: createCitizenIcon(rep.report_status),
            });

            const popupContent = `
                <div style="min-width: 220px; font-family: inherit; font-size: 12px; color: #171C19; padding: 4px;">
                    <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #68716B; margin-bottom: 2px;">
                        Laporan Warga • ${rep.tracking_code}
                    </div>
                    <div style="font-size: 13px; font-weight: 700; color: #174B35; margin-bottom: 6px; line-height: 1.3;">
                        ${rep.title}
                    </div>
                    <div style="background: #F3F7F4; padding: 6px; border-radius: 6px; margin-bottom: 8px; border: 1px solid #DDE3DE;">
                        <div style="font-weight: 600; color: #171C19;">Status: ${rep.status_label}</div>
                        ${rep.fire_condition_label ? `<div style="font-size: 11px; color: #343B36;">Kondisi: ${rep.fire_condition_label}</div>` : ''}
                        <div style="font-size: 11px; color: #68716B;">${rep.regency_city}, ${rep.province}</div>
                    </div>
                    <p style="font-size: 11px; color: #343B36; margin-bottom: 8px; line-height: 1.4;">
                        ${rep.location_description}
                    </p>
                    <a href="/laporan-publik/${rep.tracking_code}" style="display: block; text-align: center; background: #216B49; color: white; padding: 5px 10px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 11px;">
                        Lihat Detail & Kronologi
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
                ? `<div style="display: inline-block; background: #F3F7F4; border: 1px solid #343B36; color: #171C19; font-weight: 700; font-size: 9px; padding: 1px 6px; border-radius: 3px; margin-bottom: 4px;">
                     DATA SIMULASI
                   </div>`
                : '';

            const popupContent = `
                <div style="min-width: 230px; font-family: inherit; font-size: 12px; color: #171C19; padding: 4px;">
                    ${simulationBadge}
                    <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #D97706; margin-bottom: 2px;">
                        Titik Panas Satelit • ${obs.satellite_instrument}
                    </div>
                    <div style="font-size: 13px; font-weight: 700; color: #171C19; margin-bottom: 6px;">
                        Deteksi Suhu Termal Satelit
                    </div>
                    <div style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 6px; border-radius: 6px; margin-bottom: 6px; font-size: 11px; color: #92400E;">
                        <div>Tingkat Kepercayaan: <strong>${obs.confidence_level}</strong></div>
                        ${obs.frp_mw ? `<div>Daya Radiasi (FRP): <strong>${obs.frp_mw} MW</strong></div>` : ''}
                        ${obs.brightness_kelvin ? `<div>Suhu Kecerahan: <strong>${obs.brightness_kelvin} K</strong></div>` : ''}
                        <div>Waktu Observasi: ${new Date(obs.observed_at).toLocaleString('id-ID')}</div>
                    </div>
                    <div style="font-size: 10px; color: #68716B; line-height: 1.3;">
                        Sumber: ${obs.data_source.name}. Catatan: Titik panas satelit adalah anomali termal dan bukan bukti pasti api di permukaan tanpa verifikasi.
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

        return () => {
            // Clean up if unmounted
        };
    }, [reports, observations, selectedCoordinates, interactiveSelectMode]);

    return (
        <div className={`relative flex flex-col border border-[#DDE3DE] rounded-xl overflow-hidden bg-[#F3F7F4] ${className}`}>
            {/* Simulation Warning Banner if simulated data is visible */}
            {hasSimulatedData && (
                <div className="bg-[#F3F7F4] border-b border-[#DDE3DE] px-3 py-1.5 flex items-center justify-between text-xs text-[#343B36] z-20">
                    <div className="flex items-center gap-1.5">
                        <AlertTriangle className="size-3.5 text-[#68716B]" />
                        <span>
                            <strong>Penanda Transparansi:</strong> Sebagian titik di peta merupakan <span className="font-semibold underline">DATA SIMULASI</span> berlabel untuk keperluan demonstrasi sistem.
                        </span>
                    </div>
                    <span className="hidden sm:inline-block text-[11px] text-[#68716B]">
                        Bukan Klaim Real-time Tanpa Sensor
                    </span>
                </div>
            )}

            {/* Map Container */}
            <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-10 focus:outline-none" />

            {/* Interactive Mode Helper overlay */}
            {interactiveSelectMode && (
                <div className="absolute top-12 left-4 z-20 bg-white/90 backdrop-blur-sm border border-[#DDE3DE] px-3 py-1.5 rounded-md shadow-sm text-xs text-[#171C19]">
                    Klik pada peta untuk menentukan titik koordinat kejadian
                </div>
            )}

            {/* Map Legend */}
            <div className="bg-white border-t border-[#DDE3DE] p-3 text-xs text-[#343B36] flex flex-wrap items-center justify-between gap-3 z-20">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="font-semibold text-[#171C19]">Legenda Peta:</span>
                    <div className="flex items-center gap-1.5">
                        <span className="size-3 rounded-full bg-[#174B35] inline-block border border-white shadow-xs" />
                        <span>Laporan Terverifikasi / Dispatched</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-3 rounded-full bg-[#343B36] inline-block border border-white shadow-xs" />
                        <span>Laporan Baru / Dalam Antrean</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-3 rounded-full bg-[#D97706] inline-block border border-white shadow-xs" />
                        <span>Titik Panas Satelit (MODIS / VIIRS)</span>
                    </div>
                </div>

                <div className="text-[11px] text-[#68716B] flex items-center gap-1">
                    <Info className="size-3" />
                    <span>Cakupan: Seluruh Pulau Kalimantan</span>
                </div>
            </div>
        </div>
    );
}
