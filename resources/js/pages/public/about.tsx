import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Printer,
    ShieldCheck,
    FileText,
    CheckCircle2,
    Lock,
    EyeOff,
    Database,
    Satellite,
    AlertCircle,
    Building2,
    Activity,
    Scale,
    Flame,
    Share2,
} from 'lucide-react';

export default function AboutPage() {
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#eaeeeb] text-neutral-900 font-sans antialiased selection:bg-[#10e57a] selection:text-black">
            <Head title="Dokumen Resmi Transparansi & Provenance Data — JAGAIN" />

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
                        <ShieldCheck className="size-4 text-emerald-700 shrink-0" />
                        <span className="text-xs font-bold text-neutral-900 tracking-tight">
                            DOKUMEN RESMI KETERBUKAAN INFORMASI PUBLIK (KIP) & PROVENANCE DATA
                        </span>
                        <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                            DOC/JGN-KIP/2026/XI
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0c4e33] hover:bg-[#083824] text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                        title="Cetak atau simpan sebagai PDF"
                    >
                        <Printer className="size-3.5" />
                        <span>Cetak / Unduh PDF</span>
                    </button>
                </div>
            </header>

            {/* Document Sheet (Paper container) */}
            <main className="py-6 sm:py-10 px-3 sm:px-6">
                <article className="document-sheet mx-auto max-w-4xl bg-white border border-neutral-300 shadow-sm rounded-sm p-6 sm:p-12 text-neutral-900">
                    {/* Institutional Header & Document Letterhead */}
                    <header className="border-b-2 border-neutral-900 pb-5 mb-6 text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="size-11 rounded-lg bg-[#0c4e33] text-white flex items-center justify-center font-black text-xl tracking-tighter">
                                J
                            </div>
                            <div className="text-left">
                                <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-600">
                                    KONSORSIUM KAWAL KARHUTLA TERPADU KALIMANTAN
                                </h2>
                                <h1 className="text-lg sm:text-xl font-black uppercase text-neutral-950 tracking-wide leading-tight">
                                    JAGAIN (JAGA HUTAN, KAWAL PENANGANAN)
                                </h1>
                            </div>
                        </div>
                        <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                            Pusat Komando Geospasial, Integritas Audit Trail & Keterbukaan Informasi Publik
                        </p>

                        {/* Document Classification & Metadata Grid */}
                        <div className="mt-5 border border-neutral-900 grid grid-cols-2 sm:grid-cols-4 text-[11px] divide-x divide-y sm:divide-y-0 divide-neutral-900 bg-neutral-50/70 font-mono text-left">
                            <div className="p-2.5">
                                <span className="block text-[10px] text-neutral-500 uppercase font-semibold">Nomor Berkas:</span>
                                <strong className="text-neutral-900 font-bold">DOC/JGN-KIP/2026/XI-01</strong>
                            </div>
                            <div className="p-2.5">
                                <span className="block text-[10px] text-neutral-500 uppercase font-semibold">Klasifikasi Dokumen:</span>
                                <strong className="text-emerald-800 font-bold">TERBUKA (PUBLIK)</strong>
                            </div>
                            <div className="p-2.5">
                                <span className="block text-[10px] text-neutral-500 uppercase font-semibold">Cakupan Wilayah:</span>
                                <strong className="text-neutral-900 font-bold">5 Provinsi Kalimantan</strong>
                            </div>
                            <div className="p-2.5">
                                <span className="block text-[10px] text-neutral-500 uppercase font-semibold">Pembaruan Terakhir:</span>
                                <strong className="text-neutral-900 font-bold">04 Nov 2026, 14.00 WIB</strong>
                            </div>
                        </div>
                    </header>

                    {/* Document Title Banner */}
                    <div className="mb-8 pb-3 border-b border-neutral-200">
                        <h2 className="text-lg sm:text-xl font-bold uppercase text-neutral-950 tracking-tight">
                            DOKUMEN TRANSPARANSI PLATFORM, PROVENANCE DATA & AKUNTABILITAS PUBLIK
                        </h2>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                            Dokumen resmi keterbukaan publik mengenai tata kelola data, metodologi satelit, protokol kerahasiaan identitas pelapor, serta standar operasional penugasan instansi teknis (OPD/BPBD) dalam penanggulangan karhutla di Kalimantan.
                        </p>
                    </div>

                    {/* Section 1: Landasan Hukum & Hak Atas Informasi Publik */}
                    <section className="mb-8">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-3 flex items-center gap-2">
                            <Scale className="size-4 text-emerald-800" />
                            <span>1. Landasan Hukum & Hak Atas Informasi Publik</span>
                        </h3>
                        <p className="text-xs text-neutral-800 leading-relaxed text-justify mb-3">
                            Platform JAGAIN beroperasi berlandaskan komitmen keterbukaan tata kelola pemerintahan dan partisipasi warga negara, merujuk pada ketentuan perundang-undangan berikut:
                        </p>
                        <div className="border border-neutral-300 rounded-sm overflow-hidden text-xs">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-100 border-b border-neutral-300 font-bold text-neutral-900">
                                    <tr>
                                        <th className="p-2.5 border-r border-neutral-300 w-1/3">Dasar Hukum</th>
                                        <th className="p-2.5">Amanat & Implementasi Sistem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">
                                            UU No. 14 Tahun 2008 (KIP)
                                        </td>
                                        <td className="p-2.5 leading-snug">
                                            Menjamin hak masyarakat untuk mengakses informasi publik mengenai potensi bahaya kebakaran lingkungan hidup secara berkala, serta-merta, dan tanpa diskriminasi.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">
                                            UU No. 32 Tahun 2009 (PPLH)
                                        </td>
                                        <td className="p-2.5 leading-snug">
                                            Setiap orang berhak atas lingkungan hidup yang baik dan sehat serta berhak mendapatkan pendidikan lingkungan, akses informasi, dan akses partisipasi.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">
                                            UU No. 27 Tahun 2022 (PDP)
                                        </td>
                                        <td className="p-2.5 leading-snug">
                                            Kewajiban pelindungan data pribadi (PII) warga negara. Nomor telepon, email, dan nama asli pelapor wajib diredaksi dan disamarkan pada antarmuka publik.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">
                                            UU No. 1 Tahun 2024 (ITE)
                                        </td>
                                        <td className="p-2.5 leading-snug">
                                            Integritas catatan elektronik melalui audit trail permanen yang dapat dipertanggungjawabkan secara forensik digital.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 2: Prinsip Utama & Alur Pengolahan Data */}
                    <section className="mb-8">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-3 flex items-center gap-2">
                            <Activity className="size-4 text-emerald-800" />
                            <span>2. Prinsip Utama Pengolahan Data Laporan Warga</span>
                        </h3>
                        <p className="text-xs text-neutral-800 leading-relaxed text-justify mb-3">
                            Setiap laporan masyarakat yang masuk ke dalam sistem JAGAIN diproses melalui 4 prinsip akuntabilitas:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 border border-neutral-300 rounded-sm bg-neutral-50/60">
                                <div className="font-bold text-neutral-950 flex items-center gap-1.5 mb-1">
                                    <CheckCircle2 className="size-3.5 text-emerald-700" />
                                    <span>Kode Pelacak Unik (Tracking Code)</span>
                                </div>
                                <p className="text-[11px] text-neutral-600 leading-snug">
                                    Setiap laporan diterbitkan nomor resi resmi format <code className="font-mono bg-neutral-200 px-1 py-0.5 rounded">JGN-YYYYMM-XXXXX</code> yang dapat dilacak progresnya oleh pelapor kapan saja.
                                </p>
                            </div>

                            <div className="p-3 border border-neutral-300 rounded-sm bg-neutral-50/60">
                                <div className="font-bold text-neutral-950 flex items-center gap-1.5 mb-1">
                                    <Lock className="size-3.5 text-emerald-700" />
                                    <span>Audit Trail Permanen (Append-Only)</span>
                                </div>
                                <p className="text-[11px] text-neutral-600 leading-snug">
                                    Seluruh perubahan status, disposisi OPD, dan catatan telaah disimpan permanen ke dalam basis data audit trail yang tidak dapat dihapus atau dimanipulasi (*tamper-proof*).
                                </p>
                            </div>

                            <div className="p-3 border border-neutral-300 rounded-sm bg-neutral-50/60">
                                <div className="font-bold text-neutral-950 flex items-center gap-1.5 mb-1">
                                    <EyeOff className="size-3.5 text-emerald-700" />
                                    <span>Redaksi PII & Privasi Warga</span>
                                </div>
                                <p className="text-[11px] text-neutral-600 leading-snug">
                                    Identitas pribadi pelapor (nama asli, nomor kontak, IP address) disamarkan (*redacted*) dari publik guna mencegah intimidasi dari pihak pembakar lahan liar.
                                </p>
                            </div>

                            <div className="p-3 border border-neutral-300 rounded-sm bg-neutral-50/60">
                                <div className="font-bold text-neutral-950 flex items-center gap-1.5 mb-1">
                                    <Building2 className="size-3.5 text-emerald-700" />
                                    <span>Disposisi Terbuka ke Instansi Berwenang</span>
                                </div>
                                <p className="text-[11px] text-neutral-600 leading-snug">
                                    Laporan terverifikasi diteruskan secara transparan ke BPBD, Manggala Agni KLHK, Dinas Damkar, atau TNI/Polri setempat dengan status tercatat jelas.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Data Provenance & Sumber Observasi Satelit */}
                    <section className="mb-8">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-3 flex items-center gap-2">
                            <Satellite className="size-4 text-emerald-800" />
                            <span>3. Provenance Data Observasi Satelit Terbuka (NASA FIRMS)</span>
                        </h3>
                        <p className="text-xs text-neutral-800 leading-relaxed text-justify mb-3">
                            Selain laporan warga langsung, peta publik JAGAIN mengintegrasikan data anomali termal *hotspot* dari instrumen antariksa NASA FIRMS (*Fire Information for Resource Management System*) dengan spesifikasi teknis berikut:
                        </p>
                        <div className="border border-neutral-300 rounded-sm overflow-hidden text-xs">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-100 border-b border-neutral-300 font-bold text-neutral-900">
                                    <tr>
                                        <th className="p-2.5 border-r border-neutral-300">Parameter Sensor</th>
                                        <th className="p-2.5 border-r border-neutral-300">Spesifikasi Instrumen</th>
                                        <th className="p-2.5">Keterangan Penggunaan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 text-neutral-800">
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">Sensor VIIRS</td>
                                        <td className="p-2.5 border-r border-neutral-300 font-mono text-[11px]">Suomi-NPP & NOAA-20 (Resolusi 375m)</td>
                                        <td className="p-2.5 text-[11px] leading-snug">Deteksi anomali termal resolusi tinggi, mampu mendeteksi api kebakaran lahan skala kecil.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">Sensor MODIS</td>
                                        <td className="p-2.5 border-r border-neutral-300 font-mono text-[11px]">Terra & Aqua (Resolusi 1km)</td>
                                        <td className="p-2.5 text-[11px] leading-snug">Data historis dan perbandingan makro fluks energi radiasi api (FRP MW).</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">Latensi Pengolahan</td>
                                        <td className="p-2.5 border-r border-neutral-300 font-mono text-[11px]">± 1.5 s/d 3 Jam Pasca-Lintasan Orbit</td>
                                        <td className="p-2.5 text-[11px] leading-snug">Diperlukan waktu transmisi orbit dari stasiun bumi sebelum data tersedia di sistem.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2.5 border-r border-neutral-300 font-semibold font-mono text-[11px]">Derajat Kepercayaan</td>
                                        <td className="p-2.5 border-r border-neutral-300 font-mono text-[11px]">Tinggi (&ge; 80%), Sedang (50-79%), Rendah (&lt; 50%)</td>
                                        <td className="p-2.5 text-[11px] leading-snug">Menandakan validitas spektral titik panas terhadap gangguan pantulan sinar matahari / atap seng.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 4: Standar Layanan (SLA) & Tahapan Penanganan */}
                    <section className="mb-8">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-3 flex items-center gap-2">
                            <FileText className="size-4 text-emerald-800" />
                            <span>4. Standar Layanan (SLA) Verifikasi & Disposisi</span>
                        </h3>
                        <p className="text-xs text-neutral-800 leading-relaxed text-justify mb-3">
                            Setiap laporan masyarakat melalui 4 tahapan status resmi yang dipantau durasi penanganannya:
                        </p>
                        <div className="space-y-2 text-xs">
                            <div className="p-3 border border-neutral-300 rounded-sm flex items-start gap-3 bg-neutral-50/40">
                                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-neutral-200 text-neutral-800 shrink-0 mt-0.5">
                                    TAHAP 1
                                </span>
                                <div>
                                    <strong className="text-neutral-950">Laporan Baru Masuk (SUBMITTED) &bull; Target Telaah: &lt; 15 Menit</strong>
                                    <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                                        Pemeriksaan otomatis kelengkapan koordinat batas wilayah 5 provinsi Kalimantan, validitas bukti foto, dan deduplikasi terhadap laporan pada radius 500 meter yang sama.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 border border-neutral-300 rounded-sm flex items-start gap-3 bg-blue-50/40 border-blue-200">
                                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-blue-100 text-blue-900 shrink-0 mt-0.5">
                                    TAHAP 2
                                </span>
                                <div>
                                    <strong className="text-blue-950">Sedang Ditinjau & Terverifikasi (UNDER_REVIEW & VERIFIED) &bull; Target: &lt; 30 Menit</strong>
                                    <p className="text-[11px] text-blue-900/80 mt-0.5 leading-snug">
                                        Admin memverifikasi kecocokan visual terhadap citra anomali termal satelit dan menetapkan tingkat keparahan (Ringan, Sedang, atau Berat).
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 border border-neutral-300 rounded-sm flex items-start gap-3 bg-amber-50/40 border-amber-200">
                                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                                    TAHAP 3
                                </span>
                                <div>
                                    <strong className="text-amber-950">Disposisi & Penugasan ke OPD Terkait (DISPATCHED) &bull; Target: &lt; 60 Menit</strong>
                                    <p className="text-[11px] text-amber-900/80 mt-0.5 leading-snug">
                                        Surat tugas digital diteruskan ke posko BPBD kabupaten/kota, regu Manggala Agni Daops, atau pos Damkar terdekat untuk pengerahan armada lapangan.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 border border-neutral-300 rounded-sm flex items-start gap-3 bg-emerald-50/40 border-emerald-200">
                                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-100 text-emerald-900 shrink-0 mt-0.5">
                                    TAHAP 4
                                </span>
                                <div>
                                    <strong className="text-emerald-950">Selesai Terverifikasi (RESOLVED_VERIFIED) &bull; Berita Acara Resmi</strong>
                                    <p className="text-[11px] text-emerald-900/80 mt-0.5 leading-snug">
                                        Tim lapangan mengunggah dokumentasi pemadaman dan pendinginan bara gambut (*mop-up*). Laporan ditutup dengan riwayat lengkap yang dapat diaudit publik.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Batasan Sistem & Disclaimer Resmi */}
                    <section className="mb-8">
                        <h3 className="text-sm font-bold uppercase text-neutral-950 border-b border-neutral-300 pb-1 mb-3 flex items-center gap-2">
                            <AlertCircle className="size-4 text-amber-700" />
                            <span>5. Batasan Operasional & Peringatan Darurat</span>
                        </h3>
                        <div className="p-4 border border-amber-300 bg-amber-50/60 rounded-sm text-xs leading-relaxed text-amber-950 space-y-2">
                            <p className="font-bold">
                                PERHATIAN: JAGAIN Merupakan Sistem Informasi Geospasial & Pengawalan Koordinasi, Bukan Pengganti Saluran Darurat Jiwa.
                            </p>
                            <p className="text-[11px] text-amber-900">
                                1. Jika kebakaran mengancam pemukiman, fasilitas umum, atau keselamatan jiwa secara langsung, warga <strong>WAJIB SEGERA MENGHUBUNGI</strong> nomor darurat darat: <strong>Pemadam Kebakaran (113)</strong>, <strong>Kedaruratan Bencana (112)</strong>, atau <strong>Polsek/Koramil setempat</strong>.
                            </p>
                            <p className="text-[11px] text-amber-900">
                                2. Deteksi satelit dapat terhalang oleh awan tebal cumulonimbus atau kanopi hutan lebat. Ketiadaan *hotspot* pada peta satelit tidak berarti suatu wilayah 100% bebas dari titik api permukaan gambut.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Pengesahan & Audit Metadata */}
                    <section className="pt-6 border-t-2 border-neutral-900">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
                            <div>
                                <p className="font-bold text-neutral-900">Catatan Legalitas Dokumen:</p>
                                <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                                    Dokumen ini diterbitkan secara elektronik dan dilindungi oleh hash kriptografis SHA-256 pada pangkalan data audit sistem JAGAIN. Setiap pihak berhak menyebarluaskan dokumen ini untuk kepentingan perlindungan lingkungan hidup dan transparansi publik.
                                </p>
                            </div>

                            <div className="text-right sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-neutral-200">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-emerald-700 bg-emerald-50 text-emerald-900 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                                    <span>TERVALIDASI SECARA ELEKTRONIK</span>
                                </div>
                                <p className="font-bold text-neutral-950 text-xs">Tata Kelola Data & Keterbukaan Publik</p>
                                <p className="text-[11px] text-neutral-600">Konsorsium Pengendalian Karhutla Terpadu Kalimantan</p>
                                <p className="text-[10px] text-neutral-400 font-mono mt-1">ID Otorisasi: JGN-AUTH-2026-PUBKIP</p>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
}
