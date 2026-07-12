# 07 — Publisher Detail Pages

**Status:** pending
**Depends on:** 03, 04, 06

## Goal

Dynamic route `/publishers/[flavor]` rendering a full detail page for each of the 26 publishers. Port of `FlavorPage.vue` (280 lines).

## Source

- `.vitepress/theme/components/FlavorPage.vue` (280 lines)
- `publishers/[flavor].md` (19 lines)
- `publishers/[flavor].paths.ts` (8 lines)

## Sections to reproduce

1. **Hero** — logo(s), name, fullName, description, syntax block, website link, version badge
2. **Stats** — Doc Types count, Components count, Algebra Relations count, Stages count
3. **Section nav** — Document Types, Components, Styles (if any), Algebra, Stages (if any), Related
4. **Document Types grid** — expandable cards per type. Each card: title, abbreviation chip(s), description, examples
5. **Components grid** — typed data chips with `:attribute` tags, value previews
6. **Rendering Styles** (NIST only currently) — full/abbrev/short/mr cards
7. **Algebra table** — relation / description / syntax / example
8. **Stages table** — code / abbr / name
9. **Related Publishers** — link chips

## Acceptance criteria

- [ ] `astro-site/src/pages/publishers/[flavor].astro` exists
  - Uses `getStaticPaths()` to generate 26 pages from `publishers`
  - Uses `BaseLayout`
  - For an unknown flavor, render a friendly 404 within the layout
- [ ] `astro-site/src/components/publishers/FlavorHero.astro`
- [ ] `astro-site/src/components/publishers/DocTypeGrid.tsx` — React island for expandable cards
- [ ] `astro-site/src/components/publishers/ComponentsGrid.astro` — static, with `enrich()` from `component-data.ts`
- [ ] `astro-site/src/components/publishers/AlgebraTable.astro` — static
- [ ] `astro-site/src/components/publishers/StagesTable.astro` — static
- [ ] `astro-site/src/components/publishers/RelatedPublishers.astro` — static chips
- [ ] Section-nav is sticky and highlights active section on scroll (IntersectionObserver)
- [ ] "Expand All / Collapse All" button works
- [ ] All 26 publisher pages render correctly (manual smoke test)
- [ ] Examples with `output !== input` show the arrow + transformed output

## Implementation notes

### getStaticPaths

```ts
export async function getStaticPaths() {
  return publishers.map(p => ({
    params: { flavor: p.flavor },
    props: { publisher: p },
  }))
}
```

### Component data enrichment

The Vue port uses `enrich(comp) = { ...comp, ...getComponentMeta(flavor, comp.name) }`. Same logic in Astro:

```astro
---
import { getComponentMeta } from '~/data'
const { publisher: p } = Astro.props
const enriched = p.components.map(c => ({ ...c, ...getComponentMeta(p.flavor, c.name) }))
---
```

### DocTypeGrid — interactive or static?

The Vue version uses an expand/collapse per card. Port to React island for the toggle behavior. Or: render all expanded and use `<details>` for pure-CSS collapse — zero JS. Pick `<details>` for performance.

**Decision:** Use `<details>` / `<summary>` for per-card expand. "Expand All" button is a tiny React island that flips all `<details open>`.

### Multi-logo publishers

CEN-CENELEC has `logos: [...]`. Render both side-by-side in the hero.

### Don't do in this task

- Don't build the per-doctype subpages (TODO 08)
- Don't yet wire up the sidebar with publisher + doctype tree (TODO 08's responsibility)

## Verification

Manual smoke test: visit `/publishers/{iso,iec,ieee,itu,cen-cenelec,etsi,nist,bsi,ansi,jis,astm,ashrae,asme,ccsds,cie,csa,oiml,jcgm,idf,api,amca,plateau,sae,iala,iho,adobe}/` — each must render with all sections populated from `publishers.ts` data.

## Next

→ TODO 08 (doctype pages)
