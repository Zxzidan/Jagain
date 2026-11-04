import { Link, usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { Bell, ChevronsUpDown } from 'lucide-react';
import type { BreadcrumbItem as BreadcrumbItemType, User } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props as { auth?: { user?: User } };
    const getInitials = useInitials();
    const isAdmin = auth?.user?.role === 'ADMIN' || (auth?.user as any)?.is_admin;

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-3 sm:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 dark:bg-[#101512] gap-2 sm:gap-3 pt-[env(safe-area-inset-top,0px)]">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <SidebarTrigger className="-ml-1 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg p-1.5 transition-colors shrink-0" />

                {breadcrumbs && breadcrumbs.length > 0 ? (
                    <div className="min-w-0 max-w-[140px] sm:max-w-none overflow-hidden truncate">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm tracking-tight text-[#171C19] dark:text-white">
                            JAGAIN
                        </span>
                        <span className="hidden sm:inline-block text-[10px] font-bold text-[#216B49] bg-[#E8F1EB] dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                            Kalimantan
                        </span>
                    </div>
                )}
            </div>

            {/* Top Right: Profil dan Notifikasi Saja */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Notifikasi Bell with Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            title="Notifikasi Sistem"
                            className="size-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors shadow-2xs relative cursor-pointer focus:outline-none"
                        >
                            <Bell className="size-4" />
                            <span className="absolute top-2 right-2 size-2 rounded-full bg-emerald-500 animate-pulse" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 max-w-[calc(100vw-2rem)] rounded-2xl p-0 overflow-hidden shadow-xl" align="end">
                        <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-100 dark:border-neutral-700/80 flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white">Pemberitahuan Sistem</span>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">Aktif</span>
                        </div>
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
                            <Link
                                href={isAdmin ? "/admin/reports" : "/dashboard"}
                                className="p-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 block transition-colors"
                            >
                                <div className="flex items-start gap-2.5">
                                    <span className="size-2 rounded-full bg-emerald-500 mt-1 shrink-0 animate-ping" />
                                    <div>
                                        <strong className="text-neutral-900 dark:text-white block font-semibold text-xs leading-snug">
                                            {isAdmin ? 'Antrean Laporan Karhutla Masuk' : 'Pembaruan Laporan Terkini'}
                                        </strong>
                                        <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                                            {isAdmin
                                                ? 'Terdapat laporan warga yang memerlukan telaah dan verifikasi satgas.'
                                                : 'Pantau riwayat progres verifikasi dan disposisi petugas lapangan.'}
                                        </p>
                                        <span className="text-[10px] font-semibold text-[#0c4e33] dark:text-emerald-400 mt-1.5 inline-block">
                                            {isAdmin ? 'Buka antrean laporan →' : 'Lihat status laporan →'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Profil Pengguna Dropdown */}
                {auth?.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white pl-1.5 pr-2.5 py-1 text-xs font-bold text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-all shadow-2xs cursor-pointer focus:outline-none"
                            >
                                <Avatar className="size-7 rounded-lg">
                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                    <AvatarFallback className="rounded-lg bg-[#E8F1EB] text-[#216B49] text-xs font-bold dark:bg-emerald-950 dark:text-emerald-300">
                                        {getInitials(auth.user.name ?? '')}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden sm:inline-block max-w-[130px] truncate text-left">
                                    {auth.user.name}
                                </span>
                                <ChevronsUpDown className="size-3.5 text-neutral-400 shrink-0" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 min-w-[260px] rounded-xl p-1.5 shadow-xl" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}
