/**
 * PubID Easter Eggs — entry point.
 *
 * Wires up keyboard, click, and temporal triggers; exposes the
 * `window.pubid` console API; and aliases `window.help` so typing
 * `help` in the console prints the easter-egg directory.
 *
 * Importing this module has the side effect of initialising everything,
 * so a plain `<script>import '~/scripts/easter-eggs'</script>` in the
 * base layout is enough.
 */

import * as fx from './effects'
import { EGGS, type Egg, type EggContext } from './eggs'
import { EGGS_EXTRA, EXTRA_HELPERS } from './eggs-extra'

const ACCENT = '#2978a1'
const ACCENT_2 = '#4193ac'

const ALL_EGGS: Egg[] = [...EGGS, ...EGGS_EXTRA]
const ALL_EGGS_BY_ID = new Map(ALL_EGGS.map(e => [e.id, e]))

let _initialised = false
let _busymax = false

function log(msg: string) {
  // eslint-disable-next-line no-console
  console.log(`%c[pubid] %c${msg}`, `color:${ACCENT};font-weight:600`, 'color:inherit')
}

const ctx: EggContext = {
  fire: (id: string) => {
    const egg = ALL_EGGS_BY_ID.get(id)
    if (!egg) {
      log(`unknown egg: ${id}`)
      return
    }
    if (_busymax) {
      log('another egg is running — wait a beat.')
      return
    }
    _busymax = true
    Promise.resolve(egg.activate(ctx)).finally(() => {
      setTimeout(() => {
        _busymax = false
      }, 400)
    })
  },
  log,
}

/* ─── Keyboard: typing sequences ─────────────────────────────── */
const TYPING_PATTERNS: Array<{ pattern: string; egg: string }> = [
  { pattern: 'ISO 9001', egg: 'iso9001' },
  { pattern: 'ISO 8601', egg: 'iso8601' },
  { pattern: 'ISO 27001', egg: 'iso27001' },
  { pattern: 'IEEE 754', egg: 'ieee754' },
  { pattern: 'RFC 1149', egg: 'rfc1149' },
  { pattern: 'RFC 2324', egg: 'rfc2324' },
  { pattern: '802.11', egg: 'wifi' },
  { pattern: 'W3C', egg: 'w3c' },
  { pattern: 'ISBN', egg: 'isbn' },
  { pattern: 'DOI', egg: 'doi' },
  { pattern: 'URN', egg: 'urn-morph' },
  { pattern: 'ERRATA', egg: 'errata' },
  { pattern: 'TRAIL', egg: 'mouse-trail' },
]

let _typingBuffer = ''
let _typingTimer: number | undefined

function pushKey(key: string) {
  _typingBuffer = (_typingBuffer + key).slice(-40)
  if (_typingTimer) window.clearTimeout(_typingTimer)
  _typingTimer = window.setTimeout(() => {
    _typingBuffer = ''
  }, 1800)
  const upper = _typingBuffer.toUpperCase()
  for (const { pattern, egg } of TYPING_PATTERNS) {
    if (upper.endsWith(pattern.toUpperCase())) {
      _typingBuffer = ''
      ctx.fire(egg)
      return
    }
  }
}

/* ─── Konami code ────────────────────────────────────────────── */
const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

let _konamiPos = 0

function handleKonami(key: string) {
  const expected = KONAMI[_konamiPos]
  const k = key.length === 1 ? key.toLowerCase() : key
  if (k === expected || k === expected.toLowerCase()) {
    _konamiPos++
    if (_konamiPos === KONAMI.length) {
      _konamiPos = 0
      ctx.fire('lifecycle')
    }
  } else {
    _konamiPos = k === KONAMI[0].toLowerCase() ? 1 : 0
  }
}

/* ─── Click detector on the header wordmark ──────────────────── */
let _logoClicks = 0
let _logoClickTimer: number | undefined

function bindLogoClicks() {
  const logo = document.querySelector<HTMLAnchorElement>('header a[href="/"]')
  if (!logo || logo.dataset.eggBound === '1') return
  logo.dataset.eggBound = '1'
  logo.addEventListener('click', e => {
    _logoClicks++
    if (_logoClickTimer) window.clearTimeout(_logoClickTimer)
    _logoClickTimer = window.setTimeout(() => {
      _logoClicks = 0
    }, 3000)
    if (_logoClicks === 7) {
      e.preventDefault()
      _logoClicks = 0
      ctx.fire('logo-decompose')
    } else if (_logoClicks >= 4) {
      // Tiny teaser so people notice something is up
      const hint = 7 - _logoClicks
      fx.toast(`${hint} more…`, { duration: 700, color: ACCENT })
    }
  })
}

/* ─── Document-level keyboard listener ───────────────────────── */
function bindKeyboard() {
  if ((document as unknown as { _eggKb?: boolean })._eggKb) return
  ;(document as unknown as { _eggKb?: boolean })._eggKb = true
  document.addEventListener('keydown', e => {
    if (e.defaultPrevented) return
    const t = e.target as HTMLElement | null
    if (
      t &&
      (t.tagName === 'INPUT' ||
        t.tagName === 'TEXTAREA' ||
        t.isContentEditable ||
        t.tagName === 'SELECT')
    ) {
      return
    }
    handleKonami(e.key)
    if (e.key.length === 1 && /[a-zA-Z0-9 ./-]/.test(e.key)) {
      pushKey(e.key)
    }
  })
}

/* ─── Temporal eggs ──────────────────────────────────────────── */
function bindTemporal() {
  const now = new Date()
  // World Standards Day — October 14
  if (now.getMonth() === 9 && now.getDate() === 14) {
    setTimeout(() => ctx.fire('world-standards-day'), 600)
  }
  // Tea time — local 15:30 to 17:00
  if (EXTRA_HELPERS.isCurrentlyTeaTime()) {
    setTimeout(() => ctx.fire('tea-time'), 1200)
  }
  // Idle detector — arms the floating-fragment ambient egg
  EXTRA_HELPERS.bindIdleHandler()
}

/* ─── Console API ────────────────────────────────────────────── */
interface PubidAPI {
  help: () => void
  list: () => Egg[]
  fire: (id: string) => void
  confetti: () => void
  spin: () => void
  shake: () => void
  trail: (on?: boolean) => boolean
  joke: () => void
  fact: () => void
  ascii: () => void
  cow: (msg?: string) => void
  parse: (id: string) => unknown
  uuid: () => string
  version: string
}

function printHelp() {
  // eslint-disable-next-line no-console
  console.log(
    `%cPubID Easter Eggs — ${ALL_EGGS.length} hidden`,
    `color:${ACCENT};font-weight:700;font-size:18px;letter-spacing:-0.01em`
  )
  // eslint-disable-next-line no-console
  console.log(
    '%cThemed around publication identifiers, standards bodies, and the PubID data model.\n',
    'color:#52525b;font-style:italic'
  )

  const groups: Array<{ name: string; cats: Egg['category'][] }> = [
    { name: 'Keyboard sequences', cats: ['keystroke'] },
    { name: 'Konami code', cats: ['konami'] },
    { name: 'Interactions', cats: ['click'] },
    { name: 'Temporal (auto)', cats: ['temporal'] },
    { name: 'Console API', cats: ['console'] },
  ]
  for (const g of groups) {
    const items = ALL_EGGS.filter(e => g.cats.includes(e.category))
    if (items.length === 0) continue
    // eslint-disable-next-line no-console
    console.log(`%c${g.name}`, `color:${ACCENT};font-weight:700;font-size:13px`)
    for (const egg of items) {
      // eslint-disable-next-line no-console
      console.log(
        `  %c${egg.trigger.padEnd(24)}%c ${egg.name}\n` +
          `%c${' '.repeat(26)}${egg.description}%c`,
        'color:#0b0d12;font-family:ui-monospace,Menlo,monospace;font-weight:600',
        'color:#52525b',
        'color:#a1a1aa;font-size:11px',
        'color:inherit'
      )
    }
  }

  // eslint-disable-next-line no-console
  console.log('%c\nProgrammatic:', `color:${ACCENT};font-weight:700;font-size:13px`)
  const cmds = [
    ['pubid.help()', 'This message'],
    ['pubid.list()', `All eggs as data (${ALL_EGGS.length} total)`],
    ['pubid.fire(id)', 'Trigger a specific egg by id'],
    ['pubid.joke()', 'A standards joke'],
    ['pubid.fact()', 'A standards-world fact'],
    ['pubid.ascii()', 'ASCII-art wordmark'],
    ['pubid.cow(msg?)', 'cowsay with an optional message'],
    ['pubid.parse(id)', 'Parse an identifier into components'],
    ['pubid.uuid()', 'Generate a UUID'],
    ['pubid.trail(on?)', 'Toggle mouse-trail sparkles'],
    ['pubid.confetti()', 'Burst confetti'],
    ['pubid.spin()', 'Spin the logo'],
    ['pubid.shake()', 'Shake the page'],
  ]
  for (const [cmd, desc] of cmds) {
    // eslint-disable-next-line no-console
    console.log(
      `  %c${cmd.padEnd(22)}%c ${desc}`,
      'color:#0b0d12;font-family:ui-monospace,Menlo,monospace',
      'color:#52525b'
    )
  }

  // eslint-disable-next-line no-console
  console.log(
    '%c\nReduced motion is respected. Keyboard sequences are ignored inside form fields.\nHave fun. ✨',
    'color:#52525b;font-style:italic'
  )
}

function installConsoleApi() {
  const api: PubidAPI = {
    help: printHelp,
    list: () => ALL_EGGS.slice(),
    fire: (id: string) => ctx.fire(id),
    confetti: () => ctx.fire('confetti'),
    spin: () => ctx.fire('spin'),
    shake: () => ctx.fire('shake'),
    trail: (on?: boolean) => {
      EXTRA_HELPERS.bindTrailHandler()
      return EXTRA_HELPERS.toggleTrail(on)
    },
    joke: () => ctx.fire('joke'),
    fact: () => ctx.fire('fact'),
    ascii: () => ctx.fire('ascii'),
    cow: (msg?: string) => {
      // eslint-disable-next-line no-console
      console.log(
        `%c${EXTRA_HELPERS.cowsay(msg)}`,
        `color:${ACCENT_2};font-family:ui-monospace,Menlo,monospace`
      )
    },
    parse: (id: string) => {
      const result = EXTRA_HELPERS.parseIdentifier(id)
      // eslint-disable-next-line no-console
      console.log(result)
      return result
    },
    uuid: () => {
      const u = EXTRA_HELPERS.uuid()
      // eslint-disable-next-line no-console
      console.log(u)
      return u
    },
    version: '2.0.0',
  }
  Object.defineProperty(window, 'pubid', {
    value: api,
    writable: false,
    configurable: true,
  })
  if (!(window as unknown as { help?: unknown }).help) {
    Object.defineProperty(window, 'help', {
      value: printHelp,
      writable: false,
      configurable: true,
    })
  }
}

/* ─── Init ───────────────────────────────────────────────────── */
export function init() {
  if (_initialised) return
  if (typeof window === 'undefined') return
  _initialised = true

  bindKeyboard()
  bindLogoClicks()
  bindTemporal()
  installConsoleApi()

  log('easter eggs ready — type help or pubid.help() in the console.')
}

// Auto-init on import (browser only)
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true })
  } else {
    init()
  }
}

export default init
