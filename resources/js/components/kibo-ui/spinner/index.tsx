import {
    LoaderCircleIcon,
    LoaderIcon,
    LoaderPinwheelIcon,
    type LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinnerVariantProps = Omit<SpinnerProps, 'variant'>;

const Throbber = ({ className, ...props }: SpinnerVariantProps) => (
    <LoaderIcon className={cn('animate-spin', className)} {...props} />
);

const Pinwheel = ({ className, ...props }: SpinnerVariantProps) => (
    <LoaderPinwheelIcon className={cn('animate-spin', className)} {...props} />
);

const CircleFilled = ({
    className,
    size = 20,
    ...props
}: SpinnerVariantProps) => (
    <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
    >
        <div className="absolute inset-0 rotate-180">
            <LoaderCircleIcon
                className={cn('animate-spin opacity-20', className)}
                size={size}
                {...props}
            />
        </div>
        <LoaderCircleIcon
            className={cn('relative animate-spin', className)}
            size={size}
            {...props}
        />
    </div>
);

const Ellipsis = ({ size = 20, ...props }: SpinnerVariantProps) => (
    <svg
        height={size}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
    >
        <title>Memuat data...</title>
        <circle cx="4" cy="12" fill="currentColor" r="2">
            <animate
                attributeName="cy"
                begin="0;ellipsis3.end+0.25s"
                calcMode="spline"
                dur="0.6s"
                id="ellipsis1"
                keySplines=".33,.66,.66,1;.33,0,.66,.33"
                values="12;6;12"
            />
        </circle>
        <circle cx="12" cy="12" fill="currentColor" r="2">
            <animate
                attributeName="cy"
                begin="ellipsis1.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".33,.66,.66,1;.33,0,.66,.33"
                values="12;6;12"
            />
        </circle>
        <circle cx="20" cy="12" fill="currentColor" r="2">
            <animate
                attributeName="cy"
                begin="ellipsis1.begin+0.2s"
                calcMode="spline"
                dur="0.6s"
                id="ellipsis3"
                keySplines=".33,.66,.66,1;.33,0,.66,.33"
                values="12;6;12"
            />
        </circle>
    </svg>
);

const Ring = ({ size = 20, ...props }: SpinnerVariantProps) => (
    <svg
        height={size}
        stroke="currentColor"
        viewBox="0 0 44 44"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
    >
        <title>Memuat...</title>
        <g fill="none" fillRule="evenodd" strokeWidth="2">
            <circle cx="22" cy="22" r="1">
                <animate
                    attributeName="r"
                    begin="0s"
                    calcMode="spline"
                    dur="1.8s"
                    keySplines="0.165, 0.84, 0.44, 1"
                    keyTimes="0; 1"
                    repeatCount="indefinite"
                    values="1; 20"
                />
                <animate
                    attributeName="stroke-opacity"
                    begin="0s"
                    calcMode="spline"
                    dur="1.8s"
                    keySplines="0.3, 0.61, 0.355, 1"
                    keyTimes="0; 1"
                    repeatCount="indefinite"
                    values="1; 0"
                />
            </circle>
            <circle cx="22" cy="22" r="1">
                <animate
                    attributeName="r"
                    begin="-0.9s"
                    calcMode="spline"
                    dur="1.8s"
                    keySplines="0.165, 0.84, 0.44, 1"
                    keyTimes="0; 1"
                    repeatCount="indefinite"
                    values="1; 20"
                />
                <animate
                    attributeName="stroke-opacity"
                    begin="-0.9s"
                    calcMode="spline"
                    dur="1.8s"
                    keySplines="0.3, 0.61, 0.355, 1"
                    keyTimes="0; 1"
                    repeatCount="indefinite"
                    values="1; 0"
                />
            </circle>
        </g>
    </svg>
);

export type SpinnerProps = LucideProps & {
    variant?:
        | 'default'
        | 'throbber'
        | 'pinwheel'
        | 'circle-filled'
        | 'ellipsis'
        | 'ring';
};

export const Spinner = ({
    variant = 'circle-filled',
    ...props
}: SpinnerProps) => {
    switch (variant) {
        case 'throbber':
            return <Throbber {...props} />;
        case 'pinwheel':
            return <Pinwheel {...props} />;
        case 'ellipsis':
            return <Ellipsis {...props} />;
        case 'ring':
            return <Ring {...props} />;
        case 'circle-filled':
        default:
            return <CircleFilled {...props} />;
    }
};
