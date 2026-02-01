import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-shell py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">We lost that signal.</h1>
      <p className="mt-3 text-sm text-white/60">
        The page you requested does not exist or has been secured.
      </p>
      <div className="mt-6 flex justify-center">
        <ButtonLink href="/">Return to command</ButtonLink>
      </div>
    </div>
  );
}
