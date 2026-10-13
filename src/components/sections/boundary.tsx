import { BOUNDARY } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { Pic } from "@/components/pic";
import { Wave } from "@/components/wave";

const ROMAN = ["I", "II", "III", "IV"];

/** Cada regra numa forma: a folha de flash não é uma grade de caixas. */
const SHAPE = [
  "rounded-[40px_40px_40px_120px] lg:-rotate-[1.2deg]",
  "bite-tr rounded-[40px] [--b:60px] lg:translate-y-10 lg:rotate-[1deg]",
  "rounded-[120px_40px_40px_40px] lg:-translate-y-2",
  "rounded-[40px_40px_120px_40px] lg:translate-y-8 lg:-rotate-[0.8deg]",
];

/**
 * O limite numa folha de flash de tatuagem em largura total: o papel osso
 * entra por uma onda (vindo do escuro) e escorre para o vermelho das
 * evidências por outra. As quatro regras ficam em formas diferentes, e as
 * tatuagens atravessam as ondas.
 */
function BoundaryBody({ t, lang }: { t: T; lang: Lang }) {
  const b = t(BOUNDARY);

  return (
    <section aria-labelledby={`boundary-heading-${lang}`} className="relative mt-24 lg:mt-32">
      <Wave fill="var(--bone)" under="transparent" variant="a" />

      <div className="relative bg-bone pb-20 pt-6 lg:pb-28">
        <Pic
          id="tribal-cross"
          alt=""
          sizes="(min-width: 1024px) 26vw, 50vw"
          className="drift pointer-events-none absolute -top-[9vw] right-[4%] z-[2] block w-[44vw] max-w-[26rem] [--r0:6deg] [--r1:14deg] lg:w-[24vw]"
          imgClassName="h-auto w-full"
        />

        <div className="wrap relative z-[1]">
          <div className="in-left max-w-[62rem] px-2 sm:px-6 lg:px-10">
            <h2
              id={`boundary-heading-${lang}`}
              className="t-display text-[clamp(2.4rem,1.2rem+4vw,5.2rem)] text-bone-ink"
            >
              {b.heading}.
            </h2>
            <p className="t-title mt-7 max-w-[34ch] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] leading-[1.35] text-bone-ink">
              {b.lead}
            </p>
          </div>

          <div className="swipe -mx-[clamp(10px,1.4vw,28px)] mt-14 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:px-6 lg:mt-20 lg:grid-cols-4 lg:px-10">
            {b.columns.map((c, i) => (
              <article
                key={c.title}
                className={`in-tilt relative overflow-hidden bg-bone-2 p-6 shadow-[0_24px_40px_-28px_rgb(22_19_26/0.5)] sm:p-7 ${SHAPE[i]}`}
              >
                <span aria-hidden="true" className="t-goth block text-[3.4rem] leading-none text-blood">
                  {ROMAN[i]}
                </span>
                <h3 className="t-title mt-5 text-[1.15rem] text-bone-ink">{c.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.65] text-bone-dim">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Boundary() {
  return (
    <div id="limite">
      <Bi>{(t, lang) => <BoundaryBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
