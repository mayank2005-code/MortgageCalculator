'use client';

import React from 'react';
import { DollarSign, IndianRupee } from 'lucide-react';
import useCalculatorStore from '@/store/calculator';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCalculatorStore();

  return (
    <div className="flex gap-2 p-1" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setCurrency('USD')}
        className="flex items-center gap-2 px-3 py-2 font-semibold text-sm transition-all duration-200"
        style={
          currency === 'USD'
            ? {
                background: 'white',
                color: 'var(--color-accent-primary)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontFamily: 'var(--font-sans)',
              }
            : {
                color: 'var(--color-text-tertiary)',
                background: 'transparent',
                fontFamily: 'var(--font-sans)',
              }
        }
      >
        <DollarSign className="w-4 h-4" />
        <span className="hidden sm:inline">USD</span>
      </button>
      <button
        onClick={() => setCurrency('INR')}
        className="flex items-center gap-2 px-3 py-2 font-semibold text-sm transition-all duration-200"
        style={
          currency === 'INR'
            ? {
                background: 'white',
                color: 'var(--color-accent-primary)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontFamily: 'var(--font-sans)',
              }
            : {
                color: 'var(--color-text-tertiary)',
                background: 'transparent',
                fontFamily: 'var(--font-sans)',
              }
        }
      >
        <IndianRupee className="w-4 h-4" />
        <span className="hidden sm:inline">INR</span>
      </button>
    </div>
  );
}
