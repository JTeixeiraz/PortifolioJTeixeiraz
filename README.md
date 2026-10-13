# João Pedro Teixeira — portfólio

Portfólio pessoal de **João Pedro Teixeira**, desenvolvedor full stack na
squad de Engenharia de Software da XP Educação e fundador da
[VYRO](https://vyro-studio.pages.dev), a empresa por trás de Birdy, LUMI e
Postly.

**No ar:** https://joao-teixeira-eng.pages.dev

## Visão geral

Um bento de cartões arredondados, de tamanhos diferentes, no estilo
cybertribal de 2012 (console, tatuagem, fita de fitas). A página é lida de
cima a baixo como uma sequência de seções, e cada seção tem uma forma e uma
forma de entrar:

| # | Seção | O que mostra |
|---|-------|--------------|
| 01 | Hero | Quem é, o que faz, e o olho com mira |
| 02 | VYRO | Os três projetos como capas de Nintendo DS |
| 03 | Ofício | Seis coisas que ele faz numa squad, com exemplo real |
| 04 | IA | Como usa agentes de IA, com o contexto como tese |
| 05 | Projetos | Ficha técnica de cada projeto, com seletor em dock |
| 06 | Ferramenta | O que já foi para produção, agrupado por área |
| 07 | Jornada | Squad, produto e freela, mais a formação |
| 08 | Limite | Onde a automação para |
| 09 | Evidências | Afirmações com a fonte de cada número |
| 10 | Contato | E-mail, LinkedIn, GitHub e a VYRO |

O conteúdo é bilíngue (português e inglês). O idioma é escolhido pela
preferência salva ou pelo navegador, e troca sem recarregar a página.

## Stack

- **Next.js 16** com export estático (`output: "export"`)
- **React 19**, sem bibliotecas de animação
- **Tailwind CSS 4**
- Fontes **Unbounded**, **Geist**, **JetBrains Mono** e **UnifrakturMaguntia** (blackletter, só em números de seção)
- **sharp** para gerar as imagens (dev)

A página é estática e o HTML sai com o CSS inline. Não há JavaScript de
framework no navegador: o runtime do Next é removido pelo script
`scripts/strip-js.mjs`, e o idioma é trocado por um script inline de
poucas linhas.

## Desempenho

Medido com Lighthouse 12 no build de produção, servido com compressão:

| | Desempenho | Acessibilidade | Boas práticas | SEO | Bloqueio | CLS |
|---|---|---|---|---|---|---|
| Celular | 96 | 100 | 100 | 100 | 0 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0 ms | 0 |

Decisões que sustentam esses números:

- Animações só com `transform` e `opacity`, ligadas ao scroll pelo navegador
  (`animation-timeline: view()`), sem listener de scroll.
- Imagens em AVIF e WebP, em duas ou três larguras, com `width` e `height`
  reservando o espaço. As tatuagens viram tinta com transparência, em vez de
  usar `mix-blend-mode`.
- Fundos desfocados (`*-blur.webp`) gerados no build com 48 px, em vez de
  `filter: blur()` no navegador.
- Abaixo de 768 px, as seções com muitos cartões viram carrossel de deslize
  (`scroll-snap`), sem JavaScript.

## Rodar localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

Para publicar uma versão estática:

```bash
npm run build        # gera out/ e remove o runtime do Next
npx serve out        # ou qualquer servidor de arquivos estáticos
```

## Imagens

As imagens-fonte ficam em `scripts/raw/`. O script `scripts/images.mjs`
gera tudo em `public/img/` e reescreve o manifesto `src/lib/images.ts`, que
é o que o componente `<Pic>` lê:

```bash
npm run images
```

Imagens com `blur: true` ganham também a versão desfocada. Imagens com
`mode: "ink"` (tatuagens em fundo branco) viram tinta com transparência.
O ícone da aba (`src/app/icon.png`) é gerado a partir do avatar.

## Estrutura

```
src/
  app/            layout, página, globals.css (todo o sistema visual)
  components/
    sections/     uma seção por arquivo (hero, vyro, craft, ai, side, …)
    pic.tsx       <picture> responsivo a partir do manifesto
    ds-case.tsx   capa de Nintendo DS dos projetos da VYRO
    wave.tsx      onda que costura uma seção na outra
    section-heading.tsx
  lib/
    content.ts    todo o texto, nas duas línguas
    i18n.tsx      <Bi> (dois idiomas no HTML) e os scripts de idioma
    images.ts     manifesto gerado por scripts/images.mjs
scripts/
  images.mjs      gera imagens e o manifesto
  strip-js.mjs    remove o runtime do Next do HTML exportado
  raw/            imagens-fonte
public/
  img/            imagens geradas
```

Para mudar um texto, edite `src/lib/content.ts`. Os dois idiomas ficam no
mesmo objeto.

## Deploy

Cada push na `main` dispara `.github/workflows/deploy.yml`, que faz lint,
build e publica `out/` no projeto `joao-teixeira-eng` do Cloudflare Pages.

Segredos do repositório:

- `CLOUDFLARE_API_TOKEN`: token com permissão **Cloudflare Pages: Edit**
- `CLOUDFLARE_ACCOUNT_ID`

## Licença

Todo o conteúdo (textos, fotos e obras de terceiros) é de seus autores. O
código do site é de João Pedro Teixeira. As imagens de terceiros usadas em
referência de estilo não estão sob licença aberta.
