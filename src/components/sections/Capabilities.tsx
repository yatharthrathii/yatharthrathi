import { principles, stack } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";

const TONE = { coral: "text-coral", leaf: "text-leaf", ink: "text-ink" } as const;
const DOT = { coral: "bg-coral", leaf: "bg-leaf", ink: "bg-ink/25" } as const;

export function Capabilities() {
  return (
    <section id="skills" className="border-t border-line">
      <div className="container-page py-[clamp(80px,11vw,140px)]">
        <SectionHead
          index="03"
          label="Skills"
          title="What I work with"
          intro="Laid out the way a request travels: from the screen, through the API, down to the data. Daily tools first."
        />

        <ol className="border-t border-ink/15">
          {stack.map((row, i) => (
            <Reveal
              key={row.layer}
              as="li"
              className="group grid items-baseline gap-x-8 gap-y-3 border-b border-ink/15 py-6 transition-colors hover:bg-card md:grid-cols-[64px_minmax(0,260px)_1fr_auto] md:px-4"
            >
              <span className="hidden font-mono text-xs text-faint md:block">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`flex items-center gap-3 font-serif text-[clamp(26px,3vw,40px)] font-black leading-none tracking-[-0.03em] ${TONE[row.tone]}`}>
                <span aria-hidden className={`size-2 shrink-0 rounded-full ${DOT[row.tone]}`} />
                {row.layer}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {row.items.map((it) => (
                  <li key={it} className="chip bg-card text-[12px] text-ink group-hover:bg-paper">
                    {it}
                  </li>
                ))}
              </ul>
              <span className="font-mono text-[11px] text-faint">{row.note}</span>
            </Reveal>
          ))}
        </ol>

        <div className="mt-24 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} className="flex flex-col rounded-2xl border border-line bg-card p-7">
              <span className="font-mono text-xs text-coral">Belief {String(i + 1).padStart(2, "0")}</span>
              <p className="mt-10 font-serif text-[clamp(24px,2.4vw,30px)] font-extrabold leading-[1.1] tracking-[-0.02em]">{p.title}</p>
              <p className="mt-3 text-sm text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
