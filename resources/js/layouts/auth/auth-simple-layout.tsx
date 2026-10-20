import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-[#F3F7F4] p-4 sm:p-6 lg:p-8 text-[#171C19]">
            {/* Top Quick Return Link */}
            <div className="w-full max-w-md mb-4 flex items-center justify-between">
                <Link
                    href={home()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#216B49] hover:text-[#174B35] transition-colors"
                >
                    <span aria-hidden="true">&larr;</span> Kembali ke Beranda JAGAIN
                </Link>
                <span className="text-[11px] font-mono font-medium text-[#68716B]">
                    Platform Transparansi Karhutla
                </span>
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-8 shadow-xs">
                    <div className="flex flex-col items-center gap-3 text-center mb-6">
                        <Link
                            href={home()}
                            className="inline-flex flex-col items-center gap-2 group"
                        >
                            <div className="size-11 rounded-xl bg-[#E8F1EB] text-[#174B35] flex items-center justify-center border border-[#216B49]/20 group-hover:bg-[#174B35] group-hover:text-white transition-colors">
                                <AppLogoIcon className="size-6" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-extrabold tracking-tight text-[#174B35] text-base">JAGAIN</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F1EB] text-[#174B35]">
                                    Sistem Masuk
                                </span>
                            </div>
                        </Link>

                        <div className="space-y-1">
                            <h1 className="text-xl font-bold text-[#171C19] tracking-tight">{title}</h1>
                            {description && (
                                <p className="text-xs text-[#68716B] leading-relaxed max-w-xs mx-auto">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {children}
                </div>

                <div className="mt-6 text-center text-[11px] text-[#68716B] leading-relaxed">
                    Sistem pemantauan & pengawalan tindak lanjut karhutla Kalimantan terintegrasi.
                </div>
            </div>
        </div>
    );
}
