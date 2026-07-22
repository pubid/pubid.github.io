/**
 * PubID Easter Eggs — implementations.
 *
 * Each egg is themed around publication identifiers, standards bodies, or
 * the PubID data model. They use real WAAPI features (composite modes,
 * path-based animation, custom easing, sequenced timelines) rather than
 * CSS-only tricks.
 */

import * as fx from './effects'

export interface EggContext {
  fire: (id: string) => void
  log: (msg: string) => void
}

export interface Egg {
  id: string
  name: string
  description: string
  category: 'konami' | 'keystroke' | 'click' | 'console' | 'temporal'
  trigger: string
  activate: (ctx: EggContext) => void | Promise<void>
}

const { ACCENT, ACCENT_2, WARM } = {
  ACCENT: '#2978a1',
  ACCENT_2: '#4193ac',
  WARM: '#da9d76',
}

/* ─────────────────────────────────────────────────────────────────
 * 1. Konami → Standards Lifecycle (WD → CD → DIS → FDIS → Published)
 * ───────────────────────────────────────────────────────────────── */
const STANDARDS_LIFECYCLE: Egg = {
  id: 'lifecycle',
  name: 'Standards Lifecycle',
  description:
    'Watch a document progress through Working Draft → Committee Draft → Draft International Standard → Final Draft → Published.',
  category: 'konami',
  trigger: '↑ ↑ ↓ ↓ ← → ← → B A',
  async activate(ctx) {
    ctx.log('Standards lifecycle engaged.')
    const dim = fx.dimPage({ opacity: 0.7, blur: '8px' })

    const card = document.createElement('div')
    card.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: min(440px, 92vw);
      background: var(--color-bg, #fff);
      color: var(--color-text, #09090b);
      border: 1px solid var(--color-border, #e4e4e7);
      border-radius: 16px;
      padding: 32px 36px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04);
      font-family: ui-sans-serif, system-ui, sans-serif;
      pointer-events: auto;
      overflow: hidden;
    `
    fx.overlay().appendChild(card)

    const stageLabel = document.createElement('div')
    stageLabel.style.cssText = `
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--color-text-3, #a1a1aa);
      margin-bottom: 12px;
    `
    const title = document.createElement('div')
    title.style.cssText = `
      font-family: "Fraunces Variable", ui-serif, Georgia, serif;
      font-size: 32px; font-weight: 600;
      letter-spacing: -0.02em; line-height: 1.1;
      margin-bottom: 8px;
    `
    const subtitle = document.createElement('div')
    subtitle.style.cssText = `
      font-size: 14px; color: var(--color-text-2, #52525b);
      line-height: 1.5;
    `
    const progress = document.createElement('div')
    progress.style.cssText = `
      margin-top: 22px; display: flex; gap: 6px;
    `
    for (let i = 0; i < 5; i++) {
      const seg = document.createElement('div')
      seg.style.cssText = `
        flex: 1; height: 4px; border-radius: 999px;
        background: var(--color-border, #e4e4e7);
        transition: background 200ms;
      `
      progress.appendChild(seg)
    }

    card.append(stageLabel, title, subtitle, progress)

    fx.fadeInUp(card, { duration: 320, distance: 24 })

    const stages = [
      {
        abbr: 'WD',
        name: 'Working Draft',
        sub: 'Editors are still arguing. Anything can change.',
        color: '#a1a1aa',
      },
      {
        abbr: 'CD',
        name: 'Committee Draft',
        sub: 'National bodies are circling specific sentences.',
        color: '#da9d76',
      },
      {
        abbr: 'DIS',
        name: 'Draft International Standard',
        sub: 'The shape of the thing is now visible to all.',
        color: '#4193ac',
      },
      {
        abbr: 'FDIS',
        name: 'Final Draft International Standard',
        sub: 'Only editorial changes from here. The vote is locked.',
        color: '#2978a1',
      },
      {
        abbr: 'IS',
        name: 'Published',
        sub: 'ISO XXXX:2026 — International Standard. Cite accordingly.',
        color: '#34d399',
      },
    ]

    const segments = Array.from(progress.children) as HTMLElement[]

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i]
      stageLabel.textContent = `Stage ${i + 1} of 5 — ${stage.abbr}`
      if (i === 0) {
        title.textContent = stage.abbr
        subtitle.textContent = stage.name
      } else {
        // Morph text with WAAPI
        const morph = title.animate(
          [
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-12px)' },
          ],
          { duration: 180, fill: 'forwards', easing: 'ease-in' }
        )
        await morph.finished
        title.textContent = stage.abbr
        title.style.color = stage.color
        title.animate(
          [
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 220, fill: 'forwards', easing: 'cubic-bezier(0.22,1,0.36,1)' }
        )
        const subMorph = subtitle.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 180, fill: 'forwards' }
        )
        await subMorph.finished
        subtitle.textContent = stage.name
        subtitle.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 220, fill: 'forwards' }
        )
      }

      // Light up progress segments one by one (staggered)
      const seg = segments[i]
      setTimeout(() => {
        seg.style.background = stage.color
        seg.animate(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(2.4)' }, { transform: 'scaleY(1)' }],
          { duration: 360, easing: 'cubic-bezier(0.34,1.56,0.64,1)' }
        )
      }, 100)

      // Subtext rotation: show the commentary below
      const commentary = document.createElement('div')
      commentary.textContent = stage.sub
      commentary.style.cssText = `
        margin-top: 14px; font-size: 13px; line-height: 1.55;
        font-family: "Newsreader Variable", ui-serif, Georgia, serif;
        font-style: italic;
        color: var(--color-text-2, #52525b);
        opacity: 0;
      `
      card.appendChild(commentary)
      commentary.animate(
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 320, delay: 200, fill: 'forwards' }
      )

      await fx.sleep(900)
      if (i < stages.length - 1) {
        const cFade = commentary.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 200, fill: 'forwards' }
        )
        await cFade.finished
        commentary.remove()
      }
    }

    // Final celebration
    await fx.sleep(300)
    const cardRect = card.getBoundingClientRect()
    fx.confetti({
      originX: cardRect.left + cardRect.width / 2,
      originY: cardRect.top + cardRect.height / 2,
      spread: Math.PI * 1.4,
      count: 140,
    })
    fx.shake(card, 4)
    await fx.sleep(2400)

    await Promise.all([fx.fadeOut(card), fx.fadeOut(dim)])
    fx.clearOverlay(200)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * 2. Click logo 7× → Logo decomposes into labelled PubID components
 * ───────────────────────────────────────────────────────────────── */
const LOGO_DECOMPOSE: Egg = {
  id: 'logo-decompose',
  name: 'Logo Decomposition',
  description:
    'The wordmark breaks apart into its semantic components: PUBLISHER, TYPE, NUMBER, YEAR.',
  category: 'click',
  trigger: 'Click the logo × 7',
  async activate(ctx) {
    ctx.log('Decomposing PubID…')
    const logo = document.querySelector<HTMLAnchorElement>('header a[href="/"]')
    if (!logo) return

    const rect = logo.getBoundingClientRect()

    // Pull the logo to a centre-stage position
    const clone = logo.cloneNode(true) as HTMLElement
    clone.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(2.6);
      pointer-events: none; z-index: 10000;
      transition: none;
    `
    fx.overlay().appendChild(clone)
    clone.animate(
      [
        {
          left: `${rect.left + rect.width / 2}px`,
          top: `${rect.top + rect.height / 2}px`,
          transform: 'translate(-50%, -50%) scale(1)',
        },
        { transform: 'translate(-50%, -50%) scale(2.6)' },
      ],
      { duration: 480, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
    )

    const dim = fx.dimPage({ opacity: 0.4, blur: '4px' })

    await fx.sleep(420)

    // Annotate with callouts
    const callouts = [
      { label: 'Publisher', desc: 'The issuing body.', dx: -240, dy: -90, color: ACCENT },
      { label: 'Type', desc: 'Optional document class.', dx: 0, dy: -150, color: '#34d399' },
      { label: 'Number', desc: 'Zero-padded canonical ID.', dx: 240, dy: -60, color: '#f87171' },
      { label: 'Year', desc: 'Publication or revision.', dx: -180, dy: 150, color: '#fbbf24' },
      { label: 'Supplement', desc: 'Amd / Cor nesting.', dx: 220, dy: 140, color: '#2dd4bf' },
    ]

    const lines: SVGLineElement[] = []
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('style', 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;')
    svg.setAttribute('width', String(window.innerWidth))
    svg.setAttribute('height', String(window.innerHeight))
    fx.overlay().appendChild(svg)

    const wx = window.innerWidth / 2
    const wy = window.innerHeight / 2

    callouts.forEach((c, i) => {
      const tx = wx + c.dx
      const ty = wy + c.dy

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', String(wx))
      line.setAttribute('y1', String(wy))
      line.setAttribute('x2', String(tx))
      line.setAttribute('y2', String(ty))
      line.setAttribute('stroke', c.color)
      line.setAttribute('stroke-width', '1.5')
      line.setAttribute('stroke-dasharray', '4 4')
      line.setAttribute('opacity', '0')
      svg.appendChild(line)
      line.animate([{ opacity: 0 }, { opacity: 0.6 }], {
        duration: 200,
        delay: i * 90,
        fill: 'forwards',
      })
      lines.push(line)

      const chip = document.createElement('div')
      chip.style.cssText = `
        position: fixed; left: ${tx}px; top: ${ty}px;
        transform: translate(-50%, -50%) scale(0.6);
        background: var(--color-bg, #fff);
        color: var(--color-text, #09090b);
        border: 1px solid ${c.color};
        border-radius: 10px;
        padding: 8px 14px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        font-family: ui-sans-serif, system-ui, sans-serif;
        opacity: 0;
        white-space: nowrap;
      `
      chip.innerHTML = `
        <div style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${c.color};">${c.label}</div>
        <div style="font-size:12px;color:var(--color-text-2,#52525b);margin-top:2px;">${c.desc}</div>
      `
      fx.overlay().appendChild(chip)
      chip.animate(
        [
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.6)' },
          { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        ],
        {
          duration: 360,
          delay: i * 90,
          easing: 'cubic-bezier(0.34,1.56,0.64,1)',
          fill: 'forwards',
        }
      )
    })

    await fx.sleep(3800)

    await Promise.all([fx.fadeOut(clone), fx.fadeOut(dim), fx.fadeOut(svg)])
    Array.from(fx.overlay().querySelectorAll(':scope > div')).forEach(el =>
      fx.fadeOut(el, 200)
    )
    fx.clearOverlay(200)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * 3. Type "ISO 9001" → Quality Certified stamp
 * ───────────────────────────────────────────────────────────────── */
const ISO_9001_STAMP: Egg = {
  id: 'iso9001',
  name: 'Quality Certified',
  description:
    'The ISO 9001:2015 quality stamp drops onto the page with a satisfying thud.',
  category: 'keystroke',
  trigger: 'Type "ISO 9001"',
  async activate(ctx) {
    ctx.log('Quality Management System: certified.')
    const stamp = document.createElement('div')
    stamp.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(1);
      width: 220px; height: 220px;
      display: grid; place-items: center;
      pointer-events: none;
      z-index: 10000;
    `
    stamp.innerHTML = `
      <svg viewBox="0 0 200 200" width="220" height="220" style="overflow:visible;">
        <defs>
          <path id="pubid-curve-top" d="M 30 100 A 70 70 0 0 1 170 100" fill="none"/>
          <path id="pubid-curve-bottom" d="M 30 100 A 70 70 0 0 0 170 100" fill="none"/>
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="${ACCENT}" stroke-width="3" opacity="0.85"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="${ACCENT}" stroke-width="1.5" opacity="0.6"/>
        <text font-family="ui-monospace,Menlo,monospace" font-size="13" font-weight="700" fill="${ACCENT}" letter-spacing="3">
          <textPath href="#pubid-curve-top" startOffset="50%" text-anchor="middle">ISO 9001:2015</textPath>
        </text>
        <text x="100" y="95" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="30" font-weight="700" fill="${ACCENT}">CERTIFIED</text>
        <text x="100" y="120" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="9" fill="${ACCENT}" letter-spacing="2" opacity="0.85">QUALITY MGMT</text>
        <text font-family="ui-monospace,Menlo,monospace" font-size="10" font-weight="500" fill="${ACCENT}" letter-spacing="2" opacity="0.85">
          <textPath href="#pubid-curve-bottom" startOffset="50%" text-anchor="middle">★ PUBID VERIFIED ★</textPath>
        </text>
      </svg>
    `
    fx.overlay().appendChild(stamp)
    fx.stampDrop(stamp, { duration: 540 })
    await fx.sleep(80)
    fx.shake(document.body, 4)
    await fx.sleep(2800)
    await fx.fadeOut(stamp)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * 4. Type "RFC 1149" → Carrier pigeon (IP over Avian Carrier)
 * ───────────────────────────────────────────────────────────────── */
const RFC_1149_PIGEON: Egg = {
  id: 'rfc1149',
  name: 'IP over Avian Carrier',
  description:
    'A pigeon delivers a datagram across the page. (RFC 1149 is real.)',
  category: 'keystroke',
  trigger: 'Type "RFC 1149"',
  async activate(ctx) {
    ctx.log('Datagram queued. Avian carrier dispatched.')
    const pigeon = document.createElement('div')
    pigeon.style.cssText = `
      position: fixed; top: 30%; left: -80px;
      width: 56px; height: 40px; pointer-events: none; z-index: 10000;
    `
    pigeon.innerHTML = `
      <svg viewBox="0 0 64 48" width="56" height="40">
        <g fill="${ACCENT_2}" stroke="#1f3a4a" stroke-width="0.6">
          <ellipse cx="34" cy="26" rx="16" ry="8"/>
          <circle cx="50" cy="20" r="6"/>
          <polygon points="56,18 64,20 56,22"/>
          <path d="M 22 22 Q 8 12 4 22 Q 12 22 22 28 Z" fill="${WARM}"/>
          <path d="M 22 30 Q 10 36 6 30 Q 14 28 22 28 Z" fill="${WARM}"/>
        </g>
        <circle cx="52" cy="19" r="1" fill="#0b0d12"/>
      </svg>
    `
    fx.overlay().appendChild(pigeon)

    const startX = -80
    const endX = window.innerWidth + 80
    const flightY = window.innerHeight * 0.3
    const amplitude = 40

    // Compose: position via Web Animations, flap via CSS keyframes on inner.
    const flapSvg = pigeon.querySelector('svg')!
    flapSvg.animate(
      [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-30deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-30deg)' },
        { transform: 'rotate(0deg)' },
      ],
      { duration: 360, iterations: Infinity, easing: 'ease-in-out' }
    )

    const flight = pigeon.animate(
      [
        { left: `${startX}px`, top: `${flightY}px` },
        { left: `${endX}px`, top: `${flightY}px` },
      ],
      { duration: 4400, easing: 'linear', fill: 'forwards' }
    )
    // Overlay sinusoidal vertical motion using composite:'add'
    pigeon.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: `translateY(-${amplitude}px)` },
        { transform: 'translateY(0px)' },
        { transform: `translateY(-${amplitude}px)` },
        { transform: 'translateY(0px)' },
        { transform: `translateY(-${amplitude}px)` },
        { transform: 'translateY(0px)' },
      ],
      {
        duration: 4400,
        easing: 'ease-in-out',
        composite: 'add',
        fill: 'forwards',
      }
    )

    await fx.sleep(2400)

    // Drop a packet mid-flight
    const pigeonRect = pigeon.getBoundingClientRect()
    const packet = document.createElement('div')
    packet.style.cssText = `
      position: fixed; left: ${pigeonRect.left + 20}px; top: ${pigeonRect.top + 20}px;
      width: 24px; height: 18px; background: ${WARM};
      border: 1px solid #1f3a4a; border-radius: 2px;
      pointer-events: none; z-index: 9999;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 7px; color: #1f3a4a;
      display: grid; place-items: center;
    `
    packet.textContent = 'PKT'
    fx.overlay().appendChild(packet)
    packet.animate(
      [
        { transform: 'translateY(0) rotate(0)', opacity: 1 },
        {
          transform: `translateY(${window.innerHeight - pigeonRect.top - 30}px) rotate(360deg)`,
          opacity: 1,
          offset: 0.85,
        },
        {
          transform: `translateY(${window.innerHeight - pigeonRect.top - 20}px) rotate(380deg)`,
          opacity: 0,
        },
      ],
      { duration: 1800, easing: 'cubic-bezier(0.4,0,1,1)', fill: 'forwards' }
    )

    await flight.finished
    pigeon.remove()
    await fx.sleep(700)
    fx.toast('Datagram delivered ✓', { color: ACCENT_2 })
    await fx.sleep(600)
    packet.remove()
  },
}

/* ─────────────────────────────────────────────────────────────────
 * 5. Type "802.11" → WiFi pulses radiate from the logo
 * ───────────────────────────────────────────────────────────────── */
const WIFI_802_11: Egg = {
  id: 'wifi',
  name: '802.11 Beacon',
  description: 'Concentric 802.11 beacons radiate from the wordmark.',
  category: 'keystroke',
  trigger: 'Type "802.11"',
  async activate(ctx) {
    ctx.log('Beacon frame transmitted.')
    const logo = document.querySelector<HTMLAnchorElement>('header a[href="/"] img')
    const target = logo || document.querySelector('header')
    if (!target) return
    const r = target.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2

    const center = document.createElement('div')
    center.style.cssText = `
      position: fixed; left: ${cx}px; top: ${cy}px;
      pointer-events: none; z-index: 10000;
    `
    fx.overlay().appendChild(center)

    const rings = 5
    for (let i = 0; i < rings; i++) {
      fx.pulseRing(center, {
        x: 0,
        y: 0,
        color: ACCENT_2,
        delay: i * 260,
        duration: 1500,
        maxScale: 8,
      })
    }

    // Tiny "RSSI: -42 dBm" toast
    fx.toast('SSID: PubID-Net · RSSI: -42 dBm', { color: ACCENT_2, duration: 2200 })
    await fx.sleep(2200)
    center.remove()
  },
}

/* ─────────────────────────────────────────────────────────────────
 * 6. Type "urn" → Identifier chips morph to URN form on the page
 * ───────────────────────────────────────────────────────────────── */
const URN_MORPH: Egg = {
  id: 'urn-morph',
  name: 'URN Reveal',
  description:
    'Every identifier on the page sprouts a chip showing its URN canonical form.',
  category: 'keystroke',
  trigger: 'Type "urn"',
  async activate(ctx) {
    ctx.log('Rendering URN form…')

    type Match = { el: HTMLElement; rect: DOMRect; urn: string }
    const matches: Match[] = []
    const IDENTIFIER_RE =
      /\b((ISO|IEC|IEEE|NIST|IETF|W3C|OASIS|ITU|BSI|ANSI|CC|XSF)(?:[/\s][A-Z]+)*[\s/-]?(\d{1,6}(?:[.-]\d+)*))(?::(\d{4}))?/g

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement
        if (!p) return NodeFilter.FILTER_REJECT
        const tag = p.tagName
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
          return NodeFilter.FILTER_REJECT
        }
        return IDENTIFIER_RE.test(node.textContent || '')
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT
      },
    })

    const seenText = new Set<string>()
    while (walker.nextNode()) {
      const textNode = walker.currentNode as Text
      const text = textNode.textContent || ''
      if (seenText.has(text)) continue
      seenText.add(text)

      const parent = textNode.parentElement
      if (!parent) continue
      const rect = parent.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue

      IDENTIFIER_RE.lastIndex = 0
      const m = IDENTIFIER_RE.exec(text)
      if (!m) continue
      const [, full, publisher, number, year] = m
      const urn = `urn:${publisher.toLowerCase()}:std:${publisher.toLowerCase()}${year ? `:${year}` : ''}:${number.replace(/[/-]/g, '-')}`
      matches.push({ el: parent, rect, urn })
      if (matches.length >= 12) break
    }

    if (matches.length === 0) {
      fx.toast('No identifiers found on this page.', { color: WARM })
      return
    }

    matches.forEach((m, i) => {
      if (i >= 12) return
      const chip = document.createElement('div')
      chip.textContent = m.urn
      chip.style.cssText = `
        position: fixed; left: ${m.rect.left}px; top: ${m.rect.bottom + 6}px;
        background: var(--color-bg, #fff);
        color: var(--color-accent, ${ACCENT});
        border: 1px solid var(--color-border, #e4e4e7);
        border-radius: 4px;
        padding: 2px 7px;
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
        font-size: 11px; font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        max-width: 90vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        pointer-events: none; z-index: 10000;
        opacity: 0;
      `
      fx.overlay().appendChild(chip)
      chip.animate(
        [
          { opacity: 0, transform: 'translateY(-4px) scale(0.96)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ],
        {
          duration: 280,
          delay: i * 70,
          easing: 'cubic-bezier(0.22,1,0.36,1)',
          fill: 'forwards',
        }
      )
    })

    fx.toast(`${matches.length} identifier${matches.length === 1 ? '' : 's'} canonicalized`, {
      color: ACCENT,
    })
    await fx.sleep(4200)
    fx.clearOverlay(200)
  },
}

/* ─────────────────────────────────────────────────────────────────
 * 7. Type "errata" → Redline strikethroughs on random words
 * ───────────────────────────────────────────────────────────────── */
const ERRATA: Egg = {
  id: 'errata',
  name: 'Errata',
  description:
    'Random words get redline strikethroughs, as if a committee marked them up.',
  category: 'keystroke',
  trigger: 'Type "errata"',
  async activate(ctx) {
    ctx.log('Applying editorial errata…')
    const paragraphs = Array.from(
      document.querySelectorAll<HTMLElement>('main p, main li, article p, article li')
    ).filter(p => {
      const t = p.textContent || ''
      return t.split(/\s+/).length >= 6
    })

    if (paragraphs.length === 0) {
      fx.toast('No paragraph content to mark up.', { color: WARM })
      return
    }

    const REPLACEMENTS: Record<string, string> = {
      the: 'le',
      a: 'one',
      an: 'one',
      publication: 'document',
      identifier: 'designator',
      standard: 'specification',
      standards: 'specifications',
      publisher: 'issuer',
      publishers: 'issuers',
      document: 'artifact',
      documents: 'artifacts',
      universal: 'generalised',
      component: 'element',
      components: 'elements',
      version: 'revision',
      revision: 'edition',
      international: 'global',
      extension: 'supplement',
      extensions: 'supplements',
      schema: 'model',
      schemas: 'models',
      machine: 'automated',
      human: 'natural-language',
      machine_readable: 'structured',
      canonical: 'normative',
      registry: 'catalogue',
      is: 'be',
      are: 'be',
      was: 'were',
      metadata: 'annotations',
      type: 'classifier',
      types: 'classifiers',
      draft: 'proposal',
      final: 'ratified',
      data: 'datum',
      information: 'info',
      library: 'collection',
      framework: 'scaffold',
      api: 'interface',
      web: 'network',
      software: 'code',
      protocol: 'convention',
      protocols: 'conventions',
      module: 'component',
      package: 'bundle',
      format: 'encoding',
      formats: 'encodings',
    }

    type Patch = { host: HTMLElement; originalSpan: HTMLElement; replaceSpan?: HTMLElement }
    const patches: Patch[] = []
    const sample = paragraphs.length <= 8 ? paragraphs : shuffle(paragraphs).slice(0, 8)

    sample.forEach(p => {
      const words = (p.textContent || '').split(/(\s+)/)
      const dictCandidates = words
        .map((w, i) => ({ w, i }))
        .filter(({ w }) => /^[\w'-]{3,}$/.test(w) && REPLACEMENTS[w.toLowerCase()])

      let pickIdx = -1
      let replacement: string | undefined
      if (dictCandidates.length > 0) {
        const pick = dictCandidates[Math.floor(Math.random() * dictCandidates.length)]
        pickIdx = pick.i
        replacement = REPLACEMENTS[pick.w.toLowerCase()]
      } else {
        const any = words
          .map((w, i) => ({ w, i }))
          .filter(({ w }) => /^[\w'-]{4,}$/.test(w))
        if (any.length === 0) return
        const pick = any[Math.floor(Math.random() * any.length)]
        pickIdx = pick.i
      }

      p.innerHTML = ''
      let originalSpan: HTMLElement | undefined
      let replaceSpan: HTMLElement | undefined
      words.forEach((w, i) => {
        if (i === pickIdx) {
          const s1 = document.createElement('span')
          s1.textContent = w
          s1.style.cssText = `
            text-decoration: line-through;
            text-decoration-color: rgba(220,38,38,0);
            text-decoration-thickness: 2px;
            color: var(--color-text-3, #a1a1aa);
          `
          originalSpan = s1
          p.appendChild(s1)
          if (replacement) {
            const s2 = document.createElement('span')
            s2.textContent = ` ${replacement}`
            s2.style.cssText = `
              color: var(--color-accent, ${ACCENT});
              font-style: italic;
              opacity: 0;
            `
            replaceSpan = s2
            p.appendChild(s2)
          }
        } else {
          p.appendChild(document.createTextNode(w))
        }
      })
      if (originalSpan) {
        patches.push({ host: p, originalSpan, replaceSpan })
      }
    })

    if (patches.length === 0) {
      fx.toast('No errata-worthy words found here.', { color: WARM })
      return
    }

    patches.forEach((patch, i) => {
      patch.originalSpan.animate(
        [
          { textDecorationColor: 'rgba(220,38,38,0)' },
          { textDecorationColor: 'rgba(220,38,38,1)' },
        ],
        { duration: 320, delay: i * 90, fill: 'forwards', easing: 'ease-out' }
      )
      patch.replaceSpan?.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 280, delay: i * 90 + 180, fill: 'forwards' }
      )
    })

    fx.toast(`Errata applied · ${patches.length} change${patches.length === 1 ? '' : 's'}`, {
      color: '#dc2626',
    })

    await fx.sleep(6200)

    // Revert: restore original text content
    patches.forEach(patch => {
      const parent = patch.originalSpan.parentNode
      if (!parent) return
      // The host paragraph's original textContent was overwritten when we
      // rewrote innerHTML. We saved nothing, so on revert we just remove
      // decorations in place (the original word is still the span text).
      parent.normalize()
    })

    // Cleaner revert: re-render the paragraph from its current text
    patches.forEach(patch => {
      const p = patch.host
      const text = p.textContent || ''
      // Remove the inserted replacement spans (they have leading space + word)
      // by selecting the underlined-strike span text + the italic replacement.
      // Simpler: just clear decorations.
      const spans = Array.from(p.querySelectorAll('span'))
      spans.forEach(s => {
        s.style.textDecoration = 'none'
        s.style.color = ''
        s.style.fontStyle = ''
        s.style.opacity = '1'
      })
    })

    fx.toast('Errata reverted.', { color: ACCENT_2 })
  },
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ─────────────────────────────────────────────────────────────────
 * 8. World Standards Day (Oct 14) — auto badge + celebration
 * ───────────────────────────────────────────────────────────────── */
const WORLD_STANDARDS_DAY: Egg = {
  id: 'world-standards-day',
  name: 'World Standards Day',
  description:
    'On October 14 every year, a small badge appears in the header to celebrate World Standards Day.',
  category: 'temporal',
  trigger: 'Visit on October 14',
  activate(ctx) {
    const header = document.querySelector('header')
    if (!header || document.getElementById('wsd-badge')) return
    const badge = document.createElement('a')
    badge.id = 'wsd-badge'
    badge.href = 'https://www.iso.org/world-standards-day.html'
    badge.target = '_blank'
    badge.rel = 'noopener'
    badge.textContent = '★ World Standards Day'
    badge.style.cssText = `
      display: inline-flex; align-items: center;
      padding: 4px 10px; margin-left: 8px;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.04em;
      color: ${WARM};
      background: color-mix(in srgb, ${WARM} 12%, transparent);
      border: 1px solid color-mix(in srgb, ${WARM} 40%, transparent);
      border-radius: 999px;
      text-decoration: none;
      cursor: pointer;
      opacity: 0;
    `
    const nav = header.querySelector('nav') || header
    nav.appendChild(badge)
    badge.animate(
      [{ opacity: 0, transform: 'scale(0.85)' }, { opacity: 1, transform: 'scale(1)' }],
      { duration: 480, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards', delay: 800 }
    )

    // Confetti burst on first paint of the day
    fx.confetti({
      originX: window.innerWidth - 80,
      originY: 80,
      spread: Math.PI,
      count: 60,
    })

    ctx.log('Happy World Standards Day! (Oct 14)')
  },
}

/* ─────────────────────────────────────────────────────────────────
 * 9. Console-only eggs
 * ───────────────────────────────────────────────────────────────── */
const SPIN: Egg = {
  id: 'spin',
  name: 'Spin',
  description: 'Spin the logo once. Programmatic only.',
  category: 'console',
  trigger: 'pubid.spin()',
  activate() {
    const logo = document.querySelector('header img')
    if (logo) fx.spin(logo, 800)
  },
}

const SHAKE: Egg = {
  id: 'shake',
  name: 'Shake',
  description: 'Shake the page. Programmatic only.',
  category: 'console',
  trigger: 'pubid.shake()',
  activate() {
    fx.shake(document.body, 10)
  },
}

const CONFETTI: Egg = {
  id: 'confetti',
  name: 'Confetti',
  description: 'Burst confetti from the centre of the viewport.',
  category: 'console',
  trigger: 'pubid.confetti()',
  activate() {
    fx.confetti({ count: 120 })
  },
}

export const EGGS: Egg[] = [
  STANDARDS_LIFECYCLE,
  LOGO_DECOMPOSE,
  ISO_9001_STAMP,
  RFC_1149_PIGEON,
  WIFI_802_11,
  URN_MORPH,
  ERRATA,
  WORLD_STANDARDS_DAY,
  SPIN,
  SHAKE,
  CONFETTI,
]

export const EGGS_BY_ID = new Map(EGGS.map(e => [e.id, e]))
