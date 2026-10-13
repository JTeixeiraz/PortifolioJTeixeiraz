"use client";

import { BACKGROUND, CONTACT, PROFILE } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { VyroMark } from "@/components/vyro-mark";

/**
 * O fecho: o convite em letra grande, os três caminhos de saída e a formação.
 * O rodapé termina na VYRO, que é para onde a página aponta desde o topo.
 */
export function Contact() {
  const t = useT();
  const c = t(CONTACT);
  const bg = t(BACKGROUND);

  return (
    <section
      id="contato"
      className="relative"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-24 sm:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-[1.45fr_1fr] lg:gap-x-20">
          <div className="min-w-0">
            <p className="type-mono flex items-center gap-2.5 text-[0.64rem] text-ink-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
              010
            </p>

            <h2
              id="contact-heading"
              className="type-display mt-6 max-w-[10ch] text-[clamp(3rem,1.4rem+6vw,7rem)] text-ink"
            >
              {c.heading}.
            </h2>

            <Reveal delay={0.06}>
              <p className="measure mt-8 text-[clamp(1.02rem,0.94rem+0.45vw,1.25rem)] leading-[1.6] text-ink-2">
                {c.lead}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={`mailto:${PROFILE.email}`} className="btn btn-solid">
                  {c.mailLabel}
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line"
                >
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="type-mono mt-8 text-[0.62rem] text-ink-3">{c.note}</p>
            </Reveal>
          </div>

          <div className="min-w-0 lg:pt-14">
            <h3 className="type-mono mb-5 text-[0.62rem] text-ink-3">
              {bg.heading}
            </h3>
            <div className="border-t border-line">
              {bg.rows.map((row, i) => (
                <Reveal
                  key={row.title}
                  delay={i * 0.05}
                  y={12}
                  className="border-b border-line py-5"
                >
                  <p className="type-mono text-[0.6rem] text-ink-3">
                    {row.period}
                  </p>
                  <p className="type-title mt-2 text-[1.12rem] text-ink">
                    {row.title}
                  </p>
                  <p className="mt-1 text-[0.88rem] text-ink-2">{row.note}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* A assinatura: a VYRO em letra de fachada, ligada ao site dela. */}
        <a
          href={PROFILE.vyro}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={c.vyroLabel}
          className="group mt-24 flex items-center justify-center gap-[0.12em] border-t border-line pt-14 text-ink transition-colors duration-300 hover:text-ink-2"
        >
          <VyroMark
            size={0}
            strokeWidth={5}
            className="h-[0.78em] w-[0.78em] text-[clamp(4rem,2rem+12vw,13rem)]"
          />
          <span className="type-display text-[clamp(4rem,2rem+12vw,13rem)] leading-none tracking-[-0.06em]">
            VYRO
          </span>
        </a>

        <footer className="mt-12 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-mono text-[0.6rem] text-ink-3">
            {PROFILE.name} · {PROFILE.location} · {PROFILE.utc}
          </p>
          <p className="type-mono text-[0.6rem] text-ink-3">
            {t({ pt: "Fundador da VYRO", en: "Founder of VYRO" })} ·{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </section>
  );
}
