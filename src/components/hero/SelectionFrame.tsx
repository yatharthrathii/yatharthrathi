"use client";

import { useEffect, useRef, type ReactNode } from "react";

const HANDLE = "absolute size-[7px] border border-coral bg-white";

// Draws a design-tool selection around its children, with the element's real size underneath.
export function SelectionFrame({ children, name }: { children: ReactNode; name: string }) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const dimRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const dim = dimRef.current;
    if (!box || !dim) return;
    const ro = new ResizeObserver(() => {
      dim.textContent = `${Math.round(box.offsetWidth)} × ${Math.round(box.offsetHeight)}`;
      dim.style.opacity = "1";
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <span className="relative inline-block">
      {children}
      <span ref={boxRef} aria-hidden className="frame pointer-events-none absolute -inset-x-[0.09em] -bottom-[0.1em] top-[0.02em] border border-coral">
        <span className={`${HANDLE} -left-1 -top-1`} />
        <span className={`${HANDLE} -right-1 -top-1`} />
        <span className={`${HANDLE} -bottom-1 -left-1`} />
        <span className={`${HANDLE} -bottom-1 -right-1`} />
        <span
          ref={dimRef}
          className="absolute left-1/2 top-[calc(100%+7px)] -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-coral px-1.5 py-[3px] font-mono text-[9px] font-medium leading-none tracking-normal text-white opacity-0 transition-opacity"
        />
        <span className="absolute right-[6%] top-[calc(100%-2px)] flex items-start">
          <svg width="13" height="15" viewBox="0 0 13 15" className="shrink-0">
            <path d="M1 1l3.6 12 2.2-4.9L12 6.6z" fill="#111318" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <span className="ml-0.5 mt-3 whitespace-nowrap rounded-[3px] bg-ink px-1.5 py-[3px] font-mono text-[9px] font-medium leading-none tracking-normal text-white">{name}</span>
        </span>
      </span>
    </span>
  );
}
