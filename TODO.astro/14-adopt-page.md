# 14 — Adopt Page

**Status:** pending
**Depends:**
10

## Goal

Migrate `adopt.md` and `adopt/guide.md` to an `adopt` content collection.

## Files

| Source | Destination |
|--------|-------------|
| `adopt.md` | `astro-site/src/content/adopt/index.md` |
| `adopt/guide.md` | `astro-site/src/content/adopt/guide.md` |

## Acceptance criteria

- [ ] `adopt` collection in `content.config.ts`
- [ ] `/adopt/` and `/adopt/guide/` routes render with Starlight
- [ ] Sidebar matches `adoptSidebar` from `.vitepress/config.ts`
- [ ] Internal links to `/publishers/{flavor}` and `/concepts/{name}` resolve correctly

## Implementation notes

The `adopt.md` content references internal pages and external resources (Ribose, NIST PDF). Preserve all links verbatim.

### Don't do in this task

- Don't add a contact form for adoption inquiries (out of scope)

## Next

→ TODO 15 (about)
