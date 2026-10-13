import { NAV, PROFILE } from "@/lib/content";
import { Bi } from "@/lib/i18n";
import { VyroMark } from "@/components/vyro-mark";
import { Pic } from "@/components/pic";

/**
 * A barra é uma pílula flutuante (referências: Verdant, Opticore). O fundo
 * aparece com o scroll por CSS (`.nav-pill`, animation-timeline: scroll()),
 * sem listener nem observador. O único botão cheio é a VYRO, com o anel
 * iridescente. Os botões de idioma são ligados pelo script inline do layout.
 */
export function Nav() {
  return (
    <header className="wrap fixed inset-x-0 top-3 sm:top-4" style={{ zIndex: "var(--z-nav)" }}>
      <nav
        aria-label="Navegação principal · Main navigation"
        className="nav-pill flex h-14 w-full items-center justify-between gap-4 rounded-full border px-2"
      >
        <a
          href="#top"
          aria-label={`${PROFILE.name} — início · home`}
          className="press flex min-w-0 items-center gap-3 rounded-full py-1 pl-1 pr-3"
        >
          <Pic
            id="me-avatar"
            alt=""
            priority
            sizes="40px"
            className="block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20"
            imgClassName="h-full w-full object-cover brightness-125"
          />
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="t-title truncate text-[0.85rem] text-text">{PROFILE.name}</span>
            <span className="truncate text-[0.72rem] text-text-3">
              <Bi as="span">{(_, lang) => (lang === "pt" ? "Full stack · fundador da VYRO" : "Full stack · founder of VYRO")}</Bi>
            </span>
          </span>
        </a>

        <Bi>
          {(t) => (
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
          )}
        </Bi>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center rounded-full border border-line p-1" role="group" aria-label="Idioma · Language">
            {(["pt", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                data-set-lang={code}
                aria-pressed={code === "pt"}
                className="lang-btn press t-mono h-8 rounded-full px-2.5 text-[0.58rem] text-text-3 hover:text-text"
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href={PROFILE.vyro}
            target="_blank"
            rel="noopener noreferrer"
            className="ring press flex h-10 items-center gap-2 pl-2 pr-4 text-[0.8rem] font-medium text-text"
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
