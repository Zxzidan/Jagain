import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { ShieldAlert, Info, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#171C19] text-[#DDE3DE] border-t border-[#343B36] pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    {/* Col 1: Identity */}
                    <div className="md:col-span-1 space-y-3">
                        <AppLogo showTagline={false} className="brightness-125" />
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            JAGAIN (Jaga Hutan, Kawal Penanganan) adalah platform independen untuk transparansi, pelaporan terstruktur, dan akuntabilitas tindak lanjut kebakaran hutan dan lahan (karhutla) di Kalimantan.
                        </p>
                        <div className="pt-2 text-[11px] text-[#68716B]">
                            Fokus Wilayah: Seluruh Provinsi Kalimantan (Kalbar, Kalteng, Kalsel, Kaltim, Kaltara).
                        </div>
                    </div>

                    {/* Col 2: Platform Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                            Navigasi Utama
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/peta" className="hover:text-white transition-colors">
                                    Peta Sebaran Karhutla
                                </Link>
                            </li>
                            <li>
                                <Link href="/lapor" className="hover:text-white transition-colors">
                                    Kirim Laporan Warga
                                </Link>
                            </li>
                            <li>
                                <Link href="/panduan-keselamatan" className="hover:text-white transition-colors">
                                    Panduan Keselamatan Karhutla
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang-kami" className="hover:text-white transition-colors">
                                    Transparansi Data & Batasan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Kejujuran & Batasan Data */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                            <Info className="size-3.5 text-[#39845C]" />
                            Kejujuran Data
                        </h4>
                        <p className="text-xs text-[#68716B] leading-relaxed">
                            Titik observasi satelit adalah anomali suhu termal permukaan dan bukan bukti mutlak kebakaran tanpa verifikasi lapangan. Status penanganan selesai administratif tidak otomatis membuktikan api telah padam menyeluruh di bawah tanah gambut.
                        </p>
                    </div>

                    {/* Col 4: Kanal Darurat */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                            <ShieldAlert className="size-3.5 text-white" />
                            Kanal Darurat Resmi
                        </h4>
                        <p className="text-xs text-[#68716B] mb-2 leading-relaxed">
                            Jika api membahayakan nyawa atau pemukiman warga, segera hubungi nomor tanggap darurat:
                        </p>
                        <div className="bg-[#1F2522] border border-[#343B36] p-2.5 rounded-md text-xs space-y-1">
                            <div className="text-white font-semibold">Layanan Darurat Nasional: 112</div>
                            <div className="text-[#68716B] text-[11px]">Dinas Pemadam Kebakaran / BPBD setempat</div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#343B36] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#68716B] gap-3">
                    <p>
                        © {new Date().getFullYear()} JAGAIN — Jaga Hutan, Kawal Penanganan. Didedikasikan untuk kelestarian hutan dan udara bersih Kalimantan.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/panduan-keselamatan" className="hover:text-white">
                            Keselamatan Warga
                        </Link>
                        <Link href="/tentang-kami" className="hover:text-white">
                            Ketentuan & Data Provenance
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
