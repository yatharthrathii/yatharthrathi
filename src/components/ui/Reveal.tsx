import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  /** Plays once on page load after `delay` seconds instead of on scroll (used in the hero). */
  intro?: boolean;
  delay?: number;
};

// Pure CSS: scroll-driven animations where supported, and content is always visible without them.
export function Reveal({ children, className = "", as: Tag = "div", intro = false, delay = 0 }: Props) {
  return (
    <Tag className={`${intro ? "intro" : "reveal"} ${className}`} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
