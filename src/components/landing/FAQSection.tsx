'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need an account to use the calculators?',
    a: 'No — all three calculators are fully public. An account is only needed if you want to save and revisit calculations later. You can start calculating immediately without signing up.',
  },
  {
    q: 'How is the monthly mortgage payment calculated?',
    a: 'Using the standard amortization formula based on your loan principal, annual interest rate, and loan term. The breakdown shows exactly how much of each payment goes toward principal vs interest, year by year.',
  },
  {
    q: 'How is prorated rent calculated?',
    a: 'Daily rate = monthly rent ÷ total days in the month. That daily rate is then multiplied by the number of days you\'re occupying the unit, giving you a precise figure rather than a rough estimate.',
  },
  {
    q: 'What does the Rent vs Buy analysis compare?',
    a: 'It compares the total cost of renting (rent payments adjusted for annual increases) against the total cost of buying (mortgage payments + down payment opportunity cost + maintenance) over your chosen time horizon, helping you find your break-even point.',
  },
  {
    q: 'Which currencies are supported?',
    a: 'USD and INR. You can toggle between them at any time — all values and formatted outputs switch instantly without any re-calculation needed.',
  },
  {
    q: 'Is my saved data private?',
    a: 'Yes. Saved calculations are tied to your account and not visible to anyone else. If you use the calculators without signing in, nothing is stored anywhere — all computation happens in your browser.',
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      style={{ borderBottom: '1.5px solid var(--color-border)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-150"
        aria-expanded={open}
      >
        <span
          className="text-base font-semibold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center transition-colors duration-150"
          style={{
            background: open ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
            border: '1.5px solid var(--color-border)',
            color: open ? 'white' : 'var(--color-text-secondary)',
          }}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pb-5 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
          >
            Everything you need to know before you start.
          </p>
        </motion.div>

        {/* Accordion */}
        <div
          style={{ borderTop: '1.5px solid var(--color-border)' }}
        >
          {faqs.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
