import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import StatusBadge from '@/components/status-badge';
import FireConditionBadge from '@/components/fire-condition-badge';
import { PlusCircle, FileText, MapPin, Calendar, ArrowRight, AlertCircle } from 'lucide-react';

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
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title="Laporan Saya — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#171C19] flex items-center gap-2">
                            <FileText className="size-6 text-[#216B49]" />
                            Laporan Karhutla Saya
                        </h1>
                        <p className="text-xs text-[#68716B] mt-0.5">
                            Pantau kronologi dan perkembangan tindak lanjut seluruh laporan yang Anda kirimkan ({reports.total} total)
                        </p>
                    </div>

                    <Link
                        href="/lapor"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#216B49] text-white rounded-lg hover:bg-[#174B35] shadow-xs transition-colors shrink-0"
                    >
                        <PlusCircle className="size-4" />
                        Kirim Laporan Baru
                    </Link>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
                    <button
                        type="button"
                        onClick={() => handleStatusFilter('')}
                        className={`px-3 py-1.5 rounded-full border transition-colors ${
                            !filters.status
                                ? 'bg-[#174B35] text-white border-[#174B35]'
                                : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Semua Status
                    </button>
                    <button
                        type="button"
                        onClick={() => handleStatusFilter('SUBMITTED')}
                        className={`px-3 py-1.5 rounded-full border transition-colors ${
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
                        className={`px-3 py-1.5 rounded-full border transition-colors ${
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
                        className={`px-3 py-1.5 rounded-full border transition-colors ${
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
                        className={`px-3 py-1.5 rounded-full border transition-colors ${
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
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-12 text-center text-[#68716B] space-y-3">
                        <FileText className="size-12 text-[#DDE3DE] mx-auto" />
                        <h2 className="text-base font-semibold text-[#171C19]">Belum ada laporan yang cocok</h2>
                        <p className="text-xs max-w-sm mx-auto">
                            Anda belum memiliki laporan karhutla dengan filter ini. Jika Anda melihat kebakaran hutan atau lahan di Kalimantan, segera buat laporan terstruktur.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/lapor"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#216B49] text-white font-semibold text-xs hover:bg-[#174B35] transition-colors"
                            >
                                <PlusCircle className="size-4" />
                                Buat Laporan Pertama
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reports.data.map((report) => (
                            <div
                                key={report.id}
                                className="bg-white border border-[#DDE3DE] hover:border-[#216B49] rounded-xl p-5 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-xs font-semibold text-[#68716B]">
                                            {report.tracking_code}
                                        </span>
                                        <StatusBadge status={report.report_status} size="sm" />
                                        {report.category && (
                                            <span className="text-[11px] text-[#68716B] bg-[#F3F7F4] px-2 py-0.5 rounded border border-[#DDE3DE]">
                                                {report.category.name}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-base font-bold text-[#171C19]">
                                        {report.title}
                                    </h2>

                                    <p className="text-xs text-[#68716B] line-clamp-2">
                                        {report.description}
                                    </p>

                                    {/* Action Needed Callout if NEEDS_INFORMATION */}
                                    {report.report_status === 'NEEDS_INFORMATION' && (
                                        <div className="bg-[#FFFBEB] border border-[#FDE68A] p-2.5 rounded-lg text-xs text-[#92400E] flex items-center gap-2">
                                            <AlertCircle className="size-4 text-[#D97706] shrink-0" />
                                            <span>
                                                <strong>Petugas Meminta Info:</strong> Klik detail untuk melengkapi data yang dibutuhkan.
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#68716B] pt-1">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="size-3 text-[#216B49]" />
                                            <span>{report.regency_city}, {report.province}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="size-3" />
                                            <span>{new Date(report.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        {report.latest_assignment?.agency && (
                                            <div className="text-[#174B35] font-medium">
                                                Ditugaskan ke: {report.latest_assignment.agency.name}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center">
                                    <Link
                                        href={`/laporan-saya/${report.tracking_code}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#F3F7F4] text-[#174B35] hover:bg-[#E8F1EB] border border-[#DDE3DE] rounded-lg transition-colors w-full md:w-auto justify-center"
                                    >
                                        Pantau Kronologi
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
