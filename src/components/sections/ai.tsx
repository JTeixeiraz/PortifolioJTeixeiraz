"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { AI_PRACTICES, LABELS } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * A seção de IA tem o seu próprio ritmo: um painel fixo que troca de prática
 * conforme o leitor desce, sobre a superfície mais quente da página. Quatro
 * práticas, cada uma com o artefacto que a sustenta.
 */
export function Ai() {
  const t = useT();
  const labels = t(LABELS);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(
      Math.min(AI_PRACTICES.length - 1, Math.max(0, Math.floor(p * AI_PRACTICES.length))),
    );
  });

  const current = AI_PRACTICES[active];

  return (
    <section
      id="ia"
      ref={ref}
      className="relative border-y border-line bg-surface"
      style={{ height: `${AI_PRACTICES.length * 90}vh` }}
      aria-labelledby="ai-heading"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
          <SectionHeading
            id="ai-heading"
            index="005"
            aside={`0${active + 1} — 0${AI_PRACTICES.length}`}
          >
            {labels.ai}
          </SectionHeading>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
            {/* índice: marca em qual prática o leitor está */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-3">
              {AI_PRACTICES.map((p, i) => (
                <li key={p.id}>
                  <span
                    className={`type-mono text-[0.66rem] transition-all duration-500 ${
                      i === active
                        ? "text-signal-lite lg:translate-x-1"
                        : "text-ink-3"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} {t(p.label)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="min-w-0">
              {/* key força a troca de conteúdo a re-entrar com a animação */}
              <div key={current.id} className="rise">
                <h3 className="type-display max-w-[18ch] text-[clamp(1.9rem,1.2rem+2.4vw,3.4rem)] text-ink">
                  {t(current.title)}
                </h3>
                <p className="measure mt-6 text-[1rem] leading-[1.68] text-ink-2">
                  {t(current.body)}
                </p>
                <div className="mt-8 max-w-[62ch] rounded-[16px] border border-line bg-base p-6 sm:p-7">
                  <p className="text-[0.92rem] leading-[1.7] text-ink">
                    {t(current.proof)}
                  </p>
                </div>
              </div>

              <Reveal delay={0.1}>
                <p className="type-mono mt-10 text-[0.6rem] text-ink-3">
                  {t({
                    pt: "Role para percorrer as quatro",
                    en: "Scroll through all four",
                  })}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
