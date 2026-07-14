import { publishers } from '../.vitepress/data/publishers'

export default {
  paths() {
    return publishers.map(p => ({
      params: { flavor: p.flavor }
    }))
  }
}
