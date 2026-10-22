import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import AnimatedList from '@/components/react-bits/AnimatedList';
import CountUp from '@/components/react-bits/CountUp';
import {
    ArrowRight,
    EyeOff,
    CheckCircle2,
    XCircle,
    Shield,
    Lock,
    FileText,
    Database,
    AlertCircle,
    Activity,
    Satellite,
    PhoneCall,
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#10e57a] selection:text-black font-sans antialiased">
            <Head title="Transparansi & Provenance Data — JAGAIN" />
            <Navbar />

            <main className="flex-1 pb-24 pt-20">
                {/* 1. HERO HEADER */}
                <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-neutral-100">
                    <AnimatedContent distance={25} duration={0.8} threshold={0.1}>
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Prinsip Keterbukaan & Provenance Data</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-[1.15]">
                                Transparansi Platform & Akuntabilitas Data JAGAIN
                            </h1>
                            <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed font-normal">
                                Dokumen keterbukaan publik mengenai batasan teknis, alur verifikasi laporan kebakaran hutan dan lahan di Kalimantan, serta komitmen perlindungan kerahasiaan identitas warga pelapor.
                            </p>

                            {/* Live Trust Metrics Strip */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70">
                                    <div className="text-2xl font-black text-neutral-900 tabular-nums">
                                        <CountUp to={100} duration={1.5} />%
                                    </div>
                                    <span className="text-[11px] font-semibold text-neutral-500 block mt-1">Audit Trail Publik</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                                    <div className="text-2xl font-black text-emerald-800 tabular-nums">
                                        <CountUp to={5} duration={1.2} />
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-700 block mt-1">Provinsi Kalimantan</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70">
                                    <div className="text-2xl font-black text-neutral-900 tabular-nums">
                                        <CountUp to={0} duration={0.8} />
                                    </div>
                                    <span className="text-[11px] font-semibold text-neutral-500 block mt-1">Kompromi Data Pribadi</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-neutral-900 text-white border border-neutral-800">
                                    <div className="text-2xl font-black text-[#10e57a] tabular-nums">
                                        24/7
                                    </div>
                                    <span className="text-[11px] font-semibold text-neutral-400 block mt-1">Akses Bebas Tanpa Paywall</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </section>

                {/* 2. MAIN CONTENT WITH STICKY SIDEBAR */}
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Sticky Sidebar Nav (3 cols) */}
                        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6 bg-neutral-50/70 border border-neutral-200/80 rounded-3xl p-6 text-xs font-sans shadow-xs">
                            <div className="font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200/60 flex items-center gap-2">
                                <span className="size-2 rounded-full bg-emerald-500" />
                                <span className="text-xs">Daftar Isi Dokumen</span>
                            </div>
                            <nav className="flex flex-col gap-1.5 text-neutral-600">
                                <a
                                    href="#peran-utama"
                                    className="px-3 py-2 rounded-xl hover:bg-white hover:text-neutral-950 font-medium transition-all flex items-center justify-between group"
                                >
                                    <span>1. Peran & Kapasitas</span>
                                    <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600" />
                                </a>
                                <a
                                    href="#batasan-sistem"
                                    className="px-3 py-2 rounded-xl hover:bg-white hover:text-neutral-950 font-medium transition-all flex items-center justify-between group"
                                >
                                    <span>2. Batasan Sistem</span>
                                    <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600" />
                                </a>
                                <a
                                    href="#klasifikasi-data"
                                    className="px-3 py-2 rounded-xl hover:bg-white hover:text-neutral-950 font-medium transition-all flex items-center justify-between group"
                                >
                                    <span>3. 4 Tingkat Data</span>
                                    <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600" />
                                </a>
                                <a
                                    href="#privasi-pelapor"
                                    className="px-3 py-2 rounded-xl hover:bg-white hover:text-neutral-950 font-medium transition-all flex items-center justify-between group"
                                >
                                    <span>4. Privasi Warga</span>
                                    <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600" />
                                </a>
                            </nav>
                            <div className="pt-4 border-t border-neutral-200/60 space-y-2">
                                <span className="text-[11px] text-neutral-500 block font-medium">Punya laporan kejadian?</span>
                                <Link
                                    href="/lapor"
                                    className="bg-[#10e57a] hover:bg-[#00f575] text-black font-bold text-xs w-full py-2.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                                >
                                    <span>Kirim Laporan Resmi</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </aside>

                        {/* Content Body (9 cols) */}
                        <div className="lg:col-span-9 space-y-16">
                            {/* Section 1: Peran & Kapasitas */}
                            <AnimatedContent distance={20} duration={0.6} threshold={0.1}>
                                <section id="peran-utama" className="space-y-6 scroll-mt-28">
                                    <div className="border-b border-neutral-100 pb-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                                            <span>Bagian 01</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                                            Peran & Kapasitas Utama Platform
                                        </h2>
                                    </div>
                                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                                        JAGAIN (Jaga Hutan, Kawal Penanganan) adalah platform independen yang dibangun khusus untuk mengawal transparansi pelaporan kebakaran hutan dan lahan (karhutla) di Kalimantan. Kami memastikan setiap laporan warga memperoleh kode lacak unik, jejak audit yang tidak dapat dimanipulasi, serta status penanganan resmi dari instansi pemerintah yang berwenang.
                                    </p>

                                    <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-xs hover:border-neutral-300 transition-all">
                                        <div className="bg-neutral-50/80 px-6 py-4 border-b border-neutral-200/80 text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                                            <Shield className="size-4 text-emerald-600" />
                                            <span>Pilar Fungsional JAGAIN</span>
                                        </div>
                                        <div className="divide-y divide-neutral-100 text-xs font-sans">
                                            <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                                <div className="size-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                                                    <CheckCircle2 className="size-4" />
                                                </div>
                                                <div>
                                                    <strong className="text-neutral-900 block mb-1 text-sm font-bold">Pelaporan Warga Berbasis Geospasial</strong>
                                                    <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                        Menampung laporan koordinat lintang/bujur terkalibrasi di 5 provinsi Kalimantan (Kalbar, Kalteng, Kalsel, Kaltim, Kaltara) lengkap dengan deskripsi patok lokasi dan bukti foto visual.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                                <div className="size-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                                                    <CheckCircle2 className="size-4" />
                                                </div>
                                                <div>
                                                    <strong className="text-neutral-900 block mb-1 text-sm font-bold">Jejak Audit Kronologis Permanen (Audit Trail)</strong>
                                                    <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                        Setiap pergantian status laporan dicatat secara permanen dengan mencantumkan aktor peninjau, alasan keputusan, dan stempel waktu (<em>timestamp</em>) yang dapat diaudit publik.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                                <div className="size-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                                                    <CheckCircle2 className="size-4" />
                                                </div>
                                                <div>
                                                    <strong className="text-neutral-900 block mb-1 text-sm font-bold">Pemisahan Semantik Status Administratif & Kondisi Api</strong>
                                                    <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                        Secara tegas membedakan status administratif laporan (diproses/selesai) dengan kondisi kebakaran aktual lapangan (padam/membara/asap sisa). Status laporan selesai tidak otomatis berarti api telah padam seutuhnya.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                                <div className="size-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                                                    <CheckCircle2 className="size-4" />
                                                </div>
                                                <div>
                                                    <strong className="text-neutral-900 block mb-1 text-sm font-bold">Disposisi Resmi ke Instansi Teknis</strong>
                                                    <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                        Meneruskan laporan yang telah terverifikasi kepada Organisasi Perangkat Daerah (OPD) berwenang (BPBD, Manggala Agni KLHK, atau Dinas Pemadam Kebakaran) sesuai yurisdiksi wilayah administratif.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </AnimatedContent>

                            {/* Section 2: Batasan Sistem (Non-Goals) */}
                            <AnimatedContent distance={20} duration={0.6} threshold={0.1}>
                                <section id="batasan-sistem" className="space-y-6 scroll-mt-28">
                                    <div className="border-b border-neutral-100 pb-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                                            <span>Bagian 02</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                                            Batasan Sistem & Batas Tanggung Jawab (Non-Goals)
                                        </h2>
                                    </div>
                                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                                        Demi menjamin keselamatan warga dan integritas tata kelola publik, batasan operasional berikut ditetapkan secara eksplisit:
                                    </p>

                                    <div className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden divide-y divide-neutral-100 text-xs font-sans shadow-xs">
                                        <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                            <div className="size-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center shrink-0 mt-0.5 text-rose-600">
                                                <XCircle className="size-4" />
                                            </div>
                                            <div>
                                                <strong className="text-neutral-900 block mb-1 text-sm font-bold">Bukan Pengganti Layanan Panggilan Darurat 112</strong>
                                                <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                    JAGAIN bukan kanal tanggap darurat komando menit-ke-menit. Jika kobaran api secara langsung mengancam nyawa manusia atau bangunan tempat tinggal, warga wajib segera menghubungi 112 atau posko pemadam setempat tanpa menunggu pembaruan web.
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                            <div className="size-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center shrink-0 mt-0.5 text-rose-600">
                                                <XCircle className="size-4" />
                                            </div>
                                            <div>
                                                <strong className="text-neutral-900 block mb-1 text-sm font-bold">Bukan Sistem Pelacak Armada Lapangan</strong>
                                                <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                    JAGAIN tidak memonitor GPS real-time truk tangki, helikopter water-bombing, atau personel darat secara langsung, melainkan mencatat dokumen laporan kemajuan penanganan resmi.
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                            <div className="size-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center shrink-0 mt-0.5 text-rose-600">
                                                <XCircle className="size-4" />
                                            </div>
                                            <div>
                                                <strong className="text-neutral-900 block mb-1 text-sm font-bold">Bukan Lembaga Penegakan Hukum</strong>
                                                <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                    Platform tidak melakukan penyelidikan pro-justitia, tidak menetapkan tersangka pembakar lahan, dan tidak mempublikasikan tuduhan hukum terhadap kepemilikan konsesi tertentu tanpa keputusan pengadilan yang berkekuatan hukum tetap.
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex items-start gap-4 hover:bg-neutral-50/50 transition-colors">
                                            <div className="size-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center shrink-0 mt-0.5 text-rose-600">
                                                <XCircle className="size-4" />
                                            </div>
                                            <div>
                                                <strong className="text-neutral-900 block mb-1 text-sm font-bold">Tidak Menjamin Data Real-Time Tanpa Jeda</strong>
                                                <span className="text-neutral-500 text-xs leading-relaxed block font-normal">
                                                    Seluruh data satelit dan laporan warga melewati proses verifikasi manusia. Klaim real-time tanpa latensi dihindari demi memastikan kebenaran ilmiah dan faktual.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </AnimatedContent>

                            {/* Section 3: 4 Tingkatan Klasifikasi Data */}
                            <AnimatedContent distance={20} duration={0.6} threshold={0.1}>
                                <section id="klasifikasi-data" className="space-y-6 scroll-mt-28">
                                    <div className="border-b border-neutral-100 pb-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                                            <span>Bagian 03</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                                            4 Tingkatan Klasifikasi Data pada Sistem JAGAIN
                                        </h2>
                                    </div>
                                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                                        Setiap data visual dan tabular yang ditampilkan pada peta dan daftar laporan dilabeli berdasarkan asal-usul (provenance) berikut:
                                    </p>

                                    <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 sm:p-6 shadow-xs">
                                        <AnimatedList
                                            items={[
                                                {
                                                    id: 1,
                                                    icon: <FileText className="size-4 text-emerald-600" />,
                                                    title: '1. Laporan Warga Lapangan',
                                                    description: 'Laporan koordinat & bukti visual warga terdaftar. Berstatus awal SUBMITTED hingga terverifikasi kejelasan titik patok lokasi.',
                                                    meta: (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                                                            <span className="size-1.5 rounded-full bg-neutral-400" />
                                                            <span>SUBMITTED</span>
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    id: 2,
                                                    icon: <Database className="size-4 text-emerald-600" />,
                                                    title: '2. Titik Panas Satelit FIRMS',
                                                    description: 'Sensor MODIS & VIIRS NASA. Anomali suhu termal radiatif permukaan bumi sebagai radar deteksi dini sebelum verifikasi darat.',
                                                    meta: (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                                                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span>NASA FIRMS</span>
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    id: 3,
                                                    icon: <Shield className="size-4 text-emerald-600" />,
                                                    title: '3. Penugasan Terverifikasi OPD',
                                                    description: 'Disposisi resmi ke BPBD, Manggala Agni KLHK, atau Damkar setempat dengan catatan kronologis penanganan lapangan terbuka.',
                                                    meta: (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                                                            <span className="size-1.5 rounded-full bg-emerald-500" />
                                                            <span>OPD RESMI</span>
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    id: 4,
                                                    icon: <AlertCircle className="size-4 text-amber-600" />,
                                                    title: '4. Data Simulasi & Uji Sistem',
                                                    description: 'Data tiruan mode demo aplikasi untuk pengujian skenario bencana. Selalu dilabeli DATA SIMULASI secara tegas demi akuntabilitas.',
                                                    meta: (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                                                            <span className="size-1.5 rounded-full bg-amber-500" />
                                                            <span>SIMULASI</span>
                                                        </span>
                                                    ),
                                                },
                                            ]}
                                            animation="pop"
                                            theme="light"
                                            accentColor="#10e57a"
                                            radius={14}
                                            gap={8}
                                            width="100%"
                                            maxHeight={360}
                                            frame={false}
                                            showGradients={true}
                                            displayScrollbar={true}
                                        />
                                    </div>
                                </section>
                            </AnimatedContent>

                            {/* Section 4: Perlindungan Identitas Warga */}
                            <AnimatedContent distance={20} duration={0.6} threshold={0.1}>
                                <section id="privasi-pelapor" className="space-y-6 scroll-mt-28">
                                    <div className="border-b border-neutral-100 pb-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                                            <span>Bagian 04</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                                            Kebijakan Privasi & Perlindungan Identitas Pelapor
                                        </h2>
                                    </div>

                                    <div className="w-full bg-gradient-to-br from-emerald-50/90 via-emerald-50/40 to-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-200/80 shadow-sm space-y-6">
                                        <div className="flex items-start sm:items-center gap-4">
                                            <div className="size-11 rounded-2xl bg-white border border-emerald-200/90 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
                                                <Lock className="size-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg text-emerald-950">
                                                    Data Pribadi Pelapor Tidak Pernah Dipublikasikan ke Publik
                                                </h3>
                                                <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                                                    Kerahasiaan dan perlindungan keselamatan pelapor dijamin secara sistem
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                                            Menjaga kelestarian hutan adalah tugas bersama, namun keselamatan warga pelapor dari intimidasi atau potensi bahaya fisik adalah prioritas tertinggi. Di seluruh endpoint publik, peta interaktif, dan halaman pelacakan terbuka:
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                            <div className="bg-white/90 backdrop-blur-xs border border-emerald-200/70 rounded-2xl p-4.5 space-y-2 shadow-xs">
                                                <div className="size-7 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                                                    <EyeOff className="size-4" />
                                                </div>
                                                <h4 className="text-xs font-bold text-neutral-900">Anonimitas Publik</h4>
                                                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                                                    Nama lengkap pelapor secara otomatis disaring (<em>masked</em>) menjadi anonim untuk publik.
                                                </p>
                                            </div>

                                            <div className="bg-white/90 backdrop-blur-xs border border-emerald-200/70 rounded-2xl p-4.5 space-y-2 shadow-xs">
                                                <div className="size-7 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                                                    <Shield className="size-4" />
                                                </div>
                                                <h4 className="text-xs font-bold text-neutral-900">Akses Kontak Terbatas</h4>
                                                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                                                    Nomor telepon dan email hanya dapat diakses petugas verifikator berwenang kedinasan.
                                                </p>
                                            </div>

                                            <div className="bg-white/90 backdrop-blur-xs border border-emerald-200/70 rounded-2xl p-4.5 space-y-2 shadow-xs">
                                                <div className="size-7 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-800">
                                                    <Lock className="size-4" />
                                                </div>
                                                <h4 className="text-xs font-bold text-neutral-900">Enkripsi Berkas</h4>
                                                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                                                    Penyimpanan berkas bukti foto dilakukan dengan kontrol akses privat terenkripsi.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </AnimatedContent>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

