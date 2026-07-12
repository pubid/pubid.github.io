# 10 — Concepts Pages

**Status:** pending
**Depends on:** 04, 09

## Goal

Migrate the 6 concept pages to Astro content collection + Starlight rendering.

## Files

| Source | Destination |
|--------|-------------|
| `concepts/anatomy.md` | `astro-site/src/content/concepts/anatomy.md` |
| `concepts/metaschema.md` | `astro-site/src/content/concepts/metaschema.md` |
| `concepts/components.md` | `astro-site/src/content/concepts/components.md` |
| `concepts/algebra.md` | `astro-site/src/content/concepts/algebra.md` |
| `concepts/relationships.md` | `astro-site/src/content/concepts/relationships.md` |
| `concepts/urn.md` | `astro-site/src/content/concepts/urn.md` |

## Acceptance criteria

- [ ] `astro-site/src/content.config.ts` defines a `concepts` collection with zod schema:
  ```ts
  const concepts = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      ord: z.number(),
    }),
  })
  ```
- [ ] All 6 markdown files copied (verbatim, with frontmatter adjusted to schema)
- [ ] Inline `<AnatomyDiagram />` and `<FormatDiagram />` usages in `anatomy.md` still work — port as MDX or use Astro's component-in-markdown feature
- [ ] Sidebar with all 6 concepts (ordered)
- [ ] Prev/next navigation at bottom
- [ ] "Edit this page" link to the GitHub source

## Implementation notes

### Starlight for Concepts

Configure Starlight with a single sidebar matching `conceptSidebar` from `.vitepress/config.ts`:

```ts
starlight({
  title: 'PubID',
  sidebar: [{
    label: 'Concepts',
    items: [
      { label: 'Anatomy of a PubID', link: '/concepts/anatomy' },
      { label: 'The Metaschema', link: '/concepts/metaschema' },
      // ...
    ],
  }],
})
```

Render Concepts pages via Starlight's `Route`. The custom homepage and publisher pages remain OUTSIDE Starlight.

### MDX for component-in-markdown

Concept pages that embed interactive diagrams must be `.mdx`. Convert `anatomy.md` to `anatomy.mdx` and import:

```mdx
import AnatomyDiagram from '~/components/AnatomyDiagram'

<AnatomyDiagram input="ISO 9001:2015" />
```

### Don't do in this task

- Don't migrate blog/library/specs/adopt content (TODOs 11–14)
- Don't add Pagefind search (TODO 16)

## Verification

Each concept page renders with sidebar, table of contents, diagrams functional.

## Next

→ TODO 11 (blog)
