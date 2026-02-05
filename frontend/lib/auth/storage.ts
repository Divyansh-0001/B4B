/**
 * Secure token storage using httpOnly-like approach with localStorage
 * For production, consider using httpOnly cookies via backend proxy
 */

const ACCESS_TOKEN_KEY = "be4breach_access_token";
const REFRESH_TOKEN_KEY = "be4breach_refresh_token";

export class TokenStorage {
  /**
   * Store tokens securely
   */
  static setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") return;

    try {
      // Store in localStorage (for demo - use httpOnly cookies in production)
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error("Failed to store tokens:", error);
    }
  }

  /**
   * Get access token
   */
  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to get access token:", error);
      return null;
    }
  }

  /**
   * Get refresh token
   */
  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to get refresh token:", error);
      return null;
    }
  }

  /**
   * Clear all tokens
   */
  static clearTokens(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to clear tokens:", error);
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
