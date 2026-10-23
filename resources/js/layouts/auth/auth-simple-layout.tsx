import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-[#f0eee6] p-4 sm:p-6 lg:p-8 text-[#141413]">
            {/* Top Quick Return Link */}
            <div className="w-full max-w-md mb-4 flex items-center justify-between">
                <Link
                    href={home()}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#141413] hover:text-[#d97757] transition-colors"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>Kembali ke Beranda JAGAIN</span>
                </Link>
                <span className="text-[11px] font-mono text-[#87867f]">
                    Platform Transparansi Karhutla
                </span>
            </div>

            <div className="w-full max-w-md">
                <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-6 sm:p-8 shadow-xs">
                    <div className="flex flex-col items-center gap-3 text-center mb-6">
                        <Link
                            href={home()}
                            className="inline-flex flex-col items-center gap-2 group"
                            aria-label="Beranda Jagain"
                        >
                            <img
                                src="/images/logo.png"
                                alt="jagain"
                                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3dacc]/70 text-[#141413] border border-[#cccbc8]">
                                Sistem Masuk
                            </span>
                        </Link>

                        <div className="space-y-1">
                            <h1 className="text-2xl font-serif font-normal text-[#141413]">{title}</h1>
                            {description && (
                                <p className="text-xs font-sans text-[#87867f] leading-relaxed max-w-xs mx-auto">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {children}
                </div>

                <div className="mt-6 text-center text-xs font-serif text-[#87867f] leading-relaxed">
                    Sistem pemantauan & pengawalan tindak lanjut karhutla Kalimantan terintegrasi.
                </div>
            </div>
        </div>
    );
}
