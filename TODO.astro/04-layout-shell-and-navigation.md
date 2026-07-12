# 04 — Layout Shell & Navigation

**Status:** pending
**Depends on:** 02, 03

## Goal

A `BaseLayout.astro` that wraps every custom (non-Starlight) page: header with nav + theme toggle + GitHub link, footer, mobile drawer, scroll progress bar, and `<ClientRouter />` for client-side view transitions.

## Acceptance criteria

- [ ] `astro-site/src/layouts/BaseLayout.astro` accepts:
  - `title: string`
  - `description?: string`
  - `ogImage?: string`
  - `noindex?: boolean`
  - `slots: default` (page content)
- [ ] `astro-site/src/components/Header.astro`:
  - PubID logo (left) → links to `/`
  - Nav: Publishers, Concepts, Docs (dropdown: Library + Specs), Adopt, About
  - GitHub icon link
  - Theme toggle button (sun/moon)
  - Mobile: hamburger → drawer with same links
- [ ] `astro-site/src/components/Footer.astro`:
  - "An open source project of Ribose" + copyright `2024–2026`
  - Small links: Privacy, TOS, GitHub
- [ ] `astro-site/src/components/ThemeToggle.tsx` (React island):
  - Reads localStorage on mount
  - Falls back to `prefers-color-scheme`
  - Toggles `data-theme="dark"` on `<html>`
- [ ] `astro-site/src/components/ScrollProgress.astro`:
  - 2px fixed top bar, accent gradient, width tied to scroll %
- [ ] View transitions via `<ClientRouter />` from `astro:transitions`
- [ ] Light + dark mode persists across pages

## Implementation notes

### Header layout

```
┌──────────────────────────────────────────────────────────────────┐
│  [≡] ▼PubID    Publishers  Concepts  Docs ▾  Adopt  About   [☀] [⌥]│
└──────────────────────────────────────────────────────────────────┘
```

- Logo: `/pubid-logo.svg` (existing file, copy to `astro-site/public/`)
- Sticky top, blurred backdrop (`backdrop-filter: blur(12px)`)
- Hairline bottom border

### Theme toggle

Persist to `localStorage.pubid-theme`. On mount, apply before paint (inline `<script is:inline>` in `<head>`) to avoid flash of wrong theme.

```html
<!-- in BaseLayout <head> -->
<script is:inline>
  const t = localStorage.getItem('pubid-theme')
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.dataset.theme = 'dark'
  }
</script>
```

### Mobile drawer

Use a small React island or pure CSS (`:target` / `details`). Pure CSS preferred — zero JS payload.

### Active nav state

Use `Astro.url.pathname` to highlight active top-level section.

### Don't do in this task

- Don't build the homepage (TODO 05)
- Don't build Starlight integration (TODO 10 sets up Starlight for Concepts)
- Don't replicate the VitePress search bar (TODO 16 covers Pagefind)

## Inputs

- Existing nav structure: `.vitepress/config.ts` lines 49–58
- Existing footer: `.vitepress/config.ts` lines 60–65

## Outputs

- One layout, three components (Header, Footer, ThemeToggle)
- A blank `/` page that just calls `<BaseLayout>` for visual verification

## Verification

- `npm run dev` → `/` shows header, blank content, footer
- Toggle persists across reload
- Mobile breakpoint shows drawer
- View transitions feel smooth between two stub pages

## Next

→ TODO 05 (homepage)
