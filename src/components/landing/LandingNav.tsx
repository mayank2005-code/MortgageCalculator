'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Menu, X, LogIn, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
];

export default function LandingNav() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(255, 250, 242, 0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1.5px solid var(--color-border)' : '1.5px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div
                className="w-9 h-9 flex items-center justify-center"
                style={{ background: 'var(--color-accent-primary)' }}
              >
                <Home className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                Mortgage Calc
              </span>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
              onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                    e.currentTarget.style.background = 'var(--color-bg-tertiary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              {session ? (
                <>
                  {session.user?.image ? (
                    <div className="overflow-hidden rounded-full w-8 h-8">
                      <Image src={session.user.image} alt="" width={32} height={32} />
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 flex items-center justify-center font-semibold text-sm rounded-full text-white"
                      style={{ background: 'var(--color-accent-primary)' }}
                    >
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <button
                    onClick={() => router.push('/calculator')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'var(--color-accent-primary)',
                      boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <Calculator className="w-4 h-4" />
                    Open Calculator
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push('/auth')}
                    className="px-4 py-2 text-sm font-medium transition-all duration-200"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.background = 'var(--color-bg-tertiary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push('/calculator')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'var(--color-accent-primary)',
                      boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: 'var(--color-text-primary)', background: 'var(--color-bg-tertiary)' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: 'var(--color-bg-primary)',
              borderBottom: '1.5px solid var(--color-border)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 text-sm font-medium transition-colors"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-tertiary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-2 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                {session ? (
                  <button
                    onClick={() => { setMenuOpen(false); router.push('/calculator'); }}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white"
                    style={{ background: 'var(--color-accent-primary)', fontFamily: 'var(--font-sans)' }}
                  >
                    <Calculator className="w-4 h-4" />
                    Open Calculator
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => { setMenuOpen(false); router.push('/auth'); }}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border"
                      style={{
                        color: 'var(--color-text-primary)',
                        borderColor: 'var(--color-border)',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); router.push('/calculator'); }}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white"
                      style={{ background: 'var(--color-accent-primary)', fontFamily: 'var(--font-sans)' }}
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
