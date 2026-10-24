"use client";

import { useEffect, useRef, useState } from "react";
import { emit, subscribe, type Method } from "./bus";

type Tone = "dim" | "in" | "step" | "ok";
type Line = { id: number; tone: Tone; text: string };

const BOOT: Line[] = [
  { id: -4, tone: "dim", text: "$ npm run start:prod" },
  { id: -3, tone: "dim", text: "postgres connected · redis connected" },
  { id: -2, tone: "dim", text: "queue worker ready · 3 jobs scheduled" },
  { id: -1, tone: "ok", text: "api listening on :4000" },
];
const TONE: Record<Tone, string> = {
  dim: "text-white/35",
  in: "text-white",
  step: "text-term-ink/80",
  ok: "text-mint",
};
const KEEP = 6;
const STEP_MS = 170;

const rand = (a: number, b: number) => Math.round(a + Math.random() * (b - a));

// What the "server" does with a request. The first GET misses the cache, later ones hit it.
function plan(method: Method, cached: boolean) {
  if (method === "POST") {
    const q = rand(7, 14);
    return {
      steps: ["→ POST /api/messages", "  zod    body valid", `  pg     insert messages · ${q} ms`, `  queue  email.notify #${rand(4100, 4999)}`],
      label: "201 Created",
      ms: q + rand(24, 40),
    };
  }
  if (cached) {
    return { steps: ["→ GET /api/projects", "  redis  hit projects:list"], label: "200 OK", ms: rand(6, 12) };
  }
  const q = rand(9, 16);
  return {
    steps: ["→ GET /api/projects", "  redis  miss projects:list", `  pg     select projects · ${q} ms`, "  redis  set projects:list ttl 60s"],
    label: "200 OK",
    ms: q + rand(12, 20),
  };
}

// The backend half of the demo: a log that handles whatever the request card sends.
export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const nextId = useRef(0);

  useEffect(() => {
    const timers = new Set<number>();
    let busy = false;
    let cached = false;

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };
    const push = (tone: Tone, text: string) => {
      const id = nextId.current++;
      setLines((ls) => [...ls, { id, tone, text }].slice(-KEEP));
    };

    const off = subscribe((e) => {
      if (e.type !== "request" || busy) return;
      busy = true;
      const p = plan(e.method, cached);
      if (e.method === "GET" && !cached) {
        cached = true;
        later(() => {
          cached = false;
        }, 60_000);
      }
      p.steps.forEach((text, i) => later(() => push(i === 0 ? "in" : "step", text), i * STEP_MS));
      later(() => {
        push("ok", `← ${p.label} · ${p.ms} ms`);
        busy = false;
        emit({ type: "response", method: e.method, label: p.label, ms: p.ms });
      }, p.steps.length * STEP_MS + 140);
    });

    const beat = window.setInterval(() => {
      if (busy || document.hidden) return;
      const id = nextId.current++;
      setLines((ls) => (ls.at(-1)?.text.startsWith("GET /health") ? ls : [...ls, { id, tone: "dim" as const, text: "GET /health 200 · 2 ms" }].slice(-KEEP)));
    }, 9000);

    return () => {
      off();
      timers.forEach((id) => clearTimeout(id));
      clearInterval(beat);
    };
  }, []);

  return (
    <div aria-hidden className="overflow-hidden rounded-xl bg-term text-left font-mono text-[11px] leading-[1.7] shadow-[0_18px_40px_-24px_rgba(14,17,23,.7)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2 text-[10px] leading-none text-white/45">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-1.5">api · logs</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-mint" />
          listening
        </span>
      </div>
      <div className="flex h-[152px] flex-col justify-end overflow-hidden px-3 py-2.5">
        {lines.map((l) => (
          <div key={l.id} className={`log-line truncate whitespace-pre ${TONE[l.tone]}`}>
            {l.text}
          </div>
        ))}
        <div className="text-white/70">
          <span className="text-mint">$</span> <span className="caret inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-mint/80" />
        </div>
      </div>
    </div>
  );
}
