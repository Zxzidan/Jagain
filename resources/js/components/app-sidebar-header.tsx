import { Link } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Globe, Map } from 'lucide-react';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-3 sm:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 dark:bg-[#101512] gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <SidebarTrigger className="-ml-1 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg p-1.5 transition-colors shrink-0" />
                <div className="min-w-0 max-w-[130px] xs:max-w-[220px] sm:max-w-none overflow-hidden truncate">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                <Link
                    href="/peta"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-semibold text-foreground bg-card hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-2xs"
                >
                    <Map className="size-3.5 text-[#216B49] dark:text-[#10e57a]" />
                    <span>Peta Karhutla</span>
                </Link>
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#E8F1EB] text-xs font-bold text-[#174B35] border border-[#DDE3DE] hover:bg-[#216B49] hover:text-white dark:bg-emerald-950/60 dark:text-[#10e57a] dark:border-emerald-800/40 dark:hover:bg-[#10e57a] dark:hover:text-black transition-all shadow-2xs whitespace-nowrap"
                >
                    <Globe className="size-3.5" />
                    <span className="hidden xs:inline">Website Publik</span>
                    <span className="xs:hidden">Publik</span>
                </Link>
            </div>
        </header>
    );
}
