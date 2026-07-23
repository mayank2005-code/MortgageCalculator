'use client';

import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, TrendingUp, Shield, BarChart3, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import Footer from '@/components/dashboard/Footer';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import OAuthButtons from '@/components/auth/OAuthButtons';

const highlights = [
  {
    icon: TrendingUp,
    title: 'Mortgage Calculator',
    desc: 'Full amortization schedules and interest breakdowns',
  },
  {
    icon: BarChart3,
    title: 'Rent vs Buy Analysis',
    desc: 'Compare long-term costs with interactive charts',
  },
  {
    icon: Clock,
    title: 'Prorated Rent',
    desc: 'Exact partial-month rent, down to the day',
  },
  {
    icon: Shield,
    title: 'Save & Revisit',
    desc: 'Store calculations and load them back any time',
  },
];

function AuthContent() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: 'var(--color-bg-primary)', zIndex: 2 }}>

      {/* Main content — grows to fill space above footer */}
      <div className="flex flex-1">

        {/* ── Left: Auth Form ── */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 xl:px-20 py-12">

          {/* Back */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 mb-10 px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 font-medium text-sm border self-start"
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-border)',
              background: 'white',
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: 'var(--color-accent-primary)' }}
              >
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className="text-lg font-bold tracking-tight leading-none"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  Mortgage Calc
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}
                >
                  Financial Calculator
                </p>
              </div>
            </div>

            <h2
              className="text-2xl font-bold tracking-tight mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p
              className="text-sm mb-8"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              {isSignUp
                ? 'Sign up free — no credit card required'
                : 'Sign in to access your saved calculations'}
            </p>

            <GlassCard>
              {/* Tabs */}
              <div
                className="flex gap-2 mb-6 p-1"
                style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}
              >
                <button
                  onClick={() => setIsSignUp(false)}
                  className="flex-1 py-2.5 px-4 font-semibold text-sm transition-all duration-200"
                  style={
                    !isSignUp
                      ? { background: 'white', color: 'var(--color-text-primary)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontFamily: 'var(--font-sans)' }
                      : { color: 'var(--color-text-secondary)', background: 'transparent', fontFamily: 'var(--font-sans)' }
                  }
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="flex-1 py-2.5 px-4 font-semibold text-sm transition-all duration-200"
                  style={
                    isSignUp
                      ? { background: 'white', color: 'var(--color-text-primary)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontFamily: 'var(--font-sans)' }
                      : { color: 'var(--color-text-secondary)', background: 'transparent', fontFamily: 'var(--font-sans)' }
                  }
                >
                  Sign Up
                </button>
              </div>

              {/* Forms */}
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isSignUp ? <SignUpForm /> : <SignInForm />}
              </motion.div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}>
                  OR
                </span>
                <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              </div>

              <OAuthButtons />
            </GlassCard>

            <p
              className="text-center text-sm mt-5 font-medium"
              style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}
            >
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold hover:underline transition-colors"
                style={{ color: 'var(--color-accent-primary)' }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </div>

        {/* ── Right: Brand Panel ── */}
        <div
          className="hidden lg:flex flex-col justify-between w-1/2 p-16"
          style={{
            background: 'var(--color-bg-tertiary)',
            borderLeft: '1.5px solid var(--color-border)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Headline */}
            <h2
              className="text-4xl font-bold tracking-tight mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              Make smarter{' '}
              <span style={{ color: 'var(--color-accent-primary)' }}>
                financial decisions
              </span>
              {' '}today
            </h2>
            <p
              className="text-base mb-12 leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              Your free suite of mortgage, rent, and prorated rent calculators — built for clarity, not complexity.
            </p>

            {/* Feature highlights */}
            <div className="space-y-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: 'rgba(194, 65, 12, 0.1)',
                      border: '1px solid rgba(194, 65, 12, 0.2)',
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'var(--color-accent-primary)' }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm mb-0.5"
                      style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom stat strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex gap-8 pt-10"
            style={{ borderTop: '1.5px solid var(--color-border)' }}
          >
            {[
              { value: '3', label: 'Calculator types' },
              { value: 'USD + INR', label: 'Currencies' },
              { value: '100%', label: 'Free forever' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-accent-primary)', fontFamily: 'var(--font-display)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Footer — always at bottom ── */}
      <Footer className="border-t py-12" />
    </div>
  );
}

export default function AuthPage() {
  return (
    <SessionProvider>
      <AuthContent />
    </SessionProvider>
  );
}
