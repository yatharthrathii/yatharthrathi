import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/site";

// The live site only shows the resume button once the PDF is actually in /public, so it never links to a 404.
// In development the button always shows, so the layout can be judged before the PDF exists.
export function resumeHref(): string | null {
  if (process.env.NODE_ENV === "development") return site.resume;
  return existsSync(join(process.cwd(), "public", site.resume)) ? site.resume : null;
}
