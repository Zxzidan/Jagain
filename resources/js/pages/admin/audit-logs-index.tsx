import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import { Shield, Search, ArrowLeft, Clock, User, Terminal } from 'lucide-react';

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
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title="Audit Trail & Riwayat Sistem — Admin JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            {/* Subnav Header */}
            <div className="bg-white border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-[#216B49] font-bold uppercase tracking-wider mb-0.5">
                            Akuntabilitas & Integritas
                        </div>
                        <h1 className="text-xl font-bold text-[#171C19] flex items-center gap-2">
                            <Shield className="size-5 text-[#174B35]" />
                            Audit Trail Log Sistem ({logs.total} Total Entri)
                        </h1>
                    </div>

                    <Link
                        href="/admin/dashboard"
                        className="text-xs font-semibold text-[#174B35] hover:underline"
                    >
                        ← Kembali ke Dashboard
                    </Link>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Search Bar */}
                <form
                    onSubmit={handleFilter}
                    className="bg-white border border-[#DDE3DE] rounded-xl p-4 shadow-xs flex flex-wrap gap-3"
                >
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari alasan, aksi, atau entitas..."
                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                        />
                    </div>

                    <div className="w-64">
                        <select
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE] bg-white"
                        >
                            <option value="">Semua Aksi</option>
                            {actions.map((act) => (
                                <option key={act} value={act}>
                                    {act}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#216B49] hover:bg-[#174B35] text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                        Filter Log
                    </button>
                </form>

                {/* Table */}
                <div className="bg-white border border-[#DDE3DE] rounded-xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F3F7F4] border-b border-[#DDE3DE] text-[#343B36] uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Waktu</th>
                                    <th className="py-3 px-4">Aktor</th>
                                    <th className="py-3 px-4">Aksi / Event</th>
                                    <th className="py-3 px-4">Entitas Terkait</th>
                                    <th className="py-3 px-4">Catatan / Alasan</th>
                                    <th className="py-3 px-4">IP / ReqID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE3DE]">
                                {logs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-[#68716B]">
                                            Tidak ada riwayat audit log.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-[#F3F7F4]/40">
                                            <td className="py-3 px-4 text-[#68716B] whitespace-nowrap">
                                                {new Date(item.created_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-semibold text-[#171C19]">
                                                    {item.actor_user?.name || 'Sistem Otomatis'}
                                                </div>
                                                <div className="text-[10px] text-[#68716B]">
                                                    {item.actor_user?.email || '-'}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="font-mono font-bold text-[11px] text-[#174B35] bg-[#E8F1EB] px-2 py-0.5 rounded">
                                                    {item.action}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 font-mono text-[11px] text-[#343B36]">
                                                {item.entity_type.split('\\').pop()} #{item.entity_id}
                                            </td>
                                            <td className="py-3 px-4 max-w-xs text-[#343B36] truncate">
                                                {item.reason || '-'}
                                            </td>
                                            <td className="py-3 px-4 font-mono text-[10px] text-[#68716B]">
                                                <div>{item.ip_address || '127.0.0.1'}</div>
                                                <div className="text-[9px] text-[#68716B] truncate max-w-[100px]">
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
