"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import {
  CHARSETS,
  type AnimStyle,
  type AsciiConfig,
} from "@/lib/ascii";

export { PRESETS } from "@/lib/ascii";
export type { AsciiConfig, RenderMode, AnimStyle } from "@/lib/ascii";

/**
 * ASCII / dither art em Canvas2D — reimplementação do pipeline do editor do
 * 21st.dev (https://21st.dev/community/ascii).
 *
 * Ordem, tal como especificada:
 *   1. desenhar a foto (bgMode / bgBlur / bgOpacity controlam o que fica atrás)
 *   2. grelha de cellSize px; média de cor e luminosidade por célula
 *   3. desenhar a primitiva de cada célula conforme renderMode, respeitando
 *      coverage, density, invert e edgeEmphasis
 *   4. brightness → contrast → saturation → grayscale → tint → blur
 *   5. pós-efeitos de pfx (scanLines, vignette, bloom, chromatic, filmGrain,
 *      glitch, halftone, pixelate, filmDust)
 *   6. lights, 7. mask, 8. animação (animStyle / animSpeed / animIntensity)
 *
 * A amostragem por célula é feita desenhando a imagem para um canvas de
 * cols×rows: o próprio downscale do browser é o filtro de caixa, e um único
 * getImageData devolve todas as médias.
 */

/** Bayer 4×4 — a matriz de dispersão do modo "dither". */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => v / 16));

function modulate(
  style: AnimStyle,
  x: number,
  y: number,
  cols: number,
  rows: number,
  time: number,
  amount: number,
): number {
  if (amount === 0) return 0;
  const nx = x / Math.max(1, cols);
  const ny = y / Math.max(1, rows);
  switch (style) {
    case "wave":
      return Math.sin((nx * 6 + ny * 2.5) - time * 1.6) * amount;
    case "pulse":
      return Math.sin(time * 2) * amount;
    case "shimmer":
      // ruído barato e determinístico, deslizando no tempo
      return (
        (Math.sin((x * 12.9898 + y * 78.233) * 0.5 + time * 3) * 0.5 + 0.5) *
          2 -
        1
      ) * amount;
    case "ripple": {
      const d = Math.hypot(nx - 0.5, ny - 0.5);
      return Math.sin(d * 18 - time * 3) * amount;
    }
    case "flicker":
      return (Math.sin(time * 9 + x * 0.7) * 0.5 + 0.5 > 0.7 ? 1 : -0.2) * amount;
  }
}

export function AsciiArt({
  src,
  alt,
  config,
  blend,
  className,
}: {
  /** Uma foto, várias (com transição), ou nenhuma — aí o campo é gerado. */
  src?: string | string[];
  alt: string;
  config: AsciiConfig;
  /**
   * 0 → primeira foto, 1 → segunda, e por aí. O valor é lido dentro do ciclo
   * de rAF, então rolar a página não provoca um único re-render.
   */
  blend?: MotionValue<number>;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const cfgRef = useRef(config);
  // O ciclo de rAF lê a configuração entre frames; escrevê-la durante o render
  // é inseguro em rendering concorrente, então a sincronização vive num efeito.
  useEffect(() => {
    cfgRef.current = config;
  }, [config]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      setFailed(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // canvas pequeno onde a imagem é reduzida a cols×rows: o downscale do
    // browser já é a média por célula
    const sample = document.createElement("canvas");
    const sctx = sample.getContext("2d", { willReadFrequently: true })!;
    // camada usada para o bloom
    const glow = document.createElement("canvas");
    const gctx = glow.getContext("2d")!;

    const list = Array.isArray(src) ? src : src ? [src] : [];
    const imgs: (HTMLImageElement | null)[] = list.map(() => null);
    const buffers: (Uint8ClampedArray | null)[] = list.map(() => null);
    let img: HTMLImageElement | null = null;
    let raf = 0;
    let onScreen = true;
    let start = performance.now();
    let cols = 0;
    let rows = 0;
    let dprRef = 1;
    let data: Uint8ClampedArray | null = null;
    // Em tinta, a dissolução é feita depois da conversão: a segunda foto e o
    // peso dela. Misturar o RGB somava o fundo de uma à figura da outra e o
    // meio da transição virava uma mancha cinzenta.
    let inkNext: Uint8ClampedArray | null = null;
    let inkK = 0;
    // retângulo ocupado pelas fotos, em células (a união de todas)
    let photo = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };

    /** Campo orgânico gerado em código, para quando não há foto. */
    const procedural = (time: number) => {
      const c = cfgRef.current;
      const cell = c.cellSize * dprRef;
      cols = Math.max(1, Math.floor(canvas.width / cell));
      rows = Math.max(1, Math.floor(canvas.height / cell));
      const buf = new Uint8ClampedArray(cols * rows * 4);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols - 0.5;
          const ny = y / rows - 0.5;
          const d = Math.hypot(nx * 1.5, ny);
          let v =
            Math.sin(nx * 7 + time * 0.5) * 0.5 +
            Math.cos(ny * 9 - time * 0.35) * 0.5;
          v = (v + 2) / 4;
          v *= Math.max(0, 1 - d * 1.9);
          const k = (y * cols + x) * 4;
          const g = Math.round(Math.max(0, Math.min(1, v)) * 255);
          buf[k] = buf[k + 1] = buf[k + 2] = g;
          buf[k + 3] = g > 6 ? 255 : 0;
        }
      }
      data = buf;
    };

    /** Amostra UMA imagem para o seu próprio buffer de cols×rows. */
    const sampleOne = (image: HTMLImageElement) => {
      const c = cfgRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cell = c.cellSize * dprRef;
      const cs = Math.max(1, Math.floor(w / cell));
      const rs = Math.max(1, Math.floor(h / cell));
      sample.width = cs;
      sample.height = rs;
      sctx.clearRect(0, 0, cs, rs);
      const scale =
        c.fit === "cover"
          ? Math.max(w / image.width, h / image.height)
          : Math.min(w / image.width, h / image.height);
      const dw = (image.width * scale) / cell;
      const dh = (image.height * scale) / cell;
      const dx = (cs - dw) * c.anchorX;
      const dy = (rs - dh) * c.anchorY;
      sctx.drawImage(image, dx, dy, dw, dh);
      photo = {
        x0: Math.min(photo.x0, dx),
        y0: Math.min(photo.y0, dy),
        x1: Math.max(photo.x1, dx + dw),
        y1: Math.max(photo.y1, dy + dh),
      };
      return sctx.getImageData(0, 0, cs, rs).data;
    };

    /** Reamostra todas e mistura as duas vizinhas conforme `blend`. */
    const resampleAll = () => {
      const c = cfgRef.current;
      const cell = c.cellSize * dprRef;
      cols = Math.max(1, Math.floor(canvas.width / cell));
      rows = Math.max(1, Math.floor(canvas.height / cell));
      photo = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
      for (let i = 0; i < imgs.length; i++) {
        const im = imgs[i];
        buffers[i] = im ? sampleOne(im) : null;
      }
    };

    const mix = () => {
      const ready = buffers.filter(Boolean) as Uint8ClampedArray[];
      if (!ready.length) return;
      if (ready.length === 1 || !blend) {
        data = ready[0];
        inkNext = null;
        return;
      }
      const p = Math.max(0, Math.min(ready.length - 1, blend.get()));
      const i0 = Math.floor(p);
      const i1 = Math.min(ready.length - 1, i0 + 1);
      const k = p - i0;
      const a = ready[i0];
      const b = ready[i1];
      inkNext = null;
      if (k < 0.001) {
        data = a;
        return;
      }
      if (cfgRef.current.ink) {
        data = a;
        inkNext = b;
        inkK = k;
        return;
      }
      // dissolve no domínio da amostra: as duas imagens viram uma só trama
      const out = new Uint8ClampedArray(a.length);
      for (let n = 0; n < a.length; n++) {
        out[n] = a[n] + (b[n] - a[n]) * k;
      }
      data = out;
    };

    const resample = () => {
      if (!img) return;
      const c = cfgRef.current;
      const w = canvas.width;
      const h = canvas.height;
      // cellSize é em px CSS: sem isto a grelha muda com o devicePixelRatio
      const cell = c.cellSize * dprRef;
      cols = Math.max(1, Math.floor(w / cell));
      rows = Math.max(1, Math.floor(h / cell));
      sample.width = cols;
      sample.height = rows;
      sctx.clearRect(0, 0, cols, rows);

      const scale =
        c.fit === "cover"
          ? Math.max(w / img.width, h / img.height)
          : Math.min(w / img.width, h / img.height);
      const dw = (img.width * scale) / cell;
      const dh = (img.height * scale) / cell;
      sctx.drawImage(
        img,
        (cols - dw) * c.anchorX,
        (rows - dh) * c.anchorY,
        dw,
        dh,
      );
      data = sctx.getImageData(0, 0, cols, rows).data;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      dprRef = dpr;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      glow.width = Math.max(1, Math.round(canvas.width / 4));
      glow.height = Math.max(1, Math.round(canvas.height / 4));
      if (list.length) resampleAll();
      else resample();
    };

    /** 4. ajustes de cor, aplicados no valor da célula. */
    const adjust = (lum: number, c: AsciiConfig) => {
      let v = lum / 255;
      if (c.gamma && c.gamma !== 1) v = Math.pow(v, c.gamma);
      v += c.brightness / 100;
      v = (v - 0.5) * (c.contrast / 100) + 0.5;
      return Math.max(0, Math.min(1, v));
    };

    const draw = (now: number) => {
      const c = cfgRef.current;
      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) return;
      if (list.length) mix();
      else procedural((now - start) / 1000);
      if (!data) return;

      const speed = c.animSpeed.enabled ? c.animSpeed.intensity / 100 : 0;
      const amp = c.animIntensity.enabled ? c.animIntensity.intensity / 100 : 0;
      const time =
        reduced || !c.animated ? 0 : ((now - start) / 1000) * speed;
      const wobble = reduced || !c.animated ? 0 : amp * 0.22;

      ctx.clearRect(0, 0, w, h);

      // 1. fundo
      if (c.bgMode === "solid") {
        ctx.globalAlpha = c.bgOpacity / 100;
        ctx.fillStyle = c.bgColor;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;
      } else if (c.bgMode === "photo" || c.bgMode === "blur") {
        if (img) {
          ctx.save();
          ctx.globalAlpha = c.bgOpacity / 100;
          if (c.bgMode === "blur") ctx.filter = `blur(${c.bgBlur}px)`;
          const s =
            c.fit === "cover"
              ? Math.max(w / img.width, h / img.height)
              : Math.min(w / img.width, h / img.height);
          ctx.drawImage(
            img,
            (w - img.width * s) * c.anchorX,
            (h - img.height * s) * c.anchorY,
            img.width * s,
            img.height * s,
          );
          ctx.restore();
        }
      }

      const cw = w / cols;
      const ch = h / rows;

      // Esvanecimento nas bordas do quadro: sem isto a foto recortada termina
      // num rectângulo visível, que é o que denunciava o corte.
      const fadeX = (x: number) => {
        const n = x / Math.max(1, cols - 1);
        return Math.min(1, Math.min(n, 1 - n) / 0.14);
      };
      const fadeY = (y: number) => {
        const n = y / Math.max(1, rows - 1);
        return Math.min(1, Math.min(n, 1 - n) / 0.1);
      };
      // Oval dentro do retângulo da foto: o centro fica um pouco acima do
      // meio, onde estão o rosto e o tronco.
      const vignette = (x: number, y: number) => {
        if (!c.photoVignette || !(photo.x1 > photo.x0)) return 1;
        const hw = (photo.x1 - photo.x0) / 2;
        const hh = (photo.y1 - photo.y0) / 2;
        const nx = (x + 0.5 - (photo.x0 + hw)) / hw;
        const ny = (y + 0.5 - (photo.y0 + hh * 0.86)) / hh;
        const d = Math.hypot(nx, ny * 1.05);
        const k = Math.max(0, Math.min(1, (1 - d) / 0.42));
        return k * k * (3 - 2 * k);
      };
      // Quantidade de tinta de uma célula: papel abaixo do piso, e a inversão
      // antes do esvanecimento — invertida depois, a borda virava tinta cheia.
      const inkOf = (raw: number, alpha: number, wave: number) => {
        if (c.floor && raw / 255 < c.floor) return 0;
        let t = adjust(raw, c) * alpha + wave;
        t = Math.max(0, Math.min(1, t));
        return c.invert ? 1 - t : t;
      };
      const chars = c.customChars || CHARSETS[c.charSet] || CHARSETS.standard;

      if (c.renderMode === "characters" || c.renderMode === "hexdump") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${Math.round(ch * 0.92)}px var(--font-geist-mono), monospace`;
      }

      // 2–3. uma primitiva por célula
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const a = data[i + 3] / 255;

          if (a < 0.04) {
            // fundo: trama esparsa que dá textura ao vazio
            if (c.ambient > 0) {
              const n = (Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1;
              const r2 = Math.abs(n);
              if (r2 * 100 < c.ambient) {
                const s = Math.max(1, (w / cols) * (0.2 + r2 * 0.22));
                ctx.fillStyle = c.ink
                  ? `rgba(${c.ink},${0.1 + r2 * 0.2})`
                  : `rgba(246,247,248,${0.16 + r2 * 0.3})`;
                ctx.fillRect(
                  x * (w / cols) + (w / cols - s) / 2,
                  y * (h / rows) + (h / rows - s) / 2,
                  s,
                  s,
                );
              }
            }
            continue;
          }

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const raw = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const wave = modulate(c.animStyle, x, y, cols, rows, time, wobble);
          let v: number;

          if (c.ink) {
            // tinta: cada foto vira tinta sozinha, e só então as duas se
            // misturam — um cross-fade de duas impressões
            v = inkOf(raw, a, wave);
            if (inkNext) {
              const n2 = inkNext;
              const raw2 = 0.2126 * n2[i] + 0.7152 * n2[i + 1] + 0.0722 * n2[i + 2];
              v += (inkOf(raw2, n2[i + 3] / 255, wave) - v) * inkK;
            }
          } else {
            v = adjust(raw, c) * a;
            // 8. animação: modula a luminosidade da célula
            v += wave;
            if (c.invert) v = 1 - Math.max(0, Math.min(1, v));
          }
          v *= Math.pow(fadeX(x) * fadeY(y), 0.65) * vignette(x, y);
          v = Math.max(0, Math.min(1, v));

          if (v * 100 < c.density) continue;
          if (c.coverage < 100 && ((x * 7 + y * 13) % 100) >= c.coverage) continue;

          const px = x * cw;
          const py = y * ch;
          const cx = px + cw / 2;
          const cy = py + ch / 2;

          // saturação e cinzento decidem se a célula guarda a cor da foto
          const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const sat = c.saturation / 100;
          const mixGray = c.grayscale / 100;
          const cr = Math.round((r * sat + gray * (1 - sat)) * (1 - mixGray) + gray * mixGray);
          const cg = Math.round((g * sat + gray * (1 - sat)) * (1 - mixGray) + gray * mixGray);
          const cb = Math.round((b * sat + gray * (1 - sat)) * (1 - mixGray) + gray * mixGray);
          const shade = Math.round(v * 255);
          const fill = c.ink
            ? `rgba(${c.ink},${Math.min(1, 0.55 + v * 0.4)})`
            : c.saturation === 100 && c.grayscale === 0 && cr === cg && cg === cb
              ? `rgb(${shade},${shade},${shade})`
              : `rgba(${cr},${cg},${cb},${v})`;
          ctx.fillStyle = fill;

          switch (c.renderMode) {
            case "mosaic": {
              // em tinta o ponto encolhe mais com a luz: no papel o quadrado
              // cheio vira mancha, e é o tamanho que tem de desenhar o volume
              const s = Math.max(1, cw * (c.ink ? 0.12 + v * 0.7 : 0.35 + v * 0.65));
              ctx.fillRect(cx - s / 2, cy - s / 2, s, (ch / cw) * s);
              break;
            }
            case "pixel":
              ctx.fillRect(px, py, cw + 0.5, ch + 0.5);
              break;
            case "dither": {
              // Bayer 4×4 decide SE a célula acende; a marca em si é pequena,
              // e é isso que dá a trama fina em vez de um bloco cheio.
              const th = BAYER[y & 3][x & 3];
              if (v <= th * 0.9) continue;
              const s = Math.max(1, cw * (0.22 + v * 0.3));
              ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
              break;
            }
            case "dots": {
              // em tinta a área do ponto, não o raio, segue o tom: é a regra
              // do meio-tom, e é o que mantém a pedra legível
              const rad = c.ink ? (cw / 2) * Math.sqrt(v) * 1.08 : (cw / 2) * v;
              ctx.beginPath();
              ctx.arc(cx, cy, Math.max(0.3, rad), 0, Math.PI * 2);
              ctx.fill();
              break;
            }
            case "rings": {
              ctx.strokeStyle = fill;
              ctx.lineWidth = Math.max(0.5, cw * 0.14);
              ctx.beginPath();
              ctx.arc(cx, cy, Math.max(0.4, (cw / 2) * v), 0, Math.PI * 2);
              ctx.stroke();
              break;
            }
            case "cross": {
              const s = (cw / 2) * v;
              ctx.strokeStyle = fill;
              ctx.lineWidth = Math.max(0.5, cw * 0.16);
              ctx.beginPath();
              ctx.moveTo(cx - s, cy);
              ctx.lineTo(cx + s, cy);
              ctx.moveTo(cx, cy - s);
              ctx.lineTo(cx, cy + s);
              ctx.stroke();
              break;
            }
            case "diamond": {
              const s = (cw / 2) * v;
              ctx.beginPath();
              ctx.moveTo(cx, cy - s);
              ctx.lineTo(cx + s, cy);
              ctx.lineTo(cx, cy + s);
              ctx.lineTo(cx - s, cy);
              ctx.closePath();
              ctx.fill();
              break;
            }
            case "triangles": {
              const s = (cw / 2) * v;
              ctx.beginPath();
              ctx.moveTo(cx, cy - s);
              ctx.lineTo(cx + s, cy + s);
              ctx.lineTo(cx - s, cy + s);
              ctx.closePath();
              ctx.fill();
              break;
            }
            case "lines":
            case "diagonal": {
              ctx.strokeStyle = fill;
              ctx.lineWidth = Math.max(0.5, ch * v * 0.9);
              ctx.beginPath();
              if (c.renderMode === "lines") {
                ctx.moveTo(px, cy);
                ctx.lineTo(px + cw, cy);
              } else {
                ctx.moveTo(px, py + ch);
                ctx.lineTo(px + cw, py);
              }
              ctx.stroke();
              break;
            }
            case "halfblocks": {
              // dobra a resolução vertical: metade de cima e de baixo
              const top = v;
              const bot = Math.max(0, Math.min(1, v * 0.75 + 0.12));
              ctx.fillRect(px, py, cw + 0.5, (ch / 2) * top + 0.5);
              ctx.fillRect(px, py + ch / 2, cw + 0.5, (ch / 2) * bot + 0.5);
              break;
            }
            case "hexdump": {
              const hex = "0123456789ABCDEF";
              ctx.fillText(hex[Math.min(15, Math.floor(v * 16))], cx, cy);
              break;
            }
            case "characters":
            default: {
              const k = Math.min(chars.length - 1, Math.floor(v * chars.length));
              ctx.fillText(chars[k], cx, cy);
              break;
            }
          }
        }
      }

      // o risco elétrico: a assinatura deste preset
      if (c.streak.enabled) {
        const sy = h * c.streak.y;
        const k = c.streak.intensity / 100;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(0.28, c.streak.color);
        grad.addColorStop(0.72, c.streak.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.strokeStyle = grad;
        // o risco ondula ao ritmo da animação
        const bend = Math.sin(time * 1.2) * h * 0.012;
        for (const [lw, alpha, blur] of [
          [Math.max(6, h * 0.02), 0.22 * k, 14],
          [Math.max(2, h * 0.005), 0.55 * k, 6],
          [1.2, 0.95 * k, 0],
        ] as const) {
          ctx.globalAlpha = alpha;
          ctx.lineWidth = lw;
          ctx.filter = blur ? `blur(${blur}px)` : "none";
          ctx.beginPath();
          ctx.moveTo(0, sy + bend);
          ctx.bezierCurveTo(w * 0.3, sy - h * 0.02 + bend, w * 0.6, sy + h * 0.02 + bend, w, sy - h * 0.01 + bend);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4 (fim). tint e blur sobre o resultado
      if (c.tintOpacity > 0) {
        ctx.save();
        ctx.globalCompositeOperation = c.overlayBlend;
        ctx.globalAlpha = c.tintOpacity / 100;
        ctx.fillStyle = c.tint;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      // 5. pós-efeitos
      const bloom = c.pfx.bloom;
      if (bloom?.enabled) {
        // cópia reduzida e desfocada, somada por cima
        gctx.clearRect(0, 0, glow.width, glow.height);
        gctx.drawImage(canvas, 0, 0, glow.width, glow.height);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = bloom.intensity / 100;
        ctx.filter = `blur(${Math.max(1, (bloom.intensity / 100) * 10)}px)`;
        ctx.drawImage(glow, 0, 0, w, h);
        ctx.restore();
      }

      const vig = c.pfx.vignette;
      if (vig?.enabled) {
        const grad = ctx.createRadialGradient(
          w / 2, h / 2, Math.min(w, h) * 0.25,
          w / 2, h / 2, Math.max(w, h) * 0.72,
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, `rgba(0,0,0,${vig.intensity / 100})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      const scan = c.pfx.scanLines;
      if (scan?.enabled) {
        ctx.save();
        ctx.globalAlpha = scan.intensity / 200;
        ctx.fillStyle = "#000";
        for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
        ctx.restore();
      }

      const grain = c.pfx.filmGrain;
      if (grain?.enabled) {
        ctx.save();
        ctx.globalAlpha = grain.intensity / 400;
        for (let k = 0; k < 900; k++) {
          ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
          ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
        }
        ctx.restore();
      }
    };

    const loop = (now: number) => {
      if (onScreen && document.visibilityState !== "hidden") draw(now);
      if (!reduced && cfgRef.current.animated) raf = requestAnimationFrame(loop);
    };

    let started = false;
    const kick = () => {
      if (started) return;
      started = true;
      resize();
      start = performance.now();
      draw(start);
      if (!reduced && cfgRef.current.animated) raf = requestAnimationFrame(loop);
    };

    const loaded: HTMLImageElement[] = [];
    if (!list.length) {
      kick();
    } else {
      list.forEach((url, i) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
          imgs[i] = image;
          loaded.push(image);
          if (i === 0) img = image;
          resize();
          kick();
        };
        image.onerror = () => {
          if (i === 0) setFailed(true);
        };
        image.src = url;
      });
    }

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (e) => {
        onScreen = e.some((x) => x.isIntersecting);
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      for (const im of loaded) {
        im.onload = null;
        im.onerror = null;
      }
    };
  }, [src, blend]);

  return (
    <div ref={wrapRef} className={className} role="img" aria-label={alt}>
      {failed && typeof src === "string" ? (
        // O canvas é decoração: se falhar, a foto tratada entra no lugar.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-contain" />
      ) : (
        <canvas ref={canvasRef} className="block h-full w-full" />
      )}
    </div>
  );
}
