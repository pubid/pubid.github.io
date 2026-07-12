# 18 — Deploy & CI/CD

**Status:** pending
**Depends:** 17

## Goal

A GitHub Actions workflow that builds `astro-site/` and deploys to GitHub Pages. The existing VitePress workflow stays in place until cutover (TODO 19).

## Acceptance criteria

- [ ] `astro-site/.github/workflows/deploy-astro.yml` builds and deploys to a preview path OR a separate GitHub Pages target
- [ ] Workflow:
  - Triggers on push to `feat/astro-migration` and PRs against it
  - Node 22, `npm ci`
  - `npm run build` in `astro-site/`
  - Uploads `astro-site/dist/` as a Pages artifact
  - Deploys to a staging URL (e.g. `pubid-preview.netlify.app` or a GitHub Pages preview)
- [ ] A link-checker step (using `lychee` or `linkinator`) that allows the same pre-existing VitePress artifacts but flags new broken links
- [ ] A Lighthouse CI step that fails the build if performance/accessibility < 90

## Implementation notes

### Two deployment targets

While both sites coexist, deploy the VitePress site to the primary domain (`pubid.com` / `pubid.github.io`) and the Astro site to a preview environment. Swap at cutover (TODO 19).

### Lighthouse CI

```yaml
- uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      http://localhost:4321/
      http://localhost:4321/publishers/
      http://localhost:4321/concepts/anatomy
    budgetPath: ./astro-site/.lighthouserc.json
```

### Don't do in this task

- Don't touch the existing `.github/workflows/deploy.yml` (VitePress) — leave it alone until cutover

## Next

→ TODO 19 (cutover)
