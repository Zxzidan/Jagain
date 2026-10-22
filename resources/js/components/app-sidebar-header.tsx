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
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#cccbc8] bg-[#faf9f5] px-4 sm:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-[#141413] hover:bg-[#e3dacc]" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="/peta"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#cccbc8] text-xs font-semibold text-[#141413] bg-[#faf9f5] hover:bg-[#e3dacc] transition-colors"
                >
                    <MapPin className="size-3.5 text-[#87867f]" />
                    Peta Karhutla
                </Link>
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#e3dacc] text-xs font-semibold text-[#141413] border border-[#cccbc8] hover:bg-[#141413] hover:text-[#faf9f5] transition-colors"
                >
                    <Globe className="size-3.5" />
                    <span>Website Publik</span>
                </Link>
            </div>
        </header>
    );
}
