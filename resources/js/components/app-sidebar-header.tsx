import { Link, usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, ChevronLeft, ChevronRight, Globe, HelpCircle, Mail, Map, Share2 } from 'lucide-react';
import type { BreadcrumbItem as BreadcrumbItemType, User } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props as { auth?: { user?: User } };
    const isAdmin = auth?.user?.role === 'ADMIN' || (auth?.user as any)?.is_admin;
    const isAgency = auth?.user?.role === 'AGENCY' || (auth?.user as any)?.is_agency;
    const mapHref = isAdmin ? '/admin/map' : (isAgency ? '/opd/map' : '/peta');

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-3 sm:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 dark:bg-[#101512] gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <SidebarTrigger className="-ml-1 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg p-1.5 transition-colors shrink-0" />
                
                {/* Back / Forward Navigation Buttons */}
                <div className="hidden sm:flex items-center gap-1 shrink-0">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        title="Kembali"
                        className="size-7 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors shadow-2xs"
                    >
                        <ChevronLeft className="size-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => window.history.forward()}
                        title="Maju"
                        className="size-7 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors shadow-2xs"
                    >
                        <ChevronRight className="size-3.5" />
                    </button>
                </div>

                <div className="min-w-0 max-w-[130px] xs:max-w-[220px] sm:max-w-none overflow-hidden truncate">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {/* Utility action buttons */}
                <Link
                    href="/panduan-keselamatan"
                    title="Pusat Bantuan & SOP"
                    className="size-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors shadow-2xs"
                >
                    <HelpCircle className="size-4" />
                </Link>
                <Link
                    href="/lapor"
                    title="Buat Laporan Baru"
                    className="size-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors shadow-2xs"
                >
                    <Mail className="size-4" />
                </Link>
                <Link
                    href={isAdmin ? "/admin/reports" : "/dashboard"}
                    title="Notifikasi Antrean"
                    className="size-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors shadow-2xs relative"
                >
                    <Bell className="size-4" />
                    <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-500 animate-pulse" />
                </Link>

                {/* Primary Green CTA Button */}
                <Link
                    href={mapHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0c4e33] hover:bg-[#083824] text-xs font-bold text-white transition-all shadow-xs"
                >
                    <Share2 className="size-3.5" />
                    <span className="hidden xs:inline">Peta Sebaran</span>
                </Link>
            </div>
        </header>
    );
}
