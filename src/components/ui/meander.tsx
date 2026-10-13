/**
 * Meander — the Greek key, as a repeating horizontal band. Used where a page
 * would normally get a 1px hairline; it carries the same structural job and
 * puts the classical register on the page instead of talking about it.
 */
export function MeanderRule({
  className,
  height = 18,
  opacity = 0.55,
  /** Stroke colour. A data URI cannot inherit currentColor, so it is passed. */
  color = "#F2EDE4",
}: {
  className?: string;
  height?: number;
  opacity?: number;
  color?: string;
}) {
  // The `#` must stay literal here: pre-escaping it to %23 would be encoded
  // again below into %2523 and the stroke would silently fall back to black.
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path d='M0,20 L0,4 L16,4 L16,16 L8,16 L8,10 L12,10 L12,13.5 L10,13.5' fill='none' stroke='${color}' stroke-width='1.7'/></svg>`;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height,
        opacity,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: `${height}px ${height}px`,
      }}
    />
  );
}

/**
 * AsciiPlate — a radial figure resolved into characters. Deterministic, so it
 * renders identically on the server; purely decorative, so it is hidden from
 * assistive tech.
 */
export function AsciiPlate({
  cols = 64,
  rows = 30,
  className,
}: {
  cols?: number;
  rows?: number;
  className?: string;
}) {
  const ramp = " .·:-=+*#%@";
  const lines: string[] = [];

  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols; x++) {
      // Aspect correction: a monospace cell is about twice as tall as wide.
      const nx = (x / cols - 0.5) * 2;
      const ny = ((y / rows - 0.5) * 2) / 2;
      const d = Math.hypot(nx, ny);
      const a = Math.atan2(ny, nx);
      // Rosette: a ring modulated by twelve petals.
      const petal = Math.cos(a * 12) * 0.06;
      const v = Math.max(0, 1 - Math.abs(d - 0.44 - petal) * 5.2);
      line += ramp[Math.min(ramp.length - 1, Math.round(v * (ramp.length - 1)))];
    }
    lines.push(line);
  }

  return (
    <pre
      aria-hidden="true"
      className={className}
      style={{
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        lineHeight: 1,
        letterSpacing: "0.06em",
        whiteSpace: "pre",
        margin: 0,
      }}
    >
      {lines.join("\n")}
    </pre>
  );
}
