/**
 * Tipos e presets do efeito ASCII. Vivem fora do módulo `"use client"` de
 * propósito: um Server Component que importe uma constante de um módulo
 * cliente recebe `undefined`, porque só componentes atravessam essa fronteira.
 */

export type RenderMode =
  | "characters"
  | "mosaic"
  | "dither"
  | "pixel"
  | "dots"
  | "cross"
  | "diamond"
  | "lines"
  | "diagonal"
  | "rings"
  | "triangles"
  | "hexdump"
  | "halfblocks";

export type AnimStyle = "wave" | "pulse" | "shimmer" | "ripple" | "flicker";

type Toggle = { enabled: boolean; intensity: number };

export type AsciiConfig = {
  renderMode: RenderMode;
  cellSize: number;
  /** 0–100: fração de células desenhadas. */
  coverage: number;
  /** 0–100: corta as células mais escuras que este limiar. */
  density: number;
  invert: boolean;
  /** 0–100: reforça as células onde o gradiente local é alto. */
  edgeEmphasis: number;

  /**
   * Curva aplicada à luz antes de brilho e contraste (1 = neutra). Abaixo de 1
   * levanta os médios: é o que traz a pedra cinzenta da escultura para a
   * trama em tinta, onde só os brilhos sobreviviam.
   */
  gamma?: number;
  /**
   * 0–1: luz crua abaixo da qual a célula é papel. Separa o fundo preto da
   * foto da sombra da escultura, que é só um pouco mais clara que ele.
   */
  floor?: number;
  /**
   * Esvanecimento oval medido no retângulo da foto, não no do canvas: com
   * "contain" a foto é mais estreita que o quadro, e sem isto as bordas dela
   * ficavam vivas no meio da página.
   */
  photoVignette?: boolean;
  brightness: number; // −100..100
  contrast: number; // 0..200 (100 = neutro)
  saturation: number; // 0..200
  grayscale: number; // 0..100
  tint: string;
  tintOpacity: number; // 0..100
  overlayBlend: GlobalCompositeOperation;
  blurType: "off" | "gaussian";
  blurAmount: number;

  bgMode: "none" | "solid" | "photo" | "blur";
  /** Como a foto assenta na área: "contain" mostra tudo, "cover" preenche. */
  fit: "contain" | "cover";
  /** Origem do recorte em "cover", 0–1. 0.5 é o centro; 1 encosta à direita. */
  anchorX: number;
  anchorY: number;
  /** 0–100: pontos esparsos nas células vazias, a trama que preenche o fundo. */
  ambient: number;
  /** O risco de luz que atravessa a imagem. */
  streak: {
    enabled: boolean;
    /** Altura, 0–1 a contar do topo. */
    y: number;
    color: string;
    intensity: number;
  };
  bgOpacity: number;
  bgBlur: number;
  /** Cor usada quando bgMode é "solid". */
  bgColor: string;

  /**
   * Tinta sobre papel, como "r,g,b". Quando presente, cada célula é desenhada
   * nesta cor com opacidade proporcional à luz da foto — o que permite a
   * trama assentar em fundo claro sem virar um negativo cinzento.
   */
  ink?: string;

  charSet: "standard" | "blocks" | "minimal";
  customChars: string;

  animated: boolean;
  animStyle: AnimStyle;
  animSpeed: Toggle;
  animIntensity: Toggle;

  pfx: Partial<Record<
    | "scanLines"
    | "vignette"
    | "bloom"
    | "chromatic"
    | "filmGrain"
    | "glitch"
    | "halftone"
    | "pixelate"
    | "filmDust",
    Toggle
  >>;
};

export const CHARSETS: Record<string, string> = {
  standard: " .:-=+*#%@",
  blocks: " ░▒▓█",
  minimal: " .*#",
};

const BASE: AsciiConfig = {
  renderMode: "mosaic",
  cellSize: 16,
  coverage: 100,
  density: 0,
  invert: false,
  edgeEmphasis: 0,
  brightness: 0,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
  blurType: "off",
  blurAmount: 35,
  bgMode: "none",
  fit: "contain",
  anchorX: 0.5,
  anchorY: 0.5,
  ambient: 0,
  streak: { enabled: false, y: 0.42, color: "#e02728", intensity: 60 },
  bgOpacity: 90,
  bgBlur: 12,
  bgColor: "#0a0c11",
  charSet: "standard",
  customChars: "",
  animated: true,
  animStyle: "wave",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
  pfx: {},
};

/** Os presets: os dois transcritos do editor e a versão em tinta do hero. */
export const PRESETS: Record<"vignetteBloom" | "electricGaze" | "inkGaze", AsciiConfig> = {
  vignetteBloom: {
    ...BASE,
    fit: "cover",
    renderMode: "mosaic",
    cellSize: 16,
    contrast: 115,
    brightness: 12,
    bgMode: "solid",
    bgOpacity: 90,
    bgBlur: 12,
    animStyle: "wave",
    animSpeed: { enabled: true, intensity: 100 },
    animIntensity: { enabled: true, intensity: 60 },
    pfx: {
      bloom: { enabled: true, intensity: 25 },
      vignette: { enabled: true, intensity: 38 },
    },
  },
  electricGaze: {
    ...BASE,
    fit: "contain",
    renderMode: "dither",
    cellSize: 6,
    contrast: 158,
    brightness: 0,
    density: 20,
    bgMode: "none",
    ambient: 34,
    // O acento elétrico usa o vermelho da página, não o ciano de origem.
    // O risco de luz foi desligado: lido fora do contexto do editor,
    // parecia uma linha solta atravessando a página.
    streak: { enabled: false, y: 0.36, color: "#ff655a", intensity: 85 },
    animStyle: "shimmer",
    animSpeed: { enabled: true, intensity: 100 },
    animIntensity: { enabled: true, intensity: 60 },
    pfx: {},
  },
  /**
   * O electricGaze impresso: a mesma trama de dither, em tinta quente sobre
   * o papel da página. A luz da escultura vira ponto de tinta e o fundo
   * escuro da foto desaparece — a figura sai do papel, não de uma caixa.
   */
  inkGaze: {
    ...BASE,
    fit: "contain",
    renderMode: "dots",
    cellSize: 4,
    // Gravura em positivo: a sombra vira ponto grande, a luz vira papel, e o
    // fundo preto da foto (p25 = 12/255) também vira papel pelo `floor`.
    // A pedra (30–90) fica no meio da curva, onde o ponto desenha o volume.
    gamma: 0.6,
    contrast: 125,
    brightness: 2,
    invert: true,
    floor: 0.075,
    photoVignette: true,
    density: 10,
    bgMode: "none",
    ambient: 0,
    ink: "33,30,22",
    animStyle: "shimmer",
    animSpeed: { enabled: true, intensity: 80 },
    animIntensity: { enabled: true, intensity: 45 },
    pfx: {},
  },
};
