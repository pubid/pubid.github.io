import type { Publisher, DocType, Stage } from './types'
import generatedData from './generated/website-data.json'

interface GeneratedTypedStage {
  stage_code: string
  type_code: string
  abbr: string[]
  name: string
  harmonized_stages: string[]
}

interface GeneratedIdentifierType {
  key: string
  title: string
  short: string | null
  abbr: string[]
  typed_stages: GeneratedTypedStage[]
  examples: string[]
}

interface GeneratedFlavorData {
  identifier_types: GeneratedIdentifierType[]
  wrapper_types?: GeneratedIdentifierType[]
  attributes: string[]
}

interface ExportMetadata {
  pubid_version: string
  git_commit: string
  git_branch: string
  exported_at: string
  total_identifier_types: number
  total_flavors: number
}

type RawGeneratedData = { _metadata: ExportMetadata } & Record<string, GeneratedFlavorData>

const raw = generatedData as RawGeneratedData
const metadata: ExportMetadata = raw._metadata
const generated: Record<string, GeneratedFlavorData> = {}
for (const [k, v] of Object.entries(raw)) {
  if (k !== '_metadata') generated[k] = v as GeneratedFlavorData
}

export function getMetadata(): ExportMetadata {
  return metadata
}

export function getGeneratedData(flavor: string): GeneratedFlavorData | undefined {
  return generated[flavor]
}

export function getGeneratedTypes(flavor: string): GeneratedIdentifierType[] {
  return generated[flavor]?.identifier_types ?? []
}

export function getGeneratedStages(flavor: string): Stage[] {
  const types = getGeneratedTypes(flavor)
  const stages: Stage[] = []

  for (const type of types) {
    for (const ts of type.typed_stages) {
      if (!stages.some(s => s.code === ts.stage_code)) {
        stages.push({
          code: ts.stage_code,
          abbr: ts.abbr[0] || ts.stage_code,
          name: ts.name || ts.stage_code,
        })
      }
    }
  }

  return stages
}

export function mergePublishers(publishers: Publisher[]): Publisher[] {
  return publishers.map(p => mergePublisher(p))
}

function mergePublisher(publisher: Publisher): Publisher {
  const key = publisher.flavor.replace(/-/g, '_')
  const gen = generated[key]
  if (!gen) return publisher

  return {
    ...publisher,
    docTypes: mergeDocTypes(publisher.docTypes, gen),
    stages: mergeStages(publisher.stages, gen),
  }
}

function mergeDocTypes(existing: DocType[], gen: GeneratedFlavorData): DocType[] {
  const existingKeys = new Set(existing.map(t => t.key))
  const merged = [...existing]

  for (const gt of gen.identifier_types) {
    if (!existingKeys.has(gt.key)) {
      existingKeys.add(gt.key)
      merged.push({
        key: gt.key,
        title: gt.title,
        abbr: gt.abbr,
        description: '',
        examples: (gt.examples || []).map(e => ({ input: e })),
      })
    } else {
      // Merge examples and typed stages from generated into existing
      const existingType = merged.find(t => t.key === gt.key)!
      if (!existingType.abbr?.length && gt.abbr?.length) {
        existingType.abbr = gt.abbr
      }
      if (!existingType.examples?.length && gt.examples?.length) {
        existingType.examples = gt.examples.map(e => ({ input: e }))
      }
    }
  }

  return merged
}

function mergeStages(existing: Stage[] | undefined, gen: GeneratedFlavorData): Stage[] | undefined {
  const genKey = Object.keys(generated).find(k => generated[k] === gen) || ''
  const genStages = getGeneratedStages(genKey)
  if (genStages.length === 0) return existing
  if (!existing || existing.length === 0) return genStages

  const merged = [...existing]
  for (const gs of genStages) {
    if (!merged.some(s => s.code === gs.code)) {
      merged.push(gs)
    }
  }
  return merged
}

export function auditAgainstLibrary(publishers: Publisher[]): AuditReport {
  const report: AuditReport = {}

  for (const p of publishers) {
    const key = p.flavor.replace(/-/g, '_')
    const gen = generated[key]
    if (!gen) {
      report[p.flavor] = { status: 'no_library_data' }
      continue
    }

    const genKeys = new Set(gen.identifier_types.map(t => t.key))
    const webKeys = new Set(p.docTypes.map(t => t.key))

    const missing = gen.identifier_types.filter(t => !webKeys.has(t.key))
    const extra = p.docTypes.filter(t => !genKeys.has(t.key))

    report[p.flavor] = {
      status: missing.length === 0 && extra.length === 0 ? 'ok' : 'mismatch',
      missingTypes: missing.map(t => ({ key: t.key, title: t.title })),
      extraTypes: extra.map(t => ({ key: t.key, title: t.title })),
    }
  }

  return report
}

export interface AuditReport {
  [flavor: string]: {
    status: 'ok' | 'mismatch' | 'no_library_data'
    missingTypes?: { key: string; title: string }[]
    extraTypes?: { key: string; title: string }[]
  }
}
