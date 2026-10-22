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

    const navItems: NavItem[] = [];

    if (user?.is_admin) {
        navItems.push(
            { title: 'Pusat Kendali', href: '/admin/dashboard', icon: LayoutGrid },
            { title: 'Antrean Laporan', href: '/admin/laporan', icon: Flame },
            { title: 'Kelola Instansi', href: '/admin/instansi', icon: Building2 },
            { title: 'Audit Trail', href: '/admin/audit-logs', icon: History },
            { title: 'Peta Karhutla', href: '/peta', icon: Map }
        );
    } else if (user?.is_agency) {
        navItems.push(
            { title: 'Dashboard OPD', href: '/opd/dashboard', icon: LayoutGrid },
            { title: 'Tugas Lapangan', href: '/opd/tugas', icon: ClipboardList },
            { title: 'Peta Karhutla', href: '/peta', icon: Map }
        );
    } else {
        navItems.push(
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

    const homeUrl = user?.is_admin
        ? '/admin/dashboard'
        : user?.is_agency
        ? '/opd/dashboard'
        : '/laporan-saya';

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
