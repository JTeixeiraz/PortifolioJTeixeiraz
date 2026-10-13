"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { CRAFT, LABELS } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/scroll";

/**
 * O ofício. Seis coisas que ele faz dentro da squad, cada uma seguida do
 * exemplo real que a sustenta.
 *
 * O layout mudou de seis linhas em três colunas (número | texto | exemplo)
 * para um índice fixo à esquerda e uma coluna única de leitura à direita: a
 * versão antiga apertava o texto em duas colunas estreitas e deixava um
 * trilho de números a fazer sozinho o trabalho de orientação. Agora o índice
 * mostra onde o leitor está com o título por extenso, e a entrada ativa
 * acende a própria margem — a marcação e o conteúdo são a mesma coisa.
 */
export function Craft() {
  const t = useT();
  const labels = t(LABELS);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(
      Math.min(CRAFT.length - 1, Math.max(0, Math.floor(p * CRAFT.length))),
    );
  });

  return (
    <section
      id="oficio"
      className="relative border-t border-line"
      aria-labelledby="craft-heading"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          id="craft-heading"
          index="004"
          aside={`0${active + 1} — 0${CRAFT.length}`}
        >
          {labels.craft}
        </SectionHeading>

        <div
          ref={ref}
          className="mt-10 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-20"
        >
          {/* Índice: acompanha o leitor pela série e diz o nome, não só o
              número. Fixo só onde há altura para o justificar. */}
          <div className="lg:sticky lg:top-[18vh] lg:self-start">
            <p
              aria-hidden="true"
              className="type-display text-[clamp(3.5rem,2rem+6vw,6.5rem)] leading-[0.85] text-ink"
            >
              {String(active + 1).padStart(2, "0")}
            </p>

            <ol className="mt-7 hidden gap-2.5 lg:flex lg:flex-col">
              {CRAFT.map((c, i) => (
                <li key={c.id}>
                  <span
                    className={`type-mono block text-[0.62rem] leading-[1.5] transition-all duration-500 ${
                      i === active
                        ? "translate-x-1 text-signal-lite"
                        : "text-ink-3"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} &nbsp;{t(c.title)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0">
            {CRAFT.map((item, i) => {
              const example = t(item.example);
              return (
                <Reveal key={item.id} delay={0.03}>
                  {/* A margem esquerda é a marcação: acende na entrada ativa. */}
                  <article
                    className={`border-l py-9 pl-6 transition-colors duration-500 sm:pl-9 lg:py-12 ${
                      i === active ? "border-signal" : "border-line"
                    }`}
                  >
                    <p
                      className={`type-mono text-[0.62rem] transition-colors duration-500 ${
                        i === active ? "text-signal-lite" : "text-ink-3"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>

                    <h3 className="type-title mt-4 max-w-[24ch] text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] text-ink">
                      {t(item.title)}
                    </h3>

                    {/* Em ecrã largo o exemplo assenta ao lado do texto, não
                        debaixo: empilhado, deixava metade da seção vazia. */}
                    <div className="mt-5 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] xl:gap-10">
                      <p className="measure text-[1rem] leading-[1.68] text-ink-2">
                        {t(item.body)}
                      </p>

                      {/* O exemplo desliza a um ritmo próprio do da coluna. */}
                      <Parallax distance={16} className="min-w-0">
                        <div className="rounded-[16px] border border-line bg-surface p-6 sm:p-7">
                          <p className="type-mono mb-4 text-[0.62rem] text-signal-lite">
                            {example.label}
                          </p>
                          <p className="text-[0.92rem] leading-[1.7] text-ink-2">
                            {example.text}
                          </p>
                        </div>
                      </Parallax>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
