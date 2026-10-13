"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { HERO, PROFILE, ROLE } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { AsciiArt } from "@/components/ui/ascii-art";
import { PRESETS } from "@/lib/ascii";
import { VyroMark } from "@/components/vyro-mark";

/** A entrada é CSS: animação cancelada nunca deixa o conteúdo preso invisível. */
const rise = (delay: number) =>
  ({ "--rise-delay": `${delay}s` }) as CSSProperties;

/**
 * As três figuras, na ordem em que se dissolvem uma na outra durante o scroll.
 * Recortadas dos pôsteres para deixar de fora a tipografia deles.
 */
const FIGURES = [
  "/hero/angel-1.webp",
  "/hero/angel-2.webp",
  "/hero/angel-3.webp",
];

/**
 * Painel fixo com o dobro da altura: a figura fica presa no ecrã enquanto a
 * página rola, e as três imagens dissolvem-se dentro da própria trama. Em
 * papel claro a trama é tinta: a luz da escultura vira ponto escuro, e a
 * figura sai do fundo em vez de ser uma imagem colada nele.
 */
export function Hero() {
  const t = useT();
  const { lang } = useLang();
  const hero = t(HERO);
  const role = t(ROLE);
  const reduced = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 0 → 1 → 2: o índice da figura, amaciado para o dissolve não engasgar
  const raw = useTransform(scrollYProgress, [0.08, 0.92], [0, FIGURES.length - 1]);
  const blend = useSpring(raw, { stiffness: 80, damping: 26, mass: 0.5 });

  const textFade = useTransform(scrollYProgress, [0, 0.45, 0.72], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const cueFade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        {/* A máscara elíptica faz a trama emergir do papel: sem ela a área
            desenhada termina num retângulo de aresta viva. */}
        {/* No celular o texto ocupa a largura toda e passa por cima da
            figura: ela recua para marca-d'água. */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-20 opacity-30 lg:opacity-100"
          style={{
            ...(reduced ? {} : { scale: fieldScale }),
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 76% at 72% 50%, #000 34%, rgba(0,0,0,0.5) 62%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 60% 76% at 72% 50%, #000 34%, rgba(0,0,0,0.5) 62%, transparent 100%)",
          }}
        >
          <AsciiArt
            src={FIGURES}
            blend={reduced ? undefined : blend}
            alt={
              lang === "pt"
                ? "Escultura de anjo tramada ao vivo em pontos de tinta"
                : "Angel sculpture dithered live in ink dots"
            }
            config={{
              ...PRESETS.inkGaze,
              // fonte em retrato dentro de um painel em paisagem: "contain"
              // mostra a figura inteira; "cover" ampliava-a até só sobrar textura
              anchorX: 0.8,
            }}
            className="h-full w-full"
          />
        </motion.div>

        {/* Véu de papel: garante o contraste do texto sobre a trama. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(100deg, var(--base) 0%, color-mix(in oklch, var(--base) 88%, transparent) 38%, transparent 70%)",
          }}
        />

        <motion.div
          className="mx-auto w-full max-w-[1320px] px-5 pt-16 sm:px-8"
          style={reduced ? undefined : { y: textY, opacity: textFade }}
        >
          <div className="lg:max-w-[60%]">
            <div
              className="rise flex flex-wrap items-center gap-x-4 gap-y-3"
              style={rise(0)}
            >
              <a
                href={PROFILE.vyro}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line-2 bg-base/80 py-1.5 pl-1.5 pr-3.5 text-[0.82rem] text-ink backdrop-blur-sm transition-colors duration-200 hover:border-ink"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-base">
                  <VyroMark size={13} strokeWidth={7} />
                </span>
                {hero.founder}
                <span
                  aria-hidden="true"
                  className="text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
              <span className="type-mono text-[0.66rem] text-ink-3">
                {hero.kicker}
              </span>
            </div>

            <p
              className="rise type-title mt-10 text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] text-ink-2"
              style={rise(0.05)}
            >
              {PROFILE.name}
            </p>

            <h1
              className="rise type-display mt-3 text-[clamp(2.9rem,1.2rem+5.4vw,6rem)] text-ink"
              style={rise(0.09)}
            >
              {hero.line1} {hero.line2}{" "}
              <span className="text-signal">{hero.line3}.</span>
            </h1>

            <p
              className="rise measure mt-8 text-[clamp(1.02rem,0.95rem+0.35vw,1.2rem)] leading-[1.6] text-ink-2"
              style={rise(0.16)}
            >
              {hero.body}
            </p>

            <p
              className="rise type-mono mt-6 text-[0.64rem] leading-[1.9] text-ink-3"
              style={rise(0.2)}
            >
              <span className="text-ink">{role.title}</span> · {role.org} ·{" "}
              {role.squad}
            </p>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-3"
              style={rise(0.26)}
            >
              <a href="#oficio" className="btn btn-solid">
                {hero.ctaWork}
                <span aria-hidden="true">↓</span>
              </a>
              <a href={`mailto:${PROFILE.email}`} className="btn btn-line">
                {hero.ctaMail}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.p
          aria-hidden="true"
          className="type-mono absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[0.6rem] text-ink-3 sm:block"
          style={reduced ? undefined : { opacity: cueFade }}
        >
          {lang === "pt" ? "Role" : "Scroll"} ↓
        </motion.p>
      </div>
    </section>
  );
}
