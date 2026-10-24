import Image from "next/image";
import type { Section, Tone } from "@/content/project-types";
import { Reveal } from "@/components/ui/Reveal";

const DOT: Record<Tone, string> = { coral: "bg-coral", ink: "bg-ink", leaf: "bg-leaf" };
const TEXT: Record<Tone, string> = { coral: "text-coral", ink: "text-ink", leaf: "text-leaf" };

function Intro({ text }: { text?: string }) {
  return text ? <p className="mb-8 max-w-[64ch] text-[17px] leading-relaxed text-muted">{text}</p> : null;
}

function Body({ section }: { section: Section }) {
  switch (section.kind) {
    case "prose":
      return (
        <div className="grid max-w-[64ch] gap-5 text-[17px] leading-relaxed text-muted">
          {section.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : ""}>
              {p}
            </p>
          ))}
        </div>
      );

    case "features":
      return (
        <>
          <Intro text={section.intro} />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {section.items.map((it, i) => (
              <li key={it.title} className="bg-card p-6 md:p-7">
                <span className="font-mono text-[11px] text-coral">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-medium leading-snug tracking-[-0.01em]">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
        </>
      );

    case "flow":
      return (
        <>
          <Intro text={section.intro} />
          <ol className="relative grid gap-3 before:absolute before:bottom-6 before:left-[15px] before:top-6 before:w-px before:bg-ink/15">
            {section.steps.map((st) => (
              <li key={st.title} className="relative grid grid-cols-[31px_1fr] items-start gap-4">
                <span className="relative z-10 mt-5 grid size-[31px] place-items-center rounded-full border border-line bg-paper">
                  <span className={`size-2.5 rounded-full ${DOT[st.tone]}`} />
                </span>
                <div className="rounded-xl border border-line bg-card p-5">
                  <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${TEXT[st.tone]}`}>{st.label}</span>
                  <h3 className="mt-1.5 text-[17px] font-medium tracking-[-0.01em]">{st.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      );

    case "decisions":
      return (
        <>
          <Intro text={section.intro} />
          <dl className="border-t border-ink/15">
            {section.items.map((it) => (
              <div key={it.decision} className="grid gap-x-10 gap-y-2 border-b border-ink/15 py-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                <dt className="font-serif text-[clamp(21px,2vw,26px)] font-extrabold leading-[1.15] tracking-[-0.02em]">{it.decision}</dt>
                <dd className="text-[15px] leading-relaxed text-muted">{it.why}</dd>
              </div>
            ))}
          </dl>
        </>
      );

    case "gallery":
      return (
        <>
          <Intro text={section.intro} />
          <div className="grid gap-6 md:grid-cols-2">
            {section.images.map((im) => (
              <figure key={im.src} className={im.phone && section.images.filter((x) => x.phone).length % 2 === 0 ? "" : "md:col-span-2"}>
                {im.phone ? (
                  <div className="grid place-items-center rounded-2xl border border-line bg-card px-6 pt-10">
                    <div className="w-[min(100%,280px)] overflow-hidden rounded-t-[28px] border-[6px] border-b-0 border-ink shadow-[0_-10px_50px_-20px_rgba(17,19,24,.45)]">
                      <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes="280px" className="block h-[480px] w-full object-cover object-top" />
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-line bg-card shadow-[0_30px_70px_-45px_rgba(17,19,24,.5)]">
                    <div className="flex h-8 items-center gap-1.5 border-b border-line px-3">
                      <span className="size-2 rounded-full bg-ink/15" />
                      <span className="size-2 rounded-full bg-ink/15" />
                      <span className="size-2 rounded-full bg-ink/15" />
                    </div>
                    <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes="(min-width: 1024px) 900px, 92vw" className="block h-auto w-full" />
                  </div>
                )}
                <figcaption className="mt-3 text-sm text-muted">{im.caption}</figcaption>
              </figure>
            ))}
          </div>
        </>
      );

    case "shift":
      return (
        <>
          <Intro text={section.intro} />
          <div className="overflow-hidden rounded-2xl bg-term p-5 font-mono text-[13px] text-white md:p-8">
            <div className="mb-5 flex items-center justify-between text-[11px] text-white/50">
              <span>Today</span>
              <span className="rounded-full bg-[#FFB86B]/15 px-2.5 py-1 text-[#FFB86B]">{section.late}</span>
            </div>
            <ul className="grid gap-2">
              {section.rows.map((r) => (
                <li key={r.task} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border border-white/10 bg-white/[.04] px-4 py-3">
                  <span className="truncate">
                    {r.task}
                    {r.tag && <span className="ml-2 rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-white/55">{r.tag}</span>}
                  </span>
                  <s className={`text-white/35 ${r.planned === r.actual ? "invisible" : ""}`}>{r.planned}</s>
                  <b className={`font-medium ${r.planned === r.actual ? "text-white/80" : "text-[#FFB86B]"}`}>{r.actual}</b>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-sans text-sm text-white/55">{section.note}</p>
          </div>
        </>
      );

    case "stack":
      return (
        <dl className="border-t border-ink/15">
          {section.groups.map((g) => (
            <div key={g.label} className="grid gap-3 border-b border-ink/15 py-5 md:grid-cols-[180px_1fr] md:items-baseline">
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{g.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <li key={it} className="chip bg-card text-[12px] text-ink">
                      {it}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      );

    case "list":
      return (
        <>
          <Intro text={section.intro} />
          <ul className="grid max-w-[68ch] gap-3.5">
            {section.items.map((it) => (
              <li key={it} className="relative pl-6 text-[16px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-3 before:bg-ink/40">
                {it}
              </li>
            ))}
          </ul>
        </>
      );
  }
}

export function ProjectSections({ sections }: { sections: Section[] }) {
  return (
    <div className="container-page">
      {sections.map((section, i) => (
        <section key={section.title} className="grid gap-x-12 gap-y-8 border-t border-line py-[clamp(56px,7vw,96px)] lg:grid-cols-[240px_minmax(0,1fr)]">
          <Reveal className="self-start lg:sticky lg:top-24">
            <span className="font-mono text-xs text-coral">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-3 font-serif text-[clamp(28px,2.8vw,36px)] font-black leading-[1.05] tracking-[-0.03em]">{section.title}</h2>
          </Reveal>
          <Reveal>
            <Body section={section} />
          </Reveal>
        </section>
      ))}
    </div>
  );
}
