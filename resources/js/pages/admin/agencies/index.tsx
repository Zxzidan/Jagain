import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    Building2,
    CheckCircle2,
    Edit2,
    Plus,
    Power,
    Search,
    Shield,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/jagain/empty-state';
import { FlashMessage } from '@/components/jagain/flash-message';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as agenciesIndex,
    store as agenciesStore,
    toggleStatus as agenciesToggleStatus,
    update as agenciesUpdate,
} from '@/routes/admin/agencies';
import type { Agency, BreadcrumbItem, PaginatedResponse } from '@/types';

type AgenciesIndexProps = {
    agencies: PaginatedResponse<Agency>;
    filters: {
        search?: string;
    };
};

export default function AgenciesIndex({ agencies, filters }: AgenciesIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAgency, setEditingAgency] = useState<Agency | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin JAGAIN',
            href: adminDashboard(),
        },
        {
            title: 'Instansi & OPD Yurisdiksi',
            href: agenciesIndex(),
        },
    ];

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Instansi & OPD - JAGAIN Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <FlashMessage />

                {/* Header Title & Create Button */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#171C19] dark:text-white">
                            Instansi & OPD Kewenangan
                        </h1>
                        <p className="mt-1 text-sm text-[#68716B] dark:text-neutral-400">
                            Kelola data master instansi penanganan karhutla dan cakupan wilayah yurisdiksi di Kalimantan.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#216B49] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#174B35]"
                    >
                        <Plus className="size-4" />
                        <span>Tambah Instansi Baru</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#68716B] dark:text-neutral-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama instansi, wilayah yurisdiksi, atau tipe..."
                            className="w-full rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 py-2 pr-3 pl-9 text-xs text-[#171C19] placeholder-[#68716B] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-white dark:placeholder-neutral-500"
                        />
                    </form>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-[#DDE3DE] bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    {agencies.data.length === 0 ? (
                        <div className="p-12">
                            <EmptyState
                                icon={Building2}
                                title="Tidak ada instansi ditemukan"
                                description="Belum ada data instansi yang sesuai dengan filter pencarian."
                            />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left text-sm">
                                <thead className="border-b border-[#DDE3DE] bg-[#F3F7F4] text-xs font-semibold uppercase tracking-wider text-[#343B36] dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Nama Instansi</th>
                                        <th scope="col" className="px-6 py-4">Tipe Organisasi</th>
                                        <th scope="col" className="px-6 py-4">Wilayah Yurisdiksi</th>
                                        <th scope="col" className="px-6 py-4">Tugas Diterima</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                    {agencies.data.map((agency) => (
                                        <tr
                                            key={agency.id}
                                            className="transition-colors hover:bg-[#F3F7F4]/40 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-6 py-5 align-middle font-semibold text-[#171C19] dark:text-white">
                                                {agency.name}
                                            </td>
                                            <td className="px-6 py-5 align-middle">
                                                <span className="rounded bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                    {agency.agency_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 align-middle text-xs font-medium text-[#343B36] dark:text-neutral-300">
                                                {agency.jurisdiction}
                                            </td>
                                            <td className="px-6 py-5 align-middle text-xs text-[#68716B] dark:text-neutral-400">
                                                <span className="font-semibold text-[#171C19] dark:text-white">
                                                    {agency.assignments_count ?? 0}
                                                </span>{' '}
                                                penugasan
                                            </td>
                                            <td className="px-6 py-5 align-middle whitespace-nowrap">
                                                {agency.is_active ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F1EB] px-3 py-1 text-xs font-medium text-[#216B49] dark:bg-emerald-950/70 dark:text-emerald-300">
                                                        <CheckCircle2 className="size-3.5" />
                                                        <span>Aktif</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                        <span>Nonaktif</span>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 align-middle text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(agency)}
                                                        className="inline-flex items-center gap-1 rounded border border-[#DDE3DE] px-2.5 py-1 text-xs font-medium text-[#343B36] hover:bg-[#F3F7F4] dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                                    >
                                                        <Edit2 className="size-3" />
                                                        <span>Ubah</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(agency)}
                                                        className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition ${
                                                            agency.is_active
                                                                ? 'border border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300'
                                                                : 'border border-[#216B49] text-[#216B49] hover:bg-[#E8F1EB] dark:text-emerald-400'
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                Tambah Instansi / OPD Baru
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="rounded p-1 text-[#68716B] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="mt-4 flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Nama Lengkap Instansi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    placeholder="Contoh: BPBD Provinsi Kalimantan Barat"
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                />
                                {createForm.errors.name && (
                                    <p className="mt-1 text-xs text-rose-600">{createForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Tipe Instansi *
                                </label>
                                <select
                                    value={createForm.data.agency_type}
                                    onChange={(e) => createForm.setData('agency_type', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] bg-white p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                >
                                    <option value="BPBD">BPBD (Badan Penanggulangan Bencana Daerah)</option>
                                    <option value="DAMKAR">Dinas Pemadam Kebakaran & Penyelamatan</option>
                                    <option value="MANGGALA_AGNI">Manggala Agni (KLHK)</option>
                                    <option value="TNI_POLRI">Satgas Terpadu TNI/Polri</option>
                                    <option value="LAINNYA">Instansi Lainnya</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Wilayah Kewenangan (Yurisdiksi) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.jurisdiction}
                                    onChange={(e) => createForm.setData('jurisdiction', e.target.value)}
                                    placeholder="Contoh: Kalimantan Barat / Kab. Kubu Raya"
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                />
                                {createForm.errors.jurisdiction && (
                                    <p className="mt-1 text-xs text-rose-600">{createForm.errors.jurisdiction}</p>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="rounded-lg border border-[#DDE3DE] px-3.5 py-2 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] dark:border-neutral-700 dark:text-neutral-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="rounded-lg bg-[#216B49] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#174B35]"
                                >
                                    Simpan Instansi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Instansi */}
            {editingAgency && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                Ubah Data Instansi
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditingAgency(null)}
                                className="rounded p-1 text-[#68716B] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="mt-4 flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Nama Lengkap Instansi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Tipe Instansi *
                                </label>
                                <select
                                    value={editForm.data.agency_type}
                                    onChange={(e) => editForm.setData('agency_type', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] bg-white p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                >
                                    <option value="BPBD">BPBD (Badan Penanggulangan Bencana Daerah)</option>
                                    <option value="DAMKAR">Dinas Pemadam Kebakaran & Penyelamatan</option>
                                    <option value="MANGGALA_AGNI">Manggala Agni (KLHK)</option>
                                    <option value="TNI_POLRI">Satgas Terpadu TNI/Polri</option>
                                    <option value="LAINNYA">Instansi Lainnya</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Wilayah Kewenangan (Yurisdiksi) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.jurisdiction}
                                    onChange={(e) => editForm.setData('jurisdiction', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                />
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingAgency(null)}
                                    className="rounded-lg border border-[#DDE3DE] px-3.5 py-2 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] dark:border-neutral-700 dark:text-neutral-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="rounded-lg bg-[#216B49] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#174B35]"
                                >
                                    Perbarui Instansi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
