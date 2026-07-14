<script setup lang="ts">
defineProps<{ author?: string; date?: string }>()
</script>

<template>
  <p class="blog-byline" v-if="date">
    {{ date }}<span v-if="author"> — {{ author }}</span>
  </p>
</template>

<style scoped>
.blog-byline {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}
</style>
