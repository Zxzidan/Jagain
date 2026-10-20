import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import EmergencyBanner from '@/components/emergency-banner';
import { Building, Plus, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

interface AgencyItem {
    id: number;
    name: string;
    code: string;
    agency_type: string;
    jurisdiction: string;
    contact_email?: string | null;
    contact_phone?: string | null;
    is_active: boolean;
    memberships_count: number;
    assignments_count: number;
}

interface AgenciesIndexProps {
    agencies: AgencyItem[];
    jurisdictions: string[];
    agencyTypes: Record<string, string>;
}

export default function AgenciesIndex({ agencies, jurisdictions, agencyTypes }: AgenciesIndexProps) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
        agency_type: 'BPBD',
        jurisdiction: jurisdictions[0] || 'Kalimantan Barat',
        contact_email: '',
        contact_phone: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/instansi', {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const handleToggle = (agencyId: number) => {
        post(`/admin/instansi/${agencyId}/toggle`, {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F3F7F4] text-[#171C19]">
            <Head title="Kelola Instansi / OPD — Admin JAGAIN" />
            <EmergencyBanner />
            <Navbar />

            {/* Subnav Header */}
            <div className="bg-white border-b border-[#DDE3DE] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-[#216B49] font-bold uppercase tracking-wider mb-0.5">
                            Konfigurasi Penanganan
                        </div>
                        <h1 className="text-xl font-bold text-[#171C19] flex items-center gap-2">
                            <Building className="size-5 text-[#174B35]" />
                            Pengelolaan Instansi & OPD Kalimantan ({agencies.length})
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/dashboard"
                            className="text-xs font-semibold text-[#174B35] hover:underline"
                        >
                            ← Kembali ke Dashboard
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#216B49] text-white rounded-md hover:bg-[#174B35] transition-colors"
                        >
                            <Plus className="size-3.5" />
                            Tambah Instansi
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white border border-[#DDE3DE] rounded-xl overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#F3F7F4] border-b border-[#DDE3DE] text-[#343B36] uppercase tracking-wider text-[11px] font-semibold">
                            <tr>
                                <th className="py-3 px-4">Kode</th>
                                <th className="py-3 px-4">Nama Instansi</th>
                                <th className="py-3 px-4">Tipe</th>
                                <th className="py-3 px-4">Wilayah Kewenangan</th>
                                <th className="py-3 px-4">Kontak</th>
                                <th className="py-3 px-4">Status & Beban</th>
                                <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDE3DE]">
                            {agencies.map((agency) => (
                                <tr key={agency.id} className="hover:bg-[#F3F7F4]/50">
                                    <td className="py-3.5 px-4 font-mono font-bold text-[#171C19]">
                                        {agency.code}
                                    </td>
                                    <td className="py-3.5 px-4 font-semibold text-[#171C19]">
                                        {agency.name}
                                    </td>
                                    <td className="py-3.5 px-4 text-[#68716B]">
                                        {agency.agency_type}
                                    </td>
                                    <td className="py-3.5 px-4 font-medium text-[#174B35]">
                                        {agency.jurisdiction}
                                    </td>
                                    <td className="py-3.5 px-4 text-[11px] text-[#68716B]">
                                        <div>{agency.contact_email || '-'}</div>
                                        <div>{agency.contact_phone || '-'}</div>
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                    agency.is_active
                                                        ? 'bg-[#E8F1EB] text-[#174B35]'
                                                        : 'bg-[#F3F7F4] text-[#68716B]'
                                                }`}
                                            >
                                                {agency.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                            <span className="text-[11px] text-[#68716B]">
                                                {agency.assignments_count} tugas
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(agency.id)}
                                            className="px-2.5 py-1 text-xs border border-[#DDE3DE] rounded hover:bg-[#F3F7F4] text-[#343B36]"
                                        >
                                            {agency.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal Tambah Instansi */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DDE3DE] space-y-4">
                            <div className="flex items-center justify-between border-b border-[#DDE3DE] pb-3">
                                <h3 className="font-bold text-sm text-[#171C19]">
                                    Tambah Instansi Penanganan Baru
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="text-xs text-[#68716B] hover:text-[#171C19]"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1">
                                        Nama Lengkap Instansi:
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: BPBD Kabupaten Sintang"
                                        className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                                        required
                                    />
                                    {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1">
                                            Kode Unik:
                                        </label>
                                        <input
                                            type="text"
                                            value={data.code}
                                            onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                            placeholder="BPBD-SINTANG"
                                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE] font-mono"
                                            required
                                        />
                                        {errors.code && <p className="text-[11px] text-red-600 mt-0.5">{errors.code}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1">
                                            Tipe Instansi:
                                        </label>
                                        <select
                                            value={data.agency_type}
                                            onChange={(e) => setData('agency_type', e.target.value)}
                                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE] bg-white"
                                        >
                                            {Object.entries(agencyTypes).map(([k, label]) => (
                                                <option key={k} value={k}>
                                                    {k}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1">
                                        Wilayah Kewenangan (Provinsi):
                                    </label>
                                    <select
                                        value={data.jurisdiction}
                                        onChange={(e) => setData('jurisdiction', e.target.value)}
                                        className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE] bg-white"
                                    >
                                        {jurisdictions.map((j) => (
                                            <option key={j} value={j}>
                                                {j}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1">
                                            Email Kontak:
                                        </label>
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            placeholder="pusdalops@..."
                                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1">
                                            Telepon Kantor:
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            placeholder="0561-..."
                                            className="w-full text-xs p-2.5 rounded-lg border border-[#DDE3DE]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#DDE3DE]">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-3 py-1.5 text-xs text-[#68716B] hover:text-[#171C19]"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-[#216B49] text-white font-semibold text-xs rounded-lg hover:bg-[#174B35]"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Instansi'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
