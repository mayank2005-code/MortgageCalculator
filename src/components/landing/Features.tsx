'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calculator, Calendar, BarChart3, Save, Zap } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and view detailed amortization schedules',
    color: 'cyan',
  },
  {
    icon: Calculator,
    title: 'Rent Calculator',
    description: 'Project your yearly and multi-year rental costs with precision',
    color: 'pink',
  },
  {
    icon: Calendar,
    title: 'Prorated Rent',
    description: 'Calculate exact rent for partial months when moving in mid-cycle',
    color: 'purple',
  },
  {
    icon: BarChart3,
    title: 'Visual Charts',
    description: 'Interactive charts and graphs to visualize your financial data',
    color: 'cyan',
  },
  {
    icon: Save,
    title: 'Save & Track',
    description: 'Save calculations and compare different scenarios over time',
    color: 'pink',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Real-time calculations as you adjust your inputs with sliders',
    color: 'purple',
  },
];

const colorMap = {
  cyan: {
    iconColor: '#0e7490',
    bg: 'rgba(14, 116, 144, 0.1)',
  },
  pink: {
    iconColor: '#c2410c',
    bg: 'rgba(194, 65, 12, 0.1)',
  },
  purple: {
    iconColor: '#d97706',
    bg: 'rgba(217, 119, 6, 0.1)',
  },
};

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 relative">
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
            Powerful Features
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Everything you need for smart financial planning
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color as keyof typeof colorMap];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className="p-6 h-full transition-all duration-200 group cursor-pointer hover:-translate-y-1"
                  style={{
                    background: 'white',
                    border: '1.5px solid var(--color-border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-4"
                    style={{
                      background: colors.bg,
                    }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: colors.iconColor }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
