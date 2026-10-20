import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import { Info, ShieldCheck, Database, Layers, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-[#171C19]">
            <Head title="Transparansi & Provenance Data — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="border-b border-[#DDE3DE] pb-6 mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EB] text-[#174B35] font-semibold text-xs mb-3">
                        <Info className="size-3.5" />
                        Transparansi & Akuntabilitas Publik
                    </div>
                    <h1 className="text-3xl font-bold text-[#171C19] tracking-tight">
                        Tentang JAGAIN & Kejujuran Data
                    </h1>
                    <p className="text-sm text-[#68716B] mt-2 leading-relaxed max-w-3xl">
                        JAGAIN hadir sebagai jembatan transparansi perjalanan laporan kebakaran hutan dan lahan (karhutla) di Kalimantan, mulai dari pengiriman oleh warga hingga tindak lanjut di lapangan.
                    </p>
                </div>

                {/* Section 1: Apa itu JAGAIN dan Apa yang BUKAN JAGAIN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-[#E8F1EB]/50 border border-[#216B49]/30 rounded-xl p-6 space-y-3">
                        <h2 className="text-base font-bold text-[#174B35] flex items-center gap-2">
                            <ShieldCheck className="size-5 text-[#216B49]" />
                            Apa yang Disediakan JAGAIN
                        </h2>
                        <ul className="text-xs text-[#343B36] space-y-2 list-disc list-inside leading-relaxed">
                            <li>Pelaporan warga terstruktur dengan validasi koordinat geografis Kalimantan.</li>
                            <li>Kode lacak unik untuk memantau status secara berkesinambungan.</li>
                            <li>Alur verifikasi dan penugasan resmi kepada instansi berwenang (BPBD, Manggala Agni, Damkar).</li>
                            <li>Jejak audit dan kronologi perubahan status yang transparan tanpa memanipulasi riwayat.</li>
                            <li>Pemisahan tegas antara status laporan administratif dengan kondisi kebakaran aktual lapangan.</li>
                        </ul>
                    </div>

                    <div className="bg-[#F3F7F4] border border-[#DDE3DE] rounded-xl p-6 space-y-3">
                        <h2 className="text-base font-bold text-[#171C19] flex items-center gap-2">
                            <Info className="size-5 text-[#68716B]" />
                            Batasan Platform (Non-Goals)
                        </h2>
                        <ul className="text-xs text-[#68716B] space-y-2 list-disc list-inside leading-relaxed">
                            <li>Bukan pengganti nomor darurat nasional (112) atau layanan tanggap darurat resmi.</li>
                            <li>Bukan sistem komando operasional atau pelacak armada armada lapangan.</li>
                            <li>Tidak memiliki kewenangan penegakan hukum atau penetapan tersangka.</li>
                            <li>Tidak mempublikasikan identitas pribadi (PII) pelapor ke publik tanpa izin.</li>
                            <li>Tidak mengklaim data real-time jika frekuensi integrasi belum diverifikasi.</li>
                        </ul>
                    </div>
                </div>

                {/* Section 2: Klasifikasi Sumber Data */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-[#171C19] mb-4 flex items-center gap-2">
                        <Database className="size-5 text-[#216B49]" />
                        Klasifikasi & Asal-usul Data (Provenance)
                    </h2>
                    <p className="text-xs text-[#68716B] mb-6 leading-relaxed">
                        JAGAIN membedakan jenis data secara eksplisit agar masyarakat dan pengambil kebijakan tidak salah memahami tingkat kepastian informasi:
                    </p>

                    <div className="space-y-4">
                        <div className="border border-[#DDE3DE] rounded-lg p-4 bg-white">
                            <div className="flex items-center gap-2 font-bold text-xs text-[#174B35] mb-1">
                                <span className="size-2.5 rounded-full bg-[#174B35]" />
                                1. Laporan Masyarakat (Community Reports)
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Dikirim langsung oleh warga masyarakat terdaftar yang menyaksikan kejadian. Status awalnya adalah <code>SUBMITTED</code> dan memerlukan verifikasi internal sebelum diteruskan ke instansi penanganan.
                            </p>
                        </div>

                        <div className="border border-[#DDE3DE] rounded-lg p-4 bg-white">
                            <div className="flex items-center gap-2 font-bold text-xs text-[#D97706] mb-1">
                                <span className="size-2.5 rounded-full bg-[#D97706]" />
                                2. Observasi Titik Panas Satelit (Satellite Hotspots)
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Berasal dari sensor termal satelit (seperti NASA FIRMS MODIS/VIIRS atau Sipongi KLHK). <strong>Penting:</strong> Titik panas adalah anomali suhu permukaan dan bukan bukti pasti kebakaran hutan sebelum dilakukan pengecekan lapangan (ground-check).
                            </p>
                        </div>

                        <div className="border border-[#DDE3DE] rounded-lg p-4 bg-white">
                            <div className="flex items-center gap-2 font-bold text-xs text-[#216B49] mb-1">
                                <span className="size-2.5 rounded-full bg-[#216B49]" />
                                3. Insiden Terverifikasi & Penugasan OPD (Verified Incidents)
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Laporan yang telah diperiksa oleh administrator, ditugaskan kepada instansi terkait, dan memiliki pembaruan perkembangan operasional dari petugas lapangan.
                            </p>
                        </div>

                        <div className="border border-[#DDE3DE] rounded-lg p-4 bg-white">
                            <div className="flex items-center gap-2 font-bold text-xs text-[#171C19] mb-1">
                                <span className="size-2.5 rounded-full bg-[#171C19]" />
                                4. Dataset Simulasi (Simulated Data)
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Pada tahap demonstrasi atau ketika integrasi eksternal belum tersambung langsung secara real-time, data uji coba secara eksplisit diberi label <strong>DATA SIMULASI</strong> dan tidak disamarkan seolah data aktual.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 3: Privasi Pelapor */}
                <div className="bg-[#F3F7F4] border border-[#DDE3DE] rounded-xl p-6 mb-10 space-y-3">
                    <h2 className="text-base font-bold text-[#171C19]">
                        Perlindungan Privasi Pelapor
                    </h2>
                    <p className="text-xs text-[#343B36] leading-relaxed">
                        Kami sangat menghargai partisipasi warga dalam menjaga kelestarian hutan Kalimantan. Demi mencegah intimidasi atau risiko terhadap keselamatan pelapor, seluruh endpoint publik dan peta publik JAGAIN secara ketat menyaring dan tidak menampilkan nama lengkap, nomor telepon, maupun email pelapor. Data kontak pelapor hanya dapat diakses oleh petugas berwenang untuk keperluan klarifikasi lokasi.
                    </p>
                </div>

                <div className="text-center pt-2">
                    <Link
                        href="/peta"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#216B49] text-white font-semibold text-xs hover:bg-[#174B35] transition-colors"
                    >
                        Jelajahi Peta Karhutla
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
