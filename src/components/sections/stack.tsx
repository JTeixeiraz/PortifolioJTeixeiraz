import { STACK } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Pic } from "@/components/pic";

/**
 * Ferramenta: só entra o que ele usou para entregar algo no ar. Em vez de
 * oito caixas, um painel só com os grupos em linhas — cada linha desliza ao
 * entrar —, ao lado da caligrafia 大吉 ("boa sorte") numa pílula alta: o
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
        <figure className="in-zoom relative hidden overflow-hidden rounded-full lg:block">
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
              <li
                key={g.group}
                className={`${n % 2 ? "in-right" : "in-left"} grid grid-cols-1 gap-3 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-baseline sm:gap-6`}
              >
                <h3 className="t-title flex items-baseline gap-3 text-[1.15rem] text-text">
                  <span className="t-mono text-[0.5rem] text-text-3">{String(n + 1).padStart(2, "0")}</span>
                  {g.group}
                </h3>
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
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Pic
        id="tat-eye-column"
        alt=""
        sizes="(min-width: 768px) 6vw, 18vw"
        className="drift pointer-events-none absolute -top-10 right-[3%] z-[5] block w-[18vw] max-w-[5rem] [--r0:4deg] [--r1:-6deg] md:w-[6vw] md:max-w-none"
        imgClassName="ink-white h-auto w-full opacity-80"
      />
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
