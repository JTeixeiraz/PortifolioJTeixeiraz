// Gera as imagens do site a partir de scripts/raw/.
//
// - "photo": AVIF + WebP em até três larguras, para <picture srcset>.
// - "ink": flash de tatuagem em fundo branco vira tinta com alpha real. O
//   branco do papel some, a cor do traço é recuperada (des-multiplicada do
//   branco), e a imagem pousa em qualquer card sem mix-blend-mode — blend em
//   camada grande custa composição a cada quadro de scroll.
//
// Saída em public/img/ e o manifesto (dimensões e larguras) em
// src/lib/images.ts, que o componente <Pic> lê para reservar o espaço e não
// gerar layout shift.
//
//   node scripts/images.mjs

import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "scripts/raw");
const OUT = path.join(ROOT, "public/img");
const MANIFEST = path.join(ROOT, "src/lib/images.ts");

/** @type {{ id: string, file: string, mode: "photo" | "ink", widths: number[] }[]} */
const IMAGES = [
  { id: "chrome-cross", file: "chrome-cross.jpg", mode: "photo", widths: [480, 900] },
  { id: "loading-cat", file: "loading-cat.jpg", mode: "photo", widths: [420, 800] },
  { id: "tribal-cross", file: "tribal-cross.jpg", mode: "ink", widths: [360, 720] },
  { id: "eye-target", file: "eye-target.jpg", mode: "ink", widths: [320, 640] },
  { id: "gothic-angel", file: "gothic-angel.jpg", mode: "ink", widths: [360, 680] },
  { id: "birdy-inicio", file: "birdy-inicio.webp", mode: "photo", widths: [320, 560] },
  { id: "birdy-genetica", file: "birdy-genetica.webp", mode: "photo", widths: [320, 560] },
  { id: "lumi-consulta", file: "lumi-consulta.webp", mode: "photo", widths: [320, 560] },
  { id: "lumi-rotina", file: "lumi-rotina.webp", mode: "photo", widths: [320, 560] },
  { id: "postly-campanha", file: "postly-campanha.webp", mode: "photo", widths: [640, 1200] },
];

/** Tinta sobre papel branco → RGBA com o papel transparente. */
async function inkify(input) {
  const { data, info } = await sharp(input)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // quanto o pixel se afasta do branco: o canal mais escuro manda
    const dark = 255 - Math.min(r, g, b);
    // o papel nunca é branco puro; abaixo de 18 é textura, não traço
    const a = Math.max(0, Math.min(255, ((dark - 18) / (255 - 18)) * 255));
    const k = a / 255;
    // des-multiplica do branco: c = 255·(1-k) + ink·k  →  ink = (c - 255·(1-k)) / k
    const un = (c) => (k > 0.02 ? Math.max(0, Math.min(255, (c - 255 * (1 - k)) / k)) : 0);
    out[j] = un(r);
    out[j + 1] = un(g);
    out[j + 2] = un(b);
    out[j + 3] = a;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({
    threshold: 1,
  });
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const img of IMAGES) {
    const src = path.join(RAW, img.file);
    const base = img.mode === "ink" ? await inkify(src) : sharp(src);
    // materializa uma vez (o trim muda as dimensões) e lê o tamanho final
    const buf = await base.png().toBuffer();
    const meta = await sharp(buf).metadata();
    const widths = img.widths.filter((w) => w < meta.width).concat(
      img.widths.some((w) => w >= meta.width) ? [meta.width] : [],
    );

    for (const w of widths) {
      const resized = sharp(buf).resize({ width: w, withoutEnlargement: true });
      await resized
        .clone()
        .avif({ quality: img.mode === "ink" ? 60 : 52, effort: 6 })
        .toFile(path.join(OUT, `${img.id}-${w}.avif`));
      await resized
        .clone()
        .webp({ quality: img.mode === "ink" ? 82 : 74, alphaQuality: 90, effort: 6 })
        .toFile(path.join(OUT, `${img.id}-${w}.webp`));
    }

    manifest[img.id] = { width: meta.width, height: meta.height, widths };
    console.log(`${img.id}: ${meta.width}×${meta.height} → ${widths.join(", ")}`);
  }

  const ts = `// Gerado por scripts/images.mjs — não editar à mão.\n\nexport const IMAGES = ${JSON.stringify(
    manifest,
    null,
    2,
  )} as const;\n\nexport type ImageId = keyof typeof IMAGES;\n`;
  await writeFile(MANIFEST, ts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
