import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Map,
    PlusCircle,
    Shield,
    FileText,
    Menu,
    X,
    LayoutDashboard,
    LogOut,
    User as UserIcon,
    Flame,
    Building2,
    ChevronDown,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/types/auth';

export default function Navbar() {
    const { auth, url } = usePage().props as { auth?: { user?: User }; url?: string };
    const user = auth?.user;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : (url || '/');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return currentPath === '/';
        return currentPath.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#171C19]/90 backdrop-blur-md border-b border-[#DDE3DE] dark:border-[#343B36] transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Logo with Tagline */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#216B49] rounded-lg group"
                    >
                        <AppLogo showTagline={true} />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href="/"
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                isActive('/')
                                    ? 'text-[#174B35] font-semibold bg-[#E8F1EB] dark:bg-[#26332C] dark:text-[#E8F1EB]'
                                    : 'text-[#343B36] dark:text-[#9AA39D] hover:text-[#174B35] hover:bg-[#F3F7F4] dark:hover:bg-[#1F2522]'
                            }`}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/peta"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                isActive('/peta')
                                    ? 'text-[#174B35] font-semibold bg-[#E8F1EB] dark:bg-[#26332C] dark:text-[#E8F1EB]'
                                    : 'text-[#343B36] dark:text-[#9AA39D] hover:text-[#174B35] hover:bg-[#F3F7F4] dark:hover:bg-[#1F2522]'
                            }`}
                        >
                            <Map className="size-3.5 text-[#216B49]" />
                            Peta Karhutla
                        </Link>
                        <Link
                            href="/panduan-keselamatan"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                isActive('/panduan-keselamatan')
                                    ? 'text-[#174B35] font-semibold bg-[#E8F1EB] dark:bg-[#26332C] dark:text-[#E8F1EB]'
                                    : 'text-[#343B36] dark:text-[#9AA39D] hover:text-[#174B35] hover:bg-[#F3F7F4] dark:hover:bg-[#1F2522]'
                            }`}
                        >
                            <Shield className="size-3.5 text-[#39845C]" />
                            Panduan Keselamatan
                        </Link>
                        <Link
                            href="/tentang-kami"
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                isActive('/tentang-kami')
                                    ? 'text-[#174B35] font-semibold bg-[#E8F1EB] dark:bg-[#26332C] dark:text-[#E8F1EB]'
                                    : 'text-[#343B36] dark:text-[#9AA39D] hover:text-[#174B35] hover:bg-[#F3F7F4] dark:hover:bg-[#1F2522]'
                            }`}
                        >
                            Transparansi
                        </Link>
                    </nav>

                    {/* Right Actions & Account Menu */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/lapor"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-[#216B49] text-white hover:bg-[#174B35] rounded-full shadow-sm hover:shadow active:scale-[0.98] transition-all"
                        >
                            <PlusCircle className="size-3.5" />
                            <span>Lapor Karhutla</span>
                        </Link>

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-[#171C19] dark:text-[#F3F7F4] bg-[#F3F7F4] dark:bg-[#1F2522] border border-[#DDE3DE] dark:border-[#343B36] rounded-full hover:bg-[#E8F1EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#216B49]">
                                    <div className="size-5 rounded-full bg-[#174B35] text-white flex items-center justify-center text-[10px] font-semibold">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="max-w-[120px] truncate">{user.name}</span>
                                    {user.is_admin && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#174B35] text-white rounded">
                                            Admin
                                        </span>
                                    )}
                                    {user.is_agency && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#39845C] text-white rounded">
                                            {user.agency?.code || 'OPD'}
                                        </span>
                                    )}
                                    <ChevronDown className="size-3 text-[#68716B]" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 mt-1 border-[#DDE3DE] dark:border-[#343B36]">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-0.5">
                                            <p className="text-xs font-semibold text-[#171C19] dark:text-[#F3F7F4]">{user.name}</p>
                                            <p className="text-[11px] text-[#68716B] truncate">{user.email}</p>
                                            <span className="inline-block mt-1 text-[10px] text-[#216B49] font-medium">
                                                Role: {user.role_label || user.role}
                                            </span>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[#DDE3DE] dark:bg-[#343B36]" />

                                    {/* Role Specific Actions */}
                                    {user.is_admin && (
                                        <>
                                            <DropdownMenuItem asChild>
                                                <Link href="/admin/dashboard" className="cursor-pointer text-xs flex items-center gap-2">
                                                    <LayoutDashboard className="size-3.5 text-[#174B35]" />
                                                    <span>Pusat Kendali Admin</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/admin/laporan" className="cursor-pointer text-xs flex items-center gap-2">
                                                    <Flame className="size-3.5 text-[#216B49]" />
                                                    <span>Antrean Verifikasi Laporan</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/admin/instansi" className="cursor-pointer text-xs flex items-center gap-2">
                                                    <Building2 className="size-3.5 text-[#39845C]" />
                                                    <span>Kelola Instansi / OPD</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#DDE3DE] dark:bg-[#343B36]" />
                                        </>
                                    )}

                                    {user.is_agency && (
                                        <>
                                            <DropdownMenuItem asChild>
                                                <Link href="/opd/dashboard" className="cursor-pointer text-xs flex items-center gap-2">
                                                    <LayoutDashboard className="size-3.5 text-[#216B49]" />
                                                    <span>Dashboard OPD {user.agency?.code ? `(${user.agency.code})` : ''}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/opd/tugas" className="cursor-pointer text-xs flex items-center gap-2">
                                                    <FileText className="size-3.5 text-[#216B49]" />
                                                    <span>Daftar Penugasan Lapangan</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#DDE3DE] dark:bg-[#343B36]" />
                                        </>
                                    )}

                                    <DropdownMenuItem asChild>
                                        <Link href="/laporan-saya" className="cursor-pointer text-xs flex items-center gap-2">
                                            <FileText className="size-3.5 text-[#216B49]" />
                                            <span>Laporan Saya</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings/profile" className="cursor-pointer text-xs flex items-center gap-2">
                                            <UserIcon className="size-3.5 text-[#68716B]" />
                                            <span>Profil & Keamanan</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="bg-[#DDE3DE] dark:bg-[#343B36]" />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full text-left text-xs text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-2"
                                        >
                                            <LogOut className="size-3.5" />
                                            <span>Keluar</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <Link
                                    href="/login"
                                    className="px-3 py-1.5 text-xs font-medium text-[#343B36] dark:text-[#F3F7F4] hover:text-[#174B35] hover:bg-[#F3F7F4] dark:hover:bg-[#1F2522] rounded-md transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-3 py-1.5 text-xs font-medium border border-[#DDE3DE] dark:border-[#343B36] text-[#171C19] dark:text-[#F3F7F4] hover:bg-[#F3F7F4] dark:hover:bg-[#1F2522] rounded-md transition-colors"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <Link
                            href="/lapor"
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#216B49] text-white rounded-full shadow-sm"
                        >
                            <PlusCircle className="size-3.5" />
                            <span>Lapor</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-[#343B36] dark:text-[#F3F7F4] hover:bg-[#F3F7F4] dark:hover:bg-[#1F2522] rounded-lg focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-[#DDE3DE] dark:border-[#343B36] bg-white dark:bg-[#171C19] px-4 pt-3 pb-6 space-y-1 shadow-lg">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-sm font-medium rounded-md ${
                            isActive('/') ? 'bg-[#E8F1EB] text-[#174B35] font-semibold' : 'text-[#343B36] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/peta"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-sm font-medium rounded-md ${
                            isActive('/peta') ? 'bg-[#E8F1EB] text-[#174B35] font-semibold' : 'text-[#343B36] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Peta Karhutla
                    </Link>
                    <Link
                        href="/panduan-keselamatan"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-sm font-medium rounded-md ${
                            isActive('/panduan-keselamatan') ? 'bg-[#E8F1EB] text-[#174B35] font-semibold' : 'text-[#343B36] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Panduan Keselamatan
                    </Link>
                    <Link
                        href="/tentang-kami"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-sm font-medium rounded-md ${
                            isActive('/tentang-kami') ? 'bg-[#E8F1EB] text-[#174B35] font-semibold' : 'text-[#343B36] hover:bg-[#F3F7F4]'
                        }`}
                    >
                        Transparansi & Provenance
                    </Link>

                    <div className="border-t border-[#DDE3DE] dark:border-[#343B36] pt-3 mt-2">
                        {user ? (
                            <div className="space-y-1.5">
                                <div className="px-3 py-1.5 bg-[#F3F7F4] dark:bg-[#1F2522] rounded-md text-xs text-[#343B36] dark:text-[#9AA39D]">
                                    Masuk sebagai: <strong className="text-[#171C19] dark:text-white">{user.name}</strong> ({user.role_label || user.role})
                                </div>
                                {user.is_admin && (
                                    <Link
                                        href="/admin/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-3 py-2 text-xs font-semibold bg-[#174B35] text-white rounded-md"
                                    >
                                        Pusat Kendali Admin
                                    </Link>
                                )}
                                {user.is_agency && (
                                    <Link
                                        href="/opd/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-3 py-2 text-xs font-semibold bg-[#216B49] text-white rounded-md"
                                    >
                                        Dashboard OPD {user.agency?.code ? `(${user.agency.code})` : ''}
                                    </Link>
                                )}
                                <Link
                                    href="/laporan-saya"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-xs font-medium border border-[#DDE3DE] dark:border-[#343B36] rounded-md text-[#171C19] dark:text-[#F3F7F4]"
                                >
                                    Laporan Saya
                                </Link>
                                <Link
                                    href="/settings/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-xs font-medium border border-[#DDE3DE] dark:border-[#343B36] rounded-md text-[#171C19] dark:text-[#F3F7F4]"
                                >
                                    Profil & Keamanan Akun
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md"
                                >
                                    Keluar
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-center py-2 px-3 text-xs font-medium border border-[#DDE3DE] rounded-md text-[#171C19]"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-center py-2 px-3 text-xs font-semibold bg-[#216B49] text-white rounded-md"
                                >
                                    Daftar Warga
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
