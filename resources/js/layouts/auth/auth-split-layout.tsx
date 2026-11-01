import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-white dark:bg-[#07130b] text-gray-900 dark:text-gray-100 overflow-x-hidden">
            {/* LEFT COLUMN: Clean Full Visual Hero Image (Desktop) */}
            <div className="relative hidden lg:flex h-full min-h-screen flex-col justify-between overflow-hidden p-6 lg:p-8 xl:p-10 text-white bg-black">
                {/* Background Image: Kalimantan Karhutla / Peatland */}
                <img
                    src="/images/karhutla-gambut.jpg"
                    alt="Hutan Gambut Kalimantan"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* Subtle Gradient Overlays for High Photo Clarity & Top/Bottom Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/45 pointer-events-none" />

                {/* Top Return Link */}
                <div className="relative z-20">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide transition-all group shadow-sm hover:border-[#10e57a]/60 hover:text-[#10e57a]"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

                {/* Spacer to keep flex justify-between alignment */}
                <div className="flex-1 pointer-events-none" />

                {/* Bottom Left Footer Info with Frosted Glass Pill */}
                <div className="relative z-20 flex items-center justify-between text-xs text-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl bg-black/40 border border-white/15">
                    <span>© 2026 Jagain Kalimantan. All rights reserved.</span>
                    <span className="font-mono text-[11px] text-[#10e57a]">
                        Integritas & Pemulihan Ekosistem
                    </span>
                </div>
            </div>

            {/* RIGHT COLUMN: Minimalist Clean Form Panel */}
            <div className="w-full min-h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-14 bg-white dark:bg-[#07130b]">
                {/* Mobile Top Back Link (Hidden on lg) */}
                <div className="lg:hidden flex items-center justify-between pb-4 mb-2">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

                {/* Center Form Wrapper */}
                <div className="w-full max-w-[420px] sm:max-w-[450px] lg:max-w-[480px] mx-auto my-auto py-2 sm:py-3">
                    {/* Fallback Title/Description if provided by layout and not inside children */}
                    {title && (
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
                                {title}
                            </h1>
                            {description && (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                    {children}
                </div>

                {/* Bottom Right Footer Info */}
                <div className="pt-6 text-center text-xs text-gray-400 dark:text-gray-500 font-sans">
                    JAGAIN Kalimantan — Kolaborasi Warga & Aparatur Penegak Hukum
                </div>
            </div>
        </div>
    );
}
