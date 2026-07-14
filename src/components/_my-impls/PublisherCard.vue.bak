<script setup lang="ts">
// PublisherCard.vue — single source of truth for publisher card markup.
// Used by:
//   - PublisherGrid.vue (interactive island, renders many cards)
//   - Astro pages (static render, no client directive = zero JS)
import type { Publisher } from '~/data/types'
import { categoryLabels } from '~/data/types'

defineProps<{ publisher: Publisher }>()
</script>

<template>
  <a
    :href="`/publishers/${publisher.flavor}`"
    class="group flex flex-col gap-3 p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors"
  >
    <div class="flex items-center gap-3">
      <img
        v-if="publisher.logo"
        :src="publisher.logo"
        :alt="`${publisher.name} logo`"
        class="h-10 w-10 object-contain"
      />
      <div
        v-else
        class="size-10 grid place-items-center rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-display font-semibold text-sm"
      >
        {{ publisher.name.slice(0, 2) }}
      </div>
      <h4 class="font-display font-semibold text-base">{{ publisher.name }}</h4>
    </div>
    <p class="text-xs text-[var(--color-text-2)] line-clamp-2 flex-1">{{ publisher.fullName }}</p>
    <div class="flex items-center gap-2 flex-wrap">
      <span class="chip">{{ categoryLabels[publisher.category] }}</span>
      <span class="chip">{{ publisher.docTypes.length }} types</span>
    </div>
  </a>
</template>
