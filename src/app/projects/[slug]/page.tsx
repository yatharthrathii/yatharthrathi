import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ProjectSections } from "@/components/projects/ProjectSections";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { resumeHref } from "@/lib/resume";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name}: ${project.tagline}`,
    description: project.intro,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", url: `${site.url}/projects/${project.slug}`, title: `${project.name} · ${site.name}`, description: project.intro },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const resume = resumeHref();
  const next = projects[(projects.indexOf(project) + 1) % projects.length]!;

  return (
    <>
      <Header resumeHref={resume} />
      <main>
        <section className="container-page pb-[clamp(40px,5vw,72px)] pt-[clamp(112px,12vw,160px)]">
          <Reveal intro delay={0.05}>
            <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-coral">
              <span aria-hidden>←</span> All projects
            </Link>
          </Reveal>

          <Reveal intro delay={0.12} className="mt-10">
            <span className="eyebrow text-coral">Case study · {project.kind}</span>
            <h1 className="mt-6 font-serif text-[clamp(48px,9.5vw,136px)] font-black leading-[0.9] tracking-[-0.045em]">{project.name}</h1>
          </Reveal>

          <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
            <Reveal intro delay={0.2}>
              <p className="max-w-[22ch] font-serif text-[clamp(26px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.02em]">{project.tagline}</p>
            </Reveal>
            <Reveal intro delay={0.28}>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted">{project.intro}</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${
                      l.primary ? "bg-ink text-white hover:bg-coral" : "border border-line hover:border-ink"
                    }`}
                  >
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal intro delay={0.36}>
            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 lg:grid-cols-4">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">{m.label}</dt>
                  <dd className="mt-1.5 text-[15px]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <Reveal intro delay={0.44} className="container-page">
          {project.cover.type === "browser" ? (
            <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_40px_90px_-50px_rgba(17,19,24,.55)]">
              <div className="flex h-9 items-center gap-1.5 border-b border-line px-4">
                <span className="size-2.5 rounded-full bg-ink/15" />
                <span className="size-2.5 rounded-full bg-ink/15" />
                <span className="size-2.5 rounded-full bg-ink/15" />
                <span className="mx-auto font-mono text-[11px] text-faint">{project.cover.url}</span>
              </div>
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                priority
                sizes="(min-width: 1280px) 1112px, 92vw"
                className="block h-auto w-full"
              />
            </div>
          ) : (
            <div className="flex items-end justify-center gap-[clamp(16px,4vw,56px)] overflow-hidden rounded-2xl border border-line bg-[#E4E3E3] px-6 pt-[clamp(32px,6vw,72px)]">
              {project.cover.images.map((im, i) => (
                <div
                  key={im.src}
                  className={`w-[min(44%,300px)] overflow-hidden rounded-t-[clamp(18px,3vw,34px)] border-[clamp(4px,0.6vw,7px)] border-b-0 border-ink shadow-[0_-20px_60px_-30px_rgba(17,19,24,.5)] ${i === 1 ? "translate-y-[8%]" : ""}`}
                >
                  <Image src={im.src} alt={im.alt} width={im.width} height={im.height} priority sizes="(min-width: 768px) 300px, 44vw" className="block h-auto w-full" />
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <section data-header="dark" className="mt-[clamp(56px,7vw,96px)] bg-term text-white">
          <dl className="container-page grid gap-x-8 gap-y-10 py-[clamp(48px,6vw,80px)] sm:grid-cols-2 lg:grid-cols-4">
            {project.numbers.map((n) => (
              <Reveal key={n.label}>
                <dt className="font-serif text-[clamp(40px,4.4vw,60px)] font-black leading-none tracking-[-0.03em] text-mint">{n.value}</dt>
                <dd className="mt-3 max-w-[28ch] text-sm leading-relaxed text-white/60">{n.label}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <ProjectSections sections={project.sections} />

        <section className="container-page pb-[clamp(72px,9vw,120px)]">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-wrap items-end justify-between gap-6 rounded-2xl border border-line bg-card p-[clamp(24px,4vw,48px)] transition-[border-color,box-shadow] duration-300 hover:border-ink/25 hover:shadow-[0_30px_70px_-40px_rgba(17,19,24,.45)]"
          >
            <span>
              <span className="font-mono text-xs text-coral">Next project</span>
              <span className="mt-3 block font-serif text-[clamp(36px,5.5vw,72px)] font-black leading-none tracking-[-0.04em]">{next.name}</span>
              <span className="mt-3 block max-w-[44ch] text-muted">{next.tagline}</span>
            </span>
            <span aria-hidden className="grid size-14 place-items-center rounded-full bg-ink text-xl text-white transition-[background-color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-coral">
              →
            </span>
          </Link>
        </section>
      </main>
      <Contact resumeHref={resume} />
    </>
  );
}
