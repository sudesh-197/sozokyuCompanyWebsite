/**
 * Downloads the images / icons used by the Workley case-study page
 * (Figma desktop node 3881:3489, mobile node 3881:3739) into public/assets.
 *
 *   node scripts/fetch-workley-assets.mjs
 *
 * Needs Node 18+ and internet access.
 *
 * NOTE: these Figma asset links are temporary (≈7 days from 29 Oct 2026).
 * If a download fails with 403/404, export the node manually in Figma
 * (PNG @2x / SVG) and save it with the file name listed below.
 * Figma file: gyHsVxMJIrtU3hoqXsb3b7
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public", "assets", "images");
const ICONS = path.join(ROOT, "public", "assets", "icons");

const D = "https://www.figma.com/api/mcp/asset/93751ef2-f7fa-45f6-a456-20805f424d17"; // desktop frame
const M = "https://www.figma.com/api/mcp/asset/406b7a45-f780-4011-9228-289cadff5fbd"; // mobile frame

// [file name, url, output folder]
const FILES = [
  // laptop mock-up "Scene" (3881:3546 / 3881:3790 – same image on both)
  ["workley-scene.png", `${D}/a9e8a.png`, IMAGES],
  // masked screenshot "Replace this" (3881:3548 desktop · 3881:3792 mobile) + its mask
  ["workley-screen-desktop.png", `${D}/2e6c2.png`, IMAGES],
  ["workley-mask-desktop.svg", `${D}/3608a.svg`, IMAGES],
  ["workley-screen-mobile.png", `${M}/2b1f7.png`, IMAGES],
  ["workley-mask-mobile.svg", `${M}/ae676.svg`, IMAGES],
  // "Coming soon" card icons (hourglass 3881:3975 desktop · icon 3885:4244 mobile)
  ["workley-hourglass.svg", `${D}/b94d0.svg`, ICONS],
  ["workley-bag.svg", `${M}/af6bd.svg`, ICONS],
];

let failed = 0;
for (const [name, url, dir] of FILES) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), Buffer.from(await res.arrayBuffer()));
    console.log("✓", name);
  } catch (err) {
    failed++;
    console.error("✗", name, "–", err.message);
  }
}
console.log(failed ? `\n${failed} file(s) failed.` : "\nAll Workley assets downloaded.");
process.exit(failed ? 1 : 0);
