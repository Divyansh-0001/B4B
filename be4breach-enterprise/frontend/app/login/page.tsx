import Link from "next/link";
import LoginPanel from "@/components/LoginPanel";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-8">
      <div>
        <h2 className="text-3xl font-semibold text-white">Secure sign-in</h2>
        <p className="mt-2 text-slate-300">
          Use enterprise credentials or Google SSO for instant access.
        </p>
      </div>
      <LoginPanel />
      <p className="text-sm text-slate-400">
        Need admin access?{" "}
        <Link href="/admin" className="text-brand-cyan hover:underline">
          Request elevated permissions
        </Link>
        .
      </p>
    </section>
  );
}
