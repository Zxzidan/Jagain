import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import {
    Shield,
    AlertTriangle,
    Wind,
    HeartPulse,
    PhoneCall,
    ArrowRight,
    CheckCircle2,
    Flame,
    FileCheck,
    Navigation,
    Thermometer,
    Info,
} from 'lucide-react';

const ispuLevels = [
    {
        range: '0 - 50',
        category: 'Baik',
        color: 'bg-[#216B49] text-white',
        border: 'border-[#216B49]',
        badgeBg: 'bg-[#E8F1EB] text-[#174B35]',
        description: 'Tingkat mutu udara yang sangat baik, tidak memberikan efek negatif terhadap manusia maupun lingkungan.',
        action: 'Aman untuk seluruh aktivitas luar ruangan.',
    },
    {
        range: '51 - 100',
        category: 'Sedang',
        color: 'bg-[#39845C] text-white',
        border: 'border-[#39845C]',
        badgeBg: 'bg-[#E8F1EB] text-[#216B49]',
        description: 'Mutu udara masih dapat diterima pada kesehatan manusia, hewan, dan tumbuhan.',
        action: 'Kelompok sangat sensitif perlu membatasi aktivitas fisik intensif di luar.',
    },
    {
        range: '101 - 200',
        category: 'Tidak Sehat',
        color: 'bg-[#D97706] text-white',
        border: 'border-[#D97706]',
        badgeBg: 'bg-[#FEF3C7] text-[#92400E]',
        description: 'Mutu udara bersifat merugikan pada manusia, hewan, dan tumbuhan yang sensitif.',
        action: 'Wajib kenakan masker N95/KN95 di luar. Kurangi kegiatan luar ruang anak & lansia.',
    },
    {
        range: '201 - 300',
        category: 'Sangat Tidak Sehat',
        color: 'bg-[#DC2626] text-white',
        border: 'border-[#DC2626]',
        badgeBg: 'bg-[#FEE2E2] text-[#991B1B]',
        description: 'Mutu udara dapat meningkatkan risiko kesehatan pada sejumlah segmen populasi terpapar.',
        action: 'Hindari aktivitas di luar ruangan. Tutup ventilasi rumah dan nyalakan air purifier.',
    },
    {
        range: '> 300',
        category: 'Berbahaya',
        color: 'bg-[#171C19] text-white',
        border: 'border-[#171C19]',
        badgeBg: 'bg-[#171C19] text-white',
        description: 'Tingkat mutu udara berbahaya secara umum dan dapat menimbulkan dampak kesehatan serius.',
        action: 'Tetap berada di dalam ruangan kedap udara atau evakuasi ke shelter udara bersih terdekat.',
    },
];

const provincialContacts = [
    {
        province: 'Kalimantan Barat',
        posko: 'Pusdalops BPBD Kalbar',
        phone: '(0561) 745300 / 112',
        address: 'Jl. Sutoyo No. 1, Pontianak',
    },
    {
        province: 'Kalimantan Tengah',
        posko: 'Pusdalops BPBD Kalteng',
        phone: '(0536) 3221139 / 112',
        address: 'Jl. Tjilik Riwut Km. 3.5, Palangka Raya',
    },
    {
        province: 'Kalimantan Selatan',
        posko: 'Pusdalops BPBD Kalsel',
        phone: '(0511) 4772030 / 112',
        address: 'Kawasan Perkantoran Pemprov, Banjarbaru',
    },
    {
        province: 'Kalimantan Timur',
        posko: 'Pusdalops BPBD Kaltim',
        phone: '(0541) 741040 / 112',
        address: 'Jl. DI Panjaitan No. 49, Samarinda',
    },
    {
        province: 'Kalimantan Utara',
        posko: 'Pusdalops BPBD Kaltara',
        phone: '(0552) 2024112 / 112',
        address: 'Jl. Poros Tanjung Selor, Bulungan',
    },
];

export default function SafetyGuide() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title="Panduan Keselamatan Karhutla & Kualitas Udara — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            {/* Breadcrumb Header */}
            <div className="bg-white border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1EB] text-[#174B35] font-bold text-[11px] tracking-wide">
                            <Shield className="size-3" />
                            Protokol Keselamatan Resmi
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] tracking-tight">
                            Panduan Keselamatan & Mitigasi Bencana Karhutla
                        </h1>
                    </div>
                    <Link
                        href="/lapor"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#216B49] text-white font-semibold text-xs hover:bg-[#174B35] transition-all shadow-xs shrink-0 self-start sm:self-auto"
                    >
                        Buat Laporan Terstruktur
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                {/* Critical Peatland Smoldering Warning */}
                <section className="bg-white border-2 border-[#174B35] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="size-14 rounded-2xl bg-[#E8F1EB] text-[#174B35] flex items-center justify-center shrink-0 border border-[#216B49]/20">
                            <Flame className="size-8 text-[#174B35]" />
                        </div>
                        <div className="space-y-2 flex-1">
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#174B35]">
                                <AlertTriangle className="size-4 text-[#174B35]" />
                                Peringatan Khusus Bahaya Kebakaran Bawah Tanah (Lahan Gambut)
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-[#171C19] leading-snug">
                                Jangan Menginjak Lahan Gambut Berasap — Rongga Bara Api 1–3 Meter di Bawah Permukaan
                            </h2>
                            <p className="text-xs sm:text-sm text-[#343B36] leading-relaxed">
                                Gambut Kalimantan memiliki sifat pembakaran tanpa nyala terbuka (<em>smoldering combustion</em>). Permukaan yang tampak dingin atau abu hitam sering kali menyembunyikan rongga bara api berpijar yang dapat runtuh seketika ketika terinjak beban tubuh manusia. <strong>Warga dilarang keras mendekat untuk mengambil rekaman visual jika berada di bentang kubah gambut.</strong>
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4 Core Safety Pillars */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-[#171C19] tracking-tight">
                                4 Pilar Perlindungan Diri & Keluarga
                            </h2>
                            <p className="text-xs text-[#68716B]">
                                Langkah mutlak yang harus ditaati masyarakat di kawasan terdampak kebakaran hutan dan lahan.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                            <div className="space-y-3">
                                <div className="size-9 rounded-lg bg-[#E8F1EB] text-[#174B35] font-mono font-bold flex items-center justify-center text-xs">
                                    01
                                </div>
                                <h3 className="font-bold text-sm text-[#171C19] leading-snug">
                                    Jaga Jarak & Lawan Arah Angin (Upwind)
                                </h3>
                                <p className="text-xs text-[#68716B] leading-relaxed">
                                    Posisikan diri selalu di posisi berlawanan dengan embusan angin menuju api. Jangan biarkan asap mengepung jalur keluar Anda.
                                </p>
                            </div>
                            <div className="pt-3 border-t border-[#DDE3DE] text-[11px] font-semibold text-[#174B35] flex items-center gap-1">
                                <Navigation className="size-3" />
                                Jarak aman minimal 500 meter
                            </div>
                        </div>

                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                            <div className="space-y-3">
                                <div className="size-9 rounded-lg bg-[#E8F1EB] text-[#216B49] font-mono font-bold flex items-center justify-center text-xs">
                                    02
                                </div>
                                <h3 className="font-bold text-sm text-[#171C19] leading-snug">
                                    Gunakan Masker Partikulat N95 / KN95
                                </h3>
                                <p className="text-xs text-[#68716B] leading-relaxed">
                                    Masker kain atau masker bedah biasa tidak mampu menyaring partikel berbahaya PM2.5. Gunakan respirator yang rapat pada wajah.
                                </p>
                            </div>
                            <div className="pt-3 border-t border-[#DDE3DE] text-[11px] font-semibold text-[#216B49] flex items-center gap-1">
                                <HeartPulse className="size-3" />
                                Cegah infeksi saluran pernapasan (ISPA)
                            </div>
                        </div>

                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                            <div className="space-y-3">
                                <div className="size-9 rounded-lg bg-[#E8F1EB] text-[#39845C] font-mono font-bold flex items-center justify-center text-xs">
                                    03
                                </div>
                                <h3 className="font-bold text-sm text-[#171C19] leading-snug">
                                    Segel Ruang Tinggal & Lindungi Balita
                                </h3>
                                <p className="text-xs text-[#68716B] leading-relaxed">
                                    Tutup celah ventilasi jendela dengan kain lembap. Kelompok rentan (bayi, lansia, ibu hamil, penderita asma) wajib berada di dalam ruang bersih.
                                </p>
                            </div>
                            <div className="pt-3 border-t border-[#DDE3DE] text-[11px] font-semibold text-[#39845C] flex items-center gap-1">
                                <CheckCircle2 className="size-3" />
                                Gunakan HEPA filter bila ada
                            </div>
                        </div>

                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                            <div className="space-y-3">
                                <div className="size-9 rounded-lg bg-[#E8F1EB] text-[#174B35] font-mono font-bold flex items-center justify-center text-xs">
                                    04
                                </div>
                                <h3 className="font-bold text-sm text-[#171C19] leading-snug">
                                    Ketahui Kapan Harus Segera Mengungsi
                                </h3>
                                <p className="text-xs text-[#68716B] leading-relaxed">
                                    Bila langit menguning atau kemerahan dan terjadi hujan abu tebal, segera amankan berkas kependudukan lalu bergerak menuju posko shelter terdekat.
                                </p>
                            </div>
                            <div className="pt-3 border-t border-[#DDE3DE] text-[11px] font-semibold text-[#174B35] flex items-center gap-1">
                                <FileCheck className="size-3" />
                                Utamakan keselamatan jiwa
                            </div>
                        </div>
                    </div>
                </section>

                {/* Air Quality Index (ISPU) Reference Table */}
                <section className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE3DE]">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#216B49] mb-1">
                                <Wind className="size-3.5" />
                                Standar Kementerian Lingkungan Hidup dan Kehutanan
                            </div>
                            <h2 className="text-lg font-bold text-[#171C19]">
                                Matriks Indeks Standar Pencemar Udara (ISPU) & Panduan Tindakan
                            </h2>
                        </div>
                        <span className="text-xs font-mono text-[#68716B]">Parameter Partikulat: PM2.5</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F3F7F4] border-b border-[#DDE3DE] text-[#343B36] uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Rentang Nilai</th>
                                    <th className="py-3 px-4">Kategori Mutu</th>
                                    <th className="py-3 px-4">Dampak Terhadap Kesehatan</th>
                                    <th className="py-3 px-4">Rekomendasi Tindakan Warga</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE3DE]">
                                {ispuLevels.map((lvl, idx) => (
                                    <tr key={idx} className="hover:bg-[#F3F7F4]/40 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-bold text-[#171C19]">
                                            {lvl.range}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${lvl.badgeBg}`}>
                                                {lvl.category}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-[#343B36] max-w-sm leading-relaxed">
                                            {lvl.description}
                                        </td>
                                        <td className="py-3.5 px-4 font-medium text-[#171C19] leading-relaxed">
                                            {lvl.action}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Emergency Posko & Contact Directory by Province */}
                <section className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <h2 className="text-base font-bold text-[#171C19] flex items-center gap-2">
                                <PhoneCall className="size-4 text-[#216B49]" />
                                Direktori Posko Komando Karhutla Se-Kalimantan
                            </h2>
                            <p className="text-xs text-[#68716B]">
                                Hubungi nomor darurat terdekat jika melihat api aktif mengancam pemukiman atau fasilitas publik.
                            </p>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-[#171C19] text-white text-xs font-mono font-bold">
                            Darurat Bebas Pulsa: 112
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {provincialContacts.map((c, idx) => (
                            <div key={idx} className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs space-y-2">
                                <div className="text-xs font-bold uppercase tracking-wider text-[#174B35]">
                                    {c.province}
                                </div>
                                <div className="font-bold text-sm text-[#171C19]">
                                    {c.posko}
                                </div>
                                <div className="text-xs font-mono font-semibold text-[#216B49] bg-[#E8F1EB] p-2 rounded-lg border border-[#216B49]/20">
                                    {c.phone}
                                </div>
                                <div className="text-[11px] text-[#68716B]">
                                    Alamat: {c.address}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Notice */}
                <div className="bg-[#E8F1EB] border border-[#216B49]/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-xs text-[#174B35]">
                        <strong className="text-sm font-bold text-[#174B35] block">
                            Melihat titik api di sekitar wilayah Anda?
                        </strong>
                        <p className="text-[#343B36] max-w-2xl leading-relaxed">
                            Laporkan secara terstruktur dengan koordinat GPS dan rincian kondisi lapangan melalui JAGAIN agar dapat diteruskan kepada instansi penanganan resmi di Kalimantan.
                        </p>
                    </div>

                    <Link
                        href="/lapor"
                        className="px-5 py-2.5 rounded-xl bg-[#216B49] hover:bg-[#174B35] text-white text-xs font-semibold shrink-0 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    >
                        Buat Laporan Sekarang
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
