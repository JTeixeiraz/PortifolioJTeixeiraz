import { CONTACT, PROFILE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { Blur, Pic } from "@/components/pic";
import { Spark } from "@/components/spark";
import { VyroMark } from "@/components/vyro-mark";

/**
 * O fecho é um pôster: o Fallen Angels desfocado ao fundo, PRESS START
 * piscando, o convite em letra enorme e os caminhos de saída. À direita, o
 * samurai sob a lua numa pílula alta, com a VYRO pousada por cima.
 */
function ContactBody({ t, lang }: { t: T; lang: Lang }) {
  const c = t(CONTACT);

  return (
    <section aria-labelledby={`contact-heading-${lang}`} className="wrap relative mt-24 lg:mt-32">
      <div className="in-scene tile relative overflow-hidden rounded-[var(--r-frame)] border border-line p-6 sm:p-10 lg:p-14">
        <Blur id="fallen-angels" className="absolute inset-0 -z-20 h-full w-full scale-110" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgb(7_8_14/0.92),rgb(7_8_14/0.6)_55%,rgb(7_8_14/0.35))]" />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div className="in-left">
            <p className="t-mono flex items-center gap-3 text-[0.62rem] text-white/90">
              <svg viewBox="0 0 10 10" aria-hidden="true" className="blink h-2.5 w-2.5 fill-white">
                <path d="M1 0.5L9.5 5L1 9.5Z" />
              </svg>
              Press start
            </p>
            <h2
              id={`contact-heading-${lang}`}
              className="t-display mt-8 text-[clamp(3rem,1.4rem+6vw,7.4rem)] text-white"
            >
              {c.heading}.
            </h2>
            <p className="mt-7 max-w-[44ch] text-[clamp(1rem,0.94rem+0.3vw,1.15rem)] leading-[1.6] text-white/85">
              {c.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="press inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.92rem] font-medium text-void hover:bg-white/90"
              >
                {c.mailLabel}
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-6 text-[0.92rem] text-white hover:bg-white/10"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-6 text-[0.92rem] text-white hover:bg-white/10"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mt-8 text-[0.85rem] text-white/70">
              {c.note} ·{" "}
              <a href={`mailto:${PROFILE.email}`} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {PROFILE.email}
              </a>
            </p>
          </div>

          <div className="in-right relative">
            <figure className="relative aspect-[0.62] overflow-hidden rounded-full shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/15">
              <Pic
                id="samurai-moon"
                alt={
                  lang === "pt"
                    ? "Ilustração de samurai de armadura sob a lua cheia, em vermelho e azul"
                    : "Illustration of an armored samurai under the full moon, in red and blue"
                }
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="absolute inset-0 block"
                imgClassName="h-full w-full object-cover"
              />
            </figure>
            <a
              href={PROFILE.vyro}
              target="_blank"
              rel="noopener noreferrer"
              className="glass lift absolute -bottom-4 -left-6 flex items-center gap-3 rounded-[24px] p-3 pr-5 sm:-left-10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-[16px] bg-text text-void">
                <VyroMark size={22} strokeWidth={6} />
              </span>
              <span>
                <span className="t-display chrome-text block text-[1.4rem] leading-none">VYRO</span>
                <span className="mt-1 block text-[0.8rem] text-text-2">{c.vyroLabel} ↗</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-3 flex flex-col gap-4 px-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-mono flex items-center gap-2.5 text-[0.55rem] text-text-3">
          <Spark size={10} className="text-cobalt-2" />
          {PROFILE.name} · {PROFILE.location}
        </p>
        <p className="t-mono text-[0.55rem] text-text-3">
          {lang === "pt" ? "Fundador da VYRO" : "Founder of VYRO"} · {new Date().getFullYear()}
        </p>
        <a href="#top" className="press t-mono text-[0.55rem] text-text-2 hover:text-text">
          {lang === "pt" ? "Voltar ao início" : "Back to start"} ↑
        </a>
      </footer>
    </section>
  );
}

export function Contact() {
  return (
    <div id="contato">
      <Bi>{(t, lang) => <ContactBody t={t} lang={lang} />}</Bi>
    </div>
  );
}
