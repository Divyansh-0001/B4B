"use client";

import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}

export function PageLayout({ 
  children, 
  showNav = true, 
  showFooter = true 
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {showNav && <Navigation />}
      <main className={`flex-1 ${showNav ? "pt-16" : ""}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
