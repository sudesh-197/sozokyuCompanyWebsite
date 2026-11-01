/**
 * Downloads the images used by the Sozokyu case-study page
 * (Figma node 3781:1293) into public/assets.
 *
 *   npm run assets:case
 *
 * Needs Node 18+ and internet access.
 *
 * NOTE: these Figma asset links are temporary (≈7 days from 28 Oct 2026).
 * If a download fails with 403/404, export the node manually in Figma
 * (Export PNG @2x / SVG) and save it with the file name listed below.
 * Node ids are given for each file.
 * Figma file: gyHsVxMJIrtU3hoqXsb3b7
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public", "assets", "images");
const ICONS = path.join(ROOT, "public", "assets", "icons");

const C = "https://www.figma.com/api/mcp/asset/73c89aae-5ff4-4f66-b2d4-ef9fd527ce7c";

// [file name, url, output folder]
const FILES = [
  // hero screenshot (3781:1376)
  ["case-sozokyu-hero.png", `${C}/e6638.png`, IMAGES],
  // "The product Approach" (3781:1482)
  ["case-sozokyu-approach.png", `${C}/f192a.png`, IMAGES],
  // "Art direction" 2 × 2 (3781:1509 / 1515 / 1521 / 1527)
  ["case-sozokyu-art-1.png", `${C}/f9391.png`, IMAGES],
  ["case-sozokyu-art-2.png", `${C}/1bc2d.png`, IMAGES],
  ["case-sozokyu-art-3.png", `${C}/52416.png`, IMAGES],
  ["case-sozokyu-art-4.png", `${C}/6b3cf.png`, IMAGES],
  // "Design & development" / "Under the hood" / "The final build"
  // (3781:1554, 3845:1568, 3845:1582 – the same image three times)
  ["case-sozokyu-system.png", `${C}/d34f4.png`, IMAGES],
  // "The Build" (3781:1584)
  ["case-sozokyu-build.png", `${C}/78b28.png`, IMAGES],
  // breadcrumb arrow, akar-icons:arrow-left 18px (3845:1611)
  ["arrow-left-18.svg", `${C}/c0b87.svg`, ICONS],
];

await mkdir(IMAGES, { recursive: true });
await mkdir(ICONS, { recursive: true });

let failed = 0;
for (const [name, url, dir] of FILES) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) throw new Error("empty file");
    await writeFile(path.join(dir, name), buf);
    console.log("✔", name);
  } catch (err) {
    failed++;
    console.error("✘", name, "–", err.message);
  }
}
if (failed) {
  console.error(`\n${failed} file(s) failed. Export them manually from Figma (see header of this script).`);
  process.exit(1);
}
console.log("\nAll case-study assets saved.");
