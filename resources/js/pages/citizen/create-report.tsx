import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import KarhutlaMap from '@/components/karhutla-map';
import { Shield, MapPin, Upload, AlertCircle, ArrowLeft, Send } from 'lucide-react';

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
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title="Formulir Laporan Karhutla — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#216B49] hover:text-[#174B35]"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Form Container Card */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                    <div className="border-b border-[#DDE3DE] pb-5 mb-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EB] text-[#174B35] font-semibold text-xs mb-2">
                            <Shield className="size-3.5" />
                            Pelaporan Warga Kalimantan
                        </div>
                        <h1 className="text-2xl font-bold text-[#171C19]">
                            Formulir Pelaporan Kebakaran Hutan & Lahan
                        </h1>
                        <p className="text-xs text-[#68716B] mt-1 leading-relaxed">
                            Laporan Anda akan diperiksa oleh tim admin sebelum diteruskan kepada instansi penanganan resmi terkait di Kalimantan.
                        </p>
                    </div>

                    {/* Critical Safety Notice Box */}
                    <div className="bg-[#E8F1EB] border-l-4 border-[#174B35] p-4 rounded-r-lg mb-8 text-xs text-[#174B35] space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                            <AlertCircle className="size-4 text-[#174B35]" />
                            Peringatan Keselamatan Wajib:
                        </div>
                        <p className="text-[#343B36] leading-relaxed">
                            Jangan pernah mendekati lidah api aktif, asap pekat beracun, atau berjalan di atas lahan gambut yang berpotensi amblas hanya demi mengambil foto atau video. Ambil informasi dari jarak yang aman.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Laporan */}
                        <div>
                            <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                Judul Ringkas Laporan <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Contoh: Titik Api di Parit Sekunder Lahan Gambut Rasau Jaya"
                                className="w-full text-xs p-3 rounded-lg border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19]"
                                required
                            />
                            {errors.title && <p className="text-[11px] text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        {/* Kategori Laporan */}
                        <div>
                            <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                Kategori Kejadian <span className="text-red-600">*</span>
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full text-xs p-3 rounded-lg border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19] bg-white"
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

                        {/* Wilayah Administratif */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                    Provinsi di Kalimantan <span className="text-red-600">*</span>
                                </label>
                                <select
                                    value={data.province}
                                    onChange={(e) => setData('province', e.target.value)}
                                    className="w-full text-xs p-3 rounded-lg border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19] bg-white"
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
                                    className="w-full text-xs p-3 rounded-lg border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19]"
                                    required
                                />
                                {errors.regency_city && <p className="text-[11px] text-red-600 mt-1">{errors.regency_city}</p>}
                            </div>
                        </div>

                        {/* Interactive Map Coordinate Picker */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-[#171C19]">
                                Pilih Titik Lokasi pada Peta <span className="text-red-600">*</span>
                            </label>
                            <p className="text-[11px] text-[#68716B]">
                                Klik pada peta di bawah ini untuk menandai posisi kebakaran. Koordinat akan diperbarui secara otomatis.
                            </p>

                            <KarhutlaMap
                                interactiveSelectMode={true}
                                selectedCoordinates={selectedCoords}
                                onSelectCoordinates={handleMapClick}
                                height="320px"
                            />

                            <div className="grid grid-cols-2 gap-4 pt-1">
                                <div>
                                    <span className="text-[11px] text-[#68716B]">Lintang (Latitude):</span>
                                    <input
                                        type="number"
                                        step="any"
                                        value={data.latitude}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value) || 0;
                                            setData('latitude', val);
                                            setSelectedCoords((prev) => ({ ...prev, lat: val }));
                                        }}
                                        className="w-full text-xs font-mono p-2 rounded border border-[#DDE3DE]"
                                        required
                                    />
                                    {errors.latitude && <p className="text-[11px] text-red-600 mt-1">{errors.latitude}</p>}
                                </div>
                                <div>
                                    <span className="text-[11px] text-[#68716B]">Bujur (Longitude):</span>
                                    <input
                                        type="number"
                                        step="any"
                                        value={data.longitude}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value) || 0;
                                            setData('longitude', val);
                                            setSelectedCoords((prev) => ({ ...prev, lng: val }));
                                        }}
                                        className="w-full text-xs font-mono p-2 rounded border border-[#DDE3DE]"
                                        required
                                    />
                                    {errors.longitude && <p className="text-[11px] text-red-600 mt-1">{errors.longitude}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Deskripsi Lokasi Rinci */}
                        <div>
                            <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                Petunjuk Lokasi Khusus / Patok Terdekat <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.location_description}
                                onChange={(e) => setData('location_description', e.target.value)}
                                placeholder="Contoh: Dekat jembatan kayu ke-2 saluran irigasi primer blok D, 300 meter dari jalan poros"
                                className="w-full text-xs p-3 rounded-lg border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19]"
                                required
                            />
                            {errors.location_description && <p className="text-[11px] text-red-600 mt-1">{errors.location_description}</p>}
                        </div>

                        {/* Deskripsi Kejadian */}
                        <div>
                            <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                Rincian Kejadian & Kondisi Kebakaran <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan perkiraan luas kebakaran, warna asap (hitam/putih), arah pergerakan api, jarak ke rumah terdekat, serta ada tidaknya sumber air parit/sungai di sekitar lokasi..."
                                className="w-full text-xs p-3 rounded-lg border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] text-[#171C19]"
                                required
                            />
                            {errors.description && <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>}
                        </div>

                        {/* Upload Bukti Foto Opsional */}
                        <div>
                            <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                Bukti Foto Kejadian (Opsional, dari jarak aman)
                            </label>
                            <div className="border-2 border-dashed border-[#DDE3DE] hover:border-[#216B49] rounded-xl p-4 text-center cursor-pointer bg-[#F3F7F4]/50">
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="evidence-upload"
                                />
                                <label htmlFor="evidence-upload" className="cursor-pointer flex flex-col items-center">
                                    <Upload className="size-6 text-[#216B49] mb-2" />
                                    <span className="text-xs font-semibold text-[#171C19]">
                                        Pilih foto bukti dari perangkat Anda
                                    </span>
                                    <span className="text-[11px] text-[#68716B] mt-0.5">
                                        Format JPG, PNG, atau WEBP. Maksimal 5 MB.
                                    </span>
                                </label>
                            </div>
                            {previewImage && (
                                <div className="mt-3 relative size-28 rounded-lg overflow-hidden border border-[#DDE3DE]">
                                    <img src={previewImage} alt="Pratinjau bukti" className="size-full object-cover" />
                                </div>
                            )}
                            {errors.evidence_file && <p className="text-[11px] text-red-600 mt-1">{errors.evidence_file}</p>}
                        </div>

                        {/* Safety Confirmation Checklist (Mandatory) */}
                        <div className="bg-[#F3F7F4] border border-[#DDE3DE] p-4 rounded-xl">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.safety_acknowledged}
                                    onChange={(e) => setData('safety_acknowledged', e.target.checked)}
                                    className="mt-0.5 rounded text-[#216B49] focus:ring-[#216B49]"
                                    required
                                />
                                <span className="text-xs text-[#343B36] leading-relaxed">
                                    <strong className="text-[#171C19]">Pernyataan Keselamatan:</strong> Saya mengonfirmasi bahwa saya mengambil data dan informasi laporan ini dari jarak aman tanpa membahayakan diri di dekat lidah api atau asap beracun. Saya memahami bahwa JAGAIN adalah platform pemantauan dan bukan nomor darurat.
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
                                className="w-full py-3.5 px-4 rounded-xl bg-[#216B49] hover:bg-[#174B35] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Send className="size-4" />
                                {processing ? 'Sedang Mengirim Laporan...' : 'Kirim Laporan Resmi'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
