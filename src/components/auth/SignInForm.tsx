'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/calculator');
        router.refresh();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="email"
        label="Email"
        placeholder="your@email.com"
        icon={<Mail className="w-5 h-5" />}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        icon={<Lock className="w-5 h-5" />}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      {error && (
        <div
          className="p-3 text-sm font-medium border"
          style={{
            background: '#fef2f2',
            borderColor: '#fecaca',
            color: '#dc2626',
          }}
        >
          {error}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Sign In
      </Button>
    </form>
  );
}
