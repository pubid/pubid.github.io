<script setup lang="ts">
// Playground.vue — the interactive identifier workbench (issue #22).
//
// The parse runs entirely client-side: the pubid-wasm bundle (the
// checksummed grammar artifacts inside) loads once from its static
// URL and every keystroke re-parses through the same flavor layer the
// CLI and the conformance runner use. No server round-trip.
import { computed, onMounted, ref, watch } from 'vue'
import { publishers, publishersByFlavor, type Publisher } from '~/data'
import {
  flavorDocs,
  loadPubidWasm,
  verdictClassLabels,
  type ArtifactReceipt,
  type ExampleRow,
  type ExampleSet,
  type ParseVerdict,
  type PubidWasmModule,
} from '~/wasm/pubid'

const input = ref('')
const flavorMode = ref<'auto' | 'manual'>('auto')
const manualFlavor = ref('')
const engineVersion = ref('')
const engineState = ref<'loading' | 'ready' | 'failed'>('loading')
const engineError = ref('')
const verdict = ref<ParseVerdict | null>(null)
const detected = ref<string[]>([])
const examples = ref<ExampleSet>({})
const receipts = ref<Record<string, ArtifactReceipt>>({})
const activeExample = ref('')

// The loaded module, held off the reactive graph (functions are not
// reactive state).
let wasm: PubidWasmModule | null = null

const sortedFlavors = computed(() => publishers.map(p => p.flavor))

onMounted(async () => {
  try {
    wasm = await loadPubidWasm()
    engineVersion.value = wasm.pubid_version()
    receipts.value = wasm.pubid_artifacts()
    examples.value = wasm.pubid_examples()
    engineState.value = 'ready'
    recompute()
    if (!input.value) primeFirstExample()
  } catch (err) {
    engineState.value = 'failed'
    engineError.value = err instanceof Error ? err.message : String(err)
  }
})

function primeFirstExample() {
  // The canonical smoke input: the corpus' doi row, if present.
  const row = examples.value['doi']?.[0] ?? Object.values(examples.value)[0]?.[0]
  if (row) {
    activeExample.value = row.id
    input.value = row.input
  }
}

// ── Parsing ────────────────────────────────────────────────────

const parseTarget = computed(() => {
  if (flavorMode.value === 'manual') return manualFlavor.value
  return detected.value[0] ?? ''
})

function recompute() {
  if (engineState.value !== 'ready' || !wasm) return
  detected.value = input.value.trim() ? wasm.pubid_detect(input.value) : []
  if (!input.value.trim() || !parseTarget.value) {
    verdict.value = null
    return
  }
  verdict.value = wasm.pubid_try_parse(parseTarget.value, input.value)
}

watch([input, manualFlavor, flavorMode], recompute)

// ── Derived panel state ────────────────────────────────────────

const report = computed(() => verdict.value?.ok ? verdict.value.result ?? null : null)
const failure = computed(() => !verdict.value?.ok ? verdict.value ?? null : null)
const failureLabel = computed(() => {
  const code = failure.value?.code
  return code ? verdictClassLabels[code] ?? code : 'Rejected'
})

const publisher = computed<Publisher | undefined>(
  () => publishersByFlavor.get(report.value?.flavor ?? ''),
)

const docs = computed(() => {
  const flavor = report.value?.flavor
  return flavor ? flavorDocs(flavor, publisher.value) : null
})

const hashJson = computed(() => {
  const hash = report.value?.hash
  return hash ? JSON.stringify(hash, null, 2) : ''
})

const urnSchemeLabel = computed(() => {
  const scheme = report.value?.urn_scheme
  if (scheme === 'mrn') return 'MRN member identifier (urn:mrn:)'
  if (scheme === 'urn') return 'RFC 8141 URN'
  return null
})

const receiptLine = computed(() => {
  const flavor = report.value?.flavor
  if (!flavor) return null
  const receipt = receipts.value[flavor]
  if (!receipt?.checksum) return null
  return `${flavor} · envelope ${receipt.checksum.slice(0, 12)}… · semantics ${receipt.semantics_hash?.slice(0, 12)}…`
})

const exampleRows = computed<ExampleRow[]>(() => {
  // The example list of the active flavor (auto: the detected one).
  const flavor = flavorMode.value === 'manual' ? manualFlavor.value : parseTarget.value
  return examples.value[flavor] ?? []
})

function applyExample(row: ExampleRow) {
  activeExample.value = row.id
  input.value = row.input
}

// ── The example picker groups the corpus rows by flavor ────────
const exampleFlavors = computed(() => Object.keys(examples.value))
const exampleFlavor = ref('')
const pickerRows = computed(() => examples.value[exampleFlavor.value] ?? [])

watch(exampleFlavors, flavors => {
  if (!exampleFlavor.value && flavors.length) exampleFlavor.value = flavors[0]
}, { immediate: true })
</script>

<template>
  <div class="playground">
    <!-- Engine status line -->
    <div class="mb-4 flex items-center gap-2 text-sm" data-testid="engine-status">
      <span
        class="inline-block size-2 rounded-full"
        :class="engineState === 'ready' ? 'bg-emerald-500' : engineState === 'failed' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'"
        aria-hidden="true"
      />
      <span v-if="engineState === 'ready'" class="text-[var(--color-text-2)]">
        pubid-wasm engine ready — pubid-core v{{ engineVersion }}, grammar artifacts checksum-verified
      </span>
      <span v-else-if="engineState === 'failed'" class="text-red-500">
        the wasm engine failed to load: {{ engineError }}
      </span>
      <span v-else class="text-[var(--color-text-3)]">loading the wasm engine…</span>
    </div>

    <!-- Input -->
    <div class="mb-2 flex flex-wrap items-center gap-2">
      <input
        v-model="input"
        type="text"
        class="w-full font-mono text-base px-4 py-3 rounded-md bg-[var(--color-bg-inset)] border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none"
        placeholder="Type any identifier — ISO 9001:2015, IHO B-1 1.0.0, ISBN 978-0-306-40615-7, arXiv:math.GT/0309136…"
        data-testid="playground-input"
        :disabled="engineState !== 'ready'"
        aria-label="Identifier input"
      />
    </div>

    <!-- Flavor mode -->
    <div class="mb-4 flex flex-wrap items-center gap-3 text-sm">
      <label class="flex items-center gap-1.5">
        <input v-model="flavorMode" type="radio" value="auto" />
        <span>auto-detect</span>
      </label>
      <label class="flex items-center gap-1.5">
        <input v-model="flavorMode" type="radio" value="manual" />
        <span>flavor:</span>
      </label>
      <select
        v-model="manualFlavor"
        :disabled="flavorMode !== 'manual'"
        class="px-2 py-1 rounded bg-[var(--color-bg-raised)] border border-[var(--color-border)] disabled:opacity-40"
        aria-label="Parse flavor"
      >
        <option value="" disabled>choose a flavor…</option>
        <option v-for="flavor in sortedFlavors" :key="flavor" :value="flavor">{{ flavor }}</option>
      </select>
    </div>

    <!-- Flavor detection -->
    <div class="mb-6" data-testid="detection">
      <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)] mb-1.5">Flavor detection</div>
      <div v-if="!input.trim()" class="text-sm text-[var(--color-text-3)]">waiting for input…</div>
      <div v-else-if="detected.length === 0" class="text-sm text-[var(--color-text-3)]">
        no ported flavor parses this input
      </div>
      <div v-else class="flex flex-wrap gap-1.5">
        <span
          v-for="flavor in detected"
          :key="flavor"
          class="chip"
          :class="{ 'chip-active': parseTarget === flavor }"
        >{{ flavor }}</span>
      </div>
    </div>

    <!-- The parse verdict -->
    <div v-if="failure" class="mb-6 p-4 rounded-md border border-red-400/40 bg-red-500/5" data-testid="verdict-failure">
      <div class="font-medium text-red-500 mb-1">{{ failureLabel }}</div>
      <div class="text-sm text-[var(--color-text-2)] font-mono break-all">{{ failure.error }}</div>
    </div>

    <!-- Panels -->
    <div v-if="report" class="grid gap-4 lg:grid-cols-2 mb-6" data-testid="report">
      <div class="p-4 rounded-md card-elevated">
        <div class="flex items-baseline justify-between mb-2">
          <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)]">Canonical</div>
          <span class="chip">{{ report.flavor }}</span>
        </div>
        <div class="font-mono text-lg break-all" data-testid="canonical">{{ report.human }}</div>
        <div class="mt-3 text-sm text-[var(--color-text-2)]">
          type <code class="font-mono">{{ report.type }}</code>
        </div>
        <div v-if="receiptLine" class="mt-2 text-xs text-[var(--color-text-3)] font-mono">{{ receiptLine }}</div>
      </div>

      <div class="p-4 rounded-md card-elevated">
        <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)] mb-2">URN / MRN</div>
        <div v-if="report.urn" class="font-mono text-base break-all" data-testid="urn">{{ report.urn }}</div>
        <div v-else class="text-sm text-[var(--color-text-3)]">the flavor emits no URN for this identifier</div>
        <div v-if="urnSchemeLabel" class="mt-2 text-xs text-[var(--color-text-3)]">{{ urnSchemeLabel }}</div>
        <div v-if="docs" class="mt-3 flex flex-wrap gap-3 text-sm">
          <a :href="docs.publisher" class="text-[var(--color-accent)] hover:underline">{{ report.flavor }} publisher schema →</a>
          <a v-if="docs.urnScheme" :href="docs.urnScheme" class="text-[var(--color-accent)] hover:underline">URN scheme spec →</a>
        </div>
      </div>

      <div class="p-4 rounded-md card-elevated lg:col-span-2">
        <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)] mb-2">Typed tree (the canonical hash)</div>
        <pre class="font-mono text-sm overflow-auto max-h-80" data-testid="hash"><code>{{ hashJson }}</code></pre>
      </div>
    </div>

    <!-- Corpus examples -->
    <div class="p-4 rounded-md card-elevated" data-testid="examples">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)]">Examples</div>
        <span class="text-xs text-[var(--color-text-3)]">fed from the pubid-testsuite corpus (vendored slices)</span>
        <select
          v-model="exampleFlavor"
          class="ml-auto px-2 py-1 rounded bg-[var(--color-bg-raised)] border border-[var(--color-border)] text-sm"
          aria-label="Example flavor"
        >
          <option v-for="flavor in exampleFlavors" :key="flavor" :value="flavor">{{ flavor }}</option>
        </select>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="row in pickerRows"
          :key="row.id"
          class="font-mono text-xs px-2 py-1 rounded border transition-colors"
          :class="activeExample === row.id
            ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-soft)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'"
          :title="row.id + (row.urn ? ` → ${row.urn}` : '')"
          @click="applyExample(row)"
        >{{ row.input }}</button>
        <span v-if="pickerRows.length === 0" class="text-sm text-[var(--color-text-3)]">
          no example rows for this flavor
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chip {
  padding: 0.25rem 0.6rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-family: var(--font-mono, monospace);
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border);
}
.chip-active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-accent-soft);
}
</style>
