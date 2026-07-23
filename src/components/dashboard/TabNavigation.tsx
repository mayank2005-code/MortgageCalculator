'use client';

import React from 'react';
import { Calculator, Home as HomeIcon, Calendar } from 'lucide-react';
import useCalculatorStore, { CalculatorTab } from '@/store/calculator';

const tabs: { id: CalculatorTab; label: string; icon: React.ReactNode }[] = [
  { id: 'mortgage', label: 'Mortgage', icon: <HomeIcon className="w-5 h-5" /> },
  { id: 'rent', label: 'Rent', icon: <Calculator className="w-5 h-5" /> },
  { id: 'prorated_rent', label: 'Prorated Rent', icon: <Calendar className="w-5 h-5" /> },
];

export default function TabNavigation() {
  const { activeTab, setActiveTab } = useCalculatorStore();

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
            className={`
            flex items-center gap-2 px-6 py-3 font-semibold text-sm
            transition-all duration-200 whitespace-nowrap
            ${activeTab === tab.id 
              ? 'text-white' 
              : 'hover:-translate-y-0.5 text-gray-700 hover:bg-gray-100'
            }
          `}
          style={
            activeTab === tab.id
              ? {
                  background: 'var(--color-accent-primary)',
                  boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)',
                  fontFamily: 'var(--font-sans)',
                }
              : {
                  background: 'white',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-sans)',
                }
          }
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
