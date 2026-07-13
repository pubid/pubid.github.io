<script setup lang="ts">
import { ref, computed } from 'vue'

// FormatDiagram.vue — shows how a single identifier renders across formats
// (Human, URN, JSON). Tab switching is animated.

interface Format {
  key: string
  label: string
  render: (id: { publisher: string; type?: string; number: string; year?: string; part?: string }) => string
}

const formats: Format[] = [
  {
    key: 'human',
    label: 'Human',
    render: (id) => [id.publisher, id.type, id.number + (id.part ? `-${id.part}` : ''), id.year].filter(Boolean).join(' '),
  },
  {
    key: 'urn',
    label: 'URN',
    render: (id) => `urn:${id.publisher.toLowerCase()}:std:${id.number}${id.part ? `:-${id.part}` : ''}${id.year ? `:${id.year}` : ''}`,
  },
  {
    key: 'json',
    label: 'JSON',
    render: (id) => JSON.stringify({
      publisher: id.publisher,
      type: id.type || null,
      number: id.number,
      part: id.part || null,
      year: id.year ? parseInt(id.year, 10) : null,
    }, null, 0),
  },
]

const samples = [
  { publisher: 'ISO', type: undefined, number: '9001', year: '2015', part: undefined },
  { publisher: 'IEC', type: undefined, number: '61131', year: '2013', part: '3' },
  { publisher: 'NIST', type: 'SP', number: '800-53', year: undefined, part: undefined },
  { publisher: 'IEEE', type: 'Std', number: '802.3', year: '2018', part: undefined },
]

const activeSample = ref(0)
const activeFormat = ref<Format>(formats[0])

const rendered = computed(() => activeFormat.value.render(samples[activeSample.value]))
</script>

<template>
  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] overflow-hidden">
    <div class="flex border-b border-[var(--color-border)]">
      <button
        v-for="(fmt, i) in formats"
        :key="fmt.key"
        :class="[
          'flex-1 py-2.5 text-sm font-medium transition-colors',
          activeFormat.key === fmt.key
            ? 'bg-[var(--color-bg)] text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] -mb-px'
            : 'text-[var(--color-text-2)] hover:text-[var(--color-text)]',
        ]"
        @click="activeFormat = formats[i]"
      >
        {{ fmt.label }}
      </button>
    </div>
    <div class="p-6">
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="(s, i) in samples"
          :key="i"
          :class="[
            'px-2.5 py-1 rounded text-xs font-mono transition-colors',
            activeSample === i
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-bg-inset)] text-[var(--color-text-2)] hover:text-[var(--color-text)]',
          ]"
          @click="activeSample = i"
        >
          {{ formats[0].render(s) }}
        </button>
      </div>
      <div class="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border-subtle)]">
        <code class="font-mono text-sm break-all">{{ rendered }}</code>
      </div>
    </div>
  </div>
</template>
