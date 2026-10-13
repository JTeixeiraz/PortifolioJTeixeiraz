import type { CSSProperties } from "react";
import { EVIDENCE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { Pic } from "@/components/pic";
import { Wave } from "@/components/wave";

/**
 * As evidências no vermelho que escorre do papel do limite: cada história é
 * um cartão numerado, e os cartões correm em duas faixas em sentidos
 * opostos (pausam no hover). Sete histórias deixam de ser sete caixas
 * empilhadas. A seção devolve a página ao escuro por outra onda.
 */
function EvidenceBody({ t, lang }: { t: T; lang: Lang }) {
  const rows = t(EVIDENCE);
  const half = Math.ceil(rows.length / 2);
  const lanes = [rows.slice(0, half), rows.slice(half)];

  return (
    <section aria-labelledby={`evidence-heading-${lang}`} className="relative">
      <Wave fill="var(--blood)" under="var(--bone)" variant="b" />

      <div className="relative overflow-hidden bg-[radial-gradient(90%_60%_at_80%_0%,var(--blood-2),transparent_60%),linear-gradient(180deg,var(--blood),#7a0818)] pb-16 pt-4 lg:pb-24">
        <Pic
          id="tat-thorn-face"
          alt=""
          sizes="(min-width: 1024px) 16vw, 36vw"
          className="drift pointer-events-none absolute -top-6 left-[3%] z-0 block w-[34vw] max-w-[15rem] [--r0:-8deg] [--r1:2deg] lg:w-[14vw]"
          imgClassName="ink-white h-auto w-full opacity-85"
        />

        <div className="wrap relative z-[1]">
          <div className="in-right flex flex-wrap items-end justify-between gap-6 px-2 sm:px-6 lg:pl-[18vw] lg:pr-10">
            <h2
              id={`evidence-heading-${lang}`}
              className="t-display max-w-[16ch] text-[clamp(2.2rem,1.2rem+3.6vw,4.6rem)] text-white"
            >
              {lang === "pt" ? "Nenhum número aqui foi estimado." : "No number here was estimated."}
            </h2>
            <p className="max-w-[36ch] text-[0.98rem] leading-[1.6] text-white/85">
              {lang === "pt"
                ? "Cada um veio de uma consulta, de um log ou de uma contagem. São as histórias que eu levo para entrevista."
                : "Each came from a query, a log or a count. These are the stories I take into interviews."}
            </p>
          </div>
        </div>

        <div className="relative z-[1] mt-12 space-y-4 lg:mt-16">
          {lanes.map((lane, l) => (
            <div key={l} className="marquee overflow-hidden">
              <div
                className="marquee-track flex w-max gap-4"
                style={
                  {
                    "--marquee-duration": `${70 + l * 12}s`,
                    "--marquee-direction": l === 1 ? "reverse" : "normal",
                  } as CSSProperties
                }
              >
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4">
                    {lane.map((row, k) => {
                      const n = l * half + k;
                      return (
                        <li
                          key={row.claim}
                          className="flex w-[min(82vw,26rem)] shrink-0 items-start gap-4 rounded-[32px] bg-bone px-6 py-5 text-bone-ink"
                        >
                          <span
                            aria-hidden="true"
                            className="t-display shrink-0 text-[2.4rem] leading-none text-blood"
                          >
                            {String(n + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">
                            <span className="t-title block text-[0.98rem]">{row.claim}</span>
                            <span className="mt-1.5 block text-[0.82rem] leading-[1.5] text-bone-dim">{row.how}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Wave fill="var(--void)" under="#7a0818" variant="a" />
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
