import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Unbounded, UnifrakturMaguntia } from "next/font/google";
import { LANG_BODY_SCRIPT, LANG_HEAD_SCRIPT } from "@/lib/i18n";
import "./globals.css";

// Unbounded: larga e arredondada, o título de capa de jogo de 2004.
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

// Blackletter só em ornamento — números de prancha e uma palavra solta.
// Não é crítica para o primeiro quadro, então não é pré-carregada.
const goth = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-goth",
  display: "swap",
  preload: false,
});

// Rótulos pequenos: troca de fonte sem custo visível, então não compete com
// a imagem do LCP pelo pré-carregamento.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
  preload: false,
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Pedro Teixeira — Desenvolvedor Full Stack",
  description:
    "Desenvolvedor full stack na squad de Engenharia de Software da XP Educação e fundador da VYRO, a empresa por trás de Birdy, LUMI e Postly. Belo Horizonte.",
  authors: [{ name: "João Pedro Teixeira", url: "https://github.com/JTeixeiraz" }],
  openGraph: {
    title: "João Pedro Teixeira — Desenvolvedor Full Stack",
    description:
      "Sistemas que não podem cair: automação, integrações, agentes de IA com coleira e três produtos no ar pela VYRO.",
    type: "profile",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-lang="pt"
      // o script do <head> troca lang/data-lang antes da pintura
      suppressHydrationWarning
      className={`${unbounded.variable} ${goth.variable} ${mono.variable} ${geist.variable}`}
    >
      <head>
        <script id="jpt-lang-head" dangerouslySetInnerHTML={{ __html: LANG_HEAD_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="t-mono sr-only rounded-full bg-cobalt px-5 py-3 text-[0.7rem] text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          style={{ zIndex: 60 }}
        >
          Pular para o conteúdo · Skip to content
        </a>
        {children}
        <script id="jpt-lang-body" dangerouslySetInnerHTML={{ __html: LANG_BODY_SCRIPT }} />
      </body>
    </html>
  );
}
