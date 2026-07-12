# 05 — Home Page

**Status:** pending
**Depends on:** 02, 03, 04

## Goal

Reimplement `index.md` (which renders `<HomePage />`) as `astro-site/src/pages/index.astro` with a React island for the interactive parts. This is the largest single component in the codebase (749 Vue lines).

## Source

- `.vitepress/theme/components/HomePage.vue` (749 lines)

## Sections to reproduce

1. **Hero** — eyebrow, gradient headline, sub-headline, inline demo input
2. **Inline Demo** — input field, preset chips, parsed-result visualization (component chips, nested groups, URN)
3. **Architecture Diagram** — interactive switcher between `simple` / `supplement` / `corrigendum` / `adoption` examples, each showing nested identifier composition
4. **Stats** — 26 publishers, N+ doc types, round-trip fidelity, URN-mappable
5. **Publisher Filter Preview** — category tabs (international/regional/national/industry), grid of cards (link to /publishers/)
6. **CTA** — "Get started" / "Browse publishers" / "Read the spec"

## Acceptance criteria

- [ ] `astro-site/src/pages/index.astro` exists, uses `BaseLayout`
- [ ] `astro-site/src/components/home/HeroDemo.tsx` — React island, identical preset chips + parsing visualization
- [ ] `astro-site/src/components/home/ArchitectureDiagram.tsx` — interactive nested-group diagram, all 4 modes
- [ ] `astro-site/src/components/home/StatsSection.astro` — static, with on-scroll stagger reveal
- [ ] `astro-site/src/components/home/PublisherPreview.astro` — reuses `PublisherCard.astro` from TODO 06 (or a simplified inline version if 06 not done)
- [ ] All animations: CSS-driven staggered reveals via `animation-delay` + `IntersectionObserver` to add `.visible` class
- [ ] Lighthouse: ≥ 95 performance, ≥ 95 accessibility (hero text contrast)
- [ ] Hero headline uses the display font (`font-display`) with `gradient-text` utility
- [ ] Dark mode looks correct

## Implementation notes

### Migration approach: Vue → React

The Vue SFC uses `<script setup>` with `ref`, `computed`, `onMounted`. Direct port to React:

```tsx
// HeroDemo.tsx
import { useState, useMemo } from 'react'
const [input, setInput] = useState('ISO 9001:2015')
const result = useMemo(() => demoData.find(d => d.input === input), [input])
```

The `demoData` array is purely declarative — copy verbatim.

### Interactive demo data

Keep `demoData` (9 entries) and `archData` (4 entries) as TypeScript consts in `src/components/home/data.ts`. Easy to maintain.

### Architecture diagram — refinement opportunity

The current diagram is good. Enhancements:
- Animate nested groups with a slight scale-in when they appear
- Add a "try another example" hint
- Color-code nesting depth via opacity steps

### Scroll-reveal helper

Create `astro-site/src/scripts/reveal.ts`:

```ts
export function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.06, rootMargin: '0px 0px -50px 0px' })
  document.querySelectorAll('.animate-in').forEach((el) => io.observe(el))
}
```

Inline-import in BaseLayout via `<script>` so every page gets it.

### Don't do in this task

- Don't port `PublisherGrid` (TODO 06)
- Don't port `FlavorPage` (TODO 07)
- Don't yet port the dynamic demo data — keep it as a TS const for now (a future TODO can wire it to live `pubid` WASM if that becomes available)

## Verification

- Visual: compare side-by-side screenshots with the live VitePress home
- Interactive: type each preset, verify parsed chips render correctly
- Dark mode: no flash, palette matches
- Mobile: hero scales, demo horizontally scrollable if needed

## Next

→ TODO 06 (publisher grid)
