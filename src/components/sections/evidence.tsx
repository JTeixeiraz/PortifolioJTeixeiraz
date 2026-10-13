"use client";

import { EVIDENCE, LABELS } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * As histórias que provam julgamento, não execução. Fichas simples sobre o
 * papel, porque esta seção é uma nota de rodapé honesta do resto da página:
 * cada número tem origem, e as falhas silenciosas contam mais que os acertos.
 */
export function Evidence() {
  const t = useT();
  const labels = t(LABELS);
  const rows = t(EVIDENCE);

  return (
    <section
      id="evidencia"
      className="relative"
      aria-labelledby="evidence-heading"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading id="evidence-heading" index="008">
          {labels.evidence}
        </SectionHeading>

        <Reveal>
          <p className="measure mt-10 text-[clamp(1rem,0.95rem+0.3vw,1.12rem)] leading-[1.65] text-ink-2">
            {t({
              pt: "Nenhum número desta página foi estimado. Cada um veio de uma consulta, de um log ou de uma contagem — e as histórias abaixo são as que eu levo para entrevista, porque falam de julgamento e não de execução.",
              en: "No number on this page was estimated. Each came from a query, a log or a count — and the stories below are the ones I take into interviews, because they are about judgment rather than execution.",
            })}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {rows.map((row, i) => (
            <Reveal key={row.claim} delay={i * 0.05} className="h-full">
              <article className="flex h-full flex-col rounded-[18px] border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-2 sm:p-7">
                <p className="type-mono text-[0.6rem] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="type-title mt-5 text-[1.15rem] text-ink">
                  {row.claim}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-[1.7] text-ink-2">
                  {row.how}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
