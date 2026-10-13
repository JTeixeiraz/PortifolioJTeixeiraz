import { PROFILE, VYRO, VYRO_PRODUCTS } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { GameCase } from "@/components/game-case";
import { Pic } from "@/components/pic";
import { Spark } from "@/components/spark";
import { VyroMark } from "@/components/vyro-mark";

/**
 * A VYRO como estante de jogos: a empresa é a produtora, os produtos são as
 * capas. Cada capa leva ao site do próprio produto; os números ficam embaixo,
 * na etiqueta da prateleira. O quarto lugar é um slot vazio de cartão de
 * memória — o próximo produto, ainda sem nome.
 */
function VyroBody({ t, lang }: { t: T; lang: Lang }) {
  const v = t(VYRO);

  return (
    <section aria-labelledby={`vyro-heading-${lang}`} className="offscreen mx-auto mt-3 max-w-[1400px] px-3 sm:px-5">
      <div className="tile rounded-[var(--r-frame)] border border-line bg-[radial-gradient(120%_80%_at_100%_0%,rgb(47_69_255/0.18),transparent_55%),var(--void-2)] p-5 sm:p-8 lg:p-12">
        <SectionHeading
          id={`vyro-heading-${lang}`}
          slot="02"
          label={`VYRO · ${v.kicker}`}
          aside={
            <a
              href={PROFILE.vyro}
              target="_blank"
              rel="noopener noreferrer"
              className="ring press hidden h-12 items-center gap-2.5 bg-void pl-2 pr-5 text-[0.9rem] font-medium text-text hover:bg-panel sm:inline-flex"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-text text-void">
                <VyroMark size={16} strokeWidth={7} />
              </span>
              {v.visit}
              <span aria-hidden="true" className="text-text-3">↗</span>
            </a>
          }
        >
          {v.heading}
        </SectionHeading>

        <p className="measure mt-6 text-[1rem] leading-[1.65] text-text-2">{v.lead}</p>

        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {VYRO_PRODUCTS.map((p) => (
            <li key={p.id} className="reveal">
              <GameCase
                name={p.name}
                href={p.href}
                shot={p.cover}
                accent={p.accent}
                ink="#ffffff"
                tagline={t(p.title)}
                rating="V"
                stage={t(p.status)}
                platform={t(p.platform)}
                cta={t(p.cta)}
              />
              <dl className="mt-5 grid grid-cols-3 gap-2">
                {p.numbers.map((n) => (
                  <div key={n.value} className="rounded-2xl border border-line bg-void/50 px-3 py-2.5">
                    <dt className="sr-only">{t(n.label)}</dt>
                    <dd>
                      <span className="t-title block text-[1rem] text-text">{n.value}</span>
                      <span aria-hidden="true" className="t-mono mt-1 block text-[0.46rem] leading-[1.5] text-text-3">
                        {t(n.label)}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}

          {/* o slot vazio do cartão de memória */}
          <li className="reveal">
            <div className="relative grid aspect-[0.71] place-items-center overflow-hidden rounded-[18px] border border-dashed border-line-2 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.025)_0_10px,transparent_10px_20px)] p-6 text-center">
              <Pic
                id="tribal-cross"
                alt=""
                sizes="200px"
                className="pointer-events-none absolute inset-[12%] -z-0 block opacity-[0.14] grayscale"
                imgClassName="h-full w-full object-contain"
              />
              <div className="relative">
                <Spark size={22} className="mx-auto text-text-3" />
                <p className="t-display mt-4 text-[1.4rem] text-text">{v.next}</p>
                <p className="mt-3 text-[0.85rem] leading-[1.5] text-text-3">{v.nextBody}</p>
                <p className="t-mono mt-6 text-[0.5rem] text-text-3">Memory card (8MB) · slot 4</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Vyro() {
  return (
    <div id="vyro">
      <Bi>{(t, lang) => <VyroBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
