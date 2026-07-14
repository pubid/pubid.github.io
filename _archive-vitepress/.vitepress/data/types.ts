export interface DocType {
  key: string
  title: string
  abbr: string[]
  description: string
  examples: { input: string; output?: string }[]
  syntax?: string
}

export interface Stage {
  code: string
  abbr: string
  name: string
}

export interface FlavorComponent {
  name: string
  description: string
  attribute?: string
  dataType?: 'enum' | 'integer' | 'string' | 'year' | 'compound'
  values?: string[]
  format?: string
  example?: string
}

export interface AlgebraRelation {
  type: string
  description: string
  syntax: string
  example: string
}

export interface PubIDStyle {
  key: string
  name: string
  description: string
  example: string
}

export interface Publisher {
  flavor: string
  name: string
  fullName: string
  category: 'international' | 'regional' | 'national' | 'industry'
  description: string
  website?: string
  docTypes: DocType[]
  stages?: Stage[]
  styles?: PubIDStyle[]
  components: FlavorComponent[]
  algebra: AlgebraRelation[]
  urnPattern?: string
  relatedFlavors?: string[]
  syntaxNotes?: string
  logo: string
  logos?: string[]
}

export type Category = Publisher['category']

export const categoryLabels: Record<Category, string> = {
  international: 'International',
  regional: 'Regional',
  national: 'National',
  industry: 'Industry'
}

export const categoryOrder: Category[] = ['international', 'regional', 'national', 'industry']
