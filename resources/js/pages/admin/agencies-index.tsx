import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Building, Plus, ArrowLeft } from 'lucide-react';

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
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 text-[#141413] bg-[#f0eee6] min-h-screen">
            <Head title="Kelola Instansi / OPD — Admin JAGAIN" />

            {/* Header Bar */}
            <div className="border-b border-[#cccbc8] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider uppercase text-[#87867f]">
                        <Building className="size-3.5 text-[#d97757]" />
                        <span>Konfigurasi Organisasi & Penanganan</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif text-[#141413] flex items-center gap-2">
                        <span>Pengelolaan Instansi & OPD Penanganan ({agencies.length})</span>
                    </h1>
                    <p className="font-serif text-xs sm:text-sm text-[#87867f]">
                        Daftar instansi teknis yang berwenang menerima penugasan laporan karhutla di Kalimantan.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413] hover:text-[#d97757] hover:underline"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Kembali ke Dashboard</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#141413] text-[#faf9f5] rounded-[8px] hover:bg-[#3d3d3a] transition-colors"
                    >
                        <Plus className="size-3.5" />
                        <span>Tambah Instansi Baru</span>
                    </button>
                </div>
            </div>

            <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-[24px] overflow-hidden font-sans">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#f0eee6] border-b border-[#cccbc8] text-[#87867f] uppercase tracking-wider text-[11px] font-semibold">
                            <tr>
                                <th className="py-4 px-5">Kode Unik</th>
                                <th className="py-4 px-5">Nama Lengkap Instansi</th>
                                <th className="py-4 px-5">Tipe Organisasi</th>
                                <th className="py-4 px-5">Wilayah Kewenangan</th>
                                <th className="py-4 px-5">Kontak Resmi</th>
                                <th className="py-4 px-5">Status & Beban</th>
                                <th className="py-4 px-5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#cccbc8]">
                            {agencies.map((agency) => (
                                <tr key={agency.id} className="hover:bg-[#f0eee6]/60 transition-colors">
                                    <td className="py-4 px-5 font-mono font-bold text-[#141413]">
                                        {agency.code}
                                    </td>
                                    <td className="py-4 px-5 font-semibold text-[#141413]">
                                        {agency.name}
                                    </td>
                                    <td className="py-4 px-5 text-[#87867f]">
                                        <span className="px-2 py-0.5 rounded-[3px] bg-[#f0eee6] border border-[#cccbc8] font-mono text-[10px] text-[#141413]">
                                            {agency.agency_type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 font-semibold text-[#141413]">
                                        {agency.jurisdiction}
                                    </td>
                                    <td className="py-4 px-5 text-[11px] text-[#87867f]">
                                        <div>{agency.contact_email || '-'}</div>
                                        <div className="font-mono">{agency.contact_phone || '-'}</div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold ${
                                                    agency.is_active
                                                        ? 'bg-[#e3dacc] text-[#141413]'
                                                        : 'bg-[#f0eee6] text-[#87867f]'
                                                }`}
                                            >
                                                {agency.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                            <span className="text-[11px] text-[#87867f] font-mono">
                                                {agency.assignments_count} tugas
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(agency.id)}
                                            className={`px-3 py-1 text-xs font-semibold border rounded-[6px] transition-colors ${
                                                agency.is_active
                                                    ? 'border-[#cccbc8] hover:bg-[#e3dacc] text-[#87867f]'
                                                    : 'border-[#141413] bg-[#141413] text-[#faf9f5] hover:bg-[#3d3d3a]'
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/60 p-4 font-sans">
                    <div className="bg-[#faf9f5] rounded-[24px] max-w-lg w-full p-8 border border-[#cccbc8] space-y-5">
                        <div className="flex items-center justify-between border-b border-[#cccbc8] pb-4">
                            <div>
                                <h3 className="font-serif font-bold text-lg text-[#141413]">
                                    Tambah Instansi Penanganan Baru
                                </h3>
                                <p className="font-serif text-xs text-[#87867f]">
                                    Daftarkan OPD berwenang untuk menerima penugasan karhutla
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="size-7 rounded-[4px] bg-[#f0eee6] hover:bg-[#e3dacc] flex items-center justify-center text-xs font-bold text-[#87867f]"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-[#141413] mb-1.5">
                                    Nama Lengkap Instansi:
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: BPBD Kabupaten Sintang"
                                    className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] focus:outline-none focus:ring-1 focus:ring-[#141413] bg-[#faf9f5] text-[#141413]"
                                    required
                                />
                                {errors.name && <p className="text-[11px] text-[#c6613f] mt-1">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[#141413] mb-1.5">
                                        Kode Unik (Identitas):
                                    </label>
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="BPBD-SINTANG"
                                        className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#141413] bg-[#faf9f5] text-[#141413]"
                                        required
                                    />
                                    {errors.code && <p className="text-[11px] text-[#c6613f] mt-1">{errors.code}</p>}
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#141413] mb-1.5">
                                        Tipe Organisasi:
                                    </label>
                                    <select
                                        value={data.agency_type}
                                        onChange={(e) => setData('agency_type', e.target.value)}
                                        className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] bg-[#faf9f5] text-[#141413] focus:outline-none focus:ring-1 focus:ring-[#141413]"
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
                                <label className="block font-semibold text-[#141413] mb-1.5">
                                    Wilayah Kewenangan (Provinsi):
                                </label>
                                <select
                                    value={data.jurisdiction}
                                    onChange={(e) => setData('jurisdiction', e.target.value)}
                                    className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] bg-[#faf9f5] text-[#141413] focus:outline-none focus:ring-1 focus:ring-[#141413]"
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
                                    <label className="block font-semibold text-[#141413] mb-1.5">
                                        Email Kontak Resmi:
                                    </label>
                                    <input
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="pusdalops@bpbd.go.id"
                                        className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] bg-[#faf9f5] text-[#141413]"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-[#141413] mb-1.5">
                                        No. Telepon / Hotline:
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="(0561) 123456"
                                        className="w-full text-xs p-3 rounded-[8px] border border-[#cccbc8] bg-[#faf9f5] text-[#141413]"
                                    />
                                </div>
                            </div>

                            <div className="pt-3 flex justify-end gap-2 border-t border-[#cccbc8]">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-[#cccbc8] text-[#87867f] rounded-[8px] hover:bg-[#e3dacc]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 bg-[#141413] hover:bg-[#3d3d3a] text-[#faf9f5] font-semibold rounded-[8px] disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Instansi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
