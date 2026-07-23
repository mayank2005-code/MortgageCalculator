'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function OAuthButtons() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/calculator' });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 font-medium text-sm transition-all duration-200 border hover:-translate-y-0.5"
        style={{
          background: 'white',
          borderColor: '#e5e7eb',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
}
