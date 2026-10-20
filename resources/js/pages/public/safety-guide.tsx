import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import { Shield, AlertTriangle, Wind, HeartPulse, PhoneCall, ArrowRight } from 'lucide-react';

export default function SafetyGuide() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-[#171C19]">
            <Head title="Panduan Keselamatan Karhutla — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="border-b border-[#DDE3DE] pb-6 mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EB] text-[#174B35] font-semibold text-xs mb-3">
                        <Shield className="size-3.5" />
                        Protokol Perlindungan Diri
                    </div>
                    <h1 className="text-3xl font-bold text-[#171C19] tracking-tight">
                        Panduan Keselamatan Menghadapi Karhutla
                    </h1>
                    <p className="text-sm text-[#68716B] mt-2 leading-relaxed max-w-3xl">
                        Keselamatan jiwa adalah prioritas mutlak. JAGAIN mengimbau masyarakat untuk selalu mengutamakan jarak aman dan tidak pernah membahayakan diri sendiri hanya untuk mengambil dokumentasi atau bukti kebakaran.
                    </p>
                </div>

                {/* Important Alert Box */}
                <div className="bg-[#F3F7F4] border-l-4 border-[#174B35] p-5 rounded-r-xl mb-10 text-xs text-[#343B36] space-y-2">
                    <div className="font-bold text-sm text-[#174B35] flex items-center gap-2">
                        <AlertTriangle className="size-4 text-[#174B35]" />
                        Peringatan Khusus Bahaya Lahan Gambut
                    </div>
                    <p className="leading-relaxed">
                        Lahan gambut di Kalimantan memiliki sifat terbakar di bawah permukaan tanah (smoldering / ground fire). Lapangan yang terlihat dingin di atasnya bisa jadi memiliki rongga bara api menyala sedalam 1–3 meter. Tanah gambut dapat ambles tiba-tiba ketika diinjak. <strong>Jangan pernah memasuki area gambut yang sedang mengeluarkan asap tipis sekalipun.</strong>
                    </p>
                </div>

                {/* Grid of Key Safety Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Rule 1 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-2">
                        <div className="size-8 rounded-lg bg-[#E8F1EB] text-[#174B35] font-bold flex items-center justify-center text-xs">
                            01
                        </div>
                        <h2 className="font-bold text-base text-[#171C19]">
                            Jaga Jarak Aman & Perhatikan Arah Angin
                        </h2>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Selalu berada di posisi melawan arah angin (upwind) dari sumber asap dan api. Perubahan arah angin di musim kemarau Kalimantan dapat terjadi mendadak dan mengurung jalur penyelamatan Anda.
                        </p>
                    </div>

                    {/* Rule 2 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-2">
                        <div className="size-8 rounded-lg bg-[#E8F1EB] text-[#216B49] font-bold flex items-center justify-center text-xs">
                            02
                        </div>
                        <h2 className="font-bold text-base text-[#171C19]">
                            Lindungi Saluran Pernapasan dari ISPA
                        </h2>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Asap karhutla mengandung partikel mikro berbahaya PM2.5, karbon monoksida, dan gas beracun. Gunakan masker respirator minimal standar N95 atau KN95 jika harus beraktivitas di luar ruangan. Masker kain biasa tidak mampu menyaring partikel PM2.5.
                        </p>
                    </div>

                    {/* Rule 3 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-2">
                        <div className="size-8 rounded-lg bg-[#E8F1EB] text-[#39845C] font-bold flex items-center justify-center text-xs">
                            03
                        </div>
                        <h2 className="font-bold text-base text-[#171C19]">
                            Lindungi Kelompok Rentan di Dalam Ruangan
                        </h2>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Bayi, anak-anak, lansia, ibu hamil, serta penderita asma atau riwayat jantung tidak boleh terpapar asap tebal. Tutup celah ventilasi jendela dengan kain lembap dan nyalakan penjernih udara (air purifier) jika tersedia.
                        </p>
                    </div>

                    {/* Rule 4 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-2">
                        <div className="size-8 rounded-lg bg-[#E8F1EB] text-[#174B35] font-bold flex items-center justify-center text-xs">
                            04
                        </div>
                        <h2 className="font-bold text-base text-[#171C19]">
                            Ketahui Kapan Harus Evakuasi Cepat
                        </h2>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Jika jarak titik api telah mendekati kurang dari 500 meter dari pemukiman dan menimbulkan hujan abu atau loncatan bunga api, segera evakuasi dokumen penting dan keluarga ke tempat aman tanpa menunggu perintah formal.
                        </p>
                    </div>
                </div>

                {/* Emergency Hotlines Box */}
                <div className="bg-[#171C19] text-white rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <PhoneCall className="size-5 text-[#E8F1EB]" />
                            Nomor Panggilan Darurat Kalimantan
                        </h2>
                        <p className="text-xs text-[#DDE3DE] max-w-xl leading-relaxed">
                            Jika Anda melihat kebakaran aktif mengancam pemukiman warga, segera hubungi kanal resmi pemerintah daerah berikut:
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                            <span className="bg-white/10 px-3 py-1.5 rounded-md border border-white/20 font-bold">
                                112 (Panggilan Darurat Bebas Pulsa)
                            </span>
                            <span className="bg-white/10 px-3 py-1.5 rounded-md border border-white/20">
                                Posko BPBD Provinsi Setempat
                            </span>
                        </div>
                    </div>

                    <Link
                        href="/lapor"
                        className="px-5 py-2.5 rounded-lg bg-[#216B49] hover:bg-[#39845C] text-white text-xs font-semibold shrink-0 transition-colors inline-flex items-center gap-1.5"
                    >
                        Buat Laporan Terstruktur
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
