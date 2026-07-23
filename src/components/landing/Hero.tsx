'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            Smart Financial Decisions
            <br />
            <span style={{ color: 'var(--color-accent-primary)' }}>
              Start Here
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl font-normal mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Calculate mortgages, rent, and prorated rent with precision. Make informed decisions with real-time results and beautiful visualizations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="primary"
              onClick={() => router.push('/calculator')}
              className="text-base px-8 py-4"
            >
              <Calculator className="w-5 h-5" />
              Get Started
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-base px-8 py-4"
            >
              <TrendingUp className="w-5 h-5" />
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm"
            style={{ 
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent-green)' }}></div>
              <span>3 Calculation Types</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent-teal)' }}></div>
              <span>100% Accurate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent-primary)' }}></div>
              <span>Completely Free</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
