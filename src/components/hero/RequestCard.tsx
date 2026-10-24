"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { emit, subscribe, type Method } from "./bus";

type State = { kind: "idle" } | { kind: "pending" } | { kind: "done"; label: string; ms: number };

const METHODS: Method[] = ["GET", "POST"];
const ENDPOINT: Record<Method, string> = { GET: "/api/projects", POST: "/api/messages" };

// The frontend half of the demo: a real component. Sending a request pushes pixels
// across the portrait's API line, and the terminal on the other side handles it.
export function RequestCard() {
  const [method, setMethod] = useState<Method>("GET");
  const [state, setState] = useState<State>({ kind: "idle" });
  const pending = useRef(false);
  const touched = useRef(false);

  const send = useCallback((m: Method) => {
    if (pending.current) return;
    pending.current = true;
    setState({ kind: "pending" });
    emit({ type: "request", method: m });
  }, []);

  useEffect(() => {
    let reset = 0;
    let guard = 0;
    const off = subscribe((e) => {
      if (e.type === "request") {
        clearTimeout(reset);
        // If nothing answers, the button should not spin forever.
        guard = window.setTimeout(() => {
          pending.current = false;
          setState({ kind: "idle" });
        }, 4000);
        return;
      }
      clearTimeout(guard);
      pending.current = false;
      setState({ kind: "done", label: e.label, ms: e.ms });
      reset = window.setTimeout(() => setState({ kind: "idle" }), 2800);
    });

    // Run it once on its own so the link between the two sides is obvious.
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const demo = reduce
      ? 0
      : window.setTimeout(() => {
          if (!touched.current) send("GET");
        }, 3800);

    return () => {
      off();
      clearTimeout(reset);
      clearTimeout(guard);
      clearTimeout(demo);
    };
  }, [send]);

  return (
    <div className="rounded-xl border border-line bg-card p-3 text-left shadow-[0_18px_40px_-28px_rgba(17,19,24,.45)]">
      <div className="flex items-center justify-between font-mono text-[10px] leading-none text-faint">
        <span>live component</span>
        <span className="text-coral">{"<Request />"}</span>
      </div>

      <div className="mt-2.5 flex items-center gap-2.5">
        <div role="radiogroup" aria-label="HTTP method" className="flex shrink-0 rounded-lg bg-paper p-0.5 font-mono text-[11px] leading-none">
          {METHODS.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={method === m}
              onClick={() => {
                touched.current = true;
                setMethod(m);
              }}
              className={`rounded-md px-2.5 py-1.5 transition-colors ${method === m ? "bg-card text-ink shadow-[0_1px_2px_rgba(17,19,24,.15)]" : "text-muted hover:text-ink"}`}
            >
              {m}
            </button>
          ))}
        </div>
        <code className="truncate font-mono text-[11px] text-muted">{ENDPOINT[method]}</code>
      </div>

      <button
        type="button"
        onClick={() => {
          touched.current = true;
          send(method);
        }}
        aria-disabled={state.kind === "pending"}
        className={`mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-medium text-white transition-colors duration-300 ${
          state.kind === "done" ? "bg-leaf" : state.kind === "pending" ? "bg-ink/80" : "bg-ink hover:bg-coral"
        }`}
      >
        <span aria-live="polite" className="flex items-center gap-2">
          {state.kind === "idle" && (
            <>
              Send request <span aria-hidden>→</span>
            </>
          )}
          {state.kind === "pending" && (
            <>
              <span aria-hidden className="size-3 animate-spin rounded-full border-[1.5px] border-white/35 border-t-white" />
              Sending
            </>
          )}
          {state.kind === "done" && (
            <span className="font-mono text-xs">
              ✓ {state.label} · {state.ms} ms
            </span>
          )}
        </span>
      </button>

      <p className="mt-2 font-mono text-[10px] leading-none text-faint">crosses the api line · lands in the terminal</p>
    </div>
  );
}
