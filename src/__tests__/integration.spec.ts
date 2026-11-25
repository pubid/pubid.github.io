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
    'specs/nist-urn/index.html',
    'specs/jis-urn/index.html',
    'specs/ashrae-urn/index.html',
    'specs/bsi-urn/index.html',
    'specs/ecma-urn/index.html',
    'specs/asme-urn/index.html',
    'specs/cie-urn/index.html',
    'specs/astm-urn/index.html',
    'specs/csa-urn/index.html',
    'specs/gost-urn/index.html',
    'specs/ansi-urn/index.html',
    'specs/api-urn/index.html',
    'specs/cen_cenelec-urn/index.html',
    'specs/calconnect-urn/index.html',
    'specs/easc-urn/index.html',
    'specs/plateau-urn/index.html',
    'specs/oiml-urn/index.html',
    'specs/idf-urn/index.html',
    'specs/amca-urn/index.html',
    'specs/evs-urn/index.html',
    'specs/jcgm-urn/index.html',
    'specs/iana-urn/index.html',
    'specs/w3c-urn/index.html',
    'specs/omg-urn/index.html',
    'specs/sae-urn/index.html',
    'specs/eu-urn/index.html',
    'specs/arxiv-urn/index.html',
    'specs/gb-urn/index.html',
    'specs/un-urn/index.html',
    'specs/adobe-urn/index.html',
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
      'urn:mrn:iala:pub:s-201:ed2.0.0',
      'urn:mrn:iala:pub:s-201:annex-b2',
      'landed',
      'pubid#777',
      'mrnregistry.org',
      'IALA URN scheme',
    ],
    'specs/iho-urn/index.html': [
      'urn:mrn:iho:pub',
      'urn:mrn:iho:pub:spec:s57:3:1:supplement3',
      'urn:mrn:iho:pub:spec:s98:1.0.0',
      'urn:mrn:iho:pub:spec:s158-102:1.0.0',
      'urn:mrn:iho:pub:reg:m2:sup-1',
      'urn:mrn:iho:pub:per:p5:vol-2024',
      'landed',
      'testsuite #124',
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
    'specs/nist-urn/index.html': [
      'urn:nist:sp:800-53.r5.supp',
      'urn:nist:fips:205.supp',
      'urn:nist:ir:8259.supp:por',
      'urn:nist:crpl:1-2.pt3-1.suppA',
      'urn:nist:circ:101.e2',
      'NIST URN scheme',
    ],
    'specs/jis-urn/index.html': [
      'urn:jis:A 0001:1999',
      'urn:jis:WES 7700-1:2019',
      'urn:jis:WES 3003:1995:e',
      'urn:jis:WES 3003:2025:amd 1:2025',
      'RFC 8141',
      'JIS URN scheme',
    ],
    'specs/ashrae-urn/index.html': [
      'urn:ashrae:55:2023:standard',
      'urn:ashrae:62.1:2022:standard:copub.ansi/ashrae:add.ab',
      'urn:ashrae:0:2005:guideline:errata.2011-09-28',
      'urn:ashrae:15:2007:standard:pkg.supplement-package',
      'ASHRAE URN scheme',
    ],
    'specs/bsi-urn/index.html': [
      'urn:bsi:bs:60269:-3:2010:amd:2:2022',
      'urn:bsi:bs:a:109:2024',
      'urn:bsi:disc:2000:-2:1997',
      'parsanol-ruby#427',
      'BSI URN scheme',
    ],
    'specs/ecma-urn/index.html': [
      'urn:ecma:262:ed-5.1',
      'urn:ecma:tr:114:ed-1',
      'urn:ecma:mem:2026',
      'urn:ecma:269:ed-3:vol-2',
      'ECMA URN scheme',
    ],
    'specs/asme-urn/index.html': [
      'urn:asme:asme:B18.3:2022',
      'urn:asme:handbook:asme:A17.1:2010:csa.B44',
      'urn:asme:api/asme:PTB-14:2009:pub1.api:code1.579-2:pub2.asme',
      'urn:asme:asme/ans:RA-S-1.1:2022:joint.asme/ans',
      'ASME URN scheme',
    ],
    'specs/cie-urn/index.html': [
      'urn:cie:cie:001:1980:sep.legacy',
      'urn:cie:dual-pub:s:cie:009:2002:sep.current:iec.62471:2006',
      'urn:cie:identical:s:cie:006.1:1998:sep.slash:iso.16508:1999',
      'urn:cie:joint-pub:cie-iso:10916:2024:sep.current',
      'urn:cie:bundle:cie:tut-bundle.1',
      'CIE URN scheme',
    ],
    'specs/astm-urn/index.html': [
      'urn:astm:std:D2148:22',
      'urn:astm:std:C1870:18:reapp.2024',
      'urn:astm:std:51261:13:reapp.2020:e1',
      'urn:iso/astm:std:52905',
      'ASTM URN scheme',
    ],
    'specs/csa-urn/index.html': [
      'urn:csa:csa:12.4:22',
      'urn:csa:csa:C22.2-286:no.286:23',
      'urn:csa:csa:A165:series.true:14:reaff.2024',
      'urn:csa:csa:B149.1:F20:french',
      'urn:csa::B651HB:18:format.dash',
      'CSA URN scheme',
    ],
    'specs/gost-urn/index.html': [
      'urn:gost:std:1437:2024',
      'urn:gost:std:r:1.0:2015',
      'urn:gost:std:r:12.4.202:99',
      'urn:gost:std:r:58904:2020',
      'GOST URN scheme',
    ],
    'specs/ansi-urn/index.html': [
      'urn:ansi:802.3:2012',
      'urn:ansi:X9.8:-1:2007',
      'urn:ansi-ieee:1:1986',
      'urn:ansi-tia:568.2:rev-D',
      'ANSI URN scheme',
    ],
    'specs/api-urn/index.html': [
      'urn:api:std:1104',
      'urn:api:std:11L2',
      'urn:api:std:1:-08',
      'urn:api:std:1509',
      'API URN scheme',
    ],
    'specs/cen_cenelec-urn/index.html': [
      'urn:cen:en:13250:2000:amd:1:2005',
      'urn:cen:en:285:2015:plus:amd:1:2021',
      'urn:cen:cen:iso:ts:21003-7:2019',
      'urn:cen:cen-clc-etsi:101551:2026',
      'urn:cen:en:16114:2011:stage.final_proposal',
      'CEN-CENELEC URN scheme',
    ],
    'specs/calconnect-urn/index.html': [
      'urn:calconnect:11001:2024',
      'urn:calconnect:A:0001:2000',
      'urn:calconnect:DIR:10001:2019',
      'urn:calconnect:WD:51017:2024-07-23',
      'not urn:cc',
      'CalConnect URN scheme',
    ],
    'specs/easc-urn/index.html': [
      'urn:easc:pmg:02:2008',
      'urn:easc:rmg:151:2025',
      'urn:easc:pmg:v:31:2001',
      'EASC URN scheme',
    ],
    'specs/plateau-urn/index.html': [
      'urn:plateau:handbook:00',
      'urn:plateau:handbook:03:01',
      'urn:plateau:tr:46:01',
      'urn:pubid:plateau:hb:0:ed-1.0',
      'PLATEAU URN scheme',
    ],
    'specs/oiml-urn/index.html': [
      'urn:oiml:r:106',
      'urn:oiml:v:2:2013:e/f',
      'urn:oiml:cs:pd-05',
      'urn:oiml:r:201:wd:1',
      'OIML URN scheme',
    ],
    'specs/idf-urn/index.html': [
      'urn:idf:1:2010:',
      'urn:idf:124:-2:2005:',
      'urn:idf:145:2023:dis',
      'urn:idf:210:2024:awi rm',
      'IDF URN scheme',
    ],
    'specs/amca-urn/index.html': [
      'urn:amca:210:16:copub.ansi/amca:standard',
      'urn:amca:99:interp.jw:copub.amca:interpretation',
      'urn:pubid:amca:std:210:co-ASHRAE:year-16',
      'AMCA URN scheme',
    ],
    'specs/evs-urn/index.html': [
      'urn:evs:en:18216:2026',
      'urn:evs:en:71-1:2011:plus:amd:1:2014',
      'urn:evs:pr:en:100:2026',
      'urn:pubid:evs:cencenelec.en:18216:year-2026:na',
      'EVS URN scheme',
    ],
    'specs/jcgm-urn/index.html': [
      'urn:jcgm:100:2008:amendment:1:2026',
      'urn:jcgm:meeting:17:2012',
      'urn:jcgm:200:2012:en,fr',
      'urn:jcgm:gum.1:2022',
      'JCGM URN scheme',
    ],
    'specs/iana-urn/index.html': [
      'urn:iana:_6lowpan-parameters',
      'urn:iana:_6lowpan-parameters:lowpan_nhc',
      'urn:iana:edhoc:edhoc-cipher-suites',
      'IANA URN scheme',
    ],
    'specs/w3c-urn/index.html': [
      'urn:w3c:rec:CSS1:19990111',
      'urn:w3c:2dcontext',
      'urn:pubid:w3c:std:~62ecss',
      'W3C URN scheme',
    ],
    'specs/omg-urn/index.html': [
      'urn:omg:-PDF',
      'urn:omg:-Infrastructure',
      'urn:pubid:omg:spec:acronym-AMI4CCM:v-1.0',
      'OMG URN scheme',
    ],
    'specs/sae-urn/index.html': [
      'urn:sae:j:3016:202104',
      'urn:sae:as:22520/45A',
      'urn:pubid:sae:id:3016:typeabbr-J:year-2021:month-4',
      'SAE URN scheme',
    ],
    'specs/eu-urn/index.html': [
      'urn:eu:reg:2011:1227',
      'data.europa.eu/eli/reg/2011/1227/oj',
      'urn:pubid:eu:dec:2013:1082:f:0.numberfirst-true',
      'EU URN scheme',
    ],
    'specs/arxiv-urn/index.html': [
      'urn:pubid:arxiv:eprint:2023:1:00001:v-1',
      'urn:pubid:arxiv:eprint:2003:9:136:archive-math:sc-GT',
      'arXiv URN scheme',
    ],
    'specs/gb-urn/index.html': [
      'urn:gb:gb:1234:2010',
      'urn:gb:t/gzaepi:001:2018',
      'urn:pubid:gb:std:13368:pub-JB:mandate-T:year-2018',
      'GB URN scheme',
    ],
    'specs/un-urn/index.html': [
      'urn:un:1',
      'urn:un:32:2004',
      'urn:pubid:un:document:A,RES,78:1',
      'UN URN scheme',
    ],
    'specs/adobe-urn/index.html': [
      'urn:adobe:tech-note:12',
      'urn:adobe:tech-note:15',
      'urn:adobe:tech-note:30',
      'urn:pubid:adobe:technote:5014',
      'Adobe URN scheme',
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
