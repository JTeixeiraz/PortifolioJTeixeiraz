import { LABELS, STACK } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

/** Largura e tom por grupo, na ordem de STACK. */
const LAYOUT = [
  { span: "lg:col-span-4", tone: "tile-panel", chip: "bg-white/[0.06] text-text-2" },
  { span: "lg:col-span-4", tone: "tile-void", chip: "bg-white/[0.06] text-text-2" },
  { span: "lg:col-span-4", tone: "tile-panel", chip: "bg-white/[0.06] text-text-2" },
  { span: "lg:col-span-5", tone: "tile-void", chip: "bg-white/[0.06] text-text-2" },
  { span: "lg:col-span-7", tone: "tile-panel", chip: "bg-white/[0.06] text-text-2" },
  { span: "lg:col-span-6", tone: "tile-bone", chip: "bg-bone-ink/[0.07] text-bone-ink" },
  { span: "lg:col-span-6", tone: "tile-cobalt", chip: "bg-white/15 text-white" },
  { span: "md:col-span-2 lg:col-span-12", tone: "tile-void", chip: "bg-white/[0.06] text-text-2" },
];

/**
 * Ferramenta: só entra o que ele usou para entregar algo que está no ar,
 * agrupado pelo problema que cada grupo resolve. Sem barra de proficiência,
 * sem sopa de logos — chips de texto, leves.
 */
function StackBody({ t, lang }: { t: T; lang: Lang }) {
  const labels = t(LABELS);
  const groups = t(STACK);

  return (
    <section aria-labelledby={`stack-heading-${lang}`} className="offscreen mx-auto mt-24 max-w-[1400px] px-3 sm:px-5 lg:mt-32">
      <div className="px-2 sm:px-3">
        <SectionHeading id={`stack-heading-${lang}`} slot="08" label={labels.stack}>
          {lang === "pt" ? "O que já foi para produção." : "What has shipped to production."}
        </SectionHeading>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
        {groups.map((g, n) => {
          const l = LAYOUT[n] ?? LAYOUT[0];
          const onBone = l.tone === "tile-bone";
          const onCobalt = l.tone === "tile-cobalt";
          return (
            <div key={g.group} className={`reveal tile ${l.tone} p-6 ${l.span}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className={`t-title text-[1.15rem] ${onBone ? "text-bone-ink" : onCobalt ? "text-white" : "text-text"}`}
                >
                  {g.group}
                </h3>
                <span
                  className={`t-mono text-[0.52rem] ${onBone ? "text-bone-dim" : onCobalt ? "text-white/70" : "text-text-3"}`}
                >
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item} className={`rounded-full px-3 py-1.5 text-[0.8rem] ${l.chip}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
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
