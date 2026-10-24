import { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import SpecularButton from '@/components/react-bits/SpecularButton';
import {
    ArrowRight,
    Menu,
    X,
    LayoutDashboard,
    LogOut,
    User as UserIcon,
    Flame,
    Building2,
    ChevronDown,
    FileText,
} from 'lucide-react';
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
    const isHomePage = currentPath === '/' || currentPath === '';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY >= 100);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        if (path === '/') return currentPath === '/';
        return currentPath.startsWith(path);
    };

    const navItems = [
        { label: 'Beranda', href: '/' },
        { label: 'Peta Sebaran', href: '/peta' },
        { label: 'Panduan Keselamatan', href: '/panduan-keselamatan' },
        { label: 'Transparansi', href: '/tentang-kami' },
        ...(user ? [{ label: 'Laporan Saya', href: '/laporan-saya' }] : []),
    ];

    const getActiveNavIndex = () => {
        if (currentPath.startsWith('/peta')) return 1;
        if (currentPath.startsWith('/panduan-keselamatan')) return 2;
        if (currentPath.startsWith('/tentang-kami')) return 3;
        if (currentPath.startsWith('/laporan-saya')) return 4;
        return 0; // Beranda
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-out ${
                scrolled
                    ? 'bg-white/85 backdrop-blur-2xl border-b border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
                    : 'bg-transparent border-b border-transparent shadow-none'
            }`}
        >
            <div
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ease-out ${
                    scrolled ? 'h-14 sm:h-[60px]' : 'h-16 sm:h-[72px]'
                }`}
            >
                {/* Left Column: Brand Logo */}
                <div className="flex items-center justify-start shrink-0">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 focus:outline-none group select-none"
                        aria-label="Beranda Jagain"
                    >
                        <img
                            src="/images/logo.png"
                            alt="jagain"
                            className="h-8 sm:h-8.5 w-auto object-contain group-hover:scale-105 transition-transform"
                        />
                    </Link>
                </div>

                {/* Center Column: Desktop Navigation */}
                <nav
                    aria-label="Navigasi Utama"
                    className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-sans border-0 outline-none flex-1 justify-center min-w-0 px-2"
                >
                    {navItems.map((item, idx) => {
                        const active = getActiveNavIndex() === idx;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`h-8.5 px-3 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-xl inline-flex items-center justify-center transition-all duration-200 select-none whitespace-nowrap border-0 outline-none focus:outline-none focus:ring-0 ${
                                    active
                                        ? scrolled || !isHomePage
                                            ? 'bg-neutral-950 text-white font-bold shadow-xs'
                                            : 'bg-black text-white font-bold shadow-xs'
                                        : scrolled || !isHomePage
                                        ? 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                                        : 'text-black/85 hover:text-black hover:bg-black/10'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Column: Masuk & Actions */}
                <div className="hidden md:flex items-center justify-end shrink-0 gap-2 xl:gap-2.5 font-sans">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className={`h-9 inline-flex items-center gap-2 px-3 text-xs xl:text-sm text-neutral-800 rounded-xl transition-all border-0 outline-none focus:outline-none focus:ring-0 shrink-0 ${
                                    scrolled
                                        ? 'bg-neutral-100 hover:bg-neutral-200/70'
                                        : 'bg-black/10 hover:bg-black/15 backdrop-blur-sm'
                                }`}
                            >
                                <div className="size-5.5 rounded-lg bg-[#10e57a] text-black flex items-center justify-center text-[11px] font-black shrink-0">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <span className="max-w-[100px] xl:max-w-[130px] truncate font-semibold text-xs xl:text-sm">{user.name}</span>
                                <ChevronDown className="size-3.5 text-neutral-500 shrink-0" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2 bg-white border border-neutral-200 rounded-2xl text-neutral-900 shadow-2xl p-2 backdrop-blur-xl">
                                <DropdownMenuLabel className="font-normal px-3 py-2">
                                    <p className="text-xs font-bold text-neutral-900">{user.name}</p>
                                    <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-neutral-100 my-1" />

                                {user.is_admin && (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/dashboard" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                                <LayoutDashboard className="size-3.5 text-emerald-600" />
                                                <span>Pusat Kendali Admin</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/laporan" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                                <Flame className="size-3.5 text-neutral-700" />
                                                <span>Antrean Verifikasi</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/instansi" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                                <Building2 className="size-3.5 text-neutral-500" />
                                                <span>Kelola Instansi</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-neutral-100 my-1" />
                                    </>
                                )}

                                {user.is_agency && (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link href="/opd/dashboard" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                                <LayoutDashboard className="size-3.5 text-emerald-600" />
                                                <span>Dashboard OPD</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/opd/tugas" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                                <FileText className="size-3.5 text-neutral-500" />
                                                <span>Daftar Penugasan</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-neutral-100 my-1" />
                                    </>
                                )}

                                <DropdownMenuItem asChild>
                                    <Link href="/laporan-saya" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                        <FileText className="size-3.5 text-neutral-500" />
                                        <span>Laporan Saya</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings/profile" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                        <UserIcon className="size-3.5 text-neutral-500" />
                                        <span>Profil & Keamanan</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-neutral-100 my-1" />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="w-full text-left text-xs text-neutral-800 hover:bg-neutral-100 px-3 py-2 cursor-pointer flex items-center gap-2 rounded-xl transition-colors font-medium"
                                    >
                                        <LogOut className="size-3.5 text-neutral-600" />
                                        <span>Keluar</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            href="/login"
                            className={`h-9 px-4 text-sm font-semibold rounded-xl inline-flex items-center justify-center transition-all duration-200 border-0 outline-none focus:outline-none focus:ring-0 ${
                                scrolled
                                    ? 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                                    : 'text-black/85 hover:text-black hover:bg-black/10'
                            }`}
                        >
                            Masuk
                        </Link>
                    )}

                    {/* Specular Edge-Lit Button for Lapor Karhutla */}
                    <SpecularButton
                        size="sm"
                        radius={12}
                        tint="#10e57a"
                        tintOpacity={1}
                        textColor="#000000"
                        lineColor="#ffffff"
                        baseColor="#0ba856"
                        intensity={1.2}
                        idleIntensity={0.35}
                        glow={1}
                        followMouse
                        onClick={() => router.visit('/lapor')}
                        className="h-9 font-bold text-xs sm:text-sm pl-3.5 pr-1.5 inline-flex items-center shadow-[0_2px_12px_rgba(16,229,122,0.3)] active:scale-95 shrink-0 whitespace-nowrap"
                    >
                        <span className="flex items-center gap-2">
                            <span>Lapor Karhutla</span>
                            <span className="size-6 rounded-lg bg-black text-white flex items-center justify-center">
                                <ArrowRight className="size-3.5" />
                            </span>
                        </span>
                    </SpecularButton>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-2">
                    <SpecularButton
                        size="sm"
                        radius={10}
                        tint="#10e57a"
                        tintOpacity={1}
                        textColor="#000000"
                        lineColor="#ffffff"
                        baseColor="#0ba856"
                        intensity={1}
                        idleIntensity={0.3}
                        glow={0.8}
                        onClick={() => router.visit('/lapor')}
                        className="font-bold text-xs px-3 py-1 shadow-xs"
                    >
                        Lapor
                    </SpecularButton>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-1.5 text-neutral-800 hover:bg-neutral-100 rounded-lg focus:outline-none transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="size-5 text-emerald-600" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden w-full bg-white/98 backdrop-blur-3xl border-b border-neutral-200 px-6 py-5 shadow-2xl space-y-2 text-neutral-900">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isActive('/') ? 'bg-[#10e57a] text-black' : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                        }`}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/peta"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isActive('/peta') ? 'bg-[#10e57a] text-black' : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                        }`}
                    >
                        Peta Sebaran
                    </Link>
                    <Link
                        href="/panduan-keselamatan"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isActive('/panduan-keselamatan') ? 'bg-[#10e57a] text-black' : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                        }`}
                    >
                        Panduan Keselamatan
                    </Link>
                    <Link
                        href="/tentang-kami"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            isActive('/tentang-kami') ? 'bg-[#10e57a] text-black' : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                        }`}
                    >
                        Transparansi
                    </Link>

                    <div className="border-t border-neutral-200 pt-3 mt-2">
                        {user ? (
                            <div className="space-y-1.5">
                                <Link
                                    href="/laporan-saya"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-xs font-medium text-neutral-700 hover:text-black"
                                >
                                    Laporan Saya
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 rounded-xl"
                                >
                                    Keluar
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-center py-2 px-4 text-xs font-semibold text-neutral-800 bg-neutral-100 rounded-xl"
                            >
                                Masuk ke Akun
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
