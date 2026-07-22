/**
 * PubID Easter Eggs — Volume 2.
 *
 * More themed easter eggs that build on Volume 1 (eggs.ts) and use the
 * extended WAAPI primitives in effects.ts (scan line, ripple, flip text,
 * floating fragments, lockdown frame, glow, web-audio beep).
 *
 * Eggs here cover: identifier-themed typing triggers (ISO 8601, IEEE 754,
 * RFC 2324, ISBN, DOI, ISO 27001, W3C), an interactive mouse-trail mode,
 * ambient idle fragments, a temporal tea-time badge, and a few helpers
 * exposed via the console API (joke, fact, ascii, cow, parse, uuid).
 */

import * as fx from './effects'
import type { Egg, EggContext } from './eggs'

const ACCENT = '#2978a1'
const ACCENT_2 = '#4193ac'
const WARM = '#da9d76'
const GREEN = '#34d399'
const RED = '#dc2626'

/* ─────────────────────────────────────────────────────────────────
 * ISO 8601 — every date-like string flips into strict ISO 8601.
 * ───────────────────────────────────────────────────────────────── */
const ISO_8601: Egg = {
  id: 'iso8601',
  name: 'ISO 8601 Date Flip',
  description:
    'Every date-looking string on the page flips into strict ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).',
  category: 'keystroke',
  trigger: 'Type "ISO 8601"',
  async activate(ctx) {
    ctx.log('Canonicalising dates to ISO 8601…')
    type Patch = { el: HTMLElement; original: string }
    const patches: Patch[] = []

    const DATE_RE =
      /\b(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})\b|\b(\d{4})[/-](\d{1,2})[/-](\d{1,2})\b|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})\b/gi

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement
        if (!p) return NodeFilter.FILTER_REJECT
        const tag = p.tagName
        if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT
        return DATE_RE.test(node.textContent || '')
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT
      },
    })

    const now = new Date()
    const iso = (d = now) => d.toISOString()

    const seen = new Set<Text>()
    while (walker.nextNode()) {
      const tn = walker.currentNode as Text
      if (seen.has(tn)) continue
      seen.add(tn)
      const text = tn.textContent || ''
      DATE_RE.lastIndex = 0
      if (!DATE_RE.test(text)) continue
      const parent = tn.parentElement
      if (!parent) continue

      const span = document.createElement('span')
      span.textContent = text
      span.style.cssText = 'display:inline-block; transform-origin:center;'
      parent.replaceChild(span, tn)
      patches.push({ el: span, original: text })

      const flip = async () => {
        await fx.sleep(Math.random() * 400)
        await fx.flipText(span, iso(), { color: ACCENT, duration: 280 })
      }
      void flip()

      if (patches.length >= 20) break
    }

    if (patches.length === 0) {
      fx.toast('No dates found on this page.', { color: WARM })
      return
    }

    fx.toast(`ISO 8601 strict · ${patches.length} timestamp${patches.length === 1 ? '' : 's'}`, {
      color: ACCENT,
    })

    await fx.sleep(3500)
    patches.forEach((p, i) => {
      setTimeout(() => {
        void fx.flipText(p.el, p.original, { color: '', duration: 220 })
      }, i * 30)
    })
    await fx.sleep(1500)
    patches.forEach(p => {
      const parent = p.el.parentNode
      if (!parent) return
      parent.replaceChild(document.createTextNode(p.original), p.el)
      parent.normalize()
    })
  },
}

/* ─────────────────────────────────────────────────────────────────
 * IEEE 754 — floating-point reality. Numbers become NaN / Infinity /
 * -0 / the famous 0.1 + 0.2 = 0.30000000000000004.
 * ───────────────────────────────────────────────────────────────── */
const IEEE_754: Egg = {
  id: 'ieee754',
  name: 'Floating-Point Reality',
  description:
    'Numbers on the page glitch into NaN, Infinity, -0, and the famous 0.1 + 0.2 result.',
  category: 'keystroke',
  trigger: 'Type "IEEE 754"',
  async activate(ctx) {
    ctx.log('Engaging IEEE 754 binary64 reality.')
    const NUM_RE = /\b\d+(?:\.\d+)?\b/g
    type Patch = { el: HTMLElement; original: string }
    const patches: Patch[] = []

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement
        if (!p) return NodeFilter.FILTER_REJECT
        const tag = p.tagName
        if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT
        return NUM_RE.test(node.textContent || '')
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT
      },
    })

    const seen = new Set<Text>()
    while (walker.nextNode()) {
      const tn = walker.currentNode as Text
      if (seen.has(tn)) continue
      seen.add(tn)
      const text = tn.textContent || ''
      if (!NUM_RE.test(text)) continue
      const parent = tn.parentElement
      if (!parent) continue

      const wrap = document.createElement('span')
      wrap.textContent = text
      parent.replaceChild(wrap, tn)
      patches.push({ el: wrap, original: text })
      if (patches.length >= 30) break
    }

    if (patches.length === 0) {
      fx.toast('No numbers to corrupt.', { color: WARM })
      return
    }

    const mutations = [
      'NaN',
      'Infinity',
      '-Infinity',
      '-0',
      '0.30000000000000004',
      '5e-324',
      '1.7976931348623157e+308',
    ]
    const picked = new Set<number>()
    const target = Math.min(Math.floor(patches.length * 0.4), 14)
    while (picked.size < target) picked.add(Math.floor(Math.random() * patches.length))

    patches.forEach((p, i) => {
      if (!picked.has(i)) return
      const delay = i * 30
      setTimeout(() => {
        p.el.animate(
          [
            { filter: 'blur(0)', color: p.el.style.color || 'inherit' },
            { filter: 'blur(2px)', color: RED, transform: 'translateX(2px)' },
            { filter: 'blur(0)', color: RED, transform: 'translateX(0)' },
          ],
          { duration: 220, fill: 'forwards' }
        )
        setTimeout(() => {
          const next = mutations[Math.floor(Math.random() * mutations.length)]
          p.el.textContent = p.el.textContent.replace(NUM_RE, () => next)
        }, 200)
      }, delay)
    })

    fx.toast(`IEEE 754 binary64 · ${picked.size} float${picked.size === 1 ? '' : 's'} corrupted`, {
      color: RED,
    })

    await fx.sleep(5500)
    patches.forEach((p, i) => {
      setTimeout(() => {
        p.el.textContent = p.original
        p.el.style.color = ''
        p.el.style.filter = ''
      }, i * 20)
    })
  },
}

/* ─────────────────────────────────────────────────────────────────
 * RFC 2324 — Hyper Text Coffee Pot Control Protocol (418 I'm a teapot).
 * ───────────────────────────────────────────────────────────────── */
const RFC_2324_TEAPOT: Egg = {
  id: 'rfc2324',
  name: 'HTCPCP Teapot',
  description: 'A teapot appears and pours tea. (RFC 2324 is real — status code 418.)',
  category: 'keystroke',
  trigger: 'Type "RFC 2324"',
  async activate(ctx) {
    ctx.log('418 I’m a teapot.')
    const dim = fx.dimPage({ opacity: 0.45, blur: '6px' })
    const stage = document.createElement('div')
    stage.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      display: flex; flex-direction: column; align-items: center; gap: 18px;
      pointer-events: auto;
    `
    fx.overlay().appendChild(stage)

    const badge = document.createElement('div')
    badge.textContent = '418 I’m a teapot'
    badge.style.cssText = `
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
      color: ${WARM}; background: rgba(218, 157, 118, 0.1);
      border: 1px solid rgba(218, 157, 118, 0.4);
      padding: 5px 12px; border-radius: 999px;
      opacity: 0;
    `
    stage.appendChild(badge)

    const teapot = document.createElement('div')
    teapot.innerHTML = `
      <svg viewBox="0 0 220 140" width="240" height="150" style="overflow:visible;">
        <defs>
          <linearGradient id="pot-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8b48a"/>
            <stop offset="100%" stop-color="#c98a5c"/>
          </linearGradient>
        </defs>
        <g fill="url(#pot-fill)" stroke="#8c5a36" stroke-width="2" stroke-linejoin="round">
          <ellipse cx="100" cy="80" rx="58" ry="32"/>
          <path d="M 158 70 Q 200 50 200 80 Q 200 110 158 95 Z"/>
          <path d="M 60 70 Q 30 50 20 80 Q 30 100 60 90 Z" fill="#a06940"/>
          <ellipse cx="100" cy="55" rx="22" ry="8" fill="#8c5a36"/>
          <ellipse cx="100" cy="55" rx="16" ry="5" fill="#3a2415"/>
        </g>
        <g transform="translate(95 50)">
          <circle cx="0" cy="0" r="3" fill="#3a2415"/>
        </g>
        <g class="tea-stream" stroke="${WARM}" stroke-width="3" stroke-linecap="round" fill="none" opacity="0">
          <path d="M 170 95 Q 180 110 195 130" />
        </g>
      </svg>
    `
    teapot.style.cssText = `transform-origin: 70% 80%;`
    stage.appendChild(teapot)

    const cup = document.createElement('div')
    cup.innerHTML = `
      <svg viewBox="0 0 100 70" width="100" height="70">
        <g fill="${WARM}" stroke="#8c5a36" stroke-width="2">
          <path d="M 10 10 L 80 10 L 75 50 Q 75 60 45 60 Q 15 60 15 50 Z"/>
          <path d="M 80 20 Q 95 25 95 35 Q 95 45 80 45" fill="none"/>
        </g>
        <ellipse cx="45" cy="12" rx="34" ry="4" fill="#3a2415" opacity="0.6" class="tea-surface"/>
      </svg>
    `
    cup.style.cssText = `opacity:0; transform: translateY(8px);`
    stage.appendChild(cup)

    badge.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 320,
      easing: 'ease-out',
      fill: 'forwards',
    })
    await fx.sleep(300)

    teapot.animate(
      [{ transform: 'rotate(0)' }, { transform: 'rotate(-22deg)' }],
      { duration: 700, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
    )
    await fx.sleep(650)

    const stream = teapot.querySelector('.tea-stream') as SVGElement
    stream.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      fill: 'forwards',
    })
    cup.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      fill: 'forwards',
    })
    fx.beep({ freq: 220, type: 'triangle', duration: 1800, volume: 0.04 })

    await fx.sleep(1800)
    stream.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' })

    // Steam rising from the cup
    const steam = document.createElement('div')
    steam.style.cssText = `
      position: absolute; left: 50%; bottom: 0;
      width: 60px; height: 80px;
      pointer-events: none;
      transform: translateX(-30px);
    `
    steam.innerHTML = `
      <svg viewBox="0 0 60 80" width="60" height="80">
        <g stroke="${WARM}" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6">
          <path d="M 18 70 Q 12 50 22 30 Q 28 18 18 4" />
          <path d="M 30 70 Q 36 50 26 30 Q 22 18 32 4" />
          <path d="M 42 70 Q 36 50 46 30 Q 50 18 40 4" />
        </g>
      </svg>
    `
    stage.style.position = 'fixed'
    cup.style.position = 'relative'
    cup.appendChild(steam)
    steam.animate(
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 0.7, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-12px)' },
      ],
      { duration: 1800, iterations: 2, easing: 'ease-in-out', fill: 'forwards' }
    )

    await fx.sleep(2400)
    teapot.animate(
      [{ transform: 'rotate(-22deg)' }, { transform: 'rotate(0)' }],
      { duration: 480, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
    )
    await fx.sleep(600)
    await Promise.all([fx.fadeOut(stage), fx.fadeOut(dim)])
    fx.clearOverlay(200)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * ISBN — barcode scanner line sweeps with beeps, then an ISBN appears.
 * ───────────────────────────────────────────────────────────────── */
const ISBN_SCANNER: Egg = {
  id: 'isbn',
  name: 'ISBN Scanner',
  description:
    'A barcode scanner line sweeps the page with synthesized beeps, then assigns an ISBN-13.',
  category: 'keystroke',
  trigger: 'Type "ISBN"',
  async activate(ctx) {
    ctx.log('Scanning for ISBN-13 candidate…')
    const beepTimes = [0.15, 0.32, 0.55, 0.78]
    const { animation } = fx.scanLine({
      direction: 'vertical',
      color: '#dc2626',
      duration: 2000,
      thickness: 2,
      onProgress: p => {
        if (beepTimes.some(t => Math.abs(t - p) < 0.02)) {
          fx.beep({ freq: 1100, duration: 50, volume: 0.05, type: 'square' })
        }
      },
    })

    await animation.finished

    // Generate a valid ISBN-13 (978 prefix + 12 digits + checksum)
    const prefix = '978'
    const regGroup = ['0', '1', '2', '3', '4', '5', '91'][Math.floor(Math.random() * 7)]
    const publisher = String(100 + Math.floor(Math.random() * 899))
    const title = String(1000 + Math.floor(Math.random() * 8999))
    const first12 = `${prefix}${regGroup}${publisher}${title}`.slice(0, 12).padEnd(12, '0')
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += parseInt(first12[i], 10) * (i % 2 === 0 ? 1 : 3)
    }
    const checksum = (10 - (sum % 10)) % 10
    const isbn = `${prefix}-${regGroup}-${publisher}-${title}-${checksum}`

    // Render the barcode
    const card = document.createElement('div')
    card.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      background: white; color: #0b0d12;
      padding: 20px 24px;
      border-radius: 8px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.2);
      font-family: ui-monospace, Menlo, monospace;
      opacity: 0;
      pointer-events: auto;
    `
    let bars = ''
    for (let i = 0; i < 50; i++) {
      const w = 1 + Math.floor(Math.random() * 3)
      const black = i % 2 === 0
      bars += `<div style="display:inline-block;width:${w}px;height:80px;background:${black ? '#0b0d12' : '#fff'};"></div>`
    }
    card.innerHTML = `
      <div style="font-size:10px;letter-spacing:0.1em;color:#52525b;margin-bottom:8px;text-transform:uppercase;">ISBN-13</div>
      <div style="display:flex;align-items:flex-end;gap:0;">${bars}</div>
      <div style="margin-top:10px;font-size:18px;font-weight:700;letter-spacing:0.06em;text-align:center;">${isbn}</div>
    `
    fx.overlay().appendChild(card)
    card.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      ],
      { duration: 340, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
    )
    fx.beep({ freq: 1600, duration: 140, volume: 0.06, type: 'square' })

    fx.toast(`ISBN assigned: ${isbn}`, { color: GREEN, duration: 3000 })

    await fx.sleep(3200)
    await fx.fadeOut(card)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * DOI — resolution chain animation.
 * ───────────────────────────────────────────────────────────────── */
const DOI_RESOLVE: Egg = {
  id: 'doi',
  name: 'DOI Resolution Chain',
  description: 'Watch a DOI resolve through doi.org → handle → URL → content.',
  category: 'keystroke',
  trigger: 'Type "DOI"',
  async activate(ctx) {
    ctx.log('Resolving DOI…')
    const card = document.createElement('div')
    card.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: var(--color-bg, #fff);
      color: var(--color-text, #09090b);
      border: 1px solid var(--color-border, #e4e4e7);
      border-radius: 12px;
      padding: 24px 30px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      font-family: ui-monospace, Menlo, monospace;
      font-size: 14px;
      min-width: 420px;
      pointer-events: auto;
    `
    fx.overlay().appendChild(card)
    fx.fadeInUp(card, { duration: 280 })

    const steps = [
      { label: 'DOI', value: '10.48144/pubid_2026', color: WARM },
      { label: 'doi.org', value: 'https://doi.org/10.48144/pubid_2026', color: ACCENT },
      { label: 'handle', value: 'hdl:10.48144/pubid_2026', color: ACCENT_2 },
      { label: 'URL', value: 'https://pubid.github.io/specs/urn', color: ACCENT_2 },
      { label: 'content', value: 'URN: urn:iso:std:iso:8601:-1:ed-1:en', color: GREEN },
    ]
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      const row = document.createElement('div')
      row.style.cssText = `
        margin-top: ${i === 0 ? 0 : 8}px;
        opacity: 0; transform: translateX(-8px);
        display: flex; gap: 12px; align-items: baseline;
      `
      row.innerHTML = `
        <span style="display:inline-block;min-width:64px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${step.color};">${step.label}</span>
        <span style="font-family:inherit;color:var(--color-text-2,#52525b);">${step.value}</span>
      `
      card.appendChild(row)
      row.animate(
        [{ opacity: 0, transform: 'translateX(-8px)' }, { opacity: 1, transform: 'translateX(0)' }],
        { duration: 240, fill: 'forwards', easing: 'cubic-bezier(0.22,1,0.36,1)' }
      )
      fx.beep({ freq: 600 + i * 100, duration: 50, volume: 0.04 })
      await fx.sleep(360)
    }

    await fx.sleep(800)

    const final = document.createElement('div')
    final.style.cssText = `
      margin-top: 16px; padding-top: 14px;
      border-top: 1px solid var(--color-border-subtle, #f0f0f2);
      color: ${GREEN}; font-weight: 700;
      font-family: ui-sans-serif, system-ui, sans-serif;
      font-size: 16px;
      opacity: 0;
    `
    final.textContent = '✓ Resolved'
    card.appendChild(final)
    final.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 360, fill: 'forwards' })
    fx.confetti({
      originX: window.innerWidth / 2,
      originY: window.innerHeight / 2,
      spread: Math.PI * 1.4,
      count: 50,
    })

    await fx.sleep(2400)
    await fx.fadeOut(card)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * ISO 27001 — ISMS security lockdown.
 * ───────────────────────────────────────────────────────────────── */
const ISO_27001: Egg = {
  id: 'iso27001',
  name: 'ISMS Lockdown',
  description:
    'A green border wraps the viewport, a padlock drops into the header, and every link briefly gets a lock icon.',
  category: 'keystroke',
  trigger: 'Type "ISO 27001"',
  async activate(ctx) {
    ctx.log('ISO/IEC 27001:2022 — ISMS engaged.')
    const frame = fx.lockdownFrame({ color: GREEN, duration: 700 })

    // Padlock in header
    const lock = document.createElement('div')
    lock.style.cssText = `
      display: inline-flex; align-items: center;
      padding: 3px 10px;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px; font-weight: 600;
      color: ${GREEN};
      background: rgba(52, 211, 153, 0.1);
      border: 1px solid rgba(52, 211, 153, 0.35);
      border-radius: 999px;
      opacity: 0;
    `
    lock.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      SECURE
    `
    const header = document.querySelector('header nav') || document.querySelector('header')
    header?.appendChild(lock)
    lock.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], {
      duration: 360,
      easing: 'cubic-bezier(0.34,1.56,0.64,1)',
      fill: 'forwards',
    })

    // Glow every link
    const links = Array.from(document.querySelectorAll('main a, article a')).slice(0, 14)
    links.forEach((link, i) => {
      setTimeout(() => fx.glow(link, { color: GREEN, duration: 900 }), i * 60)
    })

    fx.toast('ISO/IEC 27001:2022 ISMS · Certified', { color: GREEN, duration: 2600 })

    await fx.sleep(5800)
    lock.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, fill: 'forwards' }).onfinish =
      () => lock.remove()
    fx.fadeOut(frame, 300)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * W3C — validation sweep.
 * ───────────────────────────────────────────────────────────────── */
const W3C_VALIDATION: Egg = {
  id: 'w3c',
  name: 'Validation Sweep',
  description:
    'A scan line sweeps top-to-bottom; each element it passes briefly gets a green ✓. Ends with a "VALID PubID 1.0" badge.',
  category: 'keystroke',
  trigger: 'Type "W3C"',
  async activate(ctx) {
    ctx.log('W3C validator running…')
    const targets = Array.from(
      document.querySelectorAll('main h1, main h2, main h3, main p, main li, main code, main pre')
    ).slice(0, 28)

    const { animation } = fx.scanLine({
      direction: 'vertical',
      color: GREEN,
      duration: 2600,
      thickness: 3,
    })

    const checkEls: HTMLElement[] = []
    targets.forEach(t => {
      const rect = t.getBoundingClientRect()
      const check = document.createElement('div')
      check.textContent = '✓'
      check.style.cssText = `
        position: fixed;
        left: ${rect.right - 22}px;
        top: ${rect.top + 2}px;
        width: 18px; height: 18px;
        display: grid; place-items: center;
        color: ${GREEN};
        font-family: ui-monospace, Menlo, monospace;
        font-size: 12px; font-weight: 700;
        opacity: 0; pointer-events: none; z-index: 9999;
      `
      fx.overlay().appendChild(check)
      checkEls.push(check)
      const targetMid = rect.top + rect.height / 2
      const observer = setInterval(() => {
        if (!check.isConnected) {
          clearInterval(observer)
          return
        }
        const lineY = (Number(animation.currentTime ?? 0) / 2600) * window.innerHeight
        if (lineY >= targetMid && check.style.opacity === '0') {
          check.animate(
            [
              { opacity: 0, transform: 'translateY(-6px) scale(0.5)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' },
            ],
            { duration: 280, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
          )
          check.style.opacity = '1'
          clearInterval(observer)
        }
      }, 30)
    })

    await animation.finished
    await fx.sleep(500)

    const stamp = document.createElement('div')
    stamp.innerHTML = `
      <svg viewBox="0 0 200 80" width="240" height="96">
        <rect x="2" y="2" width="196" height="76" fill="none" stroke="${GREEN}" stroke-width="2" rx="4"/>
        <text x="100" y="32" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="13" font-weight="700" fill="${GREEN}" letter-spacing="2">W3C · VALID</text>
        <text x="100" y="58" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="22" font-weight="700" fill="${GREEN}">PubID 1.0</text>
      </svg>
    `
    stamp.style.cssText = `
      position: fixed; bottom: 28px; right: 28px;
      opacity: 0; transform: translateY(20px);
      pointer-events: none;
    `
    fx.overlay().appendChild(stamp)
    stamp.animate(
      [
        { opacity: 0, transform: 'translateY(20px) rotate(-2deg)' },
        { opacity: 1, transform: 'translateY(0) rotate(-2deg)' },
      ],
      { duration: 420, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
    )
    fx.beep({ freq: 880, duration: 90, type: 'sine', volume: 0.05 })
    fx.beep({ freq: 1100, duration: 110, delay: 130, type: 'sine', volume: 0.05 })

    await fx.sleep(3200)
    checkEls.forEach(c => fx.fadeOut(c, 200))
    await fx.fadeOut(stamp, 300)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * Mouse trail (toggleable) — leaves identifier fragments as you move.
 * ───────────────────────────────────────────────────────────────── */
let _trailActive = false
let _trailLastSpawn = 0

function isTrailActive() {
  return _trailActive
}

function toggleTrail(on?: boolean) {
  _trailActive = on === undefined ? !_trailActive : on
  if (_trailActive) {
    fx.toast('Mouse trail enabled · pubid.trail(false) to disable', {
      color: ACCENT,
      duration: 1800,
    })
  } else {
    fx.toast('Mouse trail disabled.', { color: ACCENT_2, duration: 1200 })
  }
  return _trailActive
}

function bindTrailHandler() {
  if ((document as unknown as { _eggTrail?: boolean })._eggTrail) return
  ;(document as unknown as { _eggTrail?: boolean })._eggTrail = true
  document.addEventListener('mousemove', e => {
    if (!_trailActive) return
    const now = Date.now()
    if (now - _trailLastSpawn < 50) return
    _trailLastSpawn = now
    fx.floatingFragment({
      x: e.clientX + (Math.random() - 0.5) * 14,
      y: e.clientY + 4,
      size: 10 + Math.random() * 4,
      color: 'rgba(41, 120, 161, 0.7)',
      duration: 900,
    })
  })
}

const MOUSE_TRAIL: Egg = {
  id: 'mouse-trail',
  name: 'Mouse Trail',
  description: 'Identifier fragments follow your cursor. Toggle with pubid.trail().',
  category: 'console',
  trigger: 'pubid.trail() or type "trail"',
  activate() {
    bindTrailHandler()
    toggleTrail()
  },
}

/* ─────────────────────────────────────────────────────────────────
 * Idle fragments — after 45s of no input, fragments start drifting up.
 * ───────────────────────────────────────────────────────────────── */
let _idleTimer: number | undefined
let _idleActive = false
const IDLE_MS = 45000

function cancelIdle() {
  if (_idleTimer) window.clearTimeout(_idleTimer)
  _idleActive = false
  _idleTimer = window.setTimeout(triggerIdle, IDLE_MS)
}

function triggerIdle() {
  if (_idleActive) return
  _idleActive = true
  const stop = () => {
    _idleActive = false
    document.removeEventListener('mousedown', stop)
    document.removeEventListener('keydown', stop)
    document.removeEventListener('scroll', stop)
    cancelIdle()
  }
  document.addEventListener('mousedown', stop, { once: true })
  document.addEventListener('keydown', stop, { once: true })
  document.addEventListener('scroll', stop, { once: true, passive: true })

  let spawned = 0
  const interval = window.setInterval(() => {
    if (!_idleActive) {
      window.clearInterval(interval)
      return
    }
    fx.floatingFragment({ size: 11 + Math.random() * 4, duration: 6000 + Math.random() * 2000 })
    spawned++
    if (spawned > 200) window.clearInterval(interval)
  }, 600)
}

const IDLE_FRAGMENTS: Egg = {
  id: 'idle-fragments',
  name: 'Idle Fragments',
  description: 'After 45 seconds of inactivity, identifier fragments drift upward from the bottom of the page.',
  category: 'temporal',
  trigger: 'Wait 45 seconds without input',
  activate(ctx) {
    bindIdleHandler()
    ctx.log('Idle detection armed (45s).')
  },
}

function bindIdleHandler() {
  if ((document as unknown as { _eggIdle?: boolean })._eggIdle) return
  ;(document as unknown as { _eggIdle?: boolean })._eggIdle = true
  document.addEventListener('mousedown', cancelIdle, { passive: true })
  document.addEventListener('keydown', cancelIdle, { passive: true })
  document.addEventListener('scroll', cancelIdle, { passive: true })
  cancelIdle()
}

/* ─────────────────────────────────────────────────────────────────
 * Tea time (auto-badge at 4pm local) — HTCPCP.
 * ───────────────────────────────────────────────────────────────── */
const TEA_TIME: Egg = {
  id: 'tea-time',
  name: 'Tea Time',
  description:
    'At 4pm local time, a teapot badge appears in the header. Click it to trigger the HTCPCP egg.',
  category: 'temporal',
  trigger: 'Visit around 16:00 local time',
  activate(ctx) {
    const header = document.querySelector('header nav') || document.querySelector('header')
    if (!header || document.getElementById('tea-badge')) return
    const badge = document.createElement('button')
    badge.id = 'tea-badge'
    badge.title = 'HTCPCP — RFC 2324 (click for tea)'
    badge.style.cssText = `
      display: inline-flex; align-items: center;
      padding: 4px 10px;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px; font-weight: 600;
      color: ${WARM};
      background: rgba(218, 157, 118, 0.12);
      border: 1px solid rgba(218, 157, 118, 0.4);
      border-radius: 999px;
      cursor: pointer;
      opacity: 0;
    `
    badge.innerHTML = `☕ Tea time`
    header.appendChild(badge)
    badge.animate(
      [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 420, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
    )
    badge.addEventListener('click', () => ctx.fire('rfc2324'))
    ctx.log('Tea time! (RFC 2324 HTCPCP)')
  },
}

function isCurrentlyTeaTime() {
  const now = new Date()
  const minutes = now.getHours() * 60 + now.getMinutes()
  return minutes >= 930 && minutes <= 1020 // 15:30 – 17:00
}

/* ─────────────────────────────────────────────────────────────────
 * Console-only eggs: joke, fact, ascii, cow, parse, uuid
 * ───────────────────────────────────────────────────────────────── */
const JOKES = [
  'Why did the WD cross the road? It hadn’t yet — it was still in committee.',
  'I’d tell you a UDP joke, but you might not get it.',
  'How many standards-body delegates does it take to change a lightbulb? They’re still balloting.',
  'ISO 9001 walked into a bar. The bar was immediately certified.',
  'Why did the publisher break up with the copublisher? Irreconcilable corrigenda.',
  'A Working Draft, a Committee Draft, and a Final Draft walk into a bar. The bartender asks: "Is this a DIS?"',
  'Why don’t standards ever get lost? They always have an ISBN.',
  'I tried to write a TCP joke. I kept wanting to repeat the punchline.',
  'A pigeon walks into a bar with a datagram under its wing. The bartender says "We don’t serve your kind here." The pigeon says "Suit yourself — RFC 1149 says I’m a valid carrier."',
  'Why did the floating-point number go to therapy? It had NaN issues.',
]

const FACTS = [
  'ISO is not an acronym — it derives from the Greek "isos" (equal).',
  'The first RFC was written in 1969 on a paper towel by Steve Crocker.',
  'RFC 1149 (IP over Avian Carrier) was actually tested with real pigeons. Latency: ~1h 47min for 16MB.',
  'ISBN-13 checksums use modulo-10 with alternating weights of 1 and 3.',
  'IEEE 754 (1985) earned William Kahan the Turing Award.',
  'ISO 8601 was first published in 1988 — the only date format immune to the Y2K problem.',
  'The shortest ISO standard is ISO 639 (language codes). The longest? Probably ISO 9001.',
  'URN namespaces are registered with IANA, the same body that manages TLDs.',
  'The first website (info.cern.ch, 1991) is still online and still passes W3C validation.',
  'World Standards Day is October 14 — the anniversary of the first World Standards Assembly in 1946.',
]

const ASCII_ART = `
██████╗ ██╗   ██╗████████╗██╗  ██╗
██╔══██╗╚██╗ ██╔╝╚══██╔══╝██║  ██║
██████╔╝ ╚████╔╝    ██║   ███████║
██╔═══╝  ╚██╔╝     ██║   ██╔══██║
██║       ██║      ██║   ██║  ██║
╚═╝       ╚═╝      ╚═╝   ╚═╝  ╚═╝`

function cowsay(msg = 'PubID is universal') {
  const top = ' ' + '_'.repeat(msg.length + 2)
  const bot = ' ' + '-'.repeat(msg.length + 2)
  return `${top}\n< ${msg} >\n${bot}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
}

const PARSE_RE = new RegExp(
  '^(ISO|IEC|IEEE|NIST|IETF|W3C|OASIS|ITU|BSI|ANSI|XSF|BIPM|ECMA|OGC|3GPP|CC|CalConnect)' +
    '(?:[/\\s]([A-Z]+))?' +
    '(?:[\\s/]+([A-Za-z]+))?' +
    '[\\s/-]?' +
    '(\\d+(?:[.-]\\d+)*)' +
    '(?::(\\d{4}))?' +
    '(?:/([A-Za-z]+\\s*\\d+(?::\\d{4})?))?',
  'i'
)

function parseIdentifier(input: string) {
  const m = input.match(PARSE_RE)
  if (!m) return { ok: false, input }
  const publisher = m[1].toUpperCase()
  const copublisher = m[2] ? m[2].toUpperCase() : undefined
  const stage = ['WD', 'CD', 'DIS', 'FDIS', 'IS', 'Amd', 'Cor'].includes(
    (m[3] || '').toUpperCase()
  )
    ? m[3].toUpperCase()
    : undefined
  const number = m[4]
  const year = m[5]
  const supplement = m[6]
  const urn = `urn:${publisher.toLowerCase()}:std:${publisher.toLowerCase()}${copublisher ? `-${copublisher.toLowerCase()}` : ''}:${number.replace(/[/-]/g, '-')}${year ? `:${year}` : ''}${supplement ? `:${supplement.toLowerCase().replace(/\s+/g, '')}` : ''}`
  return {
    ok: true,
    input,
    components: { publisher, copublisher, stage, number, year, supplement },
    urn,
  }
}

function uuid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback RFC4122 v4
  const hex = [...Array(36)].map((_, i) => {
    if (i === 8 || i === 13 || i === 18 || i === 23) return '-'
    if (i === 14) return '4'
    if (i === 19) return (Math.random() * 4 | 0 | 8).toString(16)
    return ((Math.random() * 16) | 0).toString(16)
  })
  return hex.join('')
}

const JOKE: Egg = {
  id: 'joke',
  name: 'Standards Joke',
  description: 'A random standards-themed joke.',
  category: 'console',
  trigger: 'pubid.joke()',
  activate() {
    // eslint-disable-next-line no-console
    console.log(
      '%c' + JOKES[Math.floor(Math.random() * JOKES.length)],
      'font-family:ui-serif,Georgia,serif;font-style:italic;color:#52525b'
    )
  },
}

const FACT: Egg = {
  id: 'fact',
  name: 'Random Fact',
  description: 'A random PubID/standards-world fact.',
  category: 'console',
  trigger: 'pubid.fact()',
  activate() {
    // eslint-disable-next-line no-console
    console.log(
      '%cFact · %c' + FACTS[Math.floor(Math.random() * FACTS.length)],
      `color:${ACCENT};font-weight:700`,
      'color:inherit'
    )
  },
}

const ASCII: Egg = {
  id: 'ascii',
  name: 'ASCII Logo',
  description: 'Renders the PubID wordmark as ASCII art in the console.',
  category: 'console',
  trigger: 'pubid.ascii()',
  activate() {
    // eslint-disable-next-line no-console
    console.log(`%c${ASCII_ART}`, `color:${ACCENT};font-family:ui-monospace,Menlo,monospace;font-weight:700`)
  },
}

const COW: Egg = {
  id: 'cow',
  name: 'Cowsay',
  description: 'A PubID-themed cowsay.',
  category: 'console',
  trigger: 'pubid.cow()',
  activate() {
    // eslint-disable-next-line no-console
    console.log(`%c${cowsay()}`, `color:${ACCENT_2};font-family:ui-monospace,Menlo,monospace`)
  },
}

const PARSE: Egg = {
  id: 'parse',
  name: 'Parse Identifier',
  description: 'Parse an identifier into its PubID components.',
  category: 'console',
  trigger: 'pubid.parse("ISO 9001:2015")',
  activate() {
    // eslint-disable-next-line no-console
    console.log('pubid.parse(id) → parse a PubID string.')
  },
}

const UUID_EGG: Egg = {
  id: 'uuid',
  name: 'UUID',
  description: 'Generate a UUID.',
  category: 'console',
  trigger: 'pubid.uuid()',
  activate() {
    // eslint-disable-next-line no-console
    console.log(uuid())
  },
}

export const EGGS_EXTRA: Egg[] = [
  ISO_8601,
  IEEE_754,
  RFC_2324_TEAPOT,
  ISBN_SCANNER,
  DOI_RESOLVE,
  ISO_27001,
  W3C_VALIDATION,
  MOUSE_TRAIL,
  IDLE_FRAGMENTS,
  TEA_TIME,
  JOKE,
  FACT,
  ASCII,
  COW,
  PARSE,
  UUID_EGG,
]

export const EXTRA_HELPERS = {
  isTrailActive,
  toggleTrail,
  bindTrailHandler,
  bindIdleHandler,
  isCurrentlyTeaTime,
  parseIdentifier,
  uuid,
  cowsay,
  asciiArt: ASCII_ART,
  jokes: JOKES,
  facts: FACTS,
}
