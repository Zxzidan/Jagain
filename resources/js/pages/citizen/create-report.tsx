import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import KarhutlaMap from '@/components/karhutla-map';
import {
    Shield,
    MapPin,
    Upload,
    AlertCircle,
    ArrowLeft,
    Send,
    CheckCircle2,
    Flame,
    FileText,
    Camera,
    Info,
} from 'lucide-react';

interface CreateReportProps {
    categories: Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
    }>;
    provinces: string[];
}

export default function CreateReport({ categories, provinces }: CreateReportProps) {
    const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({
        lat: -0.1832,
        lng: 109.3871,
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category_id: categories[0]?.id ? String(categories[0].id) : '',
        latitude: -0.1832,
        longitude: 109.3871,
        province: provinces[0] || 'Kalimantan Barat',
        regency_city: '',
        location_description: '',
        reported_occurrence_at: new Date().toISOString().slice(0, 16),
        evidence_file: null as File | null,
        safety_acknowledged: false,
    });

    const handleMapClick = (coords: { lat: number; lng: number }) => {
        setSelectedCoords(coords);
        setData((prev) => ({
            ...prev,
            latitude: coords.lat,
            longitude: coords.lng,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('evidence_file', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/lapor');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title="Formulir Pelaporan Karhutla — JAGAIN" />

            {/* Breadcrumb Header */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-4 sm:px-6 shadow-xs flex items-center justify-between">
                <Link
                    href="/laporan-saya"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#216B49] hover:text-[#174B35] transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Laporan Saya
                </Link>
                <span className="text-[11px] font-mono font-medium text-[#68716B]">
                    Formulir Terverifikasi Warga
                </span>
            </div>

            <div className="max-w-4xl mx-auto w-full">
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
                    {/* Header Intro */}
                    <div className="border-b border-[#DDE3DE] pb-6 space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1EB] text-[#174B35] font-bold text-[11px] tracking-wide">
                            <Shield className="size-3" />
                            Pelaporan Partisipatif Warga
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171C19] tracking-tight">
                            Laporkan Kejadian Kebakaran Hutan & Lahan
                        </h1>
                        <p className="text-xs sm:text-sm text-[#68716B] leading-relaxed">
                            Laporan Anda akan mendapatkan kode lacak unik dan diverifikasi oleh tim pengendali sebelum diteruskan ke instansi penanganan resmi di Kalimantan (BPBD, Manggala Agni, atau Damkar).
                        </p>
                    </div>

                    {/* Critical Safety Notice Callout */}
                    <div className="bg-[#E8F1EB] border-l-4 border-[#174B35] p-5 rounded-r-xl space-y-2 text-xs">
                        <div className="font-bold text-sm text-[#174B35] flex items-center gap-2">
                            <AlertCircle className="size-4 text-[#174B35] shrink-0" />
                            Prioritas Mutlak: Utamakan Jarak Aman dan Keselamatan Jiwa
                        </div>
                        <p className="text-[#343B36] leading-relaxed">
                            Jangan pernah mendekati lidah api aktif, menghirup asap pekat beracun, atau berjalan di atas lahan gambut berasap hanya untuk mengambil foto atau video. Ambil foto dari kejauhan (minimal 500 meter di posisi melawan arah angin). <strong>Jika api sudah mengancam pemukiman, segera evakuasi dan telepon darurat 112.</strong>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Informasi Pokok Kejadian */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-[#DDE3DE]">
                                <span className="size-6 rounded-full bg-[#174B35] text-white text-xs font-mono font-bold flex items-center justify-center">
                                    1
                                </span>
                                <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider">
                                    Informasi Pokok Kejadian
                                </h2>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                    Judul Ringkas Laporan <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Titik Api di Parit Sekunder Lahan Gambut Rasau Jaya"
                                    className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19] bg-white transition-all"
                                    required
                                />
                                {errors.title && <p className="text-[11px] text-red-600 mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Kategori Kejadian <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19] bg-white transition-all"
                                        required
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-[11px] text-red-600 mt-1">{errors.category_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Waktu Kejadian Dilihat <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.reported_occurrence_at}
                                        onChange={(e) => setData('reported_occurrence_at', e.target.value)}
                                        className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19] bg-white transition-all"
                                        required
                                    />
                                    {errors.reported_occurrence_at && (
                                        <p className="text-[11px] text-red-600 mt-1">{errors.reported_occurrence_at}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Penentuan Lokasi Geografis & Peta */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-[#DDE3DE]">
                                <span className="size-6 rounded-full bg-[#174B35] text-white text-xs font-mono font-bold flex items-center justify-center">
                                    2
                                </span>
                                <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider">
                                    Penentuan Lokasi Geografis & Peta Kalimantan
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Provinsi di Kalimantan <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        value={data.province}
                                        onChange={(e) => setData('province', e.target.value)}
                                        className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19] bg-white"
                                        required
                                    >
                                        {provinces.map((prov) => (
                                            <option key={prov} value={prov}>
                                                {prov}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.province && <p className="text-[11px] text-red-600 mt-1">{errors.province}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Kabupaten / Kota <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.regency_city}
                                        onChange={(e) => setData('regency_city', e.target.value)}
                                        placeholder="Contoh: Kabupaten Kubu Raya"
                                        className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19]"
                                        required
                                    />
                                    {errors.regency_city && <p className="text-[11px] text-red-600 mt-1">{errors.regency_city}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-semibold text-[#171C19]">
                                    Pilih Posisi Titik Api pada Peta Interaktif <span className="text-red-600">*</span>
                                </label>
                                <p className="text-[11px] text-[#68716B]">
                                    Klik titik pada peta di bawah ini untuk mengunci koordinat lokasi kebakaran secara akurat.
                                </p>

                                <div className="border border-[#DDE3DE] rounded-xl overflow-hidden shadow-xs">
                                    <KarhutlaMap
                                        interactiveSelectMode={true}
                                        selectedCoordinates={selectedCoords}
                                        onSelectCoordinates={handleMapClick}
                                        height="320px"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-1">
                                    <div className="bg-[#F3F7F4] p-3 rounded-xl border border-[#DDE3DE]">
                                        <span className="text-[11px] text-[#68716B] block mb-1">Lintang (Latitude):</span>
                                        <input
                                            type="number"
                                            step="any"
                                            value={data.latitude}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value) || 0;
                                                setData('latitude', val);
                                                setSelectedCoords((prev) => ({ ...prev, lat: val }));
                                            }}
                                            className="w-full text-xs font-mono font-bold p-2 rounded-lg border border-[#DDE3DE] bg-white"
                                            required
                                        />
                                        {errors.latitude && <p className="text-[11px] text-red-600 mt-1">{errors.latitude}</p>}
                                    </div>
                                    <div className="bg-[#F3F7F4] p-3 rounded-xl border border-[#DDE3DE]">
                                        <span className="text-[11px] text-[#68716B] block mb-1">Bujur (Longitude):</span>
                                        <input
                                            type="number"
                                            step="any"
                                            value={data.longitude}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value) || 0;
                                                setData('longitude', val);
                                                setSelectedCoords((prev) => ({ ...prev, lng: val }));
                                            }}
                                            className="w-full text-xs font-mono font-bold p-2 rounded-lg border border-[#DDE3DE] bg-white"
                                            required
                                        />
                                        {errors.longitude && <p className="text-[11px] text-red-600 mt-1">{errors.longitude}</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                    Petunjuk Lokasi Khusus / Patok Lapangan Terdekat <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.location_description}
                                    onChange={(e) => setData('location_description', e.target.value)}
                                    placeholder="Contoh: Dekat jembatan kayu ke-2 saluran irigasi sekunder blok D, 300 meter dari jalan poros aspal"
                                    className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19]"
                                    required
                                />
                                {errors.location_description && (
                                    <p className="text-[11px] text-red-600 mt-1">{errors.location_description}</p>
                                )}
                            </div>
                        </div>

                        {/* Section 3: Uraian Kondisi & Bukti Foto */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-[#DDE3DE]">
                                <span className="size-6 rounded-full bg-[#174B35] text-white text-xs font-mono font-bold flex items-center justify-center">
                                    3
                                </span>
                                <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider">
                                    Uraian Kondisi Kebakaran & Bukti
                                </h2>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                    Rincian Kejadian & Kondisi Lapangan <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan perkiraan luas kebakaran, warna asap (hitam pekat/putih kelabu), arah pergerakan api, jarak ke pemukiman terdekat, serta ada tidaknya parit atau sumber air terdekat..."
                                    className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19]"
                                    required
                                />
                                {errors.description && <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                    Foto Bukti Lapangan (Opsional, dari jarak aman)
                                </label>
                                <div className="border-2 border-dashed border-[#DDE3DE] hover:border-[#216B49] rounded-2xl p-6 text-center cursor-pointer bg-[#F3F7F4]/50 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="evidence-upload"
                                    />
                                    <label htmlFor="evidence-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                        <div className="size-10 rounded-xl bg-white border border-[#DDE3DE] text-[#216B49] flex items-center justify-center shadow-xs">
                                            <Upload className="size-5" />
                                        </div>
                                        <span className="text-xs font-semibold text-[#171C19]">
                                            Pilih foto bukti dari perangkat Anda
                                        </span>
                                        <span className="text-[11px] text-[#68716B]">
                                            Format JPG, PNG, atau WEBP. Maksimal ukuran berkas 5 MB.
                                        </span>
                                    </label>
                                </div>
                                {previewImage && (
                                    <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-[#F3F7F4] border border-[#DDE3DE]">
                                        <img src={previewImage} alt="Pratinjau bukti" className="size-20 rounded-lg object-cover border border-[#DDE3DE]" />
                                        <div className="text-xs">
                                            <div className="font-semibold text-[#171C19]">Foto Berhasil Dipilih</div>
                                            <div className="text-[11px] text-[#68716B]">Akan diunggah bersama formulir laporan.</div>
                                        </div>
                                    </div>
                                )}
                                {errors.evidence_file && <p className="text-[11px] text-red-600 mt-1">{errors.evidence_file}</p>}
                            </div>
                        </div>

                        {/* Section 4: Konfirmasi Keselamatan Wajib */}
                        <div className="bg-[#F3F7F4] border border-[#DDE3DE] p-5 rounded-2xl space-y-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.safety_acknowledged}
                                    onChange={(e) => setData('safety_acknowledged', e.target.checked)}
                                    className="mt-0.5 size-4 rounded text-[#216B49] focus:ring-[#216B49] border-[#DDE3DE]"
                                    required
                                />
                                <span className="text-xs text-[#343B36] leading-relaxed">
                                    <strong className="text-[#171C19]">Pernyataan Keselamatan Warga:</strong> Saya menyatakan bahwa informasi ini saya ambil dari jarak yang aman tanpa mendekati kobaran api atau melintasi lahan gambut berasap. Saya memahami bahwa JAGAIN adalah platform pengawalan akuntabilitas dan bukan saluran darurat penyelamatan jiwa 112.
                                </span>
                            </label>
                            {errors.safety_acknowledged && (
                                <p className="text-[11px] text-red-600 mt-1 pl-7">{errors.safety_acknowledged}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 px-6 rounded-xl bg-[#216B49] hover:bg-[#174B35] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                            >
                                <Send className="size-4" />
                                {processing ? 'Sedang Mengirim & Memverifikasi Koordinat...' : 'Kirim Laporan Resmi Karhutla'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
