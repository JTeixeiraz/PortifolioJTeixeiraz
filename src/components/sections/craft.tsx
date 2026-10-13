import { CRAFT } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Pic } from "@/components/pic";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/**
 * Tom e largura de cada cartão. O bento só funciona se os tamanhos variarem
 * de verdade: 7+5, 4+4+4, e o último atravessando a linha inteira.
 */
const LAYOUT: { span: string; tone: "bone" | "panel" | "cobalt" | "blood"; shape: string; enter: string }[] = [
  { span: "lg:col-span-7", tone: "bone", shape: "rounded-[28px_28px_28px_96px]", enter: "in-tilt" },
  { span: "lg:col-span-5", tone: "panel", shape: "bite-tr [--b:56px]", enter: "in-right" },
  { span: "lg:col-span-4", tone: "cobalt", shape: "rounded-[96px_28px_28px_28px]", enter: "in-left" },
  { span: "lg:col-span-4", tone: "bone", shape: "", enter: "in-tilt" },
  { span: "lg:col-span-4", tone: "panel", shape: "bite-bl [--b:48px]", enter: "in-right" },
  { span: "lg:col-span-12", tone: "blood", shape: "rounded-[28px_120px_28px_28px]", enter: "in-zoom" },
];

const TONE = {
  bone: { tile: "tile-bone", title: "text-bone-ink", body: "text-bone-dim", num: "text-blood", chip: "border-bone-ink/20 text-bone-ink hover:bg-bone-ink/5" },
  panel: { tile: "tile-panel", title: "text-text", body: "text-text-2", num: "chrome-text", chip: "border-line-2 text-text hover:bg-white/5" },
  cobalt: { tile: "tile-cobalt", title: "text-white", body: "text-white/80", num: "text-white/90", chip: "border-white/30 text-white hover:bg-white/10" },
  blood: { tile: "tile-blood", title: "text-white", body: "text-white/85", num: "text-white/90", chip: "border-white/30 text-white hover:bg-white/10" },
} as const;

/**
 * O ofício: seis coisas que ele faz dentro da squad. O exemplo real de cada
 * uma mora num <details> nativo — o leitor apressado lê o título, quem quer
 * a prova abre, e nada disso custa JavaScript.
 */
function CraftBody({ t, lang }: { t: T; lang: Lang }) {

  return (
    <section aria-labelledby={`craft-heading-${lang}`} className="wrap relative mt-24 lg:mt-32">
      <div className="px-2 sm:px-3">
        <SectionHeading id={`craft-heading-${lang}`} slot="03">
          {lang === "pt" ? "O que eu faço dentro de uma squad." : "What I do inside a squad."}
        </SectionHeading>
      </div>

      <div className="offscreen swipe -mx-[clamp(10px,1.4vw,28px)] mt-10 md:mx-0 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-12">
        {CRAFT.map((item, n) => {
          const { span, tone, shape, enter } = LAYOUT[n] ?? LAYOUT[1];
          const c = TONE[tone];
          const example = t(item.example);
          const wide = n === CRAFT.length - 1;
          return (
            <article
              key={item.id}
              className={`${enter} tile ${c.tile} ${shape} flex min-h-[19rem] flex-col p-6 sm:p-8 ${span} ${wide ? "md:col-span-2" : ""}`}
            >
              {/* o olho mora no cartão da instrumentação */}
              {n === 3 ? (
                <Pic
                  id="tat-eye-column"
                  alt=""
                  sizes="120px"
                  className="pointer-events-none absolute -right-3 -top-6 -z-10 block w-20 rotate-[6deg] opacity-60"
                  imgClassName="h-auto w-full"
                />
              ) : null}
              {wide ? (
                <Pic
                  id="tat-tiger"
                  alt=""
                  sizes="300px"
                  className="pointer-events-none absolute -top-16 right-[6%] -z-10 hidden w-64 rotate-[-8deg] opacity-40 md:block"
                  imgClassName="ink-white h-auto w-full"
                />
              ) : null}

              <div className={`grid gap-6 ${wide ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12" : ""}`}>
                <div>
                  <span aria-hidden="true" className={`t-goth block text-[3.6rem] ${c.num}`}>
                    {ROMAN[n]}
                  </span>
                  <h3 className={`t-title mt-4 max-w-[22ch] text-[clamp(1.25rem,1rem+0.9vw,1.7rem)] ${c.title}`}>
                    {t(item.title)}
                  </h3>
                  <p className={`mt-4 max-w-[52ch] text-[0.95rem] leading-[1.65] ${c.body}`}>
                    {t(item.body)}
                  </p>
                </div>

                <details className={`group self-end ${wide ? "lg:self-center" : "mt-auto"}`}>
                  <summary
                    className={`press t-mono inline-flex cursor-pointer list-none items-center gap-2 rounded-full border px-4 py-2.5 text-[0.56rem] [&::-webkit-details-marker]:hidden ${c.chip}`}
                  >
                    <span className="transition-transform duration-200 group-open:rotate-45">+</span>
                    {example.label}
                  </summary>
                  <p className={`mt-4 text-[0.9rem] leading-[1.7] ${c.body}`}>{example.text}</p>
                </details>
              </div>
            </article>
          );
        })}
      </div>
      <Pic
        id="tat-sword"
        alt=""
        sizes="(min-width: 768px) 11vw, 28vw"
        className="drift pointer-events-none absolute -top-40 left-[1%] z-[5] block w-[28vw] max-w-[9rem] [--r0:-10deg] [--r1:4deg] md:w-[10vw] md:max-w-none"
        imgClassName="ink-white h-auto w-full opacity-80"
      />
    </section>
  );
}

export function Craft() {
  return (
    <div id="oficio">
      <Bi>{(t, lang) => <CraftBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
