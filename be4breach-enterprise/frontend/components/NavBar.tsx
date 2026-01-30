import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold text-white">
          Be4Breach Enterprise
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
