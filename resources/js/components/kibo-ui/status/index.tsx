import type { ComponentProps, HTMLAttributes } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusProps = ComponentProps<typeof Badge> & {
    status: 'online' | 'offline' | 'maintenance' | 'degraded';
};

export const Status = ({ className, status, ...props }: StatusProps) => (
    <Badge
        className={cn(
            'inline-flex items-center gap-2 border border-border-neutral bg-white text-dark-neutral shadow-2xs transition-colors',
            'group',
            status,
            className,
        )}
        variant="secondary"
        {...props}
    />
);

export type StatusIndicatorProps = HTMLAttributes<HTMLSpanElement>;

export const StatusIndicator = ({
    className,
    ...props
}: StatusIndicatorProps) => (
    <span className={cn('relative flex size-2', className)} {...props}>
        <span
            className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                'group-[.online]:bg-primary-green',
                'group-[.offline]:bg-gray-neutral',
                'group-[.maintenance]:bg-leaf-green',
                'group-[.degraded]:bg-leaf-green',
            )}
        />
        <span
            className={cn(
                'relative inline-flex size-2 rounded-full',
                'group-[.online]:bg-primary-green',
                'group-[.offline]:bg-gray-neutral',
                'group-[.maintenance]:bg-leaf-green',
                'group-[.degraded]:bg-leaf-green',
            )}
        />
    </span>
);

export type StatusLabelProps = HTMLAttributes<HTMLSpanElement>;

export const StatusLabel = ({
    className,
    children,
    ...props
}: StatusLabelProps) => (
    <span
        className={cn('text-xs font-medium text-dark-neutral', className)}
        {...props}
    >
        {children ?? (
            <>
                <span className="hidden group-[.online]:block">
                    Aktif & Terhubung
                </span>
                <span className="hidden group-[.offline]:block">
                    Tidak Terhubung
                </span>
                <span className="hidden group-[.maintenance]:block">
                    Pemeliharaan
                </span>
                <span className="hidden group-[.degraded]:block">Terbatas</span>
            </>
        )}
    </span>
);
