import { AI_PRACTICES } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Pic } from "@/components/pic";
import { Spark } from "@/components/spark";

const TONES = ["tile-panel", "tile-void", "tile-void", "tile-panel"] as const;

/**
 * IA. O gato carregando sobre o código é a piada que abre a seção — e a
 * verdade dela: a parte difícil de trabalhar com agente é o contexto que ele
 * carrega. Ao lado, as quatro práticas, cada uma com o artefato que a prova.
 */
function AiBody({ t, lang }: { t: T; lang: Lang }) {

  return (
    <section aria-labelledby={`ai-heading-${lang}`} className="wrap relative mt-24 lg:mt-32">
      <div className="px-2 sm:px-3">
        <SectionHeading id={`ai-heading-${lang}`} slot="04">
          {lang === "pt" ? "Agente com contexto, não com sorte." : "Agents with context, not luck."}
        </SectionHeading>
      </div>

      <div className="offscreen mt-10 grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* o gato */}
        <figure className="in-zoom tile bite-tl relative min-h-[28rem] [--b:64px] lg:col-span-5 lg:row-span-2 lg:min-h-0">
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
        <div className="swipe -mx-[clamp(10px,1.4vw,28px)] md:mx-0 md:grid md:grid-cols-2 md:gap-3 lg:col-span-7">
          {AI_PRACTICES.map((p, n) => (
            <article
              key={p.id}
              className={`in-right tile ${TONES[n]} flex flex-col p-6 sm:p-7 ${n === 1 ? "rounded-[28px_80px_28px_28px]" : n === 2 ? "rounded-[28px_28px_28px_80px]" : ""}`}
            >
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
      <Pic
        id="tat-moon-angel"
        alt=""
        sizes="(min-width: 768px) 10vw, 26vw"
        className="drift pointer-events-none absolute -top-24 right-[2%] z-[5] block w-[26vw] max-w-[8rem] [--r0:6deg] [--r1:-6deg] md:w-[9vw] md:max-w-none"
        imgClassName="ink-white h-auto w-full opacity-80"
      />
    </section>
  );
}

export function Ai() {
  return (
    <div id="ia">
      <Bi>{(t, lang) => <AiBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
