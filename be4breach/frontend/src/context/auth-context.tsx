"use client";

import * as React from "react";
import {
  apiRequest,
  clearTokens,
  getStoredTokens,
  storeTokens,
} from "@/lib/api";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type AuthUser = {
  id: string;
  email: string;
  full_name?: string | null;
  is_active: boolean;
  roles: string[];
  oauth_provider?: string | null;
};

type LoginPayload = {
  email: string;
  password: string;
  role?: "member" | "client" | "admin";
};

type RegisterPayload = {
  full_name?: string;
  email: string;
  password: string;
  requested_role?: "member" | "client";
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  applyTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  clearError: () => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [status, setStatus] = React.useState<AuthStatus>("loading");
  const [error, setError] = React.useState<string | null>(null);

  const hydrateUser = React.useCallback(async (token: string) => {
    try {
      const profile = await apiRequest<AuthUser>("/api/v1/auth/me", {
        accessToken: token,
      });
      setUser(profile);
      setStatus("authenticated");
    } catch (err) {
      clearTokens();
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  React.useEffect(() => {
    const tokens = getStoredTokens();
    if (!tokens) {
      setStatus("unauthenticated");
      return;
    }
    hydrateUser(tokens.accessToken);
  }, [hydrateUser]);

  const applyTokens = React.useCallback(
    async (accessToken: string, refreshToken: string) => {
      storeTokens(accessToken, refreshToken);
      await hydrateUser(accessToken);
    },
    [hydrateUser]
  );

  const login = React.useCallback(
    async (payload: LoginPayload) => {
      setError(null);
      setStatus("loading");
      try {
        const tokens = await apiRequest<TokenResponse>("/api/v1/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        await applyTokens(tokens.access_token, tokens.refresh_token);
      } catch (err) {
        const message =
          err && typeof err === "object" && "message" in err
            ? String(err.message)
            : "Unable to sign in.";
        setError(message);
        setStatus("unauthenticated");
        throw err;
      }
    },
    [applyTokens]
  );

  const register = React.useCallback(
    async (payload: RegisterPayload) => {
      setError(null);
      setStatus("loading");
      try {
        await apiRequest("/api/v1/auth/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        await login({
          email: payload.email,
          password: payload.password,
          role: payload.requested_role ?? "member",
        });
      } catch (err) {
        const message =
          err && typeof err === "object" && "message" in err
            ? String(err.message)
            : "Unable to register.";
        setError(message);
        setStatus("unauthenticated");
        throw err;
      }
    },
    [login]
  );

  const logout = React.useCallback(() => {
    clearTokens();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const loginWithGoogle = React.useCallback(async () => {
    setError(null);
    try {
      const response = await apiRequest<{ authorization_url: string }>(
        "/api/v1/auth/google/login"
      );
      if (typeof window !== "undefined") {
        window.location.href = response.authorization_url;
      }
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String(err.message)
          : "Unable to start Google sign-in.";
      setError(message);
      setStatus("unauthenticated");
      throw err;
    }
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      error,
      login,
      register,
      logout,
      loginWithGoogle,
      applyTokens,
      clearError,
    }),
    [
      user,
      status,
      error,
      login,
      register,
      logout,
      loginWithGoogle,
      applyTokens,
      clearError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
