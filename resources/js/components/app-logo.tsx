import AppLogoIcon from '@/components/app-logo-icon';

interface AppLogoProps {
    showTagline?: boolean;
    className?: string;
}

export default function AppLogo({ showTagline = false, className = '' }: AppLogoProps) {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-[#174B35] text-white shadow-sm">
                <AppLogoIcon className="size-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
                <span className="font-bold tracking-tight text-[#171C19] dark:text-white leading-none text-base">
                    JAGAIN
                </span>
                {showTagline && (
                    <span className="text-[11px] text-[#68716B] leading-tight mt-0.5 font-normal">
                        Pantau Karhutla. Kawal Penanganannya.
                    </span>
                )}
            </div>
        </div>
    );
}
