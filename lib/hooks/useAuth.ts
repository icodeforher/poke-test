'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

/**
 * Hook to handle authentication logic
 */
export function useAuth() {
  const router = useRouter();
  const {
    isAuthenticated,
    username,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (username: string, password: string) => {
    try {
      await login({ username, password });
      router.push('/pokemon');
    } catch (error) {
      // Error is handled in the store
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return {
    isAuthenticated,
    username,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError,
  };
}

