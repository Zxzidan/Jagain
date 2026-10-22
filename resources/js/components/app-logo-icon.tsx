import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outer shield structure */}
            <path
                d="M16 2.5L5 7.5V15C5 21.6 9.7 27.8 16 29.5C22.3 27.8 27 21.6 27 15V7.5L16 2.5Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            {/* Forest Leaf Vein */}
            <path
                d="M16 9V23M16 13L21 10.5M16 17L11 14.5M16 20L20 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
