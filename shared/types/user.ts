/**
 * User types and interfaces shared between frontend and backend
 */

export enum UserRole {
  ADMIN = "admin",
  CLIENT = "client",
  USER = "user",
}

export interface User {
  id: number;
  email: string;
  full_name: string | null;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  oauth_provider: string | null;
  oauth_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name?: string | null;
  role?: UserRole;
}

export interface UserUpdate {
  email?: string;
  password?: string;
  full_name?: string | null;
  role?: UserRole;
  is_active?: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}
