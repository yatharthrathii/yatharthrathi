import { site } from "@/content/site";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Reveal } from "@/components/ui/Reveal";

export function Contact({ resumeHref }: { resumeHref: string | null }) {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" data-header="dark" className="relative overflow-hidden bg-term text-white">
      <div className="container-page relative pb-8 pt-[clamp(90px,13vw,170px)]">
        <Reveal>
          <span className="eyebrow text-mint">04 · Contact</span>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 max-w-[14ch] font-serif text-[clamp(44px,7.4vw,108px)] font-black leading-[0.95] tracking-[-0.045em]">
            Have something that needs to work?
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-6 max-w-[46ch] text-lg font-light text-white/60">
            I&apos;m open to full-stack and backend roles. Email is the fastest way to reach me.
          </p>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap items-center gap-3">
          <CopyEmail email={site.email} />
          {resumeHref && (
            <a href={resumeHref} target="_blank" rel="noopener" className="rounded-full bg-white px-6 py-3.5 text-sm font-medium text-term transition-colors hover:bg-coral hover:text-white">
              Download resume ↓
            </a>
          )}
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap gap-7 text-[15px]">
          {(
            [
              ["LinkedIn", site.links.linkedin],
              ["GitHub", site.links.github],
              ["X", site.links.x],
            ] as const
          ).map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener" className="relative text-white/80 transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100">
              {label} ↗
            </a>
          ))}
        </Reveal>

        <div className="mt-24 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-white/45">
          <p>© {year} {site.name}. Usually building late at night, with too much chai.</p>
          <p className="font-mono">Built with Next.js 16, React 19 &amp; Tailwind 4 · particles hand-written</p>
        </div>
      </div>
    </footer>
  );
}
