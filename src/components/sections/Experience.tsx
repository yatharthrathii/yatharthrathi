import { education, employers } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Span } from "@/components/ui/Span";
import { SectionHead } from "./SectionHead";

export function Experience() {
  return (
    <section id="experience" data-header="dark" className="bg-term text-white">
      <div className="container-page py-[clamp(80px,11vw,140px)]">
        <SectionHead
          dark
          index="01"
          label="Experience"
          title="Where I've worked"
          intro="About a year in production, including three months leading a team of four."
        />

        <ol className="border-t border-white/10">
          {employers.map((e) => {
            const first = e.roles.at(-1)!;
            const latest = e.roles[0]!;
            return (
              <Reveal key={e.org} as="li" className="grid gap-x-10 gap-y-8 border-b border-white/10 py-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
                {/* The employer stays in view while its roles scroll past. */}
                <div className="self-start md:sticky md:top-24">
                  <h3 className="text-[clamp(22px,2.2vw,28px)] font-medium leading-tight tracking-[-0.02em]">{e.org}</h3>
                  <p className="mt-1.5 text-white/55">
                    {e.kind && <>{e.kind} · </>}
                    <Span start={first.start} end={latest.end} />
                  </p>
                  <p className="mt-0.5 text-sm text-white/40">{e.location}</p>
                </div>

                <ol className={e.roles.length > 1 ? "relative before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-white/15" : ""}>
                  {e.roles.map((r, i) => (
                    <li key={r.title} className={`relative ${e.roles.length > 1 ? "pl-8" : ""} ${i > 0 ? "mt-9" : ""}`}>
                      {e.roles.length > 1 && (
                        <span
                          aria-hidden
                          className={`absolute left-0 top-[9px] size-[11px] rounded-full ring-4 ring-term ${i === 0 ? "bg-coral" : "bg-white/35"}`}
                        />
                      )}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h4 className="text-xl font-medium leading-tight tracking-[-0.015em]">{r.title}</h4>
                        {r.badge && <span className="rounded-full bg-coral px-2.5 py-1.5 font-mono text-[11px] leading-none">{r.badge}</span>}
                      </div>
                      <Span start={r.start} end={r.end} className="mt-1 block font-mono text-[13px] text-white/50" />

                      <div className="mt-4 grid gap-5">
                        {r.groups.map((grp, gi) => (
                          <div key={gi}>
                            {grp.heading && <h5 className="mb-2.5 font-mono text-xs text-mint">{grp.heading}</h5>}
                            <ul className="grid gap-2.5">
                              {grp.points.map((pt) => (
                                <li key={pt} className="relative pl-5 text-[15px] text-white/65 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-white/40">
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {r.stack && <p className="font-mono text-xs leading-6 text-white/40">{r.stack}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            );
          })}
        </ol>

        <div id="education" className="mt-20 scroll-mt-24">
          <Reveal>
            <h3 className="eyebrow text-mint">Education</h3>
          </Reveal>
          <ul className="mt-6 border-t border-white/10">
            {education.map((e) => (
              <Reveal key={e.degree} as="li" className="grid gap-2 border-b border-white/10 py-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-10">
                <div>
                  <p className="text-[clamp(20px,2vw,24px)] font-medium leading-tight tracking-[-0.02em]">{e.school}</p>
                  <p className="mt-1 font-mono text-[13px] text-white/50">{e.when}</p>
                </div>
                <p className="text-white/65 md:pt-1">{e.degree}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
