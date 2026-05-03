<script setup lang="ts">
import { ref, computed } from 'vue'

interface Component {
  key: string
  value: string
  color: string
}

interface Section {
  label: string
  componentType: string
  components: Component[]
}

interface ParseResult {
  input: string
  publisher: string
  type: string
  sections: Section[]
  urn: string
  json: Record<string, unknown>
}

const colorMap: Record<string, string> = {
  publisher: '#1a56db',
  copublisher: '#7c3aed',
  type: '#059669',
  number: '#e11d48',
  part: '#0d9488',
  year: '#d97706',
  edition: '#2563eb',
  stage: '#dc2626',
  typed_stage: '#dc2626',
  language: '#8b5cf6',
  supplement_type: '#0d9488',
  supplement_number: '#0d9488',
  supplement_year: '#0d9488',
  revision: '#d97706',
  version: '#059669',
  sector: '#1a56db',
  draft: '#dc2626',
  volume: '#7c3aed',
  classification: '#059669',
  adopted_publisher: '#1a56db',
  adopted_number: '#e11d48',
  adopted_year: '#d97706',
}

const c = (key: string, value: string): Component => ({ key, value, color: colorMap[key] || '#666' })

const precomputed: ParseResult[] = [
  {
    input: 'ISO 9001:2015',
    publisher: 'ISO',
    type: 'International Standard',
    sections: [
      { label: 'Base Identifier', componentType: 'International Standard', components: [
        c('publisher', 'ISO'),
        c('number', '9001'),
        c('year', '2015'),
      ]},
    ],
    urn: 'urn:iso:std:iso:9001:ed-5:en',
    json: { publisher: 'ISO', number: '9001', year: 2015, edition: 5 },
  },
  {
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    publisher: 'ISO',
    type: 'Amendment to International Standard',
    sections: [
      { label: 'Amendment Identifier', componentType: 'Amendment', components: [
        c('supplement_type', 'Amd'),
        c('supplement_number', '1'),
        c('supplement_year', '2022'),
      ]},
      { label: 'Base Identifier', componentType: 'International Standard', components: [
        c('publisher', 'ISO'),
        c('copublisher', 'IEC'),
        c('number', '17031'),
        c('part', '1'),
        c('year', '2020'),
      ]},
    ],
    urn: 'urn:iso:std:iso-iec:17031:-1:ed-1:amd:1:v1',
    json: { base: { publisher: 'ISO', copublisher: 'IEC', number: '17031', part: '1', year: 2020 }, supplement: { type: 'Amd', number: 1, year: 2022 } },
  },
  {
    input: 'IEC 61131-3:2013',
    publisher: 'IEC',
    type: 'International Standard',
    sections: [
      { label: 'Base Identifier', componentType: 'International Standard', components: [
        c('publisher', 'IEC'),
        c('number', '61131'),
        c('part', '3'),
        c('year', '2013'),
      ]},
    ],
    urn: 'urn:iec:std:iec:61131:-3:ed-3',
    json: { publisher: 'IEC', number: '61131', part: '3', year: 2013, edition: 3 },
  },
  {
    input: 'IEEE Std 802.3-2018',
    publisher: 'IEEE',
    type: 'Standard',
    sections: [
      { label: 'Base Identifier', componentType: 'Standard', components: [
        c('publisher', 'IEEE'),
        c('type', 'Std'),
        c('number', '802.3'),
        c('year', '2018'),
      ]},
    ],
    urn: 'urn:ieee:std:802.3-2018',
    json: { publisher: 'IEEE', type: 'Std', number: '802.3', year: 2018 },
  },
  {
    input: 'NIST SP 800-53 Rev. 5',
    publisher: 'NIST',
    type: 'Special Publication',
    sections: [
      { label: 'Base Identifier', componentType: 'Special Publication', components: [
        c('publisher', 'NIST'),
        c('type', 'SP'),
        c('number', '800-53'),
        c('revision', 'Rev. 5'),
      ]},
    ],
    urn: 'urn:nist:pub:sp:800-53:r5',
    json: { publisher: 'NIST', type: 'SP', number: '800-53', revision: 5 },
  },
  {
    input: 'BS ISO 9001:2015',
    publisher: 'BSI',
    type: 'Adopted International Standard',
    sections: [
      { label: 'Adoption Identifier', componentType: 'Adoption', components: [
        c('publisher', 'BS'),
      ]},
      { label: 'Adopted Identifier', componentType: 'International Standard', components: [
        c('adopted_publisher', 'ISO'),
        c('adopted_number', '9001'),
        c('adopted_year', '2015'),
      ]},
    ],
    urn: 'urn:bsi:std:bs-iso:9001:2015',
    json: { adopting_publisher: 'BS', adopted: { publisher: 'ISO', number: '9001', year: 2015 } },
  },
  {
    input: 'ETSI EN 300 392-2 V3.4.1 (2017-04)',
    publisher: 'ETSI',
    type: 'European Standard',
    sections: [
      { label: 'Base Identifier', componentType: 'European Standard', components: [
        c('publisher', 'ETSI'),
        c('type', 'EN'),
        c('number', '300 392-2'),
        c('version', 'V3.4.1'),
        c('year', '2017-04'),
      ]},
    ],
    urn: 'urn:etsi:std:en:300_392-2:v3.4.1',
    json: { publisher: 'ETSI', type: 'EN', number: '300 392-2', version: '3.4.1', date: '2017-04' },
  },
  {
    input: 'ITU-T G.992.1',
    publisher: 'ITU',
    type: 'Recommendation',
    sections: [
      { label: 'Base Identifier', componentType: 'Recommendation', components: [
        c('publisher', 'ITU'),
        c('sector', 'T'),
        c('number', 'G.992.1'),
      ]},
    ],
    urn: 'urn:itu:rec:g.992.1',
    json: { publisher: 'ITU', sector: 'T', number: 'G.992.1' },
  },
  {
    input: 'ISO/DIS 45001',
    publisher: 'ISO',
    type: 'Draft International Standard',
    sections: [
      { label: 'Base Identifier', componentType: 'Draft International Standard', components: [
        c('publisher', 'ISO'),
        c('stage', 'DIS'),
        c('number', '45001'),
      ]},
    ],
    urn: 'urn:iso:std:iso:45001:stage-40.00',
    json: { publisher: 'ISO', stage: 'DIS', number: '45001' },
  },
  {
    input: 'OIML R 76-1:2006',
    publisher: 'OIML',
    type: 'Recommendation',
    sections: [
      { label: 'Base Identifier', componentType: 'Recommendation', components: [
        c('publisher', 'OIML'),
        c('type', 'R'),
        c('number', '76'),
        c('part', '1'),
        c('year', '2006'),
      ]},
    ],
    urn: 'urn:oiml:pub:r:76-1:2006',
    json: { publisher: 'OIML', type: 'R', number: '76', part: '1', year: 2006 },
  },
  {
    input: 'JIS B 0205-2:2019',
    publisher: 'JIS',
    type: 'Japanese Industrial Standard',
    sections: [
      { label: 'Base Identifier', componentType: 'Japanese Industrial Standard', components: [
        c('publisher', 'JIS'),
        c('classification', 'B'),
        c('number', '0205'),
        c('part', '2'),
        c('year', '2019'),
      ]},
    ],
    urn: 'urn:jis:std:b:0205-2:2019',
    json: { publisher: 'JIS', classification: 'B', number: '0205', part: '2', year: 2019 },
  },
  {
    input: 'ASTM C33/C33M-18',
    publisher: 'ASTM',
    type: 'Standard Specification',
    sections: [
      { label: 'Base Identifier', componentType: 'Standard Specification', components: [
        c('publisher', 'ASTM'),
        c('number', 'C33/C33M'),
        c('year', '2018'),
      ]},
    ],
    urn: 'urn:astm:std:c33-c33m:2018',
    json: { publisher: 'ASTM', number: 'C33/C33M', year: 2018 },
  },
]

const inputValue = ref('ISO 9001:2015')
const activeTab = ref<'structure' | 'urn' | 'json'>('structure')
const copyFeedback = ref('')

const result = computed(() => {
  const q = inputValue.value.trim()
  return precomputed.find(r => r.input === q) || null
})

const matchedExamples = computed(() =>
  precomputed.filter(r =>
    r.input.toLowerCase().includes(inputValue.value.toLowerCase()) ||
    r.publisher.toLowerCase().includes(inputValue.value.toLowerCase())
  )
)

function setInput(val: string) {
  inputValue.value = val
}

function getOutputText(): string {
  if (!result.value) return ''
  if (activeTab.value === 'structure') {
    return result.value.sections.map(s => s.label + ':\n' + s.components.map(c => '  ' + c.key.replace(/_/g, ' ') + ': ' + c.value).join('\n')).join('\n\n')
  } else if (activeTab.value === 'urn') {
    return result.value.urn
  } else {
    return JSON.stringify(result.value.json, null, 2)
  }
}

async function copyOutput() {
  try {
    await navigator.clipboard.writeText(getOutputText())
    copyFeedback.value = 'Copied!'
    setTimeout(() => { copyFeedback.value = '' }, 1500)
  } catch {
    copyFeedback.value = 'Failed'
    setTimeout(() => { copyFeedback.value = '' }, 1500)
  }
}
</script>

<template>
  <div class="playground-container">
    <div class="playground-input-area">
      <input
        v-model="inputValue"
        class="playground-input"
        placeholder="Enter a PubID to parse (e.g. ISO 9001:2015)"
        spellcheck="false"
        autocomplete="off"
      />
      <div class="example-chips">
        <button
          v-for="ex in precomputed"
          :key="ex.input"
          class="example-chip-btn"
          :class="{ active: inputValue === ex.input }"
          @click="setInput(ex.input)"
        >
          {{ ex.input.length > 30 ? ex.input.slice(0, 27) + '...' : ex.input }}
        </button>
      </div>
    </div>

    <div v-if="result" class="result-panel">
      <div class="result-panel-header">
        <h4>{{ result.type }}</h4>
        <span class="badge" style="font-size:0.72rem;">{{ result.publisher }}</span>
      </div>
      <div class="result-panel-body">
        <!-- Hierarchical Component Breakdown -->
        <div class="component-breakdown">
          <div
            v-for="(section, si) in result.sections"
            :key="si"
            class="component-section"
            :class="{ 'section-wrapper': section.componentType === 'Amendment' || section.componentType === 'Corrigendum', 'section-adoption': section.componentType === 'Adoption' }"
          >
            <div class="section-label">
              <span class="section-label-text">{{ section.label }}</span>
              <span class="section-type-badge">{{ section.componentType }}</span>
            </div>
            <div class="section-components">
              <span
                v-for="comp in section.components"
                :key="comp.key"
                class="comp-chip"
                :style="{ background: comp.color + '14', color: comp.color, border: '1px solid ' + comp.color + '30' }"
              >
                <span class="chip-key">{{ comp.key.replace('adopted_', '').replace('supplement_', '') }}</span>
                {{ comp.value }}
              </span>
            </div>
          </div>
        </div>

        <!-- Output Tabs -->
        <div class="result-tabs">
          <button class="result-tab" :class="{ active: activeTab === 'structure' }" @click="activeTab = 'structure'">Structure</button>
          <button class="result-tab" :class="{ active: activeTab === 'urn' }" @click="activeTab = 'urn'">URN</button>
          <button class="result-tab" :class="{ active: activeTab === 'json' }" @click="activeTab = 'json'">JSON</button>
        </div>

        <div class="result-output" style="position:relative;">
          <button class="copy-btn" @click="copyOutput">{{ copyFeedback || 'Copy' }}</button>
          <template v-if="activeTab === 'structure'">{{ result.sections.map(s => s.label + ':\n' + s.components.map(c => '  ' + c.key.replace(/_/g, ' ') + ': ' + c.value).join('\n')).join('\n\n') }}</template>
          <template v-else-if="activeTab === 'urn'">{{ result.urn }}</template>
          <template v-else>{{ JSON.stringify(result.json, null, 2) }}</template>
        </div>
      </div>
    </div>

    <div v-else-if="inputValue.trim()" class="result-panel">
      <div class="no-result">
        <div class="icon">&#128270;</div>
        <p style="font-weight:600;margin:0 0 0.25rem;">No pre-computed result</p>
        <p style="font-size:0.85rem;margin:0;">
          Try one of the examples below, or use the <a href="/library/quick-start">Ruby library</a> to parse this identifier.
        </p>
        <div class="example-chips" style="margin-top:1rem;justify-content:center;">
          <button
            v-for="ex in matchedExamples.slice(0, 5)"
            :key="ex.input"
            class="example-chip-btn"
            @click="setInput(ex.input)"
          >
            {{ ex.input.length > 30 ? ex.input.slice(0, 27) + '...' : ex.input }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
