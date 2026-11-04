/**
 * Downloads the extra image used only on /work (the pixel cat on the heading
 * band) from Figma into public/assets/images/work-cat.png.
 *
 *   npm run assets:work
 *
 * Needs Node 18+ and internet access.
 *
 * NOTE: the Figma asset link is temporary (≈7 days from 1 Nov 2026).
 * If the download fails with 403/404, export the layer manually in Figma
 * (node 4031:2992 "image 168", file gyHsVxMJIrtU3hoqXsb3b7 → Export PNG @2x)
 * and save it as public/assets/images/work-cat.png.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "assets",
  "images"
);

const BASE = "https://www.figma.com/api/mcp/asset/42073c42-d0e4-4ff1-b53b-6cc901db554b";
const FILES = [["work-cat.png", `${BASE}/784e9.png`]]; // node 4031:2992

await mkdir(OUT, { recursive: true });

let failed = 0;
for (const [name, url] of FILES) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(path.join(OUT, name), Buffer.from(await res.arrayBuffer()));
    console.log("✓", name);
  } catch (err) {
    failed++;
    console.error("✗", name, "-", err.message);
  }
}
if (failed) {
  console.error(`\n${failed} file(s) failed – see the note at the top of this script.`);
  process.exit(1);
}
