import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
      <h1 className="text-4xl font-semibold text-ink">Page not found</h1>
      <p className="mt-4 text-steel">
        The page you are looking for does not exist. Lets get you back to safety.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
      >
        Return home
      </Link>
    </div>
  );
}
