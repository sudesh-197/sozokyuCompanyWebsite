/**
 * Downloads the "Trusted by" logos (Figma frame 3994:1526) into
 * public/assets/logos. Files that already exist are skipped, so
 * trusted-5.svg and trusted-6.svg (already in the project) are kept.
 *
 *   npm run assets:trusted            # only the missing ones
 *   npm run assets:trusted -- --force # re-download everything
 *
 * Needs Node 18+ and internet access.
 *
 * NOTE: Figma asset links are temporary (~7 days from 30 Oct 2026).
 * If a download fails with 403/404, export the layer in Figma
 * (select it → Export → SVG / PNG @2x) and save it under the name below.
 * Node ids are listed for each file.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "assets",
  "logos"
);
const B = "https://www.figma.com/api/mcp/asset";
const force = process.argv.includes("--force");

const FILES = [
  // list item 3994:1619 (68 × 110)
  ["trusted-1.svg", `${B}/ef375789-d1e7-4e02-ba52-9267512858c6.svg`],
  // list item 3994:1621 (87 × 110)
  ["trusted-2.svg", `${B}/e725abf3-4eed-42ee-921c-5fed7f3b95eb.svg`],
  // "image 141" 3994:1624 (100 × 50)
  ["trusted-3.png", `${B}/22864d55-6f81-41c1-ac2c-124e57b853e0.png`],
  // "image 142" 3994:1626 (113 × 42)
  ["trusted-4.png", `${B}/fc0d2b23-8c53-430a-ad98-9902223fed7d.png`],
  // list item 3994:1627 (89.6 × 110)
  ["trusted-5.svg", `${B}/d2c1267e-e3bc-46d9-ad1d-fcdc73a0dbaf.svg`],
  // image 3994:1633 (42 × 42)
  ["trusted-6.svg", `${B}/3b74fa9e-9fd9-4d86-aab8-7456b8cd50ea.svg`],
  // image 3994:1639 (56 × 40)
  ["trusted-7.svg", `${B}/fab1576a-962b-4610-b310-03b262d1e280.svg`],
];

await mkdir(OUT, { recursive: true });

let failed = 0;
for (const [name, url] of FILES) {
  const file = path.join(OUT, name);
  const exists = await access(file).then(() => true, () => false);
  if (exists && !force) {
    console.log("•", name, "(already there)");
    continue;
  }
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
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
console.log("\nLogos saved to public/assets/logos");
