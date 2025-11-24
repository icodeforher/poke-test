import { apiClient } from './client';
import { LoginCredentials, LoginResponse } from '@/types/auth';

/**
 * Authentication API endpoints
 */
export const authApi = {
  /**
   * Login with username and password
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', credentials);
    return response.data;
  },

  /**
   * Verify if token is still valid
   */
  verifyToken: async (): Promise<boolean> => {
    try {
      // Try to fetch pokemons to verify token
      await apiClient.get('/pokemons?limit=1');
      return true;
    } catch (error) {
      return false;
    }
  },
};

