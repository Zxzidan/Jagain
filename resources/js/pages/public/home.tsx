import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ForestBreezeBackdrop from '@/components/forest-breeze-backdrop';
import KarhutlaMap, { MapReport, MapObservation } from '@/components/karhutla-map';
import StatusBadge from '@/components/status-badge';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import LogoLoop from '@/components/react-bits/LogoLoop';
import SpecularButton from '@/components/react-bits/SpecularButton';
import MagicBento, { type MagicBentoItem } from '@/components/react-bits/MagicBento';
import CountUp from '@/components/react-bits/CountUp';
import Stepper, { Step } from '@/components/react-bits/Stepper';
import GlareHover from '@/components/react-bits/GlareHover';
import TiltedCard, { TiltedCardLayer } from '@/components/react-bits/TiltedCard';
import AnimatedList from '@/components/react-bits/AnimatedList';
import BorderGlow from '@/components/react-bits/BorderGlow';
import {
    MapPin,
    ArrowRight,
    Shield,
    AlertTriangle,
    Search,
    Satellite,
    Flame,
    ShieldCheck,
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
    reports?: MapReport[];
    observations?: MapObservation[];
}

export default function Home({
    stats,
    recentReports = [],
    reports = [],
    observations = [],
}: HomeProps) {
    const [lookupCode, setLookupCode] = useState('');
    const [showSatelliteHotspots, setShowSatelliteHotspots] = useState(true);
    const displayedObservations = showSatelliteHotspots ? observations : [];
    const mapReports = reports.length > 0 ? reports : recentReports;

    const handleLookup = (e: React.FormEvent) => {
        e.preventDefault();
        if (lookupCode.trim()) {
            window.location.href = `/laporan-publik/${encodeURIComponent(lookupCode.trim().toUpperCase())}`;
        }
    };

    // Partner & Data Sources Logos for LogoLoop (pure logos without background)
    const partnerLogos = [
        {
            node: (
                <img
                    src="/images/LOGO%20INSTANSI/BRIN.png"
                    alt="BRIN Geospasial"
                    title="BRIN Geospasial (Badan Riset dan Inovasi Nasional)"
                    className="h-[84px] sm:h-[88px] w-auto max-w-none object-contain select-none"
                    loading="lazy"
                />
            ),
            title: 'BRIN Geospasial',
            hoverColor: '#10e57a',
        },
        {
            src: '/images/LOGO%20INSTANSI/BPBD.png',
            alt: 'BPBD 5 Provinsi Kalimantan',
            title: 'BPBD 5 Provinsi Kalimantan',
            hoverColor: '#10e57a',
        },
        {
            src: '/images/LOGO%20INSTANSI/nasa-firms.png',
            alt: 'NASA FIRMS',
            title: 'NASA FIRMS (Fire Information for Resource Management System)',
            hoverColor: '#10e57a',
        },
        {
            src: '/images/LOGO%20INSTANSI/BMKG.png',
            alt: 'BMKG Indonesia',
            title: 'BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)',
            hoverColor: '#10e57a',
        },
        {
            src: '/images/LOGO%20INSTANSI/sipongi.png',
            alt: 'KLHK Sipongi+',
            title: 'KLHK Sipongi+ (Sistem Informasi Pengendalian Karhutla)',
            hoverColor: '#10e57a',
        },
        {
            src: '/images/LOGO%20INSTANSI/BNPB.png',
            alt: 'BNPB Pusdalops',
            title: 'BNPB (Badan Nasional Penanggulangan Bencana)',
            hoverColor: '#10e57a',
        },
        {
            src: '/images/LOGO%20INSTANSI/perhutani.png',
            alt: 'Kementerian Kehutanan RI',
            title: 'Kementerian Kehutanan Republik Indonesia',
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
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-neutral-800 border border-emerald-200/80">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{report.status_label || 'Ditugaskan ke OPD'}</span>
                    </span>
                ) : report.report_status === 'NEEDS_INFORMATION' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-800 border border-neutral-200/80">
                        <span className="size-1.5 rounded-full bg-neutral-500" />
                        <span>{report.status_label || 'Perlu Informasi'}</span>
                    </span>
                ) : report.report_status === 'VERIFIED' || report.report_status === 'RESOLVED_VERIFIED' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-neutral-800 border border-emerald-200/80">
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
            colSpan: 12,
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-3 p-3 bg-white h-full">
                    {/* Left: Map column */}
                    <div className="flex flex-col min-w-0 px-3 pt-4 pb-1 sm:px-4">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-5">
                            <div className="min-w-0">
                                <p className="font-mono text-[11px] text-neutral-400 tracking-wide">
                                    01 / Observasi geospasial
                                </p>
                                <h2 className="mt-2 text-[28px] sm:text-[34px] leading-[1.05] font-black tracking-[-0.035em] text-neutral-950">
                                    Sebaran titik api
                                    <span className="text-neutral-400"> di lapangan.</span>
                                </h2>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                {observations.length > 0 && (
                                    <button
                                        id="toggle-satellite-layer"
                                        type="button"
                                        role="switch"
                                        aria-checked={showSatelliteHotspots}
                                        onClick={() => setShowSatelliteHotspots((v) => !v)}
                                        className="group inline-flex items-center gap-2.5 h-9 pl-3 pr-1.5 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-800 hover:border-neutral-300 active:scale-[0.98] transition-[transform,border-color] duration-200 cursor-pointer"
                                    >
                                        <Satellite className="size-3.5 text-neutral-500" />
                                        <span>Satelit</span>
                                        <span
                                            className={`relative h-6 w-10 rounded-full transition-colors duration-300 ${
                                                showSatelliteHotspots ? 'bg-[#10e57a]' : 'bg-neutral-200'
                                            }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                                    showSatelliteHotspots ? 'translate-x-4' : 'translate-x-0'
                                                }`}
                                            />
                                        </span>
                                    </button>
                                )}
                                <Link
                                    id="open-full-map"
                                    href="/peta"
                                    className="group inline-flex items-center gap-2 h-9 pl-4 pr-1.5 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-black active:scale-[0.98] transition-transform duration-200"
                                >
                                    <span>Peta penuh</span>
                                    <span className="size-6 rounded-full bg-[#10e57a] text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                                        <ArrowRight className="size-3" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="relative flex-1 rounded-[20px] overflow-hidden ring-1 ring-neutral-200/80">
                            <KarhutlaMap
                                reports={mapReports}
                                observations={displayedObservations}
                                height="500px"
                                minHeight="440px"
                                showLegend={true}
                                showSimulatedNotice={true}
                                className="rounded-none border-0 w-full"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-4 text-[12px] text-neutral-500">
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                                <span className="inline-flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-neutral-900" />
                                    <span className="font-semibold text-neutral-900 tabular-nums">{mapReports.length}</span>
                                    laporan warga
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-[#10e57a]" />
                                    <span className="font-semibold text-neutral-900 tabular-nums">{displayedObservations.length}</span>
                                    anomali termal FIRMS
                                </span>
                            </div>
                            <span className="text-neutral-400">Sumber: NASA FIRMS, BMKG, validasi publik</span>
                        </div>
                    </div>

                    {/* Right: Clean White ledger panel */}
                    <aside className="relative flex flex-col rounded-[20px] bg-white border border-neutral-200/80 text-neutral-950 p-6 sm:p-7 shadow-xs">
                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-[11px] text-neutral-400 tracking-wide">02 / Akuntabilitas</p>
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-600">
                                    <ShieldCheck className="size-3.5 text-emerald-600" />
                                    SOP terbuka
                                </span>
                            </div>
                            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] leading-tight text-neutral-950">
                                Rekap penanganan
                            </h2>
                            <p className="mt-1.5 text-[13px] text-neutral-500 leading-relaxed">
                                Agregat publik dari seluruh laporan yang tercatat di register.
                            </p>
                        </div>

                        <div className="relative mt-7 pt-6 border-t border-neutral-100">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Total laporan masuk</div>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-[64px] leading-none font-black tracking-[-0.05em] text-neutral-950 tabular-nums">
                                    <CountUp to={stats.total_reports} duration={1.6} />
                                </span>
                                <span className="text-xs font-medium text-neutral-400">register</span>
                            </div>
                        </div>

                        <ul className="relative mt-7 space-y-5">
                            {[
                                { label: 'Terverifikasi', value: stats.verified_reports, delay: 0.1 },
                                { label: 'Disposisi regu OPD', value: stats.active_dispatched, delay: 0.2 },
                                { label: 'Tuntas diaudit', value: stats.resolved_reports, delay: 0.3 },
                            ].map((row) => {
                                const pct = stats.total_reports > 0 ? Math.round((row.value / stats.total_reports) * 100) : 0;
                                return (
                                    <li key={row.label}>
                                        <div className="flex items-baseline justify-between gap-3">
                                            <span className="text-[13px] font-medium text-neutral-700">{row.label}</span>
                                            <span className="flex items-baseline gap-2">
                                                <span className="text-[11px] font-mono text-neutral-400 tabular-nums">{pct}%</span>
                                                <span className="text-xl font-bold text-neutral-950 tabular-nums">
                                                    <CountUp to={row.value} duration={1.6} delay={row.delay} />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="mt-2 h-[3px] w-full rounded-full bg-neutral-100 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-[#10e57a] transition-[width] duration-700 ease-out"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <Link
                            id="audit-methodology-link"
                            href="/tentang-kami"
                            className="relative group mt-auto pt-8 flex items-center justify-between text-[13px] font-semibold text-neutral-900 hover:text-black transition-colors"
                        >
                            <span className="border-b border-neutral-200 group-hover:border-neutral-950 transition-colors pb-0.5">
                                Metodologi audit
                            </span>
                            <ArrowRight className="size-4 text-neutral-900 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </aside>
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
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
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
                            className="text-xs font-bold text-neutral-900 hover:text-black flex items-center gap-1 transition-colors"
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
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
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
                            className="text-xs font-bold text-neutral-900 hover:text-black flex items-center gap-1 transition-colors"
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
                    1. ORGANIC WAVE HERO SECTION (Cyber Green #10E57A + Forest Breeze)
                    Natural rolling terrain wave divider, generous breathing room
                    ========================================================================= */}
                <section className="relative bg-[#10e57a] text-black overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-28 lg:pb-36 px-4 sm:px-6 lg:px-8 z-20">
                    <ForestBreezeBackdrop variant="hero" />
                    <div className="max-w-6xl mx-auto w-full relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                            {/* Left Column: Massive Headline & Crisp Subtitle with AnimatedContent */}
                            <div className="lg:col-span-7 relative">
                                <AnimatedContent
                                    distance={36}
                                    direction="vertical"
                                    duration={0.8}
                                    delay={0.1}
                                    ease="power3.out"
                                    className="space-y-6 text-left"
                                >
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm">
                                        <span className="size-2 rounded-full bg-[#10e57a] animate-pulse" />
                                        <span>REGISTER PUBLIK RESMI KALIMANTAN</span>
                                    </div>

                                    <h1 className="text-4xl sm:text-6xl lg:text-[84px] font-black tracking-[-0.03em] text-white leading-[0.94] uppercase text-balance break-words">
                                        PANTAU KARHUTLA.{' '}
                                        <span className="block text-white font-extrabold tracking-tight mt-1">
                                            KAWAL PENANGANAN.
                                        </span>
                                    </h1>

                                    <p className="text-base sm:text-lg font-semibold text-white max-w-lg leading-relaxed">
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
                                                <span className="size-7 rounded-full bg-black/60 text-white flex items-center justify-center">
                                                    <ArrowRight className="size-3.5" />
                                                </span>
                                            </span>
                                        </SpecularButton>

                                        <Link
                                            href="/peta"
                                            className="bg-black/50 hover:bg-black/70 text-white border-2 border-white/70 hover:border-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md backdrop-blur-xs hover:scale-105 active:scale-95"
                                        >
                                            Buka Peta Sebaran
                                        </Link>
                                    </div>
                                </AnimatedContent>
                            </div>

                            {/* Right Column: Clean Tracker Card wrapped in GlareHover */}
                            <div className="lg:col-span-5">
                                <AnimatedContent
                                    distance={40}
                                    direction="vertical"
                                    duration={0.8}
                                    delay={0.25}
                                    ease="power3.out"
                                >
                                    <GlareHover
                                        width="100%"
                                        height="auto"
                                        borderRadius="2rem"
                                        mode="hover"
                                        variant="streak"
                                        glareColor="#ffffff"
                                        glareOpacity={0.5}
                                        glareSize={30}
                                        softness={0.6}
                                        glareAngle={-45}
                                        blendMode="screen"
                                        rimGlint={true}
                                        transitionDuration={650}
                                        className="w-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.2)] transition-shadow duration-300"
                                    >
                                        <div className="w-full h-full rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white/80 p-6 sm:p-7 text-neutral-900 flex flex-col justify-between min-h-[355px]">
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

                                                <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-xs">
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
                                                        className="bg-transparent text-xs font-bold text-neutral-900 placeholder-neutral-400 focus:outline-none flex-1 px-2 py-1 uppercase min-w-0"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-black text-white hover:bg-neutral-800 font-bold text-xs px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
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
                                                    <div className="text-xl font-black text-neutral-900 tabular-nums">
                                                        <CountUp to={stats.verified_reports} duration={1.5} delay={0.1} />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
                                                        Valid
                                                    </div>
                                                </div>
                                                <div className="bg-neutral-50/90 border border-neutral-200/60 rounded-2xl p-3">
                                                    <div className="text-xl font-black text-neutral-900 tabular-nums">
                                                        <CountUp to={stats.active_dispatched} duration={1.5} delay={0.2} />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
                                                        OPD
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </GlareHover>
                                </AnimatedContent>
                            </div>
                        </div>
                    </div>

                    {/* Organic Rolling Terrain Wave Divider (Aliran Gelombang Asimetris Halus) */}
                    <div className="absolute inset-x-0 -bottom-1 pointer-events-none z-10 leading-none">
                        <svg
                            viewBox="0 0 1440 90"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-[45px] sm:h-[65px] lg:h-[85px] block"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="waveRidgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#01240e" stopOpacity="0.25" />
                                    <stop offset="50%" stopColor="#045624" stopOpacity="0.08" />
                                    <stop offset="100%" stopColor="#01240e" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                            {/* Subtle terrain ridge accent line */}
                            <path
                                d="M0 45 C280 24 540 78 820 48 C1100 18 1280 62 1440 38"
                                stroke="url(#waveRidgeGlow)"
                                strokeWidth="2.5"
                                fill="none"
                            />
                            {/* Seamless Organic White Wave Cutting into Cyber Green */}
                            <path
                                d="M0 90 L1440 90 L1440 38 C1280 62 1100 18 820 48 C540 78 280 24 0 45 Z"
                                fill="#ffffff"
                            />
                        </svg>
                    </div>
                </section>

                {/* =========================================================================
                    2. TRUST BADGES & LOGO LOOP (Pure White Background + Reactive Reel)
                    Spacious breathing room below wave shape
                    ========================================================================= */}
                <section className="pt-10 sm:pt-14 pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
                    <AnimatedContent distance={24} duration={0.8} threshold={0.15}>
                        {/* Infinite Smooth Logo Loop */}
                        <div>
                            <div className="text-xs sm:text-sm uppercase tracking-[0.22em] text-neutral-600 mb-8 font-bold">
                                INTEGRASI SUMBER DATA & MITRA OBSERVASI
                            </div>

                            <div className="relative overflow-hidden py-8">
                                <LogoLoop
                                    logos={partnerLogos}
                                    speed={40}
                                    direction="left"
                                    logoHeight={80}
                                    gap={76}
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
                    4. PEATLAND CRITICAL SAFETY NOTICE (Monochrome & Green Card)
                    ========================================================================= */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24">
                    <AnimatedContent distance={30} duration={0.8} threshold={0.15}>
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="38 90 60"
                            backgroundColor="#ffffff"
                            borderRadius={28}
                            glowRadius={40}
                            glowIntensity={1.2}
                            coneSpread={28}
                            animated={true}
                            colors={['#10e57a', '#059669', '#10e57a']}
                            fillOpacity={0.15}
                            className="w-full bg-white border border-neutral-200/80 shadow-sm"
                        >
                            <div className="p-6 sm:p-10">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                                    <div className="space-y-2.5 max-w-2xl">
                                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-900 bg-neutral-100 px-3.5 py-1 rounded-full border border-neutral-200/80 font-bold">
                                            <AlertTriangle className="size-3.5 shrink-0 text-neutral-800" />
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
                                            className="bg-[#10e57a] hover:bg-emerald-400 text-black text-xs font-bold px-4 py-2 rounded-full transition-all shadow-xs"
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
