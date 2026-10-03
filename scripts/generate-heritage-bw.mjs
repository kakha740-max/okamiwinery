// Black-and-white editions of photographs for the home page (the story
// section and the "Discover Etno Okami" mosaic) and the story page. All are
// kept at their native resolution — no artificial upscaling. The colour
// originals are left untouched; this writes new files to public/images/heritage.
//   node scripts/generate-heritage-bw.mjs
// Uses sharp, which ships with Next.js.
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const out = "public/images/heritage";
mkdirSync(out, { recursive: true });

const jobs = [
  // Home page "Discover Etno Okami" mosaic.
  {
    source: "public/images/33.png",
    output: `${out}/estate-qvevri-bw.jpg`,
    contrast: 0.24,
    white: 0.999, // keep the sunlit window soft rather than clipped
    sharpen: { sigma: 0.7, m1: 0.4, m2: 1 },
  },
  {
    source: "public/images/4.png",
    output: `${out}/estate-bottles-bw.jpg`,
    contrast: 0.26,
    sharpen: { sigma: 0.7, m1: 0.4, m2: 1 },
  },
  {
    source: "public/images/29.webp",
    output: `${out}/estate-building-bw.jpg`,
    contrast: 0.22,
    sharpen: { sigma: 0.7, m1: 0.4, m2: 1 },
  },
  // Story page, chapter 01 (the yellow-filter mix darkens the sky, as on film).
  {
    source: "public/images/36.png",
    output: `${out}/vineyard-bw.jpg`,
    contrast: 0.22,
    sharpen: { sigma: 0.7, m1: 0.4, m2: 1 },
  },
  // Story page, chapter 03.
  {
    source: "public/images/35.png",
    output: `${out}/wine-library-bw.jpg`,
    contrast: 0.24,
    sharpen: { sigma: 0.7, m1: 0.4, m2: 1 },
  },
  // Home page story section.
  {
    source: "public/images/32.png",
    output: `${out}/barrels-bw.jpg`,
    // Kept at the photo's native 1764px: no artificial upscaling.
    contrast: 0.24,
    sharpen: { sigma: 0.7, m1: 0.4, m2: 1 },
  },
];

// Channel mix of a yellow lens filter: warm wood and stone stay luminous
// instead of turning muddy, as they do with a plain desaturation.
const MIX = [0.4, 0.45, 0.15];

for (const job of jobs) {
  const { data, info } = await sharp(job.source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = info.width * info.height;

  const luminance = new Float32Array(pixels);
  const histogram = new Uint32Array(256);
  for (let i = 0; i < pixels; i++) {
    const l = MIX[0] * data[i * 3] + MIX[1] * data[i * 3 + 1] + MIX[2] * data[i * 3 + 2];
    luminance[i] = l;
    histogram[Math.min(255, Math.round(l))]++;
  }

  // Black and white points from the photo's own histogram: deep blacks and
  // clean highlights without clipping more than a sliver of either end.
  const percentile = (p) => {
    let sum = 0;
    for (let v = 0; v < 256; v++) {
      sum += histogram[v];
      if (sum >= pixels * p) return v;
    }
    return 255;
  };
  const black = percentile(0.004);
  const white = percentile(job.white ?? 0.997);

  // Gentle S-curve on top of the levels, computed in 16 bits to avoid banding.
  const tone = new Uint16Array(pixels);
  for (let i = 0; i < pixels; i++) {
    const x = Math.min(1, Math.max(0, (luminance[i] - black) / (white - black)));
    const s = x * x * (3 - 2 * x);
    tone[i] = Math.round((x + job.contrast * (s - x)) * 65535);
  }

  let image = sharp(tone, { raw: { width: info.width, height: info.height, channels: 1 } });
  if (job.denoise) image = image.median(3);
  if (job.width) image = image.resize({ width: job.width, kernel: "lanczos3" });
  await image
    .sharpen(job.sharpen)
    .toColourspace("b-w")
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(job.output);

  console.log(`${job.output}  (levels ${black}–${white})`);
}
