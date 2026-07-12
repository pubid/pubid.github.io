# 19 — Cutover & Cleanup

**Status:** **REQUIRES EXPLICIT USER CONFIRMATION** before any action.

**Depends:** all previous tasks complete + manual QA pass.

## Goal

Replace the VitePress site at the repo root with the Astro site. Single coordinated PR. No history of the VitePress site is lost (git history preserves it).

## Pre-cutover checklist (must all be ✅)

- [ ] All 18 prior TODOs complete
- [ ] Visual regression: every page in Astro matches or exceeds the VitePress version
- [ ] Lighthouse ≥ 90 on all key routes
- [ ] Pagefind search indexes all content
- [ ] Sitemap valid, robots.txt present
- [ ] All 26 publisher pages + ~150 doctype pages generate
- [ ] All blog posts render
- [ ] Starlight rendering works for Concepts/Library/Specs/Adopt
- [ ] Dark mode + theme toggle persists across nav
- [ ] Mobile + tablet + desktop breakpoints tested
- [ ] Staging deploy of Astro site reviewed by user

## Cutover actions (in order, each a separate commit)

1. **Stop the VitePress deploy workflow** (`.github/workflows/deploy.yml`):
   - Add a comment marking it as superseded
   - Disable triggers OR delete the file (with user confirmation)

2. **Move Astro files to repo root:**
   ```bash
   # from repo root
   git mv astro-site/* ./
   git mv astro-site/.* ./ 2>/dev/null || true
   rmdir astro-site
   ```
   - Move `.gitignore`, `package.json`, `astro.config.mjs`, etc. to root
   - Resolve conflicts with existing root files (the VitePress `package.json` is replaced by Astro's)

3. **Archive VitePress files** (do NOT delete — per global rule, never delete source):
   - Create `archived/vitepress/` directory
   - `git mv .vitepress archived/vitepress/`
   - `git mv _config.yml archived/vitepress/` (if user wants Jekyll config preserved)
   - `git mv Gemfile* archived/vitepress/` (if user wants)
   - Move any VitePress-only markdown helpers (publishers/[flavor].md, [flavor].paths.ts) to the archive

4. **Update root package.json:**
   - Astro scripts become the canonical `dev` / `build` / `preview`
   - Update name, description, repository field

5. **Update GitHub Actions:**
   - The Astro workflow (from TODO 18) becomes the primary deploy workflow
   - Update paths, deploy target = production

6. **Update README.adoc at repo root:**
   - Add a "Site Architecture" section explaining Astro 7 / Tailwind 4 / Starlight

7. **Verify:**
   - Production build runs clean
   - Production deploy succeeds
   - Site loads at `https://www.pubid.com/` (or `https://pubid.github.io/`)

## Post-cutover (separate follow-up PRs)

- Remove `archived/vitepress/` after a 2-week soak period (with user confirmation)
- Remove the `TODO.astro/` directory once everything is verified
- Update external references (Ribose site, blog posts pointing to the repo)

## Risks

- **DNS / cache:** If the deploy target changes, allow 24–48h for DNS propagation
- **Sitemap URLs:** Ensure no trailing-slash mismatches cause redirect chains
- **External inbound links:** All existing URLs must continue to resolve. Astro's default trailing-slash behavior must match VitePress's.

## Rollback plan

If anything goes wrong in production:

```bash
git revert <cutover-merge-commit>
git push origin main
# Redeploys the VitePress site
```

The `archived/vitepress/` directory ensures we can restore any VitePress-specific files instantly.

## What this task does NOT do

- Does NOT delete source files (per global rule)
- Does NOT touch git history
- Does NOT change the domain or DNS
