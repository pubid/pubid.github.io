<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { publishers } from '../../data/publishers'
import { categoryLabels, categoryOrder } from '../../data/types'
import { getMetadata } from '../../data/loader'
import VersionBadge from './VersionBadge.vue'

const meta = getMetadata()

const totalTypes = publishers.reduce((sum, p) => sum + p.docTypes.length, 0)

// ── Hero Demo ──────────────────────────────────────────────────
interface DemoComp { key: string; value: string; color: string }
interface DemoGroup { label: string; accent: string; comps: DemoComp[] }
interface DemoResult { input: string; publisher: string; type: string; components: DemoComp[]; groups: DemoGroup[]; urn: string }

const c = (key: string, value: string, color: string): DemoComp => ({ key, value, color })

const demoData: DemoResult[] = [
  {
    input: 'ISO 9001:2015',
    publisher: 'ISO',
    type: 'ISO · International Standard',
    components: [c('publisher', 'ISO', '#4590cd'), c('number', '9001', '#f87171'), c('year', '2015', '#fbbf24')],
    groups: [],
    urn: 'urn:iso:std:iso:9001:ed-5:en'
  },
  {
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    publisher: 'ISO',
    type: 'ISO · Amendment Identifier',
    components: [],
    groups: [
      { label: 'Amendment', accent: '#2dd4bf', comps: [c('type', 'Amd', '#2dd4bf'), c('number', '1', '#f87171'), c('year', '2022', '#fbbf24')] },
      { label: 'Int\'l Standard', accent: '#4590cd', comps: [c('publisher', 'ISO', '#4590cd'), c('copublisher', 'IEC', '#da9d76'), c('number', '17031', '#f87171'), c('part', '1', '#34d399'), c('year', '2020', '#fbbf24')] },
    ],
    urn: 'urn:iso:std:iso-iec:17031:-1:ed-1:amd:1:v1'
  },
  {
    input: 'IEEE Std 802.3-2018',
    publisher: 'IEEE',
    type: 'IEEE · Standard',
    components: [c('publisher', 'IEEE', '#4590cd'), c('type', 'Std', '#059669'), c('number', '802.3', '#f87171'), c('year', '2018', '#fbbf24')],
    groups: [],
    urn: 'urn:ieee:std:802.3-2018'
  },
  {
    input: 'NIST SP 800-53 Rev. 5',
    publisher: 'NIST',
    type: 'NIST · Special Publication',
    components: [c('publisher', 'NIST', '#4590cd'), c('type', 'SP', '#059669'), c('number', '800-53', '#f87171'), c('revision', 'Rev. 5', '#d97706')],
    groups: [],
    urn: 'urn:nist:pub:sp:800-53:r5'
  },
  {
    input: 'IEC 61131-3:2013',
    publisher: 'IEC',
    type: 'IEC · International Standard',
    components: [c('publisher', 'IEC', '#4590cd'), c('number', '61131', '#f87171'), c('part', '3', '#34d399'), c('year', '2013', '#fbbf24')],
    groups: [],
    urn: 'urn:iec:std:iec:61131:-3:ed-3'
  },
  {
    input: 'BS EN ISO 9001:2015',
    publisher: 'BSI',
    type: 'BSI · Adopted Standard',
    components: [],
    groups: [
      { label: 'British Standard', accent: '#4590cd', comps: [c('publisher', 'BS', '#4590cd')] },
      { label: 'European Norm', accent: '#da9d76', comps: [c('norm', 'EN', '#da9d76')] },
      { label: 'Int\'l Standard', accent: '#059669', comps: [c('publisher', 'ISO', '#059669'), c('number', '9001', '#f87171'), c('year', '2015', '#fbbf24')] },
    ],
    urn: ''
  },
  {
    input: 'IEC 60255-24 Ed. 2.0 2013-04 and IEEE Std C37.111-2013',
    publisher: 'IEC/IEEE',
    type: 'IEC/IEEE · Dual Published',
    components: [],
    groups: [
      { label: 'IEC Identifier', accent: '#da9d76', comps: [c('publisher', 'IEC', '#da9d76'), c('number', '60255-24', '#f87171'), c('edition', 'Ed. 2.0', '#059669'), c('date', '2013-04', '#fbbf24')] },
      { label: 'IEEE Identifier', accent: '#4590cd', comps: [c('publisher', 'IEEE', '#4590cd'), c('type', 'Std', '#059669'), c('number', 'C37.111', '#f87171'), c('year', '2013', '#fbbf24')] },
    ],
    urn: ''
  },
  {
    input: 'ETSI EN 300 392-2 V3.4.1',
    publisher: 'ETSI',
    type: 'ETSI · European Standard',
    components: [c('publisher', 'ETSI', '#4590cd'), c('type', 'EN', '#059669'), c('number', '300 392-2', '#f87171'), c('version', 'V3.4.1', '#34d399')],
    groups: [],
    urn: 'urn:etsi:std:en:300_392-2:v3.4.1'
  },
  {
    input: 'ISO/DIS 45001',
    publisher: 'ISO',
    type: 'ISO · Draft International Standard',
    components: [c('publisher', 'ISO', '#4590cd'), c('stage', 'DIS', '#dc2626'), c('number', '45001', '#f87171')],
    groups: [],
    urn: 'urn:iso:std:iso:45001:stage-40.00'
  },
]

const demoInput = ref('ISO 9001:2015')
const demoResult = computed(() => {
  const q = demoInput.value.trim()
  return demoData.find(r => r.input === q) || null
})

// ── Architecture Diagram ────────────────────────────────────────
interface ArchComp { key: string; value: string; color: string }
interface ArchGroup { label: string; accent: string; comps: ArchComp[] }
interface ArchData {
  input: string
  urn: string
  description: string
  outerLabel: string
  outerAccent: string
  nested?: boolean
  groups: ArchGroup[]
}

const archExample = ref('supplement')

const archData: Record<string, ArchData> = {
  simple: {
    input: 'ISO 9001:2015',
    urn: 'urn:iso:std:iso:9001:ed-5:en',
    description: 'A base identifier decomposes into typed components — publisher, number, and year — the fundamental building block.',
    outerLabel: 'International Standard',
    outerAccent: '#4590cd',
    groups: [{
      label: 'Base Identifier',
      accent: '#4590cd',
      comps: [
        { key: 'publisher', value: 'ISO', color: '#4590cd' },
        { key: 'number', value: '9001', color: '#f87171' },
        { key: 'year', value: '2015', color: '#fbbf24' },
      ]
    }]
  },
  supplement: {
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    urn: 'urn:iso:std:iso-iec:17031:-1:ed-1:amd:1:v1',
    description: 'An amendment identifier wraps an international standard identifier — the amendment carries its own type, number, and year, while the base standard remains intact inside it.',
    outerLabel: 'Amendment Identifier',
    outerAccent: '#2dd4bf',
    nested: true,
    groups: [
      {
        label: 'Amendment',
        accent: '#2dd4bf',
        comps: [
          { key: 'type', value: 'Amd', color: '#2dd4bf' },
          { key: 'number', value: '1', color: '#f87171' },
          { key: 'year', value: '2022', color: '#fbbf24' },
        ]
      },
      {
        label: 'Int\'l Standard',
        accent: '#4590cd',
        comps: [
          { key: 'publisher', value: 'ISO', color: '#4590cd' },
          { key: 'copublisher', value: 'IEC', color: '#da9d76' },
          { key: 'number', value: '17031', color: '#f87171' },
          { key: 'part', value: '1', color: '#34d399' },
          { key: 'year', value: '2020', color: '#fbbf24' },
        ]
      }
    ]
  },
  corrigendum: {
    input: 'ISO/IEC 13818-1:2015/Amd 3:2016/Cor 1:2017',
    urn: 'urn:iso:std:iso-iec:13818:-1:amd:2016:v3:cor:2017:v1',
    description: 'A corrigendum wraps an amendment, which wraps the base standard — three levels of nesting.',
    outerLabel: 'Corrigendum Identifier',
    outerAccent: '#f59e0b',
    nested: true,
    groups: [
      {
        label: 'Corrigendum',
        accent: '#f59e0b',
        comps: [
          { key: 'type', value: 'Cor', color: '#f59e0b' },
          { key: 'number', value: '1', color: '#f87171' },
          { key: 'year', value: '2017', color: '#fbbf24' },
        ]
      },
      {
        label: 'Amendment',
        accent: '#2dd4bf',
        comps: [
          { key: 'type', value: 'Amd', color: '#2dd4bf' },
          { key: 'number', value: '3', color: '#f87171' },
          { key: 'year', value: '2016', color: '#fbbf24' },
        ]
      },
      {
        label: 'Int\'l Standard',
        accent: '#4590cd',
        comps: [
          { key: 'publisher', value: 'ISO', color: '#4590cd' },
          { key: 'copublisher', value: 'IEC', color: '#da9d76' },
          { key: 'number', value: '13818', color: '#f87171' },
          { key: 'part', value: '1', color: '#34d399' },
          { key: 'year', value: '2015', color: '#fbbf24' },
        ]
      }
    ]
  },
  adoption: {
    input: 'BS EN ISO 9001:2015',
    urn: 'urn:bsi:std:bs-en-iso:9001:2015',
    description: 'A national body adopts a European Norm, which itself adopts an international standard — three layers of identifier composition.',
    outerLabel: 'Adopted Standard',
    outerAccent: '#4590cd',
    nested: true,
    groups: [
      {
        label: 'British Standard',
        accent: '#4590cd',
        comps: [
          { key: 'publisher', value: 'BS', color: '#4590cd' },
        ]
      },
      {
        label: 'European Norm',
        accent: '#da9d76',
        comps: [
          { key: 'norm', value: 'EN', color: '#da9d76' },
        ]
      },
      {
        label: 'Int\'l Standard',
        accent: '#059669',
        comps: [
          { key: 'publisher', value: 'ISO', color: '#059669' },
          { key: 'number', value: '9001', color: '#f87171' },
          { key: 'year', value: '2015', color: '#fbbf24' },
        ]
      }
    ]
  }
}

const currentArch = computed(() => archData[archExample.value])

// ── Publisher Filter ───────────────────────────────────────────
const activeCategory = ref('all')
const filteredPublishers = computed(() => {
  if (activeCategory.value === 'all') return publishers
  return publishers.filter(p => p.category === activeCategory.value)
})

// ── Scroll Animations ──────────────────────────────────────────
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.06, rootMargin: '0px 0px -50px 0px' }
  )
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el))
})
</script>

<template>
  <!-- Hero -->
  <div class="hero">
    <div class="hero-inner">
      <div class="hero-eyebrow">Open Standard</div>
      <h1 class="hero-title">
        Universal<br />
        <span class="hero-gradient">Publication Identifier</span>
      </h1>
      <p class="hero-sub">
        Parse, render, and exchange standards identifiers across {{ publishers.length }}+ publishers
        with a shared metaschema. Machine-readable. Round-trippable. URN-mappable.
      </p>

      <!-- Inline Demo -->
      <div class="hero-demo">
        <div class="demo-input-row">
          <input
            v-model="demoInput"
            class="demo-input"
            placeholder="Type an identifier…"
            spellcheck="false"
            autocomplete="off"
          />
          <span v-if="demoResult" class="demo-status">
            <span class="status-dot"></span> parsed
          </span>
        </div>
        <div class="demo-chips">
          <button
            v-for="d in demoData"
            :key="d.input"
            class="demo-chip"
            :class="{ active: demoInput === d.input }"
            @click="demoInput = d.input"
          >
            {{ d.input.length > 26 ? d.input.slice(0, 23) + '…' : d.input }}
          </button>
        </div>
        <transition name="demo-fade" mode="out-in">
          <div v-if="demoResult" :key="demoResult.input" class="demo-result">
            <div class="demo-result-head">
              <span class="demo-type">{{ demoResult.type }}</span>
            </div>
            <div class="demo-comps">
              <template v-if="demoResult.groups.length">
                <div
                  v-for="(group, gi) in demoResult.groups"
                  :key="gi"
                  class="demo-group"
                  :style="{ '--group-accent': group.accent }"
                >
                  <div class="demo-group-label">{{ group.label }}</div>
                  <div class="demo-group-comps">
                    <span
                      v-for="comp in group.comps"
                      :key="comp.key + comp.value"
                      class="demo-comp"
                      :style="{ background: comp.color + '18', color: comp.color, border: '1px solid ' + comp.color + '30' }"
                    >
                      <span class="comp-label">{{ comp.key }}</span>
                      {{ comp.value }}
                    </span>
                  </div>
                </div>
              </template>
              <template v-else>
                <span
                  v-for="comp in demoResult.components"
                  :key="comp.key + comp.value"
                  class="demo-comp"
                  :style="{ background: comp.color + '18', color: comp.color, border: '1px solid ' + comp.color + '30' }"
                >
                  <span class="comp-label">{{ comp.key }}</span>
                  {{ comp.value }}
                </span>
              </template>
            </div>
            <div class="demo-urn-block">
              <div class="demo-urn-label">URN</div>
              <code class="demo-urn">{{ demoResult.urn }}</code>
            </div>
          </div>
        </transition>
      </div>

      <div class="hero-actions">
        <a href="#anatomy" class="btn btn-primary">How It Works</a>
        <a href="/library/quick-start" class="btn btn-ghost">Quick Start Guide</a>
        <a href="https://github.com/pubid" class="btn btn-ghost">GitHub</a>
      </div>
    </div>

    <!-- Marquee -->
    <div class="hero-marquee">
      <div class="marquee-track">
        <span class="mq-item">ISO 9001:2015</span><span class="mq-sep">/</span>
        <span class="mq-item">IEEE Std 802.3-2018</span><span class="mq-sep">/</span>
        <span class="mq-item">NIST SP 800-53 Rev. 5</span><span class="mq-sep">/</span>
        <span class="mq-item">IEC 61131-3:2013</span><span class="mq-sep">/</span>
        <span class="mq-item">BS EN ISO 9001:2015</span><span class="mq-sep">/</span>
        <span class="mq-item">ETSI EN 300 392-2 V3.4.1</span><span class="mq-sep">/</span>
        <span class="mq-item">IEC 60255-24 and IEEE Std C37.111-2013</span><span class="mq-sep">/</span>
        <span class="mq-item">ISO/IEC 17031-1:2020/Amd 1:2022</span><span class="mq-sep">/</span>
        <span class="mq-item">ISO 9001:2015</span><span class="mq-sep">/</span>
        <span class="mq-item">IEEE Std 802.3-2018</span><span class="mq-sep">/</span>
        <span class="mq-item">NIST SP 800-53 Rev. 5</span><span class="mq-sep">/</span>
        <span class="mq-item">IEC 61131-3:2013</span>
      </div>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats-strip">
    <div class="stats-inner">
      <div class="stat">
        <span class="stat-num">{{ publishers.length }}+</span>
        <span class="stat-lbl">Publishers</span>
      </div>
      <div class="stat">
        <span class="stat-num">{{ totalTypes }}</span>
        <span class="stat-lbl">Document Types</span>
      </div>
      <div class="stat">
        <span class="stat-num">1:1</span>
        <span class="stat-lbl">Round-Trip</span>
      </div>
      <div class="stat">
        <span class="stat-num">URN</span>
        <span class="stat-lbl">Canonical Form</span>
      </div>
    </div>
    <div style="text-align:center;margin-top:0.6rem;">
      <VersionBadge />
    </div>
  </div>

  <!-- Anatomy -->
  <div id="anatomy" class="page-section animate-in">
    <div class="section-inner">
      <div class="section-kicker">Anatomy</div>
      <h2 class="section-heading">What is a PubID?</h2>
      <p class="section-sub">
        Every standards document identifier decomposes into structured, machine-readable components.
        The same meaning can be rendered as a human-readable string, a URN, or structured JSON.
      </p>

      <div class="anatomy-breakdown">
        <div class="anatomy-identifier">
          <span class="anatomy-segment" style="--seg-color: #4590cd">ISO</span><span class="anatomy-sep">/</span>
          <span class="anatomy-segment" style="--seg-color: #059669">IEC</span><span class="anatomy-sep">&nbsp;</span>
          <span class="anatomy-segment" style="--seg-color: #f87171">17031</span><span class="anatomy-sep">-</span>
          <span class="anatomy-segment" style="--seg-color: #34d399">1</span><span class="anatomy-sep">:</span>
          <span class="anatomy-segment" style="--seg-color: #fbbf24">2020</span><span class="anatomy-sep">/</span>
          <span class="anatomy-segment" style="--seg-color: #2dd4bf">Amd</span><span class="anatomy-sep">&nbsp;</span>
          <span class="anatomy-segment" style="--seg-color: #2dd4bf">1</span><span class="anatomy-sep">:</span>
          <span class="anatomy-segment" style="--seg-color: #2dd4bf">2022</span>
        </div>

        <div class="anatomy-legend">
          <div class="anatomy-legend-item">
            <div class="anatomy-legend-chip" style="--seg-color: #4590cd">Publisher</div>
            <div class="anatomy-legend-desc">
              <strong>The issuing organization</strong> — ISO, IEC, IEEE, NIST, BSI, etc. Joint publications list multiple publishers separated by slashes.
            </div>
          </div>
          <div class="anatomy-legend-item">
            <div class="anatomy-legend-chip" style="--seg-color: #059669">Copublisher</div>
            <div class="anatomy-legend-desc">
              <strong>Jointly published with</strong> — a second publisher sharing responsibility. Written after the primary publisher, e.g. <code>ISO/IEC</code>, <code>IEC/IEEE</code>.
            </div>
          </div>
          <div class="anatomy-legend-item">
            <div class="anatomy-legend-chip" style="--seg-color: #dc2626">Stage</div>
            <div class="anatomy-legend-desc">
              <strong>Where in its lifecycle</strong> — WD (Working Draft), CD (Committee Draft), DIS (Draft International Standard), FDIS (Final Draft). Encodes development progress directly in the identifier.
            </div>
          </div>
          <div class="anatomy-legend-item">
            <div class="anatomy-legend-chip" style="--seg-color: #f87171">Number</div>
            <div class="anatomy-legend-desc">
              <strong>The unique numeric ID</strong> — assigned by the publisher. May include sub-parts (<code>800-53</code>), letter suffixes (<code>9001</code>), or prefixed sections (<code>JIS A 0001</code>).
            </div>
          </div>
          <div class="anatomy-legend-item">
            <div class="anatomy-legend-chip" style="--seg-color: #fbbf24">Year</div>
            <div class="anatomy-legend-desc">
              <strong>Publication or revision year</strong> — typically separated by a colon (<code>:2015</code>) or hyphen (<code>-2018</code> depending on publisher convention).
            </div>
          </div>
          <div class="anatomy-legend-item">
            <div class="anatomy-legend-chip" style="--seg-color: #2dd4bf">Supplement</div>
            <div class="anatomy-legend-desc">
              <strong>Amendment or Corrigendum</strong> — a supplement identifier <em>contains</em> the base identifier. <code>Amd 1:2023</code> wraps the base standard, adding its own number and year.
            </div>
          </div>
          <div class="anatomy-legend-item">
            <div class="anatomy-legend-chip" style="--seg-color: #34d399">Language</div>
            <div class="anatomy-legend-desc">
              <strong>Publication language</strong> — <code>en</code> (English), <code>fr</code> (French), <code>ru</code> (Russian), etc. Not all publishers include this.
            </div>
          </div>
        </div>
      </div>

      <div class="anatomy-mapping">
        <div class="anatomy-map-col">
          <div class="anatomy-map-label">Human-readable</div>
          <code class="anatomy-map-code">ISO/IEC 17031-1:2020/Amd 1:2022</code>
        </div>
        <div class="anatomy-map-arrow">&darr;</div>
        <div class="anatomy-map-col">
          <div class="anatomy-map-label">URN</div>
          <code class="anatomy-map-code anatomy-map-urn">urn:iso:std:iso-iec:17031:-1:amd:2022:v1</code>
        </div>
        <div class="anatomy-map-arrow">&darr;</div>
        <div class="anatomy-map-col">
          <div class="anatomy-map-label">Structured (PubID 2.0)</div>
          <code class="anatomy-map-code anatomy-map-json">Amendment(number: 1, year: 2022,
  base_identifier: InternationalStandard(
    publisher: ISO, copublishers: [IEC],
    number: 17031, part: 1, year: 2020
  )
)</code>
        </div>
      </div>

      <div class="anatomy-cta">
        <a href="/concepts/anatomy" class="btn btn-ghost">Full Anatomy Reference</a>
        <a href="/concepts/components" class="btn btn-ghost">Component Details</a>
      </div>
    </div>
  </div>

  <!-- How It Works -->
  <div class="page-section section-dark animate-in">
    <div class="section-inner">
      <div class="section-kicker">How It Works</div>
      <h2 class="section-heading">Three Steps</h2>
      <p class="section-sub">
        From free-form text to structured, machine-readable data — and back again.
      </p>

      <div class="flow-steps">
        <div class="flow-step">
          <div class="flow-marker">01</div>
          <h4>Parse</h4>
          <p>Input any standards identifier string — the parser recognizes publisher-specific grammar rules.</p>
          <div class="flow-code">
            <code>ISO 9001:2015</code>
          </div>
        </div>
        <div class="flow-connector"><span class="flow-arrow">&rarr;</span></div>
        <div class="flow-step">
          <div class="flow-marker">02</div>
          <h4>Structure</h4>
          <p>Decompose into typed components: publisher, number, year, part, stage, and more.</p>
          <div class="flow-code">
            <code>publisher: ISO<br/>number: 9001<br/>year: 2015</code>
          </div>
        </div>
        <div class="flow-connector"><span class="flow-arrow">&rarr;</span></div>
        <div class="flow-step">
          <div class="flow-marker">03</div>
          <h4>Output</h4>
          <p>Render as formatted PubID, canonical URN, or structured JSON — no data loss.</p>
          <div class="flow-code">
            <code>urn:iso:std:iso:9001:ed-5:en</code>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Architecture Diagram -->
  <div class="page-section animate-in">
    <div class="section-inner">
      <div class="section-kicker">Architecture</div>
      <h2 class="section-heading">Identifier Composition</h2>
      <p class="section-sub">
        Identifiers compose through algebraic relationships — an amendment identifier contains a base identifier, a corrigendum wraps a published standard, and adoptions layer publisher identities.
      </p>

      <div class="arch-input-display">
        <code class="arch-input-code">{{ currentArch.input }}</code>
      </div>

      <div class="arch-tabs">
        <button
          v-for="(data, key) in archData"
          :key="key"
          class="arch-tab"
          :class="{ active: archExample === key }"
          @click="archExample = key"
        >
          {{ data.outerLabel }}
        </button>
      </div>

      <p class="arch-desc">{{ currentArch.description }}</p>

      <div class="arch-diagram">
        <!-- Nested rendering: each box wraps the next -->
        <div v-if="currentArch.nested" class="arch-nested" :style="{ '--arch-accent': currentArch.outerAccent }">
          <!-- Outermost group -->
          <div class="arch-nest-box" :style="{ '--group-accent': currentArch.groups[0].accent }">
            <div class="arch-nest-label">{{ currentArch.groups[0].label }}</div>
            <div class="arch-nest-comps">
              <div
                v-for="comp in currentArch.groups[0].comps"
                :key="comp.key"
                class="arch-comp"
                :style="{ background: comp.color + '14', color: comp.color, borderColor: comp.color + '30' }"
              >
                <span class="arch-comp-key">{{ comp.key }}</span>
                <span class="arch-comp-val">{{ comp.value }}</span>
              </div>
            </div>
            <!-- Second level (wraps third if present) -->
            <div v-if="currentArch.groups[1]" class="arch-nest-box" :style="{ '--group-accent': currentArch.groups[1].accent }">
              <div class="arch-nest-label">{{ currentArch.groups[1].label }}</div>
              <div class="arch-nest-comps">
                <div
                  v-for="comp in currentArch.groups[1].comps"
                  :key="comp.key"
                  class="arch-comp"
                  :style="{ background: comp.color + '14', color: comp.color, borderColor: comp.color + '30' }"
                >
                  <span class="arch-comp-key">{{ comp.key }}</span>
                  <span class="arch-comp-val">{{ comp.value }}</span>
                </div>
              </div>
              <!-- Third level -->
              <div v-if="currentArch.groups[2]" class="arch-nest-box" :style="{ '--group-accent': currentArch.groups[2].accent }">
                <div class="arch-nest-label">{{ currentArch.groups[2].label }}</div>
                <div class="arch-nest-comps">
                  <div
                    v-for="comp in currentArch.groups[2].comps"
                    :key="comp.key"
                    class="arch-comp"
                    :style="{ background: comp.color + '14', color: comp.color, borderColor: comp.color + '30' }"
                  >
                    <span class="arch-comp-key">{{ comp.key }}</span>
                    <span class="arch-comp-val">{{ comp.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Flat rendering for other types -->
        <div v-else class="arch-outer" :style="{ '--arch-accent': currentArch.outerAccent }">
          <div class="arch-outer-label">{{ currentArch.outerLabel }}</div>
          <div class="arch-groups">
            <div
              v-for="(g, gi) in currentArch.groups"
              :key="gi"
              class="arch-group"
              :style="{ '--group-accent': g.accent }"
            >
              <div class="arch-group-label">{{ g.label }}</div>
              <div class="arch-comps">
                <div
                  v-for="comp in g.comps"
                  :key="comp.key"
                  class="arch-comp"
                  :style="{ background: comp.color + '14', color: comp.color, borderColor: comp.color + '30' }"
                >
                  <span class="arch-comp-key">{{ comp.key }}</span>
                  <span class="arch-comp-val">{{ comp.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="arch-urn">
        <span class="arch-urn-label">URN</span>
        <code>{{ currentArch.urn }}</code>
      </div>
    </div>
  </div>

  <!-- Capabilities (Bento Grid) -->
  <div class="page-section animate-in">
    <div class="section-inner">
      <div class="section-kicker">Capabilities</div>
      <h2 class="section-heading">Why PubID?</h2>
      <p class="section-sub">
        A single, interoperable identifier system for the entire standards ecosystem.
      </p>

      <div class="bento-grid">
        <div class="bento-item bento-wide">
          <div class="bento-num">01</div>
          <h4>Machine-Readable</h4>
          <p>Parse any identifier into structured components — publisher, type, number, year, stage, and more. Transform free-form text into typed data that machines understand.</p>
        </div>
        <div class="bento-item">
          <div class="bento-num">02</div>
          <h4>Round-Trip Fidelity</h4>
          <p>Parse and re-render to get identical output. No information is lost in the transformation.</p>
        </div>
        <div class="bento-item">
          <div class="bento-num">03</div>
          <h4>Shared Metaschema</h4>
          <p>Each publisher defines their schema using a shared metaschema — not a one-size-fits-all format.</p>
        </div>
        <div class="bento-item bento-wide">
          <div class="bento-num">04</div>
          <h4>{{ publishers.length }}+ Publishers</h4>
          <p>ISO, IEC, IEEE, NIST, BSI, CEN, ITU, ETSI, ASTM, JIS, and more — comprehensive coverage across international, regional, national, and industry standards.</p>
        </div>
        <div class="bento-item">
          <div class="bento-num">05</div>
          <h4>URN Mapping</h4>
          <p>Every PubID maps to a canonical URN for machine interchange and persistent linking.</p>
        </div>
        <div class="bento-item">
          <div class="bento-num">06</div>
          <h4>PubID Algebra</h4>
          <p>Model relationships: amendments, corrigenda, parts, bundles, and composite identifiers.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Publishers -->
  <div class="page-section section-dark animate-in">
    <div class="section-inner">
      <div class="section-kicker">Ecosystem</div>
      <h2 class="section-heading">Supported Publishers</h2>
      <p class="section-sub">
        International, regional, national, and industry standards — comprehensive coverage.
      </p>

      <div class="category-filter">
        <button class="filter-btn" :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">All</button>
        <button
          v-for="cat in categoryOrder"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ categoryLabels[cat] }}
        </button>
      </div>

      <div class="publishers">
        <a v-for="p in filteredPublishers" :key="p.flavor" :href="'/publishers/' + p.flavor" class="pub-card">
          <div class="pub-card-header">
            <img v-if="p.logo" :src="p.logo" :alt="p.name + ' logo'" class="pub-logo" />
            <div v-else class="pub-initials">{{ p.name.slice(0, 2) }}</div>
            <div class="pub-abbr">{{ p.name }}</div>
          </div>
          <div class="pub-full">{{ p.fullName }}</div>
          <div class="pub-meta">
            <span class="badge" :class="p.category">{{ categoryLabels[p.category] }}</span>
            <span class="pub-count">{{ p.docTypes.length }} types</span>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="page-section section-cta animate-in">
    <div class="section-inner" style="text-align:center;">
      <h2 class="section-heading">Get Started</h2>
      <p class="section-sub" style="margin-left:auto;margin-right:auto;">
        Start parsing identifiers in minutes with the Ruby gem, or browse supported publishers.
      </p>
      <div class="hero-actions" style="justify-content:center;">
        <a href="/library/quick-start" class="btn btn-primary">Quick Start Guide</a>
        <a href="/publishers/" class="btn btn-ghost-light">Browse Publishers</a>
      </div>
    </div>
  </div>
</template>
