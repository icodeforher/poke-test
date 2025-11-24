/**
 * Type-safe API Client using openapi-fetch
 * Types are auto-generated from backend OpenAPI schema
 */
import createClient from 'openapi-fetch';
import type { paths } from '@/types/api';
import { storage } from '@/lib/utils/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Create typed API client
 * All endpoints, parameters, and responses are fully typed
 */
export const apiClient = createClient<paths>({
  baseUrl: API_URL,
});

/**
 * Request middleware to add auth token
 */
apiClient.use({
  async onRequest({ request }) {
    const token = storage.getToken();
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
    return request;
  },
  async onResponse({ response }) {
    // Handle 401 errors (token expired)
    if (response.status === 401) {
      storage.clear();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return response;
  },
});

export default apiClient;

