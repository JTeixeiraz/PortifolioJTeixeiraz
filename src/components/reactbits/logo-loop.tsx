"use client";

/* LogoLoop — React Bits (https://reactbits.dev). Portado para TSX, com a folha
   de estilo convertida em classes utilitárias. */

import { useCallback, useEffect, useMemo, useRef, useState, memo, type ReactNode } from "react";

type LogoItem = {
  node: ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
};

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  logoHeight = 28,
  gap = 32,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Ferramentas",
  className,
}: {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const dir = direction === "left" ? 1 : -1;
    return magnitude * dir * (speed < 0 ? -1 : 1);
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM;
      setCopyCount(Math.max(MIN_COPIES, copiesNeeded));
    }
  }, []);

  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      updateDimensions();
      return () => window.removeEventListener("resize", updateDimensions);
    }
    const obs = [containerRef, seqRef].map((ref) => {
      if (!ref.current) return null;
      const o = new ResizeObserver(updateDimensions);
      o.observe(ref.current);
      return o;
    });
    updateDimensions();
    return () => obs.forEach((o) => o?.disconnect());
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.transform = "translate3d(0,0,0)";
      return;
    }

    let raf = 0;
    let last: number | null = null;
    let offset = 0;
    let velocity = 0;

    const animate = (ts: number) => {
      if (last === null) last = ts;
      const dt = Math.max(0, ts - last) / 1000;
      last = ts;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      velocity += (target - velocity) * (1 - Math.exp(-dt / SMOOTH_TAU));
      if (seqWidth > 0) {
        offset = (((offset + velocity * dt) % seqWidth) + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [targetVelocity, seqWidth, isHovered, hoverSpeed]);

  const lists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="flex items-center"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, i) => (
            <li
              key={`${copyIndex}-${i}`}
              className="flex-none"
              style={{ marginRight: gap, fontSize: logoHeight, lineHeight: 1 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={item.ariaLabel ?? item.title ?? "logo"}
                  className="inline-flex items-center transition-opacity hover:opacity-75"
                >
                  <span className={`inline-flex items-center transition-transform duration-300 ${scaleOnHover ? "hover:scale-110" : ""}`}>
                    {item.node}
                  </span>
                </a>
              ) : (
                <span className="inline-flex items-center" title={item.title}>
                  {item.node}
                </span>
              )}
            </li>
          ))}
        </ul>
      )),
    [copyCount, logos, gap, logoHeight, scaleOnHover],
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      role="region"
      aria-label={ariaLabel}
      style={
        fadeOut
          ? {
              maskImage: `linear-gradient(to right, transparent, ${fadeOutColor ? "black" : "black"} 6%, black 94%, transparent)`,
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }
          : undefined
      }
    >
      <div
        className="flex w-max select-none"
        ref={trackRef}
        onMouseEnter={() => hoverSpeed !== undefined && setIsHovered(true)}
        onMouseLeave={() => hoverSpeed !== undefined && setIsHovered(false)}
      >
        {lists}
      </div>
    </div>
  );
});

export default LogoLoop;
