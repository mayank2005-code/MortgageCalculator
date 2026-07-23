'use client';

import React from 'react';
import { AmortizationEntry } from '@/lib/calculations';
import { Currency } from '@/models/Calculation';
import { formatCurrency } from '@/lib/formatters';

interface AmortizationTableProps {
  data: AmortizationEntry[];
  currency: Currency;
}

export default function AmortizationTable({ data, currency }: AmortizationTableProps) {
  return (
    <div className="overflow-x-auto" style={{ border: '1.5px solid var(--color-border)' }}>
      <table className="w-full">
        <thead>
          <tr
            className="border-b"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-tertiary)' }}
          >
            <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-display)' }}>
              Year
            </th>
            <th className="text-right py-3 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-display)' }}>
              Principal Paid
            </th>
            <th className="text-right py-3 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-display)' }}>
              Interest Paid
            </th>
            <th className="text-right py-3 px-4 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-display)' }}>
              Remaining Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr
              key={entry.year}
              className="border-b transition-all duration-200"
              style={{
                borderColor: 'var(--color-border-light)',
                background: entry.year % 2 === 0 ? 'var(--color-bg-tertiary)' : 'white',
              }}
            >
              <td className="py-3 px-4 font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                Year {entry.year}
              </td>
              <td className="py-3 px-4 text-right font-semibold" style={{ color: 'var(--color-accent-teal)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(entry.principalPaid, currency)}
              </td>
              <td className="py-3 px-4 text-right font-semibold" style={{ color: 'var(--color-accent-primary)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(entry.interestPaid, currency)}
              </td>
              <td className="py-3 px-4 text-right font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(entry.balance, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
