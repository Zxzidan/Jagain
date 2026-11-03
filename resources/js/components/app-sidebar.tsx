import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Flame,
    Building2,
    History,
    Map,
    ClipboardList,
    FileText,
    PlusCircle,
    Shield,
    ShieldCheck,
    Tags,
    LayoutDashboard,
    Search,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import type { User } from '@/types/auth';

export function AppSidebar() {
    const { auth } = usePage().props as { auth?: { user?: User } };
    const user = auth?.user;
    const isAdmin = user?.role === 'ADMIN' || user?.is_admin;
    const isAgency = user?.role === 'AGENCY' || user?.is_agency;

    const navItems: NavItem[] = [];

    if (isAdmin) {
        navItems.push(
            { title: 'Pusat Kendali', href: '/admin/dashboard', icon: LayoutDashboard },
            { title: 'Antrean & Laporan', href: '/admin/reports', icon: Flame },
            { title: 'Instansi & OPD', href: '/admin/agencies', icon: Building2 },
            { title: 'Kategori Karhutla', href: '/admin/categories', icon: Tags },
            { title: 'Audit Trail', href: '/admin/audit-logs', icon: History },
            { title: 'Peta Karhutla', href: '/admin/map', icon: Map }
        );
    } else if (isAgency) {
        navItems.push(
            { title: 'Dashboard OPD', href: '/opd/dashboard', icon: LayoutGrid },
            { title: 'Tugas Lapangan', href: '/opd/tugas', icon: ClipboardList },
            { title: 'Peta Karhutla', href: '/opd/map', icon: Map }
        );
    } else {
        navItems.push(
            { title: 'Dasbor Masyarakat', href: '/dashboard', icon: LayoutGrid },
            { title: 'Laporan Saya', href: '/laporan-saya', icon: FileText },
            { title: 'Buat Laporan Baru', href: '/lapor', icon: PlusCircle },
            { title: 'Peta Karhutla', href: '/peta', icon: Map },
            { title: 'Panduan Keselamatan', href: '/panduan-keselamatan', icon: Shield }
        );
    }

    const footerNavItems: NavItem[] = [
        { title: 'Peta Publik', href: '/peta', icon: Map },
        { title: 'Transparansi', href: '/tentang-kami', icon: ShieldCheck },
    ];

    const homeUrl = isAdmin
        ? '/admin/dashboard'
        : isAgency
        ? '/opd/dashboard'
        : '/dashboard';

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="border-b border-sidebar-border pb-3 bg-sidebar space-y-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                            <Link href={homeUrl} prefetch>
                                <AppLogo showTagline={false} />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Sidebar Search Bar matching reference layout */}
                <div className="relative px-1 group-data-[collapsible=icon]:hidden">
                    <Search className="size-3.5 absolute left-3.5 top-2.5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl pl-8 pr-8 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                    <kbd className="absolute right-3.5 top-2 text-[10px] font-mono text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded px-1">
                        ⌘K
                    </kbd>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-3 bg-sidebar">
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border pt-2 bg-sidebar">
                {/* Helper / SOP Card matching reference card */}
                <div className="p-3 mx-1 mb-2 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700 group-data-[collapsible=icon]:hidden">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white">
                        <span>Respon Darurat</span>
                        <span>🔥</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                        Panduan mitigasi & respon darurat karhutla
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                        <Link
                            href="/panduan-keselamatan"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0c4e33] text-white text-[11px] font-bold shadow-xs hover:bg-[#073623] transition-colors"
                        >
                            <FileText className="size-3" />
                            <span>Lihat SOP</span>
                        </Link>
                        <Link
                            href="/tentang-kami"
                            className="text-[11px] font-semibold text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                        >
                            Info
                        </Link>
                    </div>
                </div>

                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
