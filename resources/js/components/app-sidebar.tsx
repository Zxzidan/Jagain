import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    ClipboardList,
    FileSpreadsheet,
    Flame,
    History,
    LayoutDashboard,
    LayoutGrid,
    Tags,
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
import { dashboard } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as agenciesIndex } from '@/routes/admin/agencies';
import { index as auditLogsIndex } from '@/routes/admin/audit-logs';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { index as reportsIndex } from '@/routes/admin/reports';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.role === 'ADMIN';

    const adminNavItems: NavItem[] = [
        {
            title: 'Ringkasan Admin',
            href: adminDashboard(),
            icon: LayoutDashboard,
        },
        {
            title: 'Antrean & Laporan',
            href: reportsIndex(),
            icon: ClipboardList,
        },
        {
            title: 'Instansi & OPD',
            href: agenciesIndex(),
            icon: Building2,
        },
        {
            title: 'Kategori Karhutla',
            href: categoriesIndex(),
            icon: Tags,
        },
        {
            title: 'Jejak Audit Sistem',
            href: auditLogsIndex(),
            icon: History,
        },
    ];

    const standardNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Portal JAGAIN',
            href: '/',
            icon: Flame,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? adminDashboard() : dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={isAdmin ? adminNavItems : standardNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
