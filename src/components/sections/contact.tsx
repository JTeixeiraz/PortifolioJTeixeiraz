import { CONTACT, PROFILE } from "@/lib/content";
import { Bi, type T } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { Pic } from "@/components/pic";
import { Spark } from "@/components/spark";
import { VyroMark } from "@/components/vyro-mark";

/**
 * O fecho é a tela de título: PRESS START piscando, o convite em letra
 * grande e os caminhos de saída. O rodapé termina na VYRO.
 */
function ContactBody({ t, lang }: { t: T; lang: Lang }) {
  const c = t(CONTACT);

  return (
    <section aria-labelledby={`contact-heading-${lang}`} className="offscreen wrap mt-24 lg:mt-32">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="tile tile-cobalt rounded-[var(--r-frame)] p-7 sm:p-10 lg:col-span-8 lg:p-14">
          <p className="t-mono flex items-center gap-3 text-[0.62rem] text-white/90">
            <svg viewBox="0 0 10 10" aria-hidden="true" className="blink h-2.5 w-2.5 fill-white">
              <path d="M1 0.5L9.5 5L1 9.5Z" />
            </svg>
            Press start
          </p>
          <h2
            id={`contact-heading-${lang}`}
            className="t-display mt-8 text-[clamp(2.8rem,1.4rem+5vw,6.2rem)] text-white"
          >
            {c.heading}.
          </h2>
          <p className="mt-7 max-w-[46ch] text-[clamp(1rem,0.94rem+0.3vw,1.15rem)] leading-[1.6] text-white/85">
            {c.lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="press inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.92rem] font-medium text-cobalt-deep hover:bg-white/90"
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
          <p className="t-mono mt-8 text-[0.56rem] text-white/70">{c.note}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          <a
            href={PROFILE.vyro}
            target="_blank"
            rel="noopener noreferrer"
            className="lift tile tile-panel flex min-h-[13rem] flex-col justify-between p-6"
          >
            <span className="flex items-center justify-between">
              <VyroMark size={30} strokeWidth={5} className="text-text" />
              <span aria-hidden="true" className="text-text-3">↗</span>
            </span>
            <span>
              <span className="t-display chrome-text block text-[2.4rem]">VYRO</span>
              <span className="mt-2 block text-[0.9rem] text-text-2">{c.vyroLabel}</span>
            </span>
          </a>
          <div className="tile tile-bone grid min-h-[13rem] place-items-center p-6">
            <Pic
              id="eye-target"
              alt=""
              sizes="200px"
              className="block w-40"
              imgClassName="h-auto w-full"
            />
            <a
              href={`mailto:${PROFILE.email}`}
              className="t-mono absolute inset-x-0 bottom-4 truncate px-4 text-center text-[0.62rem] text-bone-dim hover:text-bone-ink"
              style={{ textTransform: "none", letterSpacing: "0.02em" }}
            >
              {PROFILE.email}
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-3 flex flex-col gap-4 rounded-[var(--r-card)] border border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
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
