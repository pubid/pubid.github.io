<script setup lang="ts">
const props = defineProps<{
  html: string
}>()
</script>

<template>
  <div class="adoc-content" v-html="html" />
</template>
