import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const playfair = await readFile(join(process.cwd(), "src/app/fonts/playfair-800.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111318", fontFamily: "Playfair", fontSize: 138, fontWeight: 800, color: "#ffffff" }}>
        <span style={{ marginLeft: -16, marginTop: -22 }}>y</span>
        <span style={{ position: "absolute", right: 34, bottom: 38, width: 30, height: 30, borderRadius: 15, background: "#FF5A3C" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Playfair", data: playfair, weight: 800, style: "normal" }] },
  );
}
