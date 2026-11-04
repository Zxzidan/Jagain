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
        province?: string | null;
        regency_city?: string | null;
        location_description?: string | null;
        category?: { name: string } | null;
    };
}

interface AssignmentsIndexProps {
    agency: {
        id: number;
        name: string;
        code?: string | null;
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
        <div className="min-h-screen bg-white text-neutral-900 p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title={`Daftar Penugasan ${agency.code || agency.name} — JAGAIN`} />

            {/* Header Bar */}
            <div className="border-b border-neutral-200 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-neutral-500 font-semibold">
                        <Building className="size-3.5 text-neutral-700" />
                        <span>
                            {agency.name}
                            {agency.code ? ` (${agency.code})` : ''}
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                        Daftar Penugasan Lapangan
                    </h1>
                    <p className="text-sm font-sans text-neutral-500">
                        Tugas penanganan kebakaran hutan dan lahan yang didelegasikan oleh administrator kepada instansi Anda ({assignments.total} total penugasan).
                    </p>
                </div>

                <Link
                    href="/opd/dashboard"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-xs font-sans font-medium text-neutral-700 transition-all shadow-xs self-start sm:self-center"
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
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all border ${
                            !status
                                ? 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-xs'
                                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-300 font-medium'
                        }`}
                    >
                        Semua Status ({assignments.total})
                    </button>
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleFilterChange(opt.value)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all border ${
                                status === opt.value
                                    ? 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-xs'
                                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-300 font-medium'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-xs">
                            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-700 uppercase tracking-wider text-[11px] font-sans font-bold">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[160px] whitespace-nowrap">Kode Lacak Laporan</th>
                                    <th scope="col" className="py-3.5 px-4 text-center min-w-[280px]">Judul Kejadian</th>
                                    <th scope="col" className="py-3.5 px-4 text-center min-w-[200px]">Wilayah Operasi</th>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[170px] whitespace-nowrap">Status Penugasan</th>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[170px] whitespace-nowrap">Waktu Ditugaskan</th>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[140px] whitespace-nowrap">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {assignments.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-neutral-500 font-sans text-sm">
                                            Tidak ada penugasan yang sesuai dengan kriteria filter ini.
                                        </td>
                                    </tr>
                                ) : (
                                    assignments.data.map((asg) => (
                                        <tr key={asg.id} className="hover:bg-neutral-50/70 transition-colors">
                                            <td className="py-4 px-4 align-middle text-center font-mono whitespace-nowrap">
                                                <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-mono font-semibold tracking-wide whitespace-nowrap select-all">
                                                    {asg.report.tracking_code}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center">
                                                <div className="space-y-1 max-w-md mx-auto text-center">
                                                    <div className="font-semibold text-xs text-neutral-900 leading-snug">
                                                        {asg.report.title}
                                                    </div>
                                                    {asg.notes && (
                                                        <div className="text-[11px] font-sans text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-200 rounded-md px-2.5 py-1.5 mt-1 inline-block text-center">
                                                            <span className="font-semibold text-neutral-800">Instruksi: </span>
                                                            <span>{asg.notes}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center font-sans">
                                                {(() => {
                                                    const region = [asg.report.regency_city, asg.report.province].filter(Boolean).join(', ');
                                                    const desc = asg.report.location_description;
                                                    if (region && desc) {
                                                        return (
                                                            <div className="space-y-0.5 max-w-[240px] mx-auto text-center">
                                                                <div className="font-medium text-xs text-neutral-900">{region}</div>
                                                                <div className="text-[11px] text-neutral-500 leading-snug">{desc}</div>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <div className="text-xs text-neutral-900 font-medium leading-snug text-center">
                                                            {region || desc || 'Wilayah Terdata Lapangan'}
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center whitespace-nowrap">
                                                <div className="inline-flex justify-center">
                                                    <StatusBadge status={asg.assignment_status} size="sm" />
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center whitespace-nowrap font-mono text-xs text-neutral-900">
                                                <div className="font-medium">
                                                    {new Date(asg.assigned_at).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <div className="text-[11px] text-neutral-500">
                                                    {new Date(asg.assigned_at).toLocaleTimeString('id-ID', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                    })}{' '}
                                                    WIB
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center whitespace-nowrap">
                                                <Link
                                                    href={`/opd/tugas/${asg.id}`}
                                                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 text-xs font-sans font-semibold text-neutral-800 shadow-2xs transition-all"
                                                >
                                                    <span>Tindak Lanjut</span>
                                                    <ArrowRight className="size-3.5" />
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
                    <div className="p-3.5 border border-neutral-200 bg-white rounded-xl flex items-center justify-between text-xs">
                        <span className="text-neutral-500 font-sans font-medium">
                            Halaman {assignments.current_page} dari {assignments.last_page}
                        </span>
                        <div className="flex items-center gap-1">
                            {assignments.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    className={`px-3 py-1 rounded-lg text-xs border font-sans transition-all ${
                                        link.active
                                            ? 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-xs'
                                            : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 disabled:opacity-40 font-medium'
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
