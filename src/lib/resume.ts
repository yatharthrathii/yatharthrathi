import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/site";

// The resume button only renders once the PDF is actually in /public, so the site never links to a 404.
export function resumeHref(): string | null {
  return existsSync(join(process.cwd(), "public", site.resume)) ? site.resume : null;
}
