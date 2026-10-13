import type { CSSProperties } from "react";
import { HERO, PROFILE, ROLE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { Pic } from "@/components/pic";
import { Spark } from "@/components/spark";
import { VyroMark } from "@/components/vyro-mark";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const TICKER = [
  "TypeScript",
  "Next.js",
  "Flutter",
  "Supabase",
  "PostgreSQL",
  "Python",
  "FastAPI",
  "Azure Functions",
  "Rust",
  "Claude",
  "Docker",
  "Cloudflare",
];

/**
 * O primeiro quadro é um bento: o título sobre a cruz cromada, o anjo
 * gótico como "save point" (o anjo continua sendo o fio da página, agora em
 * tinta de tatuagem), a VYRO, um número que não foi estimado, o lugar e a
 * ferramenta. Cada cartão entra em cascata curta, em CSS.
 */
function HeroBody({ t, lang }: { t: T; lang: Lang }) {
  const hero = t(HERO);
  const role = t(ROLE);

  return (
    <section className="wrap relative pt-[5.25rem] sm:pt-24">

      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        {/* A — o título sobre o cromo */}
        <div
          // sem a cascata de entrada: é o cartão do título, e elemento que
          // nasce transparente não conta como pintado para o LCP
          className="tile tile-panel flex min-h-[36rem] flex-col justify-between p-6 sm:p-9 md:col-span-6 lg:col-span-7 lg:row-span-2 lg:min-h-0 lg:p-11"
        >
          <Pic
            id="chrome-cross"
            alt=""
            priority
            sizes="(min-width: 1024px) 34vw, 60vw"
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 block w-full opacity-40 [mask-image:linear-gradient(to_left,#000_30%,transparent_80%)] md:w-[60%] md:opacity-100"
            imgClassName="h-full w-full object-cover object-[50%_45%]"
          />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem]">
            <a
              href={PROFILE.vyro}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-text"
            >
              <VyroMark size={16} strokeWidth={6} />
              <span className="underline decoration-white/25 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-white">
                {hero.founder}
              </span>
              <span aria-hidden="true" className="text-text-3">↗</span>
            </a>
            <span className="inline-flex items-center gap-2 text-text-2">
              <span aria-hidden="true" className="blink h-1.5 w-1.5 rounded-full bg-[#7cff8a]" />
              {hero.kicker}
            </span>
          </div>

          <div className="mt-16 max-w-[40rem] lg:mt-6">
            <p className="t-title text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] text-text-2">
              {PROFILE.name}
            </p>
            <h1 className="t-display mt-3 text-[clamp(2.5rem,1.3rem+3.4vw,4.5rem)] text-text">
              {hero.line1} {hero.line2}{" "}
              <span className="chrome-text">{hero.line3}.</span>
            </h1>
          </div>

          <div className="mt-10 max-w-[30rem] lg:mt-6">
            <p className="t-mono text-[0.58rem] leading-[1.9] text-text-3">
              <span className="text-text">{role.title}</span> · {role.org}
            </p>
            <p className="mt-3 text-[0.98rem] leading-[1.6] text-text-2">{hero.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#oficio"
                className="press t-mono inline-flex h-12 items-center gap-3 rounded-full bg-cobalt px-6 text-[0.66rem] text-white hover:bg-cobalt-2"
              >
                <svg viewBox="0 0 10 10" aria-hidden="true" className="blink h-2 w-2 fill-white">
                  <path d="M1 0.5L9.5 5L1 9.5Z" />
                </svg>
                {lang === "pt" ? "Press start" : "Press start"}
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="press inline-flex h-12 items-center rounded-full border border-line-2 px-6 text-[0.9rem] text-text hover:border-white/40"
              >
                {hero.ctaMail}
              </a>
            </div>
          </div>
        </div>

        {/* B–G: no celular, um carrossel de deslize; do md em diante, o bento */}
        <div className="swipe -mx-[clamp(10px,1.4vw,28px)] py-1 md:contents">
        {/* B — o anjo, save point */}
        <div
          className="boot tile tile-bone flex min-h-[26rem] flex-col justify-between p-5 md:col-span-3 md:row-span-2 md:min-h-[30rem] lg:col-span-3 lg:min-h-0"
          style={i(1)}
        >
          <p className="t-mono flex items-center justify-between text-[0.56rem] text-bone-dim">
            <span>Save point</span>
            <span>01/01</span>
          </p>
          <Pic
            id="gothic-angel"
            alt={
              lang === "pt"
                ? "Anjo gótico em flash de tatuagem, com cruzes ornamentais e caligrafia"
                : "Gothic angel in tattoo flash, with ornamental crosses and script"
            }
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="absolute inset-x-4 bottom-16 top-12 -z-10 block"
            imgClassName="h-full w-full object-contain"
          />
          <p className="t-title max-w-[14ch] text-[1.05rem] text-bone-ink">
            {lang === "pt"
              ? "O anjo da guarda dos sistemas em produção."
              : "Guardian angel of systems in production."}
          </p>
        </div>

        {/* C — VYRO */}
        <a
          href="#vyro"
          className="boot lift tile tile-cobalt flex min-h-[14rem] flex-col justify-between p-5 md:col-span-3 lg:col-span-2 lg:min-h-0"
          style={i(2)}
        >
          <span className="flex items-center justify-between">
            <VyroMark size={30} strokeWidth={5} className="text-white" />
            <span aria-hidden="true" className="text-white/70">↘</span>
          </span>
          <span>
            <span className="t-display chrome-text block text-[2rem]">VYRO</span>
            <span className="t-mono mt-2 block text-[0.55rem] text-white/80">
              {lang === "pt" ? "3 produtos no ar" : "3 products live"}
            </span>
          </span>
        </a>

        {/* D — um número apurado */}
        <div
          className="boot tile tile-panel flex min-h-[14rem] flex-col justify-between p-5 md:col-span-3 lg:col-span-2 lg:min-h-0"
          style={i(3)}
        >
          <p className="t-mono text-[0.55rem] text-text-3">
            {lang === "pt" ? "Birdy · 4 meses" : "Birdy · 4 months"}
          </p>
          <p>
            <span className="t-display chrome-text block text-[3.2rem] leading-none">306</span>
            <span className="t-mono mt-2 block text-[0.55rem] leading-[1.6] text-text-2">
              {lang === "pt" ? "instalações orgânicas" : "organic installs"}
            </span>
          </p>
        </div>

        {/* E — o lugar */}
        <div
          className="boot tile bite-tr flex min-h-[14rem] flex-col justify-end p-5 [--b:38px] md:col-span-4 lg:col-span-4"
          style={i(4)}
        >
          <Pic
            id="tokyo-street"
            alt=""
            sizes="(min-width: 1024px) 30vw, 80vw"
            className="absolute inset-0 -z-10 block"
            imgClassName="h-full w-full object-cover object-[50%_35%]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(7_8_14/0.92),rgb(7_8_14/0.15)_70%)]" />
          <p className="t-mono text-[0.55rem] text-white/75">{PROFILE.location} · {PROFILE.utc}</p>
          <p className="t-title mt-2 text-[1.15rem] text-white">
            {lang === "pt"
              ? "Remoto, em português ou inglês."
              : "Remote, in Portuguese or English."}
          </p>
        </div>

        {/* F — o olho */}
        <div
          className="boot tile tile-bone grid min-h-[12rem] place-items-center p-4 md:col-span-2 lg:col-span-2"
          style={i(5)}
        >
          <Pic
            id="eye-target"
            alt={lang === "pt" ? "Olho com mira em tinta vermelha" : "Eye with a red crosshair"}
            sizes="160px"
            className="block w-[78%]"
            imgClassName="h-auto w-full"
          />
          <p className="t-mono absolute bottom-3 left-0 right-0 text-center text-[0.5rem] text-bone-dim">
            {lang === "pt" ? "olho no que ninguém olha" : "eyes on what nobody watches"}
          </p>
        </div>

        </div>

        {/* G — a ferramenta, em fita */}
        <div
          className="boot tile tile-void flex min-h-[12rem] flex-col justify-center gap-5 md:col-span-6 lg:col-span-6"
          style={i(6)}
        >
          <p className="t-mono px-5 text-[0.55rem] text-text-3">
            {lang === "pt" ? "Na mão, todo dia" : "In hand, every day"}
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="marquee-track flex w-max items-center" style={{ "--marquee-duration": "36s" } as CSSProperties}>
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                  {TICKER.map((name) => (
                    <li key={name} className="flex items-center">
                      <span className="t-title px-5 text-[1.6rem] text-text">{name}</span>
                      <Spark size={12} className="text-cobalt-2" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* A asa de tatuagem atravessa a emenda entre o título e o anjo: o
          bento deixa de ser uma grade de caixas e vira uma página só. */}
      <Pic
        id="tat-wing"
        alt=""
        sizes="(min-width: 768px) 14vw, 36vw"
        className="drift pointer-events-none absolute right-[2%] top-[4.5rem] z-[5] block w-[24vw] max-w-[13rem] opacity-60 md:opacity-100 [--r0:-18deg] [--r1:-6deg] md:left-[55%] md:right-auto md:top-[5.5rem] md:w-[12vw] md:max-w-none"
        imgClassName="ink-white h-auto w-full opacity-90"
      />
    </section>
  );
}

export function Hero() {
  return (
    <div id="top">
      <Bi>{(t, lang) => <HeroBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
