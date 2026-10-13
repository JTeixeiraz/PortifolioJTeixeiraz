import { SIDE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

const LAYOUT: Record<string, { span: string; tone: "bone" | "panel" | "cobalt" | "void" }> = {
  birdy: { span: "lg:col-span-7", tone: "panel" },
  lumi: { span: "lg:col-span-5", tone: "bone" },
  postly: { span: "lg:col-span-4", tone: "cobalt" },
  induxai: { span: "lg:col-span-4", tone: "panel" },
  dcars: { span: "lg:col-span-4", tone: "bone" },
  portify: { span: "md:col-span-2 lg:col-span-12", tone: "void" },
};

const TONE = {
  bone: { tile: "tile-bone", name: "text-bone-ink", body: "text-bone-dim", tag: "border-bone-ink/20 text-bone-ink", chip: "bg-bone-ink/[0.06] text-bone-ink", rule: "bg-blood", btn: "bg-bone-ink text-bone hover:bg-bone-ink/85" },
  panel: { tile: "tile-panel", name: "text-text", body: "text-text-2", tag: "border-line-2 text-text-2", chip: "bg-white/[0.06] text-text-2", rule: "bg-cobalt-2", btn: "bg-text text-void hover:bg-white" },
  cobalt: { tile: "tile-cobalt", name: "text-white", body: "text-white/80", tag: "border-white/30 text-white/90", chip: "bg-white/15 text-white", rule: "bg-white", btn: "bg-white text-cobalt-deep hover:bg-white/90" },
  void: { tile: "tile-void", name: "text-text", body: "text-text-2", tag: "border-line-2 text-text-2", chip: "bg-white/[0.06] text-text-2", rule: "bg-blood-2", btn: "bg-text text-void hover:bg-white" },
} as const;

/**
 * Projetos como ficha técnica. A seção da VYRO mostra os produtos como
 * capas; aqui está a engenharia por trás deles e do trabalho de freela. Os
 * pontos técnicos ficam num <details>: a ficha fecha curta e abre inteira.
 */
function SideBody({ t, lang }: { t: T; lang: Lang }) {

  return (
    <section aria-labelledby={`side-heading-${lang}`} className="offscreen wrap mt-24 lg:mt-32">
      <div className="px-2 sm:px-3">
        <SectionHeading id={`side-heading-${lang}`} slot="05">
          {lang === "pt" ? "A ficha técnica de cada um." : "The spec sheet of each one."}
        </SectionHeading>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
        {SIDE.map((item) => {
          const { span, tone } = LAYOUT[item.id] ?? { span: "lg:col-span-4", tone: "panel" as const };
          const c = TONE[tone];
          const wide = item.id === "portify";
          return (
            <article key={item.id} className={`reveal tile ${c.tile} flex flex-col p-6 sm:p-8 ${span}`}>
              <div className={wide ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14" : "flex flex-1 flex-col"}>
                <div>
                  <p className={`t-mono inline-flex rounded-full border px-3 py-1.5 text-[0.5rem] leading-[1.5] ${c.tag}`}>
                    {t(item.tag)}
                  </p>
                  <h3 className={`t-display mt-5 text-[clamp(2rem,1.4rem+1.8vw,2.9rem)] ${c.name}`}>
                    {item.name}
                  </h3>
                  <span aria-hidden="true" className={`mt-5 block h-1 w-10 rounded-full ${c.rule}`} />
                  <p className={`mt-5 max-w-[60ch] text-[0.95rem] leading-[1.65] ${c.body}`}>
                    {t(item.summary)}
                  </p>
                </div>

                <div className={wide ? "lg:pt-2" : "mt-6 flex flex-1 flex-col"}>
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <li key={s} className={`rounded-full px-3 py-1 text-[0.74rem] ${c.chip}`}>
                        {s}
                      </li>
                    ))}
                  </ul>

                  <details className="group mt-6">
                    <summary
                      className={`press t-mono inline-flex cursor-pointer list-none items-center gap-2 rounded-full border px-4 py-2.5 text-[0.55rem] [&::-webkit-details-marker]:hidden ${c.tag}`}
                    >
                      <span className="transition-transform duration-200 group-open:rotate-45">+</span>
                      {lang === "pt" ? "Ficha técnica" : "Spec sheet"} · {t(item.points).length}
                    </summary>
                    <ul className="mt-5 space-y-3">
                      {t(item.points).map((p, k) => (
                        <li key={k} className={`flex gap-3 text-[0.88rem] leading-[1.65] ${c.body}`}>
                          <span aria-hidden="true" className={`mt-[0.6rem] h-1 w-3 shrink-0 rounded-full ${c.rule}`} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  {item.link ? (
                    <div className="mt-auto pt-6">
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`press inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.86rem] font-medium ${c.btn}`}
                      >
                        {t(item.link.label)}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Side() {
  return (
    <div id="fora">
      <Bi>{(t, lang) => <SideBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
