import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StatusBadge from '@/components/status-badge';
import { FileText, Search, RotateCcw, ArrowRight, ArrowLeft, Filter } from 'lucide-react';

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
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 text-[#141413] bg-[#f0eee6] min-h-screen">
            <Head title="Antrean Pemeriksaan Laporan — Admin JAGAIN" />

            {/* Header Bar */}
            <div className="border-b border-[#cccbc8] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider uppercase text-[#87867f]">
                        <FileText className="size-3.5 text-[#d97757]" />
                        <span>Pusat Review & Moderasi Admin</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif text-[#141413] flex items-center gap-2">
                        <span>Antrean Seluruh Laporan Karhutla ({reports.total} Total)</span>
                    </h1>
                    <p className="font-serif text-xs sm:text-sm text-[#87867f]">
                        Tinjau keabsahan koordinat, periksa duplikasi, dan disposisikan laporan ke instansi terkait.
                    </p>
                </div>

                <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413] hover:text-[#d97757] hover:underline"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Kembali ke Dashboard</span>
                </Link>
            </div>

            <div className="space-y-6 font-sans">
                {/* Search & Multi-Filter Bar */}
                <form
                    onSubmit={handleApply}
                    className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
                >
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul, kode, kabupaten..."
                            className="w-full text-xs p-2.5 pl-8 rounded-[8px] border border-[#cccbc8] focus:outline-none focus:ring-1 focus:ring-[#141413] bg-[#faf9f5] text-[#141413]"
                        />
                        <Search className="size-3.5 text-[#87867f] absolute left-2.5 top-3" />
                    </div>

                    <div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-[8px] border border-[#cccbc8] focus:outline-none focus:ring-1 focus:ring-[#141413] bg-[#faf9f5] text-[#141413]"
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
                            className="w-full text-xs p-2.5 rounded-[8px] border border-[#cccbc8] focus:outline-none focus:ring-1 focus:ring-[#141413] bg-[#faf9f5] text-[#141413]"
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
                            className="w-full text-xs p-2.5 rounded-[8px] border border-[#cccbc8] focus:outline-none focus:ring-1 focus:ring-[#141413] bg-[#faf9f5] text-[#141413]"
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
                            className="flex-1 py-2.5 px-4 bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5] font-semibold text-xs rounded-[8px] transition-colors flex items-center justify-center gap-1.5"
                        >
                            <Filter className="size-3.5" />
                            <span>Filter</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="p-2.5 border border-[#cccbc8] hover:bg-[#e3dacc] text-[#87867f] rounded-[8px] transition-colors"
                            title="Reset Filter"
                        >
                            <RotateCcw className="size-3.5" />
                        </button>
                    </div>
                </form>

                {/* Table */}
                <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#f0eee6] border-b border-[#cccbc8] text-[#87867f] uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="py-4 px-5">Kode Lacak</th>
                                    <th className="py-4 px-5">Judul Laporan</th>
                                    <th className="py-4 px-5">Kategori & Lokasi</th>
                                    <th className="py-4 px-5">Status Laporan</th>
                                    <th className="py-4 px-5">OPD Ditugaskan</th>
                                    <th className="py-4 px-5">Waktu</th>
                                    <th className="py-4 px-5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#cccbc8]">
                                {reports.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-14 text-center text-[#87867f] font-serif">
                                            Tidak ada laporan yang sesuai dengan kriteria filter saat ini.
                                        </td>
                                    </tr>
                                ) : (
                                    reports.data.map((report) => (
                                        <tr key={report.id} className="hover:bg-[#f0eee6]/60 transition-colors">
                                            <td className="py-4 px-5 font-mono text-[#141413] whitespace-nowrap">
                                                <span className="px-2 py-0.5 rounded-[3px] bg-[#f0eee6] border border-[#cccbc8] text-[11px]">
                                                    {report.tracking_code}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5 max-w-xs">
                                                <div className="font-semibold text-[#141413] truncate">{report.title}</div>
                                                <div className="text-[11px] text-[#87867f] truncate font-serif">
                                                    Pelapor: {report.created_by_user?.name || 'Anonim Warga'}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-[#87867f]">
                                                <div className="text-[11px] font-semibold text-[#141413]">
                                                    {report.category?.name || 'Umum'}
                                                </div>
                                                <div className="truncate text-[11px] font-serif">
                                                    {report.regency_city}, {report.province}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 whitespace-nowrap">
                                                <StatusBadge status={report.report_status} size="sm" />
                                            </td>
                                            <td className="py-4 px-5 whitespace-nowrap">
                                                {report.latest_assignment?.agency ? (
                                                    <span className="text-[#141413] font-semibold text-[11px]">
                                                        {report.latest_assignment.agency.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-[#87867f] text-[11px] font-serif italic">Belum Ditugaskan</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-5 font-mono text-[11px] text-[#87867f] whitespace-nowrap">
                                                {new Date(report.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="py-4 px-5 text-right whitespace-nowrap">
                                                <Link
                                                    href={`/admin/laporan/${report.id}`}
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#141413] hover:text-[#d97757]"
                                                >
                                                    <span>Periksa</span>
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
                {reports.last_page > 1 && (
                    <div className="p-4 border border-[#cccbc8] bg-[#faf9f5] rounded-[16px] flex items-center justify-between text-xs">
                        <span className="text-[#87867f]">
                            Halaman {reports.current_page} dari {reports.last_page}
                        </span>
                        <div className="flex items-center gap-1.5">
                            {reports.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    className={`px-3 py-1 rounded-[6px] text-xs border ${
                                        link.active
                                            ? 'bg-[#141413] text-[#faf9f5] border-[#141413]'
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
