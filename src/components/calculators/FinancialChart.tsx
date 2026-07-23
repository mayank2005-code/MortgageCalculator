'use client';

import React from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Currency } from '@/models/Calculation';
import { formatCurrency } from '@/lib/formatters';

interface ChartData {
  name?: string;
  value?: number;
  fill?: string;
  balance?: number;
  year?: number;
  [key: string]: string | number | undefined;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: ChartData;
    color: string;
  }>;
}

interface FinancialChartProps {
  type: 'donut' | 'area';
  data: ChartData[];
  currency: Currency;
}

export default function FinancialChart({ type, data, currency }: FinancialChartProps) {
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 border"
          style={{
            background: 'white',
            borderColor: '#e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3"
                style={{ 
                  background: entry.color,
                }}
              />
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                {entry.name}: {formatCurrency(entry.value, currency, true)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'donut') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
            strokeWidth={3}
            stroke="#ffffff"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill as string || '#3b82f6'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span style={{ 
                color: 'var(--color-text-primary)', 
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'var(--font-sans)',
              }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0e7490" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0e7490" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeWidth={1} />
          <XAxis
            dataKey="year"
            stroke="var(--color-border)"
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12, fontFamily: 'var(--font-sans)' }}
            axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
          />
          <YAxis
            stroke="var(--color-border)"
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12, fontFamily: 'var(--font-sans)' }}
            axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
            tickFormatter={(value) => formatCurrency(value, currency)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#0e7490"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBalance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
}
