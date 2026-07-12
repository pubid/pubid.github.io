# 02 — Tailwind 4 Design System

**Status:** pending
**Depends on:** 01

## Goal

A Tailwind 4 design system that reproduces and refines the existing PubID visual identity. Light + dark themes, typography pairing, elevation, motion tokens — all declarable as Tailwind utilities.

## Acceptance criteria

- [ ] `astro-site/src/styles/global.css` declares all tokens via `@theme` (light) and `@theme.dark` / `[data-theme="dark"]` overrides
- [ ] All tokens from `.vitepress/theme/custom.css` lines 7–48 are present:
  - `--color-bg`, `--color-bg-raised`, `--color-bg-inset`, `--color-bg-dark`
  - `--color-border`, `--color-border-subtle`
  - `--color-text`, `--color-text-2`, `--color-text-3`, `--color-text-inv`
  - `--color-accent` (`#2978a1`), `--color-accent-hover`, `--color-accent-soft`, `--color-accent-warm` (`#da9d76`)
- [ ] Typography:
  - Display: **Fraunces Variable** (or alternative approved by user) loaded via `@fontsource-variable/fraunces`
  - Body: **Inter Tight** (or alternative) loaded via `@fontsource-variable/inter-tight`
  - Mono: **JetBrains Mono** or **IBM Plex Mono** for inline code
- [ ] Custom utilities via `@utility`:
  - `.gradient-text` — the hero gradient (135deg accent → brand-2 → brand-3)
  - `.card-elevated` — soft long shadow
  - `.hairline` — 1px divider with `border-subtle`
  - `.chip` — small pill component
- [ ] Dark mode: `html.dark` class OR `data-theme="dark"` attribute (pick one; document in code)
- [ ] View Transitions: `html { view-transition-name: root; }` and per-element names where useful

## Implementation notes

### Tailwind 4 token mapping

```css
@import "tailwindcss";

@theme {
  /* Colors — light defaults */
  --color-bg: #ffffff;
  --color-bg-raised: #f4f4f5;
  --color-bg-inset: #fafafa;
  --color-bg-dark: #09090b;
  --color-border: #e4e4e7;
  --color-border-subtle: #f0f0f2;
  --color-text: #09090b;
  --color-text-2: #52525b;
  --color-text-3: #a1a1aa;
  --color-text-inv: #fafafa;

  --color-accent: #2978a1;
  --color-accent-hover: #1f6a8e;
  --color-accent-soft: rgba(41, 120, 161, 0.08);
  --color-accent-warm: #da9d76;
  --color-brand-2: #4193ac;
  --color-brand-3: #1a4d6d;

  /* Typography */
  --font-display: "Fraunces Variable", ui-serif, Georgia, serif;
  --font-sans: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

[data-theme="dark"] {
  --color-bg: #111113;
  --color-bg-raised: #1a1a1e;
  --color-bg-inset: #141416;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-subtle: rgba(255, 255, 255, 0.04);
  --color-text: #fafafa;
  --color-text-2: #a1a1aa;
  --color-text-3: #71717a;
  --color-accent-hover: #7ea7b2;
  --color-accent-warm: #e8b48a;
}
```

### Custom utilities

```css
@utility gradient-text {
  background: linear-gradient(135deg, #2978a1, #4193ac, #4590cd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@utility card-elevated {
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04),
              0 12px 32px -8px rgba(41, 120, 161, 0.08);
}
```

### Hero background mesh

Refine the existing radial-gradient hero mesh with a subtle grain overlay (SVG noise) for depth. See `.vitepress/theme/custom.css` lines 65–80 for the current mesh.

### Don't do in this task

- Component-level styles (those live with each component TODO)
- Replace existing VitePress CSS in place (the old CSS stays put for the VitePress site until cutover)

## Verification

Create a temporary `/style-test` page that uses every token + utility, screenshot it in light + dark, manually verify the palette matches the existing site.

## Next

→ TODO 03 (data layer)
