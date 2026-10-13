import type { ReactNode } from "react";
import { Spark } from "@/components/spark";

/**
 * Cabeçalho de seção: o slot do cartão de memória numa pílula, o título
 * largo por baixo e, à direita, o número em blackletter cromado — o único
 * ornamento gótico que se repete na página.
 */
export function SectionHeading({
  children,
  id,
  slot,
  label,
  aside,
}: {
  children: ReactNode;
  id?: string;
  /** "03", "04"… */
  slot: string;
  label: string;
  aside?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
      <div className="min-w-0">
        <p className="t-mono inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-void-2/70 px-4 py-2 text-[0.6rem] text-text-2">
          <Spark size={9} className="text-cobalt-2" />
          Slot {slot}
          <span className="text-text-3">·</span>
          {label}
        </p>
        <h2
          id={id}
          className="t-display mt-5 max-w-[17ch] text-[clamp(2.1rem,1.1rem+3.4vw,4.3rem)] text-text"
        >
          {children}
        </h2>
      </div>
      <div className="flex items-end gap-6">
        {aside}
        <span
          aria-hidden="true"
          className="t-goth chrome-text hidden text-[clamp(4rem,2rem+6vw,7.5rem)] leading-[0.7] md:block"
        >
          {slot}
        </span>
      </div>
    </header>
  );
}
