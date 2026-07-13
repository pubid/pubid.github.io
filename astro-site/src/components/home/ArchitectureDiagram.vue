<script setup lang="ts">
import { ref } from 'vue'

// ArchitectureDiagram.vue — interactive switcher showing how a base identifier
// nests inside amendments / corrigenda / adoptions.
//
// Each "mode" is a complete nested tree of typed component chips.

interface Chip { key: string; value: string; color: string }
interface Group { label: string; accent: string; comps: Chip[] }
interface Mode {
  key: string
  label: string
  input: string
  urn: string
  description: string
  outerLabel: string
  outerAccent: string
  groups: Group[]
}

const modes: Mode[] = [
  {
    key: 'simple',
    label: 'Simple',
    input: 'ISO 9001:2015',
    urn: 'urn:iso:std:iso:9001:ed-5:en',
    description: 'A base identifier decomposes into typed components — publisher, number, and year — the fundamental building blocks.',
    outerLabel: 'International Standard',
    outerAccent: '#2978a1',
    groups: [{
      label: 'Base Identifier',
      accent: '#2978a1',
      comps: [
        { key: 'publisher', value: 'ISO', color: '#2978a1' },
        { key: 'number', value: '9001', color: '#dc2626' },
        { key: 'year', value: '2015', color: '#d97706' },
      ],
    }],
  },
  {
    key: 'supplement',
    label: 'Amendment',
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    urn: 'urn:iso:std:iso-iec:17031:-1:ed-1:amd:1:v1',
    description: 'An amendment wraps a base standard — it carries its own type, number, and year, while the base standard remains intact inside it.',
    outerLabel: 'Amendment Identifier',
    outerAccent: '#0d9488',
    groups: [
      { label: 'Amendment', accent: '#0d9488', comps: [
        { key: 'type', value: 'Amd', color: '#0d9488' },
        { key: 'number', value: '1', color: '#dc2626' },
        { key: 'year', value: '2022', color: '#d97706' },
      ]},
      { label: 'Int\'l Standard', accent: '#2978a1', comps: [
        { key: 'publisher', value: 'ISO', color: '#2978a1' },
        { key: 'copublisher', value: 'IEC', color: '#da9d76' },
        { key: 'number', value: '17031', color: '#dc2626' },
        { key: 'part', value: '1', color: '#059669' },
        { key: 'year', value: '2020', color: '#d97706' },
      ]},
    ],
  },
  {
    key: 'corrigendum',
    label: 'Corrigendum',
    input: 'ISO/IEC 13818-1:2015/Amd 3:2016/Cor 1:2017',
    urn: 'urn:iso:std:iso-iec:13818:-1:amd:2016:v3:cor:2017:v1',
    description: 'A corrigendum wraps an amendment, which wraps the base standard — three levels of nesting.',
    outerLabel: 'Corrigendum Identifier',
    outerAccent: '#d97706',
    groups: [
      { label: 'Corrigendum', accent: '#d97706', comps: [
        { key: 'type', value: 'Cor', color: '#d97706' },
        { key: 'number', value: '1', color: '#dc2626' },
        { key: 'year', value: '2017', color: '#d97706' },
      ]},
      { label: 'Amendment', accent: '#0d9488', comps: [
        { key: 'type', value: 'Amd', color: '#0d9488' },
        { key: 'number', value: '3', color: '#dc2626' },
        { key: 'year', value: '2016', color: '#d97706' },
      ]},
      { label: 'Int\'l Standard', accent: '#2978a1', comps: [
        { key: 'publisher', value: 'ISO', color: '#2978a1' },
        { key: 'copublisher', value: 'IEC', color: '#da9d76' },
        { key: 'number', value: '13818', color: '#dc2626' },
        { key: 'part', value: '1', color: '#059669' },
        { key: 'year', value: '2015', color: '#d97706' },
      ]},
    ],
  },
  {
    key: 'adoption',
    label: 'Adoption',
    input: 'BS EN ISO 9001:2015',
    urn: 'urn:bsi:std:bs-en-iso:9001:2015',
    description: 'A national body adopts a European Norm, which itself adopts an international standard — three layers of identifier composition.',
    outerLabel: 'Adopted Standard',
    outerAccent: '#2978a1',
    groups: [
      { label: 'British Standard', accent: '#2978a1', comps: [
        { key: 'publisher', value: 'BS', color: '#2978a1' },
      ]},
      { label: 'European Norm', accent: '#da9d76', comps: [
        { key: 'norm', value: 'EN', color: '#da9d76' },
      ]},
      { label: 'Int\'l Standard', accent: '#059669', comps: [
        { key: 'publisher', value: 'ISO', color: '#059669' },
        { key: 'number', value: '9001', color: '#dc2626' },
        { key: 'year', value: '2015', color: '#d97706' },
      ]},
    ],
  },
]

const active = ref(modes[1])
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-1.5 mb-4">
      <button
        v-for="m in modes"
        :key="m.key"
        :class="[
          'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          active.key === m.key
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-bg-raised)] text-[var(--color-text-2)] hover:text-[var(--color-text)]',
        ]"
        @click="active = m"
      >
        {{ m.label }}
      </button>
    </div>

    <Transition name="arch" mode="out-in">
      <div :key="active.key" class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)]">{{ active.outerLabel }}</div>
            <code class="font-mono text-base font-semibold">{{ active.input }}</code>
          </div>
        </div>

        <div class="space-y-3 mb-4">
          <div
            v-for="(group, gi) in active.groups"
            :key="gi"
            class="p-3 rounded-md border-l-2"
            :style="{ borderColor: group.accent, background: group.accent + '0a', marginLeft: (gi * 12) + 'px' }"
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
        </div>

        <p class="text-sm text-[var(--color-text-2)] mb-3">{{ active.description }}</p>

        <div class="pt-3 border-t border-[var(--color-border-subtle)]">
          <div class="text-[0.65rem] uppercase tracking-wide text-[var(--color-text-3)] mb-1">URN</div>
          <code class="font-mono text-xs text-[var(--color-accent)] break-all">{{ active.urn }}</code>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.arch-enter-active, .arch-leave-active { transition: opacity 250ms ease, transform 250ms ease; }
.arch-enter-from { opacity: 0; transform: translateY(8px); }
.arch-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
