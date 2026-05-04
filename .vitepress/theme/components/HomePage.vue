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
    type: 'International Standard',
    components: [c('publisher', 'ISO', '#4590cd'), c('number', '9001', '#f87171'), c('year', '2015', '#fbbf24')],
    groups: [],
    urn: 'urn:iso:std:iso:9001:ed-5:en'
  },
  {
    input: 'ISO/IEC 17031-1:2020/Amd 1:2022',
    publisher: 'ISO',
    type: 'Amendment Identifier',
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
    type: 'Standard',
    components: [c('publisher', 'IEEE', '#4590cd'), c('type', 'Std', '#059669'), c('number', '802.3', '#f87171'), c('year', '2018', '#fbbf24')],
    groups: [],
    urn: 'urn:ieee:std:802.3-2018'
  },
  {
    input: 'NIST SP 800-53 Rev. 5',
    publisher: 'NIST',
    type: 'Special Publication',
    components: [c('publisher', 'NIST', '#4590cd'), c('type', 'SP', '#059669'), c('number', '800-53', '#f87171'), c('revision', 'Rev. 5', '#d97706')],
    groups: [],
    urn: 'urn:nist:pub:sp:800-53:r5'
  },
  {
    input: 'IEC 61131-3:2013',
    publisher: 'IEC',
    type: 'International Standard',
    components: [c('publisher', 'IEC', '#4590cd'), c('number', '61131', '#f87171'), c('part', '3', '#34d399'), c('year', '2013', '#fbbf24')],
    groups: [],
    urn: 'urn:iec:std:iec:61131:-3:ed-3'
  },
  {
    input: 'BS EN ISO 9001:2015',
    publisher: 'BSI',
    type: 'Adopted Standard',
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
    type: 'Dual Published',
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
    type: 'European Standard',
    components: [c('publisher', 'ETSI', '#4590cd'), c('type', 'EN', '#059669'), c('number', '300 392-2', '#f87171'), c('version', 'V3.4.1', '#34d399')],
    groups: [],
    urn: 'urn:etsi:std:en:300_392-2:v3.4.1'
  },
  {
    input: 'ISO/DIS 45001',
    publisher: 'ISO',
    type: 'Draft International Standard',
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
    description: 'An amendment identifier contains an international standard identifier — the amendment carries its own type, number, and year, while the base standard remains intact inside it.',
    outerLabel: 'Amendment Identifier',
    outerAccent: '#2dd4bf',
    groups: [
      {
        label: 'Supplement',
        accent: '#2dd4bf',
        comps: [
          { key: 'type', value: 'Amd', color: '#2dd4bf' },
          { key: 'number', value: '1', color: '#f87171' },
          { key: 'year', value: '2022', color: '#fbbf24' },
        ]
      },
      {
        label: 'Base Identifier',
        accent: '#4590cd',
        comps: [
          { key: 'publisher', value: 'ISO', color: '#4590cd' },
          { key: 'copublisher', value: 'IEC', color: '#a78bfa' },
          { key: 'number', value: '17031', color: '#f87171' },
          { key: 'part', value: '1', color: '#34d399' },
          { key: 'year', value: '2020', color: '#fbbf24' },
        ]
      }
    ]
  },
  corrigendum: {
    input: 'ISO 9001:2015/Cor 1:2023',
    urn: 'urn:iso:std:iso:9001:ed-5:cor:1:v1',
    description: 'A corrigendum identifier contains the published standard — structurally identical to amendments but with a different supplement type.',
    outerLabel: 'Corrigendum Identifier',
    outerAccent: '#f59e0b',
    groups: [
      {
        label: 'Supplement',
        accent: '#f59e0b',
        comps: [
          { key: 'type', value: 'Cor', color: '#f59e0b' },
          { key: 'number', value: '1', color: '#f87171' },
          { key: 'year', value: '2023', color: '#fbbf24' },
        ]
      },
      {
        label: 'Base Identifier',
        accent: '#4590cd',
        comps: [
          { key: 'publisher', value: 'ISO', color: '#4590cd' },
          { key: 'number', value: '9001', color: '#f87171' },
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
              <span class="demo-pub-badge">{{ demoResult.publisher }}</span>
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
        <a href="/playground" class="btn btn-primary">Try Playground</a>
        <a href="#anatomy" class="btn btn-ghost">How It Works</a>
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

  <!-- Anatomy (merged into hero demo) -->
  <div id="anatomy" class="page-section animate-in">
    <div class="section-inner">
      <div class="section-kicker">Anatomy</div>
      <h2 class="section-heading">What is a PubID?</h2>
      <p class="section-sub">
        Every standards document identifier decomposes into structured, machine-readable components.
        Try the examples above, or explore the composition patterns below.
      </p>
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
        <div class="arch-outer" :style="{ '--arch-accent': currentArch.outerAccent }">
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
        Start parsing identifiers in minutes with the Ruby gem, or explore the interactive playground.
      </p>
      <div class="hero-actions" style="justify-content:center;">
        <a href="/library/quick-start" class="btn btn-primary">Quick Start Guide</a>
        <a href="/playground" class="btn btn-ghost-light">Try the Playground</a>
      </div>
    </div>
  </div>
</template>
