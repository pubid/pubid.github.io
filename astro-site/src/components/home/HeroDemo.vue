<script setup lang="ts">
import { ref, computed } from 'vue'

// HeroDemo.vue — interactive identifier parser demo for the homepage.
// User types or clicks a preset chip; the parsed component chips render.
//
// Note: today this is a static lookup (preset → parsed). When a WASM build
// of pubid core is available, swap the lookup for a live parse call.

interface DemoComp { key: string; value: string; color: string }
interface DemoGroup { label: string; accent: string; comps: DemoComp[] }
interface DemoResult {
  input: string
  publisher: string
  type: string
  components: DemoComp[]
  groups: DemoGroup[]
  urn: string
}

const c = (key: string, value: string, color: string): DemoComp => ({ key, value, color })

const demoData: DemoResult[] = [
  {
    input: 'ISO 9001:2015',
    publisher: 'ISO',
    type: 'ISO · International Standard',
    components: [c('publisher', 'ISO', '#2978a1'), c('number', '9001', '#dc2626'), c('year', '2015', '#d97706')],
    groups: [],
    urn: 'urn:iso:std:iso:9001:ed-5:en',
  },
  {
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    publisher: 'ISO',
    type: 'ISO · Amendment Identifier',
    components: [],
    groups: [
      { label: 'Amendment', accent: '#0d9488', comps: [c('type', 'Amd', '#0d9488'), c('number', '1', '#dc2626'), c('year', '2022', '#d97706')] },
      { label: 'Int\'l Standard', accent: '#2978a1', comps: [c('publisher', 'ISO', '#2978a1'), c('copublisher', 'IEC', '#da9d76'), c('number', '17031', '#dc2626'), c('part', '1', '#059669'), c('year', '2020', '#d97706')] },
    ],
    urn: 'urn:iso:std:iso-iec:17031:-1:ed-1:amd:1:v1',
  },
  {
    input: 'IEEE Std 802.3-2018',
    publisher: 'IEEE',
    type: 'IEEE · Standard',
    components: [c('publisher', 'IEEE', '#2978a1'), c('type', 'Std', '#059669'), c('number', '802.3', '#dc2626'), c('year', '2018', '#d97706')],
    groups: [],
    urn: 'urn:ieee:std:802.3-2018',
  },
  {
    input: 'NIST SP 800-53 Rev. 5',
    publisher: 'NIST',
    type: 'NIST · Special Publication',
    components: [c('publisher', 'NIST', '#2978a1'), c('type', 'SP', '#059669'), c('number', '800-53', '#dc2626'), c('revision', 'Rev. 5', '#d97706')],
    groups: [],
    urn: 'urn:nist:pub:sp:800-53:r5',
  },
]

const input = ref('ISO 9001:2015')
const result = computed(() => demoData.find(r => r.input === input.value) || null)
</script>

<template>
  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
    <div class="flex items-center gap-2 mb-3">
      <input
        v-model="input"
        placeholder="Type an identifier…"
        spellcheck="false"
        class="flex-1 px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)] text-sm font-mono"
      />
      <span
        v-if="result"
        class="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)]"
      >
        <span class="size-1.5 rounded-full bg-[var(--color-accent)]"></span>
        parsed
      </span>
    </div>
    <div class="flex flex-wrap gap-1.5 mb-4">
      <button
        v-for="d in demoData"
        :key="d.input"
        :class="[
          'px-2 py-1 rounded text-xs font-mono transition-colors',
          input === d.input
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-bg-inset)] text-[var(--color-text-2)] hover:text-[var(--color-text)]',
        ]"
        @click="input = d.input"
      >
        {{ d.input.length > 26 ? d.input.slice(0, 23) + '…' : d.input }}
      </button>
    </div>
    <Transition name="fade" mode="out-in">
      <div v-if="result" :key="result.input" class="space-y-3">
        <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)]">
          {{ result.type }}
        </div>
        <template v-if="result.groups.length">
          <div
            v-for="(group, gi) in result.groups"
            :key="gi"
            class="p-3 rounded-md border-l-2"
            :style="{ borderColor: group.accent, background: group.accent + '0a' }"
          >
            <div class="text-xs uppercase tracking-wide mb-2" :style="{ color: group.accent }">{{ group.label }}</div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="comp in group.comps"
                :key="comp.key"
                class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono"
                :style="{ background: comp.color + '18', color: comp.color }"
              >
                <span class="opacity-60 text-[0.6rem] uppercase">{{ comp.key }}</span>
                {{ comp.value }}
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="comp in result.components"
              :key="comp.key"
              class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono"
              :style="{ background: comp.color + '18', color: comp.color }"
            >
              <span class="opacity-60 text-[0.6rem] uppercase">{{ comp.key }}</span>
              {{ comp.value }}
            </span>
          </div>
        </template>
        <div v-if="result.urn" class="pt-2 border-t border-[var(--color-border-subtle)]">
          <div class="text-[0.65rem] uppercase tracking-wide text-[var(--color-text-3)] mb-1">URN</div>
          <code class="font-mono text-xs text-[var(--color-accent)] break-all">{{ result.urn }}</code>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 200ms ease, transform 200ms ease; }
.fade-enter-from { opacity: 0; transform: translateY(4px); }
.fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
