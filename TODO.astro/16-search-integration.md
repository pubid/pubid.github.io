# 16 — Search Integration

**Status:** pending
**Depends:** 05, 06, 07, 10, 11, 12, 13, 14, 15 (most content in place)

## Goal

Site-wide full-text search powered by **Pagefind** (static, no backend, indexed at build time). Replaces VitePress's built-in local search.

## Acceptance criteria

- [ ] `astro-site/package.json` adds `pagefind@^1.x` as a dev dependency
- [ ] `astro-site/scripts/postbuild.mjs` runs `pagefind --site dist` after `astro build`
- [ ] A search UI in the header:
  - Trigger: `/` keyboard shortcut OR clicking the search icon
  - Modal: full-screen overlay, input field, grouped results by section
- [ ] `astro-site/src/components/SearchModal.tsx` — React island
- [ ] Search index includes: home, all publishers, all doc-types, all concepts, library, specs, adopt, blog
- [ ] Mobile: search works in the mobile drawer too

## Implementation notes

### Postbuild script

```json
{
  "scripts": {
    "build": "astro build && node scripts/postbuild.mjs"
  }
}
```

```js
// scripts/postbuild.mjs
import { execSync } from 'node:child_process'
execSync('npx pagefind --site dist', { stdio: 'inherit' })
```

### Search modal UX

- Open with `/` (when not in an input), `Cmd+K` / `Ctrl+K`
- Close with `Esc`
- Arrow keys navigate results
- Enter navigates to highlighted result
- Debounced input (200ms)

### Filtering results

Pagefind supports filtering by section via `data-pagefind-filter`. Add to BaseLayout:

```astro
<html data-pagefind-filter="section:{Astro.url.pathname.split('/')[1] || 'home'}">
```

### Don't do in this task

- Don't add Algolia or other external search services

## Next

→ TODO 17 (SEO + sitemap)
