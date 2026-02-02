"use client";

import Link from "next/link";
import { useEffect } from "react";

type RootErrorProps = {
  error: Error;
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="layout-container ds-section">
        <div className="ds-card space-y-4">
          <p className="ds-eyebrow">Something went wrong</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            We couldn't load this experience.
          </h1>
          <p className="text-sm text-muted-foreground">
            Try again or return to the homepage.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="ds-button" type="button" onClick={reset}>
              Try again
            </button>
            <Link className="ds-link" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
