import type { ReactNode } from "react";

/**
 * Cabeçalho de seção: o título largo e, à direita, o número do slot em
 * cromado. Sem pílula de rótulo — o número já diz onde se está.
 */
export function SectionHeading({
  children,
  id,
  slot,
  aside,
  className,
}: {
  children: ReactNode;
  id?: string;
  /** "03", "04"… */
  slot: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`grid grid-cols-1 items-end gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_auto] ${className ?? ""}`}
    >
      <h2
        id={id}
        className="t-display max-w-[18ch] text-[clamp(2.1rem,1.1rem+3.4vw,4.6rem)] text-text"
      >
        {children}
      </h2>
      <div className="flex items-end gap-6">
        {aside}
        <span
          aria-hidden="true"
          className="t-display chrome-text hidden text-[clamp(3.5rem,2rem+4vw,6.5rem)] leading-[0.78] md:block"
        >
          {slot}
        </span>
      </div>
    </header>
  );
}
