/**
 * API constants
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_V1 = '/api/v1';

export const ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_V1}/auth/register`,
  AUTH_LOGIN: `${API_V1}/auth/login`,
  AUTH_GOOGLE: `${API_V1}/auth/google`,
  AUTH_GOOGLE_CALLBACK: `${API_V1}/auth/google/callback`,
  
  // Users
  USERS_ME: `${API_V1}/users/me`,
  USERS_LIST: `${API_V1}/users`,
  USERS_DETAIL: (id: number) => `${API_V1}/users/${id}`,
} as const;
