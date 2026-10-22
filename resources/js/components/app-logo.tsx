import AppLogoIcon from '@/components/app-logo-icon';

interface AppLogoProps {
    showTagline?: boolean;
    className?: string;
}

export default function AppLogo({ showTagline = false, className = '', dark = false }: AppLogoProps & { dark?: boolean }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-black text-[#10e57a] border border-[#10e57a]/30 shrink-0 shadow-[0_0_15px_rgba(16,229,122,0.2)]">
                <AppLogoIcon className="size-5 text-[#10e57a]" />
            </div>
            <div className="flex flex-col text-left justify-center">
                <span className={`font-sans font-black tracking-wider uppercase text-sm leading-none ${dark ? 'text-white' : 'text-current'}`}>
                    JAGAIN
                </span>
                {showTagline && (
                    <span className={`text-[11px] font-sans font-medium tracking-tight mt-1 opacity-70 ${dark ? 'text-white' : 'text-current'}`}>
                        Pantau Karhutla. Kawal Penanganannya.
                    </span>
                )}
            </div>
        </div>
    );
}
