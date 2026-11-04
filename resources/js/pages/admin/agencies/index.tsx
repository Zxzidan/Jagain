import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    Building2,
    CheckCircle2,
    Edit2,
    Plus,
    Power,
    Search,
    Shield,
    ShieldCheck,
    UserPlus,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/jagain/empty-state';
import { FlashMessage } from '@/components/jagain/flash-message';
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
    allAgenciesList?: Array<{
        id: number;
        name: string;
        code?: string | null;
        jurisdiction: string;
        agency_type: string;
    }>;
    filters: {
        search?: string;
    };
};

export default function AgenciesIndex({ agencies, allAgenciesList, filters }: AgenciesIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
    const [selectedAgencyForUser, setSelectedAgencyForUser] = useState<Agency | null>(null);

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
        code: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        agency_type: 'BPBD',
        jurisdiction: '',
        code: '',
        is_active: true,
    });

    const createUserForm = useForm({
        agency_id: '',
        name: '',
        email: '',
        phone: '',
        role_in_agency: 'OFFICER',
        password: '',
        password_confirmation: '',
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
            code: agency.code || '',
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

    const openCreateUserModal = (agency: Agency | null) => {
        setSelectedAgencyForUser(agency);
        createUserForm.reset();
        createUserForm.clearErrors();
        const defaultAgencyId = agency ? String(agency.id) : '';

        createUserForm.setData({
            agency_id: defaultAgencyId,
            name: '',
            email: '',
            phone: '',
            role_in_agency: 'OFFICER',
            password: '',
            password_confirmation: '',
        });
        setIsCreateUserModalOpen(true);
    };

    const handleCreateUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const targetAgencyId = selectedAgencyForUser?.id || createUserForm.data.agency_id;
        if (!targetAgencyId) return;

        createUserForm.post(`/admin/agencies/${targetAgencyId}/users`, {
            onSuccess: () => {
                setIsCreateUserModalOpen(false);
                createUserForm.reset();
            },
        });
    };

    const availableAgencies = allAgenciesList && allAgenciesList.length > 0
        ? allAgenciesList
        : agencies.data;

    return (
        <>
            <Head title="Kelola Instansi & OPD - JAGAIN Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <FlashMessage />

                {/* Header Title & Action Buttons */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#171C19] dark:text-white">
                            Instansi & OPD Kewenangan
                        </h1>
                        <p className="mt-1 text-sm text-[#68716B] dark:text-neutral-400">
                            Kelola data master instansi penanganan karhutla dan buatkan akun login resmi petugas OPD.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => openCreateUserModal(null)}
                            className="inline-flex w-full sm:w-auto justify-center items-center gap-1.5 rounded-lg border border-[#216B49] bg-white px-4 py-2.5 text-xs font-semibold text-[#216B49] shadow-xs transition hover:bg-[#E8F1EB] dark:bg-neutral-900 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950"
                        >
                            <UserPlus className="size-4" />
                            <span>Buat Akun OPD</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex w-full sm:w-auto justify-center items-center gap-1.5 rounded-lg bg-[#216B49] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#174B35]"
                        >
                            <Plus className="size-4" />
                            <span>Tambah Instansi Baru</span>
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex rounded-xl border border-[#DDE3DE] bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#68716B] dark:text-neutral-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari instansi, wilayah, atau email..."
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
                            <table className="w-full min-w-[850px] text-sm">
                                <thead className="border-b border-[#DDE3DE] bg-[#F3F7F4] text-xs font-semibold uppercase tracking-wider text-[#343B36] dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-center">Nama Instansi</th>
                                        <th scope="col" className="px-6 py-4 text-center">Tipe Organisasi</th>
                                        <th scope="col" className="px-6 py-4 text-center">Wilayah Yurisdiksi</th>
                                        <th scope="col" className="px-6 py-4 text-center">Tugas Diterima</th>
                                        <th scope="col" className="px-6 py-4 text-center">Status</th>
                                        <th scope="col" className="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                    {agencies.data.map((agency) => (
                                        <tr
                                            key={agency.id}
                                            className="transition-colors hover:bg-[#F3F7F4]/40 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-6 py-5 align-middle text-left font-semibold text-[#171C19] dark:text-white">
                                                <div className="text-sm font-bold text-[#171C19] dark:text-white">
                                                    {agency.name}
                                                </div>
                                                {agency.code && (
                                                    <div className="font-mono text-[10px] text-[#68716B] dark:text-neutral-400 font-normal mt-0.5">
                                                        Kode: <span className="font-semibold">{agency.code}</span>
                                                    </div>
                                                )}
                                                {agency.agency_memberships && agency.agency_memberships.length > 0 ? (
                                                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/70 dark:border-emerald-800/70">
                                                            <Users className="size-3" />
                                                            <span>{agency.agency_memberships.length} Akun Petugas</span>
                                                        </span>
                                                        {agency.agency_memberships.slice(0, 2).map((m) => (
                                                            <span
                                                                key={m.id}
                                                                className="text-[10px] text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono truncate max-w-[150px]"
                                                                title={`${m.user?.name} (${m.user?.email})`}
                                                            >
                                                                {m.user?.email}
                                                            </span>
                                                        ))}
                                                        {agency.agency_memberships.length > 2 && (
                                                            <span className="text-[10px] text-neutral-400 font-mono">
                                                                +{agency.agency_memberships.length - 2} lagi
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="mt-1 flex items-center gap-1 text-[11px] font-normal text-amber-600 dark:text-amber-400">
                                                        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                        <span>Belum ada akun login petugas</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 align-middle text-center">
                                                <span className="rounded bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                    {agency.agency_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 align-middle text-center text-xs font-medium text-[#343B36] dark:text-neutral-300">
                                                {agency.jurisdiction}
                                            </td>
                                            <td className="px-6 py-5 align-middle text-center text-xs text-[#68716B] dark:text-neutral-400">
                                                <span className="font-semibold text-[#171C19] dark:text-white">
                                                    {agency.assignments_count ?? 0}
                                                </span>{' '}
                                                penugasan
                                            </td>
                                            <td className="px-6 py-5 align-middle text-center whitespace-nowrap">
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
                                            <td className="px-6 py-5 align-middle text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => openCreateUserModal(agency)}
                                                        className="inline-flex items-center gap-1 rounded border border-[#216B49] bg-[#E8F1EB] px-2.5 py-1 text-xs font-semibold text-[#216B49] hover:bg-[#216B49] hover:text-white transition shadow-2xs dark:bg-emerald-950/70 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-800"
                                                        title={`Buat akun petugas login untuk ${agency.name}`}
                                                    >
                                                        <UserPlus className="size-3" />
                                                        <span>Buat Akun</span>
                                                    </button>
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

            {/* Modal: Buat Akun Petugas OPD */}
            {isCreateUserModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-7 shadow-2xl dark:bg-neutral-900 max-h-[90vh] overflow-y-auto border border-[#DDE3DE] dark:border-neutral-800">
                        <div className="flex items-center justify-between border-b border-[#DDE3DE] pb-3 dark:border-neutral-800">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-[#216B49] dark:bg-emerald-950/60 dark:text-emerald-400">
                                    <UserPlus className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                        Buat Akun Petugas OPD
                                    </h3>
                                    <p className="text-xs text-[#68716B] dark:text-neutral-400">
                                        Pembuatan akun login resmi instansi penanganan karhutla
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsCreateUserModalOpen(false)}
                                className="rounded-lg p-1.5 text-[#68716B] hover:bg-[#F3F7F4] hover:text-[#171C19] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Informational Banner */}
                        <div className="mt-4 rounded-xl border border-emerald-200/90 bg-emerald-50/70 p-3.5 text-xs text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                            <div className="flex items-center gap-2 font-semibold">
                                <ShieldCheck className="size-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                                <span>Akun Otomatis Terverifikasi & Resmi</span>
                            </div>
                            <p className="mt-1 text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-300/90 pl-6">
                                Akun dibuatkan langsung oleh Administrator dengan peran <strong>AGENCY (OPD)</strong> aktif agar petugas dapat langsung login dan memproses tugas lapangan.
                            </p>
                        </div>

                        <form onSubmit={handleCreateUserSubmit} className="mt-5 flex flex-col gap-4">
                            {/* Instansi Selection */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                    Instansi / OPD Penerima Akun *
                                </label>
                                {selectedAgencyForUser ? (
                                    <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs dark:border-emerald-800 dark:bg-emerald-950/40">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600/10 text-[#216B49] dark:text-emerald-400">
                                                <Building2 className="size-4" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-[#171C19] dark:text-white">
                                                    {selectedAgencyForUser.name}
                                                </div>
                                                <div className="text-[11px] text-[#68716B] dark:text-neutral-400">
                                                    {selectedAgencyForUser.jurisdiction} {selectedAgencyForUser.code ? `• ${selectedAgencyForUser.code}` : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedAgencyForUser(null);
                                                createUserForm.setData('agency_id', '');
                                            }}
                                            className="text-xs font-semibold text-[#216B49] hover:underline dark:text-emerald-400"
                                        >
                                            Ganti Instansi
                                        </button>
                                    </div>
                                ) : (
                                    <select
                                        value={createUserForm.data.agency_id}
                                        onChange={(e) => createUserForm.setData('agency_id', e.target.value)}
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                        required
                                    >
                                        <option value="" disabled>— Pilih Instansi OPD —</option>
                                        {availableAgencies?.map((ag) => (
                                            <option key={ag.id} value={ag.id}>
                                                {ag.name} ({ag.jurisdiction})
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {createUserForm.errors.agency_id && (
                                    <p className="mt-1 text-xs text-rose-600">{createUserForm.errors.agency_id}</p>
                                )}
                            </div>

                            {/* Nama Lengkap & Email Petugas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Nama Lengkap Petugas *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createUserForm.data.name}
                                        onChange={(e) => createUserForm.setData('name', e.target.value)}
                                        placeholder="Nama lengkap petugas"
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                    {createUserForm.errors.name && (
                                        <p className="mt-1 text-xs text-rose-600">{createUserForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Email Login Petugas *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={createUserForm.data.email}
                                        onChange={(e) => createUserForm.setData('email', e.target.value)}
                                        placeholder="email@instansi.go.id"
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white font-mono"
                                    />
                                    {createUserForm.errors.email && (
                                        <p className="mt-1 text-xs text-rose-600">{createUserForm.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Telepon & Peran Petugas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Nomor Telepon / WA (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={createUserForm.data.phone}
                                        onChange={(e) => createUserForm.setData('phone', e.target.value)}
                                        placeholder="081234567890"
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white font-mono"
                                    />
                                    {createUserForm.errors.phone && (
                                        <p className="mt-1 text-xs text-rose-600">{createUserForm.errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Peran dalam Instansi
                                    </label>
                                    <select
                                        value={createUserForm.data.role_in_agency}
                                        onChange={(e) => createUserForm.setData('role_in_agency', e.target.value)}
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    >
                                        <option value="OFFICER">Petugas Lapangan (OFFICER)</option>
                                        <option value="COORDINATOR">Koordinator Satgas (COORDINATOR)</option>
                                        <option value="ADMIN">Administrator Instansi (ADMIN)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Password & Konfirmasi Password */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Password Akun *
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={createUserForm.data.password}
                                        onChange={(e) => createUserForm.setData('password', e.target.value)}
                                        placeholder="Min. 8 karakter"
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                    {createUserForm.errors.password && (
                                        <p className="mt-1 text-xs text-rose-600">{createUserForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Konfirmasi Password *
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={createUserForm.data.password_confirmation}
                                        onChange={(e) => createUserForm.setData('password_confirmation', e.target.value)}
                                        placeholder="Ulangi password"
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                    {createUserForm.errors.password_confirmation && (
                                        <p className="mt-1 text-xs text-rose-600">{createUserForm.errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-[#DDE3DE] pt-4 dark:border-neutral-800">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateUserModalOpen(false)}
                                    className="rounded-lg border border-[#DDE3DE] px-4 py-2.5 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] transition dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createUserForm.processing}
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#216B49] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#174B35] disabled:opacity-50"
                                >
                                    <UserPlus className="size-4" />
                                    <span>{createUserForm.processing ? 'Memproses...' : 'Buat Akun Petugas'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Tambah Instansi */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl dark:bg-neutral-900 max-h-[90vh] overflow-y-auto border border-[#DDE3DE] dark:border-neutral-800">
                        <div className="flex items-center justify-between border-b border-[#DDE3DE] pb-3 dark:border-neutral-800">
                            <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                Tambah Instansi / OPD Baru
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="rounded-lg p-1.5 text-[#68716B] hover:bg-[#F3F7F4] hover:text-[#171C19] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="mt-4 flex flex-col gap-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                    Nama Lengkap Instansi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    placeholder="Nama instansi / OPD"
                                    className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                />
                                {createForm.errors.name && (
                                    <p className="mt-1 text-xs text-rose-600">{createForm.errors.name}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Kode Singkatan (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.code}
                                        onChange={(e) => createForm.setData('code', e.target.value)}
                                        placeholder="BPBD-KALBAR"
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Tipe Instansi *
                                    </label>
                                    <select
                                        value={createForm.data.agency_type}
                                        onChange={(e) => createForm.setData('agency_type', e.target.value)}
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    >
                                        <option value="BPBD">BPBD (Badan Penanggulangan Bencana Daerah)</option>
                                        <option value="DISDAMKAR">Dinas Pemadam Kebakaran & Penyelamatan</option>
                                        <option value="MANGGALA_AGNI">Manggala Agni (KLHK)</option>
                                        <option value="DINAS_KEHUTANAN">Dinas Kehutanan</option>
                                        <option value="OTHER">Instansi / Satgas Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                    Wilayah Kewenangan (Yurisdiksi) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.jurisdiction}
                                    onChange={(e) => createForm.setData('jurisdiction', e.target.value)}
                                    placeholder="Wilayah kewenangan"
                                    className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                />
                                {createForm.errors.jurisdiction && (
                                    <p className="mt-1 text-xs text-rose-600">{createForm.errors.jurisdiction}</p>
                                )}
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-[#DDE3DE] pt-4 dark:border-neutral-800">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="rounded-lg border border-[#DDE3DE] px-4 py-2.5 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] transition dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="rounded-lg bg-[#216B49] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#174B35]"
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
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl dark:bg-neutral-900 max-h-[90vh] overflow-y-auto border border-[#DDE3DE] dark:border-neutral-800">
                        <div className="flex items-center justify-between border-b border-[#DDE3DE] pb-3 dark:border-neutral-800">
                            <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                Ubah Data Instansi
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditingAgency(null)}
                                className="rounded-lg p-1.5 text-[#68716B] hover:bg-[#F3F7F4] hover:text-[#171C19] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="mt-4 flex flex-col gap-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                    Nama Lengkap Instansi *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    placeholder="Nama instansi"
                                    className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Kode Singkatan (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.code}
                                        onChange={(e) => editForm.setData('code', e.target.value)}
                                        placeholder="BPBD-KALBAR"
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                        Tipe Instansi *
                                    </label>
                                    <select
                                        value={editForm.data.agency_type}
                                        onChange={(e) => editForm.setData('agency_type', e.target.value)}
                                        className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    >
                                        <option value="BPBD">BPBD (Badan Penanggulangan Bencana Daerah)</option>
                                        <option value="DISDAMKAR">Dinas Pemadam Kebakaran & Penyelamatan</option>
                                        <option value="MANGGALA_AGNI">Manggala Agni (KLHK)</option>
                                        <option value="DINAS_KEHUTANAN">Dinas Kehutanan</option>
                                        <option value="OTHER">Instansi / Satgas Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#171C19] dark:text-neutral-200">
                                    Wilayah Kewenangan (Yurisdiksi) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.jurisdiction}
                                    onChange={(e) => editForm.setData('jurisdiction', e.target.value)}
                                    placeholder="Wilayah kewenangan"
                                    className="w-full rounded-lg border border-[#DDE3DE] bg-white px-3.5 py-2.5 text-xs text-[#171C19] placeholder-[#68716B]/60 focus:border-[#216B49] focus:ring-1 focus:ring-[#216B49] focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-[#DDE3DE] pt-4 dark:border-neutral-800">
                                <button
                                    type="button"
                                    onClick={() => setEditingAgency(null)}
                                    className="rounded-lg border border-[#DDE3DE] px-4 py-2.5 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] transition dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="rounded-lg bg-[#216B49] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#174B35]"
                                >
                                    Perbarui Instansi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
