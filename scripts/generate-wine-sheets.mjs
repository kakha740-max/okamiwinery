// Saves each wine's printable technical sheet (/wines/<slug>/sheet/<lang>)
// as a PDF in public/sheets/<slug>-<lang>.pdf, the file linked from the
// wine's page. Run it against a running site whenever the wine data changes:
//   npx next start -p 3100          (or `npm run dev`)
//   BASE=http://localhost:3100 node scripts/generate-wine-sheets.mjs
//   (add LANGS=zh and/or SLUGS=rkatsiteli to print only some sheets)
// Prints with a locally installed Chromium browser (Edge or Chrome) in
// headless mode; set BROWSER to its path if it isn't found.
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

const base = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const out = "public/sheets";
mkdirSync(out, { recursive: true });

const browser = [
  process.env.BROWSER,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));
if (!browser) throw new Error("No Chromium browser found; set BROWSER to its path.");

// The slugs, read from the wine data (a TypeScript file).
const slugs = [...readFileSync("components/data/wines.ts", "utf8").matchAll(/slug: "([^"]+)"/g)]
  .map((m) => m[1])
  // SLUGS=rkatsiteli limits the run to some wines.
  .filter((slug) => !process.env.SLUGS || process.env.SLUGS.split(",").includes(slug));
// LANGS=zh limits the run to some languages, e.g. after adding one.
const languages = (process.env.LANGS ?? "en,ka,ru,zh").split(",");
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

for (const slug of slugs) {
  for (const lang of languages) {
    const file = resolve(out, `${slug}-${lang}.pdf`);
    // A fresh throwaway profile each time, so no running browser (an open
    // window, or the previous print still closing) takes over the job.
    const profile = mkdtempSync(join(tmpdir(), "wine-sheet-"));
    const result = spawnSync(
      browser,
      [
        "--headless=new",
        "--no-first-run",
        `--user-data-dir=${profile}`,
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=10000",
        `--print-to-pdf=${file}`,
        `${base}/wines/${slug}/sheet/${lang}`,
      ],
      { stdio: "ignore", timeout: 60000 },
    );
    // Edge's launcher can return before the PDF is written, so wait for the
    // file to appear and stop growing.
    let size = -1;
    for (let waited = 0; waited < 60000; waited += 500) {
      sleep(500);
      const now = existsSync(file) ? statSync(file).size : -1;
      if (now > 0 && now === size) break;
      size = now;
    }
    // A blank page is ~1 KB; a real sheet with its bottle image is far larger.
    if (result.error || size < 20000) throw new Error(`Failed: ${slug} ${lang}`);
    console.log(`${out}/${slug}-${lang}.pdf  (${Math.round(size / 1024)} KB)`);
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {}
  }
}
