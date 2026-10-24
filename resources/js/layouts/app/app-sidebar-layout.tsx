import { usePage } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const page = usePage();
    const effectiveBreadcrumbs =
        breadcrumbs && breadcrumbs.length > 0
            ? breadcrumbs
            : (children as any)?.props?.breadcrumbs ||
              (page.props as any)?.breadcrumbs ||
              [];

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip">
                <AppSidebarHeader breadcrumbs={effectiveBreadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
