import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Camera,
    CheckCircle2,
    Clock,
    FileText,
    HelpCircle,
    Info,
    Map,
    MapPin,
    PlusCircle,
    Shield,
    ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    StatusBadge,
    FireConditionBadge,
} from '@/components/reports/status-badge';
import {
    Banner,
    BannerIcon,
    BannerTitle,
    BannerAction,
    BannerClose,
} from '@/components/kibo-ui/banner';
import { Pill, PillIndicator } from '@/components/kibo-ui/pill';
import {
    DialogStack,
    DialogStackTrigger,
    DialogStackOverlay,
    DialogStackBody,
    DialogStackContent,
    DialogStackHeader,
    DialogStackTitle,
    DialogStackDescription,
    DialogStackFooter,
    DialogStackNext,
    DialogStackPrevious,
} from '@/components/kibo-ui/dialog-stack';
import type { DashboardMetrics, ReportItem } from '@/types';

interface Props {
    metrics?: DashboardMetrics;
    recentReports?: ReportItem[];
}

const defaultMetrics: DashboardMetrics = {
    total: 0,
    submitted: 0,
    in_review: 0,
    needs_info: 0,
    verified: 0,
    dispatched: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
};

const CATEGORY_LABELS: Record<string, string> = {
    hutan: 'Kebakaran Hutan',
    gambut: 'Lahan Gambut',
    perkebunan: 'Pertanian / Perkebunan',
    pemukiman: 'Dekat Pemukiman',
    lainnya: 'Lainnya',
};

export default function Dashboard({
    metrics = defaultMetrics,
    recentReports = [],
}: Props) {
    const page = usePage();
    const flash = (page.props as any).flash;
    const [guideOpen, setGuideOpen] = useState(false);

    const formatDate = (isoString?: string | null) => {
        if (!isoString) return '-';
        try {
            const date = new Date(isoString);
            return (
                new Intl.DateTimeFormat('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(date) + ' WIB'
            );
        } catch {
            return isoString;
        }
    };

    return (
        <>
            <Head title="Dashboard Masyarakat - JAGAIN" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Flash Success & Error Notification */}
                {flash?.success && (
                    <div
                        role="status"
                        className="flex items-center gap-3 rounded-xl border border-leaf-green/30 bg-soft-green/70 p-4 text-sm text-forest-green shadow-xs transition-all duration-200"
                    >
                        <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div
                        role="alert"
                        className="flex items-center gap-3 rounded-xl border border-border-neutral bg-white p-4 text-sm text-dark-neutral shadow-xs transition-all duration-200 dark:border-border-neutral dark:bg-card"
                    >
                        <AlertCircle className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Top Actionable Priority Alert (Kibo UI Banner) */}
                {metrics.needs_info > 0 && (
                    <Banner
                        inset
                        className="border-leaf-green/40 bg-soft-green/90 p-4 text-dark-neutral shadow-xs transition-all duration-200 hover:border-leaf-green/60 dark:border-leaf-green/50 dark:bg-card sm:p-5"
                    >
                        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="flex items-start gap-3.5">
                                <BannerIcon
                                    icon={AlertCircle}
                                    className="size-9 border-leaf-green/30 bg-white text-primary-green shadow-xs dark:border-leaf-green/50 dark:bg-[#1a231d]"
                                />
                                <div className="space-y-0.5">
                                    <BannerTitle className="text-sm font-semibold text-forest-green">
                                        Tindakan Diperlukan:{' '}
                                        {metrics.needs_info} Laporan Membutuhkan
                                        Klarifikasi
                                    </BannerTitle>
                                    <p className="text-xs leading-relaxed text-dark-neutral/85">
                                        Tim verifikator memerlukan konfirmasi
                                        titik lokasi atau foto tambahan untuk
                                        memproses laporan Anda. Respons cepat
                                        membantu percepatan koordinasi
                                        penanganan.
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                                <BannerAction asChild>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="shrink-0 bg-primary-green text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98]"
                                    >
                                        <Link
                                            href="/reports?status=NEEDS_INFORMATION"
                                            className="flex items-center gap-1.5"
                                        >
                                            <span>Tanggapi Laporan</span>
                                            <ArrowRight className="size-3.5" />
                                        </Link>
                                    </Button>
                                </BannerAction>
                                <BannerClose />
                            </div>
                        </div>
                    </Banner>
                )}

                {/* Hero Header with Karhutla Background & Transparent Forest Green Overlay */}
                <header className="relative overflow-hidden rounded-2xl border border-forest-green/20 p-5 shadow-xs sm:p-6 lg:p-7">
                    {/* Background Wildfire Photo */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/images/karhutla-hero.png')",
                        }}
                        aria-hidden="true"
                    />

                    {/* Dark Green Gradient Overlay: darker on text side, translucent on fire side */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#174B35]/90 via-[#174B35]/80 to-[#216B49]/60 sm:bg-gradient-to-r sm:from-[#174B35]/92 sm:via-[#174B35]/78 sm:to-[#216B49]/60"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl space-y-2">
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Dasbor Pelaporan & Pengawasan Karhutla
                            </h1>
                            <p className="text-sm leading-relaxed text-white/90 sm:text-base sm:leading-relaxed">
                                Pantau perkembangan laporan kebakaran hutan dan
                                lahan yang Anda sampaikan, lengkapi data jika
                                diperlukan, dan kawal transparansi penanganan
                                oleh instansi berwenang.
                            </p>
                        </div>

                        {/* Quick CTA Actions & Interactive Guide */}
                        <div className="flex shrink-0 flex-wrap items-center gap-2.5 pt-1 lg:pt-0">
                            <Button
                                asChild
                                className="h-auto border border-white/40 bg-white px-4 py-2.5 text-xs font-semibold text-forest-green shadow-xs transition-all duration-150 hover:bg-pale-green hover:text-forest-green hover:shadow-sm active:scale-[0.98] sm:text-sm"
                            >
                                <Link
                                    href="/reports/create"
                                    className="flex items-center gap-2"
                                >
                                    <PlusCircle className="size-4 shrink-0 text-primary-green" />
                                    <span>Buat Laporan Baru</span>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="h-auto border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-xs transition-colors duration-150 hover:bg-white/20 hover:text-white sm:text-sm"
                            >
                                <Link
                                    href="/reports"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="size-4 shrink-0 text-white/90" />
                                    <span>Riwayat Laporan Saya</span>
                                </Link>
                            </Button>

                            {/* Kibo UI DialogStack: Interactive Modal Guide */}
                            <DialogStack
                                open={guideOpen}
                                onOpenChange={setGuideOpen}
                                clickable
                            >
                                <DialogStackTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="h-auto border border-white/30 bg-white/10 px-3.5 py-2.5 text-xs font-medium text-white backdrop-blur-xs transition-colors duration-150 hover:bg-white/20 hover:text-white sm:text-sm"
                                    >
                                        <HelpCircle className="size-4 shrink-0 text-emerald-200" />
                                        <span>Alur & Panduan</span>
                                    </Button>
                                </DialogStackTrigger>
                                <DialogStackOverlay />
                                <DialogStackBody>
                                    {/* Card 1: Workflow Stages */}
                                    <DialogStackContent>
                                        <DialogStackHeader>
                                            <div className="flex items-center gap-2">
                                                <span className="flex size-6 items-center justify-center rounded-full bg-soft-green font-mono text-xs font-bold text-forest-green">
                                                    1
                                                </span>
                                                <DialogStackTitle>
                                                    Alur Penanganan Laporan
                                                </DialogStackTitle>
                                            </div>
                                            <DialogStackDescription>
                                                Tahapan transparansi proses
                                                laporan karhutla dari awal
                                                hingga selesai
                                            </DialogStackDescription>
                                        </DialogStackHeader>
                                        <div className="my-4 space-y-2.5 text-xs leading-relaxed text-dark-neutral">
                                            <div className="flex items-start gap-2.5 rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 dark:border-border-neutral dark:bg-[#18221b]/80">
                                                <Clock className="mt-0.5 size-4 shrink-0 text-primary-green" />
                                                <div>
                                                    <strong className="font-semibold text-forest-green">
                                                        1. Telaah & Verifikasi
                                                        Awal
                                                    </strong>
                                                    <p className="text-gray-neutral">
                                                        Laporan masuk
                                                        diverifikasi kesesuaian
                                                        koordinat GPS dan bukti
                                                        foto oleh petugas.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 dark:border-border-neutral dark:bg-[#18221b]/80">
                                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-green" />
                                                <div>
                                                    <strong className="font-semibold text-forest-green">
                                                        2. Koordinasi Satuan OPD
                                                    </strong>
                                                    <p className="text-gray-neutral">
                                                        Data valid
                                                        didisposisikan ke BPBD,
                                                        Manggala Agni, atau
                                                        Damkar setempat.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 dark:border-border-neutral dark:bg-[#18221b]/80">
                                                <Shield className="mt-0.5 size-4 shrink-0 text-primary-green" />
                                                <div>
                                                    <strong className="font-semibold text-forest-green">
                                                        3. Penanganan Lapangan
                                                    </strong>
                                                    <p className="text-gray-neutral">
                                                        Petugas lapangan
                                                        bergerak dan memperbarui
                                                        catatan tindak lanjut
                                                        secara terbuka.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogStackFooter>
                                            <span className="text-[11px] text-gray-neutral">
                                                Langkah 1 dari 3
                                            </span>
                                            <DialogStackNext>
                                                Lanjut: Keselamatan
                                            </DialogStackNext>
                                        </DialogStackFooter>
                                    </DialogStackContent>

                                    {/* Card 2: Safety Protocols */}
                                    <DialogStackContent>
                                        <DialogStackHeader>
                                            <div className="flex items-center gap-2">
                                                <span className="flex size-6 items-center justify-center rounded-full bg-soft-green font-mono text-xs font-bold text-forest-green">
                                                    2
                                                </span>
                                                <DialogStackTitle>
                                                    Protokol Keselamatan Pelapor
                                                </DialogStackTitle>
                                            </div>
                                            <DialogStackDescription>
                                                Prioritaskan keselamatan fisik
                                                Anda saat mendokumentasikan
                                                kejadian
                                            </DialogStackDescription>
                                        </DialogStackHeader>
                                        <div className="my-4 space-y-2.5 text-xs leading-relaxed text-dark-neutral">
                                            <div className="flex items-start gap-2.5 rounded-lg border border-border-neutral bg-soft-green/60 p-2.5 dark:border-border-neutral dark:bg-[#15241b]/90">
                                                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary-green" />
                                                <div>
                                                    <strong className="font-semibold text-forest-green">
                                                        Jangan Terobos Asap
                                                        Tebal
                                                    </strong>
                                                    <p className="text-dark-neutral/90">
                                                        Asap kebakaran gambut
                                                        mengandung gas beracun.
                                                        Ambil dokumentasi dari
                                                        jarak aman dengan arah
                                                        angin membelakangi Anda.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 dark:border-border-neutral dark:bg-[#18221b]/80">
                                                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-green" />
                                                <div>
                                                    <strong className="font-semibold text-forest-green">
                                                        Gunakan Patokan Nyata
                                                    </strong>
                                                    <p className="text-gray-neutral">
                                                        Sebutkan nama parit
                                                        sekunder, kilometer
                                                        jalan poros, atau batas
                                                        desa untuk mempercepat
                                                        penemuan lokasi oleh
                                                        satgas.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogStackFooter>
                                            <DialogStackPrevious>
                                                Kembali
                                            </DialogStackPrevious>
                                            <DialogStackNext>
                                                Lanjut: Hak Pelapor
                                            </DialogStackNext>
                                        </DialogStackFooter>
                                    </DialogStackContent>

                                    {/* Card 3: Civic Transparency */}
                                    <DialogStackContent>
                                        <DialogStackHeader>
                                            <div className="flex items-center gap-2">
                                                <span className="flex size-6 items-center justify-center rounded-full bg-soft-green font-mono text-xs font-bold text-forest-green">
                                                    3
                                                </span>
                                                <DialogStackTitle>
                                                    Hak Pelapor & Kerahasiaan
                                                </DialogStackTitle>
                                            </div>
                                            <DialogStackDescription>
                                                Jaminan integritas data dan
                                                perlindungan informasi
                                                masyarakat pelapor
                                            </DialogStackDescription>
                                        </DialogStackHeader>
                                        <div className="my-4 space-y-2.5 text-xs leading-relaxed text-dark-neutral">
                                            <div className="flex items-start gap-2.5 rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 dark:border-border-neutral dark:bg-[#18221b]/80">
                                                <Shield className="mt-0.5 size-4 shrink-0 text-primary-green" />
                                                <div>
                                                    <strong className="font-semibold text-forest-green">
                                                        Perlindungan Privasi
                                                    </strong>
                                                    <p className="text-gray-neutral">
                                                        Identitas pelapor
                                                        dilindungi dan tidak
                                                        ditampilkan kepada
                                                        publik umum tanpa izin.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 dark:border-border-neutral dark:bg-[#18221b]/80">
                                                <FileText className="mt-0.5 size-4 shrink-0 text-primary-green" />
                                                <div>
                                                    <strong className="font-semibold text-forest-green">
                                                        Akses Catatan
                                                        Verifikator
                                                    </strong>
                                                    <p className="text-gray-neutral">
                                                        Setiap catatan
                                                        verifikasi, disposisi
                                                        dinas terkait, hingga
                                                        bukti tindak lanjut
                                                        dapat dipantau di
                                                        halaman detail laporan
                                                        Anda.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogStackFooter>
                                            <DialogStackPrevious>
                                                Kembali
                                            </DialogStackPrevious>
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() =>
                                                    setGuideOpen(false)
                                                }
                                                className="bg-primary-green text-xs font-semibold text-white hover:bg-forest-green"
                                            >
                                                Mengerti & Selesai
                                            </Button>
                                        </DialogStackFooter>
                                    </DialogStackContent>
                                </DialogStackBody>
                            </DialogStack>
                        </div>
                    </div>
                </header>

                {/* Metrics Summary Grid */}
                <section aria-labelledby="metrics-summary-heading">
                    <h2 id="metrics-summary-heading" className="sr-only">
                        Ringkasan Statistik Laporan Saya
                    </h2>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                        {/* Metric 1: Total Reports */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-border-neutral dark:bg-card sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Total Laporan
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-pale-green text-dark-neutral transition-colors dark:bg-[#1c2620]">
                                    <FileText className="size-3.5 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {metrics.total}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    laporan
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-tight text-gray-neutral/90">
                                Seluruh laporan yang Anda sampaikan
                            </p>
                        </div>

                        {/* Metric 2: Submitted & In Review */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-border-neutral dark:bg-card sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Dalam Telaah
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-pale-green text-dark-neutral transition-colors dark:bg-[#1c2620]">
                                    <Clock className="size-3.5 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {metrics.submitted + metrics.in_review}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    berjalan
                                </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between gap-1">
                                <p className="text-xs leading-tight text-gray-neutral/90">
                                    Antrean verifikasi awal petugas
                                </p>
                                {metrics.needs_info > 0 && (
                                    <Pill className="border-leaf-green/40 bg-soft-green/90 px-2 py-0.5 text-[10px] text-forest-green dark:border-leaf-green/50 dark:bg-soft-green">
                                        <PillIndicator
                                            variant="warning"
                                            pulse
                                        />
                                        <span className="font-semibold text-forest-green">
                                            {metrics.needs_info} butuh respon
                                        </span>
                                    </Pill>
                                )}
                            </div>
                        </div>

                        {/* Metric 3: Verified & Dispatched */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-border-neutral dark:bg-card sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Terverifikasi
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-soft-green/70 text-primary-green transition-colors dark:bg-[#1c2620]">
                                    <CheckCircle2 className="size-3.5 text-primary-green" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {metrics.verified}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    tervalidasi
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-tight text-gray-neutral/90">
                                Dikoordinasikan ke instansi OPD
                            </p>
                        </div>

                        {/* Metric 4: Resolved / Closed */}
                        <div className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-border-neutral dark:bg-card sm:p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold tracking-wider text-gray-neutral uppercase">
                                    Selesai Ditangani
                                </span>
                                <div className="flex size-7 items-center justify-center rounded-md bg-pale-green text-dark-neutral transition-colors dark:bg-[#1c2620]">
                                    <Shield className="size-3.5 text-gray-neutral" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-xl font-bold tracking-tight text-forest-green tabular-nums sm:text-2xl lg:text-3xl">
                                    {metrics.resolved}
                                </span>
                                <span className="text-lg font-bold tracking-tight text-dark-neutral sm:text-xl lg:text-2xl">
                                    tuntas
                                </span>
                            </div>
                            <p className="mt-1 text-xs leading-tight text-gray-neutral/90">
                                Status administratif selesai / ditutup
                            </p>
                        </div>
                    </div>
                </section>

                {/* Fast Status Filter Chips (Quick Access Bar) */}
                <nav
                    aria-label="Filter cepat berdasarkan status"
                    className="no-scrollbar flex items-center gap-2 overflow-x-auto py-0.5 text-xs text-dark-neutral"
                >
                    <span className="mr-1 hidden shrink-0 font-medium text-gray-neutral sm:inline">
                        Pintasan Status:
                    </span>
                    <Link
                        href="/reports"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                    >
                        Semua ({metrics.total})
                    </Link>
                    <Link
                        href="/reports?status=SUBMITTED"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                    >
                        Terkirim ({metrics.submitted})
                    </Link>
                    <Link
                        href="/reports?status=UNDER_REVIEW"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                    >
                        Dalam Telaah ({metrics.in_review})
                    </Link>
                    <Link
                        href="/reports?status=NEEDS_INFORMATION"
                        className={`shrink-0 rounded-lg border px-3 py-1.5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden ${metrics.needs_info > 0
                                ? 'border-leaf-green/50 bg-soft-green font-semibold text-forest-green dark:border-leaf-green/60 dark:bg-soft-green'
                                : 'border-border-neutral bg-white text-dark-neutral hover:bg-pale-green dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]'
                            }`}
                    >
                        Perlu Klarifikasi ({metrics.needs_info})
                    </Link>
                    <Link
                        href="/reports?status=VERIFIED"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                    >
                        Terverifikasi ({metrics.verified})
                    </Link>
                    <Link
                        href="/reports?status=RESOLVED_VERIFIED"
                        className="shrink-0 rounded-lg border border-border-neutral bg-white px-3 py-1.5 font-medium text-dark-neutral transition-colors hover:border-gray-neutral/40 hover:bg-pale-green focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:outline-hidden dark:border-border-neutral dark:bg-card dark:hover:bg-[#1c2620]"
                    >
                        Tuntas Selesai ({metrics.resolved})
                    </Link>
                </nav>

                {/* Recent Reports Section */}
                <section
                    aria-labelledby="recent-reports-heading"
                    className="space-y-4"
                >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2
                                id="recent-reports-heading"
                                className="text-base font-bold tracking-tight text-dark-neutral sm:text-lg"
                            >
                                Laporan Terbaru Saya
                            </h2>
                            <p className="text-xs text-gray-neutral">
                                Perkembangan status verifikasi dan tindak lanjut
                                laporan terkini
                            </p>
                        </div>
                        {recentReports.length > 0 && (
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="h-8 self-start px-2.5 text-xs font-medium text-primary-green hover:bg-pale-green hover:text-forest-green sm:self-center"
                            >
                                <Link
                                    href="/reports"
                                    className="group flex items-center gap-1.5"
                                >
                                    <span>Lihat Semua ({metrics.total})</span>
                                    <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Empty State */}
                    {recentReports.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border-neutral bg-white p-8 text-center shadow-xs dark:border-border-neutral dark:bg-card sm:p-12">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border-neutral/70 bg-pale-green text-gray-neutral dark:bg-[#1c2620]">
                                <FileText className="size-6 text-gray-neutral" />
                            </div>
                            <h3 className="mt-3.5 text-base font-semibold text-dark-neutral">
                                Belum Ada Laporan yang Dikirimkan
                            </h3>
                            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-gray-neutral">
                                Jika Anda menemukan titik kebakaran hutan, lahan
                                gambut yang berasap tebal, atau semak belukar
                                yang terbakar di wilayah Anda, sampaikan laporan
                                untuk membantu percepatan pengawasan dan
                                penanganan.
                            </p>
                            <div className="mt-5">
                                <Button
                                    asChild
                                    className="h-auto bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98]"
                                >
                                    <Link
                                        href="/reports/create"
                                        className="flex items-center gap-2"
                                    >
                                        <PlusCircle className="size-4 shrink-0" />
                                        <span>Buat Laporan Pertama Anda</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentReports.map((report) => (
                                <article
                                    key={report.id}
                                    className="group rounded-xl border border-border-neutral bg-white p-4 shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-neutral/30 hover:shadow-md dark:border-border-neutral dark:bg-card dark:hover:border-leaf-green/40 dark:hover:bg-[#17201a] sm:p-5"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Report Core Details */}
                                        <div className="min-w-0 flex-1 space-y-2">
                                            {/* Meta & Badges Row */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="badge badge-light font-mono font-bold">
                                                    {report.report_number}
                                                </span>
                                                <StatusBadge
                                                    status={
                                                        report.report_status
                                                    }
                                                    variant="neutral"
                                                />
                                                <FireConditionBadge
                                                    condition={
                                                        report.fire_condition
                                                    }
                                                    variant="neutral"
                                                />

                                                {/* Category Tag */}
                                                <span className="badge badge-light">
                                                    {CATEGORY_LABELS[
                                                        report.category
                                                    ] || report.category}
                                                </span>

                                                {/* Evidence Counter */}
                                                {report.has_evidence && (
                                                    <span className="badge badge-light">
                                                        <Camera className="size-3 shrink-0 text-[#212529] dark:text-zinc-200" />
                                                        <span>
                                                            {
                                                                report.evidence_count
                                                            }{' '}
                                                            Foto
                                                        </span>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="line-clamp-1 text-base font-semibold text-dark-neutral transition-colors group-hover:text-primary-green dark:group-hover:text-leaf-green sm:line-clamp-2">
                                                <Link
                                                    href={`/reports/${report.id}`}
                                                >
                                                    {report.title}
                                                </Link>
                                            </h3>

                                            {/* Location & Time Metadata */}
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-neutral">
                                                <div className="flex min-w-0 items-center gap-1.5">
                                                    <MapPin className="size-3.5 shrink-0 text-primary-green" />
                                                    <span className="max-w-[280px] truncate font-medium text-forest-green sm:max-w-md">
                                                        {
                                                            report.location_description
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-1.5">
                                                    <Clock className="size-3.5 shrink-0 text-gray-neutral" />
                                                    <span>
                                                        Dilaporkan:{' '}
                                                        {formatDate(
                                                            report.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex shrink-0 items-center justify-end pt-1 sm:justify-start lg:justify-end lg:pt-0">
                                            <Button
                                                asChild
                                                size="sm"
                                                className="h-9 w-full bg-primary-green px-3.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-forest-green active:scale-[0.98] sm:w-auto"
                                            >
                                                <Link
                                                    href={`/reports/${report.id}`}
                                                    className="flex items-center justify-center gap-1.5 text-white"
                                                >
                                                    <span>Lacak & Detail</span>
                                                    <ArrowRight className="size-3.5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Transparency, Safety Guidelines & Civic Notice */}
                <footer className="rounded-xl border border-border-neutral bg-pale-green/60 p-5 shadow-xs dark:border-border-neutral dark:bg-card/70 sm:p-6 lg:p-7">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                        {/* Column 1: Safety Protocol */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-forest-green">
                                <ShieldAlert className="size-4 shrink-0 text-primary-green" />
                                <h3 className="text-sm font-bold tracking-tight text-dark-neutral">
                                    Panduan Keselamatan Bagi Pelapor
                                </h3>
                            </div>
                            <ul className="space-y-2 text-xs leading-relaxed text-gray-neutral">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Utamakan keselamatan jiwa:
                                        </strong>{' '}
                                        Jangan mendekati lidah api aktif atau
                                        menerobos asap pekat demi mengambil foto
                                        bukti.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Tentukan titik dari jarak aman:
                                        </strong>{' '}
                                        Manfaatkan patokan jalan, nama parit
                                        primer, atau batas desa untuk
                                        mendeskripsikan lokasi.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Sampaikan keterangan faktual:
                                        </strong>{' '}
                                        Informasikan jenis tutupan lahan
                                        (gambut, semak, kebun) dan perkiraan
                                        jarak ke pemukiman terdekat.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Platform Transparency & Boundaries */}
                        <div className="space-y-3 border-t border-border-neutral/80 pt-4 dark:border-border-neutral md:border-t-0 md:border-l md:pt-0 md:pl-6 lg:pl-8">
                            <div className="flex items-center gap-2 text-forest-green">
                                <Info className="size-4 shrink-0 text-primary-green" />
                                <h3 className="text-sm font-bold tracking-tight text-dark-neutral">
                                    Transparansi & Batasan Resmi Platform
                                </h3>
                            </div>
                            <ul className="space-y-2 text-xs leading-relaxed text-gray-neutral">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Bukan layanan darurat:
                                        </strong>{' '}
                                        JAGAIN adalah kanal transparansi
                                        pengawasan dan akuntabilitas penanganan,
                                        bukan sistem komando darurat.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Bahaya mendesak ke pemukiman:
                                        </strong>{' '}
                                        Jika kebakaran mengancam keselamatan
                                        warga secara langsung, segera hubungi
                                        dinas pemadam kebakaran atau BPBD
                                        setempat.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-green" />
                                    <span>
                                        <strong className="font-medium text-dark-neutral">
                                            Pemisahan status:
                                        </strong>{' '}
                                        Status administratif selesai penanganan
                                        tidak otomatis berarti api telah padam
                                        tanpa observasi lapangan terverifikasi.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
