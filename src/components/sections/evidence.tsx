import type { CSSProperties } from "react";
import { EVIDENCE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Spark } from "@/components/spark";

/** Matiz do ícone de cada save: o mesmo arco-íris, girado. */
const HUES = [0, 52, 104, 156, 208, 260, 312];

/**
 * As evidências como o navegador do cartão de memória do PS2: cada história
 * é um save, com o ícone iridescente. Nada de tamanho em KB inventado — a
 * seção é justamente sobre não estimar. Colunas CSS fazem a alvenaria.
 */
function EvidenceBody({ t, lang }: { t: T; lang: Lang }) {
  const rows = t(EVIDENCE);

  return (
    <section aria-labelledby={`evidence-heading-${lang}`} className="offscreen wrap mt-24 lg:mt-32">
      <div className="tile tile-panel rounded-[var(--r-frame)] p-5 sm:p-8 lg:p-12">
        <SectionHeading
          id={`evidence-heading-${lang}`}
          slot="07"
          aside={
            <div className="hidden rounded-2xl border border-line-2 bg-void/60 p-4 sm:block">
              <p className="t-mono text-[0.52rem] text-text-3">Memory card (8MB)</p>
              <p className="t-title mt-2 text-[0.95rem] text-text">
                {rows.length} saves · 0 {lang === "pt" ? "estimados" : "estimated"}
              </p>
              <div className="mt-3 flex h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
                <span className="h-full w-full rounded-full bg-[linear-gradient(90deg,var(--cobalt),#36e4ff)]" />
              </div>
              <p className="t-mono mt-2 text-[0.48rem] text-text-3">
                {lang === "pt" ? "cada um com a fonte" : "each one with its source"}
              </p>
            </div>
          }
        >
          {lang === "pt" ? "Nenhum número aqui foi estimado." : "No number here was estimated."}
        </SectionHeading>

        <p className="measure mt-6 text-[0.98rem] leading-[1.65] text-text-2">
          {lang === "pt"
            ? "Cada um veio de uma consulta, de um log ou de uma contagem — e estas são as histórias que eu levo para entrevista, porque falam de julgamento e não de execução."
            : "Each came from a query, a log or a count — and these are the stories I take into interviews, because they are about judgment rather than execution."}
        </p>

        <div className="mt-10 gap-3 sm:columns-2 lg:columns-3">
          {rows.map((row, n) => (
            <article
              key={row.claim}
              className="reveal mb-3 break-inside-avoid rounded-[22px] border border-line bg-void/60 p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]"
                  style={
                    {
                      background: `conic-gradient(from ${HUES[n % HUES.length]}deg, #6d7bff, #36e4ff, #b6ff6a, #ffd56a, #ff6a8b, #b57bff, #6d7bff)`,
                    } as CSSProperties
                  }
                >
                  <Spark size={16} className="drop-shadow-[0_1px_2px_rgb(0_0_0/0.5)]" />
                </span>
                <p className="t-mono text-[0.52rem] leading-[1.6] text-text-3">
                  Save {String(n + 1).padStart(2, "0")}
                  <br />
                  <span className="text-text-2">{lang === "pt" ? "verificado" : "verified"}</span>
                </p>
              </div>
              <h3 className="t-title mt-5 text-[1.05rem] text-text">{row.claim}</h3>
              <p className="mt-3 text-[0.88rem] leading-[1.65] text-text-2">{row.how}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Evidence() {
  return (
    <div id="evidencia">
      <Bi>{(t, lang) => <EvidenceBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
