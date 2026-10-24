"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3.5 font-mono text-[clamp(13px,1.6vw,16px)] text-white transition-colors hover:border-mint"
    >
      <span className="select-all break-all">{email}</span>
      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-mint transition-colors group-hover:bg-mint group-hover:text-term" aria-live="polite">
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
