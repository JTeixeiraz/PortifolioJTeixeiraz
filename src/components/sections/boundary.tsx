"use client";

import { BOUNDARY, LABELS } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AsciiPlate } from "@/components/ui/meander";
import { Parallax } from "@/components/ui/scroll";

/**
 * A laje escura. É o argumento que ele mais quer que seja lido, então ganha o
 * peso máximo da página: a única inversão no meio do papel, com a roseta em
 * ASCII como marca-d'água. `ink-slab` inverte os tokens só aqui dentro.
 */
export function Boundary() {
  const t = useT();
  const b = t(BOUNDARY);
  const labels = t(LABELS);

  return (
    <section id="limite">
      <div
        className="ink-slab relative isolate overflow-hidden"
        aria-labelledby="boundary-heading"
      >
        <Parallax
          distance={70}
          className="pointer-events-none absolute -right-28 top-1/2 -z-10 hidden -translate-y-1/2 xl:block"
        >
          <AsciiPlate
            cols={104}
            rows={40}
            className="text-[0.62rem] text-ink opacity-[0.13]"
          />
        </Parallax>

        <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32">
          <SectionHeading id="boundary-heading" index="007">
            {b.heading}
          </SectionHeading>

          <Reveal>
            <p className="mt-10 max-w-[38ch] type-title text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] leading-[1.25] text-ink">
              {b.lead}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:gap-x-20">
            {b.columns.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="border-t border-line pt-6">
                  <p className="type-mono mb-4 text-[0.62rem] text-signal-lite">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-title text-[1.25rem] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-[0.92rem] leading-[1.7] text-ink-2">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="type-mono mt-14 text-[0.6rem] text-ink-2">
            {labels.boundary}
          </p>
        </div>
      </div>
    </section>
  );
}
