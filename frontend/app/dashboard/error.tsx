"use client";

import Link from "next/link";
import { useEffect } from "react";

type DashboardErrorProps = {
  error: Error;
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="layout-container ds-section">
        <div className="ds-card space-y-4">
          <p className="ds-eyebrow">Dashboard error</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            We couldn't load the dashboard.
          </h1>
          <p className="text-sm text-muted-foreground">
            Refresh the page or return to the login screen.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="ds-button" type="button" onClick={reset}>
              Try again
            </button>
            <Link className="ds-link" href="/login">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
