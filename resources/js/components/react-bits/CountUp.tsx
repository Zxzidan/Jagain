'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface CountUpProps {
    to: number;
    from?: number;
    duration?: number; // duration in seconds
    delay?: number; // delay in seconds
    ease?: string;
    decimals?: number;
    separator?: string;
    prefix?: string;
    suffix?: string;
    className?: string;
    style?: React.CSSProperties;
    threshold?: number;
    once?: boolean;
    onStart?: () => void;
    onComplete?: () => void;
}

export default function CountUp({
    to,
    from = 0,
    duration = 1.6,
    delay = 0,
    ease = 'power2.out',
    decimals = 0,
    separator = '',
    prefix = '',
    suffix = '',
    className = '',
    style,
    threshold = 0.15,
    once = true,
    onStart,
    onComplete,
}: CountUpProps) {
    const [displayValue, setDisplayValue] = useState<string>(() => {
        const initial = decimals > 0 ? from.toFixed(decimals) : from.toString();
        const formatted = separator ? initial.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : initial;
        return `${prefix}${formatted}${suffix}`;
    });

    const ref = useRef<HTMLSpanElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const hasAnimated = useRef(false);
    const currentValue = useRef(from);

    const formatNumber = (val: number): string => {
        const rounded = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
        const formatted = separator ? rounded.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : rounded;
        return `${prefix}${formatted}${suffix}`;
    };

    const runAnimation = () => {
        if (tweenRef.current) {
            tweenRef.current.kill();
        }

        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            currentValue.current = to;
            setDisplayValue(formatNumber(to));
            onComplete?.();
            return;
        }

        const stateObj = { val: currentValue.current };

        tweenRef.current = gsap.to(stateObj, {
            val: to,
            duration: Math.max(0.2, duration),
            delay: Math.max(0, delay),
            ease,
            onStart: () => {
                onStart?.();
            },
            onUpdate: () => {
                currentValue.current = stateObj.val;
                setDisplayValue(formatNumber(stateObj.val));
            },
            onComplete: () => {
                currentValue.current = to;
                setDisplayValue(formatNumber(to));
                onComplete?.();
            },
        });
    };

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        if (typeof IntersectionObserver === 'undefined') {
            runAnimation();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    if (!hasAnimated.current || !once) {
                        hasAnimated.current = true;
                        runAnimation();
                    }
                } else if (!once) {
                    currentValue.current = from;
                    setDisplayValue(formatNumber(from));
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            if (tweenRef.current) {
                tweenRef.current.kill();
            }
        };
    }, [to, from, duration, delay, ease, decimals, separator, prefix, suffix, threshold, once]);

    return (
        <span
            ref={ref}
            className={`tabular-nums font-mono ${className}`}
            style={{ fontVariantNumeric: 'tabular-nums', ...style }}
        >
            {displayValue}
        </span>
    );
}
