"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";
import { Shield, Users, Settings, LogOut, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute requiredRole={["admin"]}>
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  Admin Access
                </span>
              </div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="mt-1 text-muted-foreground">
                Full system management and control
              </p>
            </div>
            <Button onClick={logout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-2 flex items-center justify-between">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">24</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-2 flex items-center justify-between">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">3</span>
              </div>
              <p className="text-sm text-muted-foreground">Active Roles</p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-2 flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">98%</span>
              </div>
              <p className="text-sm text-muted-foreground">System Health</p>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">User Management</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage users and permissions
                  </p>
                </div>
              </div>
              <Button className="w-full">Manage Users</Button>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">System Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure platform settings
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Open Settings
              </Button>
            </div>
          </div>

          {/* Admin Info */}
          <div className="mt-6 rounded-lg border-l-4 border-primary bg-card p-6">
            <h3 className="mb-2 font-semibold text-primary">
              Admin Access Active
            </h3>
            <p className="text-sm text-muted-foreground">
              You have full administrative privileges. All system functions are
              available. Signed in as: {user?.email}
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
