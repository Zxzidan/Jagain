import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import { Building, ArrowLeft, ArrowRight, MapPin, Clock } from 'lucide-react';

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

interface StatusOption {
    value: string;
    label: string;
    subValues?: string[];
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
    statusOptions: StatusOption[];
}

const defaultStatusOptions: StatusOption[] = [
    { value: 'BARU', label: 'Baru', subValues: ['BARU', 'ASSIGNED', 'RECEIVED_BY_AGENCY'] },
    { value: 'DITANGANI', label: 'Ditangani', subValues: ['DITANGANI', 'IN_PROGRESS'] },
    { value: 'DITINJAU', label: 'Ditinjau', subValues: ['DITINJAU', 'SUBMITTED_FOR_REVIEW'] },
    { value: 'SELESAI', label: 'Selesai', subValues: ['SELESAI', 'COMPLETED', 'DECLINED_BY_AGENCY'] },
];

export default function OpdAssignmentsIndex({
    agency,
    assignments,
    filters,
    statusOptions,
}: AssignmentsIndexProps) {
    const [status, setStatus] = useState(filters.status || '');

    const optionsToRender = statusOptions?.length === 4 ? statusOptions : defaultStatusOptions;

    const isOptionActive = (opt: StatusOption) => {
        if (status === opt.value) return true;
        if (opt.subValues && opt.subValues.includes(status)) return true;
        return false;
    };

    const handleFilterChange = (newStatus: string) => {
        const isCurrentActive = status === newStatus || (optionsToRender.find(o => o.value === newStatus)?.subValues?.includes(status) ?? false);
        const nextStatus = isCurrentActive ? '' : newStatus;
        setStatus(nextStatus);
        router.get(
            '/opd/tugas',
            { status: nextStatus || undefined },
            { preserveState: true }
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAF9] dark:bg-[#0D120F] text-neutral-900 dark:text-neutral-100 p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title={`Daftar Penugasan ${agency.code || agency.name} — JAGAIN`} />

            {/* Header Bar */}
            <div className="border-b border-neutral-200/80 dark:border-neutral-800 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#216B49] dark:text-emerald-400">
                        <Building className="size-3.5" />
                        <span>
                            {agency.name}
                            {agency.code ? ` (${agency.code})` : ''}
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171C19] dark:text-white">
                        Daftar Penugasan Lapangan
                    </h1>
                    <p className="text-xs sm:text-sm text-[#68716B] dark:text-neutral-400 max-w-2xl leading-relaxed">
                        Tugas penanganan kebakaran hutan dan lahan yang didelegasikan kepada instansi Anda ({assignments.total} total penugasan).
                    </p>
                </div>

                <Link
                    href="/opd/dashboard"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-xs font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all shadow-2xs self-start shrink-0"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Kembali ke Dashboard OPD</span>
                </Link>
            </div>

            <div className="space-y-4">
                {/* Filter Tabs (4 ringkas) */}
                <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap text-xs">
                    {optionsToRender.map((opt) => {
                        const active = isOptionActive(opt);
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => handleFilterChange(opt.value)}
                                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                                    active
                                        ? 'bg-[#216B49] text-white border-[#216B49] shadow-xs'
                                        : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-[#E8F1EB] hover:text-[#174B35]'
                                }`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>

                {/* Desktop Table View (>= md) */}
                <div className="hidden md:block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-xs">
                            <thead className="bg-[#F3F7F4] dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase tracking-wider text-[11px] font-bold">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[160px] whitespace-nowrap">Kode Lacak Laporan</th>
                                    <th scope="col" className="py-3.5 px-4 text-center min-w-[280px]">Judul Kejadian</th>
                                    <th scope="col" className="py-3.5 px-4 text-center min-w-[200px]">Wilayah Operasi</th>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[170px] whitespace-nowrap">Status Penugasan</th>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[170px] whitespace-nowrap">Waktu Ditugaskan</th>
                                    <th scope="col" className="py-3.5 px-4 text-center w-[140px] whitespace-nowrap">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {assignments.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-neutral-400 text-xs">
                                            Tidak ada penugasan yang sesuai dengan kriteria filter ini.
                                        </td>
                                    </tr>
                                ) : (
                                    assignments.data.map((asg) => (
                                        <tr key={asg.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="py-4 px-4 align-middle text-center font-mono whitespace-nowrap">
                                                <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-semibold tracking-wide select-all">
                                                    {asg.report.tracking_code}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center">
                                                <div className="space-y-1 max-w-md mx-auto text-center">
                                                    <div className="font-semibold text-xs text-neutral-900 dark:text-white leading-snug">
                                                        {asg.report.title}
                                                    </div>
                                                    {asg.notes && (
                                                        <div className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-2.5 py-1.5 mt-1 inline-block text-center">
                                                            <span className="font-semibold text-neutral-800 dark:text-white">Instruksi: </span>
                                                            <span>{asg.notes}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center">
                                                {(() => {
                                                    const region = [asg.report.regency_city, asg.report.province].filter(Boolean).join(', ');
                                                    const desc = asg.report.location_description;
                                                    if (region && desc) {
                                                        return (
                                                            <div className="space-y-0.5 max-w-[240px] mx-auto text-center">
                                                                <div className="font-medium text-xs text-neutral-900 dark:text-neutral-100">{region}</div>
                                                                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">{desc}</div>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <div className="text-xs text-neutral-900 dark:text-neutral-100 font-medium leading-snug text-center">
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
                                            <td className="py-4 px-4 align-middle text-center whitespace-nowrap font-mono text-xs text-neutral-900 dark:text-neutral-100">
                                                <div className="font-medium">
                                                    {new Date(asg.assigned_at).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                                    {new Date(asg.assigned_at).toLocaleTimeString('id-ID', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}{' '}
                                                    WIB
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 align-middle text-center whitespace-nowrap">
                                                <Link
                                                    href={`/opd/tugas/${asg.id}`}
                                                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-[#216B49] hover:text-white hover:border-[#216B49] text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-2xs transition-all"
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

                {/* Mobile Cards View (< md) */}
                <div className="block md:hidden space-y-3">
                    {assignments.data.length === 0 ? (
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center text-neutral-500 dark:text-neutral-400 text-xs shadow-xs">
                            Tidak ada penugasan yang sesuai dengan kriteria filter ini.
                        </div>
                    ) : (
                        assignments.data.map((asg) => (
                            <div
                                key={asg.id}
                                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3 shadow-xs"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#E8F1EB] text-[#174B35] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                                        {asg.report.tracking_code}
                                    </span>
                                    <StatusBadge status={asg.assignment_status} size="sm" />
                                </div>

                                <div>
                                    <Link
                                        href={`/opd/tugas/${asg.id}`}
                                        className="font-bold text-sm text-[#171C19] dark:text-white leading-snug hover:text-[#216B49] dark:hover:text-emerald-400 transition-colors block"
                                    >
                                        {asg.report.title}
                                    </Link>
                                </div>

                                <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                                    <div className="flex items-start gap-1.5">
                                        <MapPin className="size-3.5 text-[#216B49] dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <span className="leading-snug">
                                            {[asg.report.regency_city, asg.report.province].filter(Boolean).join(', ') || asg.report.location_description || 'Wilayah Terdata Lapangan'}
                                        </span>
                                    </div>
                                    {asg.notes && (
                                        <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                                            <strong className="font-semibold text-neutral-900 dark:text-white">Instruksi: </strong>
                                            {asg.notes}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                                        <Clock className="size-3 text-neutral-400" />
                                        <span>
                                            {new Date(asg.assigned_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                            })} • {new Date(asg.assigned_at).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })} WIB
                                        </span>
                                    </div>

                                    <Link
                                        href={`/opd/tugas/${asg.id}`}
                                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#216B49] hover:bg-[#174B35] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                                    >
                                        <span>Tindak Lanjut</span>
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
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
    );
}
