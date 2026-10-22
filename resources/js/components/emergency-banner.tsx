import { ShieldAlert } from 'lucide-react';

export default function EmergencyBanner() {
    return (
        <aside aria-label="Pemberitahuan Darurat" className="bg-[#0a0a0a] text-neutral-300 border-b border-white/10 py-2 px-4 text-xs font-sans">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#10e57a] animate-pulse" />
                    <span>
                        <strong className="font-semibold text-white">Platform Transparansi:</strong> JAGAIN mencatat dan mengawal laporan publik karhutla Kalimantan, bukan unit dispatch darurat resmi.
                    </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-right text-neutral-400 shrink-0 font-medium text-[11px]">
                    <span>Darurat Api Mengancam?</span>
                    <a href="tel:112" className="bg-white/10 hover:bg-[#10e57a] hover:text-black text-white px-2.5 py-0.5 rounded-full font-bold transition-all border border-white/15">
                        Hubungi 112
                    </a>
                </div>
            </div>
        </aside>
    );
}
