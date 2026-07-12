# Astro Migration Plan — Overview

This directory tracks the full migration of the PubID documentation site from **VitePress** to **Astro 7 + Vite 8 + Tailwind 4 + Starlight**.

## Target stack

| Tool | Version | Role |
|------|---------|------|
| Astro | `^7.0.7` | Site framework, content collections, server islands |
| Vite | `^8.1.4` | Bundler (Astro's transitive dep is already 8.x; pinned explicitly) |
| Tailwind CSS | `^4.3.2` | Styling, via `@tailwindcss/vite ^4.3.2` plugin |
| Starlight | `^0.41.3` | Docs theme (used for Concepts / Library / Specs / Adopt) |
| React | `^19` | UI islands for interactive components (demo, diagrams, filters) |
| Pagefind | `^1.x` | Static site search |
| @astrojs/sitemap | latest | SEO sitemap |

## Working directory

New site lives at **`astro-site/`** at the repo root. The VitePress site at the repo root is left untouched until the final cutover task (#19). This protects the live site and respects the global rule: **never delete source files**.

## Source-of-truth mappings

| VitePress location | Astro location |
|--------------------|----------------|
| `.vitepress/data/*.ts` | `astro-site/src/data/*.ts` |
| `.vitepress/theme/components/*.vue` | `astro-site/src/components/*.tsx` (React) or `.astro` (static) |
| `.vitepress/theme/custom.css` | `astro-site/src/styles/global.css` (Tailwind `@theme`) |
| `publishers/[flavor].md` + `[flavor].paths.ts` | `astro-site/src/pages/publishers/[flavor].astro` |
| `publishers/[flavor]/[type].md` + `[type].paths.ts` | `astro-site/src/pages/publishers/[flavor]/[type].astro` |
| `index.md` (`<HomePage />`) | `astro-site/src/pages/index.astro` + `Home.island.tsx` |
| `concepts/*.md` | `astro-site/src/content/concepts/*.md` |
| `blog/*.md` | `astro-site/src/content/blog/*.md` |
| `library/*.md` | `astro-site/src/content/library/*.md` |
| `adopt/*.md` | `astro-site/src/content/adopt/*.md` |
| `specs/*.md` + `*.adoc` | `astro-site/src/content/specs/*` (AsciiDoc plugin) |
| `public/logos/*.svg`, favicons | `astro-site/public/` (same paths) |
| `.github/workflows/deploy.yml` (VitePress) | `astro-site/.github/workflows/deploy.yml` (Astro) — cutover task |

## Task index

| # | File | Status |
|---|------|--------|
| 01 | [scaffold-and-config.md](./01-scaffold-and-config.md) | started |
| 02 | [tailwind-design-system.md](./02-tailwind-design-system.md) | pending |
| 03 | [data-layer.md](./03-data-layer.md) | pending |
| 04 | [layout-shell-and-navigation.md](./04-layout-shell-and-navigation.md) | pending |
| 05 | [home-page.md](./05-home-page.md) | pending |
| 06 | [publisher-grid.md](./06-publisher-grid.md) | pending |
| 07 | [publisher-detail-pages.md](./07-publisher-detail-pages.md) | pending |
| 08 | [doctype-pages.md](./08-doctype-pages.md) | pending |
| 09 | [anatomy-and-format-diagrams.md](./09-anatomy-and-format-diagrams.md) | pending |
| 10 | [concepts-pages.md](./10-concepts-pages.md) | pending |
| 11 | [blog.md](./11-blog.md) | pending |
| 12 | [library-pages.md](./12-library-pages.md) | pending |
| 13 | [specs-and-asciidoc.md](./13-specs-and-asciidoc.md) | pending |
| 14 | [adopt-page.md](./14-adopt-page.md) | pending |
| 15 | [about-page.md](./15-about-page.md) | pending |
| 16 | [search-integration.md](./16-search-integration.md) | pending |
| 17 | [seo-sitemap-social.md](./17-seo-sitemap-social.md) | pending |
| 18 | [deploy-cicd.md](./18-deploy-cicd.md) | pending |
| 19 | [cutover-and-cleanup.md](./19-cutover-and-cleanup.md) | pending |

## Design philosophy

Apply `/frontend-design` skill throughout. The existing PubID visual identity (deep teal `#2978a1`, warm sand `#da9d76`, generous whitespace, gradient hero text) is preserved and **refined**:

- Typography: pair a distinctive display face (e.g. **Fraunces** or **Newsreader** for headlines, **Inter Tight** or **Geist** for body) — never bare system fonts. Loaded via `@fontsource` or self-hosted.
- Motion: orchestratored page-load reveals (staggered), `view-transitions` for client-side nav, micro-interactions on cards.
- Depth: subtle gradient meshes in hero, soft long-shadow elevation on cards, hairline dividers.
- Dark mode: first-class, system + manual toggle, persisted.

## Branch strategy

All migration work happens on `feat/astro-migration`. PRs are per-task (or per-task-cluster) for reviewability. Final cutover is its own PR that:
1. Removes the VitePress files at repo root
2. Moves `astro-site/*` to repo root
3. Updates GitHub Actions

Each step requires explicit user confirmation.
