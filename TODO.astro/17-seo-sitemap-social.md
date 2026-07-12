# 17 — SEO, Sitemap & Social

**Status:** pending
**Depends:** 04, all content tasks

## Goal

Per-page meta tags, JSON-LD structured data, sitemap, social images, and OG/Twitter card support.

## Acceptance criteria

- [ ] `<BaseLayout>` sets all required SEO tags:
  - `<title>`, `<meta name="description">`
  - Canonical URL
  - OpenGraph: og:title, og:description, og:image, og:url, og:type
  - Twitter: twitter:card, twitter:title, twitter:description, twitter:image
  - `<meta name="theme-color" content="#2978a1">`
- [ ] `@astrojs/sitemap` integration configured:
  ```js
  sitemap({
    site: 'https://www.pubid.com',
    filter: (page) => !page.includes('/dev/'),
  })
  ```
- [ ] `robots.txt` at `/robots.txt` referencing the sitemap
- [ ] JSON-LD `WebSite` schema on every page
- [ ] JSON-LD `BreadcrumbList` on publisher + doctype pages
- [ ] OG image: 1200×630 SVG-to-PNG, dynamic per page (use `@vercel/og`-style or pre-built). At minimum, a static branded OG image.
- [ ] Favicons copied from existing `public/` (favicon.svg, favicon.ico, apple-touch-icon.png, favicon-96x96.png, site.webmanifest)

## Implementation notes

### OG image strategy

For now: one branded static OG image. Per-page dynamic OG is a future enhancement (TODO: future).

### Starlight SEO

Starlight already emits good SEO tags. The custom (non-Starlight) pages need their own `<head>` work in BaseLayout.

### Don't do in this task

- Don't add analytics (Plausible/Umami/Fathom) — separate task if user wants it

## Next

→ TODO 18 (deploy)
