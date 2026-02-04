"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, BarChart, LogOut } from "lucide-react";

export default function ClientDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute requiredRole={["client"]}>
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  Client Portal
                </span>
              </div>
              <h1 className="text-3xl font-bold">Client Dashboard</h1>
              <p className="mt-1 text-muted-foreground">
                Your client management portal
              </p>
            </div>
            <Button onClick={logout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h3 className="mb-2 font-semibold">Documents</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                View and manage your documents
              </p>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center">
              <BarChart className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h3 className="mb-2 font-semibold">Reports</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Access your reports and analytics
              </p>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center">
              <Briefcase className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h3 className="mb-2 font-semibold">Projects</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Manage your active projects
              </p>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>

          {/* Client Info */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Account Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Type</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Briefcase className="h-3 w-3" />
                  Client
                </span>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-6 rounded-lg border-l-4 border-primary bg-card p-6">
            <h3 className="mb-2 font-semibold text-primary">
              Welcome to Your Client Portal
            </h3>
            <p className="text-sm text-muted-foreground">
              Access your documents, reports, and project information. Contact
              your account manager if you need assistance.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
