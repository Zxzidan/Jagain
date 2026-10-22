import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import KarhutlaMap, { MapReport } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import LogoLoop from '@/components/react-bits/LogoLoop';
import SpecularButton from '@/components/react-bits/SpecularButton';
import MagicBento, { type MagicBentoItem } from '@/components/react-bits/MagicBento';
import CountUp from '@/components/react-bits/CountUp';
import Stepper, { Step } from '@/components/react-bits/Stepper';
import TiltedCard, { TiltedCardLayer } from '@/components/react-bits/TiltedCard';
import AnimatedList from '@/components/react-bits/AnimatedList';
import BorderGlow from '@/components/react-bits/BorderGlow';
import {
    MapPin,
    ArrowRight,
    Shield,
    AlertTriangle,
    Search,
    CheckCircle2,
    Satellite,
    FileText,
    Flame,
    ShieldCheck,
    Activity,
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
    const [lookupCode, setLookupCode] = useState('');

    const handleLookup = (e: React.FormEvent) => {
        e.preventDefault();
        if (lookupCode.trim()) {
            window.location.href = `/laporan-publik/${encodeURIComponent(lookupCode.trim().toUpperCase())}`;
        }
    };

    // Partner & Data Sources Logos for LogoLoop
    const partnerLogos = [
        {
            node: (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 font-mono text-xs font-bold text-neutral-800 tracking-wider shadow-xs transition-colors">
                    <Satellite className="size-3.5 text-emerald-600" />
                    <span>NASA FIRMS</span>
                </div>
            ),
            title: 'NASA FIRMS',
            hoverColor: '#10e57a',
        },
        {
            node: (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 font-mono text-xs font-bold text-neutral-800 tracking-wider shadow-xs transition-colors">
                    <span className="size-2 rounded-full bg-sky-500" />
                    <span>BMKG INDONESIA</span>
                </div>
            ),
            title: 'BMKG',
            hoverColor: '#10e57a',
        },
        {
            node: (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 font-mono text-xs font-bold text-neutral-800 tracking-wider shadow-xs transition-colors">
                    <span className="size-2 rounded-full bg-amber-500" />
                    <span>KLHK SIPONGI+</span>
                </div>
            ),
            title: 'KLHK SIPONGI',
            hoverColor: '#10e57a',
        },
        {
            node: (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 font-mono text-xs font-bold text-neutral-800 tracking-wider shadow-xs transition-colors">
                    <Shield className="size-3.5 text-emerald-600" />
                    <span>BNPB PUSDALOPS</span>
                </div>
            ),
            title: 'BNPB',
            hoverColor: '#10e57a',
        },
        {
            node: (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 font-mono text-xs font-bold text-neutral-800 tracking-wider shadow-xs transition-colors">
                    <span className="size-2 rounded-full bg-purple-500" />
                    <span>BRIN GEOSPASIAL</span>
                </div>
            ),
            title: 'BRIN',
            hoverColor: '#10e57a',
        },
        {
            node: (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 font-mono text-xs font-bold text-neutral-800 tracking-wider shadow-xs transition-colors">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>BPBD 5 PROVINSI</span>
                </div>
            ),
            title: 'BPBD 5 PROVINSI',
            hoverColor: '#10e57a',
        },
    ];

    // AnimatedList Data Mapping for Laporan Terkini
    const reportListItems = recentReports.map((report) => ({
        id: report.id,
        tracking_code: report.tracking_code,
        icon: <Flame className="size-4 text-emerald-600" />,
        title: report.title,
        description: (
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span className="font-mono font-bold text-neutral-700 text-[11px]">{report.tracking_code}</span>
                <span>•</span>
                <span className="truncate">{report.regency_city}, {report.province}</span>
            </span>
        ),
        meta: (
            <div className="flex items-center gap-2">
                {report.report_status === 'DISPATCHED' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{report.status_label || 'Ditugaskan ke OPD'}</span>
                    </span>
                ) : report.report_status === 'NEEDS_INFORMATION' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200/80">
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        <span>{report.status_label || 'Perlu Informasi'}</span>
                    </span>
                ) : report.report_status === 'VERIFIED' || report.report_status === 'RESOLVED_VERIFIED' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        <span>{report.status_label || 'Terverifikasi'}</span>
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/70">
                        <span className="size-1.5 rounded-full bg-neutral-400" />
                        <span>{report.status_label || 'Baru Dikirim'}</span>
                    </span>
                )}
                <span className="font-medium text-neutral-400 shrink-0 text-[10px] hidden sm:inline">
                    {report.reported_occurrence_at
                        ? new Date(report.reported_occurrence_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                          })
                        : 'Baru'}
                </span>
            </div>
        ),
    }));

    // MagicBento Grid Items: Geospatial Observation, Analytics, Governance, and Recent Reports
    const bentoItems: MagicBentoItem[] = [
        {
            id: 'geospatial-map',
            colSpan: 8,
            content: (
                <div className="flex flex-col h-full justify-between bg-white">
                    {/* Card Header */}
                    <div className="p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-neutral-100">
                        <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Observasi Geospasial</span>
                                </div>
                                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 bg-neutral-100/90 px-2.5 py-0.5 rounded-full border border-neutral-200/70">
                                    <Activity className="size-3 text-emerald-600" />
                                    <span>Live Feed 5 Provinsi</span>
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                                Sebaran Titik Api Lapangan
                            </h2>
                            <p className="text-xs text-neutral-500 leading-relaxed max-w-lg truncate sm:whitespace-normal">
                                Pantauan spasial laporan warga terverifikasi dan anomali termal satelit di daratan Kalimantan.
                            </p>
                        </div>
                        <Link
                            href="/peta"
                            className="group bg-neutral-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-2 transition-all shadow-xs active:scale-95 shrink-0 mt-0.5"
                        >
                            <span>Buka Peta Penuh</span>
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 text-[#10e57a]" />
                        </Link>
                    </div>

                    {/* Map View */}
                    <div className="flex-1 w-full relative min-h-[385px]">
                        <KarhutlaMap reports={recentReports} height="385px" className="border-0 rounded-none w-full h-full" />
                    </div>
                </div>
            ),
        },
        {
            id: 'analytics-ledger',
            colSpan: 4,
            content: (
                <div className="flex flex-col h-full justify-between p-6 sm:p-7 bg-white">
                    {/* Card Header */}
                    <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Akuntabilitas Terbuka</span>
                            </div>
                            <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
                                <ShieldCheck className="size-3.5 text-emerald-600" />
                                <span>SOP Terbuka</span>
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                            Rekap Data Real-Time
                        </h2>
                        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                            Agregat penanganan karhutla publik tanpa latensi tertutup.
                        </p>
                    </div>

                    {/* Unified 2x2 Metric Tiles with Rich Details */}
                    <div className="grid grid-cols-2 gap-3 py-3 my-auto">
                        {/* 1. Laporan */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 hover:bg-neutral-100/70 transition-all flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                                    Laporan
                                </span>
                                <div className="size-6 sm:size-7 rounded-xl bg-neutral-200/70 text-neutral-700 flex items-center justify-center">
                                    <FileText className="size-3.5" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-neutral-900 tabular-nums">
                                <CountUp to={stats.total_reports} duration={1.6} />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1.5 pt-1.5 border-t border-neutral-200/50">
                                <span>Total Masuk</span>
                                <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-200/60 px-1.5 py-0.5 rounded">Publik</span>
                            </div>
                        </div>

                        {/* 2. Validasi */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 hover:bg-emerald-50/70 transition-all flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold">
                                    Validasi
                                </span>
                                <div className="size-6 sm:size-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                    <CheckCircle2 className="size-3.5" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-emerald-700 tabular-nums">
                                <CountUp to={stats.verified_reports} duration={1.6} delay={0.1} />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-emerald-800/80 mt-1.5 pt-1.5 border-t border-emerald-200/50">
                                <span>Terverifikasi</span>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                    {stats.total_reports > 0 ? Math.round((stats.verified_reports / stats.total_reports) * 100) : 0}%
                                </span>
                            </div>
                        </div>

                        {/* 3. Disposisi */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50/40 border border-sky-200/60 hover:bg-sky-50/70 transition-all flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] uppercase tracking-wider text-sky-800 font-bold">
                                    Disposisi
                                </span>
                                <div className="size-6 sm:size-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                                    <Flame className="size-3.5" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-sky-700 tabular-nums">
                                <CountUp to={stats.active_dispatched} duration={1.6} delay={0.2} />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-sky-800/80 mt-1.5 pt-1.5 border-t border-sky-200/50">
                                <span>Regu OPD Aktif</span>
                                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded">Operasi</span>
                            </div>
                        </div>

                        {/* 4. Selesai */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-900 text-white border border-neutral-800 hover:bg-black transition-all flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                                    Selesai
                                </span>
                                <div className="size-6 sm:size-7 rounded-xl bg-neutral-800 text-[#10e57a] flex items-center justify-center">
                                    <ShieldCheck className="size-3.5" />
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                                <CountUp to={stats.resolved_reports} duration={1.6} delay={0.3} />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1.5 pt-1.5 border-t border-neutral-800">
                                <span>Tuntas Diaudit</span>
                                <span className="text-[10px] font-bold text-[#10e57a] bg-neutral-800 px-1.5 py-0.5 rounded">Tutup</span>
                            </div>
                        </div>
                    </div>

                    {/* Funnel Progress Tracker (fills empty space seamlessly) */}
                    <div className="p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/70 my-1">
                        <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-[11px] font-bold text-neutral-800 flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Status Alur Laporan
                            </span>
                            <span className="text-[10px] font-semibold text-neutral-500">
                                Total {stats.total_reports} Register
                            </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-200/70 overflow-hidden flex gap-0.5 p-0.5">
                            <div
                                style={{ width: `${stats.total_reports > 0 ? Math.max(15, (stats.resolved_reports / stats.total_reports) * 100) : 25}%` }}
                                className="bg-neutral-900 rounded-full transition-all duration-500"
                                title="Selesai Diaudit"
                            />
                            <div
                                style={{ width: `${stats.total_reports > 0 ? Math.max(15, (stats.active_dispatched / stats.total_reports) * 100) : 25}%` }}
                                className="bg-sky-500 rounded-full transition-all duration-500"
                                title="Regu Lapangan"
                            />
                            <div
                                style={{ width: `${stats.total_reports > 0 ? Math.max(20, (stats.verified_reports / stats.total_reports) * 100) : 50}%` }}
                                className="bg-emerald-500 rounded-full transition-all duration-500"
                                title="Terverifikasi"
                            />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-2 font-medium">
                            <span className="flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                Terverifikasi
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-sky-500" />
                                Disposisi OPD
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-neutral-900" />
                                Tuntas
                            </span>
                        </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs mt-auto">
                        <span className="text-neutral-400 font-medium text-[11px]">Register publik terintegrasi</span>
                        <Link
                            href="/tentang-kami"
                            className="text-xs font-bold text-neutral-900 hover:text-emerald-600 flex items-center gap-1.5 transition-colors group"
                        >
                            <span>Metodologi Audit</span>
                            <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            id: 'governance-workflow',
            colSpan: 5,
            content: (
                <div className="flex flex-col h-full justify-between p-6 sm:p-7">
                    {/* Header */}
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Tata Kelola Respon</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                            Alur Pengawalan
                        </h2>
                    </div>

                    {/* Interactive Stepper */}
                    <div className="my-auto py-2">
                        <Stepper
                            initialStep={1}
                            indicator="numbers"
                            orientation="horizontal"
                            theme="light"
                            accentColor="#10e57a"
                            frame={false}
                            backButtonText="Kembali"
                            nextButtonText="Lanjut"
                            completeButtonText="Selesai"
                            showFooter={true}
                            className="w-full"
                        >
                            <Step title="01 Lapor" description="Koordinat warga">
                                <div className="bg-neutral-50/90 rounded-2xl p-4 border border-neutral-200/70 space-y-1">
                                    <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900">
                                        1. Lapor & Catat Koordinat
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-normal">
                                        Warga mengirim bukti foto dan koordinat presisi dari zona aman. Kode lacak unik terbit seketika tanpa perantara.
                                    </p>
                                </div>
                            </Step>
                            <Step title="02 Validasi" description="Cek lapangan">
                                <div className="bg-neutral-50/90 rounded-2xl p-4 border border-neutral-200/70 space-y-1">
                                    <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900">
                                        2. Verifikasi Internal Tim JAGAIN
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-normal">
                                        Pemeriksaan konsistensi geospasial, keaslian foto visual, dan pencocokan dengan anomali termal satelit NASA.
                                    </p>
                                </div>
                            </Step>
                            <Step title="03 Disposisi" description="Regu dinas">
                                <div className="bg-neutral-50/90 rounded-2xl p-4 border border-neutral-200/70 space-y-1">
                                    <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900">
                                        3. Disposisi Instansi OPD
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-normal">
                                        Laporan resmi diteruskan ke posko BPBD, Manggala Agni KLHK, atau Damkar setempat untuk respon lapangan.
                                    </p>
                                </div>
                            </Step>
                            <Step title="04 Audit" description="Register publik">
                                <div className="bg-neutral-50/90 rounded-2xl p-4 border border-neutral-200/70 space-y-1">
                                    <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900">
                                        4. Audit Penutupan Terbuka
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-normal">
                                        Catatan kronologis dan status penanganan tersimpan permanen di basis data terbuka untuk akuntabilitas publik.
                                    </p>
                                </div>
                            </Step>
                        </Stepper>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-neutral-400 font-medium text-[11px]">SOP Transparansi Sipil</span>
                        <Link
                            href="/panduan-keselamatan"
                            className="text-xs font-bold text-neutral-900 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                        >
                            <span>Panduan Warga</span>
                            <ArrowRight className="size-3" />
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            id: 'verified-reports',
            colSpan: 7,
            content: (
                <div className="flex flex-col h-full justify-between p-6 sm:p-7">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                <span>Dokumen Terverifikasi</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                                Laporan Terkini
                            </h2>
                        </div>
                        <Link
                            href="/peta"
                            className="group text-xs font-semibold text-neutral-500 hover:text-neutral-950 inline-flex items-center gap-1 transition-colors"
                        >
                            <span>Semua Laporan ({stats.total_reports})</span>
                            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    {/* Animated Report Feed */}
                    {recentReports.length === 0 ? (
                        <div className="text-center py-12 text-xs text-neutral-400">
                            Belum ada laporan terdaftar dalam arsip publik.
                        </div>
                    ) : (
                        <div className="my-auto py-2">
                            <AnimatedList
                                items={reportListItems}
                                onItemSelect={(item) => {
                                    if (item?.tracking_code) {
                                        router.visit(`/laporan-publik/${item.tracking_code}`);
                                    }
                                }}
                                animation="pop"
                                theme="light"
                                accentColor="#10e57a"
                                radius={12}
                                gap={8}
                                width="100%"
                                maxHeight={270}
                                frame={false}
                                showGradients={true}
                                displayScrollbar={true}
                            />
                        </div>
                    )}

                    {/* Footer */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-neutral-400 font-medium text-[11px]">Pembaruan posko & satelit</span>
                        <Link
                            href="/peta"
                            className="text-xs font-bold text-neutral-900 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                        >
                            <span>Arsip Lengkap</span>
                            <ArrowRight className="size-3" />
                        </Link>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#10e57a] selection:text-black font-sans antialiased">
            <Head title="JAGAIN — Platform Transparansi Karhutla Kalimantan" />

            <Navbar />

            <main className="flex-1">
                {/* =========================================================================
                    1. LIQUID HERO SECTION (Cyber Green #10E57A + Organic Wave)
                    Massive typography, generous breathing room, crisp minimal copy
                    ========================================================================= */}
                <section className="relative bg-[#10e57a] text-black overflow-hidden liquid-wave-hero pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 shadow-[0_20px_50px_rgba(16,229,122,0.25)] z-20">
                    <div className="max-w-6xl mx-auto w-full relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                            {/* Left Column: Massive Headline & Crisp Subtitle with AnimatedContent */}
                            <div className="lg:col-span-7">
                                <AnimatedContent
                                    distance={36}
                                    direction="vertical"
                                    duration={0.8}
                                    delay={0.1}
                                    ease="power3.out"
                                    className="space-y-6 text-left"
                                >
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#10e57a] text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm">
                                        <span className="size-2 rounded-full bg-[#10e57a] animate-pulse" />
                                        <span>REGISTER PUBLIK RESMI KALIMANTAN</span>
                                    </div>

                                    <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-black tracking-[-0.04em] text-black leading-[0.92] uppercase text-balance">
                                        PANTAU KARHUTLA.{' '}
                                        <span className="block text-black/85 font-extrabold tracking-tight mt-1">
                                            KAWAL PENANGANAN.
                                        </span>
                                    </h1>

                                    <p className="text-base sm:text-lg font-medium text-black/80 max-w-lg leading-relaxed">
                                        Platform independen untuk mengawal laporan kebakaran hutan dan lahan Kalimantan. Data terbuka, koordinat presisi, dan tuntas diaudit.
                                    </p>

                                    {/* Action CTAs: SpecularButton for Lapor Karhutla */}
                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                        <SpecularButton
                                            size="md"
                                            radius={999}
                                            tint="#000000"
                                            tintOpacity={1}
                                            textColor="#ffffff"
                                            lineColor="#10e57a"
                                            baseColor="#27272a"
                                            intensity={1.4}
                                            idleIntensity={0.5}
                                            glow={1.2}
                                            followMouse
                                            onClick={() => router.visit('/lapor')}
                                            className="font-bold text-sm pl-5 pr-2 py-1.5 shadow-xl active:scale-95 transition-all"
                                        >
                                            <span className="flex items-center gap-2.5">
                                                <span>Lapor Karhutla</span>
                                                <span className="size-7 rounded-full bg-white/20 text-[#10e57a] flex items-center justify-center">
                                                    <ArrowRight className="size-3.5" />
                                                </span>
                                            </span>
                                        </SpecularButton>

                                        <Link
                                            href="/peta"
                                            className="border-2 border-black/30 hover:border-black text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95"
                                        >
                                            Buka Peta Sebaran
                                        </Link>
                                    </div>
                                </AnimatedContent>
                            </div>

                            {/* Right Column: Clean Tracker Card wrapped in TiltedCard */}
                            <div className="lg:col-span-5">
                                <AnimatedContent
                                    distance={40}
                                    direction="vertical"
                                    duration={0.8}
                                    delay={0.25}
                                    ease="power3.out"
                                >
                                    <TiltedCard
                                        containerWidth="100%"
                                        containerHeight="360px"
                                        imageWidth="100%"
                                        imageHeight="360px"
                                        rotateAmplitude={12}
                                        scaleOnHover={1.03}
                                        glare={0.4}
                                        glareColor="#ffffff"
                                        shadow={0.3}
                                        radius={32}
                                        showTooltip={false}
                                        flipOnClick={false}
                                        className="w-full"
                                    >
                                        <div className="w-full h-full rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white/80 p-6 sm:p-7 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] text-neutral-900 flex flex-col justify-between">
                                            {/* Header */}
                                            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold block">
                                                        PENGURUTAN REGISTER
                                                    </span>
                                                    <h3 className="text-lg font-black text-neutral-950 tracking-tight">
                                                        Lacak Progres Laporan
                                                    </h3>
                                                </div>

                                                <div className="bg-black text-[#10e57a] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-xs">
                                                    <span className="size-1.5 rounded-full bg-[#10e57a] animate-ping" />
                                                    <span>ONLINE</span>
                                                </div>
                                            </div>

                                            {/* Minimalist Search Form */}
                                            <form onSubmit={handleLookup} className="space-y-2 py-1">
                                                <div className="flex items-center gap-2 bg-neutral-100/90 rounded-full p-1 border border-neutral-200/80 shadow-inner">
                                                    <Search className="size-4 text-neutral-400 ml-3 shrink-0" />
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: JG-XXXXXX"
                                                        value={lookupCode}
                                                        onChange={(e) => setLookupCode(e.target.value)}
                                                        className="bg-transparent text-xs font-bold text-neutral-900 placeholder-neutral-400 focus:outline-none flex-1 px-2 py-1 uppercase"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-black text-white hover:bg-neutral-800 font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xs"
                                                    >
                                                        Cari
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Clean Stat Strip with CountUp */}
                                            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                                                <div className="bg-neutral-50/90 border border-neutral-200/60 rounded-2xl p-3">
                                                    <div className="text-xl font-black text-neutral-900 tabular-nums">
                                                        <CountUp to={stats.total_reports} duration={1.5} />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
                                                        Laporan
                                                    </div>
                                                </div>
                                                <div className="bg-neutral-50/90 border border-neutral-200/60 rounded-2xl p-3">
                                                    <div className="text-xl font-black text-emerald-600 tabular-nums">
                                                        <CountUp to={stats.verified_reports} duration={1.5} delay={0.1} />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
                                                        Valid
                                                    </div>
                                                </div>
                                                <div className="bg-neutral-50/90 border border-neutral-200/60 rounded-2xl p-3">
                                                    <div className="text-xl font-black text-sky-600 tabular-nums">
                                                        <CountUp to={stats.active_dispatched} duration={1.5} delay={0.2} />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
                                                        OPD
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltedCard>
                                </AnimatedContent>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
                    2. TRUST BADGES & LOGO LOOP (Pure White Background + Reactive Reel)
                    Spacious breathing room below wave shape
                    ========================================================================= */}
                <section className="pt-14 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
                    <AnimatedContent distance={24} duration={0.8} threshold={0.15}>
                        {/* Micro-pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            <div className="bg-neutral-50 hover:bg-white text-neutral-800 border border-neutral-200/90 px-4 py-2 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2.5 transition-all">
                                <span className="size-2 rounded-full bg-emerald-500" />
                                <span>100% Audit Terbuka</span>
                            </div>
                            <div className="bg-neutral-50 hover:bg-white text-neutral-800 border border-neutral-200/90 px-4 py-2 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2.5 transition-all">
                                <Satellite className="size-3.5 text-emerald-600" />
                                <span>NASA FIRMS & BMKG</span>
                            </div>
                            <div className="bg-neutral-50 hover:bg-white text-neutral-800 border border-neutral-200/90 px-4 py-2 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2.5 transition-all">
                                <CheckCircle2 className="size-3.5 text-emerald-600" />
                                <span>Verifikasi Berlapis</span>
                            </div>
                            <div className="bg-neutral-50 hover:bg-white text-neutral-800 border border-neutral-200/90 px-4 py-2 rounded-full text-xs font-semibold shadow-xs flex items-center gap-2.5 transition-all">
                                <Shield className="size-3.5 text-emerald-600" />
                                <span>Akuntabilitas OPD</span>
                            </div>
                        </div>

                        {/* Infinite Smooth Logo Loop */}
                        <div className="mt-12 sm:mt-14">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 font-semibold">
                                INTEGRASI SUMBER DATA & MITRA OBSERVASI
                            </div>

                            <div className="relative overflow-hidden py-1">
                                <LogoLoop
                                    logos={partnerLogos}
                                    speed={55}
                                    direction="left"
                                    logoHeight={34}
                                    gap={24}
                                    fadeOut={true}
                                    fadeOutWidth={0.15}
                                    scaleOnHover={true}
                                    ariaLabel="Mitra Observasi dan Sumber Data Jagain"
                                />
                            </div>
                        </div>
                    </AnimatedContent>
                </section>

                {/* =========================================================================
                    3. MAGIC BENTO GRID (Geospatial, Analytics, Governance, Reports)
                    Reactive glowing borders, cursor spotlight & click ripples
                    ========================================================================= */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-20">
                    <AnimatedContent distance={40} duration={0.9} threshold={0.1}>
                        <MagicBento
                            items={bentoItems}
                            columns={12}
                            rowHeight="auto"
                            gap={24}
                            radius={24}
                            theme="light"
                            glowColor="#10e57a"
                            enableBorderGlow={true}
                            enableSpotlight={true}
                            spotlightRadius={320}
                            clickEffect={true}
                            enableTilt={false}
                            enableMagnetism={false}
                            intro={false}
                        />
                    </AnimatedContent>
                </section>

                {/* =========================================================================
                    4. PEATLAND CRITICAL SAFETY NOTICE (Clean Light Amber Card)
                    ========================================================================= */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24">
                    <AnimatedContent distance={30} duration={0.8} threshold={0.15}>
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
                            className="w-full bg-gradient-to-br from-amber-500/10 via-amber-50/60 to-white border border-amber-300/70 shadow-sm"
                        >
                            <div className="p-6 sm:p-10">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                                    <div className="space-y-2.5 max-w-2xl">
                                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-amber-900 bg-amber-100/90 px-3.5 py-1 rounded-full border border-amber-300/80 font-bold">
                                            <AlertTriangle className="size-3.5 shrink-0 text-amber-700" />
                                            <span>Pemberitahuan Keselamatan Gambut</span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-black text-neutral-950 leading-tight">
                                            Jangan Dekati Area Gambut Hanya Demi Dokumentasi
                                        </h3>
                                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                                            Lahan gambut membakar di bawah tanah (kedalaman 1–3 meter). Rongga abu panas dapat runtuh seketika saat diinjak. Utamakan keselamatan jiwa.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                                        <Link
                                            href="/panduan-keselamatan"
                                            className="border border-neutral-300 hover:border-neutral-900 bg-white text-neutral-800 text-xs font-semibold px-4 py-2 rounded-full transition-colors shadow-xs"
                                        >
                                            Panduan Krisis
                                        </Link>
                                        <a
                                            href="tel:112"
                                            className="bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold px-4 py-2 rounded-full transition-all shadow-xs"
                                        >
                                            Darurat: Hubungi 112
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </BorderGlow>
                    </AnimatedContent>
                </section>
            </main>

            <Footer />
        </div>
    );
}
