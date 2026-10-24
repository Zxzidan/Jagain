import { Head, Link, router } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import {
    PlusCircle,
    FileText,
    MapPin,
    Calendar,
    ArrowRight,
    AlertCircle,
    Building,
    Shield,
} from 'lucide-react';

interface ReportItem {
    id: number;
    tracking_code: string;
    title: string;
    description: string;
    province: string;
    regency_city: string;
    report_status: string;
    fire_condition: string;
    information_requested?: string | null;
    created_at: string;
    category?: { name: string } | null;
    latest_assignment?: { agency?: { name: string } } | null;
}

interface MyReportsProps {
    reports: {
        data: ReportItem[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: {
        status?: string;
    };
}

export default function MyReports({ reports, filters }: MyReportsProps) {
    const handleStatusFilter = (status: string) => {
        router.get('/laporan-saya', { status: status || undefined }, { preserveState: true });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 text-[#171C19] dark:text-[#F3F7F4] bg-[#F8FAF9] dark:bg-[#0D120F] min-h-screen font-sans">
            <Head title="Laporan Saya — JAGAIN" />

            {/* Header Bar */}
            <div className="border-b border-[#DDE3DE] dark:border-neutral-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#216B49] dark:text-[#10e57a]">
                        <Shield className="size-4" />
                        <span>Portal Warga Pelapor</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171C19] dark:text-white flex items-center gap-2">
                        <span>Riwayat Laporan Karhutla Saya ({reports.total})</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-[#68716B] dark:text-neutral-400">
                        Pantau perjalanan verifikasi dan respon instansi atas laporan yang telah Anda kirimkan.
                    </p>
                </div>

                <Link
                    href="/lapor"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#216B49] hover:bg-[#174B35] text-white rounded-xl shadow-[0_4px_16px_rgba(33,107,73,0.3)] transition-all shrink-0 active:scale-95"
                >
                    <PlusCircle className="size-4" />
                    <span>Kirim Laporan Baru</span>
                </Link>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <button
                    type="button"
                    onClick={() => handleStatusFilter('')}
                    className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        !filters.status
                            ? 'bg-[#216B49] text-white border-[#216B49] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 text-[#343B36] dark:text-neutral-300 border-[#DDE3DE] dark:border-neutral-800 hover:bg-[#E8F1EB]'
                    }`}
                >
                    Semua Status ({reports.total})
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('SUBMITTED')}
                    className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        filters.status === 'SUBMITTED'
                            ? 'bg-[#216B49] text-white border-[#216B49] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 text-[#343B36] dark:text-neutral-300 border-[#DDE3DE] dark:border-neutral-800 hover:bg-[#E8F1EB]'
                    }`}
                >
                    Baru Dikirim
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('NEEDS_INFORMATION')}
                    className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        filters.status === 'NEEDS_INFORMATION'
                            ? 'bg-[#216B49] text-white border-[#216B49] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 text-[#343B36] dark:text-neutral-300 border-[#DDE3DE] dark:border-neutral-800 hover:bg-[#E8F1EB]'
                    }`}
                >
                    Perlu Dilengkapi
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('DISPATCHED')}
                    className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        filters.status === 'DISPATCHED'
                            ? 'bg-[#216B49] text-white border-[#216B49] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 text-[#343B36] dark:text-neutral-300 border-[#DDE3DE] dark:border-neutral-800 hover:bg-[#E8F1EB]'
                    }`}
                >
                    Ditugaskan ke OPD
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('RESOLVED_VERIFIED')}
                    className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        filters.status === 'RESOLVED_VERIFIED'
                            ? 'bg-[#216B49] text-white border-[#216B49] shadow-xs'
                            : 'bg-white dark:bg-neutral-900 text-[#343B36] dark:text-neutral-300 border-[#DDE3DE] dark:border-neutral-800 hover:bg-[#E8F1EB]'
                    }`}
                >
                    Selesai Terverifikasi
                </button>
            </div>

            {/* Reports List */}
            {reports.data.length === 0 ? (
                <div className="border border-[#DDE3DE] dark:border-neutral-800 bg-white dark:bg-[#141A16] rounded-2xl p-12 text-center text-[#68716B] dark:text-neutral-400 space-y-3 shadow-xs">
                    <FileText className="size-10 text-[#68716B] dark:text-neutral-500 mx-auto" />
                    <h2 className="text-base font-bold text-[#171C19] dark:text-white">Belum ada laporan dalam kategori ini</h2>
                    <p className="text-xs max-w-sm mx-auto text-[#68716B] dark:text-neutral-400">
                        Jika Anda melihat titik kebakaran di sekitar Anda, kirimkan laporan lengkap dengan koordinat GPS.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/lapor"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#216B49] hover:bg-[#174B35] text-white font-bold text-xs transition-colors shadow-sm"
                        >
                            <PlusCircle className="size-4" />
                            <span>Buat Laporan Baru</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="border border-[#DDE3DE] dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-[#141A16] divide-y divide-[#DDE3DE] dark:divide-neutral-800 shadow-xs">
                    {reports.data.map((report) => (
                        <div
                            key={report.id}
                            className="p-6 hover:bg-[#F3F7F4]/60 dark:hover:bg-neutral-900/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                            <div className="space-y-2.5 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#E8F1EB] text-[#174B35] border border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/40">
                                        {report.tracking_code}
                                    </span>
                                    <StatusBadge status={report.report_status} size="sm" />
                                    {report.category && (
                                        <span className="text-[11px] font-medium text-[#68716B] dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                            {report.category.name}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-[#171C19] dark:text-white hover:text-[#216B49] dark:hover:text-[#10e57a] transition-colors">
                                        <Link href={`/laporan-saya/${report.tracking_code}`}>
                                            {report.title}
                                        </Link>
                                    </h2>
                                    <p className="text-xs text-[#68716B] dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                                        {report.description}
                                    </p>
                                </div>

                                {report.report_status === 'NEEDS_INFORMATION' && (
                                    <div className="bg-[#E8F1EB] border border-emerald-300 p-3 rounded-xl text-xs text-[#174B35] dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200 flex items-start gap-2">
                                        <AlertCircle className="size-4 text-[#216B49] dark:text-[#10e57a] shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="font-bold">Petugas Membutuhkan Informasi Tambahan:</strong> Buka detail laporan untuk melengkapi klarifikasi.
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-5 text-xs text-[#68716B] dark:text-neutral-400 pt-1">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-[#216B49] dark:text-[#10e57a]" />
                                        <span>{report.regency_city}, {report.province}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                                        <Calendar className="size-3.5 text-[#68716B]" />
                                        <span>{new Date(report.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    {report.latest_assignment?.agency && (
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#174B35] dark:text-emerald-300">
                                            <Building className="size-3.5" />
                                            <span>Ditugaskan: {report.latest_assignment.agency.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end shrink-0">
                                <Link
                                    href={`/laporan-saya/${report.tracking_code}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#216B49] bg-[#E8F1EB] hover:bg-[#216B49] hover:text-white dark:bg-emerald-950/60 dark:text-[#10e57a] dark:hover:bg-[#10e57a] dark:hover:text-black transition-all shadow-2xs"
                                >
                                    <span>Lacak Progres</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
