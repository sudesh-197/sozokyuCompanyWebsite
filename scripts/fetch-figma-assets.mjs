/**
 * Downloads the raster images used by the Services / Work / About / Footer
 * sections straight from Figma into public/assets/images.
 *
 *   npm run assets
 *
 * Needs Node 18+ and internet access.
 *
 * NOTE: these Figma asset links are temporary (≈7 days from 23 Oct 2026).
 * If a download fails with 403/404, export the node manually in Figma
 * (right-click layer → Copy/Paste as → … or Export PNG @2x) and save it with
 * the file name listed below. Node ids are given for each file.
 * Figma file: gyHsVxMJIrtU3hoqXsb3b7  (frame 3658:1687)
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

const BASE = "https://www.figma.com/api/mcp/asset";
const S = `${BASE}/c9338b0d-cdb5-4f2f-9542-c596ef9cc2de`; // Services
const W = `${BASE}/ae32f358-7a86-40f1-98a9-d6fb190385b2`; // Work
const A = `${BASE}/5f012fba-4d19-4df5-94bb-6e28c80283ac`; // About
const F = `${BASE}/dbafab42-cb8a-4b69-8f10-74c6def98aae`; // Footer

const FILES = [
  // Services – card 1 (node 3580:5882 / 3580:5868 / 3580:5883)
  ["service-app-1.png", `${S}/98ec7.png`],
  ["service-app-2.png", `${S}/1a604.png`],
  ["service-app-3.png", `${S}/75e8b.png`],
  // Services – card 2 (3580:5915 / 3580:5916 / 3580:5917); also reused in cards 3 & 4
  ["service-web-1.png", `${S}/ab794.png`],
  ["service-web-2.png", `${S}/990dc.png`],
  ["service-web-3.png", `${S}/136df.png`],
  // Work project mockup (3581:5980, 3581:5977, 3581:5978)
  ["work-main.png", `${W}/8e3f3.png`],
  ["work-planet.png", `${W}/3d291.png`],
  ["work-asterisk.png", `${W}/d7a5c.png`],
  // About portraits (3565:2359 = Shiva, 3565:2365 = Manjunath)
  ["about-shiva.png", `${A}/67278.png`],
  ["about-manjunath.png", `${A}/50177.png`],
  // Footer CTA texture (3565:2483)
  ["footer-texture.png", `${F}/a9185.png`],
];

await mkdir(OUT, { recursive: true });

let failed = 0;
for (const [name, url] of FILES) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(path.join(OUT, name), Buffer.from(await res.arrayBuffer()));
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
console.log("\nAll images saved to public/assets/images");
