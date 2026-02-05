"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";
import { User, Shield, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="mt-1 text-muted-foreground">
                Welcome back, {user?.full_name || user?.email}
              </p>
            </div>
            <Button onClick={logout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* User Info Card */}
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">User Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Your account information
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>

              {user?.full_name && (
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.full_name}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Roles</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {user?.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      <Shield className="h-3 w-3" />
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    user?.is_active
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {user?.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-6 rounded-lg border-l-4 border-primary bg-card p-6">
            <h3 className="mb-2 font-semibold text-primary">Welcome!</h3>
            <p className="text-sm text-muted-foreground">
              You have successfully signed in to the Be4Breach Platform. Your
              dashboard provides access to features based on your assigned roles.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
