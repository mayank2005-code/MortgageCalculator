'use client';

import React, { useMemo } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import SliderInput from '@/components/calculators/SliderInput';
import useCalculatorStore from '@/store/calculator';
import { calculateRent } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

export default function RentCalculator() {
  const { currency, rentInputs, setRentInputs } = useCalculatorStore();

  const results = useMemo(() => calculateRent(rentInputs.monthlyRent), [rentInputs.monthlyRent]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <GlassCard>
        <h2
          className="text-2xl font-bold uppercase tracking-wider mb-6 neon-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Rent Calculator
        </h2>

        <div className="space-y-6">
          <SliderInput
            label="Monthly Rent"
            value={rentInputs.monthlyRent}
            onChange={(value) => setRentInputs({ monthlyRent: value })}
            min={currency === 'INR' ? 5000 : 500}
            max={currency === 'INR' ? 200000 : 10000}
            step={currency === 'INR' ? 1000 : 100}
            formatValue={(v) => formatCurrency(v, currency)}
          />
        </div>
      </GlassCard>

      {/* Results Panel */}
      <GlassCard>
        <h2
          className="text-2xl font-bold uppercase tracking-wider mb-6 neon-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Rent Projections
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Monthly Rent
            </p>
            <div
              className="text-4xl font-bold neon-pink"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {formatCurrency(results.monthlyRent, currency, true)}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div
              className="p-4 border-3"
              style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}
            >
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
                Yearly Cost
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(results.yearlyRent, currency)}
              </p>
            </div>

            <div
              className="p-4 border-3"
              style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}
            >
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
                5-Year Cost
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(results.fiveYearRent, currency)}
              </p>
            </div>

            <div
              className="p-4 border-3"
              style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}
            >
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
                10-Year Cost
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(results.tenYearRent, currency)}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
