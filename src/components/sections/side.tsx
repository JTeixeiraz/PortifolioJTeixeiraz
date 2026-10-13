import { SIDE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import type { ImageId } from "@/lib/images";
import { SectionHeading } from "@/components/section-heading";
import { Blur, Pic } from "@/components/pic";

/** A arte de cada projeto no painel grande, e onde ela ancora no recorte. */
const ART: Record<string, { id: ImageId; pos: string }> = {
  birdy: { id: "koi", pos: "object-[50%_50%]" },
  lumi: { id: "nana", pos: "object-[62%_18%]" },
  postly: { id: "crystal", pos: "object-[50%_50%]" },
  induxai: { id: "bronze-liquid", pos: "object-[50%_40%]" },
  dcars: { id: "tokyo-street", pos: "object-[50%_60%]" },
  portify: { id: "chrome-white", pos: "object-[50%_30%]" },
};

/**
 * Projetos na cena do "Oni": um fundo desfocado, um painel grande com o
 * projeto escolhido e um dock de vidro com as miniaturas no canto. A troca é CSS puro — rádios + :has() (ver .proj no
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
        <Blur id="goldfish" className="absolute inset-0 -z-20 h-full w-full scale-110" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgb(7_8_14/0.55)]" />

        <div className="relative flex flex-col gap-3">
          {/* o painel grande */}
          <div className="relative min-h-[36rem] lg:min-h-[40rem]">
            {SIDE.map((item) => (
              <article
                key={item.id}
                data-panel={item.id}
                className="bite-tr absolute inset-0 overflow-hidden rounded-[30px] [--b:52px]"
              >
                <Pic
                  id={ART[item.id].id}
                  alt=""
                  sizes="100vw"
                  className="absolute inset-0 -z-10 block"
                  imgClassName={`h-full w-full object-cover ${ART[item.id].pos}`}
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_8_14/0.25),rgb(7_8_14/0.1)_40%,rgb(7_8_14/0.92))]" />

                {/* nota de vidro: o resumo */}
                <div className="glass absolute left-4 right-4 top-4 rounded-[22px] p-5 sm:left-6 sm:right-auto sm:top-6 sm:max-w-[26rem]">
                  <p className="t-mono text-[0.5rem] leading-[1.6] text-text-3">{t(item.tag)}</p>
                  <p className="mt-2 text-[0.9rem] leading-[1.6] text-text">{t(item.summary)}</p>
                </div>

                {/* nota de vidro: a stack */}
                <div className="glass absolute right-6 top-6 hidden max-w-[19rem] rounded-[22px] p-4 md:block">
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

          {/* o dock: miniaturas em vidro no canto do painel; no celular, uma
              fileira de deslize acima dele. Os rádios moram nas miniaturas. */}
          <fieldset className="glass order-first flex min-w-0 gap-1.5 overflow-x-auto rounded-[26px] p-2 [scrollbar-width:none] lg:absolute lg:bottom-6 lg:right-6 lg:z-[2] lg:order-none lg:overflow-visible">
            <legend className="sr-only">{lang === "pt" ? "Escolha um projeto" : "Pick a project"}</legend>
            {SIDE.map((item, n) => (
              <label
                key={item.id}
                data-for={item.id}
                className="press relative flex w-[4.75rem] shrink-0 cursor-pointer flex-col items-center gap-1.5 rounded-[18px] p-1.5 text-text-2 hover:text-text"
              >
                <input
                  type="radio"
                  name={group}
                  value={item.id}
                  defaultChecked={n === 0}
                  className="sr-only"
                />
                <span className="relative block h-12 w-12 overflow-hidden rounded-[14px]">
                  <Pic
                    id={ART[item.id].id}
                    alt=""
                    sizes="48px"
                    className="block h-full w-full"
                    imgClassName={`h-full w-full object-cover ${ART[item.id].pos}`}
                  />
                </span>
                <span className="t-mono w-full truncate text-center text-[0.48rem]">{item.name}</span>
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
