import React, { useState } from 'react';
import { MapPin, Navigation, Compass, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CoordinatePickerProps {
    latitude: number | string;
    longitude: number | string;
    onChange: (lat: number, lng: number) => void;
    errorLatitude?: string;
    errorLongitude?: string;
}

const KALIMANTAN_PRESETS = [
    { name: 'Palangka Raya (Kalteng)', lat: -2.2161, lng: 113.9139 },
    { name: 'Pontianak (Kalbar)', lat: -0.0263, lng: 109.3425 },
    { name: 'Banjarmasin (Kalsel)', lat: -3.3194, lng: 114.5908 },
    { name: 'Samarinda (Kaltim)', lat: -0.5022, lng: 117.1536 },
    { name: 'Tanjung Selor (Kaltara)', lat: 2.8375, lng: 117.3653 },
];

// Bounding box for Kalimantan region coordinate grid
const BOUNDS = {
    minLat: -4.5,
    maxLat: 4.5,
    minLng: 108.0,
    maxLng: 119.5,
};

export function CoordinatePicker({
    latitude,
    longitude,
    onChange,
    errorLatitude,
    errorLongitude,
}: CoordinatePickerProps) {
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsError, setGpsError] = useState<string | null>(null);

    const latNum = typeof latitude === 'number' ? latitude : parseFloat(latitude) || 0;
    const lngNum = typeof longitude === 'number' ? longitude : parseFloat(longitude) || 0;

    const handleGpsClick = () => {
        if (!navigator.geolocation) {
            setGpsError('Peramban Anda tidak mendukung penentuan lokasi GPS.');
            return;
        }

        setGpsLoading(true);
        setGpsError(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = parseFloat(pos.coords.latitude.toFixed(6));
                const lng = parseFloat(pos.coords.longitude.toFixed(6));
                onChange(lat, lng);
                setGpsLoading(false);
            },
            (err) => {
                setGpsLoading(false);
                setGpsError('Gagal mendeteksi lokasi GPS. Pastikan izin lokasi telah diberikan.');
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    // Calculate percentage position inside Kalimantan grid for SVG visualizer
    const xPercent = Math.max(
        5,
        Math.min(
            95,
            ((lngNum - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100
        )
    );
    const yPercent = Math.max(
        5,
        Math.min(
            95,
            ((BOUNDS.maxLat - latNum) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100
        )
    );

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const fractionX = clickX / rect.width;
        const fractionY = clickY / rect.height;

        const calculatedLng = BOUNDS.minLng + fractionX * (BOUNDS.maxLng - BOUNDS.minLng);
        const calculatedLat = BOUNDS.maxLat - fractionY * (BOUNDS.maxLat - BOUNDS.minLat);

        onChange(
            parseFloat(calculatedLat.toFixed(6)),
            parseFloat(calculatedLng.toFixed(6))
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-medium text-dark-neutral">
                    Titik Koordinat Lokasi Kejadian (Kalimantan)
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGpsClick}
                    disabled={gpsLoading}
                    className="flex items-center gap-1.5 border-border-neutral text-xs text-forest-green hover:bg-soft-green"
                >
                    <Navigation className={`size-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
                    {gpsLoading ? 'Mencari Lokasi...' : 'Gunakan GPS Perangkat'}
                </Button>
            </div>

            {gpsError && (
                <div className="flex items-center gap-2 rounded-md border border-primary-green/30 bg-soft-green p-2 text-xs text-forest-green">
                    <AlertCircle className="size-4 shrink-0 text-primary-green" />
                    <span>{gpsError}</span>
                </div>
            )}

            {/* Interactive Kalimantan Grid Picker */}
            <div className="relative overflow-hidden rounded-xl border border-border-neutral bg-pale-green">
                <div
                    onClick={handleMapClick}
                    className="relative h-48 w-full cursor-crosshair select-none bg-gradient-to-b from-[#E8F1EB] to-[#DCECE1] p-3 transition-colors hover:bg-soft-green"
                >
                    {/* Grid lines */}
                    <div className="pointer-events-none absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-25">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="border-r border-b border-forest-green" />
                        ))}
                    </div>

                    {/* Regional watermark/contour label */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <Compass className="size-16 text-forest-green/10" />
                        <span className="text-xs font-semibold tracking-wider text-forest-green/40 uppercase">
                            Wilayah Kalimantan (Klik Untuk Menentukan Titik)
                        </span>
                        <span className="text-[11px] text-gray-neutral/70">
                            Lat: {BOUNDS.minLat}° s/d {BOUNDS.maxLat}°, Lng: {BOUNDS.minLng}° s/d {BOUNDS.maxLng}°
                        </span>
                    </div>

                    {/* Quick indicator of Kalimantan provinces */}
                    <div className="pointer-events-none absolute bottom-2 left-2 text-[10px] text-gray-neutral">
                        Kalbar • Kalteng • Kalsel • Kaltim • Kaltara
                    </div>

                    {/* Selected Coordinate Pin */}
                    {latNum !== 0 && lngNum !== 0 && (
                        <div
                            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full transition-all duration-150"
                            style={{
                                left: `${xPercent}%`,
                                top: `${yPercent}%`,
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <div className="rounded-md border border-forest-green bg-forest-green px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                                    {latNum.toFixed(4)}, {lngNum.toFixed(4)}
                                </div>
                                <MapPin className="size-6 text-primary-green drop-shadow-md fill-primary-green" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Preset Location Buttons */}
                <div className="border-t border-border-neutral bg-white p-2.5">
                    <div className="mb-1.5 text-[11px] font-medium text-gray-neutral">
                        Pilih Cepat Wilayah / Ibukota Provinsi:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {KALIMANTAN_PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                type="button"
                                onClick={() => onChange(preset.lat, preset.lng)}
                                className="rounded-md border border-border-neutral bg-pale-green px-2 py-1 text-xs text-dark-neutral transition hover:border-primary-green hover:bg-soft-green hover:text-forest-green"
                            >
                                {preset.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Latitude & Longitude Manual Inputs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <Label htmlFor="latitude" className="text-xs font-medium text-dark-neutral">
                        Latitude (Lintang, cth: -2.2161) <span className="text-primary-green font-bold">*</span>
                    </Label>
                    <Input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="0.000001"
                        value={latitude}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            onChange(val, lngNum);
                        }}
                        placeholder="-2.2161"
                        className="mt-1 border-border-neutral focus:border-primary-green focus:ring-primary-green"
                    />
                    {errorLatitude && (
                        <p className="mt-1 text-xs text-primary-green font-medium">{errorLatitude}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="longitude" className="text-xs font-medium text-dark-neutral">
                        Longitude (Bujur, cth: 113.9139) <span className="text-primary-green font-bold">*</span>
                    </Label>
                    <Input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="0.000001"
                        value={longitude}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            onChange(latNum, val);
                        }}
                        placeholder="113.9139"
                        className="mt-1 border-border-neutral focus:border-primary-green focus:ring-primary-green"
                    />
                    {errorLongitude && (
                        <p className="mt-1 text-xs text-primary-green font-medium">{errorLongitude}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
