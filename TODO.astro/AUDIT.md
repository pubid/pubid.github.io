# Astro Migration — Honest Audit (v2)

**Date:** 2026-07-14
**Scope:** `astro-site/` — full audit after gap-fixing pass

> This audit supersedes the earlier AUDIT.md. The earlier version overclaimed completeness. This one is honest about what's done, what's simplified, and what's missing.

## Direct answers to the user's questions

### Q1: "Did you FULLY migrate ALL pubid site content to astro?"

**Mostly yes, with documented gaps.**

| VitePress source | Status | Notes |
|---|---|---|
| `index.md` (HomePage.vue, 749 lines) | ✅ Migrated | All 9 demo entries now in HeroDemo; ArchitectureDiagram ported; stats + publisher preview present |
| `about.md` (359 lines) | ✅ Faithfully migrated | Full content now in `src/content/about/index.md`, rendered via content collection |
| `concepts/*.md` (6 pages) | ✅ Migrated | `anatomy.mdx` uses inline `<AnatomyDiagram client:visible />` (correct semantic placement) |
| `blog/*.md` (4 posts + index) | ✅ Migrated | Content collection with zod schema |
| `library/*.md` (4 pages) | ⚠️ Migrated minus `<VersionBadge />` | The `library/index.md` originally had an inline Vue component (`<VersionBadge />`) that displays pubid-ruby gem version metadata. Not ported because the `loader.ts` that fed it (`generated/website-data.json`) was a build-time generated file from the Ruby gem. See "Residual debt" below. |
| `adopt/*.md` (2 pages) | ✅ Migrated | Content collection |
| `specs/*.md` (3 pages) | ✅ Migrated | Content collection |
| `specs/*.adoc` (2 files) | ❌ Not migrated | AsciiDoc files skipped. TODO 13 documents the strategy (pre-build conversion via `@asciidoctor/core`). The `.md` wrappers (`iso-urn.md`, `iec-urn.md`) ARE migrated and link to the `.adoc` sources. |
| `publishers/[flavor].md` + `[flavor].paths.ts` | ✅ Replaced by `publishers/[flavor]/index.astro` | VitePress dynamic routing stubs correctly replaced by Astro `getStaticPaths` |
| `publishers/[flavor]/[type].md` + `[type].paths.ts` | ✅ Replaced by `publishers/[flavor]/[type].astro` | Same |
| `404.html` | ✅ Migrated as `src/pages/404.astro` | Styled with brand gradient |
| `README.adoc` | ❌ Not migrated | Root README, not site content |
| `custom-intro.html`, `nav-links.html`, `project-nav.html` | ❌ Not migrated | Jekyll theme fragments (the site was previously Jekyll+VitePress). Not used by VitePress. |
| `parent-hub/title.html` | ❌ Not migrated | Jekyll parent hub. Not used by VitePress. |
| `_pages/blog.html`, `_posts/*.adoc` | ❌ Not migrated | Jekyll legacy blog. Not used by VitePress. |
| `index.adoc` | ❌ Not migrated | AsciiDoc version of homepage. VitePress used `index.md`. |

**Verdict:** All VitePress-served content is migrated. Jekyll legacy files (not served by VitePress) are not migrated — that's out of scope for an Astro migration. The two `.adoc` spec files are the only real gap.

### Q2: "Using Vue islands and fully adopting components?"

**Yes, after the DRY fix in this pass.**

**Before this pass:** `PublisherCard.astro` existed as a reusable component, but `PublisherGrid.vue` re-implemented the card markup inline (DRY violation — noted in the first audit but not fixed).

**After this pass:** `PublisherCard.vue` is the single source of truth for card markup. It's used in two contexts:
1. **Interactive island** — `PublisherGrid.vue` imports and renders `<PublisherCard>` for each filtered publisher (hydrated, interactive filter/search)
2. **Static render** — `index.astro` (homepage preview) imports `PublisherCard` and renders it WITHOUT a `client:` directive → Astro renders it as static HTML, zero JS shipped

This is the correct Astro island architecture: one component, two rendering modes, zero duplication.

**Vue components ported from VitePress:**

| VitePress component | Status | Notes |
|---|---|---|
| `HomePage.vue` (749 lines) | ✅ Decomposed | Split into `HeroDemo.vue` + `ArchitectureDiagram.vue` (islands) + static Astro sections |
| `FlavorPage.vue` (280 lines) | ✅ Decomposed | Split into `FlavorHero.astro` + `DocTypeGrid.vue` + `ComponentsGrid.astro` + `AlgebraTable.astro` + `StagesTable.astro` + `RelatedPublishers.astro` |
| `DocTypePage.vue` (182 lines) | ✅ Ported | As `DocTypePage.astro` |
| `PublisherGrid.vue` (70 lines) | ✅ Ported | Enhanced with category counts |
| `AnatomyDiagram.vue` (49 lines) | ✅ Ported | Used inline in `anatomy.mdx` |
| `FormatDiagram.vue` (178 lines) | ✅ Ported | Enhanced with 4 sample identifiers |
| `BlogIndex.vue` (40 lines) | ✅ Inlined | Logic folded into `blog/index.astro` (static, no interactivity needed) |
| `BlogByline.vue` (17 lines) | ✅ Inlined | Logic folded into `blog/[...slug].astro` |
| `SpecPage.vue` (49 lines) | ⚠️ Not ported | Was a thin wrapper around AsciiDoc content. Since `.adoc` isn't migrated, this component has no purpose yet. |
| `AsciiDocContent.vue` (9 lines) | ⚠️ Not ported | Depends on AsciiDoc processing (TODO 13) |
| `VersionBadge.vue` (31 lines) | ❌ Not ported | Depends on `loader.ts` → `generated/website-data.json` (a build-time file from the Ruby gem). See residual debt. |

### Q3: "Are you using Tailwind 4's default light/dark functionality?"

**Now yes, after the fix in this pass.**

**Before this pass:** I was using CSS custom property swaps (`var(--color-text)` etc. that change based on `[data-theme="dark"]`). This worked for most of the site but the `dark:` Tailwind variant was BROKEN — Header.astro had a hacky `<style>` block manually implementing `dark:block` / `dark:hidden` behavior because Tailwind 4's default `dark:` variant uses `prefers-color-scheme`, not a class/attribute.

**After this pass:** Added `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` to `global.css`. This is Tailwind 4's official way to configure class/attribute-based dark mode. Now:
- `dark:block` works → sun icon visible in dark mode
- `dark:hidden` works → moon icon hidden in dark mode
- Removed the hacky `<style>` block from Header.astro
- Verified via Playwright: in dark mode, sun icon `display: block`, moon icon `display: none` ✓

**Hybrid approach (intentional):**
- **Semantic tokens** via CSS variables (`var(--color-bg)`, `var(--color-text)`) — these change automatically in dark mode via `[data-theme="dark"]` overrides in `@theme`. This is DRY: one class (`bg-[var(--color-bg)]`) works in both modes.
- **`dark:` variants** for one-off cases (icon swap, conditional styling) — now works properly with `@custom-variant`.

Both are valid Tailwind 4 patterns. The semantic token approach is preferred for design system tokens; `dark:` is for exceptions.

## Build verification

| Check | Result |
|---|---|
| `astro check` | 0 errors, 0 warnings, 15 hints (62 files) |
| `vitest run` | 227 tests passing (3 files) |
| `astro build` | 242 pages, ~1.9s |
| Pagefind index | 242 HTML files indexed |
| Sitemap | Generated |
| Dark mode (light → dark toggle) | Verified via Playwright |
| Tailwind `dark:` variant | Verified working (no more hack) |

## Architectural scorecard

| Principle | Compliance | Notes |
|---|---|---|
| **OCP** (open-closed) | ✅ | New publisher = new file in `flavors/`, auto-discovered. No registry edits. |
| **MECE** (mutually exclusive, collectively exhaustive) | ✅ | Each publisher's data in exactly one file. Categories partition the registry. |
| **SSOT** (single source of truth) | ✅ | Component metadata merged into `FlavorComponent`. No parallel data structures. |
| **DRY** | ✅ (after fix) | `PublisherCard.vue` is the single card markup, used in both island and static contexts. |
| **Encapsulation** | ✅ | Each flavor module exports a typed `Publisher`. Internal structure not exposed. |
| **Model-driven** | ✅ | Strong TypeScript types throughout. Zod schemas for content. |
| **Performance** | ✅ | Islands only where interactivity is needed. Static pages ship zero JS. |

## Residual tech debt (honest list)

1. **AsciiDoc specs** (`specs/*.adoc`, 2 files) — not rendered. The `.md` wrappers exist and link to the source. TODO 13 has the plan: pre-build conversion via `@asciidoctor/core`.

2. **VersionBadge** — the `library/index.md` originally displayed a badge with the pubid-ruby gem version + git commit + export date. This required `loader.ts` → `generated/website-data.json` (a build-time file generated by the Ruby gem's export rake task). Not ported because:
   - The `generated/` directory doesn't exist in the Astro site (no rake task wired up)
   - The badge is informational, not critical
   - **Fix:** Either (a) port `loader.ts` and add a rake task to generate the JSON, or (b) remove the badge reference from `library/index.md`. Currently the markdown still has the `<VersionBadge />` tag but it renders as nothing (Astro doesn't know the component).

3. **Starlight sidebar context** — Starlight is configured with all 4 doc sections visible globally. The original VitePress site showed section-appropriate sidebars. Needs `routes` overrides.

4. **`_pre-refactor/` archive** — original `publishers.ts`, `component-data.ts`, `loader.ts` archived under `src/data/_pre-refactor/`. Excluded from tsconfig. Safe to delete after team confirms migration.

5. **`_archived-PublisherCard.astro`** — the old Astro-only card component, replaced by `PublisherCard.vue`. Safe to delete.

6. **Content frontmatter** — some content files had frontmatter added by `scripts/patch-content.mjs` with generic descriptions ("A PubID concept."). Should be hand-curated for production.

7. **`syntax-data.ts`** — migrated verbatim but not used by any component yet. Was likely used by a search/syntax-highlight feature in VitePress. Needs audit.

8. **Jekyll legacy files** at repo root (`_config.yml`, `Gemfile`, `_pages/`, `_posts/`, `_sass/`, `_site/`, `parent-hub/`, `custom-intro.html`, `nav-links.html`, `project-nav.html`) — not part of the VitePress site, not migrated. Should be cleaned up in the cutover task.

9. **Per-page OG images** — basic OG tags in BaseLayout, but no dynamic per-page OG image generation. TODO 17 has the plan.

10. **RSS feed** — `@astrojs/rss` is installed but `/rss.xml` route not created. TODO 11 has the code.

## What I improved in this pass

1. **Tailwind 4 dark mode** — added `@custom-variant dark`, removed hacky `<style>` block, verified via Playwright
2. **PublisherCard DRY** — single Vue SFC, used in both island and static contexts
3. **Full about.md migration** — 359 lines of original content now in content collection (was simplified before)
4. **anatomy.mdx** — inline `<AnatomyDiagram />` at the correct semantic position (was appended at end)
5. **HeroDemo completeness** — all 9 demo entries from the original HomePage.vue (was 4)
6. **404 page** — branded 404.astro
7. **Typography plugin** — `@tailwindcss/typography` installed and configured via `@plugin` (prose classes now work)
8. **About collection** — proper zod-schema'd content collection

## Recommendations

1. **Port VersionBadge** — wire up `loader.ts` to a generated JSON, or remove the reference from `library/index.md`
2. **Convert `.adoc` specs** — pre-build script using `@asciidoctor/core` (TODO 13)
3. **Add RSS feed** — code is in TODO 11, just needs the route file
4. **Starlight `routes` overrides** — per-section sidebars
5. **Hand-curate content descriptions** — replace "A PubID concept." with real descriptions
6. **Visual QA** — walk every page in light + dark, file issues
7. **Plan cutover** — separate PR, coordinate with deploy pipeline

## Conclusion

The Astro migration is now substantially complete and architecturally sound. The VitePress site's content is faithfully migrated (modulo `.adoc` specs and `VersionBadge`). Vue islands are used correctly with DRY component adoption. Tailwind 4's dark mode is properly configured via `@custom-variant`. The build is fast (1.9s for 242 pages), tests pass (227), type checking is clean (0 errors).

The remaining gaps are documented above with clear remediation paths.
