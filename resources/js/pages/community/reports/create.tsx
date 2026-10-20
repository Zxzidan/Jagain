import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Camera,
    CheckCircle2,
    Clock,
    FileText,
    Flame,
    Info,
    Loader2,
    MapPin,
    ShieldAlert,
    Upload,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CoordinatePicker } from '@/components/reports/coordinate-picker';
import { dashboard } from '@/routes';

const CATEGORIES = [
    {
        id: 'hutan',
        label: 'Kebakaran Hutan',
        desc: 'Area hutan lindung, hutan produksi, atau tutupan pohon lebat.',
    },
    {
        id: 'gambut',
        label: 'Lahan Gambut',
        desc: 'Tanah gambut dengan asap tebal dan kebakaran bawah tanah.',
    },
    {
        id: 'perkebunan',
        label: 'Pertanian / Perkebunan',
        desc: 'Lahan kelapa sawit, karet, ladang, atau semak belukar terbuka.',
    },
    {
        id: 'pemukiman',
        label: 'Dekat Pemukiman',
        desc: 'Titik kebakaran berdekatan dengan rumah warga atau fasilitas publik.',
    },
    {
        id: 'lainnya',
        label: 'Lainnya',
        desc: 'Jenis lahan atau area lain yang belum tercakup di atas.',
    },
];

export default function ReportCreate() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: 'hutan',
        description: '',
        location_description: '',
        latitude: -2.2161,
        longitude: 113.9139,
        reported_occurrence_at: new Date().toISOString().slice(0, 16),
        evidence: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file bukti maksimal 5 MB.');
                return;
            }
            setData('evidence', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveFile = () => {
        setData('evidence', null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reports', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Formulir Laporan Karhutla - JAGAIN" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full">
                {/* Back button and page title */}
                <div className="space-y-2">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs text-forest-green hover:bg-soft-green -ml-2 w-fit"
                    >
                        <Link href="/reports">
                            <ArrowLeft className="size-3.5 mr-1.5" />
                            Kembali ke Daftar Laporan
                        </Link>
                    </Button>
                    <h1 className="text-xl md:text-2xl font-bold text-dark-neutral">
                        Formulir Pelaporan Kebakaran Hutan & Lahan
                    </h1>
                    <p className="text-xs text-gray-neutral">
                        Sampaikan informasi kebakaran hutan dan lahan secara akurat untuk mempermudah proses pemeriksaan awal dan koordinasi penanganan.
                    </p>
                </div>

                {/* Safety Warning Banner (Mandatory requirement) */}
                <div className="rounded-xl border border-primary-green/40 bg-soft-green p-4 sm:p-5 shadow-2xs">
                    <div className="flex items-start gap-3">
                        <ShieldAlert className="size-5 shrink-0 text-primary-green mt-0.5" />
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold text-forest-green">
                                Peringatan Keselamatan Bagi Pelapor
                            </h3>
                            <p className="text-xs text-dark-neutral leading-relaxed">
                                <strong>Utamakan keselamatan diri Anda dan keluarga:</strong> Jangan mendekati lidah api aktif, area terkepung asap tebal, atau titik berbahaya lainnya demi memperoleh foto bukti. Foto bukti bersifat <em>opsional</em>. Laporan tetap dapat diajukan tanpa foto jika situasi di lapangan tidak aman.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border-neutral bg-white p-5 sm:p-7 shadow-xs">
                    {/* Section 1: Ringkasan & Kategori */}
                    <div className="space-y-4">
                        <div className="border-b border-border-neutral pb-2">
                            <h2 className="text-sm font-bold text-forest-green uppercase tracking-wider">
                                1. Informasi Pokok Kejadian
                            </h2>
                        </div>

                        {/* Judul Laporan */}
                        <div>
                            <Label htmlFor="title" className="text-xs font-semibold text-dark-neutral">
                                Judul / Ringkasan Singkat Kejadian <span className="text-primary-green font-bold">*</span>
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Contoh: Titik api terdeteksi di dekat batas perkebunan sawit Desa Sebangau"
                                className="mt-1 border-border-neutral focus:border-primary-green focus:ring-primary-green"
                                maxLength={200}
                                required
                            />
                            {errors.title ? (
                                <p className="mt-1 text-xs text-primary-green font-medium">{errors.title}</p>
                            ) : (
                                <p className="mt-1 text-[11px] text-gray-neutral">
                                    Berikan ringkasan yang singkat dan jelas mengenai apa yang terlihat (maks. 200 karakter).
                                </p>
                            )}
                        </div>

                        {/* Kategori Kejadian */}
                        <div>
                            <Label className="text-xs font-semibold text-dark-neutral">
                                Kategori Lahan Kebakaran <span className="text-primary-green font-bold">*</span>
                            </Label>
                            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {CATEGORIES.map((cat) => {
                                    const isSelected = data.category === cat.id;
                                    return (
                                        <div
                                            key={cat.id}
                                            onClick={() => setData('category', cat.id)}
                                            className={`cursor-pointer rounded-xl border p-3 transition-all ${
                                                isSelected
                                                    ? 'border-primary-green bg-soft-green/60 shadow-2xs'
                                                    : 'border-border-neutral bg-white hover:border-gray-neutral hover:bg-pale-green/30'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs font-bold ${isSelected ? 'text-forest-green' : 'text-dark-neutral'}`}>
                                                    {cat.label}
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={isSelected}
                                                    onChange={() => setData('category', cat.id)}
                                                    className="size-3.5 text-primary-green focus:ring-primary-green"
                                                />
                                            </div>
                                            <p className="mt-1 text-[11px] text-gray-neutral leading-normal">
                                                {cat.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.category && (
                                <p className="mt-1 text-xs text-primary-green font-medium">{errors.category}</p>
                            )}
                        </div>

                        {/* Waktu Kejadian */}
                        <div>
                            <Label htmlFor="reported_occurrence_at" className="text-xs font-semibold text-dark-neutral">
                                Perkiraan Waktu Mulai Terlihat <span className="text-gray-neutral font-normal">(Opsional)</span>
                            </Label>
                            <Input
                                id="reported_occurrence_at"
                                type="datetime-local"
                                value={data.reported_occurrence_at}
                                onChange={(e) => setData('reported_occurrence_at', e.target.value)}
                                className="mt-1 max-w-sm border-border-neutral focus:border-primary-green focus:ring-primary-green"
                            />
                            {errors.reported_occurrence_at && (
                                <p className="mt-1 text-xs text-primary-green font-medium">{errors.reported_occurrence_at}</p>
                            )}
                        </div>
                    </div>

                    {/* Section 2: Lokasi & Titik Koordinat */}
                    <div className="space-y-4 pt-4">
                        <div className="border-b border-border-neutral pb-2">
                            <h2 className="text-sm font-bold text-forest-green uppercase tracking-wider">
                                2. Lokasi & Titik Koordinat
                            </h2>
                        </div>

                        {/* Deskripsi Patokan Lokasi */}
                        <div>
                            <Label htmlFor="location_description" className="text-xs font-semibold text-dark-neutral">
                                Deskripsi Patokan Lokasi Wilayah <span className="text-primary-green font-bold">*</span>
                            </Label>
                            <Input
                                id="location_description"
                                type="text"
                                value={data.location_description}
                                onChange={(e) => setData('location_description', e.target.value)}
                                placeholder="Contoh: Jl. Trans Kalimantan Km 18, Desa Taruna Sari, belakang parit sekunder"
                                className="mt-1 border-border-neutral focus:border-primary-green focus:ring-primary-green"
                                required
                            />
                            {errors.location_description ? (
                                <p className="mt-1 text-xs text-primary-green font-medium">{errors.location_description}</p>
                            ) : (
                                <p className="mt-1 text-[11px] text-gray-neutral">
                                    Sebutkan patokan yang mudah dikenali (nama jalan, kilometer, nama desa/kecamatan, batas sungai atau parit).
                                </p>
                            )}
                        </div>

                        {/* Interactive Coordinate Picker */}
                        <CoordinatePicker
                            latitude={data.latitude}
                            longitude={data.longitude}
                            onChange={(lat, lng) => {
                                setData((prev) => ({
                                    ...prev,
                                    latitude: lat,
                                    longitude: lng,
                                }));
                            }}
                            errorLatitude={errors.latitude}
                            errorLongitude={errors.longitude}
                        />
                    </div>

                    {/* Section 3: Deskripsi Rinci */}
                    <div className="space-y-4 pt-4">
                        <div className="border-b border-border-neutral pb-2">
                            <h2 className="text-sm font-bold text-forest-green uppercase tracking-wider">
                                3. Deskripsi & Kronologi Kejadian
                            </h2>
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-xs font-semibold text-dark-neutral">
                                Deskripsi Rinci Kebakaran <span className="text-primary-green font-bold">*</span>
                            </Label>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan kondisi kebakaran: perkiraan luas api atau kepulan asap, arah angin, apakah mendekati kebun atau rumah warga, dan apakah ada warga yang sedang berupaya melakukan pemadaman..."
                                className="mt-1 w-full rounded-md border border-border-neutral p-3 text-xs text-dark-neutral focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green leading-relaxed"
                                required
                            />
                            {errors.description ? (
                                <p className="mt-1 text-xs text-primary-green font-medium">{errors.description}</p>
                            ) : (
                                <p className="mt-1 text-[11px] text-gray-neutral">
                                    Minimal 10 karakter. Berikan keterangan sejelas mungkin tanpa membahayakan keselamatan Anda.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Section 4: Bukti Foto (Opsional) */}
                    <div className="space-y-4 pt-4">
                        <div className="border-b border-border-neutral pb-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-forest-green uppercase tracking-wider">
                                    4. Bukti Foto Pendukung
                                </h2>
                                <span className="text-xs text-gray-neutral font-medium">Opsional</span>
                            </div>
                        </div>

                        <div>
                            {!previewUrl ? (
                                <div className="rounded-xl border border-dashed border-border-neutral bg-pale-green/40 p-6 text-center hover:bg-pale-green/80 transition-colors">
                                    <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-soft-green text-forest-green">
                                        <Camera className="size-5" />
                                    </div>
                                    <div className="mt-2 text-xs font-semibold text-dark-neutral">
                                        Unggah Foto Bukti Kejadian
                                    </div>
                                    <p className="mt-1 text-[11px] text-gray-neutral">
                                        Format file: JPG, JPEG, PNG, atau WEBP. Maksimal ukuran: 5 MB.
                                    </p>
                                    <label
                                        htmlFor="evidence"
                                        className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border-neutral bg-white px-3 py-1.5 text-xs font-medium text-dark-neutral hover:bg-soft-green hover:text-forest-green transition-colors"
                                    >
                                        <Upload className="size-3.5" />
                                        <span>Pilih File dari Perangkat</span>
                                    </label>
                                    <input
                                        id="evidence"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/webp"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                    />
                                </div>
                            ) : (
                                <div className="relative rounded-xl border border-border-neutral p-3 bg-pale-green">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={previewUrl}
                                            alt="Preview bukti"
                                            className="size-20 rounded-lg object-cover border border-border-neutral"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-dark-neutral truncate">
                                                {data.evidence?.name}
                                            </p>
                                            <p className="text-[11px] text-gray-neutral">
                                                {data.evidence ? (data.evidence.size / (1024 * 1024)).toFixed(2) : 0} MB
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-[11px] text-primary-green font-medium">
                                                <CheckCircle2 className="size-3" />
                                                Siap dikirim bersama laporan
                                            </span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleRemoveFile}
                                            className="text-gray-neutral hover:text-primary-green"
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {errors.evidence && (
                                <p className="mt-1 text-xs text-primary-green font-medium">{errors.evidence}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Bar with double-click protection */}
                    <div className="border-t border-border-neutral pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-[11px] text-gray-neutral">
                            Dengan mengirimkan laporan, Anda menyatakan informasi yang diberikan adalah benar sesuai pengamatan Anda. Status awal laporan adalah <strong>Terkirim (SUBMITTED)</strong>.
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Button
                                asChild
                                type="button"
                                variant="outline"
                                className="border-border-neutral text-xs"
                                disabled={processing}
                            >
                                <Link href="/reports">Batal</Link>
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-primary-green text-white hover:bg-forest-green text-xs font-semibold px-6"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="size-3.5 mr-2 animate-spin" />
                                        Mengirim Laporan...
                                    </>
                                ) : (
                                    'Kirim Laporan Karhutla'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

ReportCreate.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Laporan Saya',
            href: '/reports',
        },
        {
            title: 'Buat Laporan',
            href: '/reports/create',
        },
    ],
};
