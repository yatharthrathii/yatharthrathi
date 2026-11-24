// Prints resume/resume.html to the PDF the site links to, using a Chrome or Edge that is already installed.
//
//   npm run resume                        the public PDF, with no phone number
//   npm run resume -- "+91 98765 43210"   also a private copy with the phone number, for job applications
//
// The private copy goes to resume/private/, which git ignores, so the number never reaches the repository.
// Set CHROME_PATH if the browser lives somewhere else.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = pathToFileURL(join(root, "resume", "resume.html")).href;
// Must match `site.resume` in src/content/site.ts.
const FILE = "Yatharth-Rathi-Resume.pdf";

const browser = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));

if (!browser) {
  console.error("No Chrome or Edge found. Set CHROME_PATH to the browser's executable.");
  process.exit(1);
}

function print(url, output) {
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${output}`, url], { stdio: "ignore" });
  console.log(`Wrote ${output}`);
}

print(source, join(root, "public", FILE));

const phone = process.argv[2] ?? process.env.RESUME_PHONE;
if (phone) {
  const dir = join(root, "resume", "private");
  mkdirSync(dir, { recursive: true });
  print(`${source}?phone=${encodeURIComponent(phone)}`, join(dir, FILE));
}
