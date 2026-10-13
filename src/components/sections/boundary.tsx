"use client";

import { BOUNDARY } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Pic } from "@/components/pic";
import { Spark } from "@/components/spark";

const ROMAN = ["I", "II", "III", "IV"];

/**
 * O limite: o argumento que ele mais quer que seja lido, numa folha de flash
 * de tatuagem. Papel osso, tinta vermelha, a cruz tribal ocupando a margem —
 * e as quatro regras de onde a automação para.
 */
export function Boundary() {
  const t = useT();
  const { lang } = useLang();
  const b = t(BOUNDARY);

  return (
    <section id="limite" aria-labelledby="boundary-heading" className="offscreen mx-auto mt-24 max-w-[1400px] px-3 sm:px-5 lg:mt-32">
      <div className="tile tile-bone rounded-[var(--r-frame)] p-6 sm:p-10 lg:p-14">
        <Pic
          id="tribal-cross"
          alt=""
          sizes="(min-width: 1024px) 30vw, 60vw"
          className="pointer-events-none absolute -right-10 -top-10 -z-10 block w-[60%] max-w-[30rem] opacity-25 md:opacity-60 lg:right-6 lg:top-8 lg:w-[30%] lg:opacity-100"
          imgClassName="h-auto w-full"
        />

        <div className="lg:max-w-[64%]">
          <p className="t-mono inline-flex items-center gap-2.5 rounded-full border border-bone-ink/20 px-4 py-2 text-[0.6rem] text-bone-ink">
            <Spark size={9} className="text-blood" />
            Slot 06
            <span className="text-bone-dim">·</span>
            {lang === "pt" ? "O limite" : "The boundary"}
          </p>
          <h2
            id="boundary-heading"
            className="t-display mt-5 text-[clamp(2.1rem,1.1rem+3.4vw,4.3rem)] text-bone-ink"
          >
            {b.heading}.
          </h2>
          <p className="t-title mt-7 max-w-[34ch] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] leading-[1.35] text-bone-ink">
            {b.lead}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-16">
          {b.columns.map((c, i) => (
            <article
              key={c.title}
              className="reveal rounded-[22px] border border-bone-ink/10 bg-bone-2/70 p-6 sm:p-7"
            >
              <div className="flex items-baseline gap-4">
                <span aria-hidden="true" className="t-goth text-[2.6rem] text-blood">
                  {ROMAN[i]}
                </span>
                <h3 className="t-title text-[1.15rem] text-bone-ink">{c.title}</h3>
              </div>
              <p className="mt-4 text-[0.92rem] leading-[1.7] text-bone-dim">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
