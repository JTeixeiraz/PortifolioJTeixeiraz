"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * Primitivas de scroll. Todas caem para estático sob `prefers-reduced-motion`,
 * e todas animam apenas transform e opacity — nunca propriedade de layout.
 */

/** Desloca no eixo Y conforme o elemento atravessa a viewport. */
export function Parallax({
  children,
  /** Amplitude em px. Negativo sobe mais devagar que o scroll. */
  distance = 90,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smooth = useSpring(y, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y: smooth }}>
      {children}
    </motion.div>
  );
}

/**
 * O painel entra inclinado em rotateX e endireita-se conforme sobe — o gesto
 * que o Portify usa para apresentar o editor.
 */
export function ScrollTilt({
  children,
  className,
  tilt = 16,
  from = 0.965,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [tilt, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0.35, 1]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} style={{ perspective: 1100 }}>
      <motion.div
        className={className}
        style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Barra fina de progresso da página, fixada sob a navegação. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 h-[2px] origin-left bg-signal"
      style={{ zIndex: "var(--z-nav)", scaleX }}
    />
  );
}

/**
 * Devolve o progresso de scroll de uma secção, para quem quiser conduzir
 * a própria animação sem repetir a montagem do observer.
 */
export function useSectionProgress<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}
