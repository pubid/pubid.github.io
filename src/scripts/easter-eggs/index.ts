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
import { EGGS, EGGS_BY_ID, type Egg, type EggContext } from './eggs'

const ACCENT = '#2978a1'

let _initialised = false
let _busymax = false

function log(msg: string) {
  // eslint-disable-next-line no-console
  console.log(`%c[pubid] %c${msg}`, `color:${ACCENT};font-weight:600`, 'color:inherit')
}

const ctx: EggContext = {
  fire: (id: string) => {
    const egg = EGGS_BY_ID.get(id)
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
  { pattern: 'RFC 1149', egg: 'rfc1149' },
  { pattern: '802.11', egg: 'wifi' },
  { pattern: 'URN', egg: 'urn-morph' },
  { pattern: 'ERRATA', egg: 'errata' },
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
}

/* ─── Console API ────────────────────────────────────────────── */
interface PubidAPI {
  help: () => void
  list: () => Egg[]
  fire: (id: string) => void
  confetti: () => void
  spin: () => void
  shake: () => void
  version: string
}

function printHelp() {
  const header =
    '%c╔════════════════════════════════════════════════════════════╗\n' +
    '%c║  PubID Easter Eggs                                         ║\n' +
    '%c╚════════════════════════════════════════════════════════════╝'
  // eslint-disable-next-line no-console
  console.log(
    header,
    `color:${ACCENT};font-weight:700`,
    `color:${ACCENT};font-weight:700`,
    `color:${ACCENT};font-weight:700`
  )
  // eslint-disable-next-line no-console
  console.log(
    '%cTry these — they are themed around publication identifiers, standards bodies, and the PubID data model.',
    'color:#52525b;font-style:italic'
  )

  const groups: Record<string, Egg[]> = {
    'Keyboard sequences': EGGS.filter(e => e.category === 'keystroke'),
    'Konami code': EGGS.filter(e => e.category === 'konami'),
    Interactions: EGGS.filter(e => e.category === 'click'),
    Temporal: EGGS.filter(e => e.category === 'temporal'),
    'Console API': EGGS.filter(e => e.category === 'console'),
  }
  for (const [group, items] of Object.entries(groups)) {
    if (items.length === 0) continue
    // eslint-disable-next-line no-console
    console.log(`%c${group}`, `color:${ACCENT};font-weight:700;font-size:13px`)
    for (const egg of items) {
      // eslint-disable-next-line no-console
      console.log(
        `  %c${egg.trigger.padEnd(22)}%c  ${egg.name}\n` +
          `%c${' '.repeat(24)}${egg.description}%c`,
        'color:#0b0d12;font-family:ui-monospace,Menlo,monospace;font-weight:600',
        'color:#52525b',
        'color:#a1a1aa;font-size:11px',
        'color:inherit'
      )
    }
  }

  // eslint-disable-next-line no-console
  console.log(
    '%c\nProgrammatic:',
    `color:${ACCENT};font-weight:700;font-size:13px`
  )
  // eslint-disable-next-line no-console
  console.log(
    '  %cpubid.help()%c        This message\n' +
      '  %cpubid.list()%c        All eggs as data\n' +
      '  %cpubid.fire(id)%c      Trigger by id (e.g. pubid.fire(\'pigeon\'))\n' +
      '  %cpubid.confetti()%c    Burst confetti\n' +
      '  %cpubid.spin()%c        Spin the logo\n' +
      '  %cpubid.shake()%c       Shake the page',
    'color:#0b0d12;font-family:ui-monospace,Menlo,monospace',
    'color:#52525b',
    'color:#0b0d12;font-family:ui-monospace,Menlo,monospace',
    'color:#52525b',
    'color:#0b0d12;font-family:ui-monospace,Menlo,monospace',
    'color:#52525b',
    'color:#0b0d12;font-family:ui-monospace,Menlo,monospace',
    'color:#52525b',
    'color:#0b0d12;font-family:ui-monospace,Menlo,monospace',
    'color:#52525b',
    'color:#0b0d12;font-family:ui-monospace,Menlo,monospace',
    'color:#52525b'
  )

  // eslint-disable-next-line no-console
  console.log(
    '%c\nReduced motion is respected — flashy eggs no-op when set.\nHave fun. ✨',
    'color:#52525b;font-style:italic'
  )
}

function installConsoleApi() {
  const api: PubidAPI = {
    help: printHelp,
    list: () => EGGS.slice(),
    fire: (id: string) => ctx.fire(id),
    confetti: () => ctx.fire('confetti'),
    spin: () => ctx.fire('spin'),
    shake: () => ctx.fire('shake'),
    version: '1.0.0',
  }
  Object.defineProperty(window, 'pubid', {
    value: api,
    writable: false,
    configurable: true,
  })
  // Alias `help` so typing `help` in console opens the directory.
  // We only define it if no page-script helper already exists.
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
