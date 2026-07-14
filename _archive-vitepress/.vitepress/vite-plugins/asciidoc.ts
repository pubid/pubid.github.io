import type { Plugin } from 'vite'
import Asciidoctor from '@asciidoctor/core'

const adoc = Asciidoctor()

export function asciidocPlugin(): Plugin {
  return {
    name: 'vite-plugin-asciidoc',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.adoc')) return null

      const html = adoc.convert(code, {
        standalone: false,
        safe: 'unsafe',
        attributes: {
          showtitle: true,
          toc: 'macro',
          sectanchors: true,
          'source-highlighter': 'highlight.js',
          icons: 'font',
        },
      })

      return {
        code: `export default ${JSON.stringify(html)}`,
        map: null,
      }
    },
  }
}
