import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Vyro } from "@/components/sections/vyro";
import { Journey } from "@/components/sections/journey";
import { Craft } from "@/components/sections/craft";
import { Ai } from "@/components/sections/ai";
import { Side } from "@/components/sections/side";
import { Boundary } from "@/components/sections/boundary";
import { Evidence } from "@/components/sections/evidence";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";
import { ScrollProgress } from "@/components/ui/scroll";

/**
 * Papel claro do começo ao fim, com uma laje escura só (o limite). O hero é o
 * anjo tramado em tinta que se dissolve com o scroll; logo depois vem a VYRO,
 * porque os produtos no ar são a prova mais forte da página.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Vyro />
        <Journey />
        <Craft />
        <Ai />
        <Side />
        <Boundary />
        <Evidence />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
