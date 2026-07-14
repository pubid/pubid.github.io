<script setup lang="ts">
import { ref, computed } from 'vue'
import { publishers } from '~/data'
import { categoryLabels, type Category } from '~/data'

const search = ref('')
const activeCategory = ref<Category | 'all'>('all')

const filtered = computed(() => {
  let result = publishers
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.fullName.toLowerCase().includes(q) ||
      p.flavor.toLowerCase().includes(q)
    )
  }
  return result
})

const categories: (Category | 'all')[] = ['all', 'international', 'regional', 'national', 'industry']
const categoryNames: Record<string, string> = {
  all: 'All',
  ...categoryLabels,
}
</script>

<template>
  <div>
    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ active: activeCategory === cat }"
        class="tab-btn"
        @click="activeCategory = cat"
      >
        {{ categoryNames[cat] }}
      </button>
    </div>

    <div class="search-bar">
      <span class="search-icon">&#x1F50D;</span>
      <input v-model="search" placeholder="Search publishers..." />
    </div>

    <div class="publishers-grid">
      <a v-for="p in filtered" :key="p.flavor" :href="'/publishers/' + p.flavor" class="publisher-card">
        <div class="publisher-card-header">
          <img v-if="p.logo" :src="p.logo" :alt="p.name + ' logo'" class="publisher-logo" />
          <div v-else class="publisher-initials">{{ p.name.slice(0, 2) }}</div>
          <h4>{{ p.name }}</h4>
        </div>
        <p class="full-name">{{ p.fullName }}</p>
        <div class="meta">
          <span class="badge" :class="p.category">{{ categoryLabels[p.category] }}</span>
          <span class="badge count">{{ p.docTypes.length }} types</span>
        </div>
      </a>
    </div>

    <p v-if="filtered.length === 0" style="text-align:center;color:var(--vp-c-text-3);padding:2rem;">
      No publishers found matching your criteria.
    </p>
  </div>
</template>
