"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// Where the bar's text sits, measured from the top of the viewport.
const PROBE = 36;

// The bar has no background of its own, so it never reads as a separate strip.
// Once the page scrolls, the logo and the links each sit on a small frosted pill so they
// stay readable over whatever passes underneath, and the text colour follows dark sections.
export function Header({ resumeHref }: { resumeHref: string | null }) {
  const pathname = usePathname();
  const home = pathname === "/";
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      let dark = false;
      document.querySelectorAll<HTMLElement>("[data-header='dark']").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= PROBE && r.bottom >= PROBE) dark = true;
      });
      setOnDark(dark);
      setScrolled(window.scrollY > 24);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const light = onDark && !open;
  const pill = scrolled && !open ? `backdrop-blur-md ${light ? "bg-term/55" : "bg-paper/65"}` : "";
  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${light ? "text-white" : "text-ink"} ${open ? "bg-paper" : "pointer-events-none"}`}>
      <div className="mx-auto flex h-[72px] max-w-[1560px] items-center justify-between px-[clamp(20px,4.5vw,64px)]">
        <Link
          href={home ? "#top" : "/"}
          className={`pointer-events-auto -ml-3.5 rounded-full px-3.5 pb-2.5 pt-1.5 font-serif text-[26px] font-black leading-none tracking-[-0.02em] transition-colors duration-300 ${pill}`}
          aria-label={home ? "Yatharth Rathi, back to top" : "Yatharth Rathi, home"}
        >
          yr<span className="text-coral">.</span>
        </Link>

        <nav aria-label="Primary" className={`pointer-events-auto -mr-6 hidden items-center gap-9 rounded-full px-6 py-3 text-[15px] transition-colors duration-300 md:flex ${pill}`}>
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={href(item.id)}
              className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-[1.5px] after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          {resumeHref && (
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener"
              className={`rounded-full px-5 py-3 text-sm font-medium transition-colors hover:bg-coral hover:text-white ${light ? "bg-white text-ink" : "bg-ink text-paper"}`}
            >
              Resume ↓
            </a>
          )}
        </nav>

        <button
          type="button"
          className={`pointer-events-auto flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border backdrop-blur-md md:hidden ${light ? "border-white/25 bg-term/40" : "border-line bg-paper/60"}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-[1.5px] w-5 bg-current transition-transform ${open ? "translate-y-[3.75px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-current transition-transform ${open ? "-translate-y-[3.75px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-y border-line px-[clamp(20px,4.5vw,64px)] pb-6 pt-2 md:hidden">
          {NAV.map((item) => (
            <Link key={item.id} href={href(item.id)} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-serif text-3xl font-extrabold">
              {item.label}
            </Link>
          ))}
          {resumeHref && (
            <a href={resumeHref} target="_blank" rel="noopener" className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper">
              Resume ↓
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
