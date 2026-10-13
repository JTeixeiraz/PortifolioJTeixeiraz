// Gera as imagens do site a partir de scripts/raw/.
//
// - "photo": AVIF + WebP em até três larguras, para <picture srcset>; com
//   `blur`, também um fundo desfocado de 48 px.
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

/** @type {{ id: string, file: string, mode: "photo" | "ink", widths: number[], blur?: boolean, crop?: { left: number, top: number, width: number, height: number } }[]} */
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

  // estética: fotos e pôsteres (blur: gera também o fundo desfocado minúsculo)
  { id: "nana", file: "nana.jpg", mode: "photo", widths: [420, 736], blur: true },
  { id: "fallen-angels", file: "fallen-angels.jpg", mode: "photo", widths: [420, 736], blur: true },
  { id: "face-illust", file: "face-illust.jpg", mode: "photo", widths: [400, 674] },
  { id: "goldfish", file: "goldfish.jpg", mode: "photo", widths: [420, 736], blur: true },
  { id: "night-car-2", file: "night-car-2.jpg", mode: "photo", widths: [400, 735] },
  { id: "night-tokyo", file: "night-tokyo.jpg", mode: "photo", widths: [420, 736], blur: true },
  { id: "tokyo-street", file: "tokyo-street.jpg", mode: "photo", widths: [420, 736], blur: true },
  { id: "tokyo-girl", file: "tokyo-girl.jpg", mode: "photo", widths: [420, 720] },
  { id: "supersonic", file: "supersonic.jpg", mode: "photo", widths: [420, 736] },
  { id: "evangelion", file: "evangelion.jpg", mode: "photo", widths: [420, 736], blur: true },
  { id: "eva-poster", file: "eva-poster.jpg", mode: "photo", widths: [420, 735] },
  { id: "crystal", file: "crystal.jpg", mode: "photo", widths: [736], blur: true },
  { id: "koi", file: "koi.jpg", mode: "photo", widths: [420, 736], blur: true },
  { id: "chrome-white", file: "chrome-white.jpg", mode: "photo", widths: [420, 736] },
  { id: "bronze-liquid", file: "bronze-liquid.jpg", mode: "photo", widths: [420, 736] },
  { id: "floral-spider", file: "floral-spider.jpg", mode: "photo", widths: [420, 736] },
  { id: "jp-poster", file: "jp-poster.jpg", mode: "photo", widths: [400, 710] },
  { id: "cat-poster", file: "cat-poster.jpg", mode: "photo", widths: [420, 736] },
  { id: "daikichi", file: "daikichi.jpg", mode: "photo", widths: [420, 736] },

  { id: "bird-paint", file: "bird-paint.jpg", mode: "photo", widths: [420, 736] },
  { id: "dubai-laptop", file: "dubai-laptop.jpg", mode: "photo", widths: [420, 736] },

  // fotos dele
  { id: "me-1", file: "me-1.png", mode: "photo", widths: [320, 484] },
  { id: "me-2", file: "me-2.png", mode: "photo", widths: [320, 484] },
  { id: "me-avatar", file: "me-2.png", mode: "photo", widths: [96, 160], crop: { left: 120, top: 150, width: 170, height: 170 } },

  // tatuagens: traço preto em papel branco → tinta com alpha
  { id: "tat-sword", file: "tat-34.jpg", mode: "ink", widths: [360, 640] },
  { id: "tat-wing", file: "tat-35.jpg", mode: "ink", widths: [360, 640] },
  { id: "tat-thorn-face", file: "tat-36.jpg", mode: "ink", widths: [360, 640] },
  { id: "tat-moon-angel", file: "tat-37.jpg", mode: "ink", widths: [360, 640] },
  { id: "tat-eye-column", file: "tat-38.jpg", mode: "ink", widths: [360, 640] },
  { id: "tat-tiger", file: "tat-39.jpg", mode: "ink", widths: [360, 640] },
  { id: "tat-halo", file: "tat-40.jpg", mode: "ink", widths: [360, 640] },
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
    const base =
      img.mode === "ink"
        ? await inkify(src)
        : img.crop
          ? sharp(src).extract(img.crop)
          : sharp(src);
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

    // Fundo desfocado: 48 px de largura, borrado no build. Esticado pelo CSS
    // ele vira o painel de vidro atrás dos cartões — sem filter: blur() no
    // navegador, que custaria composição a cada quadro.
    if (img.blur) {
      await sharp(buf)
        .resize({ width: 48 })
        .blur(1.2)
        .modulate({ saturation: 1.15 })
        .webp({ quality: 60 })
        .toFile(path.join(OUT, `${img.id}-blur.webp`));
    }

    manifest[img.id] = { width: meta.width, height: meta.height, widths, blur: Boolean(img.blur) };
    console.log(`${img.id}: ${meta.width}×${meta.height} → ${widths.join(", ")}`);
  }

  // Ícone da aba: o avatar num círculo, 64 px. O Next serve src/app/icon.png
  // e escreve o <link rel="icon"> sozinho.
  const circle = Buffer.from('<svg width="64" height="64"><circle cx="32" cy="32" r="32"/></svg>');
  await sharp(path.join(RAW, "me-2.png"))
    .extract({ left: 120, top: 150, width: 170, height: 170 })
    .resize(64, 64)
    .modulate({ brightness: 1.35 })
    .composite([{ input: circle, blend: "dest-in" }])
    .png()
    .toFile(path.join(ROOT, "src/app/icon.png"));

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
