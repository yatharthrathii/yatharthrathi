import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = `A project by ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Each case study gets its own preview card, so a shared link names the project and not just me.
export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const playfair = await readFile(join(process.cwd(), "src/app/fonts/playfair-800.ttf"));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0E1117", padding: "64px 72px", color: "#FFFFFF" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#7EE0B5", letterSpacing: 4, textTransform: "uppercase" }}>Case study · {project?.kind ?? "Project"}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Playfair", fontSize: 132, fontWeight: 800, lineHeight: 1, letterSpacing: -5 }}>{project?.name ?? site.name}</div>
          <div style={{ fontSize: 40, color: "rgba(255,255,255,.66)", marginTop: 26, maxWidth: 940, lineHeight: 1.25 }}>{project?.tagline ?? ""}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26 }}>
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex", color: "rgba(255,255,255,.55)" }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Playfair", data: playfair, weight: 800, style: "normal" }] },
  );
}
