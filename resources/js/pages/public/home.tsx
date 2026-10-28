import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
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
import AnimatedList from '@/components/react-bits/AnimatedList';
import ShinyText from '@/components/react-bits/ShinyText';
import {
    MapPin,
    ArrowRight,
    Shield,
    AlertTriangle,
    Satellite,
    Flame,
    PhoneCall,
    Wind,
    Home as HomeIcon,
    CheckCircle2,
    XCircle,
    Activity,
    Lock,
    FileText,
    Database,
} from 'lucide-react';

const ispuLevels = [
    {
        range: '0 - 50',
        category: 'Baik',
        badgeBg: 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold',
        description: 'Tingkat mutu udara sangat baik, tidak memberikan efek negatif terhadap manusia maupun ekosistem hutan.',
        action: 'Aman untuk seluruh aktivitas luar ruangan.',
    },
    {
        range: '51 - 100',
        category: 'Sedang',
        badgeBg: 'bg-yellow-100 text-yellow-900 border border-yellow-300 font-bold',
        description: 'Mutu udara masih dapat diterima pada kesehatan manusia dan vegetasi gambut.',
        action: 'Kelompok sensitif perlu membatasi aktivitas fisik intensif luar ruang.',
    },
    {
        range: '101 - 200',
        category: 'Tidak Sehat',
        badgeBg: 'bg-orange-100 text-orange-900 border border-orange-300 font-bold',
        description: 'Mutu udara bersifat merugikan bagi manusia, hewan, dan vegetasi yang terpapar polutan kabut asap.',
        action: 'Wajib kenakan respirator partikulat N95/KN95 di luar ruangan.',
    },
    {
        range: '201 - 300',
        category: 'Sangat Tidak Sehat',
        badgeBg: 'bg-rose-100 text-rose-900 border border-rose-300 font-bold',
        description: 'Risiko gangguan pernapasan akut secara luas pada seluruh populasi.',
        action: 'Hindari aktivitas di luar ruangan. Tutup celah ventilasi dan nyalakan filter udara.',
    },
    {
        range: '> 300',
        category: 'Berbahaya',
        badgeBg: 'bg-purple-100 text-purple-900 border border-purple-300 font-bold',
        description: 'Tingkat mutu udara berbahaya dan dapat menimbulkan dampak kesehatan serius.',
        action: 'Tetap berada di ruang kedap udara atau evakuasi ke shelter bersih terdekat.',
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
    categories?: Array<{ id: number; name: string; slug: string }>;
    provinces?: string[];
}

export default function Home({
    stats,
    recentReports = [],
    reports = [],
    observations = [],
    categories = [],
    provinces = [],
}: HomeProps) {
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [showSatelliteHotspots, setShowSatelliteHotspots] = useState(true);

    const baseReports = reports.length > 0 ? reports : recentReports;
    const mapReports = selectedProvince
        ? baseReports.filter((r) => r.province === selectedProvince)
        : baseReports;

    const baseObservations = showSatelliteHotspots ? observations : [];
    const displayedObservations = selectedProvince
        ? baseObservations.filter((o) => o.province === selectedProvince)
        : baseObservations;

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
    const reportListItems = recentReports.map((report) => {
        const locationParts = [report.regency_city, report.province].filter(Boolean);
        const locationText = locationParts.join(', ');

        return {
            id: report.id,
            tracking_code: report.tracking_code,
            icon: (
                <div className="size-8.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 text-emerald-700">
                    <Flame className="size-4" />
                </div>
            ),
            title: (
                <span className="font-bold text-neutral-900 text-xs sm:text-[13px] leading-snug line-clamp-1 block">
                    {report.title}
                </span>
            ),
            description: (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                    <span className="font-mono font-semibold text-neutral-600 text-[11px]">{report.tracking_code}</span>
                    {locationText && (
                        <>
                            <span className="text-neutral-300">•</span>
                            <span className="truncate max-w-[200px] text-neutral-500 text-[11px]">{locationText}</span>
                        </>
                    )}
                </div>
            ),
            meta: (
                <div className="flex items-center gap-2.5 shrink-0 ml-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        report.report_status === 'DISPATCHED'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                            : report.report_status === 'NEEDS_INFORMATION'
                            ? 'bg-neutral-100 text-neutral-800 border-neutral-200/80'
                            : report.report_status === 'VERIFIED' || report.report_status === 'RESOLVED_VERIFIED'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-200/70'
                    }`}>
                        {report.status_label || (report.report_status === 'DISPATCHED' ? 'Ditugaskan ke OPD' : 'Baru Dikirim')}
                    </span>
                    <span className="font-medium text-neutral-400 shrink-0 text-[11px] tabular-nums whitespace-nowrap">
                        {report.reported_occurrence_at
                            ? new Date(report.reported_occurrence_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                            })
                            : 'Baru'}
                    </span>
                </div>
            ),
        };
    });

    // MagicBento Grid Items: Geospatial Observation, Analytics, Governance, and Recent Reports
    const bentoItems: MagicBentoItem[] = [
        {
            id: 'geospatial-map',
            colSpan: 12,
            content: (
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_370px] gap-6 p-4 sm:p-6 bg-white h-full">
                    {/* Left: Map column */}
                    <div className="flex flex-col min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
                            <div className="min-w-0">
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                    Sebaran Titik Api di Lapangan
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1">
                                    Pantauan titik koordinat spasial terkini di wilayah Kalimantan
                                </p>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                                {/* Province Filter Dropdown */}
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    className="h-9 px-3.5 text-xs font-semibold rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-white text-neutral-800 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#10e57a] cursor-pointer transition-all"
                                >
                                    <option value="">Semua Provinsi ({mapReports.length})</option>
                                    <option value="Kalimantan Barat">Kalbar</option>
                                    <option value="Kalimantan Tengah">Kalteng</option>
                                    <option value="Kalimantan Selatan">Kalsel</option>
                                    <option value="Kalimantan Timur">Kaltim</option>
                                    <option value="Kalimantan Utara">Kaltara</option>
                                </select>

                                {observations.length > 0 && (
                                    <button
                                        id="toggle-satellite-layer"
                                        type="button"
                                        role="switch"
                                        aria-checked={showSatelliteHotspots}
                                        onClick={() => setShowSatelliteHotspots((v) => !v)}
                                        className="group inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-800 hover:border-neutral-300 active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        <Satellite className="size-3.5 text-neutral-500" />
                                        <span>Satelit</span>
                                        <span
                                            className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${
                                                showSatelliteHotspots ? 'bg-[#10e57a]' : 'bg-neutral-200'
                                            }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                                                    showSatelliteHotspots ? 'translate-x-4' : 'translate-x-0'
                                                }`}
                                            />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="relative flex-1 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs">
                            <KarhutlaMap
                                reports={mapReports}
                                observations={displayedObservations}
                                height="470px"
                                minHeight="380px"
                                showLegend={false}
                                showSimulatedNotice={true}
                                className="rounded-none border-0 w-full"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-3.5 text-xs text-neutral-500 font-sans">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                                <span className="inline-flex items-center gap-2 text-neutral-700 font-medium">
                                    <span className="size-2.5 rounded-full bg-neutral-900 inline-block" />
                                    <span>Laporan Warga ({mapReports.length})</span>
                                </span>
                                <span className="inline-flex items-center gap-2 text-neutral-700 font-medium">
                                    <span className="size-2.5 rounded-full bg-[#10e57a] inline-block" />
                                    <span>Anomali Termal Satelit ({displayedObservations.length})</span>
                                </span>
                            </div>
                            <span className="text-neutral-400 text-[11px]">Sumber: NASA FIRMS, BMKG & Warga</span>
                        </div>
                    </div>

                    {/* Right: Clean Ledger Panel */}
                    <aside className="flex flex-col justify-between rounded-2xl bg-neutral-50/70 border border-neutral-200/80 p-5 sm:p-6 text-neutral-950">
                        <div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                    Rekap Penanganan
                                </h3>
                                <p className="mt-1 text-xs text-neutral-500 leading-relaxed font-sans">
                                    Ringkasan publik seluruh laporan yang tercatat dalam register terbuka.
                                </p>
                            </div>

                            {/* Total Reports Card */}
                            <div className="mt-5 p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                                        Total Laporan Masuk
                                    </span>
                                    <span className="text-xs font-semibold text-neutral-700 mt-0.5 block">
                                        Register Resmi Kalimantan
                                    </span>
                                </div>
                                <div className="text-3xl sm:text-4xl font-black text-neutral-950 tabular-nums">
                                    <CountUp to={stats.total_reports} duration={1.6} />
                                </div>
                            </div>

                            {/* Breakdown List */}
                            <div className="mt-5 space-y-4">
                                {[
                                    { label: 'Terverifikasi', value: stats.verified_reports, delay: 0.1, color: 'bg-[#10e57a]' },
                                    { label: 'Disposisi regu OPD', value: stats.active_dispatched, delay: 0.2, color: 'bg-emerald-600' },
                                    { label: 'Tuntas diaudit', value: stats.resolved_reports, delay: 0.3, color: 'bg-neutral-900' },
                                ].map((row) => {
                                    const pct = stats.total_reports > 0 ? Math.round((row.value / stats.total_reports) * 100) : 0;
                                    return (
                                        <div key={row.label} className="space-y-1.5">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-semibold text-neutral-700">{row.label}</span>
                                                <div className="flex items-center gap-1.5 tabular-nums">
                                                    <span className="font-bold text-neutral-950 text-sm">
                                                        <CountUp to={row.value} duration={1.6} delay={row.delay} />
                                                    </span>
                                                    <span className="text-neutral-400 text-[11px]">({pct}%)</span>
                                                </div>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-neutral-200/70 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${row.color} transition-[width] duration-700 ease-out`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Link */}
                        <div className="pt-6 mt-6 border-t border-neutral-200/70">
                            <a
                                id="audit-methodology-link"
                                href="#transparansi"
                                className="group flex items-center justify-between text-xs font-bold text-neutral-800 hover:text-black transition-colors"
                            >
                                <span>Metodologi audit & transparansi</span>
                                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1 text-neutral-600" />
                            </a>
                        </div>
                    </aside>
                </div>
            ),
        },
        {
            id: 'verified-reports',
            colSpan: 12,
            content: (
                <div className="flex flex-col h-full justify-between p-6 sm:p-8">
                    {/* Header */}
                    <div className="pb-4 border-b border-neutral-100">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
                            <span>Dokumen Terverifikasi</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                            Laporan Terkini di Lapangan
                        </h3>
                    </div>

                    {/* Animated Report Feed */}
                    {recentReports.length === 0 ? (
                        <div className="text-center py-12 text-xs text-neutral-400">
                            Belum ada laporan terdaftar dalam arsip publik.
                        </div>
                    ) : (
                        <div className="my-auto py-3">
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
                                radius={14}
                                gap={12}
                                width="100%"
                                maxHeight={340}
                                frame={false}
                                showGradients={true}
                                displayScrollbar={false}
                            />
                        </div>
                    )}

                    {/* Footer */}
                    <div className="pt-4 mt-2 border-t border-neutral-100 text-xs">
                        <span className="text-neutral-400 font-medium text-[11px]">Pembaruan otomatis dari satelit NASA FIRMS & verifikasi posko</span>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#10e57a] selection:text-black font-sans antialiased overflow-x-hidden w-full max-w-full">
            <Head title="JAGAIN — Platform Transparansi Karhutla Kalimantan" />

            <Navbar />

            <main className="flex-1">
                {/* =========================================================================
                    1. ORGANIC WAVE HERO SECTION (Cyber Green #10E57A + Forest Breeze)
                    Natural rolling terrain wave divider, generous breathing room
                    ========================================================================= */}
                <section id="beranda" className="relative bg-[#10e57a] text-black overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-8 z-20 scroll-mt-24">
                    <ForestBreezeBackdrop variant="hero" />
                    <div className="max-w-5xl mx-auto w-full relative z-10 px-4 sm:px-6">
                        <AnimatedContent
                            distance={36}
                            direction="vertical"
                            duration={0.8}
                            delay={0.1}
                            ease="power3.out"
                            className="text-center flex flex-col items-center"
                        >
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black text-white text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase shadow-md mb-4 sm:mb-6">
                                <span>REGISTER PUBLIK RESMI KALIMANTAN</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-black tracking-tight leading-[1.08] sm:leading-[1.04] uppercase text-center w-full">
                                <span className="block whitespace-nowrap">
                                    <ShinyText
                                        text="PANTAU KARHUTLA"
                                        color="#ffffff"
                                        shineColor="#86efac"
                                        speed={2.2}
                                        shineWidth={42}
                                        softness={0.7}
                                        glow={0.4}
                                        trigger="loop"
                                        className="inline-block"
                                    />
                                </span>
                                <span className="block whitespace-nowrap mt-1.5 sm:mt-2.5">
                                    <ShinyText
                                        text="KAWAL PENANGANAN"
                                        color="#ffffff"
                                        shineColor="#86efac"
                                        speed={2.2}
                                        delay={0.3}
                                        shineWidth={42}
                                        softness={0.7}
                                        glow={0.4}
                                        trigger="loop"
                                        className="inline-block"
                                    />
                                </span>
                            </h1>

                            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white/95 max-w-2xl mx-auto leading-relaxed text-balance text-center">
                                Platform independen untuk mengawal laporan kebakaran hutan dan lahan Kalimantan. Data terbuka, koordinat presisi, dan tuntas diaudit.
                            </p>

                            {/* Action CTAs: SpecularButton for Lapor Karhutla */}
                            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-6 sm:mt-8">
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

                                <a
                                    href="#peta-sebaran"
                                    className="bg-black/50 hover:bg-black/70 text-white border-2 border-white/70 hover:border-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md backdrop-blur-xs hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                                >
                                    <span>Buka Peta Sebaran</span>
                                    <ArrowRight className="size-3.5" />
                                </a>
                            </div>
                        </AnimatedContent>
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
                    3. OBSERVASI GEOSPASIAL & PETA SEBARAN (Magic Bento Grid)
                    ========================================================================= */}
                <section id="peta-sebaran" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24 scroll-mt-24">
                    <AnimatedContent distance={40} duration={0.9} threshold={0.1}>
                        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
                            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs font-bold uppercase tracking-wider">
                                <span>Observasi Geospasial & Rekapitulasi</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight leading-snug">
                                Peta Sebaran & Rekap Penanganan Karhutla
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                                Pemantauan titik api terpadu dari anomali termal satelit dan laporan warga terverifikasi se-Kalimantan.
                            </p>
                        </div>

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
                    4. PANDUAN KESELAMATAN & MITIGASI KRISIS
                    ========================================================================= */}
                <section id="panduan-keselamatan" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24 scroll-mt-24">
                    <AnimatedContent distance={30} duration={0.8} threshold={0.1}>
                        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
                            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs font-bold uppercase tracking-wider">
                                <span>Protokol Keselamatan Lapangan</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight leading-snug">
                                Panduan Keselamatan & Mitigasi Karhutla
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                                Pedoman perlindungan diri warga, standar mutu udara (ISPU), serta direktori posko tanggap darurat se-Kalimantan.
                            </p>
                        </div>

                        {/* Peatland Danger Directive Card with Indonesian Karhutla Image */}
                        <div className="mb-8 sm:mb-10 overflow-hidden rounded-3xl border border-amber-200/90 bg-white shadow-xs hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                {/* Left Column: Directive & Advisory (7 cols) */}
                                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-amber-50/60 via-amber-50/20 to-white">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                                                <Flame className="size-3.5 text-amber-700" />
                                                <span>Bahaya Lahan Gambut</span>
                                            </div>
                                            <a
                                                href="tel:112"
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-xs transition-colors shrink-0"
                                            >
                                                <PhoneCall className="size-3" />
                                                <span>Darurat: 112</span>
                                            </a>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                                                Dilarang Menginjak Lahan Gambut Berasap
                                            </h3>
                                            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                                                Bara api membakar 1–3 meter di bawah permukaan tanah (<em>smoldering</em>) dan berisiko amblas seketika saat terinjak.
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-amber-200 bg-amber-100/70 p-3.5 text-xs text-amber-950 font-medium leading-relaxed flex items-center gap-2.5">
                                            <AlertTriangle className="size-4 shrink-0 text-amber-800" />
                                            <span>
                                                <strong className="font-bold">Peringatan:</strong> Jangan mendekat untuk foto atau video. Serahkan pemadaman gambut kepada Manggala Agni dan BPBD.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-neutral-500">
                                        <span className="font-semibold text-neutral-700">Satgas Manggala Agni & BPBD</span>
                                        <span>Protokol Lapangan</span>
                                    </div>
                                </div>

                                {/* Right Column: Indonesian Karhutla Image (5 cols) */}
                                <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] lg:min-h-full overflow-hidden bg-neutral-900">
                                    <img
                                        src="/images/karhutla-gambut.jpg"
                                        alt="Petugas Manggala Agni menangani kebakaran lahan gambut di Indonesia"
                                        className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                                    <div className="absolute bottom-3.5 left-4 right-4 text-white text-xs">
                                        <p className="text-[11px] text-neutral-200 font-medium leading-snug drop-shadow-sm">
                                            Operasi pemadaman bara api bawah tanah (smoldering) di lahan gambut Kalimantan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Safety Actions & Emergency Hub (2 Columns) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* Left: 4 Direct Safety Steps + ISPU reference (7 cols) */}
                            <div className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                    <div>
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                                            Tindakan Warga
                                        </div>
                                        <h3 className="text-lg font-black text-neutral-950">
                                            Prosedur Perlindungan Diri & Keluarga
                                        </h3>
                                    </div>
                                    <span className="text-xs text-neutral-400 font-medium hidden sm:inline">4 Langkah Inti</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                                            <span className="size-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">1</span>
                                            <span>Lawan Arah Angin</span>
                                        </div>
                                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                                            Jaga jarak minimal 500m di posisi berlawanan arah angin (<em>upwind</em>) dari kobaran api.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                                            <span className="size-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">2</span>
                                            <span>Respirator N95</span>
                                        </div>
                                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                                            Gunakan masker N95 atau KN95 yang menempel rapat tanpa celah untuk partikulat PM2.5.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                                            <span className="size-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">3</span>
                                            <span>Segel Ruang Bersih</span>
                                        </div>
                                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                                            Tutup celah ventilasi rumah dengan kain lembap, amankan kelompok rentan di ruang ber-HEPA filter.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                                            <span className="size-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">4</span>
                                            <span>Evakuasi Cepat</span>
                                        </div>
                                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                                            Bila jarak pandang di bawah 50m atau bau belerang menyengat, segera ungsikan keluarga ke shelter BPBD.
                                        </p>
                                    </div>
                                </div>

                                {/* Compact ISPU Bar */}
                                <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                                    <span className="font-semibold text-neutral-700">Panduan Mutu Udara (ISPU):</span>
                                    <div className="flex flex-wrap items-center gap-1.5 font-medium">
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Baik (0-50)</span>
                                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Sedang (51-100)</span>
                                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Tidak Sehat (101-200)</span>
                                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">Berbahaya (&gt;300)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: BPBD Emergency Directory (5 cols) */}
                            <div className="lg:col-span-5 bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                    <div>
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                                            Kanal Darurat
                                        </div>
                                        <h3 className="text-lg font-black text-neutral-950">
                                            Posko Pusdalops BPBD
                                        </h3>
                                    </div>
                                    <a
                                        href="tel:112"
                                        className="font-bold text-[11px] text-black bg-[#10e57a] hover:bg-emerald-400 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 shrink-0 transition-colors"
                                    >
                                        <PhoneCall className="size-3" />
                                        <span>DARURAT: 112</span>
                                    </a>
                                </div>

                                <div className="space-y-2">
                                    {provincialContacts.map((c, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 transition-all flex items-center justify-between gap-3"
                                        >
                                            <div className="min-w-0">
                                                <div className="font-bold text-xs text-neutral-900 truncate">
                                                    {c.province}
                                                </div>
                                                <div className="text-[11px] text-neutral-500 truncate flex items-center gap-1 mt-0.5">
                                                    <MapPin className="size-3 shrink-0 text-neutral-400" />
                                                    <span className="truncate">{c.address}</span>
                                                </div>
                                            </div>
                                            <a
                                                href={`tel:${c.phone.replace(/[^0-9]/g, '')}`}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#10e57a] hover:bg-emerald-400 text-black shadow-xs transition-all active:scale-95 shrink-0"
                                            >
                                                <PhoneCall className="size-3" />
                                                <span>{c.phone}</span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </section>

                {/* =========================================================================
                    5. TRANSPARANSI, PROVENANCE & BATASAN SISTEM
                    ========================================================================= */}
                <section id="transparansi" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24 scroll-mt-24">
                    <AnimatedContent distance={30} duration={0.8} threshold={0.1}>
                        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
                            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs font-bold uppercase tracking-wider">
                                <span>Transparansi & Provenance Data</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight leading-snug">
                                Prinsip Keterbukaan & Privasi Warga
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                                Setiap laporan diaudit secara publik, identitas pelapor dienkripsi penuh, dan batas kewenangan sistem ditegaskan secara transparan.
                            </p>
                        </div>

                        {/* Live Trust Metrics Strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-xs text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl font-black text-neutral-900 tabular-nums">
                                    <CountUp to={100} duration={1.5} />%
                                </div>
                                <span className="text-[11px] font-semibold text-neutral-500 block mt-1">Audit Trail Publik</span>
                            </div>
                            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-xs text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl font-black text-emerald-800 tabular-nums">
                                    <CountUp to={5} duration={1.2} />
                                </div>
                                <span className="text-[11px] font-semibold text-emerald-700 block mt-1">Provinsi Kalimantan</span>
                            </div>
                            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-xs text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl font-black text-neutral-900 tabular-nums">
                                    <CountUp to={0} duration={0.8} />
                                </div>
                                <span className="text-[11px] font-semibold text-neutral-500 block mt-1">Kompromi Data Pribadi</span>
                            </div>
                            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 text-white border border-neutral-800 shadow-xs text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl font-black text-[#10e57a] tabular-nums">
                                    24/7
                                </div>
                                <span className="text-[11px] font-semibold text-neutral-400 block mt-1">Akses Bebas Tanpa Paywall</span>
                            </div>
                        </div>

                        {/* 3 Core Trust Pillars */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="size-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
                                        <CheckCircle2 className="size-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-950">
                                        Register Terbuka & Permanen
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                                        Seluruh koordinat dan kronologi penanganan laporan tercatat permanen di basis data publik dengan timestamp terverifikasi.
                                    </p>
                                </div>
                                <div className="text-[11px] font-semibold text-emerald-700 pt-2 border-t border-neutral-100">
                                    Anti-Manipulasi Data
                                </div>
                            </div>

                            <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="size-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
                                        <Lock className="size-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-950">
                                        Privasi Pelapor Terlindungi
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                                        Nama dan nomor kontak warga dienkripsi secara kriptografis (Zero-Knowledge). Petugas lapangan hanya menerima titik lokasi kejadian.
                                    </p>
                                </div>
                                <div className="text-[11px] font-semibold text-emerald-700 pt-2 border-t border-neutral-100">
                                    Perlindungan Warga Pelapor
                                </div>
                            </div>

                            <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="size-10 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                                        <Shield className="size-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-950">
                                        Batas Tanggung Jawab Sistem
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                                        JAGAIN adalah register pemantauan independen masyarakat sipil. Untuk keadaan darurat yang mengancam nyawa, warga wajib menghubungi 112 atau posko pemadam terdekat.
                                    </p>
                                </div>
                                <div className="text-[11px] font-semibold text-amber-700 pt-2 border-t border-neutral-100">
                                    Kanal Darurat Tetap 112
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </section>
            </main>

            <Footer />
        </div>
    );
}
