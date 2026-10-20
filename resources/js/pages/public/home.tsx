import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import KarhutlaMap, { MapReport } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import {
    Shield,
    MapPin,
    Eye,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    FileText,
    Send,
    Flame,
    Building2,
    Compass,
    Sparkles,
} from 'lucide-react';

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
        <div className="min-h-screen flex flex-col bg-white text-[#171C19] selection:bg-[#E8F1EB] selection:text-[#174B35]">
            <Head title="JAGAIN — Pantau Karhutla. Kawal Penanganannya." />

            <EmergencyBanner />
            <Navbar />

            {/* Hero Section — Architectural & Editorial Civic Standard */}
            <section className="relative bg-[#174B35] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Subtle Geometric Background Grain / Mesh */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute -top-32 right-0 size-96 rounded-full bg-[#216B49]/40 blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl space-y-6">
                        {/* Eyebrow Tag */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-[0.15em] font-medium text-[#E8F1EB]">
                            <span className="size-1.5 rounded-full bg-[#E8F1EB] animate-pulse" />
                            Platform Transparansi & Akuntabilitas Karhutla
                        </div>

                        {/* Display Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
                            Pantau Karhutla. <br />
                            <span className="text-[#E8F1EB] font-medium">Kawal Penanganannya.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-[#E8F1EB]/85 leading-relaxed max-w-2xl font-normal text-pretty">
                            JAGAIN menghubungkan pelaporan masyarakat di seluruh wilayah Kalimantan dengan verifikasi berjenjang, penugasan resmi OPD (BPBD, Manggala Agni, Damkar), dan audit tindak lanjut yang dapat dipertanggungjawabkan ke publik.
                        </p>

                        {/* Dual Action CTAs */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                href="/lapor"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#174B35] font-semibold text-xs sm:text-sm hover:bg-[#F3F7F4] shadow-sm active:scale-[0.98] transition-all"
                            >
                                <FileText className="size-4 text-[#216B49]" />
                                <span>Kirim Laporan Karhutla</span>
                                <span className="size-5 rounded-full bg-[#E8F1EB] flex items-center justify-center text-[#174B35] group-hover:translate-x-0.5 transition-transform">
                                    <ArrowRight className="size-3" />
                                </span>
                            </Link>

                            <Link
                                href="/peta"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#216B49]/60 hover:bg-[#216B49] text-white border border-white/20 font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all"
                            >
                                <Eye className="size-4" />
                                <span>Buka Peta Pantau Kalimantan</span>
                            </Link>
                        </div>
                    </div>

                    {/* Double-Bezel Stats Enclosure */}
                    <div className="mt-14 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#174B35]/70 p-4 sm:p-5 rounded-xl border border-white/10">
                            <div className="space-y-1">
                                <div className="text-[11px] uppercase tracking-wider text-[#E8F1EB]/70 font-medium">
                                    Total Laporan Masuk
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                                    {stats.total_reports}
                                </div>
                                <div className="text-[10px] text-[#E8F1EB]/60">Tercatat di Kalimantan</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-[11px] uppercase tracking-wider text-[#E8F1EB]/70 font-medium">
                                    Terverifikasi Valid
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                                    {stats.verified_reports}
                                </div>
                                <div className="text-[10px] text-[#E8F1EB]/60">Pemeriksaan koordinat & bukti</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-[11px] uppercase tracking-wider text-[#E8F1EB]/70 font-medium">
                                    Penugasan Aktif OPD
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                                    {stats.active_dispatched}
                                </div>
                                <div className="text-[10px] text-[#E8F1EB]/60">Diteruskan ke regu darat</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-[11px] uppercase tracking-wider text-[#E8F1EB]/70 font-medium">
                                    Penanganan Terverifikasi
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                                    {stats.resolved_reports}
                                </div>
                                <div className="text-[10px] text-[#E8F1EB]/60">Selesai dievaluasi tuntas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Preview Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#DDE3DE] pb-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#216B49] mb-1.5">
                            <Compass className="size-3.5" />
                            <span>Observasi Geospasial Aktif</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#171C19] tracking-tight">
                            Sebaran Titik Laporan Karhutla di Kalimantan
                        </h2>
                        <p className="text-xs sm:text-sm text-[#68716B] mt-1 max-w-2xl leading-relaxed text-pretty">
                            Peta sebaran laporan masyarakat terverifikasi dan titik panas satelit. Klik titik mana saja untuk meninjau status penanganan dan kronologi audit.
                        </p>
                    </div>

                    <Link
                        href="/peta"
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#216B49] hover:text-[#174B35] shrink-0 self-start sm:self-auto py-1"
                    >
                        <span>Buka Peta Layar Penuh</span>
                        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="rounded-2xl border border-[#DDE3DE] overflow-hidden shadow-xs">
                    <KarhutlaMap reports={recentReports} height="460px" />
                </div>
            </section>

            {/* Recent Reports Stream */}
            <section className="py-16 bg-[#F3F7F4] border-y border-[#DDE3DE] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-[#216B49] mb-1">
                                Transparansi Alur Publik
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#171C19] tracking-tight">
                                Laporan Terkini & Status Penanganan
                            </h2>
                            <p className="text-xs sm:text-sm text-[#68716B] mt-1">
                                Setiap perkembangan penanganan dicatat secara terbuka tanpa menyamarkan identitas data
                            </p>
                        </div>
                        <Link
                            href="/peta"
                            className="text-xs font-semibold text-[#216B49] hover:underline shrink-0"
                        >
                            Lihat Semua ({stats.total_reports} Laporan) →
                        </Link>
                    </div>

                    {recentReports.length === 0 ? (
                        <div className="bg-white border border-[#DDE3DE] rounded-xl p-10 text-center text-[#68716B]">
                            <p className="text-sm">Belum ada laporan publik yang tercatat saat ini.</p>
                            <Link href="/lapor" className="inline-block mt-3 text-xs font-semibold text-[#216B49] underline">
                                Kirim laporan pertama Anda
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentReports.map((report) => (
                                <div
                                    key={report.id}
                                    className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs hover:border-[#216B49] hover:shadow-sm transition-all flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#F3F7F4] border border-[#DDE3DE] text-[#343B36]">
                                                {report.tracking_code}
                                            </span>
                                            <StatusBadge status={report.report_status} label={report.status_label} size="sm" />
                                        </div>

                                        <h3 className="font-semibold text-sm text-[#171C19] line-clamp-2 leading-snug">
                                            {report.title}
                                        </h3>

                                        <p className="text-xs text-[#68716B] line-clamp-2 leading-relaxed">
                                            {report.location_description}
                                        </p>

                                        <div className="space-y-1.5 text-[11px] text-[#343B36] border-t border-[#DDE3DE]/60 pt-2.5">
                                            <div className="flex items-center gap-1.5 text-[#68716B]">
                                                <MapPin className="size-3.5 text-[#216B49] shrink-0" />
                                                <span className="truncate">{report.regency_city}, {report.province}</span>
                                            </div>
                                            {report.fire_condition && (
                                                <FireConditionBadge condition={report.fire_condition} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-[#DDE3DE]/80 mt-4 flex items-center justify-between text-xs">
                                        <span className="text-[11px] text-[#68716B] font-mono">
                                            {report.reported_occurrence_at
                                                ? new Date(report.reported_occurrence_at).toLocaleDateString('id-ID', {
                                                      day: 'numeric',
                                                      month: 'short',
                                                      year: 'numeric',
                                                  })
                                                : 'Terkini'}
                                        </span>
                                        <Link
                                            href={`/laporan-publik/${report.tracking_code}`}
                                            className="font-semibold text-[#216B49] hover:text-[#174B35] inline-flex items-center gap-1"
                                        >
                                            <span>Lihat Kronologi</span>
                                            <ArrowRight className="size-3" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works — Connected Pipeline */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#216B49] mb-1.5">
                        Alur Akuntabilitas
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#171C19] tracking-tight">
                        Bagaimana JAGAIN Bekerja
                    </h2>
                    <p className="text-xs sm:text-sm text-[#68716B] mt-1.5">
                        Alur terstruktur 4 tahap untuk menjamin setiap informasi kebakaran tertangani dan terdata
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Stage 1 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs relative flex flex-col justify-between">
                        <div>
                            <div className="size-8 rounded-full bg-[#E8F1EB] text-[#174B35] font-bold flex items-center justify-center text-xs mb-3 font-mono">
                                01
                            </div>
                            <h3 className="font-bold text-sm text-[#171C19] mb-1.5">
                                Pelaporan Warga
                            </h3>
                            <p className="text-xs text-[#68716B] leading-relaxed">
                                Masyarakat mengirim titik koordinat, deskripsi lokasi, dan bukti foto tanpa membahayakan keselamatan diri.
                            </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-[#DDE3DE]/60 text-[10px] text-[#216B49] font-medium">
                            Kode Lacak Unik Diterbitkan
                        </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs relative flex flex-col justify-between">
                        <div>
                            <div className="size-8 rounded-full bg-[#E8F1EB] text-[#216B49] font-bold flex items-center justify-center text-xs mb-3 font-mono">
                                02
                            </div>
                            <h3 className="font-bold text-sm text-[#171C19] mb-1.5">
                                Verifikasi Internal
                            </h3>
                            <p className="text-xs text-[#68716B] leading-relaxed">
                                Admin memeriksa kelengkapan data, memvalidasi koordinat Kalimantan, dan mengecek anomali duplikasi laporan.
                            </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-[#DDE3DE]/60 text-[10px] text-[#216B49] font-medium">
                            Status Validasi Dicatat
                        </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs relative flex flex-col justify-between">
                        <div>
                            <div className="size-8 rounded-full bg-[#E8F1EB] text-[#39845C] font-bold flex items-center justify-center text-xs mb-3 font-mono">
                                03
                            </div>
                            <h3 className="font-bold text-sm text-[#171C19] mb-1.5">
                                Penugasan OPD
                            </h3>
                            <p className="text-xs text-[#68716B] leading-relaxed">
                                Laporan diteruskan ke instansi penanganan (BPBD, Manggala Agni, atau Damkar) sesuai wilayah kewenangan.
                            </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-[#DDE3DE]/60 text-[10px] text-[#216B49] font-medium">
                            Regu Lapangan Ditugaskan
                        </div>
                    </div>

                    {/* Stage 4 */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs relative flex flex-col justify-between">
                        <div>
                            <div className="size-8 rounded-full bg-[#E8F1EB] text-[#174B35] font-bold flex items-center justify-center text-xs mb-3 font-mono">
                                04
                            </div>
                            <h3 className="font-bold text-sm text-[#171C19] mb-1.5">
                                Audit & Verifikasi Akhir
                            </h3>
                            <p className="text-xs text-[#68716B] leading-relaxed">
                                OPD mencatat progres dan bukti penanganan. Evaluasi akhir menentukan status penyelesaian sebelum ditutup.
                            </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-[#DDE3DE]/60 text-[10px] text-[#216B49] font-medium">
                            Jejak Audit Terbuka
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Callout Banner */}
            <section className="bg-[#174B35] text-white py-12 px-4 sm:px-6 lg:px-8 mb-12 mx-4 sm:mx-8 rounded-2xl shadow-sm">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#E8F1EB] font-bold text-sm">
                            <Shield className="size-5 text-[#E8F1EB]" />
                            <span>Utamakan Keselamatan Diri & Keluarga</span>
                        </div>
                        <p className="text-xs text-[#E8F1EB]/85 max-w-2xl leading-relaxed">
                            Jangan pernah mendekati lidah api aktif atau memasuki area lahan gambut berasap tebal demi mengambil foto atau video bukti. Keselamatan jiwa selalu menjadi prioritas mutlak.
                        </p>
                    </div>
                    <Link
                        href="/panduan-keselamatan"
                        className="px-5 py-2.5 rounded-full bg-white text-[#174B35] font-semibold text-xs shrink-0 hover:bg-[#F3F7F4] active:scale-[0.98] transition-all"
                    >
                        Baca Panduan Keselamatan Lengkap
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
