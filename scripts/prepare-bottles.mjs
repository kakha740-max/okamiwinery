// Web editions of the studio bottle photographs (transparent PNGs at
// 7360 × 4912): cropped to the bottle and scaled to 1000 px wide, the size
// the wine pages, cards and sheets are drawn from.
// The originals (~30 MB each) live in scripts/source/bottles/, kept out of
// git and of the site.
//   node scripts/prepare-bottles.mjs
// Uses sharp, which ships with Next.js.
import sharp from "sharp";

const jobs = [
  { source: "scripts/source/bottles/01.png", output: "public/images/wines/chinuri-goruli-mtsvane.png" },
  { source: "scripts/source/bottles/02.png", output: "public/images/wines/okami-white.png" },
  { source: "scripts/source/bottles/03.png", output: "public/images/wines/rkatsiteli.png" },
  { source: "scripts/source/bottles/04.png", output: "public/images/wines/khashmi-saperavi.png" },
  { source: "scripts/source/bottles/05.png", output: "public/images/wines/okami-red.png" },
];

// The bottle's bounds: the rows and columns that are solidly opaque, so dust
// and stray specks left on the transparent ground are ignored.
async function bottleBounds(source) {
  const { data, info } = await sharp(source).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const columns = new Uint32Array(width);
  const rows = new Uint32Array(height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[y * width + x] > 128) {
        columns[x]++;
        rows[y]++;
      }
    }
  }
  // A column of the bottle holds hundreds of opaque pixels; a speck a few.
  const solid = (counts, min) => {
    const first = counts.findIndex((n) => n >= min);
    let last = counts.length - 1;
    while (last > first && counts[last] < min) last--;
    return [first, last];
  };
  const [left, right] = solid(columns, height * 0.04);
  const [top, bottom] = solid(rows, (right - left) * 0.04);
  // A few pixels of air around the glass, so its anti-aliased edge stays whole.
  const pad = 6;
  return {
    left: Math.max(0, left - pad),
    top: Math.max(0, top - pad),
    width: Math.min(width, right + pad + 1) - Math.max(0, left - pad),
    height: Math.min(height, bottom + pad + 1) - Math.max(0, top - pad),
  };
}

for (const { source, output } of jobs) {
  const bounds = await bottleBounds(source);
  const info = await sharp(source)
    .extract(bounds)
    .resize({ width: 1000, kernel: "lanczos3" })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(output);
  console.log(`${output}  ${info.width} × ${info.height}  (bottle ${bounds.width} × ${bounds.height})`);
}
