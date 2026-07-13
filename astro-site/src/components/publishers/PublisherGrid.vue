<script setup lang="ts">
import { ref, computed } from 'vue'
import { publishers, categoryLabels, type Category } from '~/data'

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
      <a
        v-for="p in filtered"
        :key="p.flavor"
        :href="'/publishers/' + p.flavor"
        class="group flex flex-col gap-3 p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors"
      >
        <div class="flex items-center gap-3">
          <img v-if="p.logo" :src="p.logo" :alt="p.name + ' logo'" class="h-10 w-10 object-contain" />
          <div v-else class="size-10 grid place-items-center rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-display font-semibold text-sm">
            {{ p.name.slice(0, 2) }}
          </div>
          <h4 class="font-display font-semibold text-base">{{ p.name }}</h4>
        </div>
        <p class="text-xs text-[var(--color-text-2)] line-clamp-2 flex-1">{{ p.fullName }}</p>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="chip" :class="p.category">{{ categoryLabels[p.category] }}</span>
          <span class="chip">{{ p.docTypes.length }} types</span>
        </div>
      </a>
    </div>

    <p v-if="filtered.length === 0" class="text-center text-[var(--color-text-3)] py-12">
      No publishers found matching your criteria.
    </p>
  </div>
</template>
