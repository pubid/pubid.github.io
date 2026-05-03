import { publishers } from '../../.vitepress/data/publishers'

export default {
  paths() {
    const paths: { params: { flavor: string; type: string } }[] = []
    for (const p of publishers) {
      for (const dt of p.docTypes) {
        paths.push({
          params: { flavor: p.flavor, type: dt.key }
        })
      }
    }
    return paths
  }
}
