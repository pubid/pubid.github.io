import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter(page => page.frontmatter.title && page.frontmatter.date && page.url !== '/blog/')
      .sort((a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      )
  },
})
