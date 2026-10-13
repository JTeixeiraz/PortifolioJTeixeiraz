import { PROFILE, VYRO, VYRO_PRODUCTS } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { DsCase } from "@/components/ds-case";
import { Blur, Pic } from "@/components/pic";
import { VyroMark } from "@/components/vyro-mark";

/** Cada capa pousa num ângulo e numa altura: prateleira, não planilha. */
const POSE = [
  { lift: "lg:translate-y-0", tilt: "lg:-rotate-[2.5deg]", range: "[animation-range:entry_0%_entry_55%]" },
  { lift: "lg:translate-y-16", tilt: "lg:rotate-[1.5deg]", range: "[animation-range:entry_8%_entry_63%]" },
  { lift: "lg:translate-y-6", tilt: "lg:-rotate-[1deg]", range: "[animation-range:entry_16%_entry_71%]" },
];

/**
 * A VYRO numa cena: a noite de Tóquio desfocada ao fundo (o fundo de 48 px
 * borrado no build) e as três capas de DS pousadas por cima, cada uma num
 * ângulo. As capas entram "dando as cartas" com o scroll. No celular, a
 * prateleira vira um carrossel de deslize.
 */
function VyroBody({ t, lang }: { t: T; lang: Lang }) {
  const v = t(VYRO);

  return (
    <section aria-labelledby={`vyro-heading-${lang}`} className="wrap relative mt-3">
      <div className="in-scene tile relative overflow-hidden rounded-[var(--r-frame)] border border-line pb-14 pt-8 sm:pt-12 lg:pb-28">
        <Blur id="night-tokyo" className="absolute inset-0 -z-20 h-full w-full scale-110" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_8_14/0.78),rgb(7_8_14/0.55)_40%,rgb(7_8_14/0.85))]" />

        <div className="px-5 sm:px-10 lg:px-14">
          <SectionHeading
            id={`vyro-heading-${lang}`}
            slot="02"
            aside={
              <a
                href={PROFILE.vyro}
                target="_blank"
                rel="noopener noreferrer"
                className="ring press hidden h-12 items-center gap-2.5 pl-2 pr-5 text-[0.9rem] font-medium text-text [--ring-bg:var(--void)] [--ring-bg-hover:var(--panel)] sm:inline-flex"
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
        </div>

        <ul className="swipe mt-12 md:grid md:grid-cols-3 md:gap-6 md:px-10 lg:mt-16 lg:gap-10 lg:px-14">
          {VYRO_PRODUCTS.map((p, n) => {
            const pose = POSE[n];
            return (
              <li key={p.id} className={`in-deal ${pose.range} ${pose.lift}`}>
                <div className={`transition-transform duration-500 ${pose.tilt}`}>
                  <DsCase
                    name={p.name}
                    href={p.href}
                    art={p.art}
                    shot={p.cover}
                    accent={p.accent}
                    stage={t(p.status)}
                    tagline={t(p.title)}
                  />
                </div>
                <div className="mt-6 px-1">
                  <p className="t-title text-[1.15rem] text-text">{t(p.title)}</p>
                  <p className="mt-2 text-[0.85rem] leading-[1.6] text-text-2">
                    {p.numbers.map((num, k) => (
                      <span key={num.value}>
                        <span className="text-text">{num.value}</span> {t(num.label)}
                        {k < p.numbers.length - 1 ? <span className="text-text-3"> · </span> : null}
                      </span>
                    ))}
                  </p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] text-cobalt-2 underline decoration-cobalt-2/40 underline-offset-4 hover:decoration-cobalt-2"
                  >
                    {p.domain} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* a auréola de tatuagem pousa na quina da cena e sai dela */}
      <Pic
        id="tat-halo"
        alt=""
        sizes="(min-width: 768px) 12vw, 30vw"
        className="drift pointer-events-none absolute -top-16 right-[4%] z-[5] block w-[30vw] max-w-[11rem] [--r0:8deg] [--r1:-4deg] md:w-[11vw] md:max-w-none"
        imgClassName="ink-white h-auto w-full opacity-85"
      />
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
