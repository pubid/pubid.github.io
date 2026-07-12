# 13 — Specs & AsciiDoc

**Status:** pending
**Depends on:** 12

## Goal

Migrate the specs pages, including the AsciiDoc source files.

## Files

| Source | Destination |
|--------|-------------|
| `specs/index.md` | `astro-site/src/content/specs/index.md` |
| `specs/iso-urn.md` | `astro-site/src/content/specs/iso-urn.md` |
| `specs/iec-urn.md` | `astro-site/src/content/specs/iec-urn.md` |
| `specs/iso-urn-specification.adoc` | `astro-site/src/content/specs/iso-urn-specification.adoc` |
| `specs/iec-urn-specification.adoc` | `astro-site/src/content/specs/iec-urn-specification.adoc` |
| `specs/rfc5141.txt` | `astro-site/public/specs/rfc5141.txt` (verbatim copy) |

## Existing component

- `.vitepress/theme/components/SpecPage.vue` (49 lines)
- `.vitepress/theme/components/AsciiDocContent.vue` (9 lines — wrapper)
- `.vitepress/vite-plugins/asciidoc.ts` — VitePress plugin that uses `@asciidoctor/core`

## Acceptance criteria

- [ ] AsciiDoc renders correctly in Astro
- [ ] Three approaches to consider:
  1. **Pre-build conversion:** Convert `.adoc` → `.md` at build time using a script (`astro-site/scripts/adoc-to-md.mjs`). Simple, no runtime cost.
  2. **Astro integration:** Write a custom integration that registers `.adoc` as a content collection loader. More flexible, more code.
  3. **@asciidoctor/core via remark/rehype:** Hook into Astro's markdown pipeline.
- [ ] **Recommendation:** Approach #1 — pre-build conversion. The .adoc files are stable, infrequently changed, and conversion is one-shot.
- [ ] Specs pages use Starlight layout
- [ ] "View raw .adoc source" link on each spec page

## Implementation notes

### AsciiDoc → MD conversion script

```js
// astro-site/scripts/adoc-to-md.mjs
import Asciidoctor from '@asciidoctor/core'
import { readdir, readFile, writeFile } from 'node:fs/promises'

const ad = Asciidoctor()
const files = await readdir('src/content/specs')
for (const f of files.filter(f => f.endsWith('.adoc'))) {
  const input = await readFile(`src/content/specs/${f}`, 'utf8')
  const html = ad.convert(input, { safe: 'unsafe' })
  // ... wrap in MDX/MD with frontmatter, write to .md
}
```

Run as a `prebuild` npm script.

### Don't do in this task

- Don't migrate RFC text — just copy as a public asset

## Next

→ TODO 14 (adopt)
