'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { storage } from '@/lib/utils/storage';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to pokemon page
    const token = storage.getToken();
    if (token) {
      router.push('/pokemon');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <LoginForm />
    </div>
  );
}

