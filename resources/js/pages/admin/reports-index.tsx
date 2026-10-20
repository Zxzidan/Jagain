import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import { FileText, Search, RotateCcw, ArrowRight, MapPin, Building, Eye, ArrowLeft, Filter } from 'lucide-react';

interface ReportItem {
    id: number;
    tracking_code: string;
    title: string;
    province: string;
    regency_city: string;
    report_status: string;
    created_at: string;
    category?: { name: string } | null;
    created_by_user?: { name: string; email: string } | null;
    latest_assignment?: { agency?: { name: string } } | null;
}

interface ReportsIndexProps {
    reports: {
        data: ReportItem[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    categories: Array<{ id: number; name: string; slug: string }>;
    provinces: string[];
    filters: {
        status?: string;
        province?: string;
        category?: string;
        search?: string;
    };
    statusOptions: Array<{ value: string; label: string }>;
}

export default function ReportsIndex({
    reports,
    categories,
    provinces,
    filters,
    statusOptions,
}: ReportsIndexProps) {
    const [status, setStatus] = useState(filters.status || '');
    const [province, setProvince] = useState(filters.province || '');
    const [category, setCategory] = useState(filters.category || '');
    const [search, setSearch] = useState(filters.search || '');

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/laporan',
            {
                status: status || undefined,
                province: province || undefined,
                category: category || undefined,
                search: search || undefined,
            },
            { preserveState: true }
        );
    };

    const handleReset = () => {
        setStatus('');
        setProvince('');
        setCategory('');
        setSearch('');
        router.get('/admin/laporan', {}, { preserveState: true });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title="Antrean Pemeriksaan Laporan — Admin JAGAIN" />

            {/* Admin Header Card */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-xs text-[#216B49] font-bold uppercase tracking-wider mb-0.5">
                            Pusat Review & Moderasi Admin
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] flex items-center gap-2">
                            <FileText className="size-5 text-[#174B35]" />
                            Antrean Seluruh Laporan Karhutla ({reports.total} Total)
                        </h1>
                    </div>

                    <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174B35] hover:underline"
                    >
                        <ArrowLeft className="size-3.5" />
                        Kembali ke Ringkasan Dashboard
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                {/* Search & Multi-Filter Bar */}
                <form
                    onSubmit={handleApply}
                    className="bg-white border border-[#DDE3DE] rounded-2xl p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
                >
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul, kode, kabupaten..."
                            className="w-full text-xs p-2.5 pl-8 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-1 focus:ring-[#216B49] bg-white"
                        />
                        <Search className="size-3.5 text-[#68716B] absolute left-2.5 top-3.5" />
                    </div>

                    <div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-1 focus:ring-[#216B49] bg-white"
                        >
                            <option value="">Semua Status Laporan</option>
                            {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-1 focus:ring-[#216B49] bg-white"
                        >
                            <option value="">Semua Provinsi Kalimantan</option>
                            {provinces.map((prov) => (
                                <option key={prov} value={prov}>
                                    {prov}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-1 focus:ring-[#216B49] bg-white"
                        >
                            <option value="">Semua Kategori Insiden</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.slug}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            className="flex-1 py-2.5 px-4 bg-[#216B49] hover:bg-[#174B35] text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.98]"
                        >
                            <Filter className="size-3.5" />
                            Terapkan Filter
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="p-2.5 border border-[#DDE3DE] hover:bg-[#F3F7F4] text-[#68716B] rounded-xl transition-colors"
                            title="Reset Filter"
                        >
                            <RotateCcw className="size-3.5" />
                        </button>
                    </div>
                </form>

                {/* Table */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F3F7F4] border-b border-[#DDE3DE] text-[#343B36] uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="py-3.5 px-4">Kode Lacak</th>
                                    <th className="py-3.5 px-4">Judul Laporan</th>
                                    <th className="py-3.5 px-4">Kategori & Lokasi</th>
                                    <th className="py-3.5 px-4">Status Laporan</th>
                                    <th className="py-3.5 px-4">OPD Ditugaskan</th>
                                    <th className="py-3.5 px-4">Waktu</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE3DE]">
                                {reports.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-[#68716B]">
                                            Tidak ada laporan yang sesuai dengan kriteria filter saat ini.
                                        </td>
                                    </tr>
                                ) : (
                                    reports.data.map((report) => (
                                        <tr key={report.id} className="hover:bg-[#F3F7F4]/60 transition-colors">
                                            <td className="py-3.5 px-4 font-mono font-bold text-[#171C19]">
                                                {report.tracking_code}
                                            </td>
                                            <td className="py-3.5 px-4 font-bold text-[#171C19] max-w-xs truncate">
                                                {report.title}
                                            </td>
                                            <td className="py-3.5 px-4 text-[#343B36]">
                                                <div className="font-semibold text-[#174B35]">
                                                    {report.category?.name || 'Umum'}
                                                </div>
                                                <div className="text-[11px] text-[#68716B]">
                                                    {report.regency_city}, {report.province}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <StatusBadge status={report.report_status} size="sm" />
                                            </td>
                                            <td className="py-3.5 px-4 text-[11px] text-[#343B36]">
                                                {report.latest_assignment?.agency ? (
                                                    <span className="font-semibold text-[#174B35]">
                                                        {report.latest_assignment.agency.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-[#68716B] italic">Belum ditugaskan</span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 text-[11px] text-[#68716B] whitespace-nowrap font-mono">
                                                {new Date(report.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="py-3.5 px-4 text-right">
                                                <Link
                                                    href={`/admin/laporan/${report.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#216B49] hover:bg-[#174B35] text-white font-bold rounded-lg text-xs transition-colors shadow-xs active:scale-[0.98]"
                                                >
                                                    <Eye className="size-3" />
                                                    Periksa
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {reports.last_page > 1 && (
                        <div className="p-4 border-t border-[#DDE3DE] bg-[#F3F7F4] flex items-center justify-between text-xs">
                            <span className="text-[#68716B]">
                                Menampilkan halaman {reports.current_page} dari {reports.last_page}
                            </span>
                            <div className="flex items-center gap-1">
                                {reports.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        className={`px-3 py-1.5 rounded-lg text-xs border ${
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
            </div>
        </div>
    );
}
