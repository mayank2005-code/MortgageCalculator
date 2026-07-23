'use client';

import React from 'react';
import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CurrencyToggle from './CurrencyToggle';

export default function Header() {
  const router = useRouter();

  return (
    <header
      className="glass-card mb-6"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{
              background: 'var(--color-accent-primary)',
            }}
          >
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              Mortgage Calc
            </h1>
            <p 
              className="text-xs font-medium" 
              style={{ 
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Financial Calculator
            </p>
          </div>
        </button>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <CurrencyToggle />
        </div>
      </div>
    </header>
  );
}
