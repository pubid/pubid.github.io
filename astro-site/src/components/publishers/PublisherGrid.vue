<script setup lang="ts">
import { ref, computed } from 'vue'
import { publishers, categoryLabels, type Category } from '~/data'
import PublisherCard from './PublisherCard.vue'

const search = ref('')
const activeCategory = ref<Category | 'all'>('all')

const filtered = computed(() => {
  let r = publishers
  if (activeCategory.value !== 'all') {
    r = r.filter(p => p.category === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    r = r.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.fullName.toLowerCase().includes(q) ||
      p.flavor.toLowerCase().includes(q),
    )
  }
  return r
})

const categories: (Category | 'all')[] = ['all', 'international', 'regional', 'national', 'industry']
const categoryNames: Record<string, string> = { all: 'All', ...categoryLabels }

function countFor(cat: Category | 'all'): number {
  if (cat === 'all') return publishers.length
  return publishers.filter(p => p.category === cat).length
}
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="[
          'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          activeCategory === cat
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-bg-raised)] text-[var(--color-text-2)] hover:text-[var(--color-text)]',
        ]"
        @click="activeCategory = cat"
      >
        {{ categoryNames[cat] }}
        <span class="ml-1.5 opacity-60">{{ countFor(cat) }}</span>
      </button>
    </div>

    <div class="relative mb-8">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)]" aria-hidden="true">🔍</span>
      <input
        v-model="search"
        placeholder="Search publishers..."
        class="w-full pl-10 pr-3 py-2.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-raised)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)] text-sm"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <PublisherCard v-for="p in filtered" :key="p.flavor" :publisher="p" />
    </div>

    <p v-if="filtered.length === 0" class="text-center text-[var(--color-text-3)] py-12">
      No publishers found matching your criteria.
    </p>
  </div>
</template>
