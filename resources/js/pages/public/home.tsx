import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import KarhutlaMap, { MapReport } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import { Shield, MapPin, Eye, ArrowRight, CheckCircle2, AlertTriangle, FileText, Send } from 'lucide-react';

interface HomeProps {
    stats: {
        total_reports: number;
        verified_reports: number;
        active_dispatched: number;
        resolved_reports: number;
        simulated_hotspots: number;
    };
    recentReports: MapReport[];
}

export default function Home({ stats, recentReports }: HomeProps) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-[#171C19]">
            <Head title="JAGAIN — Pantau Karhutla. Kawal Penanganannya." />
            
            <EmergencyBanner />
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#174B35] via-[#216B49] to-[#174B35] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-[#E8F1EB]">
                            <span className="size-2 rounded-full bg-[#E8F1EB] animate-pulse" />
                            Platform Transparansi & Akuntabilitas Karhutla Kalimantan
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                            Pantau Karhutla. <br />
                            <span className="text-[#E8F1EB]">Kawal Penanganannya.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-[#E8F1EB]/90 leading-relaxed max-w-2xl">
                            JAGAIN menghubungkan pelaporan kebakaran hutan dan lahan oleh masyarakat dengan verifikasi berjenjang, penugasan resmi ke OPD/instansi terkait, dan pelacakan tindak lanjut yang transparan dan dapat diaudit.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                href="/lapor"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#174B35] font-semibold text-sm hover:bg-[#F3F7F4] shadow-md transition-all"
                            >
                                <FileText className="size-4" />
                                Kirim Laporan Karhutla
                            </Link>

                            <Link
                                href="/peta"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#174B35]/80 hover:bg-[#174B35] text-white border border-white/30 font-semibold text-sm transition-all"
                            >
                                <Eye className="size-4" />
                                Buka Peta Sebaran Kalimantan
                            </Link>
                        </div>
                    </div>

                    {/* Stats Ribbon based on real database records */}
                    <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-white/20">
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                {stats.total_reports}
                            </div>
                            <div className="text-xs text-[#E8F1EB]/80 mt-0.5">Total Laporan Warga Masuk</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                {stats.verified_reports}
                            </div>
                            <div className="text-xs text-[#E8F1EB]/80 mt-0.5">Laporan Terverifikasi</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                {stats.active_dispatched}
                            </div>
                            <div className="text-xs text-[#E8F1EB]/80 mt-0.5">Penugasan Aktif OPD</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                {stats.resolved_reports}
                            </div>
                            <div className="text-xs text-[#E8F1EB]/80 mt-0.5">Penanganan Selesai Diverifikasi</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Preview Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#216B49] mb-1">
                            Peta Pemantauan Langsung
                        </div>
                        <h2 className="text-2xl font-bold text-[#171C19]">
                            Sebaran Laporan Karhutla di Kalimantan
                        </h2>
                        <p className="text-xs text-[#68716B] mt-1 max-w-2xl">
                            Titik koordinat laporan warga terverifikasi dan observasi satelit. Klik pada titik mana pun untuk melihat status dan kronologi tindak lanjut.
                        </p>
                    </div>

                    <Link
                        href="/peta"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#216B49] hover:text-[#174B35] shrink-0"
                    >
                        Buka Peta Layar Penuh dengan Filter
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <KarhutlaMap reports={recentReports} height="440px" />
            </section>

            {/* Recent Reports Stream */}
            <section className="py-10 bg-[#F3F7F4] border-y border-[#DDE3DE] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-[#171C19]">Laporan Publik Terbaru</h2>
                            <p className="text-xs text-[#68716B] mt-0.5">
                                Catatan perjalanan laporan, pembaruan status, dan penugasan instansi
                            </p>
                        </div>
                        <Link
                            href="/peta"
                            className="text-xs font-medium text-[#216B49] hover:underline"
                        >
                            Lihat Semua ({stats.total_reports})
                        </Link>
                    </div>

                    {recentReports.length === 0 ? (
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-8 text-center text-[#68716B]">
                            <p className="text-sm">Belum ada laporan publik yang tercatat saat ini.</p>
                            <Link href="/lapor" className="inline-block mt-3 text-xs font-semibold text-[#216B49] underline">
                                Kirim laporan pertama Anda
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {recentReports.map((report) => (
                                <div
                                    key={report.id}
                                    className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs hover:border-[#216B49]/50 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-[11px] font-mono text-[#68716B]">
                                                {report.tracking_code}
                                            </span>
                                            <StatusBadge status={report.report_status} label={report.status_label} size="sm" />
                                        </div>

                                        <h3 className="font-semibold text-sm text-[#171C19] line-clamp-2 mb-1.5">
                                            {report.title}
                                        </h3>

                                        <p className="text-xs text-[#68716B] line-clamp-2 mb-3">
                                            {report.location_description}
                                        </p>

                                        <div className="space-y-1 text-[11px] text-[#343B36] border-t border-[#DDE3DE] pt-2 mb-3">
                                            <div className="flex items-center gap-1.5 text-[#68716B]">
                                                <MapPin className="size-3 text-[#216B49]" />
                                                <span>{report.regency_city}, {report.province}</span>
                                            </div>
                                            {report.fire_condition && (
                                                <FireConditionBadge condition={report.fire_condition} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-[#DDE3DE] flex items-center justify-between text-xs">
                                        <span className="text-[11px] text-[#68716B]">
                                            {report.reported_occurrence_at
                                                ? new Date(report.reported_occurrence_at).toLocaleDateString('id-ID', {
                                                      day: 'numeric',
                                                      month: 'short',
                                                      year: 'numeric',
                                                  })
                                                : 'Waktu baru ini'}
                                        </span>
                                        <Link
                                            href={`/laporan-publik/${report.tracking_code}`}
                                            className="font-semibold text-[#216B49] hover:text-[#174B35] inline-flex items-center gap-1"
                                        >
                                            Detail Kronologi
                                            <ArrowRight className="size-3" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works (Alur Kerja 3 Langkah) */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold text-[#171C19]">Alur Penanganan JAGAIN</h2>
                    <p className="text-xs text-[#68716B] mt-1">
                        Memastikan setiap laporan memiliki jejak audit dan tidak hilang di tengah jalan
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 relative">
                        <div className="size-10 rounded-lg bg-[#E8F1EB] text-[#174B35] font-bold flex items-center justify-center text-sm mb-4">
                            01
                        </div>
                        <h3 className="font-bold text-base text-[#171C19] mb-2">
                            Laporan Warga Terstruktur
                        </h3>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Masyarakat mengirimkan laporan dengan koordinat akurat, deskripsi lokasi, kategori karhutla, dan bukti visual tanpa mengabaikan keselamatan diri. Setiap laporan mendapatkan kode lacak unik.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 relative">
                        <div className="size-10 rounded-lg bg-[#E8F1EB] text-[#216B49] font-bold flex items-center justify-center text-sm mb-4">
                            02
                        </div>
                        <h3 className="font-bold text-base text-[#171C19] mb-2">
                            Pemeriksaan & Penugasan OPD
                        </h3>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Admin memeriksa potensi duplikasi dan kelengkapan bukti. Laporan yang memenuhi kriteria diverifikasi dan diteruskan secara resmi kepada instansi berwenang (BPBD, Manggala Agni, atau Damkar setempat).
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 relative">
                        <div className="size-10 rounded-lg bg-[#E8F1EB] text-[#39845C] font-bold flex items-center justify-center text-sm mb-4">
                            03
                        </div>
                        <h3 className="font-bold text-base text-[#171C19] mb-2">
                            Tindak Lanjut & Audit Publik
                        </h3>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            OPD mencatat penerimaan tugas, pembaharuan progres pemadaman/sekat bakar, serta bukti penanganan. Seluruh riwayat perubahan status dapat dilihat secara transparan oleh pelapor dan publik.
                        </p>
                    </div>
                </div>
            </section>

            {/* Safety Callout Banner */}
            <section className="bg-[#174B35] text-white py-10 px-4 sm:px-6 lg:px-8 mb-10 mx-4 sm:mx-8 rounded-2xl">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#E8F1EB] font-bold text-sm">
                            <Shield className="size-5 text-[#E8F1EB]" />
                            Utamakan Keselamatan Diri & Keluarga
                        </div>
                        <p className="text-xs text-[#E8F1EB]/90 max-w-2xl leading-relaxed">
                            Jangan pernah mendekati lidah api aktif atau memasuki area lahan gambut berasap tebal hanya demi mengambil foto atau video bukti. Keselamatan jiwa jauh lebih penting.
                        </p>
                    </div>
                    <Link
                        href="/panduan-keselamatan"
                        className="px-5 py-2.5 rounded-lg bg-white text-[#174B35] font-semibold text-xs shrink-0 hover:bg-[#F3F7F4] transition-colors"
                    >
                        Baca Panduan Keselamatan Lengkap
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
