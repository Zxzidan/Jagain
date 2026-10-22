import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type EmptyStateProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: ReactNode;
    className?: string;
};

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className = '',
}: EmptyStateProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-[#DDE3DE] bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900/40 ${className}`}
        >
            <div className="flex size-12 items-center justify-center rounded-full bg-[#E8F1EB] text-[#216B49] dark:bg-emerald-950/50 dark:text-emerald-400">
                <Icon className="size-6" />
            </div>
            <h3 className="mt-3 text-base font-semibold text-[#171C19] dark:text-neutral-100">
                {title}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-[#68716B] dark:text-neutral-400">
                {description}
            </p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
