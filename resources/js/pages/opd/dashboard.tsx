import { Head, Link } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import {
    Building,
    FileText,
    Clock,
    CheckCircle2,
    Send,
    ArrowRight,
    ShieldCheck,
    AlertCircle,
    Activity,
    Layers,
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

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title={`Pusat Operasional ${agency.code} — JAGAIN`} />

            {/* OPD Header Card */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#174B35] text-white text-[10px] font-bold tracking-wider uppercase">
                            <Activity className="size-3" />
                            Pusat Komando Operasional Lapangan
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] flex items-center gap-2">
                            <Building className="size-5 text-[#174B35]" />
                            {agency.name}
                        </h1>
                        <p className="text-xs text-[#68716B]">
                            Wilayah Kewenangan: <strong className="text-[#171C19]">{agency.jurisdiction}</strong> • Kode Registrasi: <span className="font-mono font-bold text-[#174B35]">{agency.code}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/opd/tugas"
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-[#216B49] text-white rounded-xl hover:bg-[#174B35] transition-all shadow-xs active:scale-[0.98]"
                        >
                            <FileText className="size-3.5" />
                            Daftar Seluruh Penugasan
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Status Counters */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#68716B]">
                            Status Beban Penanganan Lapangan
                        </h2>
                        <span className="text-xs text-[#174B35] font-semibold">
                            Total {totalActive} Tugas Aktif Butuh Tindakan
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        <Link
                            href="/opd/tugas?status=ASSIGNED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#174B35] p-5 rounded-2xl shadow-xs transition-all space-y-1 block"
                        >
                            <div className="text-xs text-[#68716B]">Penugasan Baru</div>
                            <div className="text-3xl font-bold text-[#171C19]">{statusCounts.assigned}</div>
                            <span className="inline-block text-[11px] font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                                Perlu Respon
                            </span>
                        </Link>

                        <Link
                            href="/opd/tugas?status=RECEIVED_BY_AGENCY"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-5 rounded-2xl shadow-xs transition-all space-y-1 block"
                        >
                            <div className="text-xs text-[#68716B]">Telah Diterima</div>
                            <div className="text-3xl font-bold text-[#174B35]">{statusCounts.received}</div>
                            <span className="inline-block text-[11px] font-bold text-[#174B35] bg-[#E8F1EB] px-2 py-0.5 rounded-full">
                                Siap Berangkat
                            </span>
                        </Link>

                        <Link
                            href="/opd/tugas?status=IN_PROGRESS"
                            className="bg-white border border-[#DDE3DE] hover:border-[#216B49] p-5 rounded-2xl shadow-xs transition-all space-y-1 block"
                        >
                            <div className="text-xs text-[#68716B]">Sedang Ditangani</div>
                            <div className="text-3xl font-bold text-[#216B49]">{statusCounts.in_progress}</div>
                            <span className="inline-block text-[11px] font-bold text-white bg-[#216B49] px-2 py-0.5 rounded-full">
                                Tim di Lokasi
                            </span>
                        </Link>

                        <Link
                            href="/opd/tugas?status=SUBMITTED_FOR_REVIEW"
                            className="bg-white border border-[#DDE3DE] hover:border-[#39845C] p-5 rounded-2xl shadow-xs transition-all space-y-1 block"
                        >
                            <div className="text-xs text-[#68716B]">Diajukan Review</div>
                            <div className="text-3xl font-bold text-[#171C19]">{statusCounts.submitted_for_review}</div>
                            <span className="inline-block text-[11px] font-bold text-[#68716B] bg-[#F3F7F4] px-2 py-0.5 rounded-full">
                                Menunggu Verifikasi
                            </span>
                        </Link>

                        <Link
                            href="/opd/tugas?status=COMPLETED"
                            className="bg-white border border-[#DDE3DE] hover:border-[#174B35] p-5 rounded-2xl shadow-xs transition-all space-y-1 block"
                        >
                            <div className="text-xs text-[#68716B]">Tuntas Terverifikasi</div>
                            <div className="text-3xl font-bold text-[#174B35]">{statusCounts.completed}</div>
                            <span className="inline-block text-[11px] font-bold text-[#174B35] bg-[#E8F1EB] px-2 py-0.5 rounded-full">
                                Selesai
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Priority Action Tasks Table */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE3DE]">
                        <div>
                            <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                <Clock className="size-4 text-[#216B49]" />
                                Antrean Tindak Lanjut Tugas Aktif ({pendingTasks.length})
                            </h2>
                            <p className="text-xs text-[#68716B] mt-0.5">
                                Segera konfirmasi penerimaan penugasan baru dan catat progres lapangan berkala (Gantt timeline & bukti penanganan).
                            </p>
                        </div>

                        <Link href="/opd/tugas" className="text-xs font-bold text-[#216B49] hover:underline">
                            Lihat Seluruh Penugasan &rarr;
                        </Link>
                    </div>

                    {pendingTasks.length === 0 ? (
                        <div className="py-12 text-center text-[#68716B] space-y-2">
                            <CheckCircle2 className="size-10 text-[#216B49] mx-auto" />
                            <div className="text-sm font-bold text-[#171C19]">Semua Tugas Telah Ditangani</div>
                            <p className="text-xs max-w-sm mx-auto">
                                Tidak ada penugasan baru atau penanganan berjalan yang tertunda untuk instansi Anda saat ini.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingTasks.map((asg) => (
                                <div
                                    key={asg.id}
                                    className="p-5 rounded-xl border border-[#DDE3DE] hover:border-[#216B49] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F3F7F4]/40"
                                >
                                    <div className="space-y-2 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-[#171C19] border border-[#DDE3DE]">
                                                {asg.report.tracking_code}
                                            </span>
                                            <StatusBadge status={asg.assignment_status} size="sm" />
                                            {asg.report.category && (
                                                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#DDE3DE] text-[#343B36]">
                                                    {asg.report.category.name}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-sm text-[#171C19]">
                                            {asg.report.title}
                                        </h3>

                                        <div className="text-xs text-[#68716B] flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <Building className="size-3 text-[#216B49]" />
                                                <span>{asg.report.regency_city}, {asg.report.province}</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-mono text-[11px]">
                                                <Clock className="size-3" />
                                                <span>Ditugaskan: {new Date(asg.assigned_at).toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shrink-0 flex items-center gap-2">
                                        <Link
                                            href={`/opd/tugas/${asg.id}`}
                                            className="px-4 py-2.5 bg-[#216B49] hover:bg-[#174B35] text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center gap-1.5 active:scale-[0.98]"
                                        >
                                            Buka Tindak Lanjut
                                            <ArrowRight className="size-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
