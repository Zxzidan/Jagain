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
            {/* LEFT COLUMN: Visual & Floating Frosted Glass Card (Desktop) */}
            <div className="relative hidden lg:flex h-full min-h-screen flex-col justify-between overflow-hidden p-8 xl:p-12 text-white bg-[#022c15]">
                {/* Background Image: Kalimantan Karhutla / Peatland */}
                <img
                    src="/images/karhutla-gambut.jpg"
                    alt="Hutan Gambut Kalimantan"
                    className="absolute inset-0 h-full w-full object-cover object-center filter saturate-[0.85] contrast-[1.1] scale-105"
                />

                {/* Rich Gradient Overlays for High Legibility & Drama */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#02180b]/95 via-[#022c15]/85 to-[#011409]/90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                {/* Radiant Cyber-Green Ambient Light Bulbs (Matches reference vivid aesthetic) */}
                <div className="absolute -top-24 -left-24 size-96 rounded-full bg-[#10e57a]/25 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-[#10e57a]/20 blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 size-80 rounded-full bg-emerald-500/15 blur-[90px] pointer-events-none" />

                {/* Top Return Link */}
                <div className="relative z-20">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white text-xs font-semibold tracking-wide transition-all group shadow-sm hover:border-[#10e57a]/60 hover:text-[#10e57a]"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

                {/* Center Floating Frosted Glassmorphism Card */}
                <div className="relative z-20 my-auto py-6">
                    <div className="relative max-w-lg mx-auto rounded-3xl p-8 xl:p-12 backdrop-blur-2xl bg-white/10 border border-white/25 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] text-white">
                        {/* Glow highlight inside card */}
                        <div className="absolute -top-10 -right-10 size-40 bg-[#10e57a]/20 rounded-full blur-2xl pointer-events-none" />

                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10e57a]/20 border border-[#10e57a]/40 text-xs font-semibold text-[#10e57a] mb-6 backdrop-blur-sm">
                            <span className="size-2 rounded-full bg-[#10e57a] animate-pulse" />
                            <span>Platform Transparansi Karhutla Kalimantan</span>
                        </div>

                        {/* Main Impact Headline */}
                        <h2 className="text-3xl sm:text-4xl xl:text-[42px] font-black tracking-tight leading-[1.14] text-white">
                            Platform digital pengawalan karhutla Kalimantan.
                        </h2>

                        {/* Mission Tagline */}
                        <p className="mt-5 text-sm sm:text-base text-emerald-50/85 leading-relaxed font-normal">
                            Data terbuka, koordinat presisi, dan tuntas diaudit demi masa depan hutan Indonesia.
                        </p>

                        {/* Trust Pillars */}
                        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-3 text-center text-xs">
                            <div className="rounded-xl bg-white/5 p-2.5 backdrop-blur-xs">
                                <span className="block font-black text-[#10e57a] text-sm sm:text-base">24/7</span>
                                <span className="text-white/70 text-[11px]">Satelit Aktif</span>
                            </div>
                            <div className="rounded-xl bg-white/5 p-2.5 backdrop-blur-xs">
                                <span className="block font-black text-[#10e57a] text-sm sm:text-base">100%</span>
                                <span className="text-white/70 text-[11px]">Data Terbuka</span>
                            </div>
                            <div className="rounded-xl bg-white/5 p-2.5 backdrop-blur-xs">
                                <span className="block font-black text-[#10e57a] text-sm sm:text-base">Presisi</span>
                                <span className="text-white/70 text-[11px]">Koordinat Titik</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Left Footer Info */}
                <div className="relative z-20 flex items-center justify-between text-xs text-white/60">
                    <span>© 2026 Jagain Kalimantan. All rights reserved.</span>
                    <span className="font-mono text-[11px] text-[#10e57a]/90">
                        Integritas & Pemulihan Ekosistem
                    </span>
                </div>
            </div>

            {/* RIGHT COLUMN: Minimalist Clean Form Panel */}
            <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white dark:bg-[#07130b]">
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
                <div className="w-full max-w-[460px] sm:max-w-[490px] lg:max-w-[520px] mx-auto my-auto py-2 sm:py-4">
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
