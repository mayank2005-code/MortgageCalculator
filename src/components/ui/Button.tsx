'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: `
      text-white border-none
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      bg-white
      border hover:-translate-y-0.5
    `,
    ghost: `
      border-none
      hover:bg-[#fef3e2]
    `,
  };

  const getButtonStyle = () => {
    if (variant === 'primary') {
      return {
        background: 'var(--color-accent-primary)',
        boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)',
      };
    }
    if (variant === 'secondary') {
      return {
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-primary)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      };
    }
    if (variant === 'ghost') {
      return { color: 'var(--color-text-secondary)' };
    }
    return {};
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      style={{
        fontFamily: 'var(--font-sans)',
        ...getButtonStyle(),
      }}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}
