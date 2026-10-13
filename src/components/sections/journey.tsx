import { BACKGROUND, JOURNEY } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import type { ImageId } from "@/lib/images";
import { SectionHeading } from "@/components/section-heading";
import { Pic } from "@/components/pic";

/** Foto e pose de cada polaroide: largadas na mesa, não alinhadas. */
const POLAROID: { photo: ImageId; pose: string; range: string }[] = [
  { photo: "me-2", pose: "lg:-rotate-[4deg] lg:translate-y-6", range: "[animation-range:entry_0%_entry_55%]" },
  { photo: "cat-poster", pose: "lg:rotate-[3deg] lg:-translate-y-4 lg:-ml-4", range: "[animation-range:entry_10%_entry_65%]" },
  { photo: "code-balcony", pose: "lg:-rotate-[2deg] lg:translate-y-10 lg:-ml-4", range: "[animation-range:entry_20%_entry_75%]" },
];

/**
 * A jornada como três polaroides largadas na mesa — squad, VYRO e freela
 * correm ao mesmo tempo, e se sobrepõem em vez de formar uma escada. A
 * formação vira uma faixa em pílula, e a nota do vínculo de estágio fica
 * visível por baixo.
 */
function JourneyBody({ t, lang }: { t: T; lang: Lang }) {
  const j = t(JOURNEY);
  const bg = t(BACKGROUND);

  return (
    <section aria-labelledby={`journey-heading-${lang}`} className="wrap relative mt-24 lg:mt-32">
      <SectionHeading id={`journey-heading-${lang}`} slot="09" className="px-2 sm:px-3">
        {lang === "pt" ? "Squad, produto e contrato." : "Squad, product and contract."}
      </SectionHeading>
      <p className="measure mt-6 px-2 text-[0.98rem] leading-[1.65] text-text-2 sm:px-3">{j.lead}</p>

      <ol className="swipe -mx-[clamp(10px,1.4vw,28px)] mt-12 md:mx-0 md:grid md:grid-cols-3 md:gap-4 lg:mt-16 lg:flex lg:justify-center lg:gap-0">
        {j.rows.map((row, n) => {
          const p = POLAROID[n];
          return (
            <li key={row.org} className={`in-deal ${p.range} relative lg:w-[32%]`}>
              <article
                className={`bg-bone p-3 pb-6 shadow-[0_40px_60px_-30px_rgb(0_0_0/0.9)] transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-2 hover:rotate-0 ${p.pose} rounded-[10px]`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                  <Pic
                    id={p.photo}
                    alt={
                      p.photo === "me-2"
                        ? lang === "pt"
                          ? "João Pedro Teixeira sorrindo, num bar à noite"
                          : "João Pedro Teixeira smiling, at a bar at night"
                        : ""
                    }
                    sizes="(min-width: 1024px) 30vw, 80vw"
                    className="absolute inset-0 block"
                    imgClassName={`h-full w-full object-cover ${p.photo === "me-2" ? "object-[40%_35%] brightness-125" : ""}`}
                  />
                </div>
                <div className="px-2 pt-5">
                  <p className="t-mono text-[0.5rem] text-bone-dim">{row.period}</p>
                  <h3 className="t-title mt-2 text-[1.15rem] text-bone-ink">{row.role}</h3>
                  <p className="t-mono mt-1 text-[0.5rem] text-blood">{row.org}</p>
                  <p className="mt-3 text-[0.85rem] leading-[1.6] text-bone-dim">{row.note}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="in-right mx-auto mt-16 max-w-[68rem] lg:mt-24">
        <p className="t-mono px-3 text-[0.55rem] text-text-3">{bg.heading}</p>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-0 sm:overflow-hidden sm:rounded-full sm:border sm:border-line-2">
          {bg.rows.map((row, n) => (
            <li
              key={row.title}
              className={`rounded-[22px] border border-line-2 px-6 py-4 sm:rounded-none sm:border-0 ${n > 0 ? "sm:border-l sm:border-line-2" : ""}`}
            >
              <span className="t-mono block text-[0.48rem] text-text-3">{row.period}</span>
              <span className="t-title mt-1.5 block text-[0.95rem] text-text">{row.title}</span>
              <span className="block text-[0.8rem] text-text-2">{row.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 px-3 text-[0.8rem] text-text-3">{j.footnote}</p>
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
