import clsx from "clsx";
import type { ReactNode } from "react";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-white/15 bg-abyss-900/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
