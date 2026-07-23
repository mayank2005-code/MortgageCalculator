'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label 
          className="text-sm font-medium"
          style={{ 
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {icon}
          </div>
        )}
        <input
          className={`
            retro-input w-full
            ${icon ? 'pl-12 pr-4' : 'px-4'}
            py-3
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <div
          className="text-xs font-medium px-3 py-2"
          style={{ 
            color: '#dc2626',
            background: '#fef2f2',
            border: '1px solid #fecaca',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
