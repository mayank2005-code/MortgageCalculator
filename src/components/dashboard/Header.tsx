'use client';

import React from 'react';
import { Home, LogOut, LogIn } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CurrencyToggle from './CurrencyToggle';
import Image from 'next/image';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header
      className="glass-card mb-6"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{
              background: 'var(--color-accent-primary)',
            }}
          >
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              Mortgage Calc
            </h1>
            <p 
              className="text-xs font-medium" 
              style={{ 
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Financial Calculator
            </p>
          </div>
        </button>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <CurrencyToggle />

          {/* User Menu */}
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={session.user.image}
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </div>
              ) : (
                <div
                  className="w-9 h-9 flex items-center justify-center font-semibold text-sm rounded-full"
                  style={{
                    background: 'var(--color-accent-primary)',
                    color: 'white',
                    fontFamily: 'var(--font-display)',
                  }}
                  title={session.user?.name || session.user?.email || 'User'}
                >
                  {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 transition-all duration-200 font-medium text-sm border hover:-translate-y-0.5"
                style={{
                  background: 'white',
                  borderColor: '#e5e7eb',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="flex items-center gap-2 px-5 py-2.5 transition-all duration-200 font-semibold text-sm hover:-translate-y-0.5"
              style={{
                background: 'var(--color-accent-primary)',
                color: 'white',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)',
              }}
            >
              <LogIn className="w-4 h-4" />
              <span className="text-sm">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
