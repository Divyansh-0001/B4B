import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gradient">
            Be4Breach
          </span>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-brand-cyan lg:inline-flex">
            Enterprise
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/60"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
