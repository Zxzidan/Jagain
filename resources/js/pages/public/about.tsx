import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import {
    Info,
    ShieldCheck,
    Database,
    Layers,
    ArrowRight,
    Lock,
    EyeOff,
    CheckCircle2,
    XCircle,
    Satellite,
    FileSpreadsheet,
    Flame,
    Users,
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title="Transparansi & Provenance Data — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            {/* Breadcrumb Header */}
            <div className="bg-white border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1EB] text-[#174B35] font-bold text-[11px] tracking-wide">
                            <Info className="size-3" />
                            Prinsip & Asal-Usul Data
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] tracking-tight">
                            Transparansi Platform & Akuntabilitas Data JAGAIN
                        </h1>
                    </div>
                    <Link
                        href="/peta"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#216B49] text-white font-semibold text-xs hover:bg-[#174B35] transition-all shadow-xs shrink-0 self-start sm:self-auto"
                    >
                        Buka Peta Interaktif
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                {/* Hero Mission Statement */}
                <section className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-10 shadow-xs">
                    <div className="max-w-3xl space-y-4">
                        <span className="text-xs font-mono font-bold text-[#216B49] tracking-wider uppercase">
                            Tentang Produk Digital JAGAIN
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171C19] tracking-tight leading-tight">
                            Menghubungkan Partisipasi Warga Kalimantan dengan Tindak Lanjut Nyata di Lapangan
                        </h2>
                        <p className="text-xs sm:text-sm text-[#343B36] leading-relaxed">
                            JAGAIN adalah platform civic technology independen yang dibangun khusus untuk mengawal transparansi pelaporan kebakaran hutan dan lahan (karhutla) di Kalimantan. Kami memastikan setiap laporan warga memperoleh kode lacak unik, jejak audit yang tidak dapat dimanipulasi, serta status penanganan resmi dari instansi pemerintah yang berwenang.
                        </p>
                    </div>
                </section>

                {/* Boundaries & Non-Goals Comparison */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* What JAGAIN Does */}
                    <div className="bg-white border-2 border-[#216B49] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
                        <div className="flex items-center gap-2.5 pb-3 border-b border-[#DDE3DE]">
                            <div className="size-8 rounded-lg bg-[#E8F1EB] text-[#216B49] flex items-center justify-center">
                                <CheckCircle2 className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-[#174B35]">Kapasitas & Peran Utama JAGAIN</h3>
                                <p className="text-[11px] text-[#68716B]">Transparansi, pelacakan, dan audit publik</p>
                            </div>
                        </div>

                        <ul className="space-y-3 text-xs text-[#343B36] leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#216B49] mt-1.5 shrink-0" />
                                <span><strong>Pelaporan Warga Berbasis Peta:</strong> Menampung input masyarakat dengan koordinat lintang/bujur terkalibrasi di 5 provinsi Kalimantan.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#216B49] mt-1.5 shrink-0" />
                                <span><strong>Jejak Audit Kronologis (Audit Trail):</strong> Setiap mutasi status dicatat permanen lengkap dengan alasan, aktor, dan cap waktu.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#216B49] mt-1.5 shrink-0" />
                                <span><strong>Pemisahan Semantik Tegas:</strong> Membedakan status administratif laporan (diproses/selesai) dengan kondisi kebakaran aktual lapangan (padam/membara).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#216B49] mt-1.5 shrink-0" />
                                <span><strong>Disposisi ke OPD Berwenang:</strong> Meneruskan laporan terverifikasi kepada BPBD, Manggala Agni, atau Damkar setempat.</span>
                            </li>
                        </ul>
                    </div>

                    {/* What JAGAIN Does NOT Do */}
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
                        <div className="flex items-center gap-2.5 pb-3 border-b border-[#DDE3DE]">
                            <div className="size-8 rounded-lg bg-[#F3F7F4] text-[#68716B] flex items-center justify-center">
                                <XCircle className="size-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-[#171C19]">Batasan Sistem (Non-Goals)</h3>
                                <p className="text-[11px] text-[#68716B]">Batas kewenangan operasional & hukum</p>
                            </div>
                        </div>

                        <ul className="space-y-3 text-xs text-[#68716B] leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#68716B] mt-1.5 shrink-0" />
                                <span><strong>Bukan Pengganti Layanan 112:</strong> JAGAIN bukan saluran darurat 24 jam untuk penyelamatan segera jiwa yang sedang terancam api.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#68716B] mt-1.5 shrink-0" />
                                <span><strong>Bukan Pelacak Armada Taktis:</strong> JAGAIN tidak mengontrol pergerakan mobil damkar atau helikopter <em>water-bombing</em>.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#68716B] mt-1.5 shrink-0" />
                                <span><strong>Bukan Lembaga Penegak Hukum:</strong> JAGAIN tidak melakukan penyelidikan pidana atau penetapan status hukum pihak pemilik konsesi lahan.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="size-1.5 rounded-full bg-[#68716B] mt-1.5 shrink-0" />
                                <span><strong>Bukan Klaim Real-Time Palsu:</strong> Data satelit dan laporan lapangan memiliki jeda verifikasi manusia yang diakui secara jujur.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 4 Data Provenance Classes */}
                <section className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="border-b border-[#DDE3DE] pb-4">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#216B49] mb-1">
                            <Database className="size-3.5" />
                            Kejujuran Asal-Usul Informasi
                        </div>
                        <h2 className="text-lg font-bold text-[#171C19]">
                            4 Tingkatan Klasifikasi Data pada Sistem JAGAIN
                        </h2>
                        <p className="text-xs text-[#68716B] mt-1">
                            Untuk menjaga integritas ilmiah dan hukum, kami menandai asal-usul setiap data di seluruh halaman:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 space-y-2">
                            <div className="flex items-center gap-2">
                                <Users className="size-4 text-[#174B35]" />
                                <span className="font-bold text-xs text-[#174B35]">1. Laporan Masyarakat (Citizen Reports)</span>
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Dibuat oleh warga terdaftar melalui formulir daring. Berstatus <code>SUBMITTED</code> sebelum ditinjau. Tidak dianggap sebagai kepastian hukum kebakaran sebelum diverifikasi admin atau dicek lapangan.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 space-y-2">
                            <div className="flex items-center gap-2">
                                <Satellite className="size-4 text-[#D97706]" />
                                <span className="font-bold text-xs text-[#D97706]">2. Titik Panas Satelit (Satellite Hotspots)</span>
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Anomali suhu termal sensor MODIS/VIIRS NASA atau Sipongi KLHK. Titik panas adalah potensi indikasi panas permukaan, bukan pembuktian visual api menyala tanpa pemeriksaan darat (<em>ground-check</em>).
                            </p>
                        </div>

                        <div className="p-4 rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 space-y-2">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="size-4 text-[#216B49]" />
                                <span className="font-bold text-xs text-[#216B49]">3. Penugasan & Insiden Terverifikasi (OPD Actions)</span>
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Laporan yang telah diverifikasi kelayakannya, dikirimkan kepada instansi terkait (BPBD/Manggala Agni), dan memiliki catatan perkembangan langsung dari petugas di lapangan.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl border border-[#DDE3DE] bg-[#F3F7F4]/50 space-y-2">
                            <div className="flex items-center gap-2">
                                <FileSpreadsheet className="size-4 text-[#171C19]" />
                                <span className="font-bold text-xs text-[#171C19]">4. Data Simulasi / Uji Coba (Simulated Data)</span>
                            </div>
                            <p className="text-xs text-[#343B36] leading-relaxed">
                                Pada mode pengembangan atau demonstrasi antarmuka, data tiruan wajib diberi label eksplisit <strong>DATA SIMULASI</strong> agar tidak menimbulkan kepanikan publik atau kesalahpahaman.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Privacy & Whistleblower Protection */}
                <section className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="size-12 rounded-xl bg-[#E8F1EB] text-[#174B35] flex items-center justify-center shrink-0 border border-[#216B49]/20">
                            <EyeOff className="size-6 text-[#174B35]" />
                        </div>
                        <div className="space-y-2 flex-1">
                            <div className="text-xs font-bold uppercase tracking-wider text-[#174B35]">
                                Kebijakan Privasi & Perlindungan Pelapor
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#171C19]">
                                Identitas Pribadi Pelapor Tidak Pernah Ditampilkan ke Publik
                            </h3>
                            <p className="text-xs sm:text-sm text-[#343B36] leading-relaxed">
                                Menjaga kelestarian hutan adalah tugas bersama, namun keselamatan warga pelapor dari intimidasi pihak yang tidak bertanggung jawab adalah prioritas tertinggi. Di seluruh endpoint publik dan peta terbuka JAGAIN, nama lengkap, nomor WhatsApp/telepon, serta alamat surel pelapor secara otomatis disaring dan disembunyikan. Hanya petugas penanganan berwenang yang dapat menghubungi pelapor untuk klarifikasi patok lokasi.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Bottom Call to Action */}
                <div className="text-center pt-2">
                    <Link
                        href="/peta"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#216B49] text-white font-semibold text-xs hover:bg-[#174B35] transition-all shadow-xs"
                    >
                        Lihat Sebaran Titik di Peta Karhutla
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
