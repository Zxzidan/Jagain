import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Building, Plus, ArrowLeft, CheckCircle2, XCircle, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

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
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title="Kelola Instansi / OPD — Admin JAGAIN" />

            {/* Admin Header Card */}
            <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-xs text-[#216B49] font-bold uppercase tracking-wider mb-0.5">
                            Konfigurasi Penanganan & Organisasi
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#171C19] flex items-center gap-2">
                            <Building className="size-5 text-[#174B35]" />
                            Pengelolaan Instansi & OPD Penanganan ({agencies.length})
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/dashboard"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174B35] hover:underline"
                        >
                            <ArrowLeft className="size-3.5" />
                            Kembali ke Dashboard
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#216B49] text-white rounded-xl hover:bg-[#174B35] transition-all shadow-xs active:scale-[0.98]"
                        >
                            <Plus className="size-3.5" />
                            Tambah Instansi Baru
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className="bg-white border border-[#DDE3DE] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F3F7F4] border-b border-[#DDE3DE] text-[#343B36] uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="py-3.5 px-4">Kode Unik</th>
                                    <th className="py-3.5 px-4">Nama Lengkap Instansi</th>
                                    <th className="py-3.5 px-4">Tipe Organisasi</th>
                                    <th className="py-3.5 px-4">Wilayah Kewenangan</th>
                                    <th className="py-3.5 px-4">Kontak Resmi</th>
                                    <th className="py-3.5 px-4">Status & Beban</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DDE3DE]">
                                {agencies.map((agency) => (
                                    <tr key={agency.id} className="hover:bg-[#F3F7F4]/50 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-bold text-[#171C19]">
                                            {agency.code}
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-[#171C19]">
                                            {agency.name}
                                        </td>
                                        <td className="py-3.5 px-4 text-[#68716B]">
                                            <span className="px-2 py-0.5 rounded-full bg-[#F3F7F4] border border-[#DDE3DE] font-semibold text-[10px]">
                                                {agency.agency_type}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-[#174B35]">
                                            {agency.jurisdiction}
                                        </td>
                                        <td className="py-3.5 px-4 text-[11px] text-[#68716B]">
                                            <div>{agency.contact_email || '-'}</div>
                                            <div className="font-mono">{agency.contact_phone || '-'}</div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                        agency.is_active
                                                            ? 'bg-[#E8F1EB] text-[#174B35]'
                                                            : 'bg-[#F3F7F4] text-[#68716B]'
                                                    }`}
                                                >
                                                    {agency.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                                <span className="text-[11px] text-[#68716B] font-mono">
                                                    {agency.assignments_count} tugas
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleToggle(agency.id)}
                                                className={`px-3 py-1 text-xs font-semibold border rounded-lg transition-colors ${
                                                    agency.is_active
                                                        ? 'border-[#DDE3DE] hover:bg-[#F3F7F4] text-[#68716B]'
                                                        : 'border-[#216B49] bg-[#E8F1EB] text-[#174B35] hover:bg-[#216B49] hover:text-white'
                                                }`}
                                            >
                                                {agency.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Tambah Instansi */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#DDE3DE] space-y-6">
                            <div className="flex items-center justify-between border-b border-[#DDE3DE] pb-4">
                                <div>
                                    <h3 className="font-bold text-base text-[#171C19]">
                                        Tambah Instansi Penanganan Baru
                                    </h3>
                                    <p className="text-xs text-[#68716B] mt-0.5">
                                        Daftarkan OPD berwenang untuk menerima penugasan karhutla
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="size-8 rounded-lg bg-[#F3F7F4] hover:bg-[#E8F1EB] flex items-center justify-center text-xs font-bold text-[#68716B] hover:text-[#171C19] transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Nama Lengkap Instansi:
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: BPBD Kabupaten Sintang"
                                        className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] bg-white"
                                        required
                                    />
                                    {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                            Kode Unik (Identitas):
                                        </label>
                                        <input
                                            type="text"
                                            value={data.code}
                                            onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                            placeholder="BPBD-SINTANG"
                                            className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#216B49] bg-white"
                                            required
                                        />
                                        {errors.code && <p className="text-[11px] text-red-600 mt-1">{errors.code}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                            Tipe Organisasi:
                                        </label>
                                        <select
                                            value={data.agency_type}
                                            onChange={(e) => setData('agency_type', e.target.value)}
                                            className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] bg-white focus:outline-none focus:ring-2 focus:ring-[#216B49]"
                                        >
                                            {Object.entries(agencyTypes).map(([k]) => (
                                                <option key={k} value={k}>
                                                    {k}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                        Wilayah Kewenangan (Provinsi):
                                    </label>
                                    <select
                                        value={data.jurisdiction}
                                        onChange={(e) => setData('jurisdiction', e.target.value)}
                                        className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] bg-white focus:outline-none focus:ring-2 focus:ring-[#216B49]"
                                    >
                                        {jurisdictions.map((j) => (
                                            <option key={j} value={j}>
                                                {j}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                            Email Kontak Resmi:
                                        </label>
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            placeholder="pusdalops@bpbd..."
                                            className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#171C19] mb-1.5">
                                            Telepon Kantor / Posko:
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            placeholder="0561-..."
                                            className="w-full text-xs p-3 rounded-xl border border-[#DDE3DE] focus:outline-none focus:ring-2 focus:ring-[#216B49] bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#DDE3DE]">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-xs font-semibold text-[#68716B] hover:text-[#171C19]"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 bg-[#216B49] text-white font-bold text-xs rounded-xl hover:bg-[#174B35] transition-all shadow-xs active:scale-[0.98]"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Instansi'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
