# 09 — Anatomy & Format Diagrams

**Status:** pending
**Depends on:** 02, 04

## Goal

Port the two interactive diagrams used on the Anatomy and Concepts pages.

## Sources

- `.vitepress/theme/components/AnatomyDiagram.vue` (49 lines)
- `.vitepress/theme/components/FormatDiagram.vue` (178 lines)

## Acceptance criteria

- [ ] `astro-site/src/components/AnatomyDiagram.tsx` — React island
- [ ] `astro-site/src/components/FormatDiagram.tsx` — React island
- [ ] Both work in light + dark
- [ ] Both keyboard-accessible (arrow keys to switch modes)
- [ ] Reduced motion respected (`@media (prefers-reduced-motion: reduce)`)

## Implementation notes

### AnatomyDiagram

A single identifier broken into colored segments (publisher / type / number / year). Hovering a segment highlights its description below.

### FormatDiagram

Switches between rendering styles (human / URN / JSON). For a given input identifier, shows the three formats side-by-side and animates between them on tab switch.

Use the same `demoData` patterns from the homepage.

### Refinement opportunity

The original diagrams are functional but visually basic. Enhancements:
- Add a subtle "perspective" transform on hover (3D tilt)
- Animate segment appearance with stagger
- Show the data flow as a Sankey-style mini-diagram for the format transformation

### Don't do in this task

- Don't write the Anatomy or Concepts pages themselves (TODO 10)

## Verification

Render in a test page `/dev/diagrams`, screenshot in both themes, both widths.

## Next

→ TODO 10 (concepts pages)
