// Quieter, natural-looking editions of over-processed photographs: less
// saturation, softer highlights and a touch of warmth. The originals are
// left untouched; this writes new files next to them in public/images/story.
//   node scripts/generate-natural-edits.mjs
// Uses sharp, which ships with Next.js.
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const out = "public/images/story";
mkdirSync(out, { recursive: true });

const jobs = [
  {
    source: "public/images/34.png",
    output: `${out}/grapes-natural.jpg`,
    saturation: 0.68,
    // Pull the whites down and lift the blacks slightly: a gentler tonal range.
    linear: { a: 0.9, b: 10 },
    // A little warmth, so the cool blue grapes sit naturally with the page.
    tint: [1.03, 1.0, 0.95],
  },
];

for (const job of jobs) {
  const [r, g, b] = job.tint;
  await sharp(job.source)
    .removeAlpha()
    .modulate({ saturation: job.saturation })
    .linear(job.linear.a, job.linear.b)
    .recomb([
      [r, 0, 0],
      [0, g, 0],
      [0, 0, b],
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(job.output);

  console.log(job.output);
}
