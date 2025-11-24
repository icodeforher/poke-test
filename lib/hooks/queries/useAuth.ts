'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/client-typed';
import { storage } from '@/lib/utils/storage';
import { useAuthStore } from '@/lib/store/authStore';

interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Hook for login mutation with React Query
 */
export function useLogin() {
  const router = useRouter();
  const { login: setAuthState } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data, error } = await apiClient.POST('/login', {
        body: credentials,
      });

      if (error) {
        const errorMessage = typeof error.detail === 'string' 
          ? error.detail 
          : 'Login failed';
        throw new Error(errorMessage);
      }

      return data;
    },
    onSuccess: (data, variables) => {
      if (data) {
        // Save to storage
        storage.setToken(data.access_token);
        storage.setUser(variables.username);

        // Update store
        setAuthState({
          username: variables.username,
          password: variables.password,
        });

        // Redirect
        router.push('/pokemon');
      }
    },
  });
}

/**
 * Hook for logout
 */
export function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();

  return () => {
    logout();
    storage.clear();
    router.push('/login');
  };
}

