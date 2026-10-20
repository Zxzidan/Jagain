import { Link } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Globe, MapPin } from 'lucide-react';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#DDE3DE] bg-white px-4 sm:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-[#174B35] hover:bg-[#E8F1EB]" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="/peta"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DDE3DE] text-xs font-semibold text-[#171C19] hover:bg-[#F3F7F4] transition-colors"
                >
                    <MapPin className="size-3.5 text-[#216B49]" />
                    Peta Karhutla
                </Link>
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F1EB] text-xs font-bold text-[#174B35] hover:bg-[#216B49] hover:text-white transition-colors"
                >
                    <Globe className="size-3.5" />
                    <span>Website Publik</span>
                </Link>
            </div>
        </header>
    );
}
