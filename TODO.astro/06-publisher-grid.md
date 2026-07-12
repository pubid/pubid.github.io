# 06 — Publisher Grid

**Status:** pending
**Depends on:** 03, 04

## Goal

The `/publishers/` index page with a searchable, filterable grid of all 26 publisher cards.

## Source

- `.vitepress/theme/components/PublisherGrid.vue` (70 lines)
- `publishers/index.md` (4 lines — just a heading + `<PublisherGrid />`)

## Acceptance criteria

- [ ] `astro-site/src/pages/publishers/index.astro` exists, uses `BaseLayout`
- [ ] `astro-site/src/components/publishers/PublisherGrid.tsx` — React island
- [ ] `astro-site/src/components/publishers/PublisherCard.astro` — static card markup (used both by the island's render and standalone)
- [ ] Filters:
  - Category tabs: All, International, Regional, National, Industry (counts per tab)
  - Search box: filters by `name`, `fullName`, or `flavor` (case-insensitive)
- [ ] Card shows: logo (or initials fallback), name, full name, category badge, doc-type count badge
- [ ] Card links to `/publishers/{flavor}`
- [ ] Empty state: "No publishers found matching your criteria." (matches existing copy)
- [ ] Light + dark correct
- [ ] Cards animate-in on scroll (staggered)

## Implementation notes

### Card component strategy

`PublisherCard.astro` is the pure markup (no interactivity). The grid island maps over filtered publishers and renders a card per row, using the same markup. To avoid duplication, the island can import a React `<Card>` that mirrors the Astro card's classes.

Or simpler: have the island render the cards directly (skipping the Astro version). Then if we need cards in static contexts (e.g. "Related Publishers" section on detail pages), inline the markup.

**Decision:** Make `PublisherCard.astro` for static use; `PublisherGrid.tsx` re-implements the same markup inline (cheap to keep in sync). This avoids SSR/CSR complexity.

### Filter logic

```tsx
const filtered = useMemo(() => {
  let r = publishers
  if (activeCategory !== 'all') r = r.filter(p => p.category === activeCategory)
  if (q.trim()) {
    const needle = q.toLowerCase()
    r = r.filter(p =>
      p.name.toLowerCase().includes(needle) ||
      p.fullName.toLowerCase().includes(needle) ||
      p.flavor.toLowerCase().includes(needle))
  }
  return r
}, [activeCategory, q])
```

### Logo fallback

If `publisher.logo` is undefined OR fails to load, render initials in a 56×56 box with the accent gradient background:

```tsx
{p.logo
  ? <img src={p.logo} alt={`${p.name} logo`} onError={(e) => /* swap to initials */} />
  : <div className="size-14 grid place-items-center bg-accent/10 text-accent font-display">{p.name.slice(0, 2)}</div>}
```

### Don't do in this task

- Don't build the detail page (TODO 07)
- Don't add the publisher to the navigation sidebar (TODO 04 already adds the top-level link; sidebar for `/publishers/[flavor]` is TODO 07)

## Verification

- `/publishers/` renders 26 cards by default
- Each category tab shows correct count
- Search "iso" → 1 card (ISO). Search "i" → ISO, IEC, IEEE, ITU, IALA, IHO, JIS, BSI, IDC, ...
- Click any card → navigates to `/publishers/{flavor}` (page may 404 until TODO 07)
- Dark mode + mobile verified

## Next

→ TODO 07 (publisher detail pages)
