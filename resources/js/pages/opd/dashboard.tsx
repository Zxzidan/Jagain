import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import StatusBadge from '@/components/status-badge';
import { Building, FileText, Clock, CheckCircle2, Send, ArrowRight, ShieldCheck } from 'lucide-react';

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
    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title={`Dashboard ${agency.code} — JAGAIN`} />
            <EmergencyBanner />
            <Navbar />

            {/* Subnav Header */}
            <div className="bg-white border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#216B49] text-white text-[10px] font-bold tracking-wider uppercase mb-1">
                            Pusat Komando Instansi Penanganan
                        </div>
                        <h1 className="text-xl font-bold text-[#171C19] flex items-center gap-2">
                            <Building className="size-5 text-[#174B35]" />
                            {agency.name}
                        </h1>
                        <p className="text-xs text-[#68716B] mt-0.5">
                            Wilayah Kewenangan: {agency.jurisdiction} • Kode: {agency.code}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/opd/tugas"
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#216B49] text-white rounded-lg hover:bg-[#174B35] transition-colors"
                        >
                            <FileText className="size-3.5" />
                            Daftar Seluruh Tugas
                        </Link>
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Status Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="bg-white border border-[#DDE3DE] p-4 rounded-xl shadow-xs">
                        <div className="text-xs text-[#68716B] mb-1">Penugasan Baru</div>
                        <div className="text-2xl font-bold text-[#171C19]">{statusCounts.assigned}</div>
                        <span className="text-[10px] text-[#216B49] font-medium">Perlu Respon</span>
                    </div>

                    <div className="bg-white border border-[#DDE3DE] p-4 rounded-xl shadow-xs">
                        <div className="text-xs text-[#68716B] mb-1">Telah Diterima</div>
                        <div className="text-2xl font-bold text-[#174B35]">{statusCounts.received}</div>
                        <span className="text-[10px] text-[#68716B]">Siap Tindak Lanjut</span>
                    </div>

                    <div className="bg-white border border-[#DDE3DE] p-4 rounded-xl shadow-xs">
                        <div className="text-xs text-[#68716B] mb-1">Sedang Ditangani</div>
                        <div className="text-2xl font-bold text-[#216B49]">{statusCounts.in_progress}</div>
                        <span className="text-[10px] text-[#216B49] font-medium">Operasional Lapangan</span>
                    </div>

                    <div className="bg-white border border-[#DDE3DE] p-4 rounded-xl shadow-xs">
                        <div className="text-xs text-[#68716B] mb-1">Diajukan Review</div>
                        <div className="text-2xl font-bold text-[#171C19]">{statusCounts.submitted_for_review}</div>
                        <span className="text-[10px] text-[#68716B]">Menunggu Validasi</span>
                    </div>

                    <div className="bg-white border border-[#DDE3DE] p-4 rounded-xl shadow-xs">
                        <div className="text-xs text-[#68716B] mb-1">Selesai</div>
                        <div className="text-2xl font-bold text-[#174B35]">{statusCounts.completed}</div>
                        <span className="text-[10px] text-[#174B35] font-medium">Tuntas</span>
                    </div>
                </div>

                {/* Priority Action Tasks Table */}
                <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
                        <div>
                            <h2 className="text-sm font-bold text-[#171C19] uppercase tracking-wider flex items-center gap-2">
                                <Clock className="size-4 text-[#216B49]" />
                                Tugas Aktif Lapangan ({pendingTasks.length})
                            </h2>
                            <p className="text-xs text-[#68716B] mt-0.5">
                                Segera konfirmasi penerimaan dan perbarui catatan penanganan berkala
                            </p>
                        </div>

                        <Link href="/opd/tugas" className="text-xs font-semibold text-[#216B49] hover:underline">
                            Lihat Semua Tugas
                        </Link>
                    </div>

                    {pendingTasks.length === 0 ? (
                        <p className="text-xs text-[#68716B] py-8 text-center">
                            Tidak ada tugas baru atau aktif yang membutuhkan tindakan instansi Anda saat ini.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {pendingTasks.map((asg) => (
                                <div
                                    key={asg.id}
                                    className="p-4 rounded-xl border border-[#DDE3DE] hover:border-[#216B49] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F3F7F4]/40"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-[#68716B]">
                                                {asg.report.tracking_code}
                                            </span>
                                            <StatusBadge status={asg.assignment_status} size="sm" />
                                            {asg.report.category && (
                                                <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DDE3DE] text-[#343B36]">
                                                    {asg.report.category.name}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-semibold text-sm text-[#171C19]">
                                            {asg.report.title}
                                        </h3>

                                        <div className="text-xs text-[#68716B]">
                                            Lokasi: {asg.report.regency_city}, {asg.report.province} • Ditugaskan:{' '}
                                            {new Date(asg.assigned_at).toLocaleString('id-ID')}
                                        </div>
                                    </div>

                                    <div className="shrink-0 flex items-center gap-2">
                                        <Link
                                            href={`/opd/tugas/${asg.id}`}
                                            className="px-4 py-2 bg-[#216B49] hover:bg-[#174B35] text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5"
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
            </main>

            <Footer />
        </div>
    );
}
