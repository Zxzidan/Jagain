import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    LayoutDashboard,
    Flame,
    FileText,
    Map,
    Building2,
    History,
    ClipboardList,
    Plus,
    Menu,
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { User } from '@/types/auth';

export function MobileBottomNav() {
    const { auth } = usePage().props as { auth?: { user?: User } };
    const { isCurrentUrl } = useCurrentUrl();
    const { setOpenMobile } = useSidebar();
    const user = auth?.user;
    const isAdmin = user?.role === 'ADMIN' || user?.is_admin;
    const isAgency = user?.role === 'AGENCY' || user?.is_agency;

    return (
        <nav
            aria-label="Navigasi Bawah Mobile"
            className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-[#101512]/95 backdrop-blur-xl border-t border-neutral-200/80 dark:border-neutral-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-1 px-2 select-none"
        >
            <div className="flex items-center justify-around h-13 max-w-lg mx-auto">
                {isAdmin ? (
                    <>
                        <Link
                            href="/admin/dashboard"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/admin/dashboard')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <LayoutDashboard className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Kendali</span>
                        </Link>

                        <Link
                            href="/admin/reports"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/admin/reports')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <Flame className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Laporan</span>
                        </Link>

                        <Link
                            href="/admin/agencies"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/admin/agencies')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <Building2 className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Instansi</span>
                        </Link>

                        <Link
                            href="/admin/audit-logs"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/admin/audit-logs')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <History className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Audit</span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setOpenMobile(true)}
                            className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 transition-colors cursor-pointer min-h-[44px]"
                        >
                            <Menu className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Menu</span>
                        </button>
                    </>
                ) : isAgency ? (
                    <>
                        <Link
                            href="/opd/dashboard"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/opd/dashboard')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <LayoutGrid className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Dasbor</span>
                        </Link>

                        <Link
                            href="/opd/tugas"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/opd/tugas')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <ClipboardList className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Tugas</span>
                        </Link>

                        <Link
                            href="/opd/map"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/opd/map')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <Map className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Peta</span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setOpenMobile(true)}
                            className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 transition-colors cursor-pointer min-h-[44px]"
                        >
                            <Menu className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Menu</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/dashboard"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/dashboard')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <LayoutGrid className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Dasbor</span>
                        </Link>

                        <Link
                            href="/laporan-saya"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/laporan-saya')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <FileText className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Laporan</span>
                        </Link>

                        {/* Raised Center CTA for Rapid Fire Reporting on Mobile */}
                        <div className="flex flex-col items-center justify-center px-2 shrink-0">
                            <Link
                                href="/lapor"
                                prefetch
                                className="size-11 -mt-4 rounded-full bg-gradient-to-tr from-[#174B35] to-[#216B49] text-white flex items-center justify-center shadow-lg shadow-[#216B49]/35 border-[3px] border-white dark:border-[#101512] active:scale-95 transition-transform"
                                aria-label="Kirim Laporan Karhutla Baru"
                            >
                                <Plus className="size-5 stroke-[2.5]" />
                            </Link>
                            <span className="text-[10px] mt-0.5 font-bold text-[#174B35] dark:text-emerald-400">Lapor</span>
                        </div>

                        <Link
                            href="/peta"
                            prefetch
                            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors min-h-[44px] ${
                                isCurrentUrl('/peta')
                                    ? 'text-[#216B49] dark:text-emerald-400 font-bold'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                            }`}
                        >
                            <Map className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Peta</span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setOpenMobile(true)}
                            className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 transition-colors cursor-pointer min-h-[44px]"
                            aria-label="Buka menu lengkap"
                        >
                            <Menu className="size-4.5" />
                            <span className="text-[10px] mt-0.5 tracking-tight">Menu</span>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

