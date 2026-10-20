import { Head, Link, router } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import {
    PlusCircle,
    FileText,
    MapPin,
    Calendar,
    ArrowRight,
    AlertCircle,
    Clock,
    Building,
    CheckCircle2,
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
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title="Laporan Saya — JAGAIN" />

            {/* Citizen Header Card */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F1EB] text-[#174B35] font-bold text-[11px] tracking-wide mb-1">
                            <Shield className="size-3" />
                            Portal Warga Pelapor
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] flex items-center gap-2">
                            <FileText className="size-5 text-[#216B49]" />
                            Riwayat Laporan Karhutla Saya ({reports.total})
                        </h1>
                        <p className="text-xs text-[#68716B]">
                            Pantau perjalanan verifikasi dan respon instansi atas laporan yang telah Anda kirimkan.
                        </p>
                    </div>

                    <Link
                        href="/lapor"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-[#216B49] text-white rounded-xl hover:bg-[#174B35] shadow-xs transition-all active:scale-[0.98] shrink-0"
                    >
                        <PlusCircle className="size-4" />
                        Kirim Laporan Baru
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <button
                        type="button"
                        onClick={() => handleStatusFilter('')}
                        className={`px-3.5 py-1.5 rounded-full font-medium border transition-colors ${
                            !filters.status
                                ? 'bg-[#174B35] text-white border-[#174B35]'
                                : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Semua Status ({reports.total})
                    </button>
                    <button
                        type="button"
                        onClick={() => handleStatusFilter('SUBMITTED')}
                        className={`px-3.5 py-1.5 rounded-full font-medium border transition-colors ${
                            filters.status === 'SUBMITTED'
                                ? 'bg-[#174B35] text-white border-[#174B35]'
                                : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Baru Dikirim
                    </button>
                    <button
                        type="button"
                        onClick={() => handleStatusFilter('NEEDS_INFORMATION')}
                        className={`px-3.5 py-1.5 rounded-full font-medium border transition-colors ${
                            filters.status === 'NEEDS_INFORMATION'
                                ? 'bg-[#174B35] text-white border-[#174B35]'
                                : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Perlu Dilengkapi
                    </button>
                    <button
                        type="button"
                        onClick={() => handleStatusFilter('DISPATCHED')}
                        className={`px-3.5 py-1.5 rounded-full font-medium border transition-colors ${
                            filters.status === 'DISPATCHED'
                                ? 'bg-[#174B35] text-white border-[#174B35]'
                                : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Ditugaskan ke OPD
                    </button>
                    <button
                        type="button"
                        onClick={() => handleStatusFilter('RESOLVED_VERIFIED')}
                        className={`px-3.5 py-1.5 rounded-full font-medium border transition-colors ${
                            filters.status === 'RESOLVED_VERIFIED'
                                ? 'bg-[#174B35] text-white border-[#174B35]'
                                : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Selesai Terverifikasi
                    </button>
                </div>

                {/* Reports List */}
                {reports.data.length === 0 ? (
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-12 text-center text-[#68716B] space-y-4 shadow-xs">
                        <div className="size-14 rounded-2xl bg-[#F3F7F4] text-[#68716B] flex items-center justify-center mx-auto border border-[#DDE3DE]">
                            <FileText className="size-7 text-[#216B49]" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-base font-bold text-[#171C19]">Tidak ada laporan ditemukan</h2>
                            <p className="text-xs max-w-sm mx-auto text-[#68716B]">
                                Belum ada laporan yang sesuai dengan filter yang Anda pilih. Jika Anda menemukan titik kebakaran baru di sekitar Anda, laporkan segera.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/lapor"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#216B49] text-white font-semibold text-xs hover:bg-[#174B35] transition-colors shadow-xs"
                            >
                                <PlusCircle className="size-4" />
                                Buat Laporan Baru
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reports.data.map((report) => (
                            <div
                                key={report.id}
                                className="bg-white border border-[#DDE3DE] hover:border-[#216B49] rounded-2xl p-6 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F3F7F4] text-[#171C19] border border-[#DDE3DE]">
                                            {report.tracking_code}
                                        </span>
                                        <StatusBadge status={report.report_status} size="sm" />
                                        {report.category && (
                                            <span className="text-[11px] text-[#343B36] bg-[#F3F7F4] px-2.5 py-0.5 rounded-full border border-[#DDE3DE]">
                                                {report.category.name}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-[#171C19] hover:text-[#174B35] transition-colors">
                                            <Link href={`/laporan-saya/${report.tracking_code}`}>
                                                {report.title}
                                            </Link>
                                        </h2>
                                        <p className="text-xs text-[#68716B] line-clamp-2 mt-1 leading-relaxed">
                                            {report.description}
                                        </p>
                                    </div>

                                    {/* Action Needed Callout if NEEDS_INFORMATION */}
                                    {report.report_status === 'NEEDS_INFORMATION' && (
                                        <div className="bg-[#FFFBEB] border border-[#FDE68A] p-3 rounded-xl text-xs text-[#92400E] flex items-start gap-2.5">
                                            <AlertCircle className="size-4 text-[#D97706] shrink-0 mt-0.5" />
                                            <div>
                                                <strong>Petugas Membutuhkan Informasi Tambahan:</strong> Buka detail laporan untuk memberikan klarifikasi atau patok lokasi yang diminta.
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#68716B] pt-1 border-t border-[#DDE3DE]">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="size-3.5 text-[#216B49]" />
                                            <span>{report.regency_city}, {report.province}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="size-3.5 text-[#68716B]" />
                                            <span>{new Date(report.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        {report.latest_assignment?.agency && (
                                            <div className="flex items-center gap-1 font-semibold text-[#174B35]">
                                                <Building className="size-3.5 text-[#174B35]" />
                                                <span>Ditugaskan ke: {report.latest_assignment.agency.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center">
                                    <Link
                                        href={`/laporan-saya/${report.tracking_code}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-[#F3F7F4] text-[#174B35] hover:bg-[#E8F1EB] border border-[#DDE3DE] rounded-xl transition-all w-full md:w-auto justify-center active:scale-[0.98]"
                                    >
                                        Pantau Kronologi
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {reports.last_page > 1 && (
                    <div className="p-4 border border-[#DDE3DE] bg-white rounded-xl flex items-center justify-between text-xs shadow-xs">
                        <span className="text-[#68716B]">
                            Halaman {reports.current_page} dari {reports.last_page}
                        </span>
                        <div className="flex items-center gap-1">
                            {reports.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    className={`px-3 py-1.5 rounded-lg text-xs border ${
                                        link.active
                                            ? 'bg-[#174B35] text-white border-[#174B35]'
                                            : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4] disabled:opacity-40'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
