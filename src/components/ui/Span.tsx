"use client";

import { useEffect, useRef } from "react";
import { currentYearMonth, durationLabel, monthLabel, monthsBetween } from "@/lib/dates";

type Props = { start: string; end?: string; className?: string };

function text(start: string, end: string | undefined, now: string) {
  return `${monthLabel(start)} – ${end ? monthLabel(end) : "Now"} · ${durationLabel(monthsBetween(start, end ?? now))}`;
}

// "Apr 2026 – Now · 7 mos". The site is static, so a current role's length is
// refreshed in the browser after mount; the build-time value shows until then.
export function Span({ start, end, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!end && ref.current) ref.current.textContent = text(start, end, currentYearMonth());
  }, [start, end]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {text(start, end, currentYearMonth())}
    </span>
  );
}
