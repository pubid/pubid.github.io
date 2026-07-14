<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Publisher, FlavorComponent } from '~/data'
import { getComponentMeta } from '~/data'

const props = defineProps<{ publisher: Publisher }>()
const p = computed(() => props.publisher)

const expandedTypes = ref<Set<string>>(new Set())

function toggleType(key: string) {
  const s = new Set(expandedTypes.value)
  if (s.has(key)) s.delete(key)
  else s.add(key)
  expandedTypes.value = s
}

function isExpanded(key: string) {
  return expandedTypes.value.has(key)
}

const allExpanded = computed(() => expandedTypes.value.size === p.value.docTypes.length)

function toggleAll() {
  if (allExpanded.value) {
    expandedTypes.value = new Set()
  } else {
    expandedTypes.value = new Set(p.value.docTypes.map(dt => dt.key))
  }
}

const hasRelated = computed(() => p.value.relatedFlavors && p.value.relatedFlavors.length > 0)
const hasStages = computed(() => p.value.stages && p.value.stages.length > 0)
const hasStyles = computed(() => p.value.styles && p.value.styles.length > 0)
const hasAlgebra = computed(() => p.value.algebra.length > 0)

function enrich(comp: FlavorComponent) {
  const meta = getComponentMeta(p.value.flavor, comp.name)
  return { ...comp, ...meta }
}

const dataTypeLabel: Record<string, string> = {
  enum: 'Enumeration',
  integer: 'Integer',
  string: 'String',
  year: 'Year',
  compound: 'Compound',
}
</script>

<template>
  <div class="flavor-page">
    <!-- Hero -->
    <div class="flavor-hero">
      <div class="flavor-hero-top">
        <div v-if="p.logos && p.logos.length > 1" class="flavor-hero-logos">
          <img v-for="(logo, i) in p.logos" :key="i" :src="logo" :alt="p.name + ' logo'" class="flavor-hero-logo" />
        </div>
        <img v-else-if="p.logo" :src="p.logo" :alt="p.name + ' logo'" class="flavor-hero-logo" />
        <div v-else class="flavor-hero-icon">{{ p.name.slice(0, 2) }}</div>
        <div class="flavor-hero-text">
          <h1>{{ p.name }}</h1>
          <p class="full-name">{{ p.fullName }}</p>
        </div>
      </div>
      <p class="flavor-hero-desc">{{ p.description }}</p>
      <div class="flavor-hero-meta">
        
        <span class="badge" :class="p.category">{{ p.category.charAt(0).toUpperCase() + p.category.slice(1) }}</span>
        <span v-if="p.syntaxNotes" class="syntax-block">
          <span class="label">Syntax</span>
          {{ p.syntaxNotes }}
        </span>
        <a v-if="p.website" :href="p.website" target="_blank" rel="noopener" class="related-link" style="font-size:0.82rem;">
          Website <span class="link-arrow">&rarr;</span>
        </a>
      </div>
    </div>

    <!-- Stats -->
    <div class="flavor-stats">
      <div class="stat-card">
        <div class="stat-number">{{ p.docTypes.length }}</div>
        <div class="stat-label">Doc Types</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ p.components.length }}</div>
        <div class="stat-label">Components</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ p.algebra.length }}</div>
        <div class="stat-label">Relations</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ p.stages?.length || 0 }}</div>
        <div class="stat-label">Stages</div>
      </div>
    </div>

    <!-- Section Nav -->
    <nav class="flavor-nav">
      <a href="#document-types">Document Types</a>
      <a href="#components">Components</a>
      <a v-if="hasStyles" href="#styles">Styles</a>
      <a v-if="hasAlgebra" href="#algebra">Algebra</a>
      <a v-if="hasStages" href="#stages">Stages</a>
      <a v-if="hasRelated" href="#related">Related</a>
    </nav>

    <!-- Document Types -->
    <div class="flavor-section" id="document-types">
      <h2>
        Document Types
        <span class="section-count">{{ p.docTypes.length }}</span>
        <button @click="toggleAll" style="margin-left:auto;font-size:0.78rem;color:var(--vp-c-text-3);background:none;border:1px solid var(--vp-c-divider);border-radius:6px;padding:3px 10px;cursor:pointer;">
          {{ allExpanded ? 'Collapse All' : 'Expand All' }}
        </button>
      </h2>

      <div class="doctype-grid">
        <div
          v-for="dt in p.docTypes"
          :key="dt.key"
          class="doctype-card"
          :class="{ expanded: isExpanded(dt.key) }"
        >
          <div class="doctype-card-header" @click="toggleType(dt.key)">
            <h3>
              <a :href="'/publishers/' + p.flavor + '/' + dt.key" class="doctyp-link" @click.stop>{{ dt.title }}</a>
            </h3>
            <div class="header-right">
              <span v-if="dt.abbr.length" class="abbrev-chip">{{ dt.abbr[0] }}</span>
              <span class="toggle-icon">{{ isExpanded(dt.key) ? '&#9650;' : '&#9660;' }}</span>
            </div>
          </div>

          <div v-if="isExpanded(dt.key)" class="doctype-card-body">
            <div v-if="dt.abbr.length > 1" class="doctype-abbrevs">
              <span v-for="a in dt.abbr" :key="a" class="abbrev-chip">{{ a }}</span>
            </div>
            <p class="doctype-desc">{{ dt.description }}</p>

            <div v-if="dt.examples.length > 0">
              <div class="examples-label">Examples</div>
              <div class="example-grid">
                <div v-for="(ex, i) in dt.examples" :key="i" class="example-row">
                  <span class="ex-input">{{ ex.input }}</span>
                  <span v-if="ex.output && ex.output !== ex.input" class="ex-arrow">&rarr;</span>
                  <span v-if="ex.output && ex.output !== ex.input" class="ex-output">{{ ex.output }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Components -->
    <div class="flavor-section" id="components">
      <h2>Components <span class="section-count">{{ p.components.length }}</span></h2>
      <p style="color:var(--vp-c-text-2);margin-bottom:1rem;font-size:0.92rem;">
        Structured elements that make up a {{ p.name }} identifier:
      </p>
      <div class="component-grid">
        <div v-for="(comp, idx) in p.components" :key="idx" class="component-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem;">
            <h5 style="margin:0;">{{ comp.name }}</h5>
            <span v-if="enrich(comp).dataType" class="badge" style="font-size:0.65rem;background:rgba(26,86,219,0.08);color:var(--pubid-primary);">
              {{ dataTypeLabel[enrich(comp).dataType!] || enrich(comp).dataType }}
            </span>
          </div>
          <p>{{ comp.description }}</p>
          <div v-if="enrich(comp).values && enrich(comp).values!.length > 0" class="comp-values">
            <span v-for="v in enrich(comp).values!.slice(0, 8)" :key="v" class="val-chip">{{ v }}</span>
            <span v-if="enrich(comp).values!.length > 8" class="val-chip" style="color:var(--vp-c-text-3);">
              +{{ enrich(comp).values!.length - 8 }} more
            </span>
          </div>
          <div v-if="enrich(comp).format" style="margin-top:0.3rem;font-size:0.78rem;color:var(--vp-c-text-3);">
            {{ enrich(comp).format }}
          </div>
          <div v-if="enrich(comp).example" class="comp-example">
            <span class="examples-label" style="margin:0;">e.g.</span>
            <code>{{ enrich(comp).example }}</code>
          </div>
          <span v-if="comp.attribute" class="attr-tag">:{{ comp.attribute }}</span>
        </div>
      </div>
    </div>

    <!-- Styles -->
    <div v-if="hasStyles" class="flavor-section" id="styles">
      <h2>Rendering Styles <span class="section-count">{{ p.styles!.length }}</span></h2>
      <p style="color:var(--vp-c-text-2);margin-bottom:1rem;font-size:0.92rem;">
        {{ p.name }} PubIDs can be rendered in multiple styles from a single set of data elements. All styles are fully interchangeable without information loss.
      </p>
      <div class="styles-grid">
        <div v-for="style in p.styles" :key="style.key" class="style-card">
          <div class="style-header">
            <h5>{{ style.name }}</h5>
            <span class="badge" style="font-size:0.65rem;background:rgba(5,150,105,0.08);color:#059669;">
              {{ style.key }}
            </span>
          </div>
          <p style="margin:0.25rem 0 0.5rem;color:var(--vp-c-text-2);font-size:0.85rem;">
            {{ style.description }}
          </p>
          <code class="style-example">{{ style.example }}</code>
        </div>
      </div>
    </div>

    <!-- Algebra -->
    <div v-if="hasAlgebra" class="flavor-section" id="algebra">
      <h2>PubID Algebra <span class="section-count">{{ p.algebra.length }}</span></h2>
      <p style="color:var(--vp-c-text-2);margin-bottom:1rem;font-size:0.92rem;">
        Relationships between {{ p.name }} identifiers:
      </p>
      <table class="algebra-table">
        <thead>
          <tr>
            <th>Relation</th>
            <th>Description</th>
            <th>Syntax</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rel, idx) in p.algebra" :key="idx">
            <td class="rel-type">{{ rel.type }}</td>
            <td class="rel-desc">{{ rel.description }}</td>
            <td><code>{{ rel.syntax }}</code></td>
            <td><code>{{ rel.example }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Stages -->
    <div v-if="hasStages" class="flavor-section" id="stages">
      <h2>Development Stages <span class="section-count">{{ p.stages!.length }}</span></h2>
      <p style="color:var(--vp-c-text-2);margin-bottom:1rem;font-size:0.92rem;">
        Lifecycle stages for {{ p.name }} documents:
      </p>
      <table class="stage-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Abbr</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stage, idx) in p.stages" :key="idx">
            <td><span class="stage-code">{{ stage.code }}</span></td>
            <td><span class="stage-abbr">{{ stage.abbr }}</span></td>
            <td>{{ stage.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Related -->
    <div v-if="hasRelated" class="flavor-section" id="related">
      <h2>Related Publishers</h2>
      <div class="related-links">
        <a
          v-for="related in p.relatedFlavors"
          :key="related"
          :href="'/publishers/' + related"
          class="related-link"
        >
          {{ related.toUpperCase() }}
          <span class="link-arrow">&rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>
