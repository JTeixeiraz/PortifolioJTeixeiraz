/**
 * O símbolo VYRO, copiado da geometria do site da empresa: a silhueta de
 * escudo, o vale superior, as diagonais de ombro e as hastes que descem ao
 * ápice. Line-art em currentColor, para herdar a cor de quem o usa.
 */
const STROKES = [
  "M32 14 L17 26 L17 58 L50 87 L83 58 L83 26 L68 14",
  "M17 26 L50 47 L83 26",
  "M32 14 L50 47 L68 14",
  "M32 14 L50 87 L68 14",
];

export function VyroMark({
  size = 20,
  strokeWidth = 5,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {STROKES.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
