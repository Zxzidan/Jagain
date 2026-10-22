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
            { title: 'Peta Karhutla', href: '/peta', icon: Map }
        );
    } else if (isAgency) {
        navItems.push(
            { title: 'Dashboard OPD', href: '/opd/dashboard', icon: LayoutGrid },
            { title: 'Tugas Lapangan', href: '/opd/tugas', icon: ClipboardList },
            { title: 'Peta Karhutla', href: '/peta', icon: Map }
        );
    } else {
        navItems.push(
            { title: 'Dasbor Masyarakat', href: '/dashboard', icon: LayoutGrid },
            { title: 'Laporan Saya', href: '/reports', icon: FileText },
            { title: 'Buat Laporan Baru', href: '/reports/create', icon: PlusCircle },
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
        <Sidebar collapsible="icon" variant="inset" className="border-r border-[#cccbc8] bg-[#f0eee6]">
            <SidebarHeader className="border-b border-[#cccbc8] pb-3 bg-[#f0eee6]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-[#e3dacc]">
                            <Link href={homeUrl} prefetch>
                                <AppLogo showTagline={false} />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2 py-3 bg-[#f0eee6]">
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-[#cccbc8] pt-2 bg-[#f0eee6]">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
