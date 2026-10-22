import { Head, Link } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import {
    FileText,
    Building,
    Shield,
    Clock,
    Send,
    Activity,
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

    const pipelineStages = [
        { key: 'SUBMITTED', label: 'Baru Masuk', count: statusCounts.submitted, color: 'text-[#141413]' },
        { key: 'UNDER_REVIEW', label: 'Ditinjau', count: statusCounts.under_review, color: 'text-[#141413]' },
        { key: 'NEEDS_INFORMATION', label: 'Perlu Info', count: statusCounts.needs_information, color: 'text-[#d97757]' },
        { key: 'VERIFIED', label: 'Terverifikasi', count: statusCounts.verified, color: 'text-[#141413]' },
        { key: 'DISPATCHED', label: 'Ditugaskan', count: statusCounts.dispatched, color: 'text-[#141413]' },
        { key: 'RESOLUTION_REVIEW', label: 'Review OPD', count: statusCounts.resolution_review, color: 'text-[#141413]' },
        { key: 'RESOLVED_VERIFIED', label: 'Selesai Valid', count: statusCounts.resolved_verified, color: 'text-[#141413]' },
        { key: 'CLOSED_WITH_REASON', label: 'Ditutup', count: statusCounts.closed_with_reason, color: 'text-[#87867f]' },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 text-[#141413] bg-[#f0eee6] min-h-screen">
            <Head title="Pusat Komando Pengendali Karhutla — JAGAIN" />

            {/* Operational Header Bar */}
            <div className="border-b border-[#cccbc8] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider uppercase text-[#87867f]">
                        <Activity className="size-3.5 text-[#d97757]" />
                        <span>Pusat Kendali Verifikasi & Disposisi Karhutla</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif text-[#141413] tracking-tight">
                        Konsol Administrator JAGAIN
                    </h1>
                    <p className="font-serif text-xs sm:text-sm text-[#87867f]">
                        Total {totalReports} laporan tercatat di 5 provinsi Kalimantan. Pantau antrean masuk dan penugasan regu darat.
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Link
                        href="/admin/laporan"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#141413] text-[#faf9f5] rounded-[8px] hover:bg-[#3d3d3a] transition-colors"
                    >
                        <FileText className="size-3.5" />
                        <span>Antrean Laporan</span>
                    </Link>
                    <Link
                        href="/admin/instansi"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-[#cccbc8] bg-[#faf9f5] text-[#141413] hover:bg-[#e3dacc] rounded-[8px] transition-colors"
                    >
                        <Building className="size-3.5 text-[#87867f]" />
                        <span>Kelola OPD</span>
                    </Link>
                    <Link
                        href="/admin/audit-logs"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-[#cccbc8] bg-[#faf9f5] text-[#141413] hover:bg-[#e3dacc] rounded-[8px] transition-colors"
                    >
                        <Shield className="size-3.5 text-[#87867f]" />
                        <span>Audit Trail</span>
                    </Link>
                </div>
            </div>

            {/* PIPELINE STATUS RIBBON & LEDGER */}
            <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#87867f] text-[11px]">
                        Pipeline Status Laporan (8 Tahapan Resmi)
                    </span>
                    <span className="text-[11px] text-[#87867f] font-serif">Pilih tahapan untuk memfilter antrean</span>
                </div>

                <div className="border border-[#cccbc8] rounded-[24px] overflow-hidden bg-[#faf9f5]">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-y sm:divide-y-0 divide-[#cccbc8] text-xs">
                        {pipelineStages.map((stage) => (
                            <Link
                                key={stage.key}
                                href={`/admin/laporan?status=${stage.key}`}
                                className="p-4 hover:bg-[#f0eee6] transition-colors block group"
                            >
                                <div className="text-[11px] text-[#87867f] font-medium truncate mb-1">
                                    {stage.label}
                                </div>
                                <div className={`font-mono text-xl font-bold tabular-nums ${stage.color}`}>
                                    {stage.count}
                                </div>
                                <div className="text-[9px] font-mono text-[#87867f] group-hover:text-[#141413] mt-0.5">
                                    {stage.key}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* TWO WORK QUEUES: PENDING REVIEWS & ACTIVE DISPATCHES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start font-sans">
                {/* 1. Pending Reviews Queue */}
                <div className="border border-[#cccbc8] rounded-[24px] overflow-hidden bg-[#faf9f5]">
                    <div className="p-5 bg-[#f0eee6] border-b border-[#cccbc8] flex items-center justify-between">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                                <Clock className="size-3.5 text-[#87867f]" />
                                Antrean Review Laporan Baru ({pendingReviews.length})
                            </h2>
                            <span className="text-[11px] font-serif text-[#87867f]">Membutuhkan validasi lokasi & kelayakan</span>
                        </div>
                        <Link
                            href="/admin/laporan?status=SUBMITTED"
                            className="text-xs text-[#141413] font-semibold hover:underline"
                        >
                            Buka Semua →
                        </Link>
                    </div>

                    {pendingReviews.length === 0 ? (
                        <div className="p-10 text-center text-xs text-[#87867f] font-serif">
                            Tidak ada laporan baru dalam antrean peninjauan.
                        </div>
                    ) : (
                        <div className="divide-y divide-[#cccbc8] text-xs">
                            {pendingReviews.map((rep) => (
                                <div key={rep.id} className="p-4 flex items-center justify-between gap-3 hover:bg-[#f0eee6]/60 transition-colors">
                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] bg-[#f0eee6] text-[#141413] border border-[#cccbc8]">
                                                {rep.tracking_code}
                                            </span>
                                            <StatusBadge status={rep.report_status} size="sm" />
                                        </div>
                                        <div className="font-semibold text-[#141413] truncate">{rep.title}</div>
                                        <div className="text-[11px] text-[#87867f] font-serif">
                                            {rep.regency_city}, {rep.province}
                                        </div>
                                    </div>
                                    <Link
                                        href={`/admin/laporan/${rep.id}`}
                                        className="px-3.5 py-1.5 rounded-[6px] bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5] text-xs font-semibold shrink-0 transition-colors"
                                    >
                                        Periksa
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. Active Dispatches Queue */}
                <div className="border border-[#cccbc8] rounded-[24px] overflow-hidden bg-[#faf9f5]">
                    <div className="p-5 bg-[#f0eee6] border-b border-[#cccbc8] flex items-center justify-between">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                                <Send className="size-3.5 text-[#87867f]" />
                                Penugasan Berjalan di Instansi ({activeAssignments.length})
                            </h2>
                            <span className="text-[11px] font-serif text-[#87867f]">Status operasional tim lapangan BPBD / Damkar</span>
                        </div>
                        <Link
                            href="/admin/laporan?status=DISPATCHED"
                            className="text-xs text-[#141413] font-semibold hover:underline"
                        >
                            Semua Disposisi →
                        </Link>
                    </div>

                    {activeAssignments.length === 0 ? (
                        <div className="p-10 text-center text-xs text-[#87867f] font-serif">
                            Tidak ada penugasan OPD yang sedang aktif saat ini.
                        </div>
                    ) : (
                        <div className="divide-y divide-[#cccbc8] text-xs">
                            {activeAssignments.map((asg) => (
                                <div key={asg.id} className="p-4 flex items-center justify-between gap-3 hover:bg-[#f0eee6]/60 transition-colors">
                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] bg-[#f0eee6] text-[#141413] border border-[#cccbc8]">
                                                {asg.report.tracking_code}
                                            </span>
                                            <StatusBadge status={asg.assignment_status} size="sm" />
                                        </div>
                                        <div className="font-semibold text-[#141413] truncate">{asg.report.title}</div>
                                        <div className="text-[11px] text-[#87867f] font-serif">
                                            OPD: {asg.agency.name} ({asg.agency.jurisdiction})
                                        </div>
                                    </div>
                                    <Link
                                        href={`/admin/laporan/${asg.report.id}`}
                                        className="px-3.5 py-1.5 rounded-[6px] border border-[#cccbc8] bg-[#faf9f5] hover:bg-[#e3dacc] text-[#141413] text-xs font-semibold shrink-0 transition-colors"
                                    >
                                        Pantau
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* AGENCY WORKLOADS TABLE */}
            <div className="border border-[#cccbc8] rounded-[24px] overflow-hidden bg-[#faf9f5] font-sans">
                <div className="p-5 bg-[#f0eee6] border-b border-[#cccbc8] flex items-center justify-between">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                            <Building className="size-3.5 text-[#87867f]" />
                            Beban Kerja Instansi & OPD Terdaftar
                        </h2>
                        <span className="text-[11px] font-serif text-[#87867f]">Distribusi penanganan aktif vs penyelesaian tuntas</span>
                    </div>
                    <Link href="/admin/instansi" className="text-xs text-[#141413] font-semibold hover:underline">
                        Kelola Instansi →
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#faf9f5] border-b border-[#cccbc8] text-[#87867f] uppercase tracking-wider text-[11px] font-semibold">
                            <tr>
                                <th className="py-3.5 px-5">Nama Instansi</th>
                                <th className="py-3.5 px-5">Wilayah Yurisdiksi</th>
                                <th className="py-3.5 px-5 text-center">Tugas Aktif</th>
                                <th className="py-3.5 px-5 text-center">Selesai Ditangani</th>
                                <th className="py-3.5 px-5 text-center">Total Riwayat</th>
                                <th className="py-3.5 px-5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#cccbc8]">
                            {agencyStats.map((ag) => (
                                <tr key={ag.id} className="hover:bg-[#f0eee6]/60 transition-colors">
                                    <td className="py-3.5 px-5 font-semibold text-[#141413]">
                                        {ag.name}
                                    </td>
                                    <td className="py-3.5 px-5 text-[#87867f] font-serif">
                                        {ag.jurisdiction}
                                    </td>
                                    <td className="py-3.5 px-5 text-center font-mono font-bold text-[#141413]">
                                        {ag.in_progress_count}
                                    </td>
                                    <td className="py-3.5 px-5 text-center font-mono font-bold text-[#141413]">
                                        {ag.completed_count}
                                    </td>
                                    <td className="py-3.5 px-5 text-center font-mono text-[#87867f]">
                                        {ag.total_assignments_count}
                                    </td>
                                    <td className="py-3.5 px-5 text-right">
                                        <Link
                                            href={`/admin/laporan?agency=${ag.id}`}
                                            className="text-xs font-semibold text-[#141413] hover:text-[#d97757] hover:underline"
                                        >
                                            Lihat Laporan
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
