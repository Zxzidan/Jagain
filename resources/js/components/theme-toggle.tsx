import { Check, Monitor, Moon, Sun } from 'lucide-react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
    className?: string;
    align?: 'start' | 'center' | 'end';
}

/**
 * Dropdown button to toggle theme between Light, Dark, and System.
 */
export function ThemeToggle({ className, align = 'end' }: ThemeToggleProps) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                'relative size-9 cursor-pointer rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-[#216B49] dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white',
                                className,
                            )}
                            aria-label="Ganti mode tema (Terang / Gelap)"
                        >
                            <Sun className="size-4.5 scale-100 rotate-0 transition-transform duration-200 dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute size-4.5 scale-0 rotate-90 transition-transform duration-200 dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Ganti mode tema</span>
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p className="text-xs">
                        Tema: {appearance === 'light' ? 'Terang' : appearance === 'dark' ? 'Gelap' : 'Sistem'}
                    </p>
                </TooltipContent>
            </Tooltip>

            <DropdownMenuContent align={align} className="min-w-36">
                <DropdownMenuItem
                    onClick={() => updateAppearance('light')}
                    className="flex cursor-pointer items-center justify-between text-xs"
                >
                    <div className="flex items-center gap-2">
                        <Sun className="size-4 text-amber-500" />
                        <span>Terang</span>
                    </div>
                    {appearance === 'light' && (
                        <Check className="size-3.5 text-[#216B49] dark:text-emerald-400" />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => updateAppearance('dark')}
                    className="flex cursor-pointer items-center justify-between text-xs"
                >
                    <div className="flex items-center gap-2">
                        <Moon className="size-4 text-indigo-400" />
                        <span>Gelap</span>
                    </div>
                    {appearance === 'dark' && (
                        <Check className="size-3.5 text-[#216B49] dark:text-emerald-400" />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => updateAppearance('system')}
                    className="flex cursor-pointer items-center justify-between text-xs"
                >
                    <div className="flex items-center gap-2">
                        <Monitor className="size-4 text-neutral-500" />
                        <span>Sistem</span>
                    </div>
                    {appearance === 'system' && (
                        <Check className="size-3.5 text-[#216B49] dark:text-emerald-400" />
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/**
 * Inline 3-segment switcher (Terang / Gelap / Sistem) for drawers and dropdowns.
 */
export function ThemeInlineSelector({ className }: { className?: string }) {
    const { appearance, updateAppearance } = useAppearance();

    const options: { value: Appearance; icon: typeof Sun; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Terang' },
        { value: 'dark', icon: Moon, label: 'Gelap' },
        { value: 'system', icon: Monitor, label: 'Sistem' },
    ];

    return (
        <div
            className={cn(
                'flex items-center gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 w-full',
                className,
            )}
            role="radiogroup"
            aria-label="Pilih mode tema"
        >
            {options.map(({ value, icon: Icon, label }) => {
                const isActive = appearance === value;
                return (
                    <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => updateAppearance(value)}
                        className={cn(
                            'flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-medium transition-colors whitespace-nowrap',
                            isActive
                                ? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-700 dark:text-neutral-100 font-semibold'
                                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200',
                        )}
                    >
                        <Icon className="size-3.5 shrink-0" />
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
