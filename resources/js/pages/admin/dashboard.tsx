import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
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
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title="Dashboard Pengendali Karhutla — JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            {/* Admin Header Subnav */}
            <div className="bg-white border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#174B35] text-white text-[10px] font-bold tracking-wider uppercase mb-1">
                            Pusat Pengendali Karhutla
                        </div>
                        <h1 className="text-xl font-bold text-[#171C19]">
                            Dashboard Administrator JAGAIN
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/laporan"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#216B49] text-white rounded-md hover:bg-[#174B35] transition-colors"
                        >
                            <FileText className="size-3.5" />
                            Antrean Laporan
                        </Link>
                        <Link
                            href="/admin/instansi"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#DDE3DE] text-[#171C19] hover:bg-[#F3F7F4] rounded-md transition-colors"
                        >
                            <Building className="size-3.5 text-[#216B49]" />
                            Kelola OPD
                        </Link>
                        <Link
                            href="/admin/audit-logs"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#DDE3DE] text-[#171C19] hover:bg-[#F3F7F4] rounded-md transition-colors"
                        >
                            <Shield className="size-3.5 text-[#39845C]" />
                            Audit Trail
                        </Link>
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Status Grid Cards */}
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#68716B] mb-3">
                        Status Alur Laporan Masuk
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Link
                            href="/admin/laporan?status=SUBMITTED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#174B35] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#68716B] mb-1">
                                <span>Baru Dikirim</span>
                                <Clock className="size-4 text-[#68716B]" />
                            </div>
                            <div className="text-2xl font-bold text-[#171C19]">
                                {statusCounts.submitted}
                            </div>
                        </Link>

                        <Link
                            href="/admin/laporan?status=UNDER_REVIEW"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#216B49] mb-1">
                                <span>Sedang Ditinjau</span>
                                <AlertCircle className="size-4 text-[#216B49]" />
                            </div>
                            <div className="text-2xl font-bold text-[#174B35]">
                                {statusCounts.under_review}
                            </div>
                        </Link>

                        <Link
                            href="/admin/laporan?status=NEEDS_INFORMATION"
                            className="bg-white border border-[#DDE3DE] hover:border-[#343B36] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#68716B] mb-1">
                                <span>Perlu Informasi</span>
                                <AlertCircle className="size-4 text-[#68716B]" />
                            </div>
                            <div className="text-2xl font-bold text-[#171C19]">
                                {statusCounts.needs_information}
                            </div>
                        </Link>

                        <Link
                            href="/admin/laporan?status=VERIFIED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#216B49] mb-1">
                                <span>Terverifikasi</span>
                                <CheckCircle2 className="size-4 text-[#216B49]" />
                            </div>
                            <div className="text-2xl font-bold text-[#216B49]">
                                {statusCounts.verified}
                            </div>
                        </Link>

                        <Link
                            href="/admin/laporan?status=DISPATCHED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#174B35] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#174B35] mb-1">
                                <span>Ditugaskan ke OPD</span>
                                <Send className="size-4 text-[#174B35]" />
                            </div>
                            <div className="text-2xl font-bold text-[#174B35]">
                                {statusCounts.dispatched}
                            </div>
                        </Link>

                        <Link
                            href="/admin/laporan?status=RESOLUTION_REVIEW"
                            className="bg-white border border-[#DDE3DE] hover:border-[#39845C] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#39845C] mb-1">
                                <span>Review Penanganan</span>
                                <Clock className="size-4 text-[#39845C]" />
                            </div>
                            <div className="text-2xl font-bold text-[#171C19]">
                                {statusCounts.resolution_review}
                            </div>
                        </Link>

                        <Link
                            href="/admin/laporan?status=RESOLVED_VERIFIED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#216B49] mb-1">
                                <span>Selesai Terverifikasi</span>
                                <CheckCircle2 className="size-4 text-[#216B49]" />
                            </div>
                            <div className="text-2xl font-bold text-[#216B49]">
                                {statusCounts.resolved_verified}
                            </div>
                        </Link>

                        <Link
                            href="/admin/laporan?status=CLOSED_WITH_REASON"
                            className="bg-white border border-[#DDE3DE] hover:border-[#68716B] p-4 rounded-xl transition-all shadow-xs"
                        >
                            <div className="flex items-center justify-between text-xs text-[#68716B] mb-1">
                                <span>Ditutup Berkas</span>
                                <CheckCircle2 className="size-4 text-[#68716B]" />
                            </div>
                            <div className="text-2xl font-bold text-[#68716B]">
                                {statusCounts.closed_with_reason}
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Two Column Layout: Pending Queue & Active Assignments */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pending Reviews Queue */}
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE] mb-4">
                                <h3 className="font-bold text-sm text-[#171C19] flex items-center gap-2">
                                    <Clock className="size-4 text-[#174B35]" />
                                    Antrean Review Mendesak ({pendingReviews.length})
                                </h3>
                                <Link
                                    href="/admin/laporan"
                                    className="text-xs text-[#216B49] font-semibold hover:underline"
                                >
                                    Buka Semua
                                </Link>
                            </div>

                            {pendingReviews.length === 0 ? (
                                <p className="text-xs text-[#68716B] py-6 text-center">
                                    Semua antrean laporan baru telah ditindaklanjuti.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {pendingReviews.map((rep) => (
                                        <div
                                            key={rep.id}
                                            className="p-3 rounded-lg border border-[#DDE3DE] hover:border-[#216B49] transition-all flex items-center justify-between gap-3 text-xs"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[10px] text-[#68716B]">
                                                        {rep.tracking_code}
                                                    </span>
                                                    <StatusBadge status={rep.report_status} size="sm" />
                                                </div>
                                                <div className="font-semibold text-[#171C19] line-clamp-1">
                                                    {rep.title}
                                                </div>
                                                <div className="text-[11px] text-[#68716B]">
                                                    {rep.regency_city}, {rep.province}
                                                </div>
                                            </div>

                                            <Link
                                                href={`/admin/laporan/${rep.id}`}
                                                className="px-3 py-1.5 bg-[#F3F7F4] hover:bg-[#E8F1EB] text-[#174B35] font-semibold rounded text-xs shrink-0"
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
                    <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE] mb-4">
                                <h3 className="font-bold text-sm text-[#171C19] flex items-center gap-2">
                                    <Send className="size-4 text-[#216B49]" />
                                    Penugasan Berjalan di Instansi ({activeAssignments.length})
                                </h3>
                                <Link
                                    href="/admin/laporan?status=DISPATCHED"
                                    className="text-xs text-[#216B49] font-semibold hover:underline"
                                >
                                    Semua Tugas
                                </Link>
                            </div>

                            {activeAssignments.length === 0 ? (
                                <p className="text-xs text-[#68716B] py-6 text-center">
                                    Tidak ada penugasan OPD yang sedang aktif saat ini.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {activeAssignments.map((asg) => (
                                        <div
                                            key={asg.id}
                                            className="p-3 rounded-lg border border-[#DDE3DE] hover:border-[#174B35] transition-all flex items-center justify-between gap-3 text-xs"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[10px] text-[#68716B]">
                                                        {asg.report.tracking_code}
                                                    </span>
                                                    <StatusBadge status={asg.assignment_status} size="sm" />
                                                </div>
                                                <div className="font-semibold text-[#171C19] line-clamp-1">
                                                    {asg.report.title}
                                                </div>
                                                <div className="text-[11px] text-[#174B35] font-medium">
                                                    OPD: {asg.agency.name}
                                                </div>
                                            </div>

                                            <Link
                                                href={`/admin/laporan/${asg.report.id}`}
                                                className="px-3 py-1.5 bg-[#F3F7F4] hover:bg-[#E8F1EB] text-[#174B35] font-semibold rounded text-xs shrink-0"
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
                <div className="bg-white border border-[#DDE3DE] rounded-xl p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE] mb-4">
                        <h3 className="font-bold text-sm text-[#171C19] flex items-center gap-2">
                            <Building className="size-4 text-[#174B35]" />
                            Beban Kerja Instansi & OPD Terdaftar di Kalimantan
                        </h3>
                        <Link href="/admin/instansi" className="text-xs text-[#216B49] font-semibold hover:underline">
                            Kelola Instansi
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
            </main>

            <Footer />
        </div>
    );
}
