// Emits the spoke NewsML-G2 tree (TODO.import-network/03 contract):
//   dist/news-data/newsml.xml                       index NewsMessage
//   dist/news-data/articles/<YYYY-MM-DD>-<slug>/
//     newsml.xml   full NewsItem (inline XHTML + source rendition)
//     body.md      the markdown source rendition
// Additive only: the spoke's own pages are untouched.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildNewsItem, buildNewsMessage } from 'newsmlg2-ts'
import matter from 'gray-matter'
import { marked } from 'marked'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BLOG = join(root, 'src/content/blog')
const OUT = join(root, 'dist/news-data')
const SPOKE = { id: 'pubid', name: 'PubID', base: 'https://pubid.github.io' }

const parseFrontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const fm = {}
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^(\w[\w-]*):\s*(.*)$/)
      if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
    }
  }
  return { fm: matter(raw).data || fm, body: m ? raw.slice(m[0].length) : raw }
}

const posts = readdirSync(BLOG)
  .filter((f) => /^\d{4}-\d{2}-\d{2}-.*\.md$/.test(f))
  .map((f) => {
    const { fm, body } = parseFrontmatter(readFileSync(join(BLOG, f), 'utf8'))
    const stem = f.replace(/\.md$/, '')
    return {
      date: stem.slice(0, 10),
      slug: stem.slice(11),
      title: fm.title ?? stem.slice(11),
      author: fm.author ?? `${SPOKE.name} Team`,
      draft: fm.draft === true,
      body,
    }
  })
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

const itemDir = (p) => join(OUT, 'articles', `${p.date}-${p.slug}`)
const canonical = (p) => `${SPOKE.base}/blog/${p.slug}`
const guid = (p) => `urn:ribose:news:${p.date}:${SPOKE.id}:${p.slug}`

const toItemModel = (p, full) => ({
  itemMeta: {
    guid: guid(p), lang: 'en', version: 1, itemClass: 'ninat:text',
    provider: { qcode: `nprov:${SPOKE.id}`, name: SPOKE.name },
    versionCreated: `${p.date}T00:00:00+00:00`,
  },
  contentMeta: {
    headline: p.title,
    by: p.author,
    contentCreated: `${p.date}T00:00:00+00:00`,
    ...(full
      ? {
          bodyXhtml: marked.parse(p.body, { async: false }),
          renditions: [{ href: 'body.md', rendition: 'rnd:main' }],
        }
      : {}),
  },
})

mkdirSync(OUT, { recursive: true })
writeFileSync(
  join(OUT, 'newsml.xml'),
  buildNewsMessage({
    header: { sent: new Date().toISOString(), sender: 'Ribose' },
    items: posts.map((p) => toItemModel(p, false)),
  }).toXml(),
)
for (const p of posts) {
  mkdirSync(itemDir(p), { recursive: true })
  writeFileSync(join(itemDir(p), 'newsml.xml'), buildNewsItem(toItemModel(p, true)).toXml())
  writeFileSync(join(itemDir(p), 'body.md'), p.body)
}
console.log(`newsml: ${posts.length} items -> ${OUT}`)
