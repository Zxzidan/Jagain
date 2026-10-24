import React, { useRef, useState, useCallback } from 'react';
import './SpecularButton.css';

export interface SpecularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  idleIntensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  glow?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export default function SpecularButton({
  children = 'Lapor Karhutla',
  size = 'md',
  radius = 18,
  tint = '#ffffff',
  tintOpacity = 1,
  blur = 0,
  textColor = '#000000',
  lineColor = '#10e57a',
  baseColor = '#0ba856',
  intensity = 1,
  idleIntensity = 0.35,
  glow = 1,
  followMouse = true,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  style,
  ...rest
}: SpecularButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<{ x: string; y: string }>({ x: '50%', y: '50%' });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!followMouse || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px` });
  }, [followMouse, disabled]);

  const handleMouseLeave = useCallback(() => {
    setCoords({ x: '50%', y: '50%' });
  }, []);

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={{
        ['--sb-radius' as any]: `${radius}px`,
        ['--sb-tint' as any]: tint,
        ['--sb-tint-opacity' as any]: tintOpacity,
        ['--sb-blur' as any]: `${blur}px`,
        ['--sb-text-color' as any]: textColor,
        ['--sb-line-color' as any]: lineColor,
        ['--sb-base-color' as any]: baseColor,
        ['--mouse-x' as any]: coords.x,
        ['--mouse-y' as any]: coords.y,
        ['--glow-intensity' as any]: intensity * glow,
        ...style
      }}
      {...rest}
    >
      <span className="specular-button__rim" aria-hidden="true" />
      <span className="specular-button__sheen" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </button>
  );
}
