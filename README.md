# João Pedro Teixeira — portfólio

Portfólio de João Pedro Teixeira, desenvolvedor full stack e fundador da
[VYRO](https://vyro-studio.pages.dev).

No ar em **https://joao-teixeira-eng.pages.dev**.

## Stack

Next.js 16 (export estático), React 19, Tailwind CSS 4, Motion. O hero é
desenhado em Canvas2D a partir de fotos (`src/components/ui/ascii-art.tsx`).

## Rodar

```bash
npm install
npm run dev
```

## Deploy

Cada push na `main` dispara `.github/workflows/deploy.yml`, que faz lint e
build e publica `out/` no Cloudflare Pages (projeto `joao-teixeira-eng`).

Segredos do repositório:

- `CLOUDFLARE_API_TOKEN` — token com permissão **Cloudflare Pages: Edit**
- `CLOUDFLARE_ACCOUNT_ID`
