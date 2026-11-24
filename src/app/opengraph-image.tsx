import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · Full-Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [photo, playfair] = await Promise.all([
    readFile(join(process.cwd(), "public/images/yatharth-og.png")),
    readFile(join(process.cwd(), "src/app/fonts/playfair-800.ttf")),
  ]);
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F1F2F4", padding: "64px 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#C8361B", letterSpacing: 4, textTransform: "uppercase" }}>Frontend · Backend</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Playfair", fontSize: 96, fontWeight: 800, color: "#111318", lineHeight: 1, letterSpacing: -3 }}>{site.name}</div>
            <div style={{ fontSize: 38, color: "#5F6570", marginTop: 22 }}>Full-stack engineer · TypeScript, NestJS, Next.js</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#111318" }}>{site.url.replace("https://", "")}</div>
        </div>
        <div style={{ display: "flex", width: 400, height: 500, borderRadius: 24, overflow: "hidden", background: "linear-gradient(90deg, #F7F7FA 50%, #0E1117 50%)", alignItems: "flex-end", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={400} height={500} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Playfair", data: playfair, weight: 800, style: "normal" }] },
  );
}
