<script setup lang="ts">
// AnatomyDiagram.vue — decomposes an identifier into colored component chips.
// Static data; could be wired to pubid core via an API in a future iteration.
const examples = [
  {
    id: 'iso-std',
    input: 'ISO 9001:2015',
    label: 'ISO International Standard',
    parts: [
      { name: 'Publisher', value: 'ISO', color: '#2978a1' },
      { name: 'Number', value: '9001', color: '#dc2626' },
      { name: 'Year', value: '2015', color: '#d97706' },
    ],
  },
  {
    id: 'iso-iec-amd',
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    label: 'ISO/IEC with Amendment',
    parts: [
      { name: 'Publisher', value: 'ISO', color: '#2978a1' },
      { name: 'Copublisher', value: 'IEC', color: '#da9d76' },
      { name: 'Number', value: '17031', color: '#dc2626' },
      { name: 'Part', value: '1', color: '#059669' },
      { name: 'Year', value: '2020', color: '#d97706' },
      { name: 'Supplement', value: 'Amd 1:2022', color: '#0d9488' },
    ],
  },
  {
    id: 'ieee',
    input: 'IEEE Std 802.3-2018',
    label: 'IEEE Standard',
    parts: [
      { name: 'Publisher', value: 'IEEE', color: '#2978a1' },
      { name: 'Type', value: 'Std', color: '#059669' },
      { name: 'Number', value: '802.3', color: '#dc2626' },
      { name: 'Year', value: '2018', color: '#d97706' },
    ],
  },
  {
    id: 'nist',
    input: 'NIST SP 800-53 Rev. 5',
    label: 'NIST Special Publication',
    parts: [
      { name: 'Publisher', value: 'NIST', color: '#2978a1' },
      { name: 'Type', value: 'SP', color: '#059669' },
      { name: 'Number', value: '800-53', color: '#dc2626' },
      { name: 'Revision', value: 'Rev. 5', color: '#d97706' },
    ],
  },
]
</script>

<template>
  <div class="space-y-8">
    <div v-for="ex in examples" :key="ex.id">
      <p class="font-medium text-[var(--color-text-2)] text-sm mb-2">{{ ex.label }}</p>
      <div class="p-4 mb-2 rounded-lg bg-[var(--color-bg-raised)] border border-[var(--color-border)]">
        <code class="font-mono text-base font-semibold">{{ ex.input }}</code>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="part in ex.parts"
          :key="part.name"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono"
          :style="{
            background: part.color + '18',
            color: part.color,
            border: '1px solid ' + part.color + '30',
          }"
        >
          <span class="opacity-60 text-[0.65rem] uppercase tracking-wide">{{ part.name }}</span>
          {{ part.value }}
        </span>
      </div>
    </div>
  </div>
</template>
