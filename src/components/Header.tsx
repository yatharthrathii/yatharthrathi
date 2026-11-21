"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// Where the bar's text sits, measured from the top of the viewport.
const PROBE = 38;

type Box = { left: number; width: number };

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`size-3 ${className}`}>
      <path d="M3 9 9 3M4.25 3H9v4.75" />
    </svg>
  );
}

// At the top of the page the bar is bare: logo on the left, links on the right.
// Once the page scrolls it draws in to a floating capsule, which follows dark sections,
// and a soft marker slides to the section being read (or the link being hovered).
export function Header({ resumeHref }: { resumeHref: string | null }) {
  const pathname = usePathname();
  const home = pathname === "/";
  const [menu, setMenu] = useState<string | null>(null);
  const [onDark, setOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<Record<string, Box>>({});
  const linksRef = useRef<HTMLDivElement>(null);

  // The menu belongs to the page it was opened on, so navigating away closes it.
  const open = menu === pathname;

  // With a resume to hand out, that is the button. Without one, the button is the way to reach me.
  const links = resumeHref ? NAV : NAV.filter((n) => n.id !== "contact");
  const href = (id: string) => (home ? `#${id}` : `/#${id}`);
  const cta = resumeHref ? { href: resumeHref, label: "Resume", external: true } : { href: href("contact"), label: "Get in touch", external: false };

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

      // The section being read is the last one whose top has passed the upper third of the screen.
      let current: string | null = null;
      if (home) {
        const line = window.innerHeight * 0.35;
        for (const { id } of NAV) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
      }
      setActive(current);
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
  }, [home]);

  // Where each link sits inside the row, so the marker knows where to slide. Re-measured when fonts load.
  useEffect(() => {
    const row = linksRef.current;
    if (!row) return;
    const observer = new ResizeObserver(() => {
      const next: Record<string, Box> = {};
      row.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
        next[el.dataset.nav!] = { left: el.offsetLeft, width: el.offsetWidth };
      });
      setBoxes(next);
    });
    observer.observe(row);
    return () => observer.disconnect();
  }, [links.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;
  const marker = boxes[hovered ?? active ?? ""];

  const surface = onDark
    ? "border-white/10 bg-term-2/75 shadow-[0_12px_32px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl backdrop-saturate-150"
    : "border-line bg-card/80 shadow-[0_12px_32px_-16px_rgb(17_19_24/0.3)] backdrop-blur-xl backdrop-saturate-150";
  const quiet = onDark ? "text-white/60" : "text-ink/60";
  const loud = onDark ? "text-white" : "text-ink";
  const button = onDark ? "bg-white text-ink" : "bg-ink text-paper";

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 transition-colors duration-300 ${loud}`}
      style={{ "--nav-w": resumeHref ? "700px" : "620px" } as React.CSSProperties}
    >
      <div
        className={`relative mx-auto flex h-[52px] items-center justify-between rounded-full border transition-[width,padding,background-color,border-color,box-shadow] duration-500 ease-out-soft ${
          solid
            ? `pointer-events-auto w-[min(100%-24px,var(--nav-w))] pl-5 pr-[5px] ${surface}`
            : "w-[min(100%-2*var(--gutter),1432px)] border-transparent px-0"
        }`}
      >
        <Link
          href={home ? "#top" : "/"}
          className="pointer-events-auto -mx-2 flex h-11 items-center px-2 pb-1 font-serif text-[25px] font-black leading-none tracking-[-0.02em]"
        >
          <span aria-hidden>
            yr<span className="text-coral">.</span>
          </span>
          <span className="sr-only">{home ? "Yatharth Rathi, back to top" : "Yatharth Rathi, home"}</span>
        </Link>

        <nav aria-label="Primary" className="pointer-events-auto hidden items-center gap-2 md:flex">
          <div ref={linksRef} className="relative flex items-center" onMouseLeave={() => setHovered(null)}>
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 rounded-full transition-[translate,width,opacity] duration-300 ease-out-soft ${onDark ? "bg-white/10" : "bg-ink/[0.06]"} ${marker ? "opacity-100" : "opacity-0"}`}
              style={marker ? { translate: `${marker.left}px 0`, width: marker.width } : undefined}
            />
            {links.map((item) => {
              const current = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={href(item.id)}
                  data-nav={item.id}
                  aria-current={current ? "location" : undefined}
                  onMouseEnter={() => setHovered(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  className={`relative flex h-9 items-center rounded-full px-3.5 text-sm transition-colors duration-300 ${current || hovered === item.id ? loud : quiet}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <a
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
            className={`group flex h-10 items-center gap-1.5 rounded-full pl-[18px] pr-4 text-sm font-medium transition-colors duration-300 hover:bg-coral hover:text-white ${button}`}
          >
            {cta.label}
            <Arrow className={`transition-transform duration-300 ease-out-soft ${cta.external ? "group-hover:-translate-y-px group-hover:translate-x-px" : "rotate-45 group-hover:translate-x-0.5"}`} />
          </a>
        </nav>

        <button
          type="button"
          className={`pointer-events-auto flex size-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-300 md:hidden ${
            open ? button : solid ? (onDark ? "bg-white/10" : "bg-ink/[0.06]") : ""
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setMenu(open ? null : pathname)}
        >
          <span className={`h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-out-soft ${open ? "translate-y-[3.25px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-out-soft ${open ? "-translate-y-[3.25px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={`menu-in pointer-events-auto mx-auto mt-2 w-[min(100%-24px,var(--nav-w))] rounded-[28px] border p-2 md:hidden ${surface}`}
        >
          <ul>
            {NAV.map((item, i) => {
              const current = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={href(item.id)}
                    aria-current={current ? "location" : undefined}
                    onClick={() => setMenu(null)}
                    className={`flex h-[52px] items-center gap-4 rounded-[20px] px-4 text-[17px] transition-colors ${current ? (onDark ? "bg-white/10" : "bg-ink/[0.06]") : ""}`}
                  >
                    <span className={`font-mono text-xs ${current ? (onDark ? "text-coral" : "text-coral-ink") : quiet}`}>0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {resumeHref && (
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener"
              onClick={() => setMenu(null)}
              className={`mt-2 flex h-[52px] items-center justify-center gap-1.5 rounded-[20px] text-[15px] font-medium ${button}`}
            >
              Resume
              <Arrow />
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
