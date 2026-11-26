import { describe, it, expect } from 'vitest'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import {
  flavorDocs,
  verdictClassLabels,
  loadPubidWasm,
  WASM_MODULE_URL,
  WASM_BINARY_URL,
  type PubidWasmModule,
} from '~/wasm/pubid'
import wasmBundle from '~/data/wasm-bundle.json'
import { publishers } from '~/data'

// ── the pure helpers ──────────────────────────────────────────

describe('flavorDocs', () => {
  it('links the publisher page and the registry URN page when present', () => {
    const iso = publishers.find(p => p.flavor === 'iso')
    expect(iso?.urnDocs).toBe('/specs/iso-urn')
    expect(flavorDocs('iso', iso)).toEqual({
      publisher: '/publishers/iso',
      urnScheme: '/specs/iso-urn',
    })
  })

  it('links no URN page when the flavor carries none', () => {
    const without = publishers.find(p => !p.urnDocs)
    expect(flavorDocs(without?.flavor ?? 'zzz', without)).toEqual({
      publisher: `/publishers/${without?.flavor ?? 'zzz'}`,
      urnScheme: null,
    })
  })
})

describe('verdictClassLabels', () => {
  it('labels every class the engine can emit', () => {
    for (const code of ['unknown_flavor', 'parse', 'invalid', 'artifact', 'corpus', 'internal'] as const) {
      expect(verdictClassLabels[code], `label for ${code}`).toBeTruthy()
    }
  })
})

// ── the shipped bundle: the real wasm, loaded in the test runner ──

describe('the vendored pubid-wasm bundle', () => {
  // The bundle loads through the same loader the playground uses,
  // with the assets resolved against the checkout (the loader's
  // runner branch does the file-URL work).
  const root = process.cwd()

  it('the committed files match the recorded provenance hashes', () => {
    for (const [name, meta] of Object.entries(wasmBundle.files)) {
      const bytes = readFileSync(join(root, 'public', 'wasm', name))
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(meta.sha256)
      expect(bytes.length).toBe(meta.bytes)
    }
  })

  it('parses, detects, and emits the canonical forms', async () => {
    const wasm: PubidWasmModule = await loadPubidWasm()

    // The engine line: a version and the ported fleet.
    expect(wasm.pubid_version()).toMatch(/^\d+\.\d+\.\d+/)
    const flavors = wasm.pubid_flavors()
    expect(flavors).toContain('doi')
    expect(flavors.length).toBeGreaterThanOrEqual(27)

    // The doi receipt (the corpus smoke row).
    const doi = wasm.pubid_try_parse('doi', 'doi:10.1000/182')
    expect(doi.ok).toBe(true)
    expect(doi.result?.human).toBe('doi:10.1000/182')
    expect(doi.result?.urn).toBe('urn:doi')
    expect(doi.result?.urn_scheme).toBe('urn')
    expect(doi.result?.type).toBe('pubid:doi:resource')

    // The MRN class (the IHO guidance emission).
    const iho = wasm.pubid_try_parse('iho', 'IHO B-1 1.0.0')
    expect(iho.ok).toBe(true)
    expect(iho.result?.urn).toBe('urn:mrn:iho:pub:bathy:b1:1.0.0')
    expect(iho.result?.urn_scheme).toBe('mrn')

    // The verdict classes.
    const invalid = wasm.pubid_try_parse('isbn', 'ISBN 978-3-16-148410-1')
    expect(invalid).toMatchObject({ ok: false, code: 'invalid' })
    const rejected = wasm.pubid_try_parse('doi', 'doi:')
    expect(rejected).toMatchObject({ ok: false, code: 'parse' })
    const unknown = wasm.pubid_try_parse('zzz', 'x')
    expect(unknown).toMatchObject({ ok: false, code: 'unknown_flavor' })

    // The detection.
    expect(wasm.pubid_detect('ISBN 978-0-306-40615-7')).toContain('isbn')
    expect(wasm.pubid_detect('this is not an identifier')).toEqual([])

    // The receipts: every flavor's envelope carries a checksum.
    const receipts = wasm.pubid_artifacts()
    expect(Object.keys(receipts).length).toBeGreaterThanOrEqual(27)
    for (const [flavor, receipt] of Object.entries(receipts)) {
      expect(receipt.checksum?.length ?? 0).toBeGreaterThanOrEqual(64)
      expect(receipt.semantics_hash?.length ?? 0).toBeGreaterThanOrEqual(1)
    }

    // The example set: every row parses under its flavor, in the
    // runner — the same gate the engine's own suite runs.
    const examples = wasm.pubid_examples()
    const flavorKeys = Object.keys(examples)
    expect(flavorKeys.length).toBeGreaterThanOrEqual(20)
    let rows = 0
    for (const [flavor, list] of Object.entries(examples)) {
      for (const row of list) {
        rows++
        const verdict = wasm.pubid_try_parse(flavor, row.input)
        expect(verdict.ok, `${flavor} row ${row.id} (${row.input})`).toBe(true)
      }
    }
    expect(rows).toBeGreaterThanOrEqual(100)
  })

  it('the shared loader initializes once and survives', async () => {
    // idempotent: the second load resolves the same initialized module
    const first = await loadPubidWasm()
    const second = await loadPubidWasm()
    expect(second).toBe(first)
    expect(first.pubid_version()).toMatch(/^\d+\.\d+\.\d+/)
  })
})
