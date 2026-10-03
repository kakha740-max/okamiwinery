// Builds the 1200×630 Open Graph images in public/images/og.
// Run after adding a wine or changing page photography:
//   node scripts/generate-og-images.mjs
// Uses sharp, which ships with Next.js.
import { mkdirSync, readFileSync } from "node:fs";
import sharp from "sharp";

const W = 1200;
const H = 630;
const out = "public/images/og";
mkdirSync(out, { recursive: true });

const logo = (width) => sharp("public/images/brand/etno-okami-logo.png").resize({ width }).toBuffer();

const shade = Buffer.from(
  `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0e0c0a" stop-opacity="0.15"/>
    <stop offset="1" stop-color="#0e0c0a" stop-opacity="0.8"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/></svg>`
);

// Page images: the photograph with a soft shade and the logo.
const pages = {
  "etno-okami": "public/images/film/hero-poster.jpg",
  wines: "public/images/22.jpg",
  story: "public/images/story8.png",
  gallery: "public/images/story2.png",
  awards: "public/images/19.jpg",
};

for (const [name, source] of Object.entries(pages)) {
  await sharp(source)
    .resize(W, H, { fit: "cover" })
    .composite([
      { input: shade },
      { input: await logo(260), left: 64, top: H - 64 - 137 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${out}/${name}.jpg`);
}

// Wine images: the bottle on the bone panel colour, logo on the right.
const winesSource = readFileSync("components/data/wines.ts", "utf8");
const bottles = [...winesSource.matchAll(/slug: "([^"]+)"[\s\S]*?image: "([^"]+)"/g)];

for (const [, slug, image] of bottles) {
  const bottle = await sharp(`public${image}`).trim().resize({ height: 560 }).toBuffer();
  const { width } = await sharp(bottle).metadata();
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ece5d8" } })
    .composite([
      { input: bottle, left: Math.round(380 - width / 2), top: 40 },
      { input: await logo(380), left: 700, top: Math.round(H / 2 - 100) },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${out}/wine-${slug}.jpg`);
}

console.log(`Generated ${Object.keys(pages).length + bottles.length} images in ${out}`);
