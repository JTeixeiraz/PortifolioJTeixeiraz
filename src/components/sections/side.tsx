"use client";

import { LABELS, SIDE } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Projetos, na versão de engenharia: o que a seção da VYRO mostra como
 * produto, aqui aparece como decisão técnica. Cada projeto é uma linha da
 * pauta — o nome fica preso à esquerda enquanto o texto corre à direita, para
 * quem rola nunca perder de qual projeto está lendo.
 */
export function Side() {
  const t = useT();
  const labels = t(LABELS);

  return (
    <section id="fora" className="relative" aria-labelledby="side-heading">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          id="side-heading"
          index="006"
          aside={`01 — 0${SIDE.length}`}
        >
          {labels.side}
        </SectionHeading>

        <div className="divide-y divide-line">
          {SIDE.map((item, i) => (
            <Reveal key={item.id} delay={0.02}>
              <article className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 lg:py-16">
                <header className="lg:sticky lg:top-24 lg:self-start">
                  <p className="type-mono text-[0.62rem] text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-display mt-3 text-[clamp(2.2rem,1.6rem+2vw,3.2rem)] text-ink">
                    {item.name}
                  </h3>
                  <p className="type-mono mt-4 text-[0.6rem] leading-[1.7] text-signal-lite">
                    {t(item.tag)}
                  </p>

                  {item.link ? (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-line mt-6 min-h-10 px-4 text-[0.86rem]"
                    >
                      {t(item.link.label)}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </header>

                <div className="min-w-0">
                  <p className="measure text-[clamp(1.02rem,0.96rem+0.3vw,1.16rem)] leading-[1.62] text-ink">
                    {t(item.summary)}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {t(item.points).map((p, k) => (
                      <li key={k} className="measure flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-[0.72rem] h-px w-4 shrink-0 bg-signal"
                        />
                        <span className="text-[0.95rem] leading-[1.7] text-ink-2">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line px-3 py-1 text-[0.78rem] text-ink-2"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
