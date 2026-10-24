import React, { useState, useEffect, useMemo } from 'react';
import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
    Compass,
    ExternalLink,
    LocateFixed,
    MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Fix standard Leaflet default icon path issues in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom JAGAIN Brand Marker Icon matching Forest Green & Primary Green
const createJagainMarkerIcon = () =>
    L.divIcon({
        className: 'jagain-leaflet-marker',
        html: `
            <div style="position: relative; width: 34px; height: 42px; display: flex; flex-direction: column; align-items: center; justify-content: center; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.35)); cursor: pointer;">
                <svg viewBox="0 0 24 30" width="34" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37258 0 0 5.37258 0 12C0 19.5 10.5 28.5 11.35 29.25C11.72 29.58 12.28 29.58 12.65 29.25C13.5 28.5 24 19.5 24 12C24 5.37258 18.6274 0 12 0Z" fill="#216B49"/>
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 18.2 10.8 26 12 27.1C13.2 26 22 18.2 22 12C22 6.47715 17.5228 2 12 2Z" fill="#174B35"/>
                    <circle cx="12" cy="11" r="5" fill="#FFFFFF"/>
                    <circle cx="12" cy="11" r="2.5" fill="#216B49"/>
                </svg>
            </div>
        `,
        iconSize: [34, 42],
        iconAnchor: [17, 40],
        popupAnchor: [0, -38],
    });

export interface ReportMapViewerProps {
    latitude: number;
    longitude: number;
    locationDescription?: string;
    reportNumber?: string;
    title?: string;
    categoryLabel?: string;
}

// Invalidate map size after mount to prevent gray tiles
function MapResizeInvalidator() {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 200);
        return () => clearTimeout(timer);
    }, [map]);

    return null;
}

// Map center re-centering helper
function MapRecenterController({
    target,
    trigger,
}: {
    target: [number, number];
    trigger: number;
}) {
    const map = useMap();

    useEffect(() => {
        if (trigger > 0) {
            map.flyTo(target, 14, {
                duration: 1.0,
            });
        }
    }, [trigger, target, map]);

    return null;
}

export function ReportMapViewer({
    latitude,
    longitude,
    locationDescription,
    reportNumber,
    title,
    categoryLabel,
}: ReportMapViewerProps) {
    const [isClient, setIsClient] = useState(false);
    const [recenterCount, setRecenterCount] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const markerIcon = useMemo(() => createJagainMarkerIcon(), []);

    const hasValidCoords =
        typeof latitude === 'number' &&
        typeof longitude === 'number' &&
        !isNaN(latitude) &&
        !isNaN(longitude) &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180 &&
        (latitude !== 0 || longitude !== 0);

    const position: [number, number] = hasValidCoords
        ? [latitude, longitude]
        : [-1.4, 113.8];

    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return (
        <div className="space-y-3">
            {/* Header Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-dark-neutral">
                    <MapPin className="size-4 shrink-0 text-primary-green" />
                    <span className="font-semibold text-forest-green">
                        Peta Titik Kejadian Karhutla
                    </span>
                    <span className="hidden text-gray-neutral sm:inline">•</span>
                    <span className="font-mono text-[11px] font-semibold text-gray-neutral">
                        {hasValidCoords
                            ? `${latitude.toFixed(6)}°, ${longitude.toFixed(6)}°`
                            : 'Koordinat belum diset'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {hasValidCoords && (
                        <>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setRecenterCount((prev) => prev + 1)
                                }
                                className="h-7 border-border-neutral bg-white px-2.5 text-xs font-medium text-dark-neutral hover:bg-pale-green dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                                title="Pusatkan kembali ke titik koordinat"
                            >
                                <LocateFixed className="mr-1 size-3.5 text-primary-green" />
                                <span>Pusatkan</span>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="h-7 border-border-neutral bg-white px-2.5 text-xs font-medium text-dark-neutral hover:bg-pale-green dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                            >
                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1"
                                >
                                    <span>Google Maps</span>
                                    <ExternalLink className="size-3 text-gray-neutral" />
                                </a>
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Map Container */}
            <div className="relative isolate overflow-hidden rounded-xl border border-border-neutral bg-pale-green/30 shadow-2xs dark:border-border-neutral dark:bg-[#121814]">
                {/* Status Overlay Badge on Top Left */}
                {hasValidCoords && (
                    <div className="pointer-events-none absolute top-3 left-3 z-[1000] flex max-w-[calc(100%-24px)] flex-wrap items-center gap-2">
                        <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-leaf-green/40 bg-white/95 px-2.5 py-1 text-xs font-semibold text-forest-green shadow-xs backdrop-blur-xs dark:border-leaf-green/50 dark:bg-[#151c17]/95">
                            <span className="size-2 animate-pulse rounded-full bg-primary-green" />
                            <span>Titik Terverifikasi:</span>
                            <span className="font-mono font-bold text-dark-neutral">
                                {latitude.toFixed(6)}°, {longitude.toFixed(6)}°
                            </span>
                        </div>
                    </div>
                )}

                {/* Leaflet Render */}
                <div className="h-72 w-full sm:h-80 md:h-96">
                    {isClient ? (
                        hasValidCoords ? (
                            <MapContainer
                                center={position}
                                zoom={14}
                                scrollWheelZoom={false}
                                className="h-full w-full"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    maxZoom={19}
                                />

                                <MapResizeInvalidator />
                                <MapRecenterController
                                    target={position}
                                    trigger={recenterCount}
                                />

                                <Marker position={position} icon={markerIcon}>
                                    <Popup
                                        minWidth={200}
                                        closeButton={true}
                                        autoPan={false}
                                    >
                                        <div className="space-y-1.5 p-1 font-sans">
                                            {reportNumber && (
                                                <div className="font-mono text-[10px] font-bold text-primary-green">
                                                    {reportNumber}
                                                </div>
                                            )}
                                            {title && (
                                                <div className="text-xs font-bold text-dark-neutral">
                                                    {title}
                                                </div>
                                            )}
                                            {categoryLabel && (
                                                <div className="text-[11px] font-medium text-forest-green">
                                                    Kategori: {categoryLabel}
                                                </div>
                                            )}
                                            {locationDescription && (
                                                <div className="text-[11px] leading-tight text-gray-neutral">
                                                    {locationDescription}
                                                </div>
                                            )}
                                            <div className="pt-1 font-mono text-[10px] text-gray-neutral border-t border-border-neutral">
                                                {latitude.toFixed(6)}°,{' '}
                                                {longitude.toFixed(6)}°
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-pale-green/40 p-6 text-center text-xs text-gray-neutral dark:bg-[#151c17]">
                                Koordinat lokasi tidak tersedia untuk laporan ini.
                            </div>
                        )
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-pale-green text-gray-neutral dark:bg-[#151c17]">
                            <div className="flex items-center gap-2 text-xs">
                                <Compass className="size-4 animate-spin text-primary-green" />
                                <span>Memuat peta titik lokasi karhutla...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
