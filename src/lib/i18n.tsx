import type { ReactNode } from "react";
import type { Dict, Lang } from "./content";

/**
 * Idioma sem React no cliente.
 *
 * A página é estática e sai com os dois idiomas no HTML: <Bi> renderiza o
 * conteúdo uma vez por idioma, e o CSS mostra só o ativo (`html[data-lang]`).
 * O idioma inativo fica em `display: none` — não entra em layout nem pinta.
 * A troca é um script inline de poucas linhas; assim o site não precisa do
 * runtime do React no navegador, e o build tira o JavaScript do Next.
 */

export type T = <V>(value: Dict<V>) => V;

const LANGS: Lang[] = ["pt", "en"];

export function Bi({
  children,
  as: Tag = "div",
}: {
  children: (t: T, lang: Lang) => ReactNode;
  /** "span" quando o pai é inline. */
  as?: "div" | "span";
}) {
  return (
    <>
      {LANGS.map((lang) => (
        <Tag key={lang} data-l={lang} lang={lang === "pt" ? "pt-BR" : "en"}>
          {children(<V,>(value: Dict<V>) => value[lang], lang)}
        </Tag>
      ))}
    </>
  );
}

const KEY = "jpt.lang";

/**
 * Roda no <head>, antes da primeira pintura: decide o idioma (escolha salva,
 * senão o do navegador) e marca o <html>. Sem flash do idioma errado.
 */
export const LANG_HEAD_SCRIPT = `(function(){try{var d=document.documentElement,s=localStorage.getItem("${KEY}"),l=s==="pt"||s==="en"?s:((navigator.language||"").toLowerCase().indexOf("pt")===0?"pt":"en");d.setAttribute("data-lang",l);d.lang=l==="pt"?"pt-BR":"en"}catch(e){}})();`;

/**
 * Roda no fim do <body>: no celular fecha os acordeões da Ferramenta (que
 * saem abertos no HTML), liga os botões [data-set-lang] e mantém
 * aria-pressed em dia. Um listener só, delegado no documento.
 */
export const LANG_BODY_SCRIPT = `(function(){var d=document.documentElement;if(matchMedia("(max-width: 767.98px)").matches){document.querySelectorAll("details.stack-row[open]").forEach(function(x){x.removeAttribute("open")})}function sync(){var l=d.getAttribute("data-lang")||"pt";document.querySelectorAll("[data-set-lang]").forEach(function(b){b.setAttribute("aria-pressed",String(b.getAttribute("data-set-lang")===l))})}sync();document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-set-lang]");if(!b)return;var l=b.getAttribute("data-set-lang");d.setAttribute("data-lang",l);d.lang=l==="pt"?"pt-BR":"en";try{localStorage.setItem("${KEY}",l)}catch(_){}sync()})})();`;
