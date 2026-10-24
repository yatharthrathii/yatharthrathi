import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { education, site } from "@/content/site";
import { resumeHref } from "@/lib/resume";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Full-Stack Engineer",
  worksFor: { "@type": "Organization", name: "Codevibe Technology" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education[0].school },
  knowsAbout: ["TypeScript", "NestJS", "Next.js", "React", "PostgreSQL", "React Native"],
  sameAs: [site.links.github, site.links.linkedin, site.links.x],
};

export default function Home() {
  const resume = resumeHref();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Header resumeHref={resume} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Capabilities />
      </main>
      <Contact resumeHref={resume} />
    </>
  );
}
