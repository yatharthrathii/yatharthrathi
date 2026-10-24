import { preload } from "react-dom";
import { hero, site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ParticlePortrait } from "./ParticlePortrait";
import { RequestCard } from "./RequestCard";
import { SelectionFrame } from "./SelectionFrame";
import { Terminal } from "./Terminal";

function Side({ side }: { side: "frontend" | "backend" }) {
  const s = hero[side];
  const isFront = side === "frontend";
  return (
    <div className={`grid w-full max-w-[380px] grid-cols-[minmax(0,1fr)] gap-[18px] justify-self-center text-center lg:text-left xl:pt-[max(0px,calc(6vw-28px))] ${isFront ? "lg:justify-self-end" : "lg:justify-self-start"}`}>
      <Reveal intro delay={isFront ? 0.1 : 0.22}>
        <span className={`eyebrow justify-center lg:justify-start ${isFront ? "text-coral" : "text-leaf"}`}>{s.label}</span>
      </Reveal>
      <Reveal intro delay={isFront ? 0.18 : 0.3}>
        <h2 className={`font-serif text-[clamp(44px,4.9vw,84px)] font-black leading-[0.92] tracking-[-0.035em] ${isFront ? "mb-4" : ""}`}>
          {isFront ? (
            <SelectionFrame name="yatharth">{s.title}</SelectionFrame>
          ) : (
            <>
              <span className="align-[0.08em] font-mono text-[0.72em] font-normal tracking-[-0.06em] text-leaf">{"{"}</span>
              {s.title}
              <span className="align-[0.08em] font-mono text-[0.72em] font-normal tracking-[-0.06em] text-leaf">{"}"}</span>
              <span aria-hidden className="caret ml-[0.08em] inline-block h-[0.7em] w-[0.09em] bg-leaf" />
            </>
          )}
        </h2>
      </Reveal>
      <Reveal intro delay={isFront ? 0.26 : 0.38}>
        <p className="mx-auto max-w-[30ch] font-light text-muted lg:mx-0">{s.body}</p>
      </Reveal>
      <Reveal intro delay={isFront ? 0.34 : 0.46}>{isFront ? <RequestCard /> : <Terminal />}</Reveal>
      <Reveal intro delay={isFront ? 0.42 : 0.54}>
        <ul className="flex flex-wrap justify-center gap-1.5 lg:justify-start">
          {s.stack.map((t) => (
            <li key={t} className={`chip transition-colors ${isFront ? "hover:border-coral hover:text-coral" : "hover:border-leaf hover:text-leaf"}`}>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function Hero() {
  // The portrait is fetched by script after hydration; asking for it up front saves about a second on slow networks.
  preload("/images/yatharth.webp", { as: "image" });
  return (
    <>
      <section id="top" className="mx-auto grid max-w-[1560px] items-center gap-9 px-[clamp(20px,4.5vw,64px)] pb-14 pt-[84px] lg:grid-cols-2 lg:gap-x-[clamp(40px,6vw,96px)] xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-start xl:gap-[clamp(24px,4vw,64px)]">
        <Side side="frontend" />
        <div className="order-first flex flex-col items-center lg:col-span-2 xl:order-none xl:col-span-1">
          <ParticlePortrait
            src="/images/yatharth.webp"
            alt="Portrait of Yatharth Rathi, made of colour tiles on the left and code characters on the right. Push the tiles across the middle line and they turn into code."
          />
          <p className="mt-3 text-center font-mono text-xs text-muted">
            push pixels across the line · they turn into code ·{" "}
            <kbd className="rounded border border-b-2 border-line px-1.5 font-mono">click</kbd> to rebuild
          </p>
          <Reveal intro delay={0.3} className="mt-4 grid gap-1 text-center">
            <h1 className="font-serif text-[clamp(30px,2.6vw,40px)] font-black leading-none tracking-[-0.03em]">{site.name}</h1>
            <p className="text-sm text-muted">
              {site.role} · {site.location}
            </p>
          </Reveal>
          <Reveal intro delay={0.4} className="mt-5 flex items-center gap-2.5">
            <a href="#projects" className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-colors hover:bg-coral">
              See my projects
              <span aria-hidden className="text-base leading-none">↓</span>
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex h-10 items-center rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-ink">
              Get in touch
            </a>
          </Reveal>
        </div>
        <Side side="backend" />
      </section>

      <div className="border-y border-line">
        <ul className="mx-auto flex max-w-[1560px] flex-wrap justify-between gap-x-6 gap-y-2 px-[clamp(20px,4.5vw,64px)] py-5 text-sm text-muted">
          {hero.facts.map((f, i) => (
            <li key={f} className="flex items-center gap-2.5">
              {i === 0 && <span className="size-[7px] rounded-full bg-[#22A06B] shadow-[0_0_0_4px_rgba(34,160,107,.15)]" />}
              {f}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
