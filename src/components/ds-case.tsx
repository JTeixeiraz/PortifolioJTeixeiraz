import type { CSSProperties } from "react";
import type { ImageId } from "@/lib/images";
import { Pic } from "@/components/pic";

/**
 * Um projeto da VYRO como capa de Nintendo DS (referência: a capa "NMIXX"):
 * lombada branca com a marca na vertical, foto ocupando a capa inteira, o
 * nome em letras quadradas no canto e o selo de classificação embaixo. A
 * tela real do produto entra como adesivo inclinado, que sobe no hover.
 *
 * O selo é paródia, não a marca da ESRB: "V" de VYRO.
 */
export function DsCase({
  name,
  href,
  art,
  shot,
  accent,
  stage,
  tagline,
  priority = false,
}: {
  name: string;
  href: string;
  art: ImageId;
  shot: ImageId;
  accent: string;
  stage: string;
  tagline: string;
  priority?: boolean;
}) {
  const landscape = shot === "postly-campanha";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block outline-none"
      style={{ "--accent": accent } as CSSProperties}
    >
      <span className="relative flex aspect-[0.9] overflow-hidden rounded-[22px] bg-[#0b0b10] shadow-[0_40px_70px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/10 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-2 group-hover:rotate-[-1deg] group-focus-visible:-translate-y-2">
        {/* a lombada branca, com a marca de pé */}
        <span className="relative z-[2] flex w-[17%] shrink-0 items-center justify-center bg-[linear-gradient(90deg,#f4f4f6,#dcdce2)]">
          <span className="t-display rotate-180 text-[clamp(1.1rem,0.6rem+1.6vw,2rem)] tracking-[0.02em] text-[#0b0b10] [writing-mode:vertical-rl]">
            VYRO
          </span>
          {/* o recorte preto da lombada, como na caixa de verdade */}
          <span aria-hidden="true" className="absolute -right-[6px] top-[38%] h-[16%] w-3 rounded-full bg-[#0b0b10]" />
        </span>

        {/* a arte */}
        <span className="relative block flex-1 overflow-hidden">
          <Pic
            id={art}
            alt=""
            priority={priority}
            sizes="(min-width: 1024px) 28vw, 80vw"
            className="absolute inset-0 block"
            imgClassName="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_8_14/0.55),transparent_35%,transparent_55%,rgb(7_8_14/0.85))]"
          />

          {/* nome em letras quadradas, no canto */}
          <span className="t-mono absolute right-[6%] top-[5%] text-right text-[clamp(1.4rem,0.8rem+1.8vw,2.6rem)] font-light leading-none tracking-[0.28em] text-white">
            {name}
          </span>

          {/* a tela real, como adesivo */}
          <Pic
            id={shot}
            alt={`${name}: ${tagline}`}
            sizes="(min-width: 1024px) 12vw, 40vw"
            className={`absolute block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-3 ${
              landscape
                ? "bottom-[16%] left-[5%] w-[64%] -rotate-[5deg]"
                : "bottom-[-18%] left-[6%] w-[38%] -rotate-[7deg]"
            }`}
            imgClassName="h-auto w-full rounded-[12px] shadow-[0_20px_40px_-12px_rgb(0_0_0/0.9)] ring-1 ring-white/20"
          />

          {/* estágio na vertical e o selo */}
          <span className="absolute bottom-[5%] right-[5%] flex items-end gap-2">
            <span className="t-mono text-[0.5rem] leading-[1.15] tracking-[0.3em] text-white [writing-mode:vertical-rl]">
              {stage}
            </span>
            <span className="flex flex-col items-center bg-white px-1.5 pb-1 pt-0.5 text-[#0b0b10]">
              <span className="t-display text-[1.5rem] leading-none">V</span>
              <span className="t-mono text-[0.36rem] leading-tight tracking-[0.06em]">RATED VYRO</span>
            </span>
          </span>
        </span>

        {/* brilho do plástico */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(118deg,transparent_38%,rgb(255_255_255/0.14)_47%,transparent_56%)] opacity-70"
        />
      </span>
    </a>
  );
}
