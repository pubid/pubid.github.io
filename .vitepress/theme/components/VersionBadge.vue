<script setup lang="ts">
import { getMetadata } from '../../data/loader'

const meta = getMetadata()

function formatDate(iso: string): string {
  try {
    return new Date(iso).toISOString().split('T')[0]
  } catch {
    return iso
  }
}
</script>

<template>
  <div class="version-badge" :title="`Exported from pubid-ruby v${meta.pubid_version} (${meta.git_branch}@${meta.git_commit}) at ${meta.exported_at}`">
    <span class="vb-icon">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0L0 3v10l8 3 8-3V3L8 0z" fill="currentColor" opacity="0.15"/>
        <path d="M8 1.2L1.2 3.8v8.4L8 14.8l6.8-2.6V3.8L8 1.2z" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.4"/>
        <path d="M5 7l2 2 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="vb-label">pubid-ruby</span>
    <span class="vb-version">v{{ meta.pubid_version }}</span>
    <span class="vb-sep">&middot;</span>
    <span class="vb-branch">{{ meta.git_branch }}</span>
    <span class="vb-sep">&middot;</span>
    <span class="vb-date">{{ formatDate(meta.exported_at) }}</span>
  </div>
</template>
