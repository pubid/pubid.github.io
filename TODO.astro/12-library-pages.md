# 12 — Library Pages

**Status:** pending
**Depends on:** 10

## Goal

Migrate the 4 library pages (installation, quick-start, api, contributing) to a `library` content collection rendered with Starlight.

## Files

| Source | Destination |
|--------|-------------|
| `library/index.md` | `astro-site/src/content/library/index.md` |
| `library/quick-start.md` | `astro-site/src/content/library/quick-start.md` |
| `library/api.md` | `astro-site/src/content/library/api.md` |
| `library/contributing.md` | `astro-site/src/content/library/contributing.md` |

## Acceptance criteria

- [ ] `library` collection defined in `content.config.ts`
- [ ] All 4 pages migrated (verbatim content where possible, with frontmatter normalized)
- [ ] Starlight sidebar matches `librarySidebar` from `.vitepress/config.ts`
- [ ] Code blocks use Shiki with brand palette
- [ ] API reference page may pull live docs from the `pubid` Ruby gem — for now, copy the existing markdown verbatim

## Implementation notes

### Multi-section docs strategy

The site has 4 doc-shaped sections: Concepts, Library, Specs, Adopt. Each has its own sidebar.

**Option A:** Single Starlight instance, route-aware sidebar via `routes` overrides.
**Option B:** Four separate Starlight instances (one per section).

**Recommendation:** Option A — single Starlight with `routes` overrides based on URL prefix. Less duplication of layout/header.

### Don't do in this task

- Don't migrate Specs (TODO 13) or Adopt (TODO 14) yet

## Next

→ TODO 13 (specs & AsciiDoc)
