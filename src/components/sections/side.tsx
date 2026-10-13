import { SIDE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import type { ImageId } from "@/lib/images";
import { SectionHeading } from "@/components/section-heading";
import { Blur, Pic } from "@/components/pic";

/** A arte de cada projeto no painel grande. */
const ART: Record<string, ImageId> = {
  birdy: "koi",
  lumi: "nana",
  postly: "night-tokyo",
  induxai: "bronze-liquid",
  dcars: "night-car-1",
  portify: "chrome-white",
};

/**
 * Projetos na cena do "Oni": o pôster do Evangelion desfocado ao fundo, um
 * painel grande com o projeto escolhido e a coluna em pílula "mais projetos"
 * com as miniaturas. A troca é CSS puro — rádios + :has() (ver .proj no
 * globals.css) —, então só um projeto aparece por vez e a página não vira
 * uma parede de texto. No celular as miniaturas viram uma fileira de deslize.
 */
function SideBody({ t, lang }: { t: T; lang: Lang }) {
  const group = `proj-${lang}`;

  return (
    <section aria-labelledby={`side-heading-${lang}`} className="wrap relative mt-24 lg:mt-32">
      <SectionHeading id={`side-heading-${lang}`} slot="05" className="px-2 sm:px-3">
        {lang === "pt" ? "A ficha técnica de cada um." : "The spec sheet of each one."}
      </SectionHeading>

      <div className="proj in-scene tile relative mt-10 overflow-hidden rounded-[var(--r-frame)] border border-line p-3 sm:p-5 lg:p-6">
        <Blur id="evangelion" className="absolute inset-0 -z-20 h-full w-full scale-110" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgb(7_8_14/0.55)]" />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-4">
          {/* o painel grande */}
          <div className="relative min-h-[36rem] lg:min-h-[40rem]">
            {SIDE.map((item) => (
              <article
                key={item.id}
                data-panel={item.id}
                className="bite-tr absolute inset-0 overflow-hidden rounded-[30px] [--b:52px]"
              >
                <Pic
                  id={ART[item.id]}
                  alt=""
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="absolute inset-0 -z-10 block"
                  imgClassName="h-full w-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_8_14/0.25),rgb(7_8_14/0.1)_40%,rgb(7_8_14/0.92))]" />

                {/* nota de vidro: o resumo */}
                <div className="glass absolute left-4 right-4 top-4 rounded-[22px] p-5 sm:left-6 sm:right-auto sm:top-6 sm:max-w-[26rem]">
                  <p className="t-mono text-[0.5rem] leading-[1.6] text-text-3">{t(item.tag)}</p>
                  <p className="mt-2 text-[0.9rem] leading-[1.6] text-text">{t(item.summary)}</p>
                </div>

                {/* nota de vidro: a stack */}
                <div className="glass absolute right-6 top-[46%] hidden max-w-[16rem] rounded-[22px] p-4 md:block">
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <li key={s} className="rounded-full bg-white/10 px-2.5 py-1 text-[0.72rem] text-text">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* o nome grande, como "THE GREAT ONI" */}
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                  <h3 className="t-display text-[clamp(2.6rem,1.4rem+4.4vw,5.6rem)] leading-[0.88] text-white">
                    {item.name}
                  </h3>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <details className="group">
                      <summary className="press inline-flex h-11 cursor-pointer list-none items-center gap-2 rounded-full bg-white px-5 text-[0.85rem] font-medium text-void [&::-webkit-details-marker]:hidden">
                        <span className="transition-transform duration-200 group-open:rotate-45">+</span>
                        {lang === "pt" ? "Ficha técnica" : "Spec sheet"}
                      </summary>
                      <ul className="glass absolute bottom-16 left-0 right-0 max-h-[55vh] space-y-3 overflow-y-auto rounded-[22px] p-5 sm:right-auto sm:max-w-[34rem]">
                        {t(item.points).map((p, k) => (
                          <li key={k} className="flex gap-3 text-[0.86rem] leading-[1.6] text-text-2">
                            <span aria-hidden="true" className="mt-[0.55rem] h-1 w-3 shrink-0 rounded-full bg-cobalt-2" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                    {item.link ? (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-[0.85rem] text-white hover:bg-white/10"
                      >
                        {t(item.link.label)} <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* a coluna em pílula: mais projetos */}
          {/* os rádios moram dentro das miniaturas: o estado da cena sem
              JavaScript, e o foco fica onde o clique aconteceu */}
          <fieldset className="glass-bone order-first flex min-w-0 gap-2 overflow-x-auto rounded-[30px] p-2.5 [scrollbar-width:none] lg:order-none lg:flex-col lg:items-center lg:overflow-visible lg:rounded-full lg:px-3 lg:py-8">
            <legend className="sr-only">{lang === "pt" ? "Escolha um projeto" : "Pick a project"}</legend>
            <p aria-hidden="true" className="t-title hidden text-center text-[1.05rem] leading-tight text-bone-ink lg:block">
              {lang === "pt" ? "Mais projetos" : "More projects"}
            </p>
            {SIDE.map((item, n) => (
              <label
                key={item.id}
                data-for={item.id}
                className="press relative flex shrink-0 cursor-pointer items-center gap-3 rounded-[20px] p-1.5 pr-4 text-bone-ink lg:w-full lg:flex-col lg:gap-2 lg:pr-1.5"
              >
                <input
                  type="radio"
                  name={group}
                  value={item.id}
                  defaultChecked={n === 0}
                  className="sr-only"
                />
                <span className="relative block h-14 w-14 overflow-hidden rounded-[16px] lg:h-[4.4rem] lg:w-[4.4rem]">
                  <Pic
                    id={ART[item.id]}
                    alt=""
                    sizes="80px"
                    className="block h-full w-full"
                    imgClassName="h-full w-full object-cover"
                  />
                </span>
                <span className="t-mono text-[0.55rem] lg:text-center">{item.name}</span>
              </label>
            ))}
          </fieldset>
        </div>
      </div>
    </section>
  );
}

export function Side() {
  return (
    <div id="fora">
      <Bi>{(t, lang) => <SideBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
