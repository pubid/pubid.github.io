<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Publisher, DocType } from '~/data/types'

const props = defineProps<{ publisher: Publisher }>()

const expanded = ref<Set<string>>(new Set())

function toggle(key: string) {
  const s = new Set(expanded.value)
  s.has(key) ? s.delete(key) : s.add(key)
  expanded.value = s
}

const allExpanded = computed(() => expanded.value.size === props.publisher.docTypes.length)

function toggleAll() {
  expanded.value = allExpanded.value
    ? new Set()
    : new Set(props.publisher.docTypes.map((d: DocType) => d.key))
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-display text-2xl font-semibold">
        Document Types
        <span class="ml-2 text-sm font-normal text-[var(--color-text-3)]">{{ publisher.docTypes.length }}</span>
      </h2>
      <button
        @click="toggleAll"
        class="text-xs px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
      >
        {{ allExpanded ? 'Collapse All' : 'Expand All' }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="dt in publisher.docTypes"
        :key="dt.key"
        class="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] overflow-hidden"
      >
        <div
          class="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--color-bg-inset)]"
          @click="toggle(dt.key)"
        >
          <h3 class="font-medium">
            <a
              :href="`/publishers/${publisher.flavor}/${dt.key}`"
              class="hover:text-[var(--color-accent)]"
              @click.stop
            >{{ dt.title }}</a>
          </h3>
          <div class="flex items-center gap-2">
            <span v-if="dt.abbr.length" class="chip">{{ dt.abbr[0] }}</span>
            <span class="text-[var(--color-text-3)] text-xs">{{ expanded.has(dt.key) ? '▲' : '▼' }}</span>
          </div>
        </div>

        <div v-if="expanded.has(dt.key)" class="px-4 pb-4 border-t border-[var(--color-border-subtle)] pt-3">
          <div v-if="dt.abbr.length > 1" class="flex flex-wrap gap-1.5 mb-2">
            <span v-for="a in dt.abbr" :key="a" class="chip">{{ a }}</span>
          </div>
          <p class="text-sm text-[var(--color-text-2)] mb-3">{{ dt.description }}</p>
          <div v-if="dt.examples.length > 0">
            <div class="text-xs uppercase tracking-wide text-[var(--color-text-3)] mb-1.5">Examples</div>
            <div class="space-y-1">
              <div v-for="(ex, i) in dt.examples" :key="i" class="flex items-center gap-2 text-sm">
                <code class="font-mono text-[var(--color-text)]">{{ ex.input }}</code>
                <template v-if="ex.output && ex.output !== ex.input">
                  <span class="text-[var(--color-text-3)]">→</span>
                  <code class="font-mono text-[var(--color-accent)]">{{ ex.output }}</code>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
