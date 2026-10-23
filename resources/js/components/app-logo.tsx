import React from 'react';

interface AppLogoProps {
    showTagline?: boolean;
    className?: string;
    dark?: boolean;
    variant?: 'full' | 'icon' | 'auto';
}

export default function AppLogo({
    showTagline = false,
    className = '',
    dark = false,
    variant = 'auto',
}: AppLogoProps) {
    if (variant === 'icon') {
        return (
            <img
                src="/images/logo-icon.png"
                alt="Jagain"
                className={`h-8 w-auto object-contain ${className}`}
            />
        );
    }

    if (variant === 'full') {
        return (
            <div className={`inline-flex items-center gap-2.5 ${className}`}>
                <img
                    src={dark ? '/images/logo-white.png' : '/images/logo.png'}
                    alt="jagain"
                    className="h-8 w-auto object-contain"
                />
                {showTagline && (
                    <span
                        className={`text-[10px] font-sans font-semibold tracking-tight border-l pl-2 leading-none ${
                            dark ? 'border-neutral-700 text-neutral-400' : 'border-neutral-300 text-neutral-500'
                        }`}
                    >
                        Pantau Karhutla
                    </span>
                )}
            </div>
        );
    }

    // Default 'auto' variant: shows icon when sidebar collapsed, full logo otherwise
    return (
        <div className={`inline-flex items-center gap-2.5 ${className}`}>
            <img
                src="/images/logo-icon.png"
                alt="jagain"
                className="size-8 object-contain shrink-0 hidden group-data-[collapsible=icon]:block"
            />
            <img
                src={dark ? '/images/logo-white.png' : '/images/logo.png'}
                alt="jagain"
                className="h-8 w-auto object-contain group-data-[collapsible=icon]:hidden"
            />
            {showTagline && (
                <span
                    className={`text-[10px] font-sans font-semibold tracking-tight border-l pl-2 leading-none group-data-[collapsible=icon]:hidden ${
                        dark ? 'border-neutral-700 text-neutral-400' : 'border-neutral-300 text-neutral-500'
                    }`}
                >
                    Pantau Karhutla
                </span>
            )}
        </div>
    );
}
