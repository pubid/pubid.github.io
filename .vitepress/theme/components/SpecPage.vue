<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

const props = defineProps<{
  title: string
  description?: string
  sourceUrl?: string
}>()

const html = ref('')
const loading = ref(true)

// The child component that uses this will inject the HTML
defineExpose({ html })
</script>

<template>
  <div class="spec-page">
    <div class="spec-header">
      <div class="breadcrumb">
        <a href="/">PubID</a> &rsaquo;
        <a href="/specs/">Specifications</a> &rsaquo;
        {{ title }}
      </div>
      <h1>{{ title }}</h1>
      <p v-if="description" class="spec-desc">{{ description }}</p>
      <div v-if="sourceUrl" class="spec-meta">
        <a :href="sourceUrl" target="_blank" rel="noopener" class="source-link">
          View source <span class="link-arrow">&rarr;</span>
        </a>
      </div>
    </div>
    <div class="asciidoc-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.spec-header { margin-bottom: 2rem; }
.spec-header h1 { font-size: 2rem; margin: 0.5rem 0 0.25rem; letter-spacing: -0.02em; }
.spec-desc { color: var(--vp-c-text-2); font-size: 0.95rem; margin: 0.5rem 0 0; line-height: 1.6; }
.spec-meta { margin-top: 0.75rem; }
.source-link { font-size: 0.85rem; color: var(--vp-c-brand-1); text-decoration: none; }
.source-link:hover { text-decoration: underline; }
.breadcrumb { font-size: 0.82rem; color: var(--vp-c-text-3); }
.breadcrumb a { color: var(--vp-c-text-2); text-decoration: none; }
.breadcrumb a:hover { color: var(--vp-c-brand-1); }
</style>
