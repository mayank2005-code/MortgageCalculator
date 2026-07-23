'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Footer({ className = 'mt-16 border-t py-12' }: { className?: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Calculators', path: '/calculator' },
    ...(!session ? [{ label: 'Sign In', path: '/auth' }] : []),
  ];

  return (
    <footer
      className={className}
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">

          {/* Brand */}
          <div className="max-w-xs">
            <h3
              className="text-lg font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              Mortgage Calc
            </h3>
            <p
              className="text-xs"
              style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}
            >
              Your trusted calculator for mortgages, rent, and prorated rent planning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-sm transition-all duration-200 hover:translate-x-1"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t"
          style={{ borderColor: 'var(--color-border-light)' }}
        >
          <p
            className="text-sm flex items-center gap-2"
            style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}
          >
            <span>&copy; {currentYear} Mortgage Calc</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with{' '}
              <Heart
                className="w-3 h-3"
                style={{ color: 'var(--color-accent-primary)', fill: 'var(--color-accent-primary)' }}
              />{' '}
              for your future
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
