import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import KarhutlaMap from '@/components/karhutla-map';
import {
    Shield,
    Upload,
    AlertCircle,
    ArrowLeft,
    Send,
    MapPin,
    Calendar,
    FileText,
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
        <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-[#F8FAF9] dark:bg-[#0D120F] min-h-screen text-[#171C19] dark:text-[#F3F7F4] font-sans">
            <Head title="Formulir Pelaporan Karhutla — JAGAIN" />

            <div className="max-w-4xl mx-auto w-full space-y-8">
                {/* Back Link & Breadcrumb Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-[#DDE3DE] dark:border-neutral-800">
                    <Link
                        href="/laporan-saya"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#216B49] hover:text-[#174B35] dark:text-[#10e57a] dark:hover:underline transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        <span>Kembali ke Laporan Saya</span>
                    </Link>
                    <span className="font-mono text-xs text-[#68716B] dark:text-neutral-400 uppercase tracking-wider font-semibold">
                        Formulir Registrasi Laporan
                    </span>
                </div>

                {/* Header Intro */}
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#216B49] dark:text-[#10e57a]">
                        <Shield className="size-4" />
                        <span>Partisipasi Publik</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#171C19] dark:text-white">
                        Laporkan Kejadian Kebakaran Hutan & Lahan
                    </h1>
                    <p className="text-sm sm:text-base text-[#68716B] dark:text-neutral-300 leading-relaxed max-w-3xl">
                        Laporan Anda akan memperoleh kode lacak unik dan diverifikasi oleh tim verifikator sebelum diteruskan ke instansi penanganan resmi di Kalimantan (BPBD, Manggala Agni, atau Damkar).
                    </p>
                </div>

                {/* Safety Notice Callout Banner */}
                <div className="rounded-2xl border border-emerald-200 bg-[#E8F1EB] p-5 sm:p-6 text-[#174B35] dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-200 space-y-2 shadow-2xs">
                    <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                        <AlertCircle className="size-5 text-[#216B49] dark:text-[#10e57a] shrink-0" />
                        <span>Prioritas Utama: Jaga Jarak Aman & Keselamatan Jiwa</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#174B35] dark:text-emerald-300/90">
                        Jangan pernah mendekati lidah api aktif, menghirup asap pekat beracun, atau berjalan di atas lahan gambut berasap hanya untuk mengambil foto atau video. Ambil foto dari kejauhan (minimal 500 meter di posisi melawan arah angin). <strong className="font-bold text-[#171C19] dark:text-white">Jika api sudah mengancam permukiman, segera evakuasi dan telepon darurat 112.</strong>
                    </p>
                </div>

                {/* Main Form inside Clean White Card */}
                <div className="rounded-2xl border border-[#DDE3DE] bg-white p-6 sm:p-10 shadow-sm dark:border-neutral-800 dark:bg-[#141A16]">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Section 1: Informasi Pokok Kejadian */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-3 border-b border-[#DDE3DE] dark:border-neutral-800">
                                <span className="size-7 rounded-xl bg-[#216B49] text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                                    1
                                </span>
                                <h2 className="text-sm font-bold text-[#171C19] dark:text-white uppercase tracking-wider">
                                    Informasi Pokok Kejadian
                                </h2>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                    Judul Ringkas Laporan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Titik Api di Parit Sekunder Lahan Gambut Rasau Jaya"
                                    className="w-full text-sm p-3.5 rounded-xl border border-[#DDE3DE] bg-white dark:bg-neutral-900 text-[#171C19] dark:text-white focus:outline-none focus:border-[#216B49] focus:ring-2 focus:ring-[#216B49]/20 transition-all"
                                    required
                                />
                                {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                        Kategori Kejadian <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full text-sm p-3.5 rounded-xl border border-[#DDE3DE] bg-white dark:bg-neutral-900 text-[#171C19] dark:text-white focus:outline-none focus:border-[#216B49] focus:ring-2 focus:ring-[#216B49]/20 transition-all cursor-pointer"
                                        required
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-xs text-red-500 font-medium">{errors.category_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                        Waktu Kejadian Dilihat <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.reported_occurrence_at}
                                        onChange={(e) => setData('reported_occurrence_at', e.target.value)}
                                        className="w-full text-sm p-3.5 rounded-xl border border-[#DDE3DE] bg-white dark:bg-neutral-900 text-[#171C19] dark:text-white focus:outline-none focus:border-[#216B49] focus:ring-2 focus:ring-[#216B49]/20 transition-all"
                                        required
                                    />
                                    {errors.reported_occurrence_at && (
                                        <p className="text-xs text-red-500 font-medium">{errors.reported_occurrence_at}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Penentuan Lokasi Geografis & Peta */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-3 border-b border-[#DDE3DE] dark:border-neutral-800">
                                <span className="size-7 rounded-xl bg-[#216B49] text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                                    2
                                </span>
                                <h2 className="text-sm font-bold text-[#171C19] dark:text-white uppercase tracking-wider">
                                    Penentuan Lokasi Geografis Kalimantan
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                        Provinsi di Kalimantan <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.province}
                                        onChange={(e) => setData('province', e.target.value)}
                                        className="w-full text-sm p-3.5 rounded-xl border border-[#DDE3DE] bg-white dark:bg-neutral-900 text-[#171C19] dark:text-white focus:outline-none focus:border-[#216B49] focus:ring-2 focus:ring-[#216B49]/20 transition-all cursor-pointer"
                                        required
                                    >
                                        {provinces.map((prov) => (
                                            <option key={prov} value={prov}>
                                                {prov}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.province && <p className="text-xs text-red-500 font-medium">{errors.province}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                        Kabupaten / Kota <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.regency_city}
                                        onChange={(e) => setData('regency_city', e.target.value)}
                                        placeholder="Contoh: Kabupaten Kubu Raya"
                                        className="w-full text-sm p-3.5 rounded-xl border border-[#DDE3DE] bg-white dark:bg-neutral-900 text-[#171C19] dark:text-white focus:outline-none focus:border-[#216B49] focus:ring-2 focus:ring-[#216B49]/20 transition-all"
                                        required
                                    />
                                    {errors.regency_city && <p className="text-xs text-red-500 font-medium">{errors.regency_city}</p>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                    Tentukan Titik Koordinat pada Peta <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                    Klik pada peta interaktif di bawah untuk mengunci koordinat lokasi kebakaran secara presisi di wilayah Kalimantan.
                                </p>

                                <div className="rounded-2xl overflow-hidden border border-[#DDE3DE] dark:border-neutral-800 shadow-xs">
                                    <KarhutlaMap
                                        interactiveSelectMode={true}
                                        selectedCoordinates={selectedCoords}
                                        onSelectCoordinates={handleMapClick}
                                        height="340px"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-1 font-mono">
                                    <div className="bg-[#F8FAF9] dark:bg-neutral-900 p-3.5 rounded-xl border border-[#DDE3DE] dark:border-neutral-800">
                                        <span className="text-[11px] text-[#68716B] dark:text-neutral-400 block mb-1">Lintang (Latitude):</span>
                                        <input
                                            type="number"
                                            step="any"
                                            value={data.latitude}
                                            onChange={(e) => setData('latitude', parseFloat(e.target.value))}
                                            className="w-full bg-transparent text-xs font-bold text-[#171C19] dark:text-white focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="bg-[#F8FAF9] dark:bg-neutral-900 p-3.5 rounded-xl border border-[#DDE3DE] dark:border-neutral-800">
                                        <span className="text-[11px] text-[#68716B] dark:text-neutral-400 block mb-1">Bujur (Longitude):</span>
                                        <input
                                            type="number"
                                            step="any"
                                            value={data.longitude}
                                            onChange={(e) => setData('longitude', parseFloat(e.target.value))}
                                            className="w-full bg-transparent text-xs font-bold text-[#171C19] dark:text-white focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                {errors.latitude && <p className="text-xs text-red-500 font-medium">{errors.latitude}</p>}
                                {errors.longitude && <p className="text-xs text-red-500 font-medium">{errors.longitude}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                    Petunjuk Patokan Lokasi Fisik <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.location_description}
                                    onChange={(e) => setData('location_description', e.target.value)}
                                    rows={2}
                                    placeholder="Contoh: Sekitar 2 km ke arah timur dari Pos Damkar Desa, di belakang deretan kebun sawit tua dekat sungai kecil."
                                    className="w-full text-sm p-3.5 rounded-xl border border-[#DDE3DE] bg-white dark:bg-neutral-900 text-[#171C19] dark:text-white focus:outline-none focus:border-[#216B49] focus:ring-2 focus:ring-[#216B49]/20 transition-all resize-none"
                                    required
                                />
                                {errors.location_description && (
                                    <p className="text-xs text-red-500 font-medium">{errors.location_description}</p>
                                )}
                            </div>
                        </div>

                        {/* Section 3: Rincian Kejadian & Bukti Visual */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-3 border-b border-[#DDE3DE] dark:border-neutral-800">
                                <span className="size-7 rounded-xl bg-[#216B49] text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                                    3
                                </span>
                                <h2 className="text-sm font-bold text-[#171C19] dark:text-white uppercase tracking-wider">
                                    Rincian Kejadian & Bukti Visual
                                </h2>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                    Deskripsi Kejadian Karhutla <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    placeholder="Jelaskan kondisi api (apakah berasap tebal atau kobaran api besar), luas perkiraan area terdampak, arah hembusan angin, dan apakah sudah ada regu pemadam di lokasi..."
                                    className="w-full text-sm p-3.5 rounded-xl border border-[#DDE3DE] bg-white dark:bg-neutral-900 text-[#171C19] dark:text-white focus:outline-none focus:border-[#216B49] focus:ring-2 focus:ring-[#216B49]/20 transition-all"
                                    required
                                />
                                {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-[#171C19] dark:text-neutral-200">
                                    Unggah Foto Bukti Kejadian (Opsional tapi Direkomendasikan)
                                </label>
                                <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                    Foto dari jarak aman membantu verifikator menelaah intensitas kebakaran lebih cepat. Format JPG/PNG (Maks 5 MB).
                                </p>

                                <div className="relative border-2 border-dashed border-[#DDE3DE] dark:border-neutral-800 rounded-2xl p-6 sm:p-8 text-center hover:border-[#216B49] dark:hover:border-[#10e57a] transition-colors cursor-pointer bg-[#F8FAF9] dark:bg-neutral-900/50">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="size-12 rounded-xl bg-white dark:bg-neutral-800 border border-[#DDE3DE] dark:border-neutral-700 flex items-center justify-center text-[#216B49] dark:text-[#10e57a] shadow-2xs">
                                            <Upload className="size-6" />
                                        </div>
                                        <div className="text-xs sm:text-sm font-semibold text-[#171C19] dark:text-white">
                                            Klik untuk memilih file foto bukti kejadian
                                        </div>
                                        <div className="text-xs text-[#68716B] dark:text-neutral-400 font-mono">
                                            JPEG, PNG, WEBP hingga 5MB
                                        </div>
                                    </div>
                                </div>

                                {previewImage && (
                                    <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-[#F8FAF9] dark:bg-neutral-900 border border-[#DDE3DE] dark:border-neutral-800">
                                        <img src={previewImage} alt="Pratinjau bukti" className="size-20 object-cover rounded-lg border border-[#DDE3DE]" />
                                        <div className="text-xs">
                                            <div className="font-bold text-[#171C19] dark:text-white">Foto Terpilih</div>
                                            <div className="text-[11px] text-[#68716B] dark:text-neutral-400">Akan diunggah dan disimpan sebagai bukti verifikasi.</div>
                                        </div>
                                    </div>
                                )}
                                {errors.evidence_file && <p className="text-xs text-red-500 font-medium">{errors.evidence_file}</p>}
                            </div>
                        </div>

                        {/* Section 4: Pernyataan Keselamatan Wajib */}
                        <div className="rounded-2xl p-5 sm:p-6 bg-[#E8F1EB] dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2 text-xs leading-relaxed text-[#174B35] dark:text-emerald-200">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.safety_acknowledged}
                                    onChange={(e) => setData('safety_acknowledged', e.target.checked)}
                                    className="mt-0.5 size-4 accent-[#216B49] rounded cursor-pointer"
                                    required
                                />
                                <span className="font-medium">
                                    <strong className="font-bold text-[#171C19] dark:text-white">Pernyataan Keselamatan Warga:</strong> Saya menyatakan bahwa informasi ini saya ambil dari jarak yang aman tanpa membahayakan keselamatan diri atau melintasi lahan gambut berasap. Saya memahami bahwa JAGAIN adalah platform pengawalan akuntabilitas dan bukan saluran darurat 112.
                                </span>
                            </label>
                            {errors.safety_acknowledged && (
                                <p className="text-xs text-red-500 font-medium pl-7">{errors.safety_acknowledged}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 px-6 text-sm sm:text-base font-bold bg-[#216B49] hover:bg-[#174B35] text-white rounded-xl shadow-[0_4px_16px_rgba(33,107,73,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                            >
                                <Send className="size-4" />
                                <span>{processing ? 'Sedang Mendaftarkan Laporan...' : 'Kirim Laporan Resmi Karhutla'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
