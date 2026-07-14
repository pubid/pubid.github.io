<script setup lang="ts">
const examples = [
  { id: 'iso-std', input: 'ISO 9001:2015', label: 'ISO International Standard', parts: [
    { name: 'Publisher', value: 'ISO', color: '#1a56db' },
    { name: 'Number', value: '9001', color: '#e11d48' },
    { name: 'Year', value: '2015', color: '#d97706' },
  ]},
  { id: 'iso-iec-amd', input: 'ISO/IEC 17031-1:2020/Amd 1:2022', label: 'ISO/IEC with Amendment', parts: [
    { name: 'Publisher', value: 'ISO', color: '#1a56db' },
    { name: 'Copublisher', value: 'IEC', color: '#da9d76' },
    { name: 'Number', value: '17031', color: '#e11d48' },
    { name: 'Part', value: '1', color: '#059669' },
    { name: 'Year', value: '2020', color: '#d97706' },
    { name: 'Supplement', value: 'Amd 1:2022', color: '#0d9488' },
  ]},
  { id: 'ieee', input: 'IEEE Std 802.3-2018', label: 'IEEE Standard', parts: [
    { name: 'Publisher', value: 'IEEE', color: '#1a56db' },
    { name: 'Type', value: 'Std', color: '#059669' },
    { name: 'Number', value: '802.3', color: '#e11d48' },
    { name: 'Year', value: '2018', color: '#d97706' },
  ]},
  { id: 'nist', input: 'NIST SP 800-53 Rev. 5', label: 'NIST Special Publication', parts: [
    { name: 'Publisher', value: 'NIST', color: '#1a56db' },
    { name: 'Type', value: 'SP', color: '#059669' },
    { name: 'Number', value: '800-53', color: '#e11d48' },
    { name: 'Revision', value: 'Rev. 5', color: '#d97706' },
  ]},
]
</script>

<template>
  <div class="anatomy-section">
    <div v-for="ex in examples" :key="ex.id" style="margin-bottom:2rem;">
      <p style="font-weight:600;color:var(--vp-c-text-2);font-size:0.9rem;margin-bottom:0.5rem;">
        {{ ex.label }}
      </p>
      <div style="padding:1rem;background:var(--vp-c-bg-soft);border-radius:8px;margin-bottom:0.5rem;">
        <code style="font-size:1.1rem;font-weight:600;">{{ ex.input }}</code>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
        <span v-for="part in ex.parts" :key="part.name" class="component-chip"
              :style="{ background: part.color + '18', color: part.color, border: '1px solid ' + part.color + '30' }">
          <span class="chip-label">{{ part.name }}</span>
          {{ part.value }}
        </span>
      </div>
    </div>
  </div>
</template>
