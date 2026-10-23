import React, { useState } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Building2,
    CheckCircle2,
    Edit2,
    Plus,
    Power,
    Search,
    Shield,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as agenciesIndex,
    store as agenciesStore,
    toggleStatus as agenciesToggleStatus,
    update as agenciesUpdate,
} from '@/routes/admin/agencies';
import type { Agency, PaginatedResponse } from '@/types';

type AgenciesIndexProps = {
    agencies: PaginatedResponse<Agency>;
    filters: {
        search?: string;
    };
};

export default function AgenciesIndex({ agencies, filters }: AgenciesIndexProps) {
    const page = usePage();
    const flash = (page.props as any).flash;

    const [search, setSearch] = useState(filters.search ?? '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAgency, setEditingAgency] = useState<Agency | null>(null);

    const createForm = useForm({
        name: '',
        agency_type: 'BPBD',
        jurisdiction: 'Kalimantan Barat',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        agency_type: 'BPBD',
        jurisdiction: '',
        is_active: true,
    });

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(agenciesIndex.url({ query: { search } }), {}, { preserveState: true });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(agenciesStore.url(), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (agency: Agency) => {
        setEditingAgency(agency);
        editForm.setData({
            name: agency.name,
            agency_type: agency.agency_type,
            jurisdiction: agency.jurisdiction,
            is_active: agency.is_active,
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAgency) return;

        editForm.put(agenciesUpdate.url(editingAgency.id), {
            onSuccess: () => {
                setEditingAgency(null);
            },
        });
    };

    const handleToggleStatus = (agency: Agency) => {
        router.patch(agenciesToggleStatus.url(agency.id), {}, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Kelola Instansi & OPD - JAGAIN Admin" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Flash Messages */}
                {flash?.success && (
                    <div
                        role="status"
                        className="flex items-center gap-3 rounded-xl border border-leaf-green/30 bg-soft-green/70 p-4 text-sm text-forest-green shadow-xs transition-all duration-200"
                    >
                        <CheckCircle2 className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div
                        role="alert"
                        className="flex items-center gap-3 rounded-xl border border-border-neutral bg-white p-4 text-sm text-dark-neutral shadow-xs transition-all duration-200"
                    >
                        <AlertCircle className="size-5 shrink-0 text-primary-green" />
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Header Title & Actions */}
                <header className="flex flex-col justify-between gap-4 rounded-xl border border-border-neutral bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-green">
                            <Shield className="size-4" />
                            <span>Pusat Kendali Administrasi &bull; Master Instansi</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-dark-neutral sm:text-2xl">
                            Instansi & OPD Kewenangan
                        </h1>
                        <p className="text-xs text-gray-neutral sm:text-sm">
                            Kelola data master instansi penanganan karhutla dan cakupan wilayah yurisdiksi di Kalimantan.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-border-neutral bg-white text-xs font-semibold text-dark-neutral hover:bg-pale-green"
                        >
                            <Link href={adminDashboard().url}>
                                <span>Kembali ke Dasbor</span>
                            </Link>
                        </Button>

                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            size="sm"
                            className="bg-primary-green text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                        >
                            <Plus className="size-4 mr-1.5" />
                            <span>Tambah Instansi Baru</span>
                        </Button>
                    </div>
                </header>

                {/* Search Bar */}
                <div className="flex rounded-xl border border-border-neutral bg-white p-4 shadow-xs">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-neutral" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama instansi, wilayah yurisdiksi, atau tipe organisasi..."
                            className="w-full rounded-lg border border-border-neutral bg-pale-green/40 py-2 pr-3.5 pl-10 text-xs text-dark-neutral placeholder-gray-neutral/70 transition-colors focus:border-primary-green focus:bg-white focus:outline-hidden"
                        />
                    </form>
                </div>

                {/* Agencies Table Card */}
                <div className="rounded-xl border border-border-neutral bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
                    {agencies.data.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border-neutral/70 bg-pale-green text-gray-neutral">
                                <Building2 className="size-6 text-gray-neutral" />
                            </div>
                            <h3 className="mt-3.5 text-base font-semibold text-dark-neutral">
                                Tidak Ada Instansi Ditemukan
                            </h3>
                            <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-gray-neutral">
                                Belum ada data instansi yang cocok dengan filter pencarian Anda.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-border-neutral bg-pale-green/60 text-[11px] font-bold text-forest-green uppercase tracking-wider">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5">Nama Instansi</th>
                                        <th scope="col" className="px-6 py-3.5">Tipe Organisasi</th>
                                        <th scope="col" className="px-6 py-3.5">Wilayah Yurisdiksi</th>
                                        <th scope="col" className="px-6 py-3.5">Tugas Diterima</th>
                                        <th scope="col" className="px-6 py-3.5">Status</th>
                                        <th scope="col" className="px-6 py-3.5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-neutral text-xs">
                                    {agencies.data.map((agency) => (
                                        <tr
                                            key={agency.id}
                                            className="transition-colors hover:bg-pale-green/30"
                                        >
                                            <td className="px-6 py-4 font-semibold text-dark-neutral">
                                                {agency.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="badge badge-light">
                                                    {agency.agency_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-forest-green">
                                                {agency.jurisdiction}
                                            </td>
                                            <td className="px-6 py-4 text-gray-neutral">
                                                <strong className="font-bold text-dark-neutral">
                                                    {agency.assignments_count ?? 0}
                                                </strong>{' '}
                                                penugasan
                                            </td>
                                            <td className="px-6 py-4">
                                                {agency.is_active ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-green/30 bg-soft-green px-2.5 py-0.5 text-xs font-semibold text-forest-green">
                                                        <CheckCircle2 className="size-3.5" />
                                                        <span>Aktif</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-neutral bg-pale-green px-2.5 py-0.5 text-xs font-medium text-gray-neutral">
                                                        <span>Nonaktif</span>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(agency)}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-border-neutral bg-white px-2.5 py-1.5 text-xs font-semibold text-dark-neutral transition hover:bg-pale-green hover:border-gray-neutral/40"
                                                    >
                                                        <Edit2 className="size-3 text-primary-green" />
                                                        <span>Ubah</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(agency)}
                                                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                                                            agency.is_active
                                                                ? 'border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100'
                                                                : 'border border-leaf-green/40 bg-soft-green text-forest-green hover:bg-soft-green/80'
                                                        }`}
                                                    >
                                                        <Power className="size-3" />
                                                        <span>{agency.is_active ? 'Nonaktifkan' : 'Aktifkan'}</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal: Tambah Instansi */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-2xl border border-border-neutral bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-dark-neutral">
                                Tambah Instansi / OPD Baru
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="rounded p-1 text-gray-neutral hover:bg-pale-green"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="mt-4 flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-dark-neutral">
                                    Nama Lengkap Instansi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    placeholder="Contoh: BPBD Provinsi Kalimantan Barat"
                                    className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                                />
                                {createForm.errors.name && (
                                    <p className="mt-1 text-xs text-rose-600">{createForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-neutral">
                                    Tipe Instansi *
                                </label>
                                <select
                                    value={createForm.data.agency_type}
                                    onChange={(e) => createForm.setData('agency_type', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                                >
                                    <option value="BPBD">BPBD (Badan Penanggulangan Bencana Daerah)</option>
                                    <option value="DAMKAR">Dinas Pemadam Kebakaran & Penyelamatan</option>
                                    <option value="MANGGALA_AGNI">Manggala Agni (KLHK)</option>
                                    <option value="TNI_POLRI">Satgas Terpadu TNI/Polri</option>
                                    <option value="LAINNYA">Instansi Lainnya</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-neutral">
                                    Wilayah Kewenangan (Yurisdiksi) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.jurisdiction}
                                    onChange={(e) => createForm.setData('jurisdiction', e.target.value)}
                                    placeholder="Contoh: Kalimantan Barat / Kab. Kubu Raya"
                                    className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                                />
                                {createForm.errors.jurisdiction && (
                                    <p className="mt-1 text-xs text-rose-600">{createForm.errors.jurisdiction}</p>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="rounded-lg border border-border-neutral px-3.5 py-2 text-xs font-semibold text-dark-neutral hover:bg-pale-green"
                                >
                                    Batal
                                </button>
                                <Button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                >
                                    Simpan Instansi
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Instansi */}
            {editingAgency && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-2xl border border-border-neutral bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-dark-neutral">
                                Ubah Data Instansi
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditingAgency(null)}
                                className="rounded p-1 text-gray-neutral hover:bg-pale-green"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="mt-4 flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-dark-neutral">
                                    Nama Lengkap Instansi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-neutral">
                                    Tipe Instansi *
                                </label>
                                <select
                                    value={editForm.data.agency_type}
                                    onChange={(e) => editForm.setData('agency_type', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                                >
                                    <option value="BPBD">BPBD (Badan Penanggulangan Bencana Daerah)</option>
                                    <option value="DAMKAR">Dinas Pemadam Kebakaran & Penyelamatan</option>
                                    <option value="MANGGALA_AGNI">Manggala Agni (KLHK)</option>
                                    <option value="TNI_POLRI">Satgas Terpadu TNI/Polri</option>
                                    <option value="LAINNYA">Instansi Lainnya</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-neutral">
                                    Wilayah Kewenangan (Yurisdiksi) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.jurisdiction}
                                    onChange={(e) => editForm.setData('jurisdiction', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-border-neutral bg-pale-green/40 p-2.5 text-xs text-dark-neutral focus:border-primary-green focus:bg-white focus:outline-hidden"
                                />
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingAgency(null)}
                                    className="rounded-lg border border-border-neutral px-3.5 py-2 text-xs font-semibold text-dark-neutral hover:bg-pale-green"
                                >
                                    Batal
                                </button>
                                <Button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="bg-primary-green px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-green"
                                >
                                    Perbarui Instansi
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
