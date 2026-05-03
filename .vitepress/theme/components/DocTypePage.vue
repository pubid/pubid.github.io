<script setup lang="ts">
import { computed } from 'vue'
import type { Publisher, DocType, FlavorComponent } from '../../data/types'
import { getTypeSyntax } from '../../data/syntax-data'
import { getComponentMeta } from '../../data/component-data'

const props = defineProps<{
  publisher: Publisher
  docType: DocType
}>()

const p = computed(() => props.publisher)
const dt = computed(() => props.docType)

const typeSyntax = computed(() => getTypeSyntax(p.value.flavor, dt.value.key))

const dataTypeLabel: Record<string, string> = {
  enum: 'Enumeration',
  integer: 'Integer',
  string: 'String',
  year: 'Year',
  compound: 'Compound',
}

function enrich(comp: FlavorComponent) {
  const meta = getComponentMeta(p.value.flavor, comp.name)
  return { ...comp, ...meta }
}
</script>

<template>
  <div class="doctype-page">
    <div class="doctype-page-hero">
      <div class="breadcrumb">
        <a href="/publishers/">Publishers</a> &rsaquo;
        <a :href="'/publishers/' + p.flavor">{{ p.name }}</a> &rsaquo;
        {{ dt.title }}
      </div>
      <h1>{{ dt.title }}</h1>
      <div class="doctype-meta">
        <span class="badge" :class="p.category">{{ p.category.charAt(0).toUpperCase() + p.category.slice(1) }}</span>
        <span v-for="a in dt.abbr" :key="a" class="abbrev-chip">{{ a }}</span>
      </div>
    </div>

    <!-- Description -->
    <div style="margin-bottom:2rem;">
      <h2 id="description">Description</h2>
      <p style="color:var(--vp-c-text-2);line-height:1.7;font-size:0.95rem;">{{ dt.description }}</p>
      <div v-if="typeSyntax && typeSyntax.length > 0" class="syntax-list">
        <div v-for="s in typeSyntax" :key="s.label" class="syntax-row">
          <span class="syntax-label">{{ s.label }}</span>
          <code class="syntax-pattern">{{ s.pattern }}</code>
        </div>
      </div>
      <div v-else-if="p.syntaxNotes" class="syntax-block">
        <span class="label">Publisher Syntax</span>
        {{ p.syntaxNotes }}
      </div>
    </div>

    <!-- Examples -->
    <div style="margin-bottom:2rem;">
      <h2 id="examples">Examples <span class="section-count">{{ dt.examples.length }}</span></h2>
      <div v-if="dt.examples.length > 0" class="example-grid">
        <div v-for="(ex, i) in dt.examples" :key="i" class="example-row">
          <span class="ex-input">{{ ex.input }}</span>
          <span v-if="ex.output && ex.output !== ex.input" class="ex-arrow">&rarr;</span>
          <span v-if="ex.output && ex.output !== ex.input" class="ex-output">{{ ex.output }}</span>
        </div>
      </div>
      <p v-else style="color:var(--vp-c-text-3);font-style:italic;">No examples available yet.</p>
    </div>

    <!-- Components used -->
    <div style="margin-bottom:2rem;">
      <h2 id="components">Components Used</h2>
      <p style="color:var(--vp-c-text-2);margin-bottom:1rem;font-size:0.92rem;">
        {{ p.name }} {{ dt.title }} identifiers are composed of these elements:
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

    <!-- Algebra -->
    <div v-if="p.algebra.length > 0" style="margin-bottom:2rem;">
      <h2 id="algebra">Algebraic Relations</h2>
      <p style="color:var(--vp-c-text-2);margin-bottom:1rem;font-size:0.92rem;">
        Relations that can involve {{ dt.title }} identifiers:
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

    <!-- Stages (if applicable) -->
    <div v-if="p.stages && p.stages.length > 0" style="margin-bottom:2rem;">
      <h2 id="stages">Development Stages</h2>
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

    <!-- URN -->
    <div v-if="p.urnPattern" style="margin-bottom:2rem;">
      <h2 id="urn">URN Mapping</h2>
      <div class="syntax-block">
        <span class="label">Pattern</span>
        {{ p.urnPattern }}
      </div>
    </div>

    <!-- Related -->
    <div style="margin-bottom:2rem;">
      <h2 id="see-also">See Also</h2>
      <div class="related-links">
        <a :href="'/publishers/' + p.flavor" class="related-link">
          All {{ p.name }} Types <span class="link-arrow">&rarr;</span>
        </a>
        <a
          v-for="related in p.relatedFlavors"
          :key="related"
          :href="'/publishers/' + related"
          class="related-link"
        >
          {{ related.toUpperCase() }} <span class="link-arrow">&rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>
