# 11 — Blog

**Status:** pending
**Depends on:** 04

## Goal

Migrate the 4 blog posts + index page to an Astro content collection.

## Files

| Source | Destination |
|--------|-------------|
| `blog/index.md` | `astro-site/src/pages/blog/index.astro` |
| `blog/2024-01-15-what-is-pubid.md` | `astro-site/src/content/blog/2024-01-15-what-is-pubid.md` |
| `blog/2024-03-01-understanding-algebra.md` | `astro-site/src/content/blog/2024-03-01-understanding-algebra.md` |
| `blog/2024-06-15-urn-mapping.md` | `astro-site/src/content/blog/2024-06-15-urn-mapping.md` |
| `blog/2024-08-01-nist-pubid.md` | `astro-site/src/content/blog/2024-08-01-nist-pubid.md` |

## Components

- `.vitepress/theme/components/BlogIndex.vue` (40 lines) — list of posts with metadata
- `.vitepress/theme/components/BlogByline.vue` (17 lines) — author + date

## Acceptance criteria

- [ ] `astro-site/src/content.config.ts` adds `blog` collection:
  ```ts
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      author: z.string().default('Ribose'),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
  })
  ```
- [ ] `/blog/index.astro` lists all posts (sorted desc by date), each with byline
- [ ] `/blog/[...slug].astro` renders each post
- [ ] RSS feed at `/rss.xml` (via `@astrojs/rss`)
- [ ] Tag pages at `/blog/tag/{tag}/` (optional, if tags exist)
- [ ] BlogByline component shows author + relative or absolute date

## Implementation notes

### Routing

```ts
// astro-site/src/pages/blog/[...slug].astro
export async function getStaticPaths() {
  return (await getCollection('blog'))
    .filter(p => !p.data.draft)
    .map(p => ({
      params: { slug: p.slug },
      props: { post: p },
    }))
}
```

### RSS

```ts
// astro-site/src/pages/rss.xml.ts
import rss from '@astrojs/rss'
export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: 'PubID Blog',
    description: '...',
    site: context.site,
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `/blog/${p.slug}/`,
    })),
  })
}
```

### Don't do in this task

- Don't migrate the comments system (none currently exists)
- Don't add author profile pages

## Next

→ TODO 12 (library)
