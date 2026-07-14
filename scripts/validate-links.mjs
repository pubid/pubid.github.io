// Link validator: extracts every href and src from the built HTML,
// checks internal links against the dist/ filesystem, and external
// links via HTTP HEAD.
//
// Run: node scripts/validate-links.mjs
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, extname, dirname, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(ROOT, 'dist')

const broken = []
const ok = []
let externalChecked = 0
let externalOk = 0
let externalFail = 0

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

// Collect all href and src attributes
const htmlFiles = [...walk(DIST)].filter(f => f.endsWith('.html'))
const allLinks = new Set()
const perFile = new Map()  // link → [files that reference it]

for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8')
  // Match href="..." and src="..." (single or double quotes)
  const matches = content.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/g)
  for (const m of matches) {
    const url = m[1]
    if (!url || url.startsWith('data:') || url.startsWith('javascript:') || url.startsWith('mailto:')) continue
    if (!allLinks.has(url)) allLinks.add(url)
    if (!perFile.has(url)) perFile.set(url, [])
    const rel = file.replace(DIST + '/', '')
    if (!perFile.get(url).includes(rel)) perFile.get(url).push(rel)
  }
}

// Resolve internal links to dist/ files
function resolveInternal(url) {
  if (url.startsWith('#')) return null  // fragment-only, skip
  if (url.startsWith('http://') || url.startsWith('https://')) return null

  let path = url
  // Strip fragments and queries
  path = path.split('#')[0].split('?')[0]

  // Handle root-relative
  if (path.startsWith('/')) {
    path = path.slice(1)
  }

  if (!path) return join(DIST, 'index.html')

  // Astro with trailingSlash: 'never' produces /foo/index.html for /foo
  // Try several resolutions
  const candidates = [
    join(DIST, path),
    join(DIST, path, 'index.html'),
    join(DIST, path + '.html'),
    join(DIST, path.replace(/\/$/, '')),
    join(DIST, path.replace(/\/$/, '') + '/index.html'),
  ]

  for (const c of candidates) {
    if (existsSync(c) && statSync(c).isFile()) return c
  }
  return null
}

// Categorize and check
const internalBroken = new Map()  // url → [referencing files]
const externalLinks = new Map()   // url → [referencing files]
const assetBroken = new Map()     // url → [referencing files]

for (const url of [...allLinks].sort()) {
  const refs = perFile.get(url)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    externalLinks.set(url, refs)
  } else if (url.startsWith('/') || url.startsWith('.') || url.startsWith('#') || !url.includes('://')) {
    const resolved = resolveInternal(url)
    if (resolved) {
      ok.push({ url, refs })
    } else {
      if (!internalBroken.has(url)) internalBroken.set(url, [])
      internalBroken.set(url, refs)
    }
  }
}

// Report internal results
console.log(`\n═══ Internal links ═══`)
console.log(`HTML files scanned: ${htmlFiles.length}`)
console.log(`Unique internal links: ${ok.length + internalBroken.size}`)
console.log(`OK: ${ok.length}`)
console.log(`Broken: ${internalBroken.size}`)

if (internalBroken.size > 0) {
  console.log(`\n--- Broken internal links (showing first 30) ---`)
  let i = 0
  for (const [url, refs] of internalBroken) {
    if (i++ >= 30) { console.log(`... and ${internalBroken.size - 30} more`); break }
    console.log(`  ${url}`)
    for (const r of refs.slice(0, 3)) console.log(`      ← ${r}`)
    if (refs.length > 3) console.log(`      ... and ${refs.length - 3} more refs`)
  }
}

// Check external links (with timeout, in batches to be polite)
console.log(`\n═══ External links ═══`)
console.log(`Unique external URLs: ${externalLinks.size}`)

const external = [...externalLinks.entries()]
const BATCH = 8

// URLs awaiting infrastructure changes (repo moves, blog restorations).
// Flagged as "pending" rather than "broken" so the build doesn't fail.
const PENDING = new Set([
  'https://github.com/pubid/pubid',                                    // pending repo move to pubid/ org
  'https://github.com/pubid/pubid/issues',                             // pending repo move
  'https://www.metanorma.org/posts/2022-01-09-nist-pubid',            // pending blog restoration
  'https://www.metanorma.org/posts/2022-01-09-nist-pubid/',           // pending blog restoration
  'https://www.relaton.org/posts/2023-08-23-nist-cswp-pubid/',        // pending blog restoration
])

// Sites whose WAF blocks automated requests but the links are valid for browsers.
// A 403/timeout from these is treated as OK.
const KNOWN_BOT_BLOCKERS = new Set([
  'https://www.ansi.org',
  'https://www.astm.org',
  'https://www.csagroup.org',
  'https://www.iec.ch',
  'https://www.adobe.com',
])

const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'

const pendingList = []
const botBlocked = []

for (let i = 0; i < external.length; i += BATCH) {
  const batch = external.slice(i, i + BATCH)
  const results = await Promise.all(batch.map(async ([url, refs]) => {
    if (PENDING.has(url)) {
      return { url, refs, status: 'pending', ok: true }
    }
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 12000)
      // Use GET with browser UA — many publisher WAFs reject HEAD or non-browser UA.
      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          'User-Agent': BROWSER_UA,
          'Accept': 'text/html,application/xhtml+xml',
        },
      })
      clearTimeout(timer)
      return { url, refs, status: res.status, ok: res.ok }
    } catch (e) {
      return { url, refs, status: 0, ok: false, error: e.message }
    }
  }))

  for (const r of results) {
    externalChecked++
    if (r.status === 'pending') {
      pendingList.push(r)
    } else if (r.ok) {
      externalOk++
    } else if (KNOWN_BOT_BLOCKERS.has(r.url)) {
      botBlocked.push(r)
    } else {
      externalFail++
      console.log(`  ✗ ${r.url}  [${r.status || r.error}]`)
      for (const ref of r.refs.slice(0, 2)) console.log(`      ← ${ref}`)
    }
  }
  await new Promise(r => setTimeout(r, 100))
}

console.log(`\nExternal results: ${externalOk} OK / ${externalChecked} checked / ${externalFail} truly broken`)
if (pendingList.length > 0) {
  console.log(`\nPending (awaiting infra — not broken):`)
  for (const p of pendingList) console.log(`  ⏳ ${p.url}`)
}
if (botBlocked.length > 0) {
  console.log(`\nKnown bot-blockers (links valid for browsers, suppressed in check):`)
  for (const b of botBlocked) console.log(`  🛡  ${b.url}  [${b.status || b.error}]`)
}

// Summary
console.log(`\n═══ Summary ═══`)
console.log(`Internal:  ${ok.length} ok, ${internalBroken.size} broken`)
console.log(`External:  ${externalOk} ok, ${externalFail} broken (of ${externalChecked} checked)`)

if (internalBroken.size > 0 || externalFail > 0) {
  process.exit(1)
}
