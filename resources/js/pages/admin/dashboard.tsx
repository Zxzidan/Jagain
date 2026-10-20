import { Head, Link } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import {
    LayoutDashboard,
    FileText,
    Building,
    Shield,
    Clock,
    CheckCircle2,
    Send,
    AlertCircle,
    ArrowRight,
    Users,
    Activity,
    Layers,
    Search,
} from 'lucide-react';

interface AdminDashboardProps {
    statusCounts: {
        submitted: number;
        under_review: number;
        needs_information: number;
        verified: number;
        dispatched: number;
        resolution_review: number;
        resolved_verified: number;
        closed_with_reason: number;
    };
    pendingReviews: Array<{
        id: number;
        tracking_code: string;
        title: string;
        report_status: string;
        province: string;
        regency_city: string;
        created_at: string;
        category?: { name: string } | null;
    }>;
    activeAssignments: Array<{
        id: number;
        assignment_status: string;
        assigned_at: string;
        agency: { name: string; jurisdiction: string };
        report: { id: number; tracking_code: string; title: string };
    }>;
    agencyStats: Array<{
        id: number;
        name: string;
        jurisdiction: string;
        total_assignments_count: number;
        in_progress_count: number;
        completed_count: number;
    }>;
}

export default function AdminDashboard({
    statusCounts,
    pendingReviews,
    activeAssignments,
    agencyStats,
}: AdminDashboardProps) {
    const totalReports = Object.values(statusCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title="Pusat Komando Pengendali Karhutla — JAGAIN" />

            {/* Admin Header Card */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#174B35] text-white text-[10px] font-bold tracking-wider uppercase">
                            <Activity className="size-3" />
                            Pusat Komando Pengendali Karhutla Kalimantan
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19]">
                            Dashboard Administrator JAGAIN
                        </h1>
                        <p className="text-xs text-[#68716B]">
                            Pengawasan alur masuk laporan warga, penugasan OPD teknis, dan verifikasi lapangan ({totalReports} Total Laporan).
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <Link
                            href="/admin/laporan"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#216B49] text-white rounded-xl hover:bg-[#174B35] transition-all shadow-xs active:scale-[0.98]"
                        >
                            <FileText className="size-3.5" />
                            Antrean Laporan
                        </Link>
                        <Link
                            href="/admin/instansi"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-[#DDE3DE] bg-white text-[#171C19] hover:bg-[#F3F7F4] rounded-xl transition-colors shadow-xs"
                        >
                            <Building className="size-3.5 text-[#216B49]" />
                            Kelola OPD
                        </Link>
                        <Link
                            href="/admin/audit-logs"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-[#DDE3DE] bg-white text-[#171C19] hover:bg-[#F3F7F4] rounded-xl transition-colors shadow-xs"
                        >
                            <Shield className="size-3.5 text-[#39845C]" />
                            Audit Trail
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* 8-Stage Status Grid Cards */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#68716B]">
                            Status Pipeline Penanganan Karhutla (8 Tahapan Resmi)
                        </h2>
                        <span className="text-xs text-[#174B35] font-semibold">
                            Klik kartu untuk memfilter antrean
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                        <Link
                            href="/admin/laporan?status=SUBMITTED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#174B35] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Baru Masuk</div>
                            <div className="text-2xl font-bold text-[#171C19] group-hover:text-[#174B35]">
                                {statusCounts.submitted}
                            </div>
                            <span className="text-[10px] font-bold text-[#174B35] bg-[#E8F1EB] px-1.5 py-0.5 rounded">
                                SUBMITTED
                            </span>
                        </Link>

                        <Link
                            href="/admin/laporan?status=UNDER_REVIEW"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Ditinjau</div>
                            <div className="text-2xl font-bold text-[#174B35]">
                                {statusCounts.under_review}
                            </div>
                            <span className="text-[10px] font-bold text-[#216B49] bg-[#E8F1EB] px-1.5 py-0.5 rounded">
                                IN_REVIEW
                            </span>
                        </Link>

                        <Link
                            href="/admin/laporan?status=NEEDS_INFORMATION"
                            className="bg-white border border-[#DDE3DE] hover:border-[#D97706] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Perlu Info</div>
                            <div className="text-2xl font-bold text-[#D97706]">
                                {statusCounts.needs_information}
                            </div>
                            <span className="text-[10px] font-bold text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                                NEED_INFO
                            </span>
                        </Link>

                        <Link
                            href="/admin/laporan?status=VERIFIED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Terverifikasi</div>
                            <div className="text-2xl font-bold text-[#216B49]">
                                {statusCounts.verified}
                            </div>
                            <span className="text-[10px] font-bold text-white bg-[#216B49] px-1.5 py-0.5 rounded">
                                VERIFIED
                            </span>
                        </Link>

                        <Link
                            href="/admin/laporan?status=DISPATCHED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#174B35] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Ditugaskan</div>
                            <div className="text-2xl font-bold text-[#174B35]">
                                {statusCounts.dispatched}
                            </div>
                            <span className="text-[10px] font-bold text-[#174B35] bg-[#E8F1EB] px-1.5 py-0.5 rounded">
                                DISPATCHED
                            </span>
                        </Link>

                        <Link
                            href="/admin/laporan?status=RESOLUTION_REVIEW"
                            className="bg-white border border-[#DDE3DE] hover:border-[#39845C] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Review OPD</div>
                            <div className="text-2xl font-bold text-[#171C19]">
                                {statusCounts.resolution_review}
                            </div>
                            <span className="text-[10px] font-bold text-[#343B36] bg-[#F3F7F4] px-1.5 py-0.5 rounded">
                                REVIEW
                            </span>
                        </Link>

                        <Link
                            href="/admin/laporan?status=RESOLVED_VERIFIED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Selesai Valid</div>
                            <div className="text-2xl font-bold text-[#216B49]">
                                {statusCounts.resolved_verified}
                            </div>
                            <span className="text-[10px] font-bold text-[#174B35] bg-[#E8F1EB] px-1.5 py-0.5 rounded">
                                RESOLVED
                            </span>
                        </Link>

                        <Link
                            href="/admin/laporan?status=CLOSED_WITH_REASON"
                            className="bg-white border border-[#DDE3DE] hover:border-[#68716B] p-3.5 rounded-xl transition-all shadow-xs block group"
                        >
                            <div className="text-[11px] text-[#68716B] mb-1 truncate">Ditutup Berkas</div>
                            <div className="text-2xl font-bold text-[#68716B]">
                                {statusCounts.closed_with_reason}
                            </div>
                            <span className="text-[10px] font-bold text-[#68716B] bg-[#F3F7F4] px-1.5 py-0.5 rounded">
                                CLOSED
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Two Column Layout: Urgent Queue & Active Dispatches */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pending Reviews Queue */}
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
                                <div>
                                    <h3 className="font-bold text-sm text-[#171C19] flex items-center gap-2">
                                        <Clock className="size-4 text-[#174B35]" />
                                        Antrean Review Baru ({pendingReviews.length})
                                    </h3>
                                    <p className="text-xs text-[#68716B]">Laporan baru masuk yang butuh verifikasi awal</p>
                                </div>
                                <Link
                                    href="/admin/laporan?status=SUBMITTED"
                                    className="text-xs text-[#216B49] font-bold hover:underline"
                                >
                                    Buka Semua &rarr;
                                </Link>
                            </div>

                            {pendingReviews.length === 0 ? (
                                <p className="text-xs text-[#68716B] py-8 text-center">
                                    Semua laporan baru masuk telah diverifikasi atau ditindaklanjuti.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {pendingReviews.map((rep) => (
                                        <div
                                            key={rep.id}
                                            className="p-3.5 rounded-xl border border-[#DDE3DE] hover:border-[#216B49] transition-all flex items-center justify-between gap-3 text-xs bg-[#F3F7F4]/40"
                                        >
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-[#171C19] border border-[#DDE3DE]">
                                                        {rep.tracking_code}
                                                    </span>
                                                    <StatusBadge status={rep.report_status} size="sm" />
                                                </div>
                                                <div className="font-bold text-[#171C19] line-clamp-1">
                                                    {rep.title}
                                                </div>
                                                <div className="text-[11px] text-[#68716B]">
                                                    {rep.regency_city}, {rep.province}
                                                </div>
                                            </div>

                                            <Link
                                                href={`/admin/laporan/${rep.id}`}
                                                className="px-3.5 py-1.5 bg-[#216B49] hover:bg-[#174B35] text-white font-bold rounded-lg text-xs shrink-0 transition-all shadow-xs active:scale-[0.98]"
                                            >
                                                Periksa
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Assignments Queue */}
                    <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
                                <div>
                                    <h3 className="font-bold text-sm text-[#171C19] flex items-center gap-2">
                                        <Send className="size-4 text-[#216B49]" />
                                        Penugasan Berjalan di Instansi ({activeAssignments.length})
                                    </h3>
                                    <p className="text-xs text-[#68716B]">Status operasional tim lapangan BPBD / Damkar</p>
                                </div>
                                <Link
                                    href="/admin/laporan?status=DISPATCHED"
                                    className="text-xs text-[#216B49] font-bold hover:underline"
                                >
                                    Semua Disposisi &rarr;
                                </Link>
                            </div>

                            {activeAssignments.length === 0 ? (
                                <p className="text-xs text-[#68716B] py-8 text-center">
                                    Tidak ada penugasan OPD yang sedang aktif saat ini.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {activeAssignments.map((asg) => (
                                        <div
                                            key={asg.id}
                                            className="p-3.5 rounded-xl border border-[#DDE3DE] hover:border-[#174B35] transition-all flex items-center justify-between gap-3 text-xs bg-[#F3F7F4]/40"
                                        >
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-[#171C19] border border-[#DDE3DE]">
                                                        {asg.report.tracking_code}
                                                    </span>
                                                    <StatusBadge status={asg.assignment_status} size="sm" />
                                                </div>
                                                <div className="font-bold text-[#171C19] line-clamp-1">
                                                    {asg.report.title}
                                                </div>
                                                <div className="text-[11px] text-[#174B35] font-semibold">
                                                    OPD: {asg.agency.name} ({asg.agency.jurisdiction})
                                                </div>
                                            </div>

                                            <Link
                                                href={`/admin/laporan/${asg.report.id}`}
                                                className="px-3.5 py-1.5 bg-[#F3F7F4] hover:bg-[#E8F1EB] text-[#174B35] font-bold rounded-lg text-xs shrink-0 transition-colors border border-[#DDE3DE]"
                                            >
                                                Pantau
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Agency Workloads Overview */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
                        <div>
                            <h3 className="font-bold text-sm text-[#171C19] flex items-center gap-2">
                                <Building className="size-4 text-[#174B35]" />
                                Beban Kerja Instansi & OPD Terdaftar di Kalimantan
                            </h3>
                            <p className="text-xs text-[#68716B]">Distribusi penanganan aktif vs penyelesaian tuntas per dinas</p>
                        </div>
                        <Link href="/admin/instansi" className="text-xs text-[#216B49] font-bold hover:underline">
                            Kelola Instansi &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {agencyStats.map((ag) => (
                            <div key={ag.id} className="bg-[#F3F7F4] border border-[#DDE3DE] p-4 rounded-xl space-y-2">
                                <div className="font-bold text-xs text-[#174B35] line-clamp-1">
                                    {ag.name}
                                </div>
                                <div className="text-[11px] text-[#68716B]">
                                    Wilayah: {ag.jurisdiction}
                                </div>
                                <div className="pt-2 border-t border-[#DDE3DE] flex items-center justify-between text-xs">
                                    <span>Sedang Tangani: <strong className="text-[#171C19]">{ag.in_progress_count}</strong></span>
                                    <span>Selesai: <strong className="text-[#216B49]">{ag.completed_count}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
