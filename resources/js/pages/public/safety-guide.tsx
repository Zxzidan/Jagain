import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import Stepper, { Step } from '@/components/react-bits/Stepper';
import AnimatedList from '@/components/react-bits/AnimatedList';
import BorderGlow from '@/components/react-bits/BorderGlow';
import {
    Flame,
    ArrowRight,
    Wind,
    Shield,
    Home,
    AlertTriangle,
    PhoneCall,
    Activity,
    CheckCircle2,
    MapPin,
} from 'lucide-react';

const ispuLevels = [
    {
        range: '0 - 50',
        category: 'Baik',
        badgeBg: 'bg-emerald-100/90 text-emerald-800 border border-emerald-300 font-bold',
        description: 'Tingkat mutu udara yang sangat baik, tidak memberikan efek negatif terhadap manusia maupun ekosistem hutan.',
        action: 'Aman untuk seluruh aktivitas luar ruangan.',
    },
    {
        range: '51 - 100',
        category: 'Sedang',
        badgeBg: 'bg-yellow-100/90 text-yellow-900 border border-yellow-300 font-bold',
        description: 'Mutu udara masih dapat diterima pada kesehatan manusia dan vegetasi gambut.',
        action: 'Kelompok sangat sensitif perlu membatasi aktivitas fisik intensif di luar ruangan.',
    },
    {
        range: '101 - 200',
        category: 'Tidak Sehat',
        badgeBg: 'bg-orange-100/90 text-orange-900 border border-orange-300 font-bold',
        description: 'Mutu udara bersifat merugikan pada manusia, hewan, dan tumbuhan yang terpapar polutan kabut asap.',
        action: 'Wajib kenakan respirator partikulat N95/KN95 di luar ruangan. Batasi kegiatan luar ruang anak & lansia.',
    },
    {
        range: '201 - 300',
        category: 'Sangat Tidak Sehat',
        badgeBg: 'bg-rose-100/90 text-rose-900 border border-rose-300 font-bold',
        description: 'Mutu udara dapat meningkatkan risiko gangguan pernapasan akut secara luas pada seluruh segmen populasi.',
        action: 'Hindari aktivitas di luar ruangan. Tutup celah ventilasi rumah dan nyalakan penjernih udara berefisiensi tinggi (HEPA).',
    },
    {
        range: '> 300',
        category: 'Berbahaya',
        badgeBg: 'bg-purple-100/90 text-purple-900 border border-purple-300 font-bold',
        description: 'Tingkat mutu udara berbahaya secara umum dan dapat menimbulkan dampak kesehatan serius hingga keracunan gas karbon.',
        action: 'Tetap berada di dalam ruang kedap udara atau segera evakuasi ke shelter udara bersih terdekat yang disediakan pemda.',
    },
];

const provincialContacts = [
    {
        province: 'Kalimantan Barat',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Barat',
        phone: '(0561) 745300',
        address: 'Jl. Sutoyo No. 1, Pontianak',
    },
    {
        province: 'Kalimantan Tengah',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Tengah',
        phone: '(0536) 3221139',
        address: 'Jl. Tjilik Riwut Km. 3.5, Palangka Raya',
    },
    {
        province: 'Kalimantan Selatan',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Selatan',
        phone: '(0511) 4772030',
        address: 'Kawasan Perkantoran Pemprov, Banjarbaru',
    },
    {
        province: 'Kalimantan Timur',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Timur',
        phone: '(0541) 741040',
        address: 'Jl. DI Panjaitan No. 49, Samarinda',
    },
    {
        province: 'Kalimantan Utara',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Utara',
        phone: '(0552) 2024112',
        address: 'Jl. Poros Tanjung Selor, Bulungan',
    },
];

export default function SafetyGuide() {
    const contactListItems = provincialContacts.map((c, idx) => ({
        id: idx,
        icon: <PhoneCall className="size-4 text-emerald-600" />,
        title: `${c.province} — ${c.posko}`,
        description: (
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin className="size-3 text-neutral-400 shrink-0" />
                <span className="truncate">{c.address}</span>
            </span>
        ),
        meta: (
            <a
                href={`tel:${c.phone.replace(/[^0-9]/g, '')}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#10e57a] hover:bg-[#0ba856] text-black shadow-xs transition-all active:scale-95"
            >
                <PhoneCall className="size-3" />
                <span>{c.phone}</span>
            </a>
        ),
        contact: c,
    }));

    return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#10e57a] selection:text-black font-sans antialiased overflow-x-hidden w-full max-w-full">
            <Head title="Panduan Keselamatan & Mitigasi Karhutla Kalimantan — JAGAIN" />
            <Navbar />

            <main className="flex-1 pb-24 pt-20">
                {/* 1. HEADER */}
                <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-neutral-100">
                    <AnimatedContent distance={25} duration={0.8} threshold={0.1}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Protokol Keselamatan Lapangan</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight">
                                    Panduan Keselamatan & Mitigasi Karhutla
                                </h1>
                                <p className="text-sm sm:text-base text-neutral-500 max-w-2xl font-medium leading-relaxed">
                                    Pedoman perlindungan diri warga, standar Indeks Standar Pencemar Udara (ISPU) KLHK, serta direktori posko tanggap darurat se-Kalimantan.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <a
                                    href="tel:112"
                                    className="bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs px-5 py-3 rounded-full inline-flex items-center gap-2 shadow-xs transition-all active:scale-95"
                                >
                                    <PhoneCall className="size-3.5" />
                                    <span>Darurat: 112</span>
                                </a>
                                <Link
                                    href="/lapor"
                                    className="bg-[#10e57a] hover:bg-[#0ba856] text-black font-bold text-xs px-5 py-3 rounded-full inline-flex items-center gap-2 shadow-xs transition-all active:scale-95"
                                >
                                    <span>Kirim Laporan Lapangan</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    </AnimatedContent>
                </section>

                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
                    {/* 2. CRITICAL PEATLAND DIRECTIVE with React Bits <BorderGlow /> */}
                    <AnimatedContent distance={30} duration={0.9} threshold={0.1}>
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="38 90 60"
                            backgroundColor="#fffdf5"
                            borderRadius={28}
                            glowRadius={40}
                            glowIntensity={1.2}
                            coneSpread={28}
                            animated={true}
                            colors={['#f59e0b', '#ef4444', '#f97316']}
                            fillOpacity={0.15}
                            className="w-full bg-gradient-to-br from-amber-500/10 via-amber-50/70 to-white border border-amber-300/80 shadow-sm"
                        >
                            <div className="p-8 sm:p-10 lg:p-12 space-y-4 relative z-10">
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-950 bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300/80">
                                    <Flame className="size-4 shrink-0 text-amber-700" />
                                    <span>Peringatan Bahaya Kebakaran Bawah Tanah Gambut</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 leading-tight">
                                    Dilarang Menginjak Lahan Gambut Berasap — Rongga Bara Api 1–3 Meter di Bawah Permukaan
                                </h2>
                                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans max-w-4xl">
                                    Lahan gambut Kalimantan membakar tanpa kobaran lidah api terbuka (<em>smoldering combustion</em>). Permukaan tanah yang tampak dingin atau hanya tertutup abu tipis sering kali menyembunyikan rongga bara api berpijar yang dapat runtuh seketika saat terinjak bobot tubuh manusia. <strong className="text-neutral-950 font-bold">Warga dilarang keras mendekat hanya untuk mengambil rekaman visual jika berada di bentang kubah gambut. Keselamatan jiwa selalu nomor satu.</strong>
                                </p>
                            </div>
                        </BorderGlow>
                    </AnimatedContent>

                    {/* 3. 4 CORE SAFETY PILLARS WITH STEPPER */}
                    <AnimatedContent distance={30} duration={0.9} threshold={0.1}>
                        <section className="space-y-6">
                            <div className="border-b border-neutral-100 pb-4">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Empat Langkah Utama</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                                    Prosedur Perlindungan Diri & Keluarga
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                                    Ikuti panduan mitigasi interaktif bertahap saat terjadi insiden kabut asap pekat.
                                </p>
                            </div>

                            {/* Interactive Stepper Workflow */}
                            <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                                <Stepper
                                    initialStep={1}
                                    indicator="numbers"
                                    orientation="horizontal"
                                    theme="light"
                                    accentColor="#10e57a"
                                    frame={false}
                                    backButtonText="Sebelumnya"
                                    nextButtonText="Langkah Berikutnya"
                                    completeButtonText="Protokol Dipahami"
                                    showFooter={true}
                                    className="w-full"
                                >
                                    <Step key="1" title="Posisi Angin">
                                        <div className="py-4 space-y-3">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                                                <Wind className="size-3 text-emerald-600" />
                                                <span>Upwind Protocol</span>
                                            </div>
                                            <h3 className="text-lg font-black text-neutral-950">
                                                Jaga Jarak Minimal 500m & Lawan Arah Angin
                                            </h3>
                                            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                                                Posisikan diri selalu di posisi berlawanan dengan arah embusan angin (<em>upwind</em>) menuju api. Jangan biarkan asap mengepung jalur keluar Anda. Jika api melompat melewati parit atau kanal, segera mundur ke zona aman terbuka yang telah bersih dari vegetasi kering.
                                            </p>
                                        </div>
                                    </Step>
                                    <Step key="2" title="Respirator N95">
                                        <div className="py-4 space-y-3">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                                                <Shield className="size-3 text-emerald-600" />
                                                <span>Standar Partikulat N95 / KN95</span>
                                            </div>
                                            <h3 className="text-lg font-black text-neutral-950">
                                                Gunakan Masker Partikulat N95 Kedap Udara
                                            </h3>
                                            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                                                Masker kain atau masker bedah biasa tidak mampu menyaring partikel mikroskopis berbahaya PM2.5 dari kebakaran gambut. Gunakan respirator bersertifikasi N95 atau KN95 yang menempel rapat tanpa celah pada lekuk hidung dan pipi untuk meminimalkan risiko infeksi saluran pernapasan akut (ISPA).
                                            </p>
                                        </div>
                                    </Step>
                                    <Step key="3" title="Ruang Bersih">
                                        <div className="py-4 space-y-3">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                                                <Home className="size-3 text-emerald-600" />
                                                <span>Isolasi Udara HEPA</span>
                                            </div>
                                            <h3 className="text-lg font-black text-neutral-950">
                                                Segel Ruang Bersih di Rumah Tanpa Ventilasi Bebas
                                            </h3>
                                            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                                                Tutup rapat pintu dan celah ventilasi jendela menggunakan selotip atau handuk lembap. Kelompok rentan seperti balita, lansia, dan ibu hamil wajib diisolasi di dalam ruangan yang dilengkapi penyaring udara mekanis berefisiensi HEPA tanpa sirkulasi udara luar.
                                            </p>
                                        </div>
                                    </Step>
                                    <Step key="4" title="Evakuasi Shelter">
                                        <div className="py-4 space-y-3">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold uppercase">
                                                <AlertTriangle className="size-3 text-amber-600" />
                                                <span>Protokol Shelter Pemda</span>
                                            </div>
                                            <h3 className="text-lg font-black text-neutral-950">
                                                Kapan Warga Harus Segera Mengungsi ke Shelter
                                            </h3>
                                            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                                                Bila langit berubah warna kemerahan atau kuning pekat disertai hujan abu lebat dan jarak pandang di bawah 50 meter, amankan dokumen kependudukan berharga dalam tas kedap air, lalu bergerak ke shelter udara bersih atau posko darurat pemda terdekat.
                                            </p>
                                        </div>
                                    </Step>
                                </Stepper>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                                <div className="bg-white border border-neutral-200/90 rounded-3xl p-7 space-y-4 shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between group">
                                    <div>
                                        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between mb-3">
                                            <div className="size-8 rounded-full bg-neutral-950 text-[#10e57a] text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                                                01
                                            </div>
                                            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Posisi Angin</span>
                                        </div>
                                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                            Jaga Jarak & Lawan Arah Angin
                                        </h3>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-sans mt-2">
                                            Posisikan diri selalu di posisi berlawanan dengan arah embusan angin (<em>upwind</em>) menuju api. Jangan biarkan asap mengepung jalur keluar Anda. Jarak aman minimal 500 meter.
                                        </p>
                                    </div>
                                    <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                        <Wind className="size-3.5" />
                                        <span>Upwind Protocol</span>
                                    </div>
                                </div>

                                <div className="bg-white border border-neutral-200/90 rounded-3xl p-7 space-y-4 shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between group">
                                    <div>
                                        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between mb-3">
                                            <div className="size-8 rounded-full bg-neutral-950 text-[#10e57a] text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                                                02
                                            </div>
                                            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Respirator</span>
                                        </div>
                                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                            Gunakan Masker Partikulat N95
                                        </h3>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-sans mt-2">
                                            Masker kain atau bedah biasa tidak mampu menyaring partikel berbahaya PM2.5. Gunakan respirator yang terpasang rapat pada lekuk hidung dan pipi untuk mencegah iritasi paru.
                                        </p>
                                    </div>
                                    <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                        <Shield className="size-3.5" />
                                        <span>Standar N95 / KN95</span>
                                    </div>
                                </div>

                                <div className="bg-white border border-neutral-200/90 rounded-3xl p-7 space-y-4 shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between group">
                                    <div>
                                        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between mb-3">
                                            <div className="size-8 rounded-full bg-neutral-950 text-[#10e57a] text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                                                03
                                            </div>
                                            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Ruang Bersih</span>
                                        </div>
                                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                            Segel Ruang Bersih di Rumah
                                        </h3>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-sans mt-2">
                                            Tutup celah ventilasi jendela dengan kain lembap. Kelompok rentan (balita, lansia, ibu hamil) wajib berada di ruang berpenyaring udara berefisiensi HEPA.
                                        </p>
                                    </div>
                                    <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                        <Home className="size-3.5" />
                                        <span>Isolasi Udara HEPA</span>
                                    </div>
                                </div>

                                <div className="bg-white border border-neutral-200/90 rounded-3xl p-7 space-y-4 shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-between group">
                                    <div>
                                        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between mb-3">
                                            <div className="size-8 rounded-full bg-neutral-950 text-[#10e57a] text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                                                04
                                            </div>
                                            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Evakuasi</span>
                                        </div>
                                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                            Kapan Harus Segera Mengungsi
                                        </h3>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-sans mt-2">
                                            Bila langit berubah kemerahan/kuning pekat dan terjadi hujan abu lebat, segera amankan dokumen kependudukan lalu bergerak ke posko darurat udara bersih terdekat.
                                        </p>
                                    </div>
                                    <div className="pt-2 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                                        <AlertTriangle className="size-3.5" />
                                        <span>Protokol Shelter Pemda</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </AnimatedContent>

                    {/* 4. AIR QUALITY INDEX (ISPU) REFERENCE TABLE */}
                    <AnimatedContent distance={30} duration={0.9} threshold={0.1}>
                        <section className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-100 pb-4">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Baku Mutu Lingkungan</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                                        Matriks Indeks Standar Pencemar Udara (ISPU)
                                    </h2>
                                </div>
                                <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200/70">
                                    Parameter Partikulat: PM2.5
                                </span>
                            </div>

                            <div className="bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs font-sans">
                                        <thead className="bg-neutral-50 border-b border-neutral-200/80 text-neutral-700 uppercase tracking-wider text-[11px] font-bold">
                                            <tr>
                                                <th className="py-4 px-6">Rentang Nilai</th>
                                                <th className="py-4 px-6">Kategori Mutu</th>
                                                <th className="py-4 px-6">Dampak Kesehatan</th>
                                                <th className="py-4 px-6">Rekomendasi Tindakan Warga</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100">
                                            {ispuLevels.map((lvl, idx) => (
                                                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                                                    <td className="py-4 px-6 font-bold text-neutral-900 whitespace-nowrap tabular-nums">
                                                        {lvl.range}
                                                    </td>
                                                    <td className="py-4 px-6 whitespace-nowrap">
                                                        <span className={`px-3 py-1 text-xs rounded-full inline-block ${lvl.badgeBg}`}>
                                                            {lvl.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-neutral-700 max-w-sm text-xs leading-relaxed font-medium">
                                                        {lvl.description}
                                                    </td>
                                                    <td className="py-4 px-6 text-neutral-500 text-xs leading-relaxed">
                                                        {lvl.action}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </AnimatedContent>

                    {/* 5. EMERGENCY CONTACT DIRECTORY */}
                    <AnimatedContent distance={30} duration={0.9} threshold={0.1}>
                        <section className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-4">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Kanal Tanggap Darurat Resmi</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                                        Direktori Posko Pusdalops BPBD Se-Kalimantan
                                    </h2>
                                </div>
                                <span className="font-bold text-xs text-black bg-[#10e57a] px-4 py-2 rounded-full shadow-xs flex items-center gap-2 shrink-0">
                                    <PhoneCall className="size-3.5" />
                                    <span>PANGGILAN DARURAT: 112</span>
                                </span>
                            </div>

                            <div className="bg-white border border-neutral-200/90 rounded-3xl p-5 sm:p-6 shadow-sm">
                                <AnimatedList
                                    items={contactListItems}
                                    onItemSelect={(item) => {
                                        if (item?.contact?.phone) {
                                            window.location.href = `tel:${item.contact.phone.replace(/[^0-9]/g, '')}`;
                                        }
                                    }}
                                    animation="pop"
                                    theme="light"
                                    accentColor="#10e57a"
                                    radius={14}
                                    gap={10}
                                    width="100%"
                                    maxHeight={360}
                                    frame={false}
                                    showGradients={true}
                                    displayScrollbar={true}
                                />
                            </div>
                        </section>
                    </AnimatedContent>
                </div>
            </main>

            <Footer />
        </div>
    );
}
