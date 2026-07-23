'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Settings, LineChart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'Choose Your Calculator',
    description: 'Select from mortgage, rent, or prorated rent calculators based on your needs',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Enter Your Details',
    description: 'Input your financial parameters using our intuitive sliders and inputs',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Get Instant Results',
    description: 'View detailed breakdowns, charts, and amortization tables instantly',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            How It Works
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Get started in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div
                className="p-8 text-center hover:-translate-y-1 transition-all duration-200"
                style={{
                  background: 'white',
                  border: '1.5px solid var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: 'rgba(14, 116, 144, 0.1)',
                  }}
                >
                  <step.icon className="w-8 h-8" style={{ color: '#0e7490' }} />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
