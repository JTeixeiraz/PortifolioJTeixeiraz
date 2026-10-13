// Tira o runtime do Next do HTML exportado.
//
// A página não tem componente de cliente: tudo é Server Component, o idioma
// troca por CSS e um script inline de poucas linhas, e o resto é CSS. O
// runtime do React e do roteador (~200 KB gzip) não teria nada para hidratar,
// então sai — o HTML fica completo e interativo sem ele.
//
// Fica: os scripts com id "jpt-*" (idioma). Sai: <script> do Next (chunks e
// o payload RSC inline) e os <link> de preload de script.
//
//   node scripts/strip-js.mjs   (roda no fim do `npm run build`)

import { readdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../out");

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return e.name === "_next" ? [] : htmlFiles(p);
      return e.name.endsWith(".html") ? [p] : [];
    }),
  );
  return files.flat();
}

function strip(html) {
  let removed = 0;
  const out = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (tag) => {
      if (/\bid="jpt-/.test(tag)) return tag;
      removed++;
      return "";
    })
    .replace(/<link\b[^>]*\bas="script"[^>]*>/g, () => {
      removed++;
      return "";
    })
    .replace(/<link\b[^>]*\brel="modulepreload"[^>]*>/g, () => {
      removed++;
      return "";
    });
  return { out, removed };
}

const files = await htmlFiles(OUT);
for (const file of files) {
  const html = await readFile(file, "utf8");
  const { out, removed } = strip(html);
  await writeFile(file, out);
  console.log(`${path.relative(OUT, file)}: ${removed} tags de script removidas`);
}

// O payload RSC (*.txt) só serve à navegação do roteador, que não existe mais.
for (const entry of await readdir(OUT, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".txt") && entry.name !== "robots.txt") {
    await rm(path.join(OUT, entry.name));
  }
}
