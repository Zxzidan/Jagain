import { Head, useForm, router } from '@inertiajs/react';
import {
    CheckCircle2,
    Edit2,
    Flame,
    Plus,
    Power,
    Search,
    Tags,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { EmptyState } from '@/components/jagain/empty-state';
import { FlashMessage } from '@/components/jagain/flash-message';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as categoriesIndex,
    store as categoriesStore,
    toggleStatus as categoriesToggleStatus,
    update as categoriesUpdate,
} from '@/routes/admin/categories';
import type { BreadcrumbItem, Category, PaginatedResponse } from '@/types';

type CategoriesIndexProps = {
    categories: PaginatedResponse<Category>;
    filters: {
        search?: string;
    };
};

export default function CategoriesIndex({ categories, filters }: CategoriesIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin JAGAIN',
            href: adminDashboard(),
        },
        {
            title: 'Kategori Laporan',
            href: categoriesIndex(),
        },
    ];

    const createForm = useForm({
        name: '',
        description: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        description: '',
        is_active: true,
    });

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(categoriesIndex.url({ query: { search } }), {}, { preserveState: true });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(categoriesStore.url(), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        editForm.setData({
            name: category.name,
            description: category.description ?? '',
            is_active: category.is_active,
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        editForm.put(categoriesUpdate.url(editingCategory.id), {
            onSuccess: () => {
                setEditingCategory(null);
            },
        });
    };

    const handleToggleStatus = (category: Category) => {
        router.patch(categoriesToggleStatus.url(category.id), {}, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Kelola Kategori Laporan - JAGAIN Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <FlashMessage />

                {/* Header Title & Create Button */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#171C19] dark:text-white">
                            Kategori Karhutla
                        </h1>
                        <p className="mt-1 text-sm text-[#68716B] dark:text-neutral-400">
                            Kelola kategori laporan kebakaran hutan dan lahan untuk klasifikasi dan analisis operasional.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex w-full sm:w-auto justify-center items-center gap-1.5 rounded-lg bg-[#216B49] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#174B35]"
                    >
                        <Plus className="size-4" />
                        <span>Tambah Kategori Baru</span>
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
                            placeholder="Cari nama kategori atau deskripsi..."
                            className="w-full rounded-lg border border-[#DDE3DE] bg-[#F3F7F4]/50 py-2 pr-3 pl-9 text-xs text-[#171C19] placeholder-[#68716B] focus:border-[#216B49] focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-white dark:placeholder-neutral-500"
                        />
                    </form>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-[#DDE3DE] bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    {categories.data.length === 0 ? (
                        <div className="p-12">
                            <EmptyState
                                icon={Tags}
                                title="Tidak ada kategori ditemukan"
                                description="Belum ada data kategori yang sesuai dengan filter pencarian."
                            />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left text-sm">
                                <thead className="border-b border-[#DDE3DE] bg-[#F3F7F4] text-xs font-semibold uppercase tracking-wider text-[#343B36] dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Nama Kategori</th>
                                        <th scope="col" className="px-6 py-4">Slug</th>
                                        <th scope="col" className="px-6 py-4">Deskripsi</th>
                                        <th scope="col" className="px-6 py-4">Jumlah Laporan</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DDE3DE] dark:divide-neutral-800">
                                    {categories.data.map((cat) => (
                                        <tr
                                            key={cat.id}
                                            className="transition-colors hover:bg-[#F3F7F4]/40 dark:hover:bg-neutral-800/40"
                                        >
                                            <td className="px-6 py-5 align-middle">
                                                <div className="flex items-center gap-2.5 font-semibold text-[#171C19] dark:text-white">
                                                    <Flame className="size-4 text-[#216B49] dark:text-emerald-400" />
                                                    <span>{cat.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 align-middle font-mono text-xs text-[#68716B] dark:text-neutral-400">
                                                {cat.slug}
                                            </td>
                                            <td className="px-6 py-5 align-middle text-xs text-[#68716B] max-w-sm leading-relaxed dark:text-neutral-400">
                                                {cat.description ?? '-'}
                                            </td>
                                            <td className="px-6 py-5 align-middle text-xs text-[#68716B] dark:text-neutral-400">
                                                <span className="font-semibold text-[#171C19] dark:text-white">
                                                    {cat.reports_count ?? 0}
                                                </span>{' '}
                                                laporan
                                            </td>
                                            <td className="px-6 py-5 align-middle whitespace-nowrap">
                                                {cat.is_active ? (
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
                                                        onClick={() => openEditModal(cat)}
                                                        className="inline-flex items-center gap-1 rounded border border-[#DDE3DE] px-2.5 py-1 text-xs font-medium text-[#343B36] hover:bg-[#F3F7F4] dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                                    >
                                                        <Edit2 className="size-3" />
                                                        <span>Ubah</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(cat)}
                                                        className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition ${
                                                            cat.is_active
                                                                ? 'border border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300'
                                                                : 'border border-[#216B49] text-[#216B49] hover:bg-[#E8F1EB] dark:text-emerald-400'
                                                        }`}
                                                    >
                                                        <Power className="size-3" />
                                                        <span>{cat.is_active ? 'Nonaktifkan' : 'Aktifkan'}</span>
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

            {/* Modal: Tambah Kategori */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                Tambah Kategori Baru
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
                                    Nama Kategori *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Lahan Gambut Dalam"
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                />
                                {createForm.errors.name && (
                                    <p className="mt-1 text-xs text-rose-600">{createForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Deskripsi Kategori (Opsional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={createForm.data.description}
                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                    placeholder="Jelaskan karakteristik kebakaran dalam kategori ini..."
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                />
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
                                    Simpan Kategori
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Edit Kategori */}
            {editingCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#171C19] dark:text-white">
                                Ubah Data Kategori
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditingCategory(null)}
                                className="rounded p-1 text-[#68716B] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="mt-4 flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-[#343B36] dark:text-neutral-300">
                                    Nama Kategori *
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
                                    Deskripsi Kategori (Opsional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-[#DDE3DE] p-2 text-xs text-[#171C19] focus:border-[#216B49] focus:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
                                />
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingCategory(null)}
                                    className="rounded-lg border border-[#DDE3DE] px-3.5 py-2 text-xs font-semibold text-[#343B36] hover:bg-[#F3F7F4] dark:border-neutral-700 dark:text-neutral-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="rounded-lg bg-[#216B49] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#174B35]"
                                >
                                    Perbarui Kategori
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
