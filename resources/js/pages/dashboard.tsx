import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileText,
    MapPin,
    PlusCircle,
    Shield,
    ArrowRight,
    Camera,
    Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge, FireConditionBadge } from '@/components/reports/status-badge';
import type { DashboardMetrics, ReportItem } from '@/types';
import { dashboard } from '@/routes';

interface Props {
    metrics: DashboardMetrics;
    recentReports: ReportItem[];
}

export default function Dashboard({ metrics, recentReports = [] }: Props) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const formatDate = (isoString?: string | null) => {
        if (!isoString) return '-';
        try {
            const date = new Date(isoString);
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date) + ' WIB';
        } catch {
            return isoString;
        }
    };

    return (
        <>
            <Head title="Dashboard Masyarakat - JAGAIN" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Flash Success / Error message */}
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-lg border border-border-neutral bg-white p-4 text-sm text-dark-neutral">
                        <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="flex items-center gap-3 rounded-lg border border-border-neutral bg-white p-4 text-sm text-dark-neutral">
                        <AlertCircle className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Actionable Notice for Reports Needing Info */}
                {metrics.needs_info > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border-neutral bg-white p-4 text-dark-neutral">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="size-5 shrink-0 text-primary-green" />
                            <div>
                                <h3 className="text-sm font-semibold text-dark-neutral">
                                    Informasi Tambahan Diperlukan
                                </h3>
                                <p className="text-xs text-gray-neutral">
                                    Terdapat {metrics.needs_info} laporan Anda yang membutuhkan klarifikasi atau bukti tambahan dari tim verifikator.
                                </p>
                            </div>
                        </div>
                        <Button
                            asChild
                            size="sm"
                            className="bg-primary-green text-white hover:bg-forest-green text-xs shrink-0"
                        >
                            <Link href="/reports?status=NEEDS_INFORMATION">
                                Tanggapi Laporan
                            </Link>
                        </Button>
                    </div>
                )}

                {/* Hero / Welcome Banner */}
                <div className="relative overflow-hidden rounded-xl border border-border-neutral bg-forest-green p-6 md:p-8 text-white">
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white">
                            <Shield className="size-3.5 text-white" />
                            <span>Role Masyarakat • Kawal Penanganan Karhutla</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                            Pantau Karhutla. Kawal Penanganannya.
                        </h1>
                        <p className="text-sm text-white/85 leading-relaxed">
                            Kirim laporan kebakaran hutan dan lahan secara terstruktur di wilayah Kalimantan, pantau proses pemeriksaan administratif, dan kawal tindak lanjut penanganan instansi.
                        </p>
                        <div className="pt-2 flex flex-wrap gap-3">
                            <Button
                                asChild
                                className="bg-white text-forest-green hover:bg-neutral-100 font-semibold"
                            >
                                <Link href="/reports/create">
                                    <PlusCircle className="size-4 mr-2 text-forest-green" />
                                    Buat Laporan Baru
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-white/30 bg-transparent text-white hover:bg-white/10"
                            >
                                <Link href="/reports">
                                    <FileText className="size-4 mr-2" />
                                    Riwayat Laporan Saya
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Non-emergency advisory notice */}
                <div className="flex items-start gap-3 rounded-xl border border-border-neutral bg-white p-4 text-xs text-dark-neutral">
                    <Info className="size-4 shrink-0 text-primary-green mt-0.5" />
                    <div>
                        <span className="font-semibold text-dark-neutral">Catatan Keselamatan & Batasan Platform: </span>
                        JAGAIN bukan sistem dispatch darurat dan bukan pengganti kontak resmi pemerintah. Jika kebakaran mengancam keselamatan jiwa, tempat tinggal, atau fasilitas publik, segera hubungi dinas pemadam kebakaran atau BPBD setempat.
                    </div>
                </div>

                {/* Real Metrics Summary Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {/* Card 1: Total Reports */}
                    <div className="rounded-xl border border-border-neutral bg-white p-5">
                        <div className="flex items-center justify-between text-gray-neutral">
                            <span className="text-xs font-medium uppercase tracking-wider">Total Laporan</span>
                            <FileText className="size-4 text-gray-neutral" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-dark-neutral">{metrics.total}</span>
                            <span className="text-xs text-gray-neutral">laporan dikirim</span>
                        </div>
                        <p className="mt-1 text-[11px] text-gray-neutral">
                            Seluruh laporan yang pernah Anda buat
                        </p>
                    </div>

                    {/* Card 2: Submitted / In Review */}
                    <div className="rounded-xl border border-border-neutral bg-white p-5">
                        <div className="flex items-center justify-between text-gray-neutral">
                            <span className="text-xs font-medium uppercase tracking-wider">Sedang Diperiksa</span>
                            <Clock className="size-4 text-gray-neutral" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-dark-neutral">
                                {metrics.submitted + metrics.in_review}
                            </span>
                            <span className="text-xs text-gray-neutral">dalam proses</span>
                        </div>
                        <p className="mt-1 text-[11px] text-gray-neutral">
                            Menunggu verifikasi awal petugas
                        </p>
                    </div>

                    {/* Card 3: Verified / Dispatched */}
                    <div className="rounded-xl border border-border-neutral bg-white p-5">
                        <div className="flex items-center justify-between text-gray-neutral">
                            <span className="text-xs font-medium uppercase tracking-wider">Terverifikasi</span>
                            <CheckCircle2 className="size-4 text-primary-green" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-dark-neutral">{metrics.verified}</span>
                            <span className="text-xs text-gray-neutral">laporan valid</span>
                        </div>
                        <p className="mt-1 text-[11px] text-gray-neutral">
                            Telah diverifikasi & dikoordinasikan
                        </p>
                    </div>

                    {/* Card 4: Resolved / Closed */}
                    <div className="rounded-xl border border-border-neutral bg-white p-5">
                        <div className="flex items-center justify-between text-gray-neutral">
                            <span className="text-xs font-medium uppercase tracking-wider">Selesai / Ditutup</span>
                            <Shield className="size-4 text-gray-neutral" />
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-dark-neutral">{metrics.resolved}</span>
                            <span className="text-xs text-gray-neutral">tuntas</span>
                        </div>
                        <p className="mt-1 text-[11px] text-gray-neutral">
                            Status administratif selesai/ditutup
                        </p>
                    </div>
                </div>

                {/* Recent Reports Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-dark-neutral">
                                Laporan Terbaru Saya
                            </h2>
                            <p className="text-xs text-gray-neutral">
                                Laporan terkini dan perkembangan status pemeriksaan
                            </p>
                        </div>
                        {recentReports.length > 0 && (
                            <Button asChild variant="ghost" size="sm" className="text-xs text-primary-green hover:text-forest-green hover:bg-neutral-50 font-medium">
                                <Link href="/reports" className="flex items-center gap-1">
                                    <span>Lihat Semua ({metrics.total})</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Empty State */}
                    {recentReports.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border-neutral bg-white p-8 md:p-12 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-neutral-100 text-dark-neutral">
                                <FileText className="size-6 text-gray-neutral" />
                            </div>
                            <h3 className="mt-3 text-base font-semibold text-dark-neutral">
                                Belum Ada Laporan yang Dikirimkan
                            </h3>
                            <p className="mx-auto mt-1 max-w-md text-xs text-gray-neutral leading-relaxed">
                                Jika Anda menemukan titik kebakaran hutan, lahan gambut, atau asap pekat di sekitar wilayah Kalimantan, kirimkan laporan Anda untuk membantu pengawasan.
                            </p>
                            <div className="mt-5">
                                <Button
                                    asChild
                                    className="bg-primary-green text-white hover:bg-forest-green text-xs font-medium"
                                >
                                    <Link href="/reports/create">
                                        <PlusCircle className="size-4 mr-2" />
                                        Buat Laporan Pertama Anda
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {recentReports.map((report) => (
                                <div
                                    key={report.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border-neutral bg-white p-4 transition-colors hover:border-gray-neutral/40"
                                >
                                    <div className="space-y-2 flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-mono text-xs font-semibold text-dark-neutral">
                                                {report.report_number}
                                            </span>
                                            <StatusBadge status={report.report_status} />
                                            <FireConditionBadge condition={report.fire_condition} />
                                            {report.has_evidence && (
                                                <span className="inline-flex items-center gap-1 rounded-md border border-border-neutral bg-neutral-50 px-1.5 py-0.5 text-[10px] text-gray-neutral">
                                                    <Camera className="size-3 text-gray-neutral" />
                                                    <span>{report.evidence_count} Foto</span>
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-sm font-semibold text-dark-neutral truncate">
                                            {report.title}
                                        </h4>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-neutral">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="size-3.5 text-gray-neutral" />
                                                <span className="truncate max-w-[240px]">{report.location_description}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="size-3.5 text-gray-neutral" />
                                                <span>Dilaporkan: {formatDate(report.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shrink-0 flex items-center justify-end sm:self-center">
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                            className="border-border-neutral text-xs text-dark-neutral hover:bg-neutral-50 hover:border-gray-neutral/40"
                                        >
                                            <Link href={`/reports/${report.id}`}>
                                                Lacak & Detail
                                                <ArrowRight className="size-3.5 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Safety Guidelines Card */}
                <div className="rounded-xl border border-border-neutral bg-white p-5">
                    <h3 className="text-sm font-semibold text-dark-neutral flex items-center gap-2">
                        <Shield className="size-4 text-primary-green" />
                        Panduan Keselamatan Bagi Pelapor Masyarakat
                    </h3>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-gray-neutral leading-relaxed list-disc list-inside">
                        <li><strong className="text-dark-neutral font-medium">Utamakan keselamatan jiwa:</strong> Jangan pernah mendekati lidah api aktif atau memasuki area yang terkepung asap pekat demi mengambil foto bukti.</li>
                        <li><strong className="text-dark-neutral font-medium">Tentukan titik lokasi dengan bijak:</strong> Gunakan patokan jalan, batas desa, atau titik koordinat perkiraan dari jarak yang aman.</li>
                        <li><strong className="text-dark-neutral font-medium">Jelaskan kondisi dengan faktual:</strong> Sertakan informasi jenis lahan (gambut, perkebunan, atau dekat pemukiman) untuk membantu prioritas pemeriksaan.</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
