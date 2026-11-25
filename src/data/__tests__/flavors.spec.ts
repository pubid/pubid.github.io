import { describe, it, expect } from 'vitest'
import { publishers } from '~/data'
import type { Publisher } from '~/data/types'

// Per-flavor structural invariants. These catch data-entry bugs at the
// source — e.g. a doc type missing examples, a component missing a description.

const REQUIRED_STRING_FIELDS: (keyof Publisher)[] = [
  'flavor', 'name', 'fullName', 'category', 'description', 'components',
]

describe('per-flavor structural validation', () => {
  for (const p of publishers) {
    describe(`flavor: ${p.flavor}`, () => {
      it('has all required string fields non-empty', () => {
        for (const field of REQUIRED_STRING_FIELDS) {
          const v = p[field]
          if (typeof v === 'string') {
            expect(v.length, `${field} should be non-empty`).toBeGreaterThan(0)
          } else if (Array.isArray(v)) {
            expect(v.length, `${field} should be a non-empty array`).toBeGreaterThan(0)
          }
        }
      })

      it('flavor matches expected pattern (lowercase, hyphens, digits)', () => {
        expect(p.flavor).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      })

      it('has at least one doc type', () => {
        expect(p.docTypes.length).toBeGreaterThan(0)
      })

      it('every doc type has a unique key', () => {
        const keys = p.docTypes.map(d => d.key)
        expect(new Set(keys).size).toBe(keys.length)
      })

      it('every doc type has at least an empty examples array (not undefined)', () => {
        for (const dt of p.docTypes) {
          expect(Array.isArray(dt.examples)).toBe(true)
        }
      })

      it('every component has a name and description', () => {
        for (const c of p.components) {
          expect(c.name.length).toBeGreaterThan(0)
          expect(c.description.length).toBeGreaterThan(0)
        }
      })

      it('related flavors (if any) reference real flavors', () => {
        if (!p.relatedFlavors) return
        for (const ref of p.relatedFlavors) {
          const found = publishers.find(x => x.flavor === ref)
          expect(found, `related flavor "${ref}" is not in registry`).toBeDefined()
        }
      })

      it('every algebra relation has all four fields', () => {
        for (const a of p.algebra) {
          expect(a.type.length).toBeGreaterThan(0)
          expect(a.description.length).toBeGreaterThan(0)
          expect(a.syntax.length).toBeGreaterThan(0)
          expect(a.example.length).toBeGreaterThan(0)
        }
      })
    })
  }
})

// Specific flavor assertions — these catch regressions in known-shape flavors
// that other tests would miss (e.g. "we added a new doc type to NIST").

describe('specific flavor invariants', () => {
  it('ISO has at least 15 doc types', () => {
    const iso = publishers.find(p => p.flavor === 'iso')
    expect(iso?.docTypes.length).toBeGreaterThanOrEqual(15)
  })

  it('NIST has RB, CHIPS, NWIRP doc types (recently added)', () => {
    const nist = publishers.find(p => p.flavor === 'nist')
    const keys = nist?.docTypes.map(d => d.key) || []
    expect(keys).toContain('research_brief')
    expect(keys).toContain('chips_act_rd')
    expect(keys).toContain('nwirp')
  })

  it('NIST carries the six bare series references (the NBS CS ruling, pubid 2.0.15)', () => {
    const nist = publishers.find(p => p.flavor === 'nist')!
    const keys = nist.docTypes.map(d => d.key)
    for (const k of ['commercial_standard', 'commercial_standards_monthly',
      'commercial_standard_emergency', 'consumer_information_series',
      'voluntary_product_standards', 'data_collection_instruments']) {
      expect(keys, k).toContain(k)
    }
    // each bare series reference is the first example of its doc type,
    // with the emergency form spelled CS-E (not CSE)
    const first = (k: string) => nist.docTypes.find(d => d.key === k)!.examples[0].input
    expect(first('commercial_standard')).toBe('NBS CS')
    expect(first('commercial_standards_monthly')).toBe('NBS CSM')
    expect(first('commercial_standard_emergency')).toBe('NBS CS-E')
    expect(first('consumer_information_series')).toBe('NBS CIS')
    expect(first('voluntary_product_standards')).toBe('NIST PS')
    expect(first('data_collection_instruments')).toBe('NIST DCI')
  })

  it('OIML has the Bulletin doc type', () => {
    const oiml = publishers.find(p => p.flavor === 'oiml')
    expect(oiml?.docTypes.find(d => d.key === 'bulletin')).toBeDefined()
  })

  it('IALA has all 13 doc types (S, R, G, M, C, A, GA, L, Annex, X, P + the S-2xx product specifications and the codeless publications, pubid 2.0.51/2.0.53)', () => {
    const iala = publishers.find(p => p.flavor === 'iala')
    expect(iala?.docTypes).toHaveLength(13)
    const keys = iala?.docTypes.map(d => d.key) || []
    expect(keys).toContain('product_specification')
    expect(keys).toContain('publication')
    // the annex letter takes a sub-number (S-201 ANNEX B2, gem 2.0.53)
    const annex = iala?.docTypes.find(d => d.key === 'annex')
    expect(annex?.examples.map(e => e.input)).toContain('IALA S-201 ANNEX B2')
  })

  it('IHO has all 6 doc types (the five series + the S-4 spec citation, pubid #691)', () => {
    const iho = publishers.find(p => p.flavor === 'iho')
    expect(iho?.docTypes).toHaveLength(6)
    const keys = iho?.docTypes.map(d => d.key) || []
    expect(keys).toContain('s4_specification')
  })

  it('WMO has the six doc types of the widened flavor (pubid #763 + the 2.0.49 widening)', () => {
    const wmo = publishers.find(p => p.flavor === 'wmo')
    expect(wmo).toBeDefined()
    const keys = wmo?.docTypes.map(d => d.key) || []
    expect(keys).toEqual(['publication', 'technical_document', 'jcomm_report',
      'gaw_report', 'standard', 'annex'])
    expect(wmo?.relatedFlavors).toContain('iho')
    expect(wmo?.relatedFlavors).toContain('iala')
    // the MRN pattern carries the widening series slugs and segments
    expect(wmo?.urnPattern).toContain('wmo-td-')
    expect(wmo?.urnPattern).toContain('jcomm-tr-')
    expect(wmo?.urnPattern).toContain('gaw-')
    expect(wmo?.urnPattern).toContain('[:vol-')
    expect(wmo?.urnPattern).toContain('[:status-')
    expect(wmo?.urnPattern).toContain('[:updated-')
  })

  it('WMO carries the widening faces (the 2.0.49 volume/compound-edition rows)', () => {
    const wmo = publishers.find(p => p.flavor === 'wmo')!
    const inputs = wmo.docTypes.find(d => d.key === 'publication')!.examples
      .map(e => e.input)
    // the volume faces — roman and the face-order row (volume before edition)
    expect(inputs).toContain('WMO-No. 8, Volume I')
    expect(inputs).toContain('WMO-No. 306, Volume I.1, 2020 edition')
    // the compound editions — the year pair, the updated-in year, the status word
    expect(inputs).toContain('WMO-No. 8, 2021/2018 edition')
    expect(inputs).toContain('WMO-No. 1364, 2023 edition, updated in 2025')
    expect(inputs).toContain('WMO-No. 8, Provisional 2026 edition')
  })

  it('WMO names the technical-document series and the prefix law in its prose', () => {
    const wmo = publishers.find(p => p.flavor === 'wmo')!
    // each new series is a doc type whose first example is the attested head
    const first = (k: string) => wmo.docTypes.find(d => d.key === k)!.examples[0].input
    expect(first('technical_document')).toBe('WMO/TD-No. 196')
    expect(first('jcomm_report')).toBe('JCOMM Technical Report No. 14')
    expect(first('gaw_report')).toBe('GAW Report No. 312')
    // the prefix law: series parse only under their publisher prefix
    expect(wmo.syntaxNotes).toContain('prefix law')
    expect(wmo.syntaxNotes).toContain('WMO/TD-No.')
    expect(wmo.syntaxNotes).toContain('JCOMM Technical Report No.')
    expect(wmo.syntaxNotes).toContain('GAW Report No.')
  })

  it('Adobe has Publication + Technical Note', () => {
    const adobe = publishers.find(p => p.flavor === 'adobe')
    expect(adobe).toBeDefined()
    const keys = adobe?.docTypes.map(d => d.key) || []
    expect(keys).toEqual(['publication', 'tech_note'])
  })

  it('GOST flavor is present with 3 doc types (Interstate, National, Identical Adoption)', () => {
    const gost = publishers.find(p => p.flavor === 'gost')
    expect(gost).toBeDefined()
    expect(gost?.docTypes).toHaveLength(3)
    const keys = gost?.docTypes.map(d => d.key) || []
    expect(keys).toEqual(['interstate_standard', 'national_standard', 'identical_adoption'])
  })

  it('EASC flavor is present as the parent body of GOST', () => {
    const easc = publishers.find(p => p.flavor === 'easc')
    expect(easc).toBeDefined()
    expect(easc?.relatedFlavors).toContain('gost')
  })

  it('EASC has 2 doc types (PMG, RMG) — real implementation', () => {
    const easc = publishers.find(p => p.flavor === 'easc')
    expect(easc?.docTypes).toHaveLength(2)
    const keys = easc?.docTypes.map(d => d.key) || []
    expect(keys).toEqual(['pmg', 'rmg'])
  })

  it('BIPM has 4 doc types (Committee Document, Meeting, Metrologia, SI Brochure)', () => {
    const bipm = publishers.find(p => p.flavor === 'bipm')
    expect(bipm).toBeDefined()
    expect(bipm?.docTypes).toHaveLength(4)
  })

  it('IANA has the Registry doc type', () => {
    const iana = publishers.find(p => p.flavor === 'iana')
    expect(iana).toBeDefined()
    expect(iana?.docTypes[0]?.key).toBe('registry')
  })

  it('OASIS has the Standard doc type', () => {
    const oasis = publishers.find(p => p.flavor === 'oasis')
    expect(oasis).toBeDefined()
    expect(oasis?.docTypes[0]?.key).toBe('standard')
  })

  it('OGC has the Document doc type', () => {
    const ogc = publishers.find(p => p.flavor === 'ogc')
    expect(ogc).toBeDefined()
    expect(ogc?.docTypes[0]?.key).toBe('document')
  })

  it('3GPP has Technical Specification + Technical Report', () => {
    const tgpp = publishers.find(p => p.flavor === 'tgpp')
    expect(tgpp).toBeDefined()
    const keys = tgpp?.docTypes.map(d => d.key) || []
    expect(keys).toEqual(['technical_specification', 'technical_report'])
  })

  it('W3C has 11 doc types covering the full maturity lifecycle', () => {
    const w3c = publishers.find(p => p.flavor === 'w3c')
    expect(w3c).toBeDefined()
    expect(w3c?.docTypes).toHaveLength(11)
  })

  it('XSF has the XEP doc type', () => {
    const xsf = publishers.find(p => p.flavor === 'xsf')
    expect(xsf).toBeDefined()
    expect(xsf?.docTypes[0]?.key).toBe('xep')
  })

  it('ECMA has 3 doc types (Standard, Technical Report, Memento)', () => {
    const ecma = publishers.find(p => p.flavor === 'ecma')
    expect(ecma).toBeDefined()
    expect(ecma?.docTypes).toHaveLength(3)
    const keys = ecma?.docTypes.map(d => d.key) || []
    expect(keys).toEqual(['standard', 'technical_report', 'memento'])
  })

  it('IETF has 5 doc types (RFC, BCP, STD, FYI, Internet-Draft)', () => {
    const ietf = publishers.find(p => p.flavor === 'ietf')
    expect(ietf).toBeDefined()
    expect(ietf?.docTypes).toHaveLength(5)
    const keys = ietf?.docTypes.map(d => d.key) || []
    expect(keys).toEqual(['rfc', 'bcp', 'std', 'fyi', 'internet_draft'])
  })

  it('CalConnect has the Standard doc type', () => {
    const cc = publishers.find(p => p.flavor === 'calconnect')
    expect(cc).toBeDefined()
    expect(cc?.docTypes).toHaveLength(1)
    expect(cc?.docTypes[0]?.key).toBe('standard')
  })

  it('PDF Association is not a flavor (not in pubid gem)', () => {
    const pdf = publishers.find(p => p.flavor === 'pdf' || p.flavor === 'pdf_association')
    expect(pdf).toBeUndefined()
  })
})
