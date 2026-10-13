import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Vyro } from "@/components/sections/vyro";

/**
 * SLOT 1. A página é um bento de cartões arredondados: o hero, a VYRO como
 * estante de jogos, e as seções do ofício como cartões de memória.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo" className="pb-3">
        <Hero />
        <Vyro />
      </main>
    </>
  );
}
