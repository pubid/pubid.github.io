# 15 — About Page

**Status:** pending
**Depends on**
 04

## Goal

Migrate `about.md` to a styled Astro page (NOT a content collection — it's a single page with bespoke layout).

## File

| Source | Destination |
|--------|-------------|
| `about.md` | `astro-site/src/pages/about.astro` |

## Acceptance criteria

- [ ] Page uses `BaseLayout`
- [ ] All original sections preserved (problem statement, Ribose story, identifier anatomy table, NIST mention, future vision)
- [ ] "NIST Publisher Schema" CTA button (`.btn-primary`-styled) links to `/publishers/nist`
- [ ] Light + dark correct

## Implementation notes

The `about.md` is markdown with frontmatter. Simplest path: keep it as `.md`, but render via a custom layout:

```astro
---
// astro-site/src/pages/about.astro
import BaseLayout from '~/layouts/BaseLayout.astro'
import { Image } from 'astro:assets'
const { Content } = await import('../content/about.md')
---
<BaseLayout title="About PubID">
  <article class="prose prose-pubid">
    <Content />
  </article>
</BaseLayout>
```

Or convert to a hand-written `.astro` page for finer control over the bespoke sections.

**Recommendation:** Keep as markdown, use `prose-pubid` typography classes via Tailwind 4's `@tailwindcss/typography` plugin.

### Don't do in this task

- Don't restyle the page dramatically — preserve the existing tone

## Next

→ TODO 16 (search)
