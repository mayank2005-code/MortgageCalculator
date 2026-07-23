'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Save, PieChart as PieChartIcon, AreaChart as AreaChartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import SliderInput from '@/components/calculators/SliderInput';
import useCalculatorStore from '@/store/calculator';
import { calculateMortgage } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';
import FinancialChart from '@/components/calculators/FinancialChart';
import AmortizationTable from '@/components/calculators/AmortizationTable';
import RentVsBuyComparison from '@/components/dashboard/RentVsBuyComparison';

export default function MortgageCalculator() {
  const { data: session } = useSession();
  const { currency, mortgageInputs, setMortgageInputs, triggerRefresh } = useCalculatorStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Debounced values for expensive calculations
  const [debouncedInputs, setDebouncedInputs] = useState(mortgageInputs);

  // Debounce the inputs with 150ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputs(mortgageInputs);
    }, 150);

    return () => clearTimeout(timer);
  }, [mortgageInputs]);

  const loanAmount = debouncedInputs.principal - debouncedInputs.downPayment;

  const results = useMemo(
    () => calculateMortgage(loanAmount, debouncedInputs.interestRate, debouncedInputs.tenure),
    [loanAmount, debouncedInputs.interestRate, debouncedInputs.tenure]
  );

  const handleSave = async () => {
    if (!session?.user?.id) {
      // Redirect to auth page if not logged in
      window.location.href = '/auth';
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/calculations/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'mortgage',
          currency,
          inputs: mortgageInputs,
          results: {
            monthlyPayment: results.monthlyPayment,
            totalPayment: results.totalPayment,
            totalInterest: results.totalInterest,
          },
        }),
      });

      if (response.ok) {
        setSaveMessage('✓ Calculation saved successfully!');
        triggerRefresh(); // Refresh saved calculations list
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('✗ Failed to save calculation');
      }
    } catch {
      setSaveMessage('✗ Error saving calculation');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <GlassCard>
          <h2
            className="text-2xl font-bold tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            Mortgage Inputs
          </h2>

          <div className="space-y-6">
            <SliderInput
              label="Home Price"
              value={mortgageInputs.principal}
              onChange={(value) => setMortgageInputs({ principal: value })}
              min={50000}
              max={currency === 'INR' ? 50000000 : 2000000}
              step={currency === 'INR' ? 100000 : 10000}
              formatValue={(v) => formatCurrency(v, currency)}
            />

            <SliderInput
              label="Down Payment"
              value={mortgageInputs.downPayment}
              onChange={(value) => setMortgageInputs({ downPayment: value })}
              min={0}
              max={mortgageInputs.principal * 0.5}
              step={currency === 'INR' ? 10000 : 1000}
              formatValue={(v) => formatCurrency(v, currency)}
            />

            <SliderInput
              label="Interest Rate"
              value={mortgageInputs.interestRate}
              onChange={(value) => setMortgageInputs({ interestRate: value })}
              min={1}
              max={20}
              step={0.1}
              unit="%"
            />

            <SliderInput
              label="Loan Tenure"
              value={mortgageInputs.tenure}
              onChange={(value) => setMortgageInputs({ tenure: value })}
              min={5}
              max={30}
              step={1}
              unit="years"
            />
          </div>

          <Button onClick={handleSave} isLoading={isSaving} className="w-full mt-6">
            <Save className="w-5 h-5" />
            {session ? 'Save Calculation' : 'Sign In to Save'}
          </Button>

          {saveMessage && (
            <p
              className="text-sm text-center mt-2 font-medium rounded-lg px-3 py-2 border"
              style={{ 
                color: saveMessage.includes('✓') ? 'var(--color-accent-green)' : 'var(--color-error)',
                borderColor: saveMessage.includes('✓') ? '#a7f3d0' : '#fecaca',
                background: saveMessage.includes('✓') ? '#f0fdf4' : '#fef2f2',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {saveMessage}
            </p>
          )}
        </GlassCard>

        {/* Results Panel */}
        <GlassCard>
          <h2
            className="text-2xl font-bold tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            Monthly Payment
          </h2>

          <div
            className="text-5xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-accent-primary)' }}
          >
            {formatCurrency(results.monthlyPayment, currency, true)}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Loan Amount', value: formatCurrency(loanAmount, currency) },
              { label: 'Down Payment', value: formatCurrency(debouncedInputs.downPayment, currency) },
              { label: 'Total Payment', value: formatCurrency(results.totalPayment, currency) },
              { label: 'Total Interest', value: formatCurrency(results.totalInterest, currency) },
            ].map(({ label, value }) => (
              <div key={label} className="p-3" style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border-light)' }}>
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}>
                  {label}
                </p>
                <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="space-y-6 mt-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PieChartIcon className="w-5 h-5" style={{ color: 'var(--color-accent-teal)' }} />
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                  Principal vs Interest
                </h3>
              </div>
              <FinancialChart
                type="donut"
                data={[
                  { name: 'Principal', value: loanAmount, fill: '#0e7490' },
                  { name: 'Interest', value: results.totalInterest, fill: '#c2410c' },
                ]}
                currency={currency}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <AreaChartIcon className="w-5 h-5" style={{ color: 'var(--color-accent-primary)' }} />
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                  Loan Balance Over Time
                </h3>
              </div>
              <FinancialChart type="area" data={results.chartData} currency={currency} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Amortization Table */}
      <GlassCard>
        <h2
          className="text-2xl font-bold tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Year-by-Year Breakdown
        </h2>
        <AmortizationTable data={results.amortizationSchedule} currency={currency} />
      </GlassCard>

      {/* Rent vs Buy Comparison */}
      <RentVsBuyComparison
        principal={loanAmount}
        interestRate={debouncedInputs.interestRate}
        tenure={debouncedInputs.tenure}
      />
    </div>
  );
}
