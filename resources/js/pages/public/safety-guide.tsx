import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    FileText,
    Printer,
    Shield,
    PhoneCall,
    MapPin,
    AlertTriangle,
    CheckCircle2,
    Flame,
    Download,
    ExternalLink,
} from 'lucide-react';

const ispuLevels = [
    {
        range: '0 - 50',
        category: 'Baik',
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        description: 'Tingkat mutu udara sangat baik, tidak memberikan efek negatif terhadap manusia maupun ekosistem gambut.',
        action: 'Aktivitas luar ruangan dapat dilakukan secara normal.',
    },
    {
        range: '51 - 100',
        category: 'Sedang',
        badgeBg: 'bg-yellow-50 text-yellow-900 border-yellow-300',
        description: 'Mutu udara masih dapat diterima bagi kesehatan manusia dan vegetasi.',
        action: 'Kelompok sangat sensitif disarankan membatasi aktivitas fisik intensif di luar ruangan.',
    },
    {
        range: '101 - 200',
        category: 'Tidak Sehat',
        badgeBg: 'bg-orange-50 text-orange-900 border-orange-300',
        description: 'Mutu udara bersifat merugikan bagi manusia, hewan, dan tumbuhan yang terpapar kabut asap partikulat.',
        action: 'Wajib mengenakan respirator partikulat N95/KN95 di luar ruangan. Batasi kegiatan luar ruang.',
    },
    {
        range: '201 - 300',
        category: 'Sangat Tidak Sehat',
        badgeBg: 'bg-rose-50 text-rose-900 border-rose-300',
        description: 'Dapat meningkatkan risiko gangguan pernapasan akut secara luas pada seluruh segmen populasi masyarakat.',
        action: 'Hindari aktivitas di luar ruangan. Tutup rapat celah ventilasi rumah dan aktifkan pembersih udara HEPA.',
    },
    {
        range: '> 300',
        category: 'Berbahaya',
        badgeBg: 'bg-purple-50 text-purple-900 border-purple-300',
        description: 'Tingkat mutu udara berbahaya secara umum dan dapat menimbulkan dampak kesehatan serius dan keracunan gas karbon.',
        action: 'Tetap berada di dalam ruang kedap udara atau segera lakukan evakuasi ke shelter udara bersih pemerintah daerah.',
    },
];

const provincialContacts = [
    {
        province: 'Kalimantan Barat',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Barat',
        phone: '(0561) 745300',
        address: 'Jl. Sutoyo No. 1, Kota Pontianak',
    },
    {
        province: 'Kalimantan Tengah',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Tengah',
        phone: '(0536) 3221139',
        address: 'Jl. Tjilik Riwut Km. 3.5, Kota Palangka Raya',
    },
    {
        province: 'Kalimantan Selatan',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Selatan',
        phone: '(0511) 4772030',
        address: 'Kawasan Perkantoran Pemprov, Kota Banjarbaru',
    },
    {
        province: 'Kalimantan Timur',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Timur',
        phone: '(0541) 741040',
        address: 'Jl. DI Panjaitan No. 49, Kota Samarinda',
    },
    {
        province: 'Kalimantan Utara',
        posko: 'Pusdalops BPBD Provinsi Kalimantan Utara',
        phone: '(0552) 2024112',
        address: 'Jl. Poros Tanjung Selor, Kab. Bulungan',
    },
];

export default function SafetyGuide() {
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#eaeeeb] text-neutral-900 font-sans antialiased selection:bg-[#10e57a] selection:text-black">
            <Head title="Dokumen SOP Tanggap Darurat & Penanggulangan Karhutla — JAGAIN" />

            {/* Print Styles */}
            <style>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body, html {
                        background: #ffffff !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .document-sheet {
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        max-width: 100% !important;
                        padding: 24px 32px !important;
                    }
                }
            `}</style>

            {/* Top Toolbar / Document Navigation Bar (Hidden on Print) */}
            <header className="no-print sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-neutral-300 bg-white px-4 sm:px-8 shadow-xs">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-700 shadow-2xs transition-colors cursor-pointer"
                        title="Kembali ke halaman sebelumnya"
                    >
                        <ArrowLeft className="size-3.5 text-neutral-600" />
                        <span>Kembali</span>
                    </button>

                    <div className="h-4 w-px bg-neutral-300 mx-1 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <FileText className="size-4 text-emerald-700 shrink-0" />
                        <span className="text-xs font-bold text-neutral-900 tracking-tight">
                            SOP-JAGAIN-KARHUTLA-2026.pdf
                        </span>
                        <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Resmi & Terkendali
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/lapor"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-700 transition-colors"
                    >
                        <span>Buat Laporan</span>
                        <ExternalLink className="size-3 text-neutral-500" />
                    </Link>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0c4e33] hover:bg-[#073623] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                        <Printer className="size-3.5" />
                        <span>Cetak / Simpan PDF</span>
                    </button>
                </div>
            </header>

            {/* Document Paper Sheet Container */}
            <main className="py-6 sm:py-10 px-2 sm:px-6 flex justify-center">
                <article className="document-sheet w-full max-w-[850px] bg-white border border-neutral-300/90 shadow-lg rounded-xs p-6 sm:p-12 lg:p-16 text-neutral-900 text-[13px] leading-relaxed">
                    
                    {/* =========================================================================
                        KOP DOKUMEN RESMI (OFFICIAL DOCUMENT HEADER)
                        ========================================================================= */}
                    <div className="border-2 border-neutral-900 p-4 sm:p-6 mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-neutral-900 pb-4 text-center sm:text-left">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/images/logo.png"
                                    alt="JAGAIN"
                                    className="h-10 w-auto object-contain"
                                />
                                <div>
                                    <div className="text-[11px] font-bold tracking-wider text-neutral-600 uppercase">
                                        Pemerintah Republik Indonesia • Satuan Tugas Wilayah Kalimantan
                                    </div>
                                    <div className="text-sm font-extrabold text-neutral-950 uppercase tracking-tight">
                                        Sistem Pengawasan Karhutla Terpadu (JAGAIN)
                                    </div>
                                </div>
                            </div>

                            <div className="text-center sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-300">
                                <span className="inline-block px-2.5 py-1 text-[11px] font-mono font-bold uppercase bg-neutral-100 border border-neutral-400 text-neutral-900">
                                    DOKUMEN RESMI TERKENDALI
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 text-center">
                            <h1 className="text-base sm:text-lg font-black uppercase text-neutral-950 tracking-wide">
                                Standar Operasional Prosedur (SOP)
                            </h1>
                            <h2 className="text-sm sm:text-base font-bold uppercase text-neutral-800 mt-0.5">
                                Penanggulangan & Mitigasi Tanggap Darurat Kebakaran Hutan dan Lahan
                            </h2>
                        </div>

                        {/* Document Metadata Table */}
                        <div className="mt-5 border border-neutral-900 grid grid-cols-2 sm:grid-cols-4 text-[11px] divide-x divide-y sm:divide-y-0 divide-neutral-900 bg-neutral-50/70 font-mono">
                            <div className="p-2">
                                <span className="text-neutral-500 block text-[10px]">No. Dokumen:</span>
                                <strong className="text-neutral-900">SOP/JGN-KLB/2026/01</strong>
                            </div>
                            <div className="p-2">
                                <span className="text-neutral-500 block text-[10px]">Tanggal Berlaku:</span>
                                <strong className="text-neutral-900">01 Juli 2026</strong>
                            </div>
                            <div className="p-2">
                                <span className="text-neutral-500 block text-[10px]">No. Revisi:</span>
                                <strong className="text-neutral-900">02 (Mutakhir)</strong>
                            </div>
                            <div className="p-2">
                                <span className="text-neutral-500 block text-[10px]">Klasifikasi:</span>
                                <strong className="text-neutral-900">Terbuka / Publik</strong>
                            </div>
                        </div>
                    </div>

                    {/* =========================================================================
                        PASAL 1: MAKSUD DAN TUJUAN
                        ========================================================================= */}
                    <section className="mb-7">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
                            Pasal 1 — Maksud dan Tujuan
                        </h3>
                        <p className="text-justify mb-2 text-neutral-800">
                            1.1. Standar Operasional Prosedur (SOP) ini diterbitkan sebagai pedoman resmi tata laksana kesiapsiagaan, mitigasi bahaya kabut asap, evakuasi dini, serta mekanisme pelaporan masyarakat berbasis sistem terintegrasi JAGAIN di seluruh bentang alam Pulau Kalimantan.
                        </p>
                        <p className="text-justify text-neutral-800">
                            1.2. Tujuan utama prosedur ini adalah melindungi keselamatan jiwa warga negara, meminimalkan paparan gas beracun partikulat PM2.5, serta mempercepat waktu respon (*response time*) satuan tugas penanggulangan (BPBD, Manggala Agni, dan Dinas Pemadam Kebakaran) dalam memadamkan titik api kebakaran hutan dan lahan.
                        </p>
                    </section>

                    {/* =========================================================================
                        PASAL 2: LANDASAN HUKUM
                        ========================================================================= */}
                    <section className="mb-7">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
                            Pasal 2 — Landasan Hukum dan Regulasi Acuan
                        </h3>
                        <ol className="list-decimal list-inside space-y-1 text-neutral-800">
                            <li>Undang-Undang Republik Indonesia Nomor 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup.</li>
                            <li>Undang-Undang Republik Indonesia Nomor 24 Tahun 2007 tentang Penanggulangan Bencana.</li>
                            <li>Instruksi Presiden Republik Indonesia Nomor 3 Tahun 2020 tentang Penanggulangan Kebakaran Hutan dan Lahan.</li>
                            <li>Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor P.32/MenLHK/Setjen/Kum.1/3/2016 tentang Pengendalian Kebakaran Hutan dan Lahan.</li>
                        </ol>
                    </section>

                    {/* =========================================================================
                        PASAL 3: TINGKAT ISPU DAN TINDAKAN WAJIB
                        ========================================================================= */}
                    <section className="mb-7">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
                            Pasal 3 — Parameter Indeks Standar Pencemar Udara (ISPU) & Tindakan Wajib
                        </h3>
                        <p className="mb-3 text-neutral-800">
                            Tingkat bahaya pencemaran udara akibat kabut asap karhutla mengacu pada Keputusan Menteri LHK dan wajib dipatuhi dengan ketentuan sebagai berikut:
                        </p>

                        <div className="border border-neutral-400 overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-neutral-100 border-b border-neutral-400 font-bold text-neutral-900">
                                        <th className="p-2.5 border-r border-neutral-400 w-24">Rentang Nilai</th>
                                        <th className="p-2.5 border-r border-neutral-400 w-32">Kategori Mutu</th>
                                        <th className="p-2.5 border-r border-neutral-400">Dampak Kesehatan</th>
                                        <th className="p-2.5">Tindakan Wajib Warga</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-300 text-neutral-800">
                                    {ispuLevels.map((lvl) => (
                                        <tr key={lvl.range} className="hover:bg-neutral-50/80">
                                            <td className="p-2.5 border-r border-neutral-300 font-mono font-bold whitespace-nowrap">
                                                {lvl.range}
                                            </td>
                                            <td className="p-2.5 border-r border-neutral-300 font-bold whitespace-nowrap">
                                                <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${lvl.badgeBg}`}>
                                                    {lvl.category}
                                                </span>
                                            </td>
                                            <td className="p-2.5 border-r border-neutral-300 leading-snug">
                                                {lvl.description}
                                            </td>
                                            <td className="p-2.5 leading-snug font-medium text-neutral-900">
                                                {lvl.action}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* =========================================================================
                        PASAL 4: PERINGATAN KRITIS LAHAN GAMBUT
                        ========================================================================= */}
                    <section className="mb-7">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
                            Pasal 4 — Protokol Khusus Keselamatan Kawasan Gambut
                        </h3>
                        <div className="border-l-4 border-amber-600 bg-amber-50/60 p-4 rounded-r-sm text-neutral-900 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wide">
                                <AlertTriangle className="size-4 text-amber-700 shrink-0" />
                                <span>Peringatan Bahaya Kebakaran Bawah Tanah (Smoldering Peat Fire)</span>
                            </div>
                            <p className="text-justify text-neutral-800">
                                Lahan gambut memiliki karakteristik pembakaran bawah permukaan tanpa nyala api terbuka (*smoldering*). Abu tipis di permukaan sering kali menyamarkan rongga pembakaran sedalam 1–3 meter yang bertemperatur lebih dari 400°C.
                            </p>
                            <p className="font-semibold text-neutral-950">
                                Ketentuan Wajib: Warga dan relawan dilarang keras menginjak atau mendekati area gambut berasap. Pengambilan dokumentasi visual harus dilakukan dari tepi jalan beraspal atau zona tanah padat yang aman.
                            </p>
                        </div>
                    </section>

                    {/* =========================================================================
                        PASAL 5: PROSEDUR PERLINDUNGAN DIRI & EVAKUASI
                        ========================================================================= */}
                    <section className="mb-7">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
                            Pasal 5 — Prosedur Perlindungan Diri & Evakuasi Mandiri
                        </h3>
                        <div className="space-y-3 text-neutral-800">
                            <div>
                                <strong className="text-neutral-950 block">5.1. Protokol Melawan Arah Angin (Upwind Safety)</strong>
                                <p className="text-justify">
                                    Saat terdeteksi titik api atau kepulan asap, segera tentukan arah hembusan angin. Posisikan diri dan jalur penyelamatan selalu berlawanan arah dengan arah asap bergerak (*upwind*). Jangan pernah berlindung di daerah lembah atau parit gambut tertutup yang menjadi perangkap gas karbon monoksida.
                                </p>
                            </div>
                            <div>
                                <strong className="text-neutral-950 block">5.2. Standar Masker Pelindung Pernapasan</strong>
                                <p className="text-justify">
                                    Wajib mengenakan respirator partikulat bersertifikat N95, KN95, atau FFP2 yang terpasang rapat menutup hidung dan mulut. Masker bedah tipis dan kain biasa terbukti tidak mampu menyaring partikel beracun PM2.5 yang memicu penyakit pernapasan akut (ISPA).
                                </p>
                            </div>
                            <div>
                                <strong className="text-neutral-950 block">5.3. Pembuatan Ruang Udara Bersih (Clean Room Isolation)</strong>
                                <p className="text-justify">
                                    Bagi warga yang berada di zona terdampak kabut asap, pilih satu ruangan paling minim ventilasi di dalam rumah. Tutup rapat celah jendela dan pintu menggunakan kain atau handuk basah, serta fungsikan penjernih udara berefisiensi tinggi (HEPA Filter).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* =========================================================================
                        PASAL 6: ALUR LAPORAN & KOORDINASI SATGAS
                        ========================================================================= */}
                    <section className="mb-7">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
                            Pasal 6 — Alur Penanganan Laporan & Disposisi Satuan Tugas JAGAIN
                        </h3>
                        <div className="border border-neutral-300 bg-neutral-50/50 p-4 rounded-sm">
                            <ol className="list-decimal list-inside space-y-2 text-neutral-800">
                                <li>
                                    <strong className="text-neutral-950">Pengiriman Bukti oleh Warga:</strong> Warga mengakses menu Buat Laporan di portal JAGAIN, menyertakan koordinat GPS otomatis dan dokumentasi foto lokasi kejadian.
                                </li>
                                <li>
                                    <strong className="text-neutral-950">Validasi Satelit & Verifikasi Tim:</strong> Admin JAGAIN melakukan validasi silang dengan data anomali termal satelit (NASA FIRMS / LAPAN) dalam waktu maksimal 15 menit.
                                </li>
                                <li>
                                    <strong className="text-neutral-950">Disposisi ke OPD Terdekat:</strong> Sistem secara otomatis memetakan dan menugaskan instansi terdekat (BPBD Kabupaten/Kota, Posko Manggala Agni, atau Damkar setempat).
                                </li>
                                <li>
                                    <strong className="text-neutral-950">Pemberangkatan Regu Lapangan & Pemadaman:</strong> Regu patroli dan armada pemadam meluncur ke koordinat sasaran dengan audit trail perkembangan yang dapat dipantau langsung oleh pelapor.
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* =========================================================================
                        PASAL 7: DIREKTORI PUSDALOPS KALIMANTAN
                        ========================================================================= */}
                    <section className="mb-9">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-2.5">
                            Pasal 7 — Direktori Kontak Posko Siaga Pusdalops Se-Kalimantan
                        </h3>
                        <p className="mb-3 text-neutral-800">
                            Berikut adalah kontak resmi pusat kendali operasi kebencanaan daerah untuk koordinasi tanggap darurat dan perbantuan evakuasi medis darurat:
                        </p>

                        <div className="border border-neutral-400 overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-neutral-100 border-b border-neutral-400 font-bold text-neutral-900">
                                        <th className="p-2.5 border-r border-neutral-400 w-36">Wilayah</th>
                                        <th className="p-2.5 border-r border-neutral-400">Instansi / Posko</th>
                                        <th className="p-2.5 border-r border-neutral-400 w-36">Hotline / Telepon</th>
                                        <th className="p-2.5">Alamat Operasional</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-300 text-neutral-800 font-medium">
                                    {provincialContacts.map((c) => (
                                        <tr key={c.province} className="hover:bg-neutral-50/80">
                                            <td className="p-2.5 border-r border-neutral-300 font-bold text-neutral-900 whitespace-nowrap">
                                                {c.province}
                                            </td>
                                            <td className="p-2.5 border-r border-neutral-300">
                                                {c.posko}
                                            </td>
                                            <td className="p-2.5 border-r border-neutral-300 font-mono font-bold text-emerald-800 whitespace-nowrap">
                                                {c.phone}
                                            </td>
                                            <td className="p-2.5 text-neutral-600">
                                                {c.address}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-emerald-50/60 font-bold text-emerald-950">
                                        <td className="p-2.5 border-r border-neutral-300">
                                            Nasional
                                        </td>
                                        <td className="p-2.5 border-r border-neutral-300">
                                            Panggilan Darurat Terpadu Pemda (NTE)
                                        </td>
                                        <td className="p-2.5 border-r border-neutral-300 font-mono text-base font-black text-emerald-900">
                                            112
                                        </td>
                                        <td className="p-2.5 text-xs text-neutral-700">
                                            Layanan bebas pulsa 24 jam seluruh operator
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* =========================================================================
                        LEMBAR PENGESAHAN DAN TANDA TANGAN RESMI
                        ========================================================================= */}
                    <div className="border-t-2 border-neutral-900 pt-6 mt-8">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 text-xs">
                            <div>
                                <p className="font-bold text-neutral-900">Catatan Dokumen:</p>
                                <p className="text-neutral-600 max-w-sm mt-0.5 leading-relaxed text-[11px]">
                                    Dokumen SOP ini sah dan mengikat bagi seluruh personel operasional di lingkungan sistem JAGAIN Kalimantan. Evaluasi dan revisi berkala dilakukan setiap menjelang puncak musim kemarau.
                                </p>
                            </div>

                            <div className="text-center sm:text-right w-full sm:w-auto">
                                <p className="text-neutral-700 text-[11px]">Ditetapkan di: Pontianak, Kalimantan Barat</p>
                                <p className="text-neutral-700 text-[11px]">Pada tanggal: 01 Juli 2026</p>

                                <div className="mt-4 flex flex-col items-center sm:items-end">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-emerald-700 bg-emerald-50 text-emerald-900 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                                        <CheckCircle2 className="size-3 text-emerald-700" />
                                        <span>VERIFIED & DIGITALLY APPROVED</span>
                                    </div>
                                    <p className="font-bold text-neutral-950 text-xs">Satgas Operasi Karhutla Terpadu</p>
                                    <p className="text-neutral-500 text-[10px]">Sistem Informasi Pemantauan JAGAIN</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </article>
            </main>
        </div>
    );
}
