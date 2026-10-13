/**
 * A onda que liga uma seção à outra (referência: a página Tmall, onde o
 * vermelho escorre de um bloco para o próximo). Fica no topo da seção de
 * baixo, pintada na cor dela, sobre a cor da seção de cima — a costura some.
 */
export function Wave({
  fill,
  under,
  variant = "a",
  className,
}: {
  /** cor da seção que começa */
  fill: string;
  /** cor da seção que termina, atrás da onda */
  under: string;
  variant?: "a" | "b";
  className?: string;
}) {
  const d =
    variant === "a"
      ? "M0 70 C 180 10, 360 10, 560 52 S 960 120, 1180 60 S 1440 0, 1440 0 L1440 120 L0 120 Z"
      : "M0 20 C 220 0, 380 110, 640 92 S 1020 10, 1240 40 S 1440 90, 1440 90 L1440 120 L0 120 Z";

  return (
    // -mb-px: a onda invade 1px o bloco de baixo, para não sobrar fresta de
    // arredondamento entre os dois
    <div aria-hidden="true" className={`relative -mb-px ${className ?? ""}`} style={{ background: under }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-[clamp(48px,7vw,120px)] w-full">
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}
