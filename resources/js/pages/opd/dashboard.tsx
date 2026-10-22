import { Head, Link } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import {
    Building,
    FileText,
    Clock,
    CheckCircle2,
    ArrowRight,
    Activity,
    MapPin,
} from 'lucide-react';

interface OpdDashboardProps {
    agency: {
        id: number;
        name: string;
        code: string;
        agency_type: string;
        jurisdiction: string;
    };
    statusCounts: {
        assigned: number;
        received: number;
        in_progress: number;
        submitted_for_review: number;
        completed: number;
    };
    pendingTasks: Array<{
        id: number;
        assignment_status: string;
        assigned_at: string;
        report: {
            id: number;
            tracking_code: string;
            title: string;
            regency_city: string;
            province: string;
            category?: { name: string } | null;
        };
    }>;
}

export default function OpdDashboard({ agency, statusCounts, pendingTasks }: OpdDashboardProps) {
    const totalActive = statusCounts.assigned + statusCounts.received + statusCounts.in_progress;

    const opdStages = [
        { key: 'ASSIGNED', label: 'Penugasan Baru', count: statusCounts.assigned, color: 'text-[#d97757]' },
        { key: 'RECEIVED_BY_AGENCY', label: 'Telah Diterima', count: statusCounts.received, color: 'text-[#141413]' },
        { key: 'IN_PROGRESS', label: 'Sedang Ditangani', count: statusCounts.in_progress, color: 'text-[#141413]' },
        { key: 'SUBMITTED_FOR_REVIEW', label: 'Diajukan Review', count: statusCounts.submitted_for_review, color: 'text-[#141413]' },
        { key: 'COMPLETED', label: 'Selesai Terverifikasi', count: statusCounts.completed, color: 'text-[#87867f]' },
    ];

    return (
        <div className="min-h-screen bg-[#f0eee6] text-[#141413] p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title={`Pusat Operasional ${agency.code} — JAGAIN`} />

            {/* Operational Header */}
            <div className="border-b border-[#cccbc8] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#87867f]">
                        <Activity className="size-3.5 text-[#141413]" />
                        <span>Posko Operasional Penanganan Lapangan</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413] flex items-center gap-2.5">
                        <Building className="size-6 text-[#141413]" />
                        {agency.name}
                    </h1>
                    <p className="text-sm font-sans text-[#87867f]">
                        Yurisdiksi Operasional: <strong className="text-[#141413] font-medium">{agency.jurisdiction}</strong> • Kode Instansi: <span className="font-mono font-bold text-[#141413]">{agency.code}</span>
                    </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                    <Link
                        href="/opd/tugas"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-medium bg-[#141413] text-[#faf9f5] rounded-lg hover:bg-[#3d3d3a] transition-colors"
                    >
                        <FileText className="size-3.5" />
                        <span>Daftar Seluruh Penugasan</span>
                    </Link>
                </div>
            </div>

            {/* Status Ribbon & Ledger */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-sans font-semibold uppercase tracking-wider text-[#87867f] text-[11px]">
                        Distribusi Beban Penanganan Lapangan
                    </span>
                    <span className="text-[11px] font-sans font-medium text-[#141413]">
                        {totalActive} Tugas Aktif Butuh Tindakan
                    </span>
                </div>

                <div className="border border-[#cccbc8] rounded-2xl overflow-hidden bg-[#faf9f5]">
                    <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-[#cccbc8] text-xs">
                        {opdStages.map((st) => (
                            <Link
                                key={st.key}
                                href={`/opd/tugas?status=${st.key}`}
                                className="p-4 hover:bg-[#e3dacc]/40 transition-colors block group"
                            >
                                <div className="text-[11px] font-sans text-[#87867f] font-normal truncate mb-1">
                                    {st.label}
                                </div>
                                <div className={`font-mono text-2xl font-bold tabular-nums ${st.color}`}>
                                    {st.count}
                                </div>
                                <div className="text-[10px] font-mono text-[#87867f] group-hover:text-[#141413] mt-1">
                                    {st.key}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Tasks Queue */}
            <div className="border border-[#cccbc8] rounded-2xl overflow-hidden bg-[#faf9f5]">
                <div className="p-4 bg-[#e3dacc]/40 border-b border-[#cccbc8] flex items-center justify-between">
                    <div>
                        <h2 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#141413] flex items-center gap-2">
                            <Clock className="size-3.5 text-[#141413]" />
                            Antrean Tugas Lapangan Butuh Tindakan ({pendingTasks.length})
                        </h2>
                        <span className="text-xs font-serif text-[#87867f]">Konfirmasi penerimaan penugasan dan perbarui linimasa progres penanganan.</span>
                    </div>

                    <Link href="/opd/tugas" className="text-xs font-sans font-medium text-[#141413] hover:text-[#d97757] transition-colors">
                        Lihat Seluruh Penugasan →
                    </Link>
                </div>

                {pendingTasks.length === 0 ? (
                    <div className="py-14 text-center text-[#87867f] space-y-2">
                        <CheckCircle2 className="size-8 text-[#141413] mx-auto opacity-40" />
                        <div className="text-sm font-serif font-medium text-[#141413]">Semua Tugas Telah Ditangani</div>
                        <p className="text-xs font-sans max-w-sm mx-auto">
                            Tidak ada penugasan baru atau penanganan berjalan yang tertunda untuk instansi Anda saat ini.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#cccbc8]/60 text-xs">
                        {pendingTasks.map((asg) => (
                            <div
                                key={asg.id}
                                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#f0eee6]/60 transition-colors"
                            >
                                <div className="space-y-1.5 flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-[#e3dacc]/70 text-[#141413] border border-[#cccbc8]">
                                            {asg.report.tracking_code}
                                        </span>
                                        <StatusBadge status={asg.assignment_status} size="sm" />
                                        {asg.report.category && (
                                            <span className="text-[10px] font-sans bg-[#faf9f5] px-2 py-0.5 rounded border border-[#cccbc8] text-[#87867f]">
                                                {asg.report.category.name}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-serif font-semibold text-base text-[#141413] truncate">
                                        {asg.report.title}
                                    </h3>

                                    <div className="text-xs font-sans text-[#87867f] flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="size-3.5 text-[#141413]" />
                                            <span>{asg.report.regency_city}, {asg.report.province}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                                            <Clock className="size-3.5" />
                                            <span>Ditugaskan: {new Date(asg.assigned_at).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-2">
                                    <Link
                                        href={`/opd/tugas/${asg.id}`}
                                        className="px-4 py-2 bg-[#d97757] hover:bg-[#c6613f] text-[#faf9f5] font-sans font-medium rounded-lg text-xs transition-colors flex items-center gap-1.5"
                                    >
                                        <span>Buka Tindak Lanjut</span>
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
