/**
 * Downloads the two screenshots used by the Sozokyu Dashboard case study
 * ("The experience" → Wireframe / Full colour switch) into public/assets.
 * Figma frame: "Sozokyu Dashboard", node 3895:4497.
 *
 *   npm run assets:dashboard
 *
 * Needs Node 18+ and internet access.
 *
 * NOTE: these Figma asset links are temporary (≈7 days from 29 Oct 2026).
 * If a download fails with 403/404, export the node manually in Figma
 * (Export PNG @2x) and save it with the file name listed below.
 * Figma file: gyHsVxMJIrtU3hoqXsb3b7
 *
 * Everything else on the page (laptop hero, approach composite, 2 × 2 photo
 * grid, icons) re-uses files that are already in the project.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public", "assets", "images");

const D = "https://www.figma.com/api/mcp/asset/1d82ce71-c979-4ddb-9ad9-bff7dfc3f48d";

// [file name, url, Figma node]
const FILES = [
  // full-colour product page (layer "Screenshot 2026-10-28 at 3.23.04 PM 1")
  ["case-dashboard-colour.png", `${D}/28fdd.png`, "3895:4704"],
  // grey wireframe of the same page (layer "image 138")
  ["case-dashboard-wireframe.png", `${D}/f93ff.png`, "3895:4705"],
];

await mkdir(IMAGES, { recursive: true });

let failed = 0;
for (const [name, url, node] of FILES) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) throw new Error("empty file");
    await writeFile(path.join(IMAGES, name), buf);
    console.log("✔", name);
  } catch (err) {
    failed++;
    console.error("✘", name, "–", err.message, `(export Figma node ${node} manually)`);
  }
}

if (failed) {
  console.error(`\n${failed} file(s) failed – see the note at the top of this script.`);
  process.exit(1);
}
console.log("\nDone. Restart `npm run dev` if it was running.");
