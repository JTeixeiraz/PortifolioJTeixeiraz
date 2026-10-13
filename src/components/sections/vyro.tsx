"use client";

import { PROFILE, VYRO, VYRO_PRODUCTS, type VyroProduct } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { VyroMark } from "@/components/vyro-mark";

/**
 * A VYRO logo depois do hero, porque é a prova mais forte da página: três
 * produtos que existem fora dela. Cada um ganha um palco na própria cor, com
 * a captura real em moldura de aparelho ou de janela, e o endereço onde pode
 * ser aberto agora.
 */
export function Vyro() {
  const t = useT();
  const v = t(VYRO);

  return (
    <section
      id="vyro"
      className="relative border-t border-line"
      aria-labelledby="vyro-heading"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <Reveal>
            <p className="type-mono flex items-center gap-3 text-[0.66rem] text-ink-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-base">
                <VyroMark size={15} strokeWidth={7} />
              </span>
              VYRO · {v.kicker}
            </p>
            <h2
              id="vyro-heading"
              className="type-display mt-7 text-[clamp(2.6rem,1.2rem+4.6vw,5.4rem)] text-ink"
            >
              {v.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-[1.65] text-ink-2">
              {v.lead}
            </p>
            <a
              href={PROFILE.vyro}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid mt-8"
            >
              {v.visit}
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {VYRO_PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductCard({ product: p }: { product: VyroProduct }) {
  const t = useT();
  const dark = p.id === "birdy";

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[20px]"
        style={{
          background: `radial-gradient(120% 70% at 50% 0%, ${
            dark ? "rgb(255 255 255 / 0.09)" : "rgb(255 255 255 / 0.6)"
          }, transparent 62%), ${p.plate}`,
        }}
      >
        {p.shot.kind === "phone" ? (
          <div className="phone absolute left-1/2 top-[11%] w-[54%] -translate-x-1/2 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- export estático, sem otimizador */}
            <img
              src={p.shot.src}
              width={p.shot.width}
              height={p.shot.height}
              alt={`${p.name}: ${t(p.line)}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="window absolute left-[9%] top-[18%] w-[128%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
            <div className="window-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- export estático, sem otimizador */}
            <img
              src={p.shot.src}
              width={p.shot.width}
              height={p.shot.height}
              alt={`${p.name}: ${t(p.line)}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="type-title text-[1.6rem] text-ink">{p.name}</h3>
        <span
          aria-hidden="true"
          className="text-[1.1rem] text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        >
          ↗
        </span>
      </div>
      <p className="type-mono mt-2 text-[0.62rem] text-signal-lite">
        {t(p.status)}
      </p>
      <p className="mt-4 text-[0.96rem] leading-[1.6] text-ink-2">{t(p.line)}</p>
      <p className="mt-4 text-[0.86rem] text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-200 group-hover:decoration-ink">
        {p.domain}
      </p>
    </a>
  );
}
