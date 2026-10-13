import type { ReactNode } from "react";

/**
 * Título de seção: uma linha em mono com o número da prancha e um marcador
 * vermelho, o título grande em caixa baixa por baixo, e uma régua fina a
 * fechar. O número é numeração real da página, não eyebrow decorativo.
 */
export function SectionHeading({
  children,
  id,
  index,
  aside,
}: {
  children: ReactNode;
  id?: string;
  index: string;
  aside?: string;
}) {
  return (
    <div className="border-b border-line pb-8">
      <div className="flex items-center justify-between gap-6">
        <span className="type-mono flex items-center gap-2.5 text-[0.64rem] text-ink-3">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
          {index}
        </span>
        {aside && (
          <span className="type-mono hidden text-[0.62rem] text-ink-3 sm:block">
            {aside}
          </span>
        )}
      </div>
      <h2
        id={id}
        className="type-display mt-6 max-w-[16ch] text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)] text-ink"
      >
        {children}
      </h2>
    </div>
  );
}
