// Patch content files to ensure they have minimal frontmatter required by
// the zod schemas in content.config.ts. Idempotent.
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'node:fs/promises'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

async function patchFile(filepath, fallback) {
  const content = await readFile(filepath, 'utf8')
  if (content.startsWith('---')) {
    const end = content.indexOf('\n---', 3)
    if (end > 0) {
      const fm = content.slice(3, end)
      const body = content.slice(end + 4)
      // Check if title is present; if not, derive from first H1
      if (!fm.includes('title:')) {
        const h1 = body.match(/^#\s+(.+)$/m)
        const title = h1 ? h1[1].trim() : fallback.title
        return writeFile(filepath, `---\n${fm}title: ${JSON.stringify(title)}\n---${body}`)
      }
      return
    }
  }
  // No frontmatter at all — derive from first H1
  const h1 = content.match(/^#\s+(.+)$/m)
  const title = h1 ? h1[1].trim() : fallback.title
  const description = fallback.description || ''
  const newContent = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n${content}`
  await writeFile(filepath, newContent)
}

const targets = [
  { dir: 'src/content/concepts', fallback: { title: 'Concept', description: 'A PubID concept.' } },
  { dir: 'src/content/library', fallback: { title: 'Library', description: 'PubID library documentation.' } },
  { dir: 'src/content/adopt', fallback: { title: 'Adopt', description: 'Adopting PubID.' } },
  { dir: 'src/content/specs', fallback: { title: 'Specification', description: 'A PubID specification.' } },
]

for (const { dir, fallback } of targets) {
  const absDir = join(ROOT, dir)
  for await (const entry of glob(join(absDir, '**', '*.{md,mdx}'))) {
    if (entry.endsWith('.adoc')) continue
    try {
      await patchFile(entry, fallback)
      console.log('patched', entry.replace(ROOT + '/', ''))
    } catch (e) {
      console.error('failed', entry, e.message)
    }
  }
}

console.log('done')
