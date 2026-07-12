# 01 — Scaffold & Config

**Status:** started (this session)
**Branch:** `feat/astro-migration`
**Working dir:** `astro-site/` (new subdir; VitePress at root is untouched)

## Goal

A runnable Astro 7 project with Starlight, Tailwind 4, React, and SSG output configured. `astro dev` boots, `astro build` produces `.html` files, and a placeholder home page renders with Tailwind classes applied.

## Acceptance criteria

- [ ] `astro-site/package.json` exists with these deps (versions ≥ the floor listed):
  - `astro@^7.0.7`
  - `vite@^8.1.4`
  - `@astrojs/starlight@^0.41.3`
  - `@astrojs/react@latest`, `@astrojs/sitemap@latest`, `@astrojs/mdx@latest`
  - `tailwindcss@^4.3.2`, `@tailwindcss/vite@^4.3.2`
  - `react@^19`, `react-dom@^19`, `@types/react@^19`
  - `@fontsource-variable/fraunces`, `@fontsource-variable/inter-tight` (or chosen pair)
- [ ] `astro-site/astro.config.mjs` configured with:
  - `site: 'https://www.pubid.com'`
  - `output: 'static'`
  - integrations: `starlight()`, `react()`, `mdx()`, `sitemap()`
  - `vite.plugins: [tailwindcss()]` (the `@tailwindcss/vite` plugin)
  - `markdown.shikiConfig` matching the brand palette
- [ ] `astro-site/tsconfig.json` extends `astro/tsconfigs/strict`
- [ ] `astro-site/src/styles/global.css` does `@import "tailwindcss";` and imports the design tokens from TODO 02
- [ ] `astro-site/src/pages/index.astro` renders a hero with the PubID logo and headline
- [ ] `npm run dev` boots on a free port, returns 200 for `/`
- [ ] `npm run build` produces `astro-site/dist/index.html`

## Implementation notes

### Astro 7 specifics

- Astro 7 stable was released after Starlight 0.34. Starlight 0.41 supports Astro 7 — verified via `npm view @astrojs/starlight peerDependencies`.
- Use the Content Layer API (`src/content.config.ts`) for collections — replaces `getStaticPaths`-style content fetching for MD/MDX.

### Starlight layout strategy

Starlight ships its own layout. We use it for the docs-shaped sections (Concepts, Library, Specs, Adopt) under route prefixes like `/concepts/*`, `/library/*`, etc. — each gets its own Starlight sidebar via `StarlightRoute` overrides, or we run multiple Starlight instances.

The homepage and publisher pages (which have heavily custom UI) live OUTSIDE Starlight, using our own `BaseLayout.astro`.

### Tailwind 4 via Vite plugin

Tailwind 4 uses the Vite plugin directly — **no `tailwind.config.js` needed**, no PostCSS config. Tokens are declared in CSS via `@theme { --color-accent: ...; }`. Custom utilities via `@utility`.

```css
@import "tailwindcss";
@theme {
  --color-pubid: #2978a1;
  --font-display: "Fraunces Variable", serif;
}
```

### Don't do in this task

- Don't port the actual VitePress components yet (TODO 05–09).
- Don't migrate content collections yet (TODO 10–15).
- Don't touch VitePress files at the repo root.

## Inputs / references

- Versions verified via `npm view` (see README.md)
- Existing VitePress config: `.vitepress/config.ts`
- Existing custom CSS tokens: `.vitepress/theme/custom.css` lines 7–48

## Outputs

- `astro-site/` directory tree
- First commit on `feat/astro-migration`
- A dev server URL the user can open

## Next

→ TODO 02 (design system tokens)
