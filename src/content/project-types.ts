// Shape of a long-form project write-up. The content itself is in ./projects.ts.

export type Tone = "coral" | "ink" | "leaf";

export type Section =
  | { kind: "prose"; title: string; paragraphs: string[] }
  | { kind: "features"; title: string; intro?: string; items: { title: string; text: string }[] }
  | { kind: "flow"; title: string; intro?: string; steps: { label: string; title: string; text: string; tone: Tone }[] }
  | { kind: "decisions"; title: string; intro?: string; items: { decision: string; why: string }[] }
  | { kind: "gallery"; title: string; intro?: string; images: { src: string; alt: string; caption: string; width: number; height: number; phone?: boolean }[] }
  | { kind: "shift"; title: string; intro?: string; late: string; rows: { task: string; planned: string; actual: string; tag?: string }[]; note: string }
  | { kind: "stack"; title: string; groups: { label: string; items: string[] }[] }
  | { kind: "list"; title: string; intro?: string; items: string[] };

export type ProjectDetail = {
  slug: string;
  name: string;
  kind: string;
  /** One line, shown large under the title. */
  tagline: string;
  /** Used for the page description and the opening paragraph. */
  intro: string;
  meta: { label: string; value: string }[];
  links: { label: string; href: string; primary?: boolean }[];
  cover:
    | { type: "browser"; src: string; alt: string; url: string; width: number; height: number }
    | { type: "phones"; images: { src: string; alt: string; width: number; height: number }[] };
  numbers: { value: string; label: string }[];
  sections: Section[];
};
