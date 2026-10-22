import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import KarhutlaMap from '@/components/karhutla-map';
import {
    Shield,
    Upload,
    AlertCircle,
    ArrowLeft,
    Send,
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
        <div className="min-h-screen flex flex-col bg-[#f0eee6] text-[#141413] selection:bg-[#e3dacc] selection:text-[#141413]">
            <Head title="Formulir Pelaporan Karhutla — JAGAIN" />
            <Navbar />

            {/* Breadcrumb Header Strip */}
            <div className="bg-[#f0eee6] border-b border-[#cccbc8] py-4 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    <Link
                        href="/laporan-saya"
                        className="link-editorial inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413]"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Kembali ke Laporan Saya</span>
                    </Link>
                    <span className="font-mono text-xs text-[#87867f] uppercase">
                        Formulir Registrasi Warga
                    </span>
                </div>
            </div>

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto w-full space-y-8">
                    {/* Header Intro */}
                    <div className="space-y-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#87867f] block">
                            Partisipasi Publik
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413]">
                            Laporkan Kejadian Kebakaran Hutan & Lahan
                        </h1>
                        <p className="font-serif text-base text-[#87867f] leading-relaxed">
                            Laporan Anda akan memperoleh kode lacak unik dan diverifikasi oleh tim verifikator sebelum diteruskan ke instansi penanganan resmi di Kalimantan (BPBD, Manggala Agni, atau Damkar).
                        </p>
                    </div>

                    {/* Critical Safety Notice Callout (Featured Manilla Card) */}
                    <div className="card-featured space-y-3">
                        <div className="font-sans font-bold text-sm text-[#141413] flex items-center gap-2">
                            <AlertCircle className="size-4 text-[#d97757] shrink-0" />
                            <span>Prioritas Utama: Jaga Jarak Aman & Keselamatan Jiwa</span>
                        </div>
                        <p className="font-serif text-sm text-[#141413] leading-relaxed">
                            Jangan pernah mendekati lidah api aktif, menghirup asap pekat beracun, atau berjalan di atas lahan gambut berasap hanya untuk mengambil foto atau video. Ambil foto dari kejauhan (minimal 500 meter di posisi melawan arah angin). <strong className="font-semibold">Jika api sudah mengancam permukiman, segera evakuasi dan telepon darurat 112.</strong>
                        </p>
                    </div>

                    {/* Main Form inside card-standard */}
                    <div className="card-standard p-8 sm:p-10 font-sans">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Section 1: Informasi Pokok Kejadian */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-3 border-b border-[#cccbc8]">
                                    <span className="size-6 bg-[#141413] text-[#faf9f5] text-xs font-mono font-bold flex items-center justify-center">
                                        1
                                    </span>
                                    <h2 className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                                        Informasi Pokok Kejadian
                                    </h2>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#141413] mb-2">
                                        Judul Ringkas Laporan <span className="text-[#d97757]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Titik Api di Parit Sekunder Lahan Gambut Rasau Jaya"
                                        className="w-full text-xs p-3.5 border border-[#cccbc8] focus:outline-none focus:border-[#141413] text-[#141413] bg-[#faf9f5]"
                                        required
                                    />
                                    {errors.title && <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#141413] mb-2">
                                            Kategori Kejadian <span className="text-[#d97757]">*</span>
                                        </label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="w-full text-xs p-3.5 border border-[#cccbc8] focus:outline-none focus:border-[#141413] text-[#141413] bg-[#faf9f5]"
                                            required
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.category_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#141413] mb-2">
                                            Waktu Kejadian Dilihat <span className="text-[#d97757]">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={data.reported_occurrence_at}
                                            onChange={(e) => setData('reported_occurrence_at', e.target.value)}
                                            className="w-full text-xs p-3.5 border border-[#cccbc8] focus:outline-none focus:border-[#141413] text-[#141413] bg-[#faf9f5]"
                                            required
                                        />
                                        {errors.reported_occurrence_at && (
                                            <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.reported_occurrence_at}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Penentuan Lokasi Geografis & Peta */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-3 border-b border-[#cccbc8]">
                                    <span className="size-6 bg-[#141413] text-[#faf9f5] text-xs font-mono font-bold flex items-center justify-center">
                                        2
                                    </span>
                                    <h2 className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                                        Penentuan Lokasi Geografis Kalimantan
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#141413] mb-2">
                                            Provinsi di Kalimantan <span className="text-[#d97757]">*</span>
                                        </label>
                                        <select
                                            value={data.province}
                                            onChange={(e) => setData('province', e.target.value)}
                                            className="w-full text-xs p-3.5 border border-[#cccbc8] focus:outline-none focus:border-[#141413] text-[#141413] bg-[#faf9f5]"
                                            required
                                        >
                                            {provinces.map((prov) => (
                                                <option key={prov} value={prov}>
                                                    {prov}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.province && <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.province}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#141413] mb-2">
                                            Kabupaten / Kota <span className="text-[#d97757]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.regency_city}
                                            onChange={(e) => setData('regency_city', e.target.value)}
                                            placeholder="Contoh: Kabupaten Kubu Raya"
                                            className="w-full text-xs p-3.5 border border-[#cccbc8] focus:outline-none focus:border-[#141413] text-[#141413] bg-[#faf9f5]"
                                            required
                                        />
                                        {errors.regency_city && <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.regency_city}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-xs font-semibold text-[#141413]">
                                        Tentukan Titik Koordinat pada Peta <span className="text-[#d97757]">*</span>
                                    </label>
                                    <p className="text-xs text-[#87867f] font-serif">
                                        Klik pada peta interaktif di bawah untuk mengunci koordinat lokasi kebakaran secara presisi.
                                    </p>

                                    <div className="card-standard p-0 overflow-hidden border border-[#cccbc8]">
                                        <KarhutlaMap
                                            interactiveSelectMode={true}
                                            selectedCoordinates={selectedCoords}
                                            onSelectCoordinates={handleMapClick}
                                            height="340px"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-1 font-mono">
                                        <div className="bg-[#f0eee6] p-3 border border-[#cccbc8]">
                                            <span className="text-[11px] text-[#87867f] block mb-1">Lintang (Latitude):</span>
                                            <input
                                                type="number"
                                                step="any"
                                                value={data.latitude}
                                                onChange={(e) => {
                                                    const val = parseFloat(e.target.value) || 0;
                                                    setData('latitude', val);
                                                    setSelectedCoords((prev) => ({ ...prev, lat: val }));
                                                }}
                                                className="w-full text-xs font-mono font-bold p-2 border border-[#cccbc8] bg-[#faf9f5] text-[#141413]"
                                                required
                                            />
                                            {errors.latitude && <p className="text-xs text-[#c6613f] mt-1">{errors.latitude}</p>}
                                        </div>
                                        <div className="bg-[#f0eee6] p-3 border border-[#cccbc8]">
                                            <span className="text-[11px] text-[#87867f] block mb-1">Bujur (Longitude):</span>
                                            <input
                                                type="number"
                                                step="any"
                                                value={data.longitude}
                                                onChange={(e) => {
                                                    const val = parseFloat(e.target.value) || 0;
                                                    setData('longitude', val);
                                                    setSelectedCoords((prev) => ({ ...prev, lng: val }));
                                                }}
                                                className="w-full text-xs font-mono font-bold p-2 border border-[#cccbc8] bg-[#faf9f5] text-[#141413]"
                                                required
                                            />
                                            {errors.longitude && <p className="text-xs text-[#c6613f] mt-1">{errors.longitude}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#141413] mb-2">
                                        Petunjuk Patok Lokasi Lapangan <span className="text-[#d97757]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location_description}
                                        onChange={(e) => setData('location_description', e.target.value)}
                                        placeholder="Contoh: Dekat jembatan kayu ke-2 saluran irigasi sekunder blok D, 300 meter dari jalan poros"
                                        className="w-full text-xs p-3.5 border border-[#cccbc8] focus:outline-none focus:border-[#141413] text-[#141413] bg-[#faf9f5]"
                                        required
                                    />
                                    {errors.location_description && (
                                        <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.location_description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Section 3: Uraian Kondisi & Bukti Foto */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-3 border-b border-[#cccbc8]">
                                    <span className="size-6 bg-[#141413] text-[#faf9f5] text-xs font-mono font-bold flex items-center justify-center">
                                        3
                                    </span>
                                    <h2 className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                                        Uraian Kondisi Kebakaran & Bukti Visual
                                    </h2>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#141413] mb-2">
                                        Rincian Kejadian & Kondisi Lapangan <span className="text-[#d97757]">*</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Jelaskan perkiraan luas kebakaran, warna asap (hitam pekat/putih kelabu), arah pergerakan api, jarak ke pemukiman terdekat, serta sumber air terdekat..."
                                        className="w-full text-sm p-3.5 border border-[#cccbc8] focus:outline-none focus:border-[#141413] text-[#141413] bg-[#faf9f5] font-serif leading-relaxed"
                                        required
                                    />
                                    {errors.description && <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#141413] mb-2">
                                        Foto Bukti Lapangan (Opsional, dari jarak aman)
                                    </label>
                                    <div className="border border-dashed border-[#cccbc8] hover:border-[#141413] p-8 text-center cursor-pointer bg-[#f0eee6]/40 transition-colors">
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="evidence-upload"
                                        />
                                        <label htmlFor="evidence-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                            <div className="size-10 bg-[#faf9f5] border border-[#cccbc8] text-[#141413] flex items-center justify-center">
                                                <Upload className="size-4" />
                                            </div>
                                            <span className="text-xs font-semibold text-[#141413]">
                                                Pilih foto bukti dari perangkat Anda
                                            </span>
                                            <span className="text-[11px] text-[#87867f] font-mono">
                                                Format JPG, PNG, atau WEBP. Maksimal 5 MB.
                                            </span>
                                        </label>
                                    </div>
                                    {previewImage && (
                                        <div className="mt-4 flex items-center gap-4 p-4 bg-[#f0eee6] border border-[#cccbc8]">
                                            <img src={previewImage} alt="Pratinjau bukti" className="size-20 object-cover border border-[#cccbc8]" />
                                            <div className="text-xs">
                                                <div className="font-semibold text-[#141413]">Foto Terpilih</div>
                                                <div className="text-[11px] text-[#87867f] font-serif">Akan diunggah bersama laporan.</div>
                                            </div>
                                        </div>
                                    )}
                                    {errors.evidence_file && <p className="text-xs text-[#c6613f] mt-1 font-mono">{errors.evidence_file}</p>}
                                </div>
                            </div>

                            {/* Section 4: Pernyataan Keselamatan Wajib */}
                            <div className="card-warm p-6 space-y-2 font-serif text-xs leading-relaxed text-[#141413]">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.safety_acknowledged}
                                        onChange={(e) => setData('safety_acknowledged', e.target.checked)}
                                        className="mt-0.5 size-4 accent-[#d97757] border-[#cccbc8]"
                                        required
                                    />
                                    <span>
                                        <strong className="font-sans font-semibold text-[#141413]">Pernyataan Keselamatan Warga:</strong> Saya menyatakan bahwa informasi ini saya ambil dari jarak yang aman tanpa membahayakan keselamatan diri atau melintasi lahan gambut berasap. Saya memahami bahwa JAGAIN adalah platform pengawalan akuntabilitas dan bukan saluran darurat 112.
                                    </span>
                                </label>
                                {errors.safety_acknowledged && (
                                    <p className="text-xs text-[#c6613f] mt-1 pl-7 font-mono">{errors.safety_acknowledged}</p>
                                )}
                            </div>

                            {/* Submit Button: Single Clay CTA */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-clay w-full py-4 text-sm cursor-pointer disabled:opacity-50"
                                >
                                    <Send className="size-4" />
                                    <span>{processing ? 'Sedang Mendaftarkan Laporan...' : 'Kirim Laporan Resmi Karhutla'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
