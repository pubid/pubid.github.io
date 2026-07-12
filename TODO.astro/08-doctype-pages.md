# 08 — DocType Pages

**Status:** pending
**Depends on:** 07

## Goal

Dynamic route `/publishers/[flavor]/[type]` — one page per (publisher, doc-type) combination. Port of `DocTypePage.vue` (182 lines).

## Source

- `.vitepress/theme/components/DocTypePage.vue` (182 lines)
- `publishers/[flavor]/[type].md` (similar to `[flavor].md`)
- `publishers/[flavor]/[type].paths.ts`

## Sections to reproduce

1. Breadcrumb: Publishers / {Publisher} / {DocType}
2. Title + abbreviation chips
3. Description
4. Syntax (if defined on the doc type)
5. Examples table (input → output)
6. Components used by this doc type (subset of publisher's components)
7. Related doc types in the same publisher
8. Sidebar: tree of all publishers → their doc types (collapsible)

## Acceptance criteria

- [ ] `astro-site/src/pages/publishers/[flavor]/[type].astro` exists
- [ ] `getStaticPaths()` generates a page for every `(publisher.flavor, docType.key)` pair (~150+ pages)
- [ ] Sidebar generated from `publishers` data, collapsible per publisher, current page highlighted
- [ ] Breadcrumb uses schema.org BreadcrumbList microdata
- [ ] Unknown combo returns the friendly 404
- [ ] Each example row uses `<code>` with monospace styling

## Implementation notes

### getStaticPaths

```ts
export async function getStaticPaths() {
  const paths = []
  for (const p of publishers) {
    for (const dt of p.docTypes) {
      paths.push({
        params: { flavor: p.flavor, type: dt.key },
        props: { publisher: p, docType: dt },
      })
    }
  }
  return paths
}
```

### Sidebar generation

The sidebar needs to be available on every `/publishers/*` page. Build it once in a shared component `PublisherSidebar.astro` and include it in both `[flavor].astro` and `[flavor]/[type].astro`. The current "active" entry is derived from `Astro.url.pathname`.

### Large sidebar handling

26 publishers × ~10 doc types each = ~260 entries. Use `<details>` for collapsibility. Render server-side, no JS needed for collapse.

### Don't do in this task

- Don't add AsciiDoc rendering (TODO 13)
- Don't add Pagefind search (TODO 16)

## Verification

Sample 5 random pages: `/publishers/iso/international_standard`, `/publishers/nist/research_brief`, `/publishers/oiml/bulletin`, `/publishers/iala/standard`, `/publishers/adobe/tech_note`. Each must show correct examples and sidebar state.

## Next

→ TODO 09 (anatomy & format diagrams)
