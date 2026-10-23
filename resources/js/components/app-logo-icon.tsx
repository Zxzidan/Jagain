import React, { type ComponentPropsWithoutRef } from 'react';

export default function AppLogoIcon({
    className = '',
    alt = 'Jagain Emblem',
    ...props
}: ComponentPropsWithoutRef<'img'> & { fill?: string; stroke?: string }) {
    const { fill, stroke, ...rest } = props;
    return (
        <img
            src="/images/logo-icon.png"
            alt={alt}
            className={`object-contain ${className}`}
            {...rest}
        />
    );
}
