import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

import Playground from '~/components/playground/Playground.vue'
import type { ParseVerdict, PubidWasmModule } from '~/wasm/pubid'

// The component logic over a fake engine: the wasm binary itself is
// exercised end to end by src/wasm/__tests__/pubid.spec.ts (the real
// bundle in the runner); here the panels, the verdict arms and the
// example picker are what is under test.
const fakeWasm: PubidWasmModule = {
  default: vi.fn().mockResolvedValue(undefined),
  pubid_version: () => '0.1.0',
  pubid_flavors: () => ['doi', 'isbn'],
  pubid_parse: (flavor: string, input: string) => {
    const verdict = fakeWasm.pubid_try_parse(flavor, input)
    if (verdict.ok && verdict.result) return verdict.result
    throw new Error(verdict.error ?? 'parse failed')
  },
  pubid_try_parse: (flavor: string, input: string): ParseVerdict => {
    if (input === 'doi:10.1000/182') {
      return {
        ok: true,
        result: {
          flavor,
          type: 'pubid:doi:resource',
          hash: { _type: 'pubid:doi:resource', prefix: '10.1000', suffix: '182' },
          human: 'doi:10.1000/182',
          urn: 'urn:doi',
          urn_scheme: 'urn',
        },
      }
    }
    if (input === 'ISBN 978-3-16-148410-1') {
      return { ok: false, error: 'ISBN check digit invalid', code: 'invalid' }
    }
    return { ok: false, error: 'parse failed: no match', code: 'parse' }
  },
  pubid_detect: (input: string) => {
    if (input === 'doi:10.1000/182') return ['doi']
    if (input.startsWith('ISBN')) return []
    return []
  },
  pubid_examples: () => ({
    doi: [{ id: 'doi.resource.0001', input: 'doi:10.1000/182', urn: 'urn:doi' }],
    iho: [{ id: 'iho.bathymetric.0001', input: 'IHO B-1 1.0.0', urn: 'urn:mrn:iho:pub:bathy:b1:1.0.0' }],
  }),
  pubid_artifacts: () => ({
    doi: { checksum: 'a'.repeat(64), semantics_hash: 'b'.repeat(16), grammar_name: 'doi', version: '1' },
  }),
}

vi.mock('~/wasm/pubid', async importOriginal => {
  const actual = await importOriginal<typeof import('~/wasm/pubid')>()
  return { ...actual, loadPubidWasm: () => Promise.resolve(fakeWasm) }
})

async function mountReady() {
  const wrapper = mount(Playground)
  await flushPromises()
  await nextTick()
  return wrapper
}

describe('Playground.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('reports the engine ready with its version', async () => {
    const wrapper = await mountReady()
    const status = wrapper.find('[data-testid="engine-status"]')
    expect(status.text()).toContain('ready')
    expect(status.text()).toContain('0.1.0')
  })

  it('primes the doi example and renders the panels', async () => {
    const wrapper = await mountReady()
    // The prime fed the doi row; the panels carry its canonical forms.
    expect((wrapper.find('[data-testid="playground-input"]').element as HTMLInputElement).value).toBe(
      'doi:10.1000/182',
    )
    expect(wrapper.find('[data-testid="canonical"]').text()).toBe('doi:10.1000/182')
    expect(wrapper.find('[data-testid="urn"]').text()).toBe('urn:doi')
    expect(wrapper.find('[data-testid="hash"]').text()).toContain('pubid:doi:resource')
    expect(wrapper.find('[data-testid="detection"]').text()).toContain('doi')
  })

  it('shows the failure panel with the class label on rejection', async () => {
    const wrapper = await mountReady()
    // Manual mode: the detection has no hit for a bad ISBN, so the
    // parse targets the chosen flavor.
    await wrapper.findAll('input[type="radio"]')[1]!.setValue()
    await wrapper.find('select').setValue('isbn')
    await wrapper.find('[data-testid="playground-input"]').setValue('ISBN 978-3-16-148410-1')
    await flushPromises()
    const failure = wrapper.find('[data-testid="verdict-failure"]')
    expect(failure.exists()).toBe(true)
    expect(failure.text()).toContain('Rejected by the flavor semantics')
    expect(failure.text()).toContain('ISBN check digit invalid')
  })

  it('reports an empty detection on unparseable input', async () => {
    const wrapper = await mountReady()
    await wrapper.find('[data-testid="playground-input"]').setValue('this is not an identifier')
    await flushPromises()
    expect(wrapper.find('[data-testid="detection"]').text()).toContain('no ported flavor parses this input')
    expect(wrapper.find('[data-testid="report"]').exists()).toBe(false)
  })

  it('switches flavor manually and parses through it', async () => {
    const wrapper = await mountReady()
    const manualRadio = wrapper.findAll('input[type="radio"]')[1]!
    await manualRadio.setValue()
    const select = wrapper.find('select')
    await select.setValue('doi')
    await wrapper.find('[data-testid="playground-input"]').setValue('doi:10.1000/182')
    await flushPromises()
    expect(wrapper.find('[data-testid="canonical"]').text()).toBe('doi:10.1000/182')
  })

  it('loads an example from the picker', async () => {
    const wrapper = await mountReady()
    // The picker defaults to the first flavor key (doi); switch to iho
    // and click its row.
    const pickerSelect = wrapper.find('[data-testid="examples"] select')
    await pickerSelect.setValue('iho')
    const buttons = wrapper.findAll('[data-testid="examples"] button')
    expect(buttons).toHaveLength(1)
    await buttons[0]!.trigger('click')
    await flushPromises()
    expect((wrapper.find('[data-testid="playground-input"]').element as HTMLInputElement).value).toBe(
      'IHO B-1 1.0.0',
    )
  })

  it('renders the doc links of the parsed flavor', async () => {
    const wrapper = await mountReady()
    const links = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(links).toContain('/publishers/doi')
    // doi carries urnDocs in the registry, so the URN spec link rides
    // the report panel too.
    expect(links).toContain('/specs/doi-urn')
  })
})
