// One-shot migration: splits publishers.ts into per-flavor modules with
// component metadata merged in (eliminating the parallel component-data.ts).
//
// Run: node scripts/migrate-data.mjs
// Source files live in src/data/_pre-refactor/ (the original flat .ts files)
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Dynamically import the TS data files via tsx-style loader.
// We use a build-time esbuild since plain node can't import .ts directly.
import { execSync } from 'node:child_process'

const tmp = join(ROOT, '.tmp-migrate')
await rm(tmp, { recursive: true, force: true })
await mkdir(tmp, { recursive: true })

// Compile TS → JS for the two data files using esbuild (already a dep of astro/vite)
const ESBUILD = `${ROOT}/node_modules/.bin/esbuild`
await Promise.all([
  execSync(`${ESBUILD} ${ROOT}/src/data/_pre-refactor/publishers.ts --bundle --format=esm --platform=node --outfile=${tmp}/publishers.mjs`),
  execSync(`${ESBUILD} ${ROOT}/src/data/_pre-refactor/component-data.ts --bundle --format=esm --platform=node --outfile=${tmp}/component-data.mjs`),
])

const { publishers } = await import(`file://${tmp}/publishers.mjs`)
const { getComponentMeta } = await import(`file://${tmp}/component-data.mjs`)

console.log(`Migrating ${publishers.length} publishers…`)

const flavorsDir = join(ROOT, 'src/data/flavors')
await rm(flavorsDir, { recursive: true, force: true })
await mkdir(flavorsDir, { recursive: true })

const escape = (s) => JSON.stringify(s)
const indent = (n) => '  '.repeat(n)

function renderExample(ex, depth) {
  const pad = indent(depth)
  if (ex.output && ex.output !== ex.input) {
    return `${pad}{ input: ${escape(ex.input)}, output: ${escape(ex.output)} }`
  }
  return `${pad}{ input: ${escape(ex.input)} }`
}

function renderDocType(dt, depth) {
  const pad = indent(depth)
  const lines = [
    `${pad}{`,
    `${pad}  key: ${escape(dt.key)},`,
    `${pad}  title: ${escape(dt.title)},`,
    `${pad}  abbr: [${dt.abbr.map(escape).join(', ')}],`,
    `${pad}  description: ${escape(dt.description)},`,
  ]
  if (dt.syntax) lines.push(`${pad}  syntax: ${escape(dt.syntax)},`)
  if (dt.examples.length > 0) {
    lines.push(`${pad}  examples: [`)
    for (const ex of dt.examples) lines.push(renderExample(ex, depth + 2) + ',')
    lines.push(`${pad}],`)
  } else {
    lines.push(`${pad}  examples: [],`)
  }
  lines.push(`${pad}}`)
  return lines.join('\n')
}

function renderComponent(c, depth) {
  const pad = indent(depth)
  const lines = [
    `${pad}{`,
    `${pad}  name: ${escape(c.name)},`,
    `${pad}  description: ${escape(c.description)},`,
  ]
  if (c.attribute) lines.push(`${pad}  attribute: ${escape(c.attribute)},`)
  if (c.dataType) lines.push(`${pad}  dataType: ${escape(c.dataType)},`)
  if (c.values && c.values.length > 0) {
    lines.push(`${pad}  values: [${c.values.map(escape).join(', ')}],`)
  }
  if (c.format) lines.push(`${pad}  format: ${escape(c.format)},`)
  if (c.example) lines.push(`${pad}  example: ${escape(c.example)},`)
  lines.push(`${pad}}`)
  return lines.join('\n')
}

function renderAlgebra(a, depth) {
  const pad = indent(depth)
  return [
    `${pad}{ type: ${escape(a.type)}, description: ${escape(a.description)}, syntax: ${escape(a.syntax)}, example: ${escape(a.example)} },`
  ].join('\n')
}

function renderPublisher(p) {
  // Merge component-data into the components array (SSOT)
  const mergedComponents = p.components.map(c => ({ ...c, ...getComponentMeta(p.flavor, c.name) }))

  const L = []
  L.push("import type { Publisher } from '../types'")
  L.push('')
  L.push(`export const ${p.flavor.replace(/-/g, '_')}: Publisher = {`)
  L.push(`  flavor: ${escape(p.flavor)},`)
  if (p.logo) L.push(`  logo: ${escape(p.logo)},`)
  if (p.logos) L.push(`  logos: [${p.logos.map(escape).join(', ')}],`)
  L.push(`  name: ${escape(p.name)},`)
  L.push(`  fullName: ${escape(p.fullName)},`)
  L.push(`  category: ${escape(p.category)},`)
  L.push(`  description: ${escape(p.description)},`)
  if (p.website) L.push(`  website: ${escape(p.website)},`)
  if (p.syntaxNotes) L.push(`  syntaxNotes: ${escape(p.syntaxNotes)},`)
  if (p.urnPattern) L.push(`  urnPattern: ${escape(p.urnPattern)},`)
  if (p.relatedFlavors) L.push(`  relatedFlavors: [${p.relatedFlavors.map(escape).join(', ')}],`)
  L.push(`  docTypes: [`)
  for (const dt of p.docTypes) L.push(renderDocType(dt, 2) + ',')
  L.push(`],`)
  if (p.stages && p.stages.length > 0) {
    L.push(`  stages: [`)
    for (const s of p.stages) {
      L.push(`    { code: ${escape(s.code)}, abbr: ${escape(s.abbr)}, name: ${escape(s.name)} },`)
    }
    L.push(`],`)
  }
  if (p.styles && p.styles.length > 0) {
    L.push(`  styles: [`)
    for (const s of p.styles) {
      L.push(`    { key: ${escape(s.key)}, name: ${escape(s.name)}, description: ${escape(s.description)}, example: ${escape(s.example)} },`)
    }
    L.push(`],`)
  }
  L.push(`  components: [`)
  for (const c of mergedComponents) L.push(renderComponent(c, 2) + ',')
  L.push(`],`)
  L.push(`  algebra: [`)
  for (const a of p.algebra) L.push(renderAlgebra(a, 2))
  L.push(`],`)
  L.push(`}`)
  // Default export for OCP-compliant auto-discovery via import.meta.glob
  L.push('')
  L.push(`export default ${p.flavor.replace(/-/g, '_')}`)
  L.push('')
  return L.join('\n')
}

const flavors = []
for (const p of publishers) {
  const safe = p.flavor.replace(/-/g, '_')
  const filepath = join(flavorsDir, `${safe}.ts`)
  await writeFile(filepath, renderPublisher(p), 'utf8')
  flavors.push({ flavor: p.flavor, safe, varName: safe })
  console.log(`  wrote ${safe}.ts`)
}

// Registry: auto-discovery via import.meta.glob
const registryContents = `// Auto-generated by scripts/migrate-data.mjs
// Do not edit manually — edit per-flavor files in ./flavors/ instead.

import type { Publisher } from './types'

// OCP-compliant auto-discovery: a new flavor file in ./flavors/ is
// automatically included in the registry without code edits here.
const modules = import.meta.glob('./flavors/*.ts', { eager: true, import: 'default' }) as Record<string, Publisher>

export const publishers: Publisher[] = Object.values(modules)
  .sort((a, b) => a.flavor.localeCompare(b.flavor))

export const publishersByFlavor = new Map(publishers.map(p => [p.flavor, p]))

export function getPublisher(flavor: string): Publisher | undefined {
  return publishersByFlavor.get(flavor)
}

export function getPublishersByCategory(category: Publisher['category']): Publisher[] {
  return publishers.filter(p => p.category === category)
}

export const internationalPublishers = getPublishersByCategory('international')
export const regionalPublishers = getPublishersByCategory('regional')
export const nationalPublishers = getPublishersByCategory('national')
export const industryPublishers = getPublishersByCategory('industry')
`

await writeFile(join(ROOT, 'src/data/registry.ts'), registryContents, 'utf8')
console.log(`  wrote registry.ts (${publishers.length} publishers)`)

// Update index.ts to re-export from registry
const indexContents = `export { publishers, publishersByFlavor, getPublisher,
  getPublishersByCategory, internationalPublishers, regionalPublishers,
  nationalPublishers, industryPublishers } from './registry'

export { categoryLabels, categoryOrder } from './types'
export type { Publisher, DocType, FlavorComponent, AlgebraRelation,
  PubIDStyle, Stage, Category } from './types'
`

await writeFile(join(ROOT, 'src/data/index.ts'), indexContents, 'utf8')
console.log('  wrote index.ts')

// Cleanup
await rm(tmp, { recursive: true })
console.log('Done.')
