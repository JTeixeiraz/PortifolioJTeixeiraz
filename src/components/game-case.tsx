import type { CSSProperties } from "react";
import type { ImageId } from "@/lib/images";
import { Pic } from "@/components/pic";
import { Spark } from "@/components/spark";

/**
 * Um produto da VYRO como capa de jogo de PS2: caixa de DVD com faixa de
 * topo, a tela real como arte de capa, selo de classificação e o disco
 * dentro. No hover a caixa gira um pouco e o disco desliza para fora — tudo
 * transform, nada de JavaScript.
 *
 * O selo é paródia, não a marca da ESRB: "V" de VYRO, com o estágio real do
 * produto escrito por baixo.
 */
export function GameCase({
  name,
  href,
  shot,
  accent,
  ink,
  tagline,
  rating,
  stage,
  platform,
  cta,
  priority = false,
}: {
  name: string;
  href: string;
  shot: ImageId;
  /** Cor da arte de capa e do disco. */
  accent: string;
  /** Cor do texto sobre a arte. */
  ink: string;
  tagline: string;
  rating: string;
  stage: string;
  platform: string;
  cta: string;
  priority?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block outline-none [perspective:1100px]"
      style={{ "--accent": accent } as CSSProperties}
    >
      {/* o disco, atrás da caixa */}
      <span
        aria-hidden="true"
        className="absolute left-[8%] top-[9%] aspect-square w-[84%] rounded-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-[34%] group-hover:rotate-[160deg] group-focus-visible:translate-x-[34%]"
        style={{
          background:
            "radial-gradient(circle, #07080e 0 7%, #c9cfdf 7.5% 12%, transparent 12.5%), repeating-radial-gradient(circle, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 4px), var(--iris)",
          boxShadow: "0 0 0 1px rgb(255 255 255 / 0.25), 0 20px 40px -20px #000",
        }}
      />

      {/* a caixa */}
      <span
        className="relative block aspect-[0.71] overflow-hidden rounded-[18px] bg-[#0d0f17] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/10 transition-transform duration-500 ease-[var(--ease-out)] [transform-origin:left_center] group-hover:[transform:rotateY(-14deg)] group-focus-visible:[transform:rotateY(-14deg)]"
      >
        {/* faixa de topo, preta e brilhante */}
        <span className="relative z-[2] flex h-[9%] items-center justify-between bg-[linear-gradient(180deg,#22252f,#08090d)] px-[7%]">
          <span className="t-mono text-[clamp(0.45rem,0.35rem+0.3vw,0.6rem)] text-white/85">
            VYRO<span className="text-white/40"> · DVD-ROM</span>
          </span>
          <Spark size={10} className="text-white/60" />
        </span>

        {/* a arte de capa */}
        <span
          className="absolute inset-x-0 bottom-0 top-[9%] block"
          style={{
            background:
              "radial-gradient(90% 60% at 70% 30%, color-mix(in srgb, var(--accent) 70%, transparent), transparent 70%), linear-gradient(170deg, color-mix(in srgb, var(--accent) 45%, #07080e), #07080e 75%)",
          }}
        >
          <Pic
            id={shot}
            alt=""
            sizes="(min-width: 1024px) 18vw, 45vw"
            priority={priority}
            className="absolute -right-[10%] top-[40%] block w-[68%] rotate-[8deg]"
            imgClassName="h-auto w-full rounded-[14px] shadow-[0_24px_40px_-16px_rgb(0_0_0/0.8)] ring-1 ring-white/15"
          />

          <span className="absolute left-[7%] right-[7%] top-[7%] block">
            <span
              className="t-display block text-[clamp(1.5rem,0.9rem+2.4vw,2.6rem)] leading-[0.9]"
              style={{ color: ink }}
            >
              {name}
            </span>
            <span
              className="mt-3 block text-[clamp(0.7rem,0.6rem+0.3vw,0.85rem)] leading-[1.35]"
              style={{ color: ink, opacity: 0.85 }}
            >
              {tagline}
            </span>
          </span>

          {/* sombra na base: o selo e a plataforma leem sobre qualquer arte */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(to_top,#07080e_25%,transparent)]"
          />

          {/* selo e plataforma */}
          <span className="absolute bottom-[5%] left-[7%] flex items-end gap-2.5">
            <span className="flex flex-col items-center rounded-[6px] bg-white px-1.5 pb-1 pt-0.5 text-[#07080e] shadow-[0_6px_14px_-6px_#000]">
              <span className="t-display text-[1.35rem] leading-none">{rating}</span>
              <span className="t-mono text-[0.38rem] leading-tight tracking-[0.08em]">
                VYRO
              </span>
            </span>
            <span className="t-mono pb-0.5 text-[0.48rem] leading-[1.5] text-white/80">
              {stage}
              <br />
              <span className="text-white/50">{platform}</span>
            </span>
          </span>
        </span>

        {/* lombada e brilho do plástico */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-[5%] bg-[linear-gradient(90deg,rgb(255_255_255/0.16),transparent)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.12)_45%,transparent_55%)] opacity-60"
        />
      </span>

      <span className="t-mono mt-4 flex items-center justify-between gap-3 text-[0.6rem] text-text-2 transition-colors duration-200 group-hover:text-text">
        <span>
          <svg
            viewBox="0 0 10 10"
            aria-hidden="true"
            className="blink mr-2 inline-block h-2 w-2 -translate-y-px fill-[var(--accent)]"
          >
            <path d="M1 0.5L9.5 5L1 9.5Z" />
          </svg>
          {cta}
        </span>
        <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
