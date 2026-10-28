import { useState, useEffect, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
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
    Tags,
    History,
    PlusCircle,
    LogIn,
    Shield,
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
    const headerRef = useRef<HTMLElement>(null);
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

    // Close on Escape key & close on Click Outside
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Close mobile menu when navigating with Inertia
    useEffect(() => {
        const unregister = router.on('navigate', () => {
            setMobileMenuOpen(false);
        });
        return () => unregister();
    }, []);

    const navItems = [
        { id: 'beranda', label: 'Beranda' },
        { id: 'peta-sebaran', label: 'Peta Sebaran' },
        { id: 'panduan-keselamatan', label: 'Panduan Keselamatan' },
        { id: 'transparansi', label: 'Transparansi' },
    ];

    const [activeSection, setActiveSection] = useState('beranda');

    // ScrollSpy to highlight the active navigation pill when scrolling on homepage
    useEffect(() => {
        if (!isHomePage) return;

        const sectionIds = ['beranda', 'peta-sebaran', 'panduan-keselamatan', 'transparansi'];

        const handleScrollSpy = () => {
            const scrollPosition = window.scrollY + 140;

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const section = document.getElementById(sectionIds[i]);
                if (section) {
                    const top = section.offsetTop;
                    if (scrollPosition >= top) {
                        setActiveSection(sectionIds[i]);
                        return;
                    }
                }
            }
            setActiveSection('beranda');
        };

        handleScrollSpy();
        window.addEventListener('scroll', handleScrollSpy, { passive: true });
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, [isHomePage]);

    // Handle initial hash scrolling if page is loaded with e.g. /#peta-sebaran
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            const hashId = window.location.hash.replace('#', '');
            const target = document.getElementById(hashId);
            if (target) {
                const timer = setTimeout(() => {
                    const navHeight = 72;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                    setActiveSection(hashId);
                }, 150);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
        if (isHomePage) {
            e.preventDefault();
            const target = document.getElementById(sectionId);
            if (target) {
                const navHeight = scrolled ? 60 : 72;
                const top = sectionId === 'beranda' ? 0 : target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top,
                    behavior: 'smooth',
                });
                setActiveSection(sectionId);
                window.history.pushState(null, '', sectionId === 'beranda' ? window.location.pathname : `#${sectionId}`);
            } else if (sectionId === 'beranda') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('beranda');
                window.history.pushState(null, '', window.location.pathname);
            }
        } else {
            e.preventDefault();
            router.visit(sectionId === 'beranda' ? '/' : `/#${sectionId}`);
        }
    };

    return (
        <header
            ref={headerRef}
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

                {/* Center Column: Desktop Navigation (Single-Page Anchor Scroll) */}
                <nav
                    aria-label="Navigasi Utama"
                    className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-sans border-0 outline-none flex-1 justify-center min-w-0 px-2"
                >
                    {navItems.map((item) => {
                        const active = isHomePage ? activeSection === item.id : false;
                        return (
                            <a
                                key={item.id}
                                href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                                onClick={(e) => handleNavClick(e, item.id)}
                                className={`h-8.5 px-3 xl:px-3.5 text-xs xl:text-sm font-semibold rounded-xl inline-flex items-center justify-center transition-all duration-200 select-none whitespace-nowrap cursor-pointer border-0 outline-none focus:outline-none focus:ring-0 ${
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
                            </a>
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
                                            <Link href="/admin/reports" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
                                                <Flame className="size-3.5 text-neutral-700" />
                                                <span>Antrean Verifikasi</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/agencies" className="cursor-pointer text-xs flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100">
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
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className={`h-9 px-4 text-xs xl:text-sm font-bold rounded-full inline-flex items-center justify-center transition-all duration-200 border ${
                                    scrolled
                                        ? 'text-neutral-800 hover:text-black hover:bg-neutral-100 border-neutral-200/90'
                                        : 'text-black hover:bg-black/10 border-black/25'
                                }`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="h-9 px-4.5 text-xs xl:text-sm font-bold rounded-full inline-flex items-center justify-center transition-all duration-200 bg-black text-white hover:bg-neutral-800 shadow-sm active:scale-95"
                            >
                                Registrasi
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Action Area */}
                <div className="flex md:hidden items-center gap-2">
                    {!user && (
                        <Link
                            href="/login"
                            className={`h-8 px-3 text-xs font-bold rounded-full inline-flex items-center justify-center transition-all border ${
                                scrolled
                                    ? 'bg-neutral-100 text-neutral-900 border-neutral-200'
                                    : 'bg-black/10 text-black border-black/20'
                            }`}
                        >
                            Login
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10e57a]/50 transition-colors select-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {mobileMenuOpen ? <X className="size-6 text-emerald-600" /> : <Menu className="size-6 text-neutral-900" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer / Dropdown */}
            {mobileMenuOpen && (
                <div
                    id="mobile-navigation"
                    role="navigation"
                    aria-label="Navigasi Utama Mobile"
                    className="md:hidden w-full max-w-full overflow-x-hidden bg-white/98 backdrop-blur-3xl border-b border-neutral-200/90 px-4 sm:px-6 py-5 shadow-2xl space-y-4 text-neutral-900 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    {/* User Role Card (If Logged In) */}
                    {user && (
                        <div className="p-3.5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="size-10 rounded-xl bg-[#10e57a] text-black font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-xs text-neutral-950 truncate">{user.name}</div>
                                    <div className="text-[11px] text-neutral-500 truncate">{user.email}</div>
                                </div>
                            </div>
                            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200/80 text-neutral-800">
                                {user.is_admin ? 'Admin' : user.is_agency ? 'OPD' : 'Masyarakat'}
                            </span>
                        </div>
                    )}

                    {/* On-Page Navigation Links */}
                    <div className="space-y-1">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                            Navigasi Konten
                        </div>
                        {navItems.map((item) => {
                            const active = isHomePage && activeSection === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                                    onClick={(e) => {
                                        setMobileMenuOpen(false);
                                        handleNavClick(e, item.id);
                                    }}
                                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                                        active
                                            ? 'bg-[#10e57a] text-black font-bold'
                                            : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    <ArrowRight className="size-3.5 opacity-60" />
                                </a>
                            );
                        })}
                    </div>

                    {/* Role-Specific Navigation Links */}
                    {user?.is_admin && (
                        <div className="space-y-1 pt-2 border-t border-neutral-100">
                            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                                <LayoutDashboard className="size-3" />
                                <span>Pusat Kendali Admin</span>
                            </div>
                            <Link
                                href="/admin/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <LayoutDashboard className="size-3.5 text-emerald-600" />
                                <span>Dashboard Admin</span>
                            </Link>
                            <Link
                                href="/admin/reports"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <Flame className="size-3.5 text-neutral-700" />
                                <span>Antrean & Laporan Karhutla</span>
                            </Link>
                            <Link
                                href="/admin/agencies"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <Building2 className="size-3.5 text-neutral-600" />
                                <span>Instansi & OPD Kewenangan</span>
                            </Link>
                            <Link
                                href="/admin/categories"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <Tags className="size-3.5 text-neutral-600" />
                                <span>Kategori Karhutla</span>
                            </Link>
                            <Link
                                href="/admin/audit-logs"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <History className="size-3.5 text-neutral-600" />
                                <span>Audit Trail Logs</span>
                            </Link>
                        </div>
                    )}

                    {user?.is_agency && (
                        <div className="space-y-1 pt-2 border-t border-neutral-100">
                            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                                <Building2 className="size-3" />
                                <span>Operasional Petugas OPD</span>
                            </div>
                            <Link
                                href="/opd/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <LayoutDashboard className="size-3.5 text-emerald-600" />
                                <span>Dashboard Operasi OPD</span>
                            </Link>
                            <Link
                                href="/opd/tugas"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <FileText className="size-3.5 text-neutral-600" />
                                <span>Daftar Penugasan Lapangan</span>
                            </Link>
                        </div>
                    )}

                    {/* Citizen & Account Links */}
                    {user ? (
                        <div className="space-y-1 pt-2 border-t border-neutral-100">
                            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                Akun & Pengaturan
                            </div>
                            <Link
                                href="/laporan-saya"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <FileText className="size-3.5 text-neutral-600" />
                                <span>Laporan Saya</span>
                            </Link>
                            <Link
                                href="/settings/profile"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                            >
                                <UserIcon className="size-3.5 text-neutral-600" />
                                <span>Profil & Keamanan Akun</span>
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="w-full text-left flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            >
                                <LogOut className="size-3.5" />
                                <span>Keluar dari Akun</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-2 pt-3 border-t border-neutral-100">
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-2.5 px-4 text-xs font-bold text-center text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                <LogIn className="size-3.5" />
                                <span>Login</span>
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-2.5 px-4 text-xs font-bold text-center text-black bg-[#10e57a] hover:bg-[#0ba856] rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                            >
                                <PlusCircle className="size-3.5" />
                                <span>Registrasi</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
