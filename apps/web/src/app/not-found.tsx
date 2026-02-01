import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-wide text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-ink">Page not found</h1>
          <p className="mt-4 text-steel">
            The page you are looking for does not exist. Lets get you back to safety.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
