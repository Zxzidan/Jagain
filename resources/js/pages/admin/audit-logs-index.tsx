import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Shield, Search, ArrowLeft, Clock, User, Terminal, Filter } from 'lucide-react';

interface AuditItem {
    id: number;
    action: string;
    entity_type: string;
    entity_id: number;
    before_snapshot?: Record<string, any> | null;
    after_snapshot?: Record<string, any> | null;
    reason?: string | null;
    request_id?: string | null;
    ip_address?: string | null;
    created_at: string;
    actor_user?: { name: string; email: string } | null;
}

interface AuditLogsIndexProps {
    logs: {
        data: AuditItem[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    actions: string[];
    filters: {
        action?: string;
        search?: string;
    };
}

export default function AuditLogsIndex({ logs, actions, filters }: AuditLogsIndexProps) {
    const [action, setAction] = useState(filters.action || '');
    const [search, setSearch] = useState(filters.search || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/audit-logs',
            {
                action: action || undefined,
                search: search || undefined,
            },
            { preserveState: true }
        );
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title="Audit Trail Log Sistem — Admin JAGAIN" />

            {/* Admin Header Card */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-xs text-[#216B49] font-bold uppercase tracking-wider mb-0.5">
                            Akuntabilitas & Integritas Data
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] flex items-center gap-2">
                            <Shield className="size-5 text-[#174B35]" />
                            Audit Trail Log Sistem ({logs.total} Total Entri)
                        </h1>
                    </div>

                    <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174B35] hover:underline"
                    >
                        <ArrowLeft className="size-3.5" />
                        Kembali ke Dashboard Admin
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                {/* Search & Action Filter Bar */}
                <form
                    onSubmit={handleFilter}
                    className="bg-white border border-[#DDE3DE] rounded-2xl p-5 shadow-xs flex flex-wrap gap-3"
                >
                    <div className="flex-1 min-w-[220px] relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari alasan, aksi, ID entitas, atau kata kunci..."
                            className="w-full text-xs p-2.5 pl-8 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-1 focus:ring-[#216B49] bg-white"
                        />
                        <Search className="size-3.5 text-[#68716B] absolute left-2.5 top-3.5" />
                    </div>

                    <div className="w-64">
                        <select
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#DDE3DE] bg-white focus:outline-none focus:ring-1 focus:ring-[#216B49]"
                        >
                            <option value="">Semua Jenis Aksi (Action)</option>
                            {actions.map((act) => (
                                <option key={act} value={act}>
                                    {act}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#216B49] hover:bg-[#174B35] text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 active:scale-[0.98]"
                    >
                        <Filter className="size-3.5" />
                        Filter Log
                    </button>
                </form>

                {/* Table */}
                <div className="bg-white border border-[#DDE3DE] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F3F7F4] border-b border-[#DDE3DE] text-[#343B36] uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="py-3.5 px-4">Waktu (WIB)</th>
                                    <th className="py-3.5 px-4">Aktor Pengubah</th>
                                    <th className="py-3.5 px-4">Aksi / Event</th>
                                    <th className="py-3.5 px-4">Entitas Terkait</th>
                                    <th className="py-3.5 px-4">Catatan / Alasan</th>
                                    <th className="py-3.5 px-4 font-mono">IP / Request ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE3DE]">
                                {logs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-[#68716B]">
                                            Tidak ada riwayat audit log yang cocok dengan filter.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-[#F3F7F4]/40 transition-colors">
                                            <td className="py-3.5 px-4 text-[#68716B] whitespace-nowrap font-mono text-[11px]">
                                                {new Date(item.created_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-[#171C19]">
                                                    {item.actor_user?.name || 'Sistem Otomatis'}
                                                </div>
                                                <div className="text-[10px] text-[#68716B]">
                                                    {item.actor_user?.email || 'system@jagain.internal'}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className="font-mono font-bold text-[10px] text-[#174B35] bg-[#E8F1EB] px-2 py-0.5 rounded-full border border-[#216B49]/20">
                                                    {item.action}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono text-[11px] text-[#343B36]">
                                                {item.entity_type.split('\\').pop()} #{item.entity_id}
                                            </td>
                                            <td className="py-3.5 px-4 max-w-xs text-[#343B36] truncate leading-relaxed">
                                                {item.reason || '-'}
                                            </td>
                                            <td className="py-3.5 px-4 font-mono text-[10px] text-[#68716B]">
                                                <div>{item.ip_address || '127.0.0.1'}</div>
                                                <div className="text-[9px] text-[#68716B] truncate max-w-[120px]">
                                                    {item.request_id || '-'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {logs.last_page > 1 && (
                        <div className="p-4 border-t border-[#DDE3DE] bg-[#F3F7F4] flex items-center justify-between text-xs">
                            <span className="text-[#68716B]">
                                Halaman {logs.current_page} dari {logs.last_page}
                            </span>
                            <div className="flex items-center gap-1">
                                {logs.links.map((link, idx) => (
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
