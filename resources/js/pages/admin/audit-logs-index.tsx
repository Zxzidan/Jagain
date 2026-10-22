import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Shield, Search, ArrowLeft, Filter } from 'lucide-react';

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
        <div className="min-h-screen bg-[#f0eee6] text-[#141413] p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title="Audit Trail Log Sistem — Admin JAGAIN" />

            {/* Header Bar */}
            <div className="border-b border-[#cccbc8] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#87867f]">
                        <Shield className="size-3.5 text-[#141413]" />
                        <span>Akuntabilitas & Integritas Data Permanen</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#141413]">
                        Audit Trail Log Sistem
                    </h1>
                    <p className="text-sm font-sans text-[#87867f]">
                        Rekaman peristiwa mutasi data, otentikasi, dan aksi administratif yang tidak dapat dimanipulasi ({logs.total} total entri).
                    </p>
                </div>

                <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#141413] hover:text-[#d97757] transition-colors self-start sm:self-center"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Kembali ke Dashboard</span>
                </Link>
            </div>

            <div className="space-y-4">
                {/* Search & Action Filter Bar */}
                <form
                    onSubmit={handleFilter}
                    className="bg-[#faf9f5] border border-[#cccbc8] rounded-xl p-4 flex flex-wrap gap-3 items-center"
                >
                    <div className="flex-1 min-w-[240px] relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari alasan, aksi, ID entitas, atau kata kunci..."
                            className="w-full text-xs p-2.5 pl-8 rounded-lg border border-[#cccbc8] focus:outline-none focus:border-[#141413] bg-[#faf9f5] font-sans"
                        />
                        <Search className="size-3.5 text-[#87867f] absolute left-2.5 top-3.5" />
                    </div>

                    <div className="w-64">
                        <select
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#cccbc8] bg-[#faf9f5] focus:outline-none focus:border-[#141413] font-sans"
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
                        className="py-2.5 px-5 bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5] font-sans font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                        <Filter className="size-3" />
                        <span>Terapkan Filter</span>
                    </button>
                </form>

                {/* Audit Log Table */}
                <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#e3dacc]/40 border-b border-[#cccbc8] text-[#141413] uppercase tracking-wider text-[11px] font-sans font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Waktu</th>
                                    <th className="py-3 px-4">Aksi (Action)</th>
                                    <th className="py-3 px-4">Aktor / Pengguna</th>
                                    <th className="py-3 px-4">Entitas Target</th>
                                    <th className="py-3 px-4">Alasan & Catatan</th>
                                    <th className="py-3 px-4">Metadata Permintaan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#cccbc8]/60">
                                {logs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-[#87867f] font-serif text-sm">
                                            Tidak ada entri log yang sesuai dengan filter pencarian.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-[#f0eee6]/60 transition-colors">
                                            <td className="py-3 px-4 font-mono text-[11px] text-[#87867f] whitespace-nowrap">
                                                {new Date(log.created_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-[#e3dacc]/70 text-[#141413] border border-[#cccbc8]">
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-sans font-semibold text-[#141413]">
                                                    {log.actor_user?.name || 'Sistem / Guest'}
                                                </div>
                                                <div className="text-[10px] text-[#87867f] font-mono">
                                                    {log.actor_user?.email || '—'}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-mono text-[11px] text-[#141413] whitespace-nowrap">
                                                {log.entity_type} #{log.entity_id}
                                            </td>
                                            <td className="py-3 px-4 max-w-xs">
                                                <div className="text-xs text-[#141413] line-clamp-2 font-sans">
                                                    {log.reason || '—'}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-mono text-[10px] text-[#87867f]">
                                                <div>IP: {log.ip_address || '—'}</div>
                                                {log.request_id && <div className="truncate max-w-[120px]">Req: {log.request_id}</div>}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {logs.last_page > 1 && (
                    <div className="p-3 border border-[#cccbc8] bg-[#faf9f5] rounded-xl flex items-center justify-between text-xs">
                        <span className="text-[#87867f] font-sans">
                            Halaman {logs.current_page} dari {logs.last_page}
                        </span>
                        <div className="flex items-center gap-1">
                            {logs.links.map((link, idx) => (
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
