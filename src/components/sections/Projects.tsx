import Image from "next/image";
import Link from "next/link";
import { featuredProjects, site, type Project } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";

const EXTERNAL = "relative z-10 underline decoration-line underline-offset-4 transition-colors hover:text-coral hover:decoration-coral";

function ExternalLinks({ p }: { p: Project }) {
  return (
    <div className="flex gap-4 text-sm">
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener" className={EXTERNAL}>
          Live ↗
        </a>
      )}
      {p.code && (
        <a href={p.code} target="_blank" rel="noopener" className={EXTERNAL}>
          Code ↗
        </a>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="container-page py-[clamp(80px,11vw,140px)]">
      <SectionHead
        index="02"
        label="Projects"
        title="Built for myself, at night"
        intro="Both of these started as a problem I had. Neither needed a client to be worth finishing. Open one for the full story."
      />

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        {featuredProjects.map((p) => (
          <Reveal
            key={p.slug}
            as="article"
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[box-shadow,border-color] duration-300 hover:border-ink/25 hover:shadow-[0_30px_70px_-40px_rgba(17,19,24,.45)]"
          >
            <div className={`flex h-[300px] items-end justify-center overflow-hidden border-b border-line px-7 pt-7 ${p.frame === "browser" ? "bg-[#ECE3DD]" : "bg-[#E4E3E3]"}`}>
              {p.frame === "browser" ? (
                <div className="w-full max-w-[600px] translate-y-2 overflow-hidden rounded-t-lg border border-b-0 border-line bg-card shadow-[0_-10px_40px_-20px_rgba(17,19,24,.35)] transition-transform duration-500 group-hover:translate-y-0">
                  <div className="flex h-7 items-center justify-center border-b border-line font-mono text-[10px] text-faint">{p.live?.replace("https://", "")}</div>
                  <div className="relative h-[250px]">
                    <Image src={p.image} alt={`${p.name} home page`} fill sizes="(min-width: 1024px) 600px, 90vw" className="object-cover object-top" />
                  </div>
                </div>
              ) : (
                <div className="w-[220px] translate-y-2 overflow-hidden rounded-t-[26px] border-[5px] border-b-0 border-ink shadow-[0_-10px_40px_-20px_rgba(17,19,24,.45)] transition-transform duration-500 group-hover:translate-y-0">
                  <div className="relative h-[270px]">
                    <Image src={p.image} alt={`${p.name} today screen`} fill sizes="220px" className="object-cover object-top" />
                  </div>
                </div>
              )}
            </div>

            <div className="grid flex-1 content-start gap-2.5 p-7">
              <h3 className="flex items-baseline justify-between gap-3 text-2xl font-medium tracking-[-0.02em]">
                {/* The heading link is stretched over the whole card. */}
                <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0">
                  {p.name}
                </Link>
                <span className="font-mono text-[11px] font-normal text-faint">{p.kind}</span>
              </h3>
              <p className="text-[15px]">
                <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-coral">Why</span>
                {p.why}
              </p>
              <p className="text-sm text-muted">{p.what}</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line px-7 py-4">
              <span className="flex items-center gap-2 text-sm font-medium">
                Read the case study
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
              <ExternalLinks p={p} />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 text-right">
        <a href={site.links.github} target="_blank" rel="noopener" className="text-sm underline decoration-line underline-offset-4 hover:text-coral">
          Everything else is on GitHub ↗
        </a>
      </Reveal>
    </section>
  );
}
