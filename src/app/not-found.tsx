import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm text-coral">GET {"/"}?? → 404</p>
        <h1 className="mt-4 font-serif text-[clamp(44px,7vw,96px)] font-black leading-none tracking-[-0.04em]">Nothing here.</h1>
        <p className="mx-auto mt-4 max-w-[36ch] text-muted">And unlike the bugs I fix at work, this one is on purpose. The page you asked for doesn&apos;t exist.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-coral">
          Back home
        </Link>
      </div>
    </main>
  );
}
