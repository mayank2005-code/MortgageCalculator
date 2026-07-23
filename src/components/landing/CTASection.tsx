'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              var(--color-neon-cyan) 40px,
              var(--color-neon-cyan) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              var(--color-neon-pink) 40px,
              var(--color-neon-pink) 41px
            )
          `,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 md:p-20 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(194, 65, 12, 0.05), rgba(217, 119, 6, 0.05))',
            border: '1.5px solid var(--color-border)',
          }}
        >
          {/* Decorative Corner Elements */}


          {/* Headline */}
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            Ready to Get Started?
          </h2>

          {/* Subheadline */}
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Start making smarter financial decisions today with our free calculator suite
          </p>

          {/* CTA Button */}
          <Button
            variant="primary"
            onClick={() => router.push('/calculator')}
            className="text-lg px-10 py-4"
          >
            Start Calculating
            <ArrowRight className="w-5 h-5" />
          </Button>

          {/* Trust Line */}
          <p
            className="mt-6 text-sm"
            style={{
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            No sign-up required • 100% free • Instant results
          </p>
        </motion.div>
      </div>
    </section>
  );
}
