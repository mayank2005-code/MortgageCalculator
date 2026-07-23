'use client';

import React, { useMemo, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import SliderInput from '@/components/calculators/SliderInput';
import useCalculatorStore from '@/store/calculator';
import { calculateRentVsBuy } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

interface RentVsBuyComparisonProps {
  principal: number;
  interestRate: number;
  tenure: number;
}

export default function RentVsBuyComparison({
  principal,
  interestRate,
  tenure,
}: RentVsBuyComparisonProps) {
  const { currency } = useCalculatorStore();
  const [monthlyRent, setMonthlyRent] = useState(currency === 'INR' ? 30000 : 1500);
  const [rentIncrease, setRentIncrease] = useState(3);

  const data = useMemo(
    () => calculateRentVsBuy(principal, interestRate, tenure, monthlyRent, rentIncrease),
    [principal, interestRate, tenure, monthlyRent, rentIncrease]
  );

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      payload: { year: number; rentCost: number; buyCost: number };
      color: string;
    }>;
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 rounded-lg"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            Year {payload[0].payload.year}
          </p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: entry.color }} />
              <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                {entry.name}: {formatCurrency(entry.value, currency, true)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6" style={{ color: 'var(--color-accent-teal)' }} />
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Rent vs Buy Comparison
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 space-y-6">
          <SliderInput
            label="Comparison Monthly Rent"
            value={monthlyRent}
            onChange={setMonthlyRent}
            min={currency === 'INR' ? 5000 : 500}
            max={currency === 'INR' ? 200000 : 10000}
            step={currency === 'INR' ? 1000 : 100}
            formatValue={(v) => formatCurrency(v, currency)}
          />

          <SliderInput
            label="Annual Rent Increase"
            value={rentIncrease}
            onChange={setRentIncrease}
            min={0}
            max={10}
            step={0.5}
            unit="%"
          />

          <div
            className="p-4"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              {data.length > 0 && data[data.length - 1].rentCost > data[data.length - 1].buyCost
                ? 'Buying is cheaper long-term'
                : 'Renting is cheaper long-term'}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              Based on {data.length} year projection
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c2410c" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#c2410c" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0e7490" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0e7490" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="year"
                stroke="var(--color-text-tertiary)"
                tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
                label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: 'var(--color-text-tertiary)' }}
              />
              <YAxis
                stroke="var(--color-text-tertiary)"
                tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value, currency)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="line"
                formatter={(value) => (
                  <span style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="rentCost"
                name="Cumulative Rent"
                stroke="#c2410c"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRent)"
              />
              <Area
                type="monotone"
                dataKey="buyCost"
                name="Cumulative Buy"
                stroke="#0e7490"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBuy)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}
