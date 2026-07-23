'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        glass-card
        ${hover ? 'hover:-translate-x-1 hover:-translate-y-1 cursor-pointer' : ''}
        transition-all duration-100
        ${className}
      `}
      style={{
        padding: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}
