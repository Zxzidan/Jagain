import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from 'react';
import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
    MapPin,
    Navigation,
    Compass,
    AlertCircle,
    CheckCircle2,
    Crosshair,
    LocateFixed,
    Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Fix standard Leaflet default icon path issues in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom JAGAIN Brand Marker Icon (SVG DivIcon matching Forest Green & Primary Green)
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

export interface CoordinatePickerProps {
    latitude: number | string | null | undefined;
    longitude: number | string | null | undefined;
    onChange: (lat: number, lng: number) => void;
    onClear?: () => void;
    errorLatitude?: string;
    errorLongitude?: string;
}

// Kalimantan regional reference presets for quick navigation
const KALIMANTAN_PRESETS = [
    { name: 'Palangka Raya (Kalteng)', lat: -2.2161, lng: 113.9139 },
    { name: 'Pontianak (Kalbar)', lat: -0.0263, lng: 109.3425 },
    { name: 'Banjarmasin (Kalsel)', lat: -3.3194, lng: 114.5908 },
    { name: 'Samarinda (Kaltim)', lat: -0.5022, lng: 117.1536 },
    { name: 'Tanjung Selor (Kaltara)', lat: 2.8375, lng: 117.3653 },
];

// Default center covering Kalimantan island
const KALIMANTAN_CENTER: [number, number] = [-1.4, 113.8];
const DEFAULT_ZOOM = 6;

// Subcomponent: Click listener on the map
function MapClickHandler({
    onSelectLocation,
}: {
    onSelectLocation: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(e: any) {
            onSelectLocation(
                parseFloat(e.latlng.lat.toFixed(6)),
                parseFloat(e.latlng.lng.toFixed(6)),
            );
        },
    });
    return null;
}

// Subcomponent: Smooth map panning controller
function MapFlyToController({
    target,
    zoom,
}: {
    target: [number, number] | null;
    zoom?: number;
}) {
    const map = useMap();

    useEffect(() => {
        if (target) {
            map.flyTo(target, zoom ?? Math.max(map.getZoom(), 13), {
                duration: 1.2,
            });
        }
    }, [target, zoom, map]);

    return null;
}

// Subcomponent: Invalidate map size on layout/tab changes
function MapResizeInvalidator() {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 250);
        return () => clearTimeout(timer);
    }, [map]);

    return null;
}

// Subcomponent: Draggable marker on map
function DraggableMarker({
    position,
    onDragEnd,
}: {
    position: [number, number];
    onDragEnd: (lat: number, lng: number) => void;
}) {
    const markerRef = useRef<L.Marker>(null);
    const markerIcon = useMemo(() => createJagainMarkerIcon(), []);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const latLng = marker.getLatLng();
                    onDragEnd(
                        parseFloat(latLng.lat.toFixed(6)),
                        parseFloat(latLng.lng.toFixed(6)),
                    );
                }
            },
        }),
        [onDragEnd],
    );

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={markerIcon}
        >
            <Popup minWidth={180} closeButton={false} autoPan={false}>
                <div className="space-y-1 p-1 text-center font-sans">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-forest-green">
                        <MapPin className="size-3.5 text-primary-green" />
                        <span>Titik Kejadian Karhutla</span>
                    </div>
                    <div className="font-mono text-xs font-semibold text-dark-neutral">
                        {position[0].toFixed(6)}°, {position[1].toFixed(6)}°
                    </div>
                    <div className="text-[10px] leading-tight text-gray-neutral">
                        Geser pin ini untuk menyesuaikan lokasi kejadian
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export function CoordinatePicker({
    latitude,
    longitude,
    onChange,
    onClear,
    errorLatitude,
    errorLongitude,
}: CoordinatePickerProps) {
    const [isClient, setIsClient] = useState(false);
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsStatus, setGpsStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string | null;
    }>({ type: null, message: null });
    const [flyToTarget, setFlyToTarget] = useState<[number, number] | null>(
        null,
    );
    const [flyToZoom, setFlyToZoom] = useState<number | undefined>(undefined);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Parse numeric coordinates
    const parsedLat =
        typeof latitude === 'number'
            ? latitude
            : typeof latitude === 'string' && latitude.trim() !== ''
              ? parseFloat(latitude)
              : null;

    const parsedLng =
        typeof longitude === 'number'
            ? longitude
            : typeof longitude === 'string' && longitude.trim() !== ''
              ? parseFloat(longitude)
              : null;

    const hasLocation =
        parsedLat !== null &&
        parsedLng !== null &&
        !isNaN(parsedLat) &&
        !isNaN(parsedLng) &&
        parsedLat >= -90 &&
        parsedLat <= 90 &&
        parsedLng >= -180 &&
        parsedLng <= 180 &&
        (parsedLat !== 0 || parsedLng !== 0);

    // Initial center is either user coordinates if already set, or regional Kalimantan center
    const initialCenter: [number, number] = hasLocation
        ? [parsedLat!, parsedLng!]
        : KALIMANTAN_CENTER;

    const initialZoom = hasLocation ? 13 : DEFAULT_ZOOM;

    // Handle map click
    const handleSelectLocation = useCallback(
        (lat: number, lng: number) => {
            onChange(lat, lng);
            setGpsStatus({ type: null, message: null });
        },
        [onChange],
    );

    // Handle marker drag
    const handleMarkerDragEnd = useCallback(
        (lat: number, lng: number) => {
            onChange(lat, lng);
            setGpsStatus({ type: null, message: null });
        },
        [onChange],
    );

    // Handle preset selection
    const handlePresetClick = (presetLat: number, presetLng: number) => {
        onChange(presetLat, presetLng);
        setFlyToTarget([presetLat, presetLng]);
        setFlyToZoom(13);
        setGpsStatus({ type: null, message: null });
    };

    // Handle browser Geolocation API
    const handleGpsClick = () => {
        if (!navigator.geolocation) {
            setGpsStatus({
                type: 'error',
                message: 'Peramban Anda tidak mendukung penentuan lokasi GPS.',
            });
            return;
        }

        setGpsLoading(true);
        setGpsStatus({ type: null, message: null });

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = parseFloat(pos.coords.latitude.toFixed(6));
                const lng = parseFloat(pos.coords.longitude.toFixed(6));
                onChange(lat, lng);
                setFlyToTarget([lat, lng]);
                setFlyToZoom(15);
                setGpsLoading(false);
                setGpsStatus({
                    type: 'success',
                    message: `Lokasi GPS terdeteksi (Akurasi: ±${Math.round(pos.coords.accuracy)}m).`,
                });
            },
            (err) => {
                setGpsLoading(false);
                let message = 'Gagal mendeteksi lokasi GPS.';
                if (err.code === err.PERMISSION_DENIED) {
                    message =
                        'Izin akses lokasi ditolak oleh peramban. Silakan klik langsung pada peta.';
                } else if (err.code === err.POSITION_UNAVAILABLE) {
                    message =
                        'Informasi lokasi tidak tersedia dari perangkat Anda.';
                } else if (err.code === err.TIMEOUT) {
                    message =
                        'Waktu permintaan lokasi habis. Coba ulangi atau klik peta secara manual.';
                }
                setGpsStatus({ type: 'error', message });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            },
        );
    };

    // Recenter map view to current marker
    const handleRecenter = () => {
        if (hasLocation) {
            setFlyToTarget([parsedLat!, parsedLng!]);
            setFlyToZoom(14);
        }
    };

    // Clear location
    const handleClear = () => {
        if (onClear) {
            onClear();
        } else {
            onChange(0, 0);
        }
        setFlyToTarget(KALIMANTAN_CENTER);
        setFlyToZoom(DEFAULT_ZOOM);
        setGpsStatus({ type: null, message: null });
    };

    return (
        <div className="space-y-3.5">
            {/* Header & Quick Action Bar */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Label className="text-xs font-semibold text-dark-neutral">
                        Peta Penentuan Titik Koordinat{' '}
                        <span className="font-bold text-primary-green">*</span>
                    </Label>
                    <p className="mt-0.5 text-[11px] text-gray-neutral">
                        Klik pada peta atau geser penanda untuk menetapkan titik
                        kebakaran yang akurat.
                    </p>
                </div>

                {/* GPS and Navigation Controls */}
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGpsClick}
                        disabled={gpsLoading}
                        className="h-8 border-border-neutral bg-white px-2.5 text-xs font-medium text-forest-green shadow-2xs hover:border-leaf-green/50 hover:bg-soft-green dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                    >
                        <Navigation
                            className={`size-3.5 text-primary-green ${gpsLoading ? 'animate-spin' : ''}`}
                        />
                        <span>
                            {gpsLoading ? 'Mencari...' : 'Gunakan Lokasi Saya'}
                        </span>
                    </Button>

                    {hasLocation && (
                        <>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRecenter}
                                title="Pusatkan peta ke penanda lokasi"
                                className="h-8 border-border-neutral bg-white px-2.5 text-xs text-dark-neutral hover:bg-pale-green dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                            >
                                <LocateFixed className="size-3.5 text-gray-neutral" />
                                <span className="hidden sm:inline">
                                    Pusatkan
                                </span>
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleClear}
                                title="Hapus titik terpilih"
                                className="h-8 px-2 text-xs text-gray-neutral hover:bg-pale-green hover:text-dark-neutral dark:hover:bg-[#1c2620] dark:hover:text-foreground"
                            >
                                <Trash2 className="size-3.5" />
                                <span className="hidden sm:inline">Hapus</span>
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* GPS Feedback Message */}
            {gpsStatus.message && (
                <div
                    role={gpsStatus.type === 'error' ? 'alert' : 'status'}
                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs transition-all ${
                        gpsStatus.type === 'error'
                            ? 'border-border-neutral bg-pale-green/70 text-dark-neutral dark:border-border-neutral dark:bg-[#1c2620]'
                            : 'border-leaf-green/40 bg-soft-green text-forest-green dark:border-leaf-green/40 dark:bg-[#151c17]'
                    }`}
                >
                    {gpsStatus.type === 'error' ? (
                        <AlertCircle className="size-4 shrink-0 text-primary-green" />
                    ) : (
                        <CheckCircle2 className="size-4 shrink-0 text-primary-green" />
                    )}
                    <span>{gpsStatus.message}</span>
                </div>
            )}

            {/* Interactive Leaflet Map Container */}
            <div className="relative isolate overflow-hidden rounded-xl border border-border-neutral bg-pale-green/30 shadow-2xs dark:border-border-neutral dark:bg-[#121814]">
                {/* Status Overlay Badge on Top Left of Map */}
                <div className="pointer-events-none absolute top-3 left-3 z-[1000] flex max-w-[calc(100%-24px)] flex-wrap items-center gap-2">
                    {hasLocation ? (
                        <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-leaf-green/40 bg-white/95 px-2.5 py-1 text-xs font-semibold text-forest-green shadow-xs backdrop-blur-xs dark:border-leaf-green/50 dark:bg-[#151c17]/95">
                            <span className="size-2 animate-pulse rounded-full bg-primary-green" />
                            <span>Titik Terpilih:</span>
                            <span className="font-mono font-bold text-dark-neutral">
                                {parsedLat!.toFixed(6)}°,{' '}
                                {parsedLng!.toFixed(6)}°
                            </span>
                        </div>
                    ) : (
                        <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-border-neutral bg-white/95 px-2.5 py-1 text-xs text-gray-neutral shadow-xs backdrop-blur-xs dark:border-border-neutral dark:bg-[#151c17]/95">
                            <Crosshair className="size-3.5 text-primary-green" />
                            <span>Klik area peta untuk menentukan titik</span>
                        </div>
                    )}
                </div>

                {/* Map Render */}
                <div className="h-72 w-full sm:h-80 md:h-96">
                    {isClient ? (
                        <MapContainer
                            center={initialCenter}
                            zoom={initialZoom}
                            scrollWheelZoom={true}
                            className="h-full w-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                maxZoom={19}
                            />

                            <MapResizeInvalidator />
                            <MapClickHandler
                                onSelectLocation={handleSelectLocation}
                            />
                            <MapFlyToController
                                target={flyToTarget}
                                zoom={flyToZoom}
                            />

                            {hasLocation && (
                                <DraggableMarker
                                    position={[parsedLat!, parsedLng!]}
                                    onDragEnd={handleMarkerDragEnd}
                                />
                            )}
                        </MapContainer>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-pale-green text-gray-neutral dark:bg-[#151c17]">
                            <div className="flex items-center gap-2 text-xs">
                                <Compass className="size-4 animate-spin text-primary-green" />
                                <span>
                                    Memuat peta interaktif Kalimantan...
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Presets Bar */}
                <div className="border-t border-border-neutral bg-white p-3 dark:border-border-neutral dark:bg-card">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                            Preset Wilayah Acuan:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {KALIMANTAN_PRESETS.map((preset) => {
                                const isCurrent =
                                    hasLocation &&
                                    Math.abs(parsedLat! - preset.lat) < 0.001 &&
                                    Math.abs(parsedLng! - preset.lng) < 0.001;

                                return (
                                    <button
                                        key={preset.name}
                                        type="button"
                                        onClick={() =>
                                            handlePresetClick(
                                                preset.lat,
                                                preset.lng,
                                            )
                                        }
                                        className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
                                            isCurrent
                                                ? 'border-primary-green bg-soft-green font-semibold text-forest-green shadow-2xs dark:border-primary-green dark:bg-[#14251b]'
                                                : 'border-border-neutral bg-pale-green/50 text-dark-neutral hover:border-gray-neutral hover:bg-pale-green dark:border-border-neutral dark:bg-[#151c17] dark:hover:bg-[#1c2620]'
                                        }`}
                                    >
                                        {preset.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Validation Alert for Coordinates */}
            {(errorLatitude || errorLongitude) && (
                <div
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-primary-green/40 bg-soft-green/60 p-2.5 text-xs text-forest-green dark:border-primary-green/40 dark:bg-[#151c17]"
                >
                    <AlertCircle className="size-4 shrink-0 text-primary-green" />
                    <span className="font-medium">
                        {errorLatitude || errorLongitude}
                    </span>
                </div>
            )}

            {/* Coordinate Manual Precision Inputs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <Label
                        htmlFor="latitude"
                        className="text-xs font-semibold text-dark-neutral"
                    >
                        Lintang (Latitude){' '}
                        <span className="font-bold text-primary-green">*</span>
                    </Label>
                    <Input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="0.000001"
                        value={
                            parsedLat !== null && !isNaN(parsedLat)
                                ? parsedLat
                                : ''
                        }
                        onChange={(e) => {
                            const val =
                                e.target.value === ''
                                    ? 0
                                    : parseFloat(e.target.value);
                            onChange(val, parsedLng || 0);
                        }}
                        placeholder="Contoh: -2.216100"
                        className={`mt-1 font-mono text-xs ${
                            errorLatitude
                                ? 'border-primary-green ring-1 ring-primary-green'
                                : 'border-border-neutral'
                        }`}
                        required
                    />
                    <p className="mt-1 text-[11px] text-gray-neutral">
                        Rentang: -90° s/d 90° (Format desimal WGS84)
                    </p>
                </div>

                <div>
                    <Label
                        htmlFor="longitude"
                        className="text-xs font-semibold text-dark-neutral"
                    >
                        Bujur (Longitude){' '}
                        <span className="font-bold text-primary-green">*</span>
                    </Label>
                    <Input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="0.000001"
                        value={
                            parsedLng !== null && !isNaN(parsedLng)
                                ? parsedLng
                                : ''
                        }
                        onChange={(e) => {
                            const val =
                                e.target.value === ''
                                    ? 0
                                    : parseFloat(e.target.value);
                            onChange(parsedLat || 0, val);
                        }}
                        placeholder="Contoh: 113.913900"
                        className={`mt-1 font-mono text-xs ${
                            errorLongitude
                                ? 'border-primary-green ring-1 ring-primary-green'
                                : 'border-border-neutral'
                        }`}
                        required
                    />
                    <p className="mt-1 text-[11px] text-gray-neutral">
                        Rentang: -180° s/d 180° (Format desimal WGS84)
                    </p>
                </div>
            </div>
        </div>
    );
}
