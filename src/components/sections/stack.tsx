import { STACK } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Pic } from "@/components/pic";

/**
 * Ferramenta: só entra o que ele usou para entregar algo no ar. Em vez de
 * oito caixas, um painel só com os grupos em linhas — cada linha desliza ao
 * entrar —, ao lado da caligrafia 大吉 ("boa sorte") inteira, sem corte: o
 * voto de todo deploy de sexta.
 */
function StackBody({ t, lang }: { t: T; lang: Lang }) {
  const groups = t(STACK);

  return (
    <section aria-labelledby={`stack-heading-${lang}`} className="wrap relative mt-16 lg:mt-24">
      <SectionHeading id={`stack-heading-${lang}`} slot="08" className="px-2 sm:px-3">
        {lang === "pt" ? "O que já foi para produção." : "What has shipped to production."}
      </SectionHeading>

      <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <figure className="in-zoom relative hidden aspect-[1/2] self-start overflow-hidden rounded-[40px] lg:block">
          <Pic
            id="daikichi"
            alt={
              lang === "pt"
                ? "Caligrafia dourada 大吉, 'grande sorte', com um dragão bordado"
                : "Golden calligraphy 大吉, 'great luck', with an embroidered dragon"
            }
            sizes="22rem"
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
        </figure>

        <div className="tile tile-panel rounded-[40px_40px_40px_140px] px-6 py-4 sm:px-10 sm:py-6">
          <ul className="divide-y divide-line">
            {groups.map((g, n) => (
              <li key={g.group} className={n % 2 ? "in-right" : "in-left"}>
                {/* No celular cada grupo é um acordeão fechado; do md em diante
                    o <summary> some e a lista fica sempre aberta (.stack-row). */}
                <details
                  // o script do corpo fecha no celular antes da pintura; no site
                  // publicado não há hidratação, isto só cala o aviso do dev
                  suppressHydrationWarning
                  className="stack-row group grid grid-cols-1 gap-3 py-5 md:grid-cols-[11rem_minmax(0,1fr)] md:items-baseline md:gap-6"
                  open
                >
                <summary className="t-title flex cursor-pointer list-none items-baseline gap-3 text-[1.15rem] text-text md:cursor-default [&::-webkit-details-marker]:hidden">
                  <span className="t-mono text-[0.5rem] text-text-3">{String(n + 1).padStart(2, "0")}</span>
                  {g.group}
                  <span className="t-mono ml-auto text-[0.55rem] text-text-3 md:hidden">
                    {g.items.length} <span className="inline-block transition-transform duration-200 group-open:rotate-45">+</span>
                  </span>
                </summary>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1.5 text-[0.82rem] text-text-2 transition-colors duration-200 hover:border-cobalt-2 hover:text-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}

export function Stack() {
  return (
    <div id="stack">
      <Bi>{(t, lang) => <StackBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
