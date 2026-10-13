"use client";

import { useEffect, useState } from "react";
import { NAV, PROFILE } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { VyroMark } from "@/components/vyro-mark";

/**
 * Barra fixa e transparente sobre o hero; ao rolar, ganha papel translúcido e
 * uma linha. O único botão cheio é a VYRO — é para lá que a página quer
 * mandar quem já leu o suficiente.
 */
export function Nav() {
  const { lang, setLang } = useLang();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-line bg-base/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
      style={{ zIndex: "var(--z-nav)" }}
    >
      <nav
        aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
        className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="type-title grid h-8 w-8 shrink-0 place-items-center rounded-[7px] bg-ink text-[0.72rem] tracking-[-0.02em] text-base">
            JP
          </span>
          <span className="type-title hidden truncate text-[0.98rem] text-ink sm:inline">
            {PROFILE.name}
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <ul className="hidden items-center gap-7 lg:flex">
            {t(NAV).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.88rem] text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="flex items-center rounded-full border border-line p-0.5"
            role="group"
            aria-label={lang === "pt" ? "Idioma" : "Language"}
          >
            {(["pt", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`type-mono min-h-8 rounded-full px-2.5 text-[0.6rem] transition-colors duration-200 ${
                  lang === code
                    ? "bg-ink text-base"
                    : "text-ink-3 hover:text-ink"
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
            className="btn btn-solid min-h-10 px-4 text-[0.86rem]"
          >
            <VyroMark size={15} strokeWidth={7} />
            VYRO
            <span aria-hidden="true" className="text-[0.8rem] opacity-70">
              ↗
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
