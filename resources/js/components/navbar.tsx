import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Map, PlusCircle, Shield, FileText, Menu, X, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import AppLogo from '@/components/app-logo';

export default function Navbar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE3DE] shadow-[0_1px_3px_rgba(23,28,25,0.05)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                    <Link href="/" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#216B49] rounded-lg">
                        <AppLogo showTagline={true} />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        <Link
                            href="/"
                            className="px-3 py-1.5 text-sm font-medium text-[#343B36] hover:text-[#174B35] hover:bg-[#F3F7F4] rounded-md transition-colors"
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/peta"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#343B36] hover:text-[#174B35] hover:bg-[#F3F7F4] rounded-md transition-colors"
                        >
                            <Map className="size-4 text-[#216B49]" />
                            Peta Karhutla
                        </Link>
                        <Link
                            href="/panduan-keselamatan"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#343B36] hover:text-[#174B35] hover:bg-[#F3F7F4] rounded-md transition-colors"
                        >
                            <Shield className="size-4 text-[#39845C]" />
                            Panduan Keselamatan
                        </Link>
                        <Link
                            href="/tentang-kami"
                            className="px-3 py-1.5 text-sm font-medium text-[#343B36] hover:text-[#174B35] hover:bg-[#F3F7F4] rounded-md transition-colors"
                        >
                            Transparansi
                        </Link>
                    </nav>

                    {/* Right Action / Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                {user.is_admin && (
                                    <Link
                                        href="/admin/dashboard"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#174B35] text-white rounded-md hover:bg-[#216B49] transition-colors"
                                    >
                                        <LayoutDashboard className="size-3.5" />
                                        Dashboard Admin
                                    </Link>
                                )}

                                {user.is_agency && (
                                    <Link
                                        href="/opd/dashboard"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#216B49] text-white rounded-md hover:bg-[#174B35] transition-colors"
                                    >
                                        <LayoutDashboard className="size-3.5" />
                                        Dashboard OPD {user.agency?.code ? `(${user.agency.code})` : ''}
                                    </Link>
                                )}

                                <Link
                                    href="/laporan-saya"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#DDE3DE] text-[#171C19] hover:bg-[#F3F7F4] rounded-md transition-colors"
                                >
                                    <FileText className="size-3.5 text-[#216B49]" />
                                    Laporan Saya
                                </Link>

                                <Link
                                    href="/lapor"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-[#216B49] text-white hover:bg-[#174B35] rounded-md shadow-sm transition-all"
                                >
                                    <PlusCircle className="size-3.5" />
                                    Lapor Karhutla
                                </Link>

                                <div className="h-4 w-px bg-[#DDE3DE]" />

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center gap-1 text-xs text-[#68716B] hover:text-[#171C19] py-1.5 px-2 rounded hover:bg-[#F3F7F4]"
                                    title="Keluar akun"
                                >
                                    <LogOut className="size-3.5" />
                                    Keluar
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-3 py-1.5 text-sm font-medium text-[#343B36] hover:text-[#174B35] hover:bg-[#F3F7F4] rounded-md transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-3 py-1.5 text-sm font-medium border border-[#DDE3DE] text-[#171C19] hover:bg-[#F3F7F4] rounded-md transition-colors"
                                >
                                    Daftar Warga
                                </Link>
                                <Link
                                    href="/lapor"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold bg-[#216B49] text-white hover:bg-[#174B35] rounded-md shadow-sm transition-all ml-1"
                                >
                                    <PlusCircle className="size-4" />
                                    Buat Laporan
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <Link
                            href="/lapor"
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#216B49] text-white rounded-md"
                        >
                            <PlusCircle className="size-3.5" />
                            Lapor
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-[#343B36] hover:bg-[#F3F7F4] rounded-md focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-[#DDE3DE] bg-white px-4 pt-3 pb-6 space-y-2">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-[#171C19] hover:bg-[#F3F7F4] rounded-md"
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/peta"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-[#171C19] hover:bg-[#F3F7F4] rounded-md"
                    >
                        Peta Karhutla
                    </Link>
                    <Link
                        href="/panduan-keselamatan"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-[#171C19] hover:bg-[#F3F7F4] rounded-md"
                    >
                        Panduan Keselamatan
                    </Link>
                    <Link
                        href="/tentang-kami"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-[#171C19] hover:bg-[#F3F7F4] rounded-md"
                    >
                        Transparansi & Provenance
                    </Link>

                    <div className="border-t border-[#DDE3DE] pt-3">
                        {user ? (
                            <div className="space-y-2">
                                <div className="px-3 py-1 text-xs text-[#68716B]">
                                    Masuk sebagai: <strong>{user.name}</strong> ({user.role_label})
                                </div>
                                {user.is_admin && (
                                    <Link
                                        href="/admin/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-3 py-2 text-sm font-semibold bg-[#174B35] text-white rounded-md"
                                    >
                                        Dashboard Admin
                                    </Link>
                                )}
                                {user.is_agency && (
                                    <Link
                                        href="/opd/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-3 py-2 text-sm font-semibold bg-[#216B49] text-white rounded-md"
                                    >
                                        Dashboard OPD
                                    </Link>
                                )}
                                <Link
                                    href="/laporan-saya"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-sm font-medium border border-[#DDE3DE] rounded-md text-[#171C19]"
                                >
                                    Laporan Saya
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full text-left px-3 py-2 text-sm text-[#68716B] hover:text-[#171C19]"
                                >
                                    Keluar
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-center py-2 px-3 text-sm font-medium border border-[#DDE3DE] rounded-md text-[#171C19]"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-center py-2 px-3 text-sm font-semibold bg-[#216B49] text-white rounded-md"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
