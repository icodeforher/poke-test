/**
 * Utility functions for localStorage management
 */

const TOKEN_KEY = 'pokemon_auth_token';
const USER_KEY = 'pokemon_user';

export const storage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(USER_KEY);
  },

  setUser: (username: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, username);
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_KEY);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

