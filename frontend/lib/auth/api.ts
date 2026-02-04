/**
 * Authentication API client
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  roles: string[];
  created_at: string;
}

export class AuthAPI {
  /**
   * Login with email and password
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    return response.json();
  }

  /**
   * Get current user info
   */
  static async getCurrentUser(accessToken: string): Promise<User> {
    const response = await fetch(`${API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    return response.json();
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    return response.json();
  }

  /**
   * Initiate Google OAuth
   */
  static async getGoogleAuthUrl(): Promise<string> {
    const response = await fetch(`${API_URL}/api/v1/auth/google`);
    
    if (!response.ok) {
      throw new Error("Failed to get Google auth URL");
    }

    const data = await response.json();
    return data.authorization_url;
  }
}
