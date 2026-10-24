import { Link } from '@inertiajs/react';
import { ShieldAlert, PhoneCall, CheckCircle2 } from 'lucide-react';
import GrassBreezeBackdrop from '@/components/grass-breeze-backdrop';

export default function Footer() {
    return (
        <footer className="bg-[#10e57a] text-neutral-950 border-t border-black/10 pt-16 pb-12 font-sans relative overflow-hidden">
            <GrassBreezeBackdrop />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-black/15">
                    {/* Col 1: Identity & Scope (4 cols) */}
                    <div className="md:col-span-4 space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2.5 focus:outline-none group" aria-label="Beranda Jagain">
                            <img
                                src="/images/logo.png"
                                alt="jagain"
                                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                            />
                        </Link>

                        <p className="text-xs text-neutral-900/80 leading-relaxed max-w-sm font-medium">
                            Platform independen transparansi karhutla Kalimantan. Mengawal laporan warga, pantauan satelit, dan audit lapangan secara terbuka.
                        </p>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-bold tracking-wider shadow-xs">
                            <span className="size-1.5 rounded-full bg-[#10e57a] animate-pulse" />
                            <span>5 PROVINSI KALIMANTAN</span>
                        </div>
                    </div>

                    {/* Col 2: Navigasi (2 cols) */}
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-black/70">
                            Navigasi
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/peta" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Peta Sebaran
                                </Link>
                            </li>
                            <li>
                                <Link href="/lapor" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Lapor Karhutla
                                </Link>
                            </li>
                            <li>
                                <Link href="/panduan-keselamatan" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Panduan Warga
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang-kami" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Transparansi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Metodologi & Integritas (3 cols) */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-black/70">
                            Integritas Data
                        </h4>
                        <div className="space-y-2.5 text-xs">
                            <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-black/10 shadow-xs space-y-1">
                                <div className="flex items-center gap-1.5 text-neutral-950 font-bold text-[11px]">
                                    <CheckCircle2 className="size-3.5 text-emerald-700 shrink-0" />
                                    <span>Sensor Satelit Termal</span>
                                </div>
                                <p className="text-[11px] text-neutral-700 leading-normal font-medium">
                                    Anomali radiasi NASA FIRMS & BMKG sebagai indikator awal.
                                </p>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-black/10 shadow-xs space-y-1">
                                <div className="flex items-center gap-1.5 text-neutral-950 font-bold text-[11px]">
                                    <CheckCircle2 className="size-3.5 text-emerald-700 shrink-0" />
                                    <span>Verifikasi Lapangan</span>
                                </div>
                                <p className="text-[11px] text-neutral-700 leading-normal font-medium">
                                    Validasi foto koordinat sebelum disposisi regu tanggap.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Tanggap Darurat 112 (3 cols) */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-black/70">
                            Tanggap Darurat
                        </h4>
                        
                        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xs border border-black/10 shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-neutral-950">
                                <ShieldAlert className="size-4 text-emerald-700 shrink-0" />
                                <span>Krisis Api Mengancam?</span>
                            </div>
                            <p className="text-[11px] text-neutral-700 leading-relaxed font-medium">
                                Evakuasi mandiri dari arah asap dan segera hubungi posko darurat:
                            </p>
                            <a
                                href="tel:112"
                                className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#10e57a] hover:bg-[#0ba856] text-black text-xs font-black transition-all shadow-xs group border border-black/10"
                            >
                                <span className="flex items-center gap-2">
                                    <PhoneCall className="size-3.5 text-black" />
                                    <span>Hotline Bebas Pulsa</span>
                                </span>
                                <span className="bg-black text-white font-black text-xs px-2.5 py-0.5 rounded-md shadow-xs">
                                    112
                                </span>
                            </a>
                            <div className="text-[10px] text-neutral-600 text-center font-medium">
                                Siaga 24 Jam BPBD, Damkar & Basarnas
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Quick Links */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-900/80 gap-4">
                    <p className="text-[11px] text-neutral-900/70 font-medium">
                        © {new Date().getFullYear()} JAGAIN. Platform Transparansi Karhutla Kalimantan.
                    </p>

                    <div className="flex items-center gap-5 text-[11px]">
                        <Link href="/panduan-keselamatan" className="text-neutral-900/80 hover:text-black transition-colors font-bold">
                            Panduan Krisis
                        </Link>
                        <Link href="/tentang-kami" className="text-neutral-900/80 hover:text-black transition-colors font-bold">
                            Metodologi Audit
                        </Link>
                        <div className="inline-flex items-center gap-1.5 text-neutral-900 font-bold">
                            <span className="size-2 rounded-full bg-black animate-pulse" />
                            <span>Publik Terbuka</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
