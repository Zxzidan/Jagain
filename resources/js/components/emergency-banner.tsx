import { ShieldAlert } from 'lucide-react';

export default function EmergencyBanner() {
    return (
        <div className="bg-[#171C19] text-[#F3F7F4] border-b border-[#343B36] py-2 px-4 text-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="size-4 shrink-0 text-[#E8F1EB]" aria-hidden="true" />
                    <span>
                        <strong className="font-semibold text-white">Bukan Layanan Darurat:</strong> JAGAIN adalah platform transparansi & pemantauan laporan, bukan kanal komando tanggap darurat.
                    </span>
                </div>
                <div className="hidden sm:block text-right text-[#DDE3DE] shrink-0 font-medium">
                    Bahaya Langsung / Mengancam Jiwa? Segera Hubungi <span className="underline font-bold text-white">112</span> / Damkar Setempat
                </div>
            </div>
        </div>
    );
}
