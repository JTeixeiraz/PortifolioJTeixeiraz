import type { ReactNode } from "react";
import { VMM, VMM_AGENTS } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Pic } from "@/components/pic";
import { IMAGES } from "@/lib/images";
import { Spark } from "@/components/spark";

/** Onde cada captura cai no bento do desktop, e a altura da janela na linha. */
const SHOT_SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
const SHOT_H = ["lg:h-[25rem]", "lg:h-[25rem]", "lg:h-[15rem]", "lg:h-[15rem]", "lg:h-[15rem]"];

/** Janela de navegador mínima em volta de uma captura: três pontos e o endereço. */
function Frame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line-2 bg-void">
      <div className="flex h-8 items-center gap-3 border-b border-line px-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="t-mono truncate rounded-full bg-white/[0.06] px-3 py-1 text-[0.46rem] normal-case tracking-[0.06em] text-text-3">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/**
 * O caso do painel interno de marketing: o sistema de quatro agentes que toca o
 * marketing dos produtos dele. A captura do Estúdio abre o bento ao lado dos
 * agentes; o ciclo vem numa faixa; as outras telas do painel ficam numa
 * grade (carrossel no celular); a arquitetura e os números fecham.
 */
function VmmBody({ t, lang }: { t: T; lang: Lang }) {
  const v = t(VMM);
  const host = "painel interno";

  return (
    <section aria-labelledby={`vmm-heading-${lang}`} className="wrap relative mt-24 lg:mt-32">
      <SectionHeading id={`vmm-heading-${lang}`} slot="05" className="px-2 sm:px-3">
        {v.heading}
      </SectionHeading>

      <div className="mt-6 grid grid-cols-1 gap-5 px-2 sm:px-3 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="t-mono flex items-center gap-2 text-[0.55rem] text-text-3">
            <Spark size={9} className="text-cobalt-2" />
            {v.tag}
          </p>
          <p className="measure mt-4 text-[1rem] leading-[1.65] text-text-2">{v.lead}</p>
        </div>
        <p className="self-end rounded-2xl border border-line bg-void/50 p-5 text-[0.92rem] leading-[1.6] text-text lg:col-span-5">
          {v.why}
        </p>
      </div>

      {/* o Estúdio e os quatro agentes */}
      <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-12">
        <figure className="in-zoom tile tile-void rounded-[var(--r-frame)] p-2 sm:p-3 lg:col-span-8">
          <Frame url={host}>
            <Pic
              id="vmm-estudio"
              alt={
                lang === "pt"
                  ? "O Estúdio: uma sala 3D com os quatro agentes em suas mesas e um painel com o estado do ciclo do The Simple Trip"
                  : "The Studio: a 3D room with the four agents at their desks and a screen showing The Simple Trip's cycle state"
              }
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="block"
              imgClassName="block h-auto w-full"
            />
          </Frame>
          <figcaption className="px-3 pb-2 pt-4 text-[0.88rem] leading-[1.6] text-text-2">{v.studio}</figcaption>
        </figure>

        <div className="in-right tile tile-panel rounded-[28px_80px_28px_28px] p-6 sm:p-7 lg:col-span-4">
          <p className="t-mono text-[0.55rem] text-text-3">{v.agentsTitle}</p>
          <ul className="mt-6 space-y-6">
            {VMM_AGENTS.map((a) => (
              <li key={a.id}>
                <p className="flex items-baseline justify-between gap-3">
                  <span className="t-title flex items-center gap-2.5 text-[1.02rem] text-text">
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: a.color }} />
                    {a.name}
                  </span>
                  <span className="t-mono shrink-0 text-[0.5rem] text-text-3">{a.model}</span>
                </p>
                <p className="mt-2 text-[0.85rem] leading-[1.6] text-text-2">{t(a.body)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* o ciclo */}
      <div className="in-tilt tile tile-panel mt-3 p-6 sm:p-8">
        <p className="t-mono text-[0.55rem] text-text-3">{v.cycleTitle}</p>
        <ol className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-6">
          {v.cycle.map((step) => (
            <li key={step.k} className="border-t border-line-2 pt-4">
              <span className="t-mono text-[0.55rem] text-cobalt-2">{step.k}</span>
              <h3 className="t-title mt-2 text-[1rem] text-text">{step.title}</h3>
              <p className="mt-2 text-[0.84rem] leading-[1.6] text-text-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* as outras telas do painel */}
      <ul className="swipe -mx-[clamp(10px,1.4vw,28px)] mt-3 md:mx-0 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-12">
        {v.shots.map((s, n) => (
          <li key={s.id} className={`in-deal ${SHOT_SPAN[n]} ${n === v.shots.length - 1 ? "md:col-span-2 lg:col-span-4" : ""}`}>
            <figure className="tile tile-void flex h-full flex-col rounded-[28px] p-2">
              {/* a captura inteira abre noutra aba: a miniatura mostra o canto, o arquivo mostra tudo */}
              <a
                href={`/img/${s.id}-${IMAGES[s.id].width}.webp`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.title}: ${lang === "pt" ? "abrir a captura inteira" : "open the full capture"}`}
                className="press block rounded-[20px]"
              >
                <Frame url={host}>
                  <div className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto ${SHOT_H[n]}`}>
                    <Pic
                      id={s.id}
                      alt={s.alt}
                      sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 85vw"
                      className="absolute inset-0 block"
                      imgClassName="h-full w-full object-cover object-left-top"
                    />
                  </div>
                </Frame>
              </a>
              <figcaption className="px-3 pb-3 pt-4">
                <span className="t-title block text-[0.98rem] text-text">{s.title}</span>
                <span className="mt-1.5 block text-[0.84rem] leading-[1.6] text-text-2">{s.body}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* como está montado, e quanto custa */}
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="in-left tile tile-panel p-6 sm:p-8 lg:col-span-7">
          <p className="t-mono text-[0.55rem] text-text-3">{v.archTitle}</p>
          <dl className="mt-4 divide-y divide-line">
            {v.arch.map((row) => (
              <div key={row.k} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-5">
                <dt className="t-mono pt-1 text-[0.55rem] text-cobalt-2">{row.k}</dt>
                <dd className="text-[0.88rem] leading-[1.6] text-text-2">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="in-right tile tile-cobalt bite-tr flex flex-col justify-between gap-10 p-6 [--b:56px] sm:p-8 lg:col-span-5">
          <ul className="space-y-7">
            {v.numbers.map((num) => (
              <li key={num.value}>
                <span className="t-display chrome-text block text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none">
                  {num.value}
                </span>
                <span className="t-mono mt-2.5 block text-[0.55rem] leading-[1.7] text-white/80">{num.label}</span>
              </li>
            ))}
          </ul>
          <p className="text-[0.86rem] leading-[1.6] text-white/85">{v.honest}</p>
        </div>
      </div>
    </section>
  );
}

export function Vmm() {
  return (
    <div id="vmm">
      <Bi>{(t, lang) => <VmmBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
