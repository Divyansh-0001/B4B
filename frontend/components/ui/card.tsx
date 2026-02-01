import clsx from "clsx";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "glass-panel rounded-3xl p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_28px_rgba(79,139,255,0.12)] motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
