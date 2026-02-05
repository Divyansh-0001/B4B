"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI, User, LoginCredentials } from "./api";
import { TokenStorage } from "./storage";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  /**
   * Load user from stored token
   */
  const loadUser = async () => {
    try {
      const accessToken = TokenStorage.getAccessToken();

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      const userData = await AuthAPI.getCurrentUser(accessToken);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user:", error);
      TokenStorage.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login with email and password
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      const authResponse = await AuthAPI.login(credentials);

      // Store tokens
      TokenStorage.setTokens(
        authResponse.access_token,
        authResponse.refresh_token
      );

      // Get user info
      const userData = await AuthAPI.getCurrentUser(authResponse.access_token);
      setUser(userData);

      // Role-based redirect
      redirectByRole(userData.roles);
    } catch (error) {
      throw error; // Let the component handle the error
    }
  };

  /**
   * Login with Google OAuth
   */
  const loginWithGoogle = async () => {
    try {
      const authUrl = await AuthAPI.getGoogleAuthUrl();
      
      // Redirect to Google OAuth
      window.location.href = authUrl;
    } catch (error) {
      throw new Error("Failed to initiate Google login");
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    TokenStorage.clearTokens();
    setUser(null);
    router.push("/login");
  };

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    await loadUser();
  };

  /**
   * Redirect based on user role
   */
  const redirectByRole = (roles: string[]) => {
    if (roles.includes("admin")) {
      router.push("/dashboard/admin");
    } else if (roles.includes("client")) {
      router.push("/dashboard/client");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
