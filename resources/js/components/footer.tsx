import { Link } from '@inertiajs/react';
import { ShieldAlert, PhoneCall, CheckCircle2 } from 'lucide-react';
import GrassBreezeBackdrop from '@/components/grass-breeze-backdrop';

export default function Footer() {
    return (
        <footer className="bg-[#10e57a] text-neutral-950 border-t border-black/10 pt-16 pb-14 font-sans relative overflow-hidden">
            <GrassBreezeBackdrop />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-black/15">
                    {/* Col 1: Identity & Scope (4 cols) */}
                    <div className="md:col-span-4 space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2.5 focus:outline-none group" aria-label="Beranda Jagain">
                            <img
                                src="/images/logo.png"
                                alt="jagain"
                                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                            />
                        </Link>

                        <p className="text-xs text-neutral-900/85 leading-relaxed max-w-sm font-medium">
                            Platform independen transparansi karhutla Kalimantan. Mengawal laporan warga, pantauan satelit, dan audit lapangan secara terbuka.
                        </p>

                        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-bold tracking-wider shadow-xs">
                            <span>5 Provinsi Kalimantan</span>
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
                                <a href="#peta-sebaran" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Peta Sebaran
                                </a>
                            </li>
                            <li>
                                <Link href="/lapor" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Lapor Karhutla
                                </Link>
                            </li>
                            <li>
                                <a href="#panduan-keselamatan" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Panduan Keselamatan
                                </a>
                            </li>
                            <li>
                                <a href="#transparansi" className="text-neutral-900/80 hover:text-black font-bold transition-colors">
                                    Transparansi
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Integritas Data (3 cols) */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-black/70">
                            Integritas Data
                        </h4>
                        <div className="space-y-3.5 text-xs">
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="size-4 text-black shrink-0 mt-0.5" />
                                <div>
                                    <strong className="font-bold text-neutral-950 text-xs block">Sensor Satelit Termal</strong>
                                    <p className="text-[11px] text-neutral-850 leading-relaxed font-medium mt-0.5">
                                        Anomali radiasi NASA FIRMS & BMKG sebagai indikator awal.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="size-4 text-black shrink-0 mt-0.5" />
                                <div>
                                    <strong className="font-bold text-neutral-950 text-xs block">Verifikasi Lapangan</strong>
                                    <p className="text-[11px] text-neutral-850 leading-relaxed font-medium mt-0.5">
                                        Validasi foto koordinat sebelum disposisi regu tanggap.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Tanggap Darurat (3 cols) */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-black/70">
                            Tanggap Darurat
                        </h4>
                        
                        <div className="p-4 sm:p-5 rounded-2xl bg-black text-white shadow-md space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#10e57a]">
                                <ShieldAlert className="size-4 shrink-0" />
                                <span>Krisis Api Mengancam?</span>
                            </div>
                            <p className="text-[11px] text-neutral-300 leading-relaxed font-normal">
                                Evakuasi mandiri dari arah asap dan segera hubungi posko darurat:
                            </p>
                            <a
                                href="tel:112"
                                className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#10e57a] hover:bg-emerald-400 text-black text-xs font-black transition-all shadow-xs group active:scale-95"
                            >
                                <span className="flex items-center gap-2">
                                    <PhoneCall className="size-3.5 text-black" />
                                    <span>Hotline Bebas Pulsa</span>
                                </span>
                                <span className="bg-black text-white font-black text-xs px-2.5 py-0.5 rounded-md shadow-xs">
                                    112
                                </span>
                            </a>
                            <div className="text-[10px] text-neutral-400 text-center font-medium">
                                Siaga 24 Jam BPBD, Damkar & Basarnas
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Quick Links */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-900/80 gap-4">
                    <p className="text-[11px] text-neutral-900/80 font-medium">
                        © {new Date().getFullYear()} JAGAIN. Platform Transparansi Karhutla Kalimantan.
                    </p>

                    <div className="flex items-center gap-5 text-[11px]">
                        <Link href="/panduan-keselamatan" className="text-neutral-900/80 hover:text-black transition-colors font-bold">
                            Panduan Krisis
                        </Link>
                        <Link href="/tentang-kami" className="text-neutral-900/80 hover:text-black transition-colors font-bold">
                            Metodologi Audit
                        </Link>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/10 text-neutral-950 font-bold text-[10px]">
                            <span>Publik Terbuka</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
