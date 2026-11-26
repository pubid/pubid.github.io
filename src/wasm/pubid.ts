// The typed loader for the pubid-wasm bundle (pubid-rs#25, issue #22).
//
// The bundle is a vendored static asset (public/wasm/, provenance in
// src/data/wasm-bundle.json): the playground imports it at its public
// URL with a plain dynamic import — no bundler in the loop — and the
// web-target glue fetches the .wasm through its own init(). The
// authoritative type surface is the wasm-bindgen .d.ts in the pkg; the
// narrow interfaces here are the site's contract with the bundle.
//
// No static node imports: this module is part of the client bundle,
// and the runner-only branches (the vitest suite loads the same
// bundle from the checkout) resolve their node builtins lazily.

export const WASM_MODULE_URL = '/wasm/pubid_wasm.js'
export const WASM_BINARY_URL = '/wasm/pubid_wasm_bg.wasm'

/** One parsed identifier: the canonical forms + the URN namespace class. */
export interface ParseReport {
  flavor: string
  type: string
  hash: Record<string, unknown>
  human: string
  urn: string | null
  urn_scheme: 'urn' | 'mrn' | null
}

/** The non-throwing verdict (the parse_ok-class shape). */
export interface ParseVerdict {
  ok: boolean
  result?: ParseReport
  error?: string
  code?: 'unknown_flavor' | 'parse' | 'invalid' | 'artifact' | 'corpus' | 'internal'
}

/** One corpus-fed example row. */
export interface ExampleRow {
  id: string
  input: string
  urn: string | null
}

/** The example set, keyed by flavor. */
export type ExampleSet = Record<string, ExampleRow[]>

/** One flavor's checksummed-artifact receipt. */
export interface ArtifactReceipt {
  checksum: string | null
  semantics_hash: string | null
  grammar_name: string | null
  version: string | null
}

/** The bundle's exports (the wasm-bindgen .d.ts mirror, narrowed). */
export interface PubidWasmModule {
  default: (init?: string | { module_or_path: Uint8Array }) => Promise<void>
  pubid_version(): string
  pubid_flavors(): string[]
  pubid_parse(flavor: string, input: string): ParseReport
  pubid_try_parse(flavor: string, input: string): ParseVerdict
  pubid_detect(input: string): string[]
  pubid_examples(): ExampleSet
  pubid_artifacts(): Record<string, ArtifactReceipt>
}

let loaded: Promise<PubidWasmModule> | null = null

/**
 * The asset URL: in the browser the leading "/" rides the site origin;
 * in a plain ESM runner (the vitest suite, where this module's own URL
 * is a file path) the bundle resolves against the checkout instead, so
 * the same production loader path runs in both. Exported for the
 * loader tests.
 *
 * Deliberately NOT `new URL(path, import.meta.url)` — Vite rewrites
 * that two-arg pattern into a static glob lookup, which yields
 * `undefined` for a runtime-computed path.
 */
export function resolveAsset(publicPath: string): string {
  const moduleUrl = new URL(import.meta.url)
  if (moduleUrl.protocol !== 'file:') return publicPath
  const checkout = moduleUrl.href.slice(0, moduleUrl.href.lastIndexOf('/src/'))
  if (!publicPath.startsWith('/') || !checkout) return publicPath
  return `${checkout}/public${publicPath}`
}

/**
 * Load and initialize the bundle once (idempotent). The .wasm is
 * passed explicitly — a URL in the browser (the glue fetches it), or
 * raw bytes in a plain ESM runner where fetch() cannot ride file
 * URLs (the glue instantiates buffers directly).
 */
export function loadPubidWasm(): Promise<PubidWasmModule> {
  if (!loaded) {
    loaded = (async () => {
      const moduleUrl = resolveAsset(WASM_MODULE_URL)
      const module = (await import(/* @vite-ignore */ moduleUrl)) as PubidWasmModule
      const binaryUrl = resolveAsset(WASM_BINARY_URL)
      if (binaryUrl.startsWith('file:')) {
        // A plain ESM runner (vitest): fetch() cannot ride file URLs,
        // so the binary crosses as bytes (the glue instantiates a
        // buffer directly; the object form avoids its deprecation
        // path).
        const { readFile } = await import(/* @vite-ignore */ 'node:fs/promises')
        const bytes = await readFile(decodeURIComponent(new URL(binaryUrl).pathname))
        await module.default({ module_or_path: bytes })
      } else {
        await module.default(binaryUrl)
      }
      return module
    })()
    // A failed load resets the handle so a retry re-imports.
    loaded.catch(() => {
      loaded = null
    })
  }
  return loaded
}

/** The doc links the playground renders per flavor. */
export interface FlavorDocs {
  /** The publisher schema page (/publishers/<flavor>). */
  publisher: string
  /** The URN scheme reference page, when the flavor has one. */
  urnScheme: string | null
}

/**
 * Map a parsed flavor + the site's publisher registry entry into the
 * doc-link model. `publisher.urnDocs` (set only when the URN scheme
 * reference page exists) is the source of truth for the URN link, so
 * the playground never links a page that is not there.
 */
export function flavorDocs(
  flavor: string,
  publisher?: { urnDocs?: string },
): FlavorDocs {
  return {
    publisher: `/publishers/${flavor}`,
    urnScheme: publisher?.urnDocs ?? null,
  }
}

/** The verdict classes and the panel headline each one renders. */
export const verdictClassLabels: Record<NonNullable<ParseVerdict['code']>, string> = {
  unknown_flavor: 'Unknown flavor',
  parse: 'Not an identifier of this flavor',
  invalid: 'Rejected by the flavor semantics',
  artifact: 'Artifact failed to load or verify',
  corpus: 'Corpus contract violation',
  internal: 'Internal error',
}
