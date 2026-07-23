'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import TabNavigation from '@/components/dashboard/TabNavigation';
import MortgageCalculator from '@/components/dashboard/MortgageCalculator';
import RentCalculator from '@/components/dashboard/RentCalculator';
import ProratedRentCalculator from '@/components/dashboard/ProratedRentCalculator';
import SavedCalculations from '@/components/dashboard/SavedCalculations';
import useCalculatorStore from '@/store/calculator';
import { motion } from 'framer-motion';

function CalculatorContent() {
  const { activeTab } = useCalculatorStore();

  return (
    <div
      className="min-h-screen relative"
      style={{ zIndex: 2 }}
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <Header />
          <TabNavigation />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'mortgage' && <MortgageCalculator />}
            {activeTab === 'rent' && <RentCalculator />}
            {activeTab === 'prorated_rent' && <ProratedRentCalculator />}
          </motion.div>

          <div className="mt-8">
            <SavedCalculations />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <SessionProvider>
      <CalculatorContent />
    </SessionProvider>
  );
}
