import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// Integration-level smoke tests. These catch regressions that type-checking
// and unit tests miss — e.g. content collections silently empty, patch
// scripts corrupting YAML, VitePress scanning astro-site/.

const ROOT = process.cwd() // Astro is now at repo root

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

describe('integration: VitePress site removed', () => {
  // The Astro migration is complete: VitePress files have been moved to
  // _archive-vitepress/. The root is the Astro site now.
  it('no .vitepress/ directory at root', () => {
    expect(existsSync(join(ROOT, '.vitepress'))).toBe(false)
  })

  it('VitePress files archived under _archive-vitepress/', () => {
    expect(existsSync(join(ROOT, '_archive-vitepress', '.vitepress'))).toBe(true)
  })

  it('Astro is the root site (astro.config.mjs at root)', () => {
    expect(existsSync(join(ROOT, 'astro.config.mjs'))).toBe(true)
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
    'specs/iala-urn/index.html',
    'specs/iho-urn/index.html',
    'specs/ieee-urn/index.html',
    'specs/etsi-urn/index.html',
    'specs/itu-urn/index.html',
    'specs/ietf-urn/index.html',
    'specs/ccsds-urn/index.html',
    'specs/tgpp-urn/index.html',
    'specs/xsf-urn/index.html',
    'specs/isbn-urn/index.html',
    'specs/doi-urn/index.html',
    'specs/oasis-urn/index.html',
    'specs/ogc-urn/index.html',
    'specs/bipm-urn/index.html',
    'specs/wmo-urn/index.html',
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

describe('integration: URN scheme pages carry their schemes', () => {
  // Positive content assertions on the IALA and IHO URN scheme reference
  // pages: the built pages must contain the scheme segments and the
  // attested examples, not just exist.
  const dist = join(process.cwd(), 'dist')

  const expectedContent: Record<string, string[]> = {
    'specs/iala-urn/index.html': [
      'urn:mrn:iala:pub',
      'urn:mrn:iala:pub:r1023:ed1.0',
      'urn:mrn:iala:pub:g1143:ed3.1',
      'urn:mrn:iala:pub:ca:cg:ramn:2018',
      'mrnregistry.org',
      'IALA URN scheme',
    ],
    'specs/iho-urn/index.html': [
      'urn:mrn:iho:pub',
      'urn:mrn:iho:pub:spec:s57:3:1:supplement3',
      'urn:mrn:iho:pub:spec:s98:1.0.0',
      'urn:mrn:iho:pub:spec:s158-102:1.0.0',
      '128 bytes',
      'IHO URN scheme',
    ],
    'specs/ieee-urn/index.html': [
      'urn:ieee:std',
      'urn:ieee:ieee:802.11ah:2016',
      'urn:ieee:ansi/ieee:802.5:1998',
      'urn:ieee:ire:7.S2:1952',
      'RFC 8069',
      'IEEE URN scheme',
    ],
    'specs/etsi-urn/index.html': [
      'urn:etsi:en:300 831:v1.2.1:1999-10',
      'urn:etsi:etr:145:ed.1:1994-10',
      'urn:etsi:gs:MEC 026:v2.1.1:2019-01',
      'RFC 8515',
      'ETSI URN scheme',
    ],
    'specs/itu-urn/index.html': [
      'urn:itu:t:X.680:1997:3:02/2001',
      'urn:itu:r:report:BT.2020-1:2000',
      'urn:itu:itu:OB.1:annex',
      'ITU URN scheme',
    ],
    'specs/ietf-urn/index.html': [
      'urn:ietf:rfc:1',
      'urn:ietf:bcp:184',
      'urn:ietf:id:draft-ietf-dnsop-svcb-https:04',
      'RFC 2648',
      'IETF URN scheme',
    ],
    'specs/ccsds-urn/index.html': [
      'urn:ccsds:100.0-G-1-S',
      'urn:ccsds:123.0-B-2:cor.1',
      'urn:ccsds:652.1-M-2',
      'RFC 7738',
      'CCSDS URN scheme',
    ],
    'specs/tgpp-urn/index.html': [
      'urn:3gpp:ts:23.207:REL-4:2.0.0',
      'urn:3gpp:tr:23.700-01:REL-19:0.1.0',
      'urn:3gpp:ts:29.215::2.0.0',
      'RFC 5279',
      '3GPP URN scheme',
    ],
    'specs/xsf-urn/index.html': [
      'urn:xmpp:',
      'urn:xsf:xep:0001',
      'urn:xsf:xep:README',
      'RFC 4854',
      'XSF URN scheme',
    ],
    'specs/isbn-urn/index.html': [
      'urn:isbn:0-306-40615-2',
      'urn:pubid:isbn:book:hyphenated-0-306-40615-2:raw-0306406152',
      'RFC 3187',
      'ISBN URN scheme',
    ],
    'specs/doi-urn/index.html': [
      'urn:doi:10.1000/182',
      'urn:pubid:doi:resource:prefix-10.1000:suffix-182',
      'doi_pfs',
      'DOI URN scheme',
    ],
    'specs/oasis-urn/index.html': [
      'urn:oasis:EDXL',
      'urn:oasis:ECF%20v4.01',
      'urn:oasis:CTAS-v3.0%5D-PS01',
      'RFC 3121',
      'OASIS URN scheme',
    ],
    'specs/ogc-urn/index.html': [
      'urn:ogc:02:023:r4',
      'urn:ogc:23:049',
      'urn:ogc:12:128:r12a',
      'RFC 5165',
      'OGC URN scheme',
    ],
    'specs/bipm-urn/index.html': [
      'urn:bipm:v1:cipm:decision:101-1:2012',
      'urn:bipm:v1:cgpm:meeting:17:1983',
      'urn:bipm:v1:bipm:si-brochure:9:3.01:2024',
      'guide of record',
      'BIPM URN scheme',
    ],
    'specs/wmo-urn/index.html': [
      'urn:mrn:wmo:pub:wmo-1364:ed2025',
      'urn:mrn:wmo:pub:wmo-td-196',
      'urn:mrn:wmo:pub:s-411:annex-a',
      'pubid#763',
      'WMO URN scheme',
    ],
  }

  for (const [page, needles] of Object.entries(expectedContent)) {
    const html = (() => {
      try {
        return readFileSync(join(dist, page), 'utf8')
      } catch {
        return null
      }
    })()

    for (const needle of needles) {
      it(`dist/${page} contains ${needle}`, () => {
        expect(html, `dist/${page} must be built`).not.toBeNull()
        expect(html).toContain(needle)
      })
    }
  }
})
