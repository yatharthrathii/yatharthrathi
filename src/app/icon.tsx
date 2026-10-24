import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Same mark as the header logo: a serif "y" with the coral full stop.
export default async function Icon() {
  const playfair = await readFile(join(process.cwd(), "src/app/fonts/playfair-800.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, background: "#111318", fontFamily: "Playfair", fontSize: 50, fontWeight: 800, color: "#ffffff" }}>
        <span style={{ marginLeft: -6, marginTop: -8 }}>y</span>
        <span style={{ position: "absolute", right: 12, bottom: 13, width: 11, height: 11, borderRadius: 6, background: "#FF5A3C" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Playfair", data: playfair, weight: 800, style: "normal" }] },
  );
}
