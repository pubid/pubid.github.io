# 03 — Data Layer Migration

**Status:** pending
**Depends on:** 01

## Goal

All TypeScript data files from `.vitepress/data/` are migrated to `astro-site/src/data/` with identical types, plus a thin Astro-flavored loading API for use in `.astro` and `.tsx` files.

## Files to migrate

| Source | Destination | Notes |
|--------|-------------|-------|
| `.vitepress/data/types.ts` | `astro-site/src/data/types.ts` | verbatim copy |
| `.vitepress/data/publishers.ts` | `astro-site/src/data/publishers.ts` | verbatim (already updated with IALA/IHO/Adobe + NIST/OIML doc types) |
| `.vitepress/data/component-data.ts` | `astro-site/src/data/component-data.ts` | verbatim |
| `.vitepress/data/syntax-data.ts` | `astro-site/src/data/syntax-data.ts` | verbatim |
| `.vitepress/data/loader.ts` | `astro-site/src/data/loader.ts` | verbatim |
| `.vitepress/data/component-data.ts` | `astro-site/src/data/component-data.ts` | verbatim |

## Acceptance criteria

- [ ] All 5 data files copied to `astro-site/src/data/`
- [ ] `astro-site/src/data/index.ts` exports a typed public API:
  ```ts
  export { publishers, getPublisher, getPublishersByCategory,
           internationalPublishers, regionalPublishers,
           nationalPublishers, industryPublishers } from './publishers'
  export type { Publisher, DocType, FlavorComponent,
               AlgebraRelation, PubIDStyle, Stage, Category } from './types'
  export { categoryLabels, categoryOrder } from './types'
  export { getComponentMeta } from './component-data'
  ```
- [ ] `publishers.length === 26` (assertion test)
- [ ] `getPublisher('iala')?.docTypes.length === 11`
- [ ] `getPublisher('iho')?.docTypes.length === 5`
- [ ] `getPublisher('adobe')?.docTypes.length === 2`
- [ ] TypeScript `astro check` passes cleanly
- [ ] No VitePress imports remain (`grep -r 'vitepress' astro-site/src/data/` → empty)

## Implementation notes

These files are pure TypeScript with no Vue/VitePress runtime deps. They should copy cleanly. The only change is path adjustments if any relative imports exist.

### Don't do in this task

- Don't add Astro Content Collections schema yet — those come in TODO 10–15 per content type
- Don't write zod schemas for publishers (the types.ts is sufficient and publishers.ts is hand-curated)

## Verification

```ts
// astro-site/src/data/__test__/smoke.ts
import { publishers, getPublisher } from '../index'
console.assert(publishers.length === 26, `expected 26 publishers, got ${publishers.length}`)
console.assert(getPublisher('iala')?.docTypes.length === 11)
console.assert(getPublisher('iho')?.docTypes.length === 5)
console.assert(getPublisher('adobe')?.docTypes.length === 2)
```

Run via `astro-site/node --import tsx src/data/__test__/smoke.ts` or as an Astro script.

## Next

→ TODO 04 (layout shell)
