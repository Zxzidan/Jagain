import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import { Building, ArrowLeft, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen bg-[#f0eee6] text-[#141413] p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title={`Daftar Penugasan ${agency.code} — JAGAIN`} />

            {/* Header Bar */}
            <div className="border-b border-[#cccbc8] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#87867f]">
                        <Building className="size-3.5 text-[#141413]" />
                        <span>{agency.name} ({agency.code})</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
                        Daftar Penugasan Lapangan
                    </h1>
                    <p className="text-sm font-sans text-[#87867f]">
                        Tugas penanganan kebakaran hutan dan lahan yang didelegasikan oleh administrator kepada instansi Anda ({assignments.total} total penugasan).
                    </p>
                </div>

                <Link
                    href="/opd/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#141413] hover:text-[#d97757] transition-colors self-start sm:self-center"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Kembali ke Dashboard OPD</span>
                </Link>
            </div>

            <div className="space-y-4">
                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <button
                        type="button"
                        onClick={() => handleFilterChange('')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors border ${
                            !status
                                ? 'bg-[#141413] text-[#faf9f5] border-[#141413] font-medium'
                                : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc]'
                        }`}
                    >
                        Semua Status ({assignments.total})
                    </button>
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleFilterChange(opt.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors border ${
                                status === opt.value
                                    ? 'bg-[#141413] text-[#faf9f5] border-[#141413] font-medium'
                                    : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc]'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#e3dacc]/40 border-b border-[#cccbc8] text-[#141413] uppercase tracking-wider text-[11px] font-sans font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Kode Lacak Laporan</th>
                                    <th className="py-3 px-4">Judul Kejadian</th>
                                    <th className="py-3 px-4">Wilayah Operasi</th>
                                    <th className="py-3 px-4">Status Penugasan</th>
                                    <th className="py-3 px-4">Waktu Ditugaskan</th>
                                    <th className="py-3 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#cccbc8]/60">
                                {assignments.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-[#87867f] font-serif text-sm">
                                            Tidak ada penugasan yang sesuai dengan kriteria filter ini.
                                        </td>
                                    </tr>
                                ) : (
                                    assignments.data.map((asg) => (
                                        <tr key={asg.id} className="hover:bg-[#f0eee6]/60 transition-colors">
                                            <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                                                <span className="px-2 py-0.5 rounded bg-[#e3dacc]/70 text-[#141413] border border-[#cccbc8] text-[11px] font-medium">
                                                    {asg.report.tracking_code}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 max-w-xs">
                                                <div className="font-serif font-semibold text-sm text-[#141413] truncate">{asg.report.title}</div>
                                                {asg.notes && (
                                                    <div className="text-[11px] font-sans text-[#87867f] truncate mt-0.5">
                                                        Instruksi: {asg.notes}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 font-sans text-[#87867f]">
                                                {asg.report.regency_city}, {asg.report.province}
                                            </td>
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <StatusBadge status={asg.assignment_status} size="sm" />
                                            </td>
                                            <td className="py-3.5 px-4 font-mono text-[11px] text-[#87867f] whitespace-nowrap">
                                                {new Date(asg.assigned_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                <Link
                                                    href={`/opd/tugas/${asg.id}`}
                                                    className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#141413] hover:text-[#d97757] transition-colors"
                                                >
                                                    <span>Tindak Lanjut</span>
                                                    <ArrowRight className="size-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {assignments.last_page > 1 && (
                    <div className="p-3 border border-[#cccbc8] bg-[#faf9f5] rounded-xl flex items-center justify-between text-xs">
                        <span className="text-[#87867f] font-sans">
                            Halaman {assignments.current_page} dari {assignments.last_page}
                        </span>
                        <div className="flex items-center gap-1">
                            {assignments.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    className={`px-3 py-1 rounded text-xs border font-sans ${
                                        link.active
                                            ? 'bg-[#141413] text-[#faf9f5] border-[#141413] font-medium'
                                            : 'bg-[#faf9f5] text-[#141413] border-[#cccbc8] hover:bg-[#e3dacc] disabled:opacity-40'
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
