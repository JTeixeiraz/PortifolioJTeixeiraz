"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * A scroll reveal that can never ship a blank section.
 *
 * The server renders the element in its FINAL state, so anything that does not
 * run the effect — no JS, a crawler, a print, a headless screenshot that never
 * scrolls — still sees the content. Only after mount, and only for elements
 * that are genuinely below the fold, do we drop to the hidden state and let an
 * IntersectionObserver bring them back. Nobody can see that drop, because by
 * definition it happens off-screen.
 */

type Phase = "static" | "hidden" | "shown";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  as: Component = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const belowFold = el.getBoundingClientRect().top > window.innerHeight * 0.9;
    if (!belowFold) return;

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      // threshold 0, not a fraction: an element taller than the viewport can
      // never satisfy a fractional threshold, and would stay hidden forever.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    // Safety net: if the observer never fires (a container that never scrolls,
    // a background tab that is closed before scrolling), show it anyway.
    const timer = window.setTimeout(() => setPhase("shown"), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const style =
    phase === "static"
      ? undefined
      : {
          opacity: phase === "shown" ? 1 : 0,
          transform: phase === "shown" ? "none" : `translate3d(0, ${y}px, 0)`,
          transition: `opacity 0.7s var(--ease-out-expo) ${delay}s, transform 0.7s var(--ease-out-expo) ${delay}s`,
        };

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      data-reveal={phase}
    >
      {children}
    </Component>
  );
}
