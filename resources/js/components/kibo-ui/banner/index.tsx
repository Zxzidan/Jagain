import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { type LucideIcon, X as XIcon } from 'lucide-react';
import {
    type ComponentProps,
    createContext,
    type HTMLAttributes,
    type MouseEventHandler,
    useContext,
} from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BannerContextProps = {
    show: boolean;
    setShow: (show: boolean) => void;
};

export const BannerContext = createContext<BannerContextProps>({
    show: true,
    setShow: () => {},
});

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
    visible?: boolean;
    defaultVisible?: boolean;
    onClose?: () => void;
    inset?: boolean;
};

export const Banner = ({
    children,
    visible,
    defaultVisible = true,
    onClose,
    className,
    inset = false,
    ...props
}: BannerProps) => {
    const [show, setShow] = useControllableState({
        defaultProp: defaultVisible,
        prop: visible,
        onChange: onClose,
    });

    if (!show) {
        return null;
    }

    return (
        <BannerContext.Provider value={{ show, setShow }}>
            <div
                className={cn(
                    'flex w-full items-center justify-between gap-3 border border-border-neutral bg-white px-4 py-3 text-dark-neutral shadow-2xs transition-all duration-200',
                    inset && 'rounded-xl',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </BannerContext.Provider>
    );
};

export type BannerIconProps = HTMLAttributes<HTMLDivElement> & {
    icon: LucideIcon;
};

export const BannerIcon = ({
    icon: Icon,
    className,
    ...props
}: BannerIconProps) => (
    <div
        className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg border border-border-neutral/80 bg-pale-green text-primary-green',
            className,
        )}
        {...props}
    >
        <Icon size={16} />
    </div>
);

export type BannerTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const BannerTitle = ({ className, ...props }: BannerTitleProps) => (
    <p
        className={cn(
            'flex-1 text-xs leading-relaxed text-dark-neutral sm:text-sm',
            className,
        )}
        {...props}
    />
);

export type BannerActionProps = ComponentProps<typeof Button>;

export const BannerAction = ({
    variant = 'outline',
    size = 'sm',
    className,
    ...props
}: BannerActionProps) => (
    <Button
        className={cn(
            'shrink-0 border-border-neutral text-xs font-semibold text-dark-neutral transition-colors hover:bg-pale-green',
            className,
        )}
        size={size}
        variant={variant}
        {...props}
    />
);

export type BannerCloseProps = ComponentProps<typeof Button>;

export const BannerClose = ({
    variant = 'ghost',
    size = 'icon',
    onClick,
    className,
    ...props
}: BannerCloseProps) => {
    const { setShow } = useContext(BannerContext);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        setShow(false);
        onClick?.(e);
    };

    return (
        <Button
            className={cn(
                'size-7 shrink-0 text-gray-neutral hover:bg-pale-green hover:text-dark-neutral',
                className,
            )}
            onClick={handleClick}
            size={size}
            variant={variant}
            aria-label="Tutup pemberitahuan"
            {...props}
        >
            <XIcon size={16} />
        </Button>
    );
};
