<script setup lang="ts">
import { ref, computed } from 'vue'

interface FormatExample {
  input: string
  publisher: string
  components: { key: string; value: string; color: string }[]
  outputs: { label: string; abbr: string; value: string; accent: string }[]
}

const examples: FormatExample[] = [
  {
    input: 'ISO 9001:2015',
    publisher: 'ISO',
    components: [
      { key: 'Publisher', value: 'ISO', color: '#4590cd' },
      { key: 'Number', value: '9001', color: '#e11d48' },
      { key: 'Year', value: '2015', color: '#d97706' },
      { key: 'Edition', value: '5', color: '#059669' },
    ],
    outputs: [
      { label: 'Human-Readable', abbr: 'PubID', value: 'ISO 9001:2015', accent: '#4590cd' },
      { label: 'Short', abbr: 'Short', value: 'ISO 9001', accent: '#059669' },
      { label: 'Machine-Readable', abbr: 'MR', value: 'ISO 9001:2015', accent: '#da9d76' },
      { label: 'URN', abbr: 'URN', value: 'urn:iso:std:iso:9001:ed-5:en', accent: '#d97706' },
      { label: 'JSON', abbr: 'JSON', value: '{"publisher":"ISO","number":"9001","year":2015}', accent: '#e11d48' },
    ],
  },
  {
    input: 'NIST SP 800-53 Rev. 5',
    publisher: 'NIST',
    components: [
      { key: 'Publisher', value: 'NIST', color: '#4590cd' },
      { key: 'Type', value: 'SP', color: '#059669' },
      { key: 'Number', value: '800-53', color: '#e11d48' },
      { key: 'Revision', value: '5', color: '#da9d76' },
    ],
    outputs: [
      { label: 'Full (Long)', abbr: 'Full', value: 'National Institute of Standards and Technology Special Publication 800-53 Revision 5', accent: '#4590cd' },
      { label: 'Abbreviated', abbr: 'Abbr', value: 'Natl. Inst. Stand. Technol. Spec. Publ. 800-53 Rev. 5', accent: '#059669' },
      { label: 'Short', abbr: 'Short', value: 'NIST SP 800-53 Rev. 5', accent: '#da9d76' },
      { label: 'Machine-Readable', abbr: 'MR', value: 'NIST.SP.800-53.r5', accent: '#d97706' },
      { label: 'URN', abbr: 'URN', value: 'urn:nist:pub:sp:800-53:r5', accent: '#e11d48' },
    ],
  },
  {
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    publisher: 'ISO/IEC',
    components: [
      { key: 'Publisher', value: 'ISO/IEC', color: '#4590cd' },
      { key: 'Number', value: '17031-1', color: '#e11d48' },
      { key: 'Year', value: '2020', color: '#d97706' },
      { key: 'Supplement', value: 'Amd 1:2022', color: '#0d9488' },
    ],
    outputs: [
      { label: 'Human-Readable', abbr: 'PubID', value: 'ISO/IEC 17031-1:2020/Amd 1:2022', accent: '#4590cd' },
      { label: 'Short', abbr: 'Short', value: 'ISO/IEC 17031-1/Amd 1', accent: '#059669' },
      { label: 'Machine-Readable', abbr: 'MR', value: 'ISO/IEC 17031-1:2020/Amd 1:2022', accent: '#da9d76' },
      { label: 'URN', abbr: 'URN', value: 'urn:iso:std:iso-iec:17031:-1:ed-1:amd:1:v1', accent: '#d97706' },
      { label: 'JSON', abbr: 'JSON', value: '{"base":{"publisher":"ISO","copublisher":"IEC",…},"supplement":{"type":"Amd",…}}', accent: '#e11d48' },
    ],
  },
]

const activeExample = ref(0)
const current = computed(() => examples[activeExample.value])
</script>

<template>
  <div class="fmt-diagram">
    <!-- Example selector -->
    <div class="fmt-tabs">
      <button
        v-for="(ex, i) in examples"
        :key="i"
        class="fmt-tab"
        :class="{ active: activeExample === i }"
        @click="activeExample = i"
      >
        {{ ex.publisher }}
      </button>
    </div>

    <!-- Input -->
    <div class="fmt-input-box">
      <span class="fmt-input-label">Input Identifier</span>
      <code class="fmt-input-code">{{ current.input }}</code>
    </div>

    <!-- Arrow down -->
    <div class="fmt-arrow-down">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
    </div>

    <!-- Parsed Components -->
    <div class="fmt-parsed-box">
      <span class="fmt-parsed-label">Parsed Components</span>
      <div class="fmt-comps">
        <span
          v-for="comp in current.components"
          :key="comp.key"
          class="fmt-comp"
          :style="{ '--comp-color': comp.color, background: comp.color + '0d', borderColor: comp.color + '25' }"
        >
          <span class="fmt-comp-key">{{ comp.key }}</span>
          <span class="fmt-comp-val">{{ comp.value }}</span>
        </span>
      </div>
    </div>

    <!-- Arrow fan out -->
    <div class="fmt-arrow-fan">
      <div class="fmt-fan-line" />
      <div class="fmt-fan-label">Lossless Rendering</div>
      <div class="fmt-fan-branches">
        <div v-for="n in current.outputs.length" :key="n" class="fmt-fan-branch" :style="{ '--branch-i': n, '--branch-total': current.outputs.length }" />
      </div>
    </div>

    <!-- Output formats -->
    <div class="fmt-outputs">
      <div
        v-for="out in current.outputs"
        :key="out.abbr"
        class="fmt-output-card"
        :style="{ '--out-accent': out.accent }"
      >
        <div class="fmt-output-head">
          <span class="fmt-output-abbr">{{ out.abbr }}</span>
          <span class="fmt-output-label">{{ out.label }}</span>
        </div>
        <code class="fmt-output-value">{{ out.value }}</code>
      </div>
    </div>

    <!-- Bidirectional note -->
    <div class="fmt-note">
      <span class="fmt-note-icon">&#8644;</span>
      All conversions are <strong>bidirectional</strong> &mdash; parse any output style and re-render in any other without information loss.
    </div>
  </div>
</template>
