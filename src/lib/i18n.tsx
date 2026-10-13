"use client";

import {
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Dict, Lang } from "./content";

const STORAGE_KEY = "jpt.lang";

/**
 * Language lives in a tiny external store rather than in state seeded by an
 * effect. The server always renders Portuguese; on the client the stored (or
 * browser) preference is read through `getSnapshot`, which is what
 * `useSyncExternalStore` exists for: no setState-in-effect, no hydration
 * mismatch, no flash of the provider's default.
 */

let current: Lang | null = null;
const listeners = new Set<() => void>();

function read(): Lang {
  if (current !== null) return current;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") {
      current = stored;
      return current;
    }
  } catch {
    // localStorage can throw in private modes; fall through to the browser.
  }
  current = navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Portuguese is the default: he is in Belo Horizonte and most inbound is local.
const getServerSnapshot = (): Lang => "pt";

export function setLang(lang: Lang) {
  if (current === lang) return;
  current = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // A failed write only costs the preference on the next visit.
  }
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  listeners.forEach((l) => l());
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, read, getServerSnapshot);
  return { lang, setLang };
}

/** Resolve a bilingual value against the active language. */
export function useT() {
  const { lang } = useLang();
  return useCallback(<T,>(value: Dict<T>): T => value[lang], [lang]);
}

/** Product names stay untranslated; descriptive names carry both languages. */
export function resolveName(name: string | Dict<string>, lang: Lang): string {
  return typeof name === "string" ? name : name[lang];
}

/**
 * Keeps `<html lang>` in step with the store for the first paint, which
 * matters for screen-reader pronunciation and for the `:lang()` selector.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();

  // Syncing an external system (the document element) is what effects are for.
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  return <>{children}</>;
}
