import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import StatusBadge from '@/components/status-badge';
import { Building, FileText, ArrowLeft, ArrowRight, Eye } from 'lucide-react';

interface AssignmentItem {
    id: number;
    assignment_status: string;
    assigned_at: string;
    notes?: string | null;
    report: {
        id: number;
        tracking_code: string;
        title: string;
        province: string;
        regency_city: string;
        category?: { name: string } | null;
    };
}

interface AssignmentsIndexProps {
    agency: {
        id: number;
        name: string;
        code: string;
    };
    assignments: {
        data: AssignmentItem[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: {
        status?: string;
    };
    statusOptions: Array<{ value: string; label: string }>;
}

export default function OpdAssignmentsIndex({
    agency,
    assignments,
    filters,
    statusOptions,
}: AssignmentsIndexProps) {
    const [status, setStatus] = useState(filters.status || '');

    const handleFilterChange = (newStatus: string) => {
        setStatus(newStatus);
        router.get(
            '/opd/tugas',
            { status: newStatus || undefined },
            { preserveState: true }
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title={`Daftar Penugasan ${agency.code} — JAGAIN`} />
            <EmergencyBanner />
            <Navbar />

            {/* Subnav Header */}
            <div className="bg-white border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-[#216B49] font-bold uppercase tracking-wider mb-0.5">
                            {agency.name}
                        </div>
                        <h1 className="text-xl font-bold text-[#171C19] flex items-center gap-2">
                            <Building className="size-5 text-[#174B35]" />
                            Daftar Penugasan Karhutla ({assignments.total})
                        </h1>
                    </div>

                    <Link
                        href="/opd/dashboard"
                        className="text-xs font-semibold text-[#174B35] hover:underline"
                    >
                        ← Kembali ke Dashboard OPD
                    </Link>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleFilterChange('')}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                            !status
                                ? 'bg-[#174B35] text-white border-[#174B35]'
                                : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Semua Status
                    </button>
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleFilterChange(opt.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                status === opt.value
                                    ? 'bg-[#174B35] text-white border-[#174B35]'
                                    : 'bg-white text-[#343B36] border-[#DDE3DE] hover:bg-[#F3F7F4]'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white border border-[#DDE3DE] rounded-xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F3F7F4] border-b border-[#DDE3DE] text-[#343B36] uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Kode Laporan</th>
                                    <th className="py-3 px-4">Judul Insiden</th>
                                    <th className="py-3 px-4">Kategori & Lokasi</th>
                                    <th className="py-3 px-4">Status Tugas</th>
                                    <th className="py-3 px-4">Waktu Penugasan</th>
                                    <th className="py-3 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE3DE]">
                                {assignments.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-[#68716B]">
                                            Tidak ada penugasan dengan status ini.
                                        </td>
                                    </tr>
                                ) : (
                                    assignments.data.map((asg) => (
                                        <tr key={asg.id} className="hover:bg-[#F3F7F4]/50">
                                            <td className="py-3.5 px-4 font-mono font-bold text-[#171C19]">
                                                {asg.report.tracking_code}
                                            </td>
                                            <td className="py-3.5 px-4 font-semibold text-[#171C19] max-w-xs truncate">
                                                {asg.report.title}
                                            </td>
                                            <td className="py-3.5 px-4 text-[#343B36]">
                                                <div className="font-medium text-[#174B35]">
                                                    {asg.report.category?.name || 'Umum'}
                                                </div>
                                                <div className="text-[11px] text-[#68716B]">
                                                    {asg.report.regency_city}, {asg.report.province}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <StatusBadge status={asg.assignment_status} size="sm" />
                                            </td>
                                            <td className="py-3.5 px-4 text-[11px] text-[#68716B] whitespace-nowrap">
                                                {new Date(asg.assigned_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-3.5 px-4 text-right">
                                                <Link
                                                    href={`/opd/tugas/${asg.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#216B49] hover:bg-[#174B35] text-white font-semibold rounded text-xs transition-colors"
                                                >
                                                    <Eye className="size-3" />
                                                    Tindak Lanjut
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {assignments.last_page > 1 && (
                        <div className="p-4 border-t border-[#DDE3DE] bg-[#F3F7F4] flex items-center justify-between text-xs">
                            <span className="text-[#68716B]">
                                Halaman {assignments.current_page} dari {assignments.last_page}
                            </span>
                            <div className="flex items-center gap-1">
                                {assignments.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1 rounded text-xs border ${
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
            </main>

            <Footer />
        </div>
    );
}
