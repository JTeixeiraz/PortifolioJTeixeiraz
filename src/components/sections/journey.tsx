"use client";

import { JOURNEY, LABELS } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * A jornada. Três colunas lado a lado, e não uma escada vertical: as três
 * frentes correm ao mesmo tempo, e uma linha do tempo empilhada leria como
 * sucessão — como se uma tivesse acabado para a outra começar.
 *
 * A nota de rodapé diz o vínculo de estágio. Fica em baixo e em corpo
 * pequeno, mas não em cinzento ilegível: é uma nota, não uma letra miúda.
 */
export function Journey() {
  const t = useT();
  const labels = t(LABELS);
  const journey = t(JOURNEY);

  return (
    <section
      id="jornada"
      className="relative isolate border-t border-line"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          id="journey-heading"
          index="003"
          aside={`01 — 0${journey.rows.length}`}
        >
          {labels.journey}
        </SectionHeading>

        <Reveal>
          <p className="measure mt-8 text-[1rem] leading-[1.68] text-ink-2">
            {journey.lead}
          </p>
        </Reveal>

        {/* A régua marca o paralelismo: uma linha só, três entradas nela. */}
        <div
          aria-hidden="true"
          className="mt-12 hidden h-px w-full bg-line lg:block"
        />

        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-14">
          {journey.rows.map((row, i) => (
            <Reveal key={row.org} delay={i * 0.06}>
              <article className="relative pt-8 lg:pt-10">
                {/* marca na régua, alinhada ao topo da coluna */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 hidden h-3 w-px bg-signal lg:block"
                />

                <p className="type-mono text-[0.62rem] text-signal-lite">
                  {row.period}
                </p>

                <h3 className="type-title mt-4 text-[clamp(1.35rem,1.1rem+1vw,1.85rem)] text-ink">
                  {row.role}
                </h3>

                <p className="type-mono mt-2 text-[0.6rem] text-ink-3">
                  {row.org}
                </p>

                <p className="mt-5 text-[0.94rem] leading-[1.7] text-ink-2">
                  {row.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-14 border-t border-line pt-6 text-[0.8rem] leading-[1.6] text-ink-3">
            {journey.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
