import { create } from 'zustand';
import { storage } from '@/lib/utils/storage';
import { authApi } from '@/lib/api/auth';
import { LoginCredentials } from '@/types/auth';

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      
      // Save to storage
      storage.setToken(response.access_token);
      storage.setUser(credentials.username);
      
      // Update state
      set({
        token: response.access_token,
        username: credentials.username,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';
      set({
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  logout: () => {
    storage.clear();
    set({
      token: null,
      username: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: () => {
    const token = storage.getToken();
    const username = storage.getUser();
    
    if (token && username) {
      set({
        token,
        username,
        isAuthenticated: true,
      });
    } else {
      set({
        token: null,
        username: null,
        isAuthenticated: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

