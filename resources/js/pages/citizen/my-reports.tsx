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
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 text-[#141413] bg-[#f0eee6] min-h-screen">
            <Head title="Laporan Saya — JAGAIN" />

            {/* Header Bar */}
            <div className="border-b border-[#cccbc8] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider uppercase text-[#87867f]">
                        <Shield className="size-3.5 text-[#d97757]" />
                        <span>Portal Warga Pelapor</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif text-[#141413] flex items-center gap-2">
                        <span>Riwayat Laporan Karhutla Saya ({reports.total})</span>
                    </h1>
                    <p className="font-serif text-xs sm:text-sm text-[#87867f]">
                        Pantau perjalanan verifikasi dan respon instansi atas laporan yang telah Anda kirimkan.
                    </p>
                </div>

                <Link
                    href="/lapor"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#d97757] hover:bg-[#c6613f] text-[#faf9f5] rounded-[8px] transition-colors shrink-0"
                >
                    <PlusCircle className="size-4" />
                    <span>Kirim Laporan Baru</span>
                </Link>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                <button
                    type="button"
                    onClick={() => handleStatusFilter('')}
                    className={`px-3.5 py-1.5 rounded-[8px] font-medium border transition-colors ${
                        !filters.status
                            ? 'bg-[#141413] text-[#faf9f5] border-[#141413]'
                            : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc]'
                    }`}
                >
                    Semua Status ({reports.total})
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('SUBMITTED')}
                    className={`px-3.5 py-1.5 rounded-[8px] font-medium border transition-colors ${
                        filters.status === 'SUBMITTED'
                            ? 'bg-[#141413] text-[#faf9f5] border-[#141413]'
                            : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc]'
                    }`}
                >
                    Baru Dikirim
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('NEEDS_INFORMATION')}
                    className={`px-3.5 py-1.5 rounded-[8px] font-medium border transition-colors ${
                        filters.status === 'NEEDS_INFORMATION'
                            ? 'bg-[#141413] text-[#faf9f5] border-[#141413]'
                            : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc]'
                    }`}
                >
                    Perlu Dilengkapi
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('DISPATCHED')}
                    className={`px-3.5 py-1.5 rounded-[8px] font-medium border transition-colors ${
                        filters.status === 'DISPATCHED'
                            ? 'bg-[#141413] text-[#faf9f5] border-[#141413]'
                            : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc]'
                    }`}
                >
                    Ditugaskan ke OPD
                </button>
                <button
                    type="button"
                    onClick={() => handleStatusFilter('RESOLVED_VERIFIED')}
                    className={`px-3.5 py-1.5 rounded-[8px] font-medium border transition-colors ${
                        filters.status === 'RESOLVED_VERIFIED'
                            ? 'bg-[#141413] text-[#faf9f5] border-[#141413]'
                            : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc]'
                    }`}
                >
                    Selesai Terverifikasi
                </button>
            </div>

            {/* Reports List */}
            {reports.data.length === 0 ? (
                <div className="border border-[#cccbc8] bg-[#faf9f5] rounded-[24px] p-12 text-center text-[#87867f] space-y-3 font-serif">
                    <FileText className="size-8 text-[#87867f] mx-auto" />
                    <h2 className="text-sm font-sans font-bold text-[#141413]">Belum ada laporan dalam kategori ini</h2>
                    <p className="text-xs max-w-sm mx-auto text-[#87867f]">
                        Jika Anda melihat titik kebakaran di sekitar Anda, kirimkan laporan lengkap dengan koordinat GPS.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/lapor"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#d97757] text-[#faf9f5] font-sans font-semibold text-xs hover:bg-[#c6613f] transition-colors"
                        >
                            <PlusCircle className="size-3.5" />
                            <span>Buat Laporan Baru</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="border border-[#cccbc8] rounded-[24px] overflow-hidden bg-[#faf9f5] divide-y divide-[#cccbc8]">
                    {reports.data.map((report) => (
                        <div
                            key={report.id}
                            className="p-6 hover:bg-[#f0eee6]/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans"
                        >
                            <div className="space-y-2.5 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[3px] bg-[#f0eee6] text-[#141413] border border-[#cccbc8]">
                                        {report.tracking_code}
                                    </span>
                                    <StatusBadge status={report.report_status} size="sm" />
                                    {report.category && (
                                        <span className="text-[11px] text-[#87867f] bg-[#f0eee6] px-2 py-0.5 rounded-[3px] border border-[#cccbc8]">
                                            {report.category.name}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-[#141413] hover:text-[#d97757] transition-colors">
                                        <Link href={`/laporan-saya/${report.tracking_code}`}>
                                            {report.title}
                                        </Link>
                                    </h2>
                                    <p className="font-serif text-xs text-[#87867f] line-clamp-2 mt-0.5 leading-relaxed">
                                        {report.description}
                                    </p>
                                </div>

                                {report.report_status === 'NEEDS_INFORMATION' && (
                                    <div className="bg-[#f5e3c7] border border-[#e3dacc] p-3 rounded-[8px] text-xs text-[#141413] flex items-start gap-2 font-serif">
                                        <AlertCircle className="size-4 text-[#d97757] shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="font-sans">Petugas Membutuhkan Informasi Tambahan:</strong> Buka detail laporan untuk melengkapi klarifikasi.
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-5 text-xs text-[#87867f] pt-1">
                                    <div className="flex items-center gap-1 font-serif">
                                        <MapPin className="size-3.5 text-[#87867f]" />
                                        <span>{report.regency_city}, {report.province}</span>
                                    </div>
                                    <div className="flex items-center gap-1 font-mono text-[11px]">
                                        <Calendar className="size-3.5 text-[#87867f]" />
                                        <span>{new Date(report.created_at).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    {report.latest_assignment?.agency && (
                                        <div className="flex items-center gap-1 font-medium text-[#141413]">
                                            <Building className="size-3.5 text-[#87867f]" />
                                            <span>OPD: {report.latest_assignment.agency.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="shrink-0 flex items-center">
                                <Link
                                    href={`/laporan-saya/${report.tracking_code}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#faf9f5] hover:bg-[#e3dacc] text-[#141413] border border-[#cccbc8] rounded-[8px] transition-colors w-full md:w-auto justify-center"
                                >
                                    <span>Pantau Kronologi</span>
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {reports.last_page > 1 && (
                <div className="p-4 border border-[#cccbc8] bg-[#faf9f5] rounded-[16px] flex items-center justify-between text-xs font-sans">
                    <span className="text-[#87867f]">
                        Halaman {reports.current_page} dari {reports.last_page}
                    </span>
                    <div className="flex items-center gap-1.5">
                        {reports.links.map((link, idx) => (
                            <button
                                key={idx}
                                type="button"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                className={`px-3 py-1 rounded-[6px] text-xs border ${
                                    link.active
                                        ? 'bg-[#141413] text-[#faf9f5] border-[#141413]'
                                        : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc] disabled:opacity-40'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
