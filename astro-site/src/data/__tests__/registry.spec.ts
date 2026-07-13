import { describe, it, expect } from 'vitest'
import { publishers, getPublisher, getPublishersByCategory,
  internationalPublishers, regionalPublishers,
  nationalPublishers, industryPublishers } from '~/data'
import type { Publisher, Category } from '~/data/types'

// Registry invariants — these MUST hold for the site to function.

describe('registry', () => {
  it('contains exactly the expected publisher count', () => {
    // Adding/removing a publisher is a deliberate decision; this assertion
    // catches accidental regressions.
    expect(publishers).toHaveLength(26)
  })

  it('publishers are sorted alphabetically by flavor', () => {
    const flavors = publishers.map(p => p.flavor)
    const sorted = [...flavors].sort()
    expect(flavors).toEqual(sorted)
  })

  it('every flavor is unique', () => {
    const flavors = publishers.map(p => p.flavor)
    expect(new Set(flavors).size).toBe(flavors.length)
  })

  it('every category is represented', () => {
    const categories = new Set(publishers.map(p => p.category))
    expect(categories).toEqual(new Set<Category>(['international', 'regional', 'national', 'industry']))
  })

  it('category filters partition the registry', () => {
    // MECE check: every publisher appears in exactly one category filter.
    const combined = [
      ...internationalPublishers,
      ...regionalPublishers,
      ...nationalPublishers,
      ...industryPublishers,
    ]
    expect(combined).toHaveLength(publishers.length)
    expect(new Set(combined.map(p => p.flavor)).size).toBe(publishers.length)
  })
})

describe('getPublisher', () => {
  it('returns the publisher for a known flavor', () => {
    const iso = getPublisher('iso')
    expect(iso).toBeDefined()
    expect(iso?.name).toBe('ISO')
  })

  it('returns undefined for an unknown flavor', () => {
    expect(getPublisher('nonexistent')).toBeUndefined()
  })

  it('handles hyphenated flavor names (cen-cenelec)', () => {
    const cen = getPublisher('cen-cenelec')
    expect(cen).toBeDefined()
    expect(cen?.name).toBe('CEN-CENELEC')
  })
})

describe('getPublishersByCategory', () => {
  it('filters by category correctly', () => {
    const intl = getPublishersByCategory('international')
    expect(intl.length).toBeGreaterThan(0)
    expect(intl.every(p => p.category === 'international')).toBe(true)
  })
})
