"use client";

import { useEffect, useState } from "react";
import { NAV, PROFILE } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { VyroMark } from "@/components/vyro-mark";
import { Spark } from "@/components/spark";

/**
 * A barra é uma pílula flutuante (referências: Verdant, Opticore). Ganha
 * fundo só depois do primeiro scroll. O único botão cheio é a VYRO, com o
 * anel iridescente girando no compositor.
 */
export function Nav() {
  const { lang, setLang } = useLang();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Sentinela em vez de listener de scroll: dispara duas vezes na vida da
    // página, não a cada quadro.
    const sentinel = document.getElementById("topo-sentinela");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-3 px-3 sm:top-4 sm:px-5"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <nav
        aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
        className={`mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 rounded-full border px-2 transition-[background-color,border-color] duration-300 ${
          scrolled
            ? "border-line-2 bg-void-2/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="press flex min-w-0 items-center gap-3 rounded-full py-1 pl-1 pr-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-bone text-bone-ink">
            <Spark size={16} />
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="t-title truncate text-[0.82rem] text-text">{PROFILE.name}</span>
            <span className="t-mono truncate text-[0.52rem] text-text-3">
              {lang === "pt" ? "full stack · fundador da vyro" : "full stack · founder of vyro"}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-void/40 p-1 lg:flex">
          {t(NAV).map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="press block rounded-full px-3.5 py-2 text-[0.8rem] text-text-2 hover:bg-white/[0.06] hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="flex items-center rounded-full border border-line p-1"
            role="group"
            aria-label={lang === "pt" ? "Idioma" : "Language"}
          >
            {(["pt", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`press t-mono h-8 rounded-full px-2.5 text-[0.58rem] ${
                  lang === code ? "bg-text text-void" : "text-text-3 hover:text-text"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href={PROFILE.vyro}
            target="_blank"
            rel="noopener noreferrer"
            className="ring press flex h-10 items-center gap-2 bg-void-2 pl-2 pr-4 text-[0.8rem] font-medium text-text hover:bg-panel-2"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-text text-void">
              <VyroMark size={14} strokeWidth={7} />
            </span>
            VYRO
            <span aria-hidden="true" className="text-text-3">
              ↗
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
