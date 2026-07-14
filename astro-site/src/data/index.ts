export { publishers, publishersByFlavor, getPublisher,
  getPublishersByCategory, internationalPublishers, regionalPublishers,
  nationalPublishers, industryPublishers } from './registry'

export { categoryLabels, categoryOrder } from './types'
export type { Publisher, DocType, FlavorComponent, AlgebraRelation,
  PubIDStyle, Stage, Category } from './types'

// Re-export getComponentMeta for compatibility with ported VitePress components.
// The data is now merged into FlavorComponent directly (SSOT), so this is a
// no-op identity function — returns the component unchanged.
export function getComponentMeta(_flavor: string, _componentName: string): Record<string, never> {
  return {}
}
