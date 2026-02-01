import type { ReactNode } from "react";

export default function EnterpriseLayout({ children }: { children: ReactNode }) {
  return <section className="section-shell py-16">{children}</section>;
}
