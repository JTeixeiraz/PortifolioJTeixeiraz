import { BACKGROUND, JOURNEY, LABELS } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { VyroMark } from "@/components/vyro-mark";

const TONES = ["tile-panel", "tile-cobalt", "tile-void"] as const;
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5"] as const;

/**
 * A jornada: três frentes ao mesmo tempo, não uma escada. Os cartões
 * alternam largura (7+5, depois 5+7 com a formação) para o olho não ler
 * sucessão onde há paralelo. A nota do vínculo de estágio fica visível.
 */
function JourneyBody({ t, lang }: { t: T; lang: Lang }) {
  const labels = t(LABELS);
  const j = t(JOURNEY);
  const bg = t(BACKGROUND);

  return (
    <section aria-labelledby={`journey-heading-${lang}`} className="offscreen mx-auto mt-24 max-w-[1400px] px-3 sm:px-5 lg:mt-32">
      <div className="px-2 sm:px-3">
        <SectionHeading id={`journey-heading-${lang}`} slot="09" label={labels.journey}>
          {lang === "pt" ? "Squad, produto e contrato." : "Squad, product and contract."}
        </SectionHeading>
        <p className="measure mt-6 text-[0.98rem] leading-[1.65] text-text-2">{j.lead}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
        {j.rows.map((row, n) => {
          const onCobalt = TONES[n] === "tile-cobalt";
          return (
            <article
              key={row.org}
              className={`reveal tile ${TONES[n]} flex min-h-[18rem] flex-col p-6 sm:p-8 ${SPANS[n]} ${n === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className={`t-mono text-[0.55rem] ${onCobalt ? "text-white/75" : "text-text-3"}`}>
                  {row.period}
                </p>
                {row.org.toLowerCase().startsWith("vyro") ? (
                  <VyroMark size={26} strokeWidth={5} className="text-white" />
                ) : null}
              </div>
              <h3 className={`t-title mt-auto pt-10 text-[clamp(1.25rem,1rem+0.8vw,1.7rem)] ${onCobalt ? "text-white" : "text-text"}`}>
                {row.role}
              </h3>
              <p className={`t-mono mt-2 text-[0.55rem] ${onCobalt ? "text-white/80" : "text-text-2"}`}>
                {row.org}
              </p>
              <p className={`mt-5 text-[0.92rem] leading-[1.65] ${onCobalt ? "text-white/85" : "text-text-2"}`}>
                {row.note}
              </p>
            </article>
          );
        })}

        <article className="reveal tile tile-bone p-6 sm:p-8 lg:col-span-7">
          <p className="t-mono text-[0.55rem] text-bone-dim">{bg.heading}</p>
          <ul className="mt-6 divide-y divide-bone-ink/10">
            {bg.rows.map((row) => (
              <li key={row.title} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-4">
                <span>
                  <span className="t-title block text-[1.05rem] text-bone-ink">{row.title}</span>
                  <span className="mt-1 block text-[0.85rem] text-bone-dim">{row.note}</span>
                </span>
                <span className="t-mono text-[0.52rem] text-bone-dim">{row.period}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.82rem] leading-[1.6] text-bone-dim">{j.footnote}</p>
        </article>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <div id="jornada">
      <Bi>{(t, lang) => <JourneyBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
