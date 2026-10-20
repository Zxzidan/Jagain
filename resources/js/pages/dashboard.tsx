import { Head, Link } from '@inertiajs/react';
import { Shield, FileText, Map, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#F3F7F4] min-h-screen text-[#171C19]">
            <Head title="Pusat Kendali — JAGAIN" />

            <div className="max-w-5xl mx-auto w-full space-y-6">
                <div className="bg-white border border-[#DDE3DE] rounded-2xl p-6 sm:p-10 shadow-xs space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EB] text-[#174B35] font-bold text-xs">
                        <Shield className="size-3.5" />
                        Selamat Datang di JAGAIN
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171C19] tracking-tight">
                        Portal Pemantauan & Akuntabilitas Penanganan Karhutla
                    </h1>
                    <p className="text-xs sm:text-sm text-[#68716B] leading-relaxed max-w-2xl">
                        Sistem sedang mengarahkan Anda ke dasbor operasional sesuai peran akun Anda. Anda juga dapat langsung mengakses modul utama di bawah:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <Link
                            href="/peta"
                            className="p-5 rounded-xl border border-[#DDE3DE] hover:border-[#216B49] bg-[#F3F7F4]/50 transition-all flex items-center justify-between group"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 font-bold text-sm text-[#171C19] group-hover:text-[#174B35]">
                                    <Map className="size-4 text-[#216B49]" />
                                    Peta Sebaran Karhutla
                                </div>
                                <p className="text-xs text-[#68716B]">Pantau titik api dan observasi satelit Kalimantan.</p>
                            </div>
                            <ArrowRight className="size-4 text-[#68716B] group-hover:text-[#174B35] transition-colors" />
                        </Link>

                        <Link
                            href="/lapor"
                            className="p-5 rounded-xl border border-[#DDE3DE] hover:border-[#216B49] bg-[#F3F7F4]/50 transition-all flex items-center justify-between group"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 font-bold text-sm text-[#171C19] group-hover:text-[#174B35]">
                                    <FileText className="size-4 text-[#216B49]" />
                                    Buat Laporan Baru
                                </div>
                                <p className="text-xs text-[#68716B]">Kirimkan laporan karhutla terstruktur dengan koordinat GPS.</p>
                            </div>
                            <ArrowRight className="size-4 text-[#68716B] group-hover:text-[#174B35] transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
