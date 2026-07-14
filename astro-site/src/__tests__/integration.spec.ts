import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// Integration-level smoke tests. These catch regressions that type-checking
// and unit tests miss — e.g. content collections silently empty, patch
// scripts corrupting YAML, VitePress scanning astro-site/.

const ROOT = join(process.cwd(), '..') // repo root (astro-site/ → root)

describe('integration: content collections are non-empty', () => {
  // Each collection must have at least one source file. If this fails,
  // it means the content layer loader isn't finding files — usually a
  // config path bug.
  const collections = [
    { name: 'concepts', minFiles: 6 },
    { name: 'blog', minFiles: 4 },
    { name: 'library', minFiles: 4 },
    { name: 'specs', minFiles: 2 }, // only .md counted
    { name: 'adopt', minFiles: 2 },
    { name: 'about', minFiles: 1 },
  ]

  for (const { name, minFiles } of collections) {
    it(`${name} collection has ≥ ${minFiles} source file(s)`, () => {
      const dir = join(process.cwd(), 'src', 'content', name)
      expect(existsSync(dir), `directory ${dir} must exist`).toBe(true)
      const files = readdirSync(dir, { recursive: true })
        .filter((f) => {
          const s = String(f)
          return s.endsWith('.md') || s.endsWith('.mdx')
        })
      expect(files.length, `${name}/ has ${files.length} files`).toBeGreaterThanOrEqual(minFiles)
    })
  }
})

describe('integration: no corrupted YAML frontmatter', () => {
  // Catches the bug where patch-content.mjs concatenated `title:` onto the
  // last line of existing frontmatter without a newline separator.
  const contentDir = join(process.cwd(), 'src', 'content')

  function* walk(dir: string): Generator<string> {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) yield* walk(full)
      else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) yield full
    }
  }

  for (const filepath of walk(contentDir)) {
    const rel = filepath.replace(process.cwd() + '/', '')
    it(`${rel} has valid YAML frontmatter`, () => {
      const content = readFileSync(filepath, 'utf8')
      if (!content.startsWith('---')) return // no frontmatter is OK

      const end = content.indexOf('\n---', 3)
      expect(end, 'frontmatter must be closed').toBeGreaterThan(0)

      const fm = content.slice(3, end)
      // Each line that has a `key:` must either be on its own line or
      // the previous line must not look like an unfinished key.
      const lines = fm.split('\n')
      for (const line of lines) {
        const titleMatches = line.match(/title:/g)
        // A single line with two `key:` patterns indicates concatenation bug
        if (titleMatches && titleMatches.length > 1) {
          throw new Error(`concatenated YAML keys on line: "${line}"`)
        }
      }
    })
  }
})

describe('integration: VitePress excludes astro-site/', () => {
  // Without this, VitePress recursively scans astro-site/ and chokes on
  // Astro-specific syntax (MDX imports, etc.).
  it('.vitepress/config.ts has astro-site in srcExclude', () => {
    const config = readFileSync(join(ROOT, '.vitepress', 'config.ts'), 'utf8')
    expect(config).toMatch(/astro-site\/\*\*/)
  })
})

describe('integration: build output has content pages', () => {
  // The build must produce individual content pages, not just index pages.
  // If this fails, content collections are silently empty — check
  // content.config.ts uses the Content Layer API (loader: glob()).
  const dist = join(process.cwd(), 'dist')

  const expectedPages = [
    'concepts/anatomy/index.html',
    'concepts/urn/index.html',
    'blog/2024-01-15-what-is-pubid/index.html',
    'specs/iso-urn/index.html',
    'library/api/index.html',
    'adopt/guide/index.html',
  ]

  for (const page of expectedPages) {
    it(`dist/${page} exists`, () => {
      expect(existsSync(join(dist, page)), `expected ${page} to be built`).toBe(true)
    })
  }

  it('dist has ≥ 250 HTML pages total', () => {
    let count = 0
    function countHtml(dir: string) {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) countHtml(join(dir, entry.name))
        else if (entry.name.endsWith('.html')) count++
      }
    }
    if (existsSync(dist)) countHtml(dist)
    expect(count).toBeGreaterThanOrEqual(250)
  })
})
