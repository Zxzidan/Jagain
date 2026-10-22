import { Head, Link } from '@inertiajs/react';
import { Shield, FileText, Map, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#f0eee6] min-h-screen text-[#141413]">
            <Head title="Pusat Kendali — JAGAIN" />

            <div className="max-w-5xl mx-auto w-full space-y-6">
                <div className="bg-[#faf9f5] border border-[#cccbc8] rounded-2xl p-6 sm:p-10 shadow-xs space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e3dacc]/70 text-[#141413] border border-[#cccbc8] font-mono text-xs">
                        <Shield className="size-3.5 text-[#141413]" />
                        <span>Selamat Datang di Portal JAGAIN</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413] leading-snug">
                        Portal Pemantauan & Akuntabilitas Penanganan Karhutla
                    </h1>
                    <p className="text-sm font-sans text-[#87867f] leading-relaxed max-w-2xl">
                        Sistem sedang mengarahkan Anda ke dasbor operasional sesuai peran akun Anda. Anda juga dapat langsung mengakses modul utama di bawah:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <Link
                            href="/peta"
                            className="p-5 rounded-xl border border-[#cccbc8] hover:border-[#141413] bg-[#f0eee6]/60 transition-colors flex items-center justify-between group"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 font-serif font-semibold text-base text-[#141413]">
                                    <Map className="size-4 text-[#141413]" />
                                    <span>Peta Sebaran Karhutla</span>
                                </div>
                                <p className="text-xs font-sans text-[#87867f]">Pantau titik api dan observasi satelit Kalimantan secara real-time.</p>
                            </div>
                            <ArrowRight className="size-4 text-[#87867f] group-hover:text-[#141413] transition-colors shrink-0 ml-3" />
                        </Link>

                        <Link
                            href="/lapor"
                            className="p-5 rounded-xl border border-[#cccbc8] hover:border-[#141413] bg-[#f0eee6]/60 transition-colors flex items-center justify-between group"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 font-serif font-semibold text-base text-[#141413]">
                                    <FileText className="size-4 text-[#141413]" />
                                    <span>Buat Laporan Baru</span>
                                </div>
                                <p className="text-xs font-sans text-[#87867f]">Kirimkan laporan karhutla terverifikasi dengan koordinat GPS.</p>
                            </div>
                            <ArrowRight className="size-4 text-[#87867f] group-hover:text-[#141413] transition-colors shrink-0 ml-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
