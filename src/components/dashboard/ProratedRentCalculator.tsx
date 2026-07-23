'use client';

import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Input from '@/components/ui/Input';
import SliderInput from '@/components/calculators/SliderInput';
import useCalculatorStore from '@/store/calculator';
import { calculateProratedRent } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

export default function ProratedRentCalculator() {
  const { currency, proratedRentInputs, setProratedRentInputs } = useCalculatorStore();

  const results = useMemo(
    () =>
      calculateProratedRent(
        proratedRentInputs.monthlyRent,
        proratedRentInputs.moveInDate,
        proratedRentInputs.daysOccupied
      ),
    [proratedRentInputs]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <GlassCard>
        <h2
          className="text-2xl font-bold uppercase tracking-wider mb-6 neon-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Prorated Rent Calculator
        </h2>

        <div className="space-y-6">
          <SliderInput
            label="Monthly Rent"
            value={proratedRentInputs.monthlyRent}
            onChange={(value) => setProratedRentInputs({ monthlyRent: value })}
            min={currency === 'INR' ? 5000 : 500}
            max={currency === 'INR' ? 200000 : 10000}
            step={currency === 'INR' ? 1000 : 100}
            formatValue={(v) => formatCurrency(v, currency)}
          />

          <Input
            type="date"
            label="Move-In Date"
            value={proratedRentInputs.moveInDate}
            onChange={(e) => setProratedRentInputs({ moveInDate: e.target.value })}
            icon={<Calendar className="w-5 h-5" />}
          />

          <SliderInput
            label="Days Occupied"
            value={proratedRentInputs.daysOccupied}
            onChange={(value) => setProratedRentInputs({ daysOccupied: value })}
            min={1}
            max={31}
            step={1}
            unit="days"
          />
        </div>
      </GlassCard>

      {/* Results Panel */}
      <GlassCard>
        <h2
          className="text-2xl font-bold uppercase tracking-wider mb-6 neon-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Prorated Amount
        </h2>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
            You Pay
          </p>
          <div
            className="text-5xl font-bold mb-8 neon-pink"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {formatCurrency(results.proratedRent, currency, true)}
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="p-4 border-3"
            style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Full Monthly Rent
            </p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
              {formatCurrency(proratedRentInputs.monthlyRent, currency)}
            </p>
          </div>

          <div
            className="p-4 border-3"
            style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Daily Rate
            </p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
              {formatCurrency(results.dailyRate, currency, true)}
            </p>
          </div>

          <div
            className="p-4 border-3"
            style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Days in Month
            </p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
              {results.daysInMonth} days
            </p>
          </div>

          <div
            className="p-4 border-3"
            style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Days Occupied
            </p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
              {proratedRentInputs.daysOccupied} days
            </p>
          </div>
        </div>

        <div
          className="mt-6 p-4 border-3"
          style={{ background: 'rgba(0, 240, 255, 0.05)', borderColor: 'var(--color-neon-cyan)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
            Formula: (Monthly Rent / Days in Month) × Days Occupied
          </p>
          <p className="text-sm mt-2 font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
            ({formatCurrency(proratedRentInputs.monthlyRent, currency)} / {results.daysInMonth}) × {proratedRentInputs.daysOccupied} ={' '}
            {formatCurrency(results.proratedRent, currency, true)}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
