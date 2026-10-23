import { Link, router, usePage } from '@inertiajs/react';
import {
    Building2,
    ClipboardList,
    FileSpreadsheet,
    Flame,
    Globe,
    History,
    LayoutDashboard,
    LogOut,
    Settings,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { logout } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as agenciesIndex } from '@/routes/admin/agencies';
import { index as auditLogsIndex } from '@/routes/admin/audit-logs';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { reports as reportsExport } from '@/routes/admin/exports';
import { index as reportsIndex } from '@/routes/admin/reports';
import { edit as profileEdit } from '@/routes/profile';
import { ThemeInlineSelector, ThemeToggle } from '@/components/theme-toggle';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { auth } = usePage().props;
    const currentUrl = usePage().url;
    const getInitials = useInitials();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Close user dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile sidebar on route visit
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [currentUrl]);

    const navItems = [
        {
            title: 'Ringkasan',
            href: adminDashboard(),
            icon: LayoutDashboard,
            isActive: currentUrl === '/admin' || currentUrl === '/admin/',
        },
        {
            title: 'Antrean & Laporan',
            href: reportsIndex(),
            icon: ClipboardList,
            isActive: currentUrl.startsWith('/admin/reports'),
        },
        {
            title: 'Instansi & OPD',
            href: agenciesIndex(),
            icon: Building2,
            isActive: currentUrl.startsWith('/admin/agencies'),
        },
        {
            title: 'Kategori Karhutla',
            href: categoriesIndex(),
            icon: Flame,
            isActive: currentUrl.startsWith('/admin/categories'),
        },
        {
            title: 'Jejak Audit Sistem',
            href: auditLogsIndex(),
            icon: History,
            isActive: currentUrl.startsWith('/admin/audit-logs'),
        },
        {
            title: 'Ekspor Rekap',
            href: reportsExport(),
            icon: FileSpreadsheet,
            isActive: currentUrl.startsWith('/admin/exports'),
        },
    ];

    const user = auth?.user;
    const userInitials = user?.name ? getInitials(user.name) : 'A';

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 z-50 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                <div className="px-3 py-2.5 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        {/* Left: Hamburger & Logo */}
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="top-bar-sidebar"
                                data-drawer-toggle="top-bar-sidebar"
                                aria-controls="top-bar-sidebar"
                                type="button"
                                onClick={() => setIsSidebarOpen((prev) => !prev)}
                                className="sm:hidden text-neutral-600 dark:text-neutral-300 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700 font-medium rounded-lg text-sm p-2 focus:outline-none"
                            >
                                <span className="sr-only">Buka navigasi</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="M5 7h14M5 12h14M5 17h10"
                                    />
                                </svg>
                            </button>

                            <Link
                                href={adminDashboard()}
                                className="flex items-center ms-2 md:me-12 gap-2.5 group"
                            >
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#216B49] text-white shadow-xs transition group-hover:bg-[#174B35]">
                                    <Flame className="size-5 fill-current" />
                                </div>
                                <span className="self-center text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                                    JAGAIN
                                </span>
                                <span className="hidden sm:inline-flex items-center rounded-md bg-[#E8F1EB] px-2 py-0.5 text-xs font-semibold text-[#216B49] dark:bg-emerald-950 dark:text-emerald-400">
                                    Admin
                                </span>
                            </Link>
                        </div>

                        {/* Right: Theme Toggle & User Menu */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <ThemeToggle />

                            <div className="relative flex items-center ms-1" ref={userMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                                    className="flex items-center gap-2 text-sm rounded-full focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700"
                                    aria-expanded={isUserMenuOpen}
                                    data-dropdown-toggle="dropdown-user"
                                >
                                    <span className="sr-only">Buka menu akun</span>
                                    <div className="flex size-8 items-center justify-center rounded-full bg-[#216B49] text-white text-xs font-bold ring-2 ring-white dark:ring-neutral-800">
                                        {userInitials}
                                    </div>
                                    <span className="hidden md:inline text-xs font-medium text-neutral-700 dark:text-neutral-200">
                                        {user?.name ?? 'Admin'}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div
                                        id="dropdown-user"
                                        className="absolute right-0 top-full mt-2 z-50 w-52 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg py-1 text-sm animate-in fade-in-50 zoom-in-95 duration-100"
                                    >
                                        <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                                            <p className="font-semibold text-neutral-900 dark:text-white truncate">
                                                {user?.name ?? 'Administrator'}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                                {user?.email ?? 'admin@jagain.id'}
                                            </p>
                                            <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E8F1EB] text-[#216B49] dark:bg-emerald-950 dark:text-emerald-400">
                                                {user?.role ?? 'ADMIN'}
                                            </span>
                                        </div>

                                        <ul className="p-1 space-y-0.5">
                                            <li>
                                                <Link
                                                    href={adminDashboard()}
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-2.5 w-full px-3 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
                                                >
                                                    <LayoutDashboard className="size-4 text-neutral-500 dark:text-neutral-400" />
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={profileEdit()}
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-2.5 w-full px-3 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
                                                >
                                                    <Settings className="size-4 text-neutral-500 dark:text-neutral-400" />
                                                    <span>Pengaturan</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-2.5 w-full px-3 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
                                                >
                                                    <Globe className="size-4 text-neutral-500 dark:text-neutral-400" />
                                                    <span>Portal Publik</span>
                                                </Link>
                                            </li>
                                        </ul>

                                        <div className="px-3 py-2 border-t border-neutral-200 dark:border-neutral-800">
                                            <span className="mb-1.5 block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                                                Tema Tampilan
                                            </span>
                                            <ThemeInlineSelector />
                                        </div>

                                        <div className="border-t border-neutral-200 dark:border-neutral-800 p-1">
                                            <Link
                                                href={logout()}
                                                method="post"
                                                as="button"
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    router.flushAll();
                                                }}
                                                className="flex items-center gap-2.5 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition text-left"
                                            >
                                                <LogOut className="size-4" />
                                                <span>Keluar</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile backdrop overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-neutral-900/50 backdrop-blur-xs sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Fixed Sidebar */}
            <aside
                id="top-bar-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-full pt-14 transition-transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto flex flex-col justify-between">
                    <div>
                        <div className="px-2 pb-3 mb-2 border-b border-neutral-200 dark:border-neutral-800">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                Menu Navigasi
                            </span>
                        </div>

                        <ul className="space-y-1 font-medium">
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <li key={item.title}>
                                        <Link
                                            href={item.href}
                                            prefetch
                                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group ${
                                                item.isActive
                                                    ? 'bg-[#E8F1EB] text-[#216B49] font-semibold dark:bg-emerald-950/70 dark:text-emerald-300'
                                                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
                                            }`}
                                        >
                                            <IconComponent
                                                className={`size-5 shrink-0 transition duration-75 ${
                                                    item.isActive
                                                        ? 'text-[#216B49] dark:text-emerald-300'
                                                        : 'text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white'
                                                }`}
                                            />
                                            <span className="ms-3">{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="my-4 border-t border-neutral-200 dark:border-neutral-800" />

                        <ul className="space-y-1 font-medium">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center px-3 py-2 text-sm rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white transition-colors group"
                                >
                                    <Globe className="size-5 shrink-0 text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white transition duration-75" />
                                    <span className="ms-3">Portal Warga</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Theme Mode Selector in Sidebar */}
                    <div className="mb-3 px-1">
                        <span className="mb-1.5 block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                            Tema Tampilan
                        </span>
                        <ThemeInlineSelector />
                    </div>

                    {/* Bottom System Status Widget */}
                    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/60 p-3 border border-neutral-200 dark:border-neutral-800 text-xs">
                        <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Sistem Aktif</span>
                        </div>
                        <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                            JAGAIN &bull; Prov. Kalimantan Barat
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="p-4 sm:ml-64 mt-14 min-h-[calc(100vh-3.5rem)]">
                {children}
            </div>
        </div>
    );
}
