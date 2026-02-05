"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, Loader2, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth/context";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
      // Redirect handled by auth context
    } catch (err) {
      if (err instanceof Error) {
        // Sanitized error messages
        if (err.message.includes("Incorrect email or password")) {
          setError("Invalid credentials. Please try again.");
        } else if (err.message.includes("Inactive user")) {
          setError("Your account is inactive. Please contact support.");
        } else if (err.message.includes("429")) {
          setError("Too many attempts. Please try again later.");
        } else {
          setError("Unable to sign in. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch (err) {
      setError("Google sign-in unavailable. Please try again later.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Red accent glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 flex justify-center">
            <Logo width={200} height={60} />
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Enterprise Security Management
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Sign In</h2>
            <p className="mt-1 text-sm text-gray-400">
              Access your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-gray-300">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-gray-500 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder-gray-500 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google SSO */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
            size="lg"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          {/* Role Info */}
          <div className="mt-6 rounded-lg border border-white/5 bg-white/5 p-4">
            <p className="mb-2 text-xs font-medium text-gray-400">
              Supported Roles:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                Admin
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                Client
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                User
              </span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          Secure authentication powered by JWT
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return <LoginContent />;
}
