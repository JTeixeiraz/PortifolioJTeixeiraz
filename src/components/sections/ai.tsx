"use client";

import { AI_PRACTICES, LABELS } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Pic } from "@/components/pic";
import { Spark } from "@/components/spark";

const TONES = ["tile-panel", "tile-void", "tile-void", "tile-panel"] as const;

/**
 * IA. O gato carregando sobre o código é a piada que abre a seção — e a
 * verdade dela: a parte difícil de trabalhar com agente é o contexto que ele
 * carrega. Ao lado, as quatro práticas, cada uma com o artefato que a prova.
 */
export function Ai() {
  const t = useT();
  const { lang } = useLang();
  const labels = t(LABELS);

  return (
    <section id="ia" aria-labelledby="ai-heading" className="offscreen mx-auto mt-24 max-w-[1400px] px-3 sm:px-5 lg:mt-32">
      <div className="px-2 sm:px-3">
        <SectionHeading id="ai-heading" slot="04" label={labels.ai}>
          {lang === "pt" ? "Agente com contexto, não com sorte." : "Agents with context, not luck."}
        </SectionHeading>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* o gato */}
        <figure className="reveal tile relative min-h-[28rem] lg:col-span-5 lg:row-span-2 lg:min-h-0">
          <Pic
            id="loading-cat"
            alt={
              lang === "pt"
                ? "Gato desenhado com um ícone de carregamento na cabeça, sobre um fundo de código do kernel"
                : "Illustrated cat with a loading spinner on its head, over a background of kernel code"
            }
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="absolute inset-0 -z-10 block"
            imgClassName="h-full w-full object-cover object-[50%_100%]"
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgb(7_8_14/0.85),transparent)]" />
          <figcaption className="absolute inset-x-5 top-5">
            <p className="t-title text-[1.15rem] text-text">
              {lang === "pt" ? "Eu, quando o agente pede mais contexto." : "Me, when the agent asks for more context."}
            </p>
          </figcaption>
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-[#07080e]/80 p-4 backdrop-blur-sm">
            <p className="t-mono flex items-center justify-between text-[0.55rem] text-text-2">
              <span>{lang === "pt" ? "Carregando contexto" : "Loading context"}</span>
              <span className="text-text">87%</span>
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[87%] origin-left rounded-full bg-[linear-gradient(90deg,var(--cobalt),#36e4ff)]" />
            </div>
          </div>
        </figure>

        {/* as quatro práticas */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:col-span-7">
          {AI_PRACTICES.map((p, n) => (
            <article key={p.id} className={`reveal tile ${TONES[n]} flex flex-col p-6 sm:p-7`}>
              <p className="t-mono flex items-center gap-2 text-[0.55rem] text-text-3">
                <Spark size={9} className="text-cobalt-2" />
                {String(n + 1).padStart(2, "0")} · {t(p.label)}
              </p>
              <h3 className="t-title mt-4 text-[1.2rem] text-text">{t(p.title)}</h3>
              <p className="mt-3 flex-1 text-[0.9rem] leading-[1.65] text-text-2">{t(p.body)}</p>
              <p className="mt-5 rounded-2xl border border-line bg-void/50 p-4 text-[0.82rem] leading-[1.6] text-text">
                {t(p.proof)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
