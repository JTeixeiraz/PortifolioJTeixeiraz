import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import { Grain } from "@/components/grain";
import "./globals.css";

// Uma família só, em dois desenhos: a Geist faz título e corpo, a Mono faz
// rótulo e número. É o mesmo par da VYRO, de propósito — o portfólio e a
// empresa leem como a mesma mão.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
      "O que eu faço dentro de uma squad de engenharia: automatizar processo manual, ligar sistema que não conversa, e desenhar onde a automação para.",
    type: "profile",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">
        <LangProvider>
          <a
            href="#conteudo"
            className="btn btn-solid sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            style={{ zIndex: "var(--z-overlay)" }}
          >
            Pular para o conteúdo
          </a>
          {children}
          <Grain />
        </LangProvider>
      </body>
    </html>
  );
}
