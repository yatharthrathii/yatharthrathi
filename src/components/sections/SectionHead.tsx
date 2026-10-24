import { Reveal } from "@/components/ui/Reveal";

type Props = { index: string; label: string; title: string; intro?: string; dark?: boolean };

export function SectionHead({ index, label, title, intro, dark }: Props) {
  return (
    <Reveal className="mb-14 grid gap-5 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <span className={`eyebrow mb-5 ${dark ? "text-mint" : "text-coral"}`}>
          {index} · {label}
        </span>
        <h2 className="font-serif text-[clamp(36px,4.6vw,64px)] font-black leading-[1] tracking-[-0.035em]">{title}</h2>
      </div>
      {intro && <p className={`md:col-span-4 md:col-start-9 ${dark ? "text-white/60" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}
