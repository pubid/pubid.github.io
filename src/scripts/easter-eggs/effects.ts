/**
 * PubID Easter Eggs — WAAPI primitives and overlay helpers.
 *
 * Every visual effect routes through a single pointer-events:none overlay
 * so easter eggs never block normal interaction. All animations honour
 * prefers-reduced-motion: when the user has reduced motion enabled, effects
 * either no-op or render as a static end-state.
 */

const ACCENT = '#2978a1'
const ACCENT_2 = '#4193ac'
const WARM = '#da9d76'
const PALETTE = [ACCENT, ACCENT_2, WARM, '#fbbf24', '#34d399', '#2dd4bf']

let _overlay: HTMLElement | null = null

export function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia !== 'undefined' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Shared, pointer-events-none overlay that holds all transient effects. */
export function overlay(): HTMLElement {
  if (_overlay && document.body.contains(_overlay)) return _overlay
  const el = document.createElement('div')
  el.id = 'pubid-egg-overlay'
  el.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;'
  document.body.appendChild(el)
  _overlay = el
  return el
}

/** Empty the overlay (called between eggs). */
export function clearOverlay(delayMs = 0) {
  if (!_overlay) return
  setTimeout(() => {
    if (_overlay) _overlay.innerHTML = ''
  }, delayMs)
}

type Style = Record<string, string>

const toKebab = (s: string) => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)

export function makeEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  style: Style | string = {},
  text?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)
  if (typeof style === 'string') {
    el.style.cssText = style
  } else {
    for (const [k, v] of Object.entries(style)) {
      try {
        el.style.setProperty(toKebab(k), v)
      } catch {
        /* ignore unknown css props */
      }
    }
  }
  if (text) el.textContent = text
  return el
}

/** Toast at bottom-center. Auto-dismisses. */
export function toast(
  message: string,
  opts: { duration?: number; color?: string } = {}
) {
  const { duration = 2400, color = ACCENT } = opts
  const el = makeEl(
    'div',
    {
      position: 'fixed',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: 'rgba(15,18,24,0.94)',
      color: '#fafafa',
      padding: '10px 18px',
      borderRadius: '8px',
      fontSize: '13px',
      fontFamily: 'ui-monospace,"SF Mono",Menlo,monospace',
      letterSpacing: '0.04em',
      border: `1px solid ${color}`,
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      pointerEvents: 'auto',
      opacity: '0',
      whiteSpace: 'nowrap',
    },
    message
  )
  overlay().appendChild(el)
  el.animate(
    [
      { opacity: '0', transform: 'translateX(-50%) translateY(20px)' },
      { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
    ],
    { duration: 200, easing: 'ease-out', fill: 'forwards' }
  )
  setTimeout(() => {
    el.animate(
      [
        { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
        { opacity: '0', transform: 'translateX(-50%) translateY(20px)' },
      ],
      { duration: 200, fill: 'forwards' }
    ).onfinish = () => el.remove()
  }, duration)
}

/** Confetti burst from a point. Returns a promise that resolves when all pieces land. */
export function confetti(
  opts: {
    count?: number
    colors?: string[]
    originX?: number
    originY?: number
    spread?: number
  } = {}
): Promise<void> {
  if (prefersReducedMotion()) return Promise.resolve()
  const {
    count = 90,
    colors = PALETTE,
    originX = window.innerWidth / 2,
    originY = window.innerHeight / 2,
    spread = Math.PI * 2,
  } = opts
  const layer = overlay()
  const animations: Animation[] = []
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length]
    const piece = makeEl('div', {
      position: 'absolute',
      left: `${originX}px`,
      top: `${originY}px`,
      width: `${5 + Math.random() * 5}px`,
      height: `${9 + Math.random() * 6}px`,
      background: color,
      borderRadius: '1px',
      opacity: '1',
    })
    layer.appendChild(piece)
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread
    const velocity = 220 + Math.random() * 480
    const tx = Math.cos(angle) * velocity
    const ty = Math.sin(angle) * velocity
    const rot = (Math.random() - 0.5) * 1080
    const fall = window.innerHeight - originY + 200
    const anim = piece.animate(
      [
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        {
          transform: `translate(${tx}px,${ty + fall * 0.4}px) rotate(${rot * 0.5}deg)`,
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: `translate(${tx * 1.1}px,${fall}px) rotate(${rot}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1600 + Math.random() * 1200,
        easing: 'cubic-bezier(0.2,0.6,0.4,1)',
        fill: 'forwards',
      }
    )
    anim.onfinish = () => piece.remove()
    animations.push(anim)
  }
  return Promise.all(animations.map(a => a.finished)).then(() => undefined)
}

/** Screen shake. */
export function shake(target: Element = document.body, intensity = 8) {
  if (prefersReducedMotion()) return
  target.animate(
    [
      { transform: 'translate(0,0)' },
      { transform: `translate(${-intensity}px,${intensity / 2}px)` },
      { transform: `translate(${intensity}px,${-intensity / 2}px)` },
      { transform: `translate(${-intensity * 0.6}px,${intensity * 0.3}px)` },
      { transform: `translate(${intensity * 0.4}px,${-intensity * 0.2}px)` },
      { transform: 'translate(0,0)' },
    ],
    { duration: 420, easing: 'ease-out' }
  )
}

/** Spin around centre. */
export function spin(target: Element, duration = 900) {
  return target.animate(
    [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }],
    { duration, easing: 'cubic-bezier(0.5,0,0.5,1)', fill: 'none' }
  )
}

/** Fade + slide in. */
export function fadeInUp(
  el: Element,
  opts: { delay?: number; duration?: number; distance?: number } = {}
) {
  const { delay = 0, duration = 600, distance = 16 } = opts
  return el.animate(
    [
      { opacity: 0, transform: `translateY(${distance}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    {
      duration,
      delay,
      easing: 'cubic-bezier(0.22,1,0.36,1)',
      fill: 'both',
    }
  )
}

/** Stamp drop with spring overshoot. */
export function stampDrop(
  el: Element,
  opts: { delay?: number; duration?: number; rotate?: number } = {}
) {
  const { delay = 0, duration = 520, rotate = -8 } = opts
  return el.animate(
    [
      {
        opacity: 0,
        transform: `translateY(-80px) scale(2.2) rotate(${rotate - 12}deg)`,
      },
      {
        opacity: 1,
        transform: `translateY(0) scale(1) rotate(${rotate}deg)`,
        offset: 0.65,
      },
      {
        transform: `translateY(-5px) scale(1.07) rotate(${rotate + 1}deg)`,
        offset: 0.82,
      },
      { transform: `translateY(0) scale(1) rotate(${rotate}deg)` },
    ],
    {
      duration,
      delay,
      easing: 'cubic-bezier(0.34,1.56,0.64,1)',
      fill: 'forwards',
    }
  )
}

/** Concentric expanding ring (used by WiFi pulses, etc.). */
export function pulseRing(
  parent: HTMLElement,
  opts: {
    x?: number
    y?: number
    color?: string
    delay?: number
    duration?: number
    maxScale?: number
  } = {}
): Animation {
  const {
    x = 0,
    y = 0,
    color = ACCENT,
    delay = 0,
    duration = 1400,
    maxScale = 4,
  } = opts
  const ring = makeEl('div', {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: '24px',
    height: '24px',
    marginLeft: '-12px',
    marginTop: '-12px',
    border: `2px solid ${color}`,
    borderRadius: '999px',
    opacity: '0',
  })
  parent.appendChild(ring)
  const anim = ring.animate(
    [
      { transform: 'scale(0.4)', opacity: 0.9 },
      { transform: `scale(${maxScale})`, opacity: 0 },
    ],
    { duration, delay, easing: 'cubic-bezier(0.2,0.7,0.3,1)', fill: 'forwards' }
  )
  anim.onfinish = () => ring.remove()
  return anim
}

/** Dim the page behind an effect. Returns the dimmer element. */
export function dimPage(
  opts: { opacity?: number; blur?: string; duration?: number } = {}
): HTMLElement {
  const { opacity = 0.55, blur = '6px', duration = 220 } = opts
  const dim = makeEl('div', {
    position: 'fixed',
    inset: '0',
    background: 'rgba(9,9,11,0.85)',
    backdropFilter: `blur(${blur})`,
    WebkitBackdropFilter: `blur(${blur})`,
    opacity: '0',
    pointerEvents: 'auto',
  })
  overlay().appendChild(dim)
  dim.animate(
    [{ opacity: 0 }, { opacity: String(opacity) }],
    { duration, easing: 'ease-out', fill: 'forwards' }
  )
  return dim
}

/** Crossfade-remove an element. */
export function fadeOut(el: Element, duration = 240): Promise<void> {
  return new Promise(resolve => {
    const anim = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      easing: 'ease-out',
      fill: 'forwards',
    })
    anim.onfinish = () => {
      el.remove()
      resolve()
    }
  })
}

/** Sleep helper for sequencing. */
export const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

export const COLORS = { ACCENT, ACCENT_2, WARM, PALETTE }

/* ─── Extra primitives for v2 eggs ─────────────────────────────── */

/** Web Audio synth — simple sine/triangle/square beep. No-op if AudioContext unavailable. */
let _audioCtx: AudioContext | null = null
function audioCtx(): AudioContext | null {
  if (_audioCtx) return _audioCtx
  const w = window as unknown as {
    AudioContext?: typeof AudioContext
    webkitAudioContext?: typeof AudioContext
  }
  const Ctor = w.AudioContext || w.webkitAudioContext
  if (!Ctor) return null
  try {
    _audioCtx = new Ctor()
  } catch {
    return null
  }
  return _audioCtx
}

export function beep(opts: {
  freq?: number
  duration?: number
  type?: OscillatorType
  volume?: number
  delay?: number
} = {}): void {
  const {
    freq = 880,
    duration = 90,
    type = 'sine',
    volume = 0.05,
    delay = 0,
  } = opts
  const ctx = audioCtx()
  if (!ctx) return
  if (ctx.state === 'suspended') void ctx.resume()
  const start = ctx.currentTime + delay / 1000
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration / 1000)
  osc.connect(gain).connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration / 1000 + 0.02)
}

/** A scan line that sweeps vertically or horizontally across the viewport. */
export function scanLine(opts: {
  direction?: 'vertical' | 'horizontal'
  color?: string
  duration?: number
  thickness?: number
  onProgress?: (p: number) => void
}): { animation: Animation; el: HTMLElement } {
  const {
    direction = 'vertical',
    color = ACCENT,
    duration = 2200,
    thickness = 2,
    onProgress,
  } = opts
  const el = makeEl('div', {
    position: 'fixed',
    background:
      direction === 'vertical'
        ? `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`
        : `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
    boxShadow: `0 0 14px ${color}, 0 0 28px ${color}`,
    opacity: '0.85',
    zIndex: '10000',
    pointerEvents: 'none',
  })
  if (direction === 'vertical') {
    Object.assign(el.style, {
      left: '0',
      right: '0',
      top: '0',
      height: `${thickness}px`,
    } as Style)
  } else {
    Object.assign(el.style, {
      top: '0',
      bottom: '0',
      left: '0',
      width: `${thickness}px`,
    } as Style)
  }
  overlay().appendChild(el)
  const distance =
    direction === 'vertical' ? window.innerHeight : window.innerWidth
  const keyframes =
    direction === 'vertical'
      ? [{ transform: 'translateY(0)' }, { transform: `translateY(${distance}px)` }]
      : [{ transform: 'translateX(0)' }, { transform: `translateX(${distance}px)` }]
  const animation = el.animate(keyframes, {
    duration,
    easing: 'linear',
    fill: 'forwards',
  })
  if (onProgress) {
    const tick = () => {
      const t = Number(animation.currentTime ?? 0)
      if (animation.playState === 'finished') {
        onProgress(1)
        return
      }
      onProgress(t / duration)
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  animation.onfinish = () => el.remove()
  return { animation, el }
}

/** A single ripple expanding outward from a point. */
export function ripple(opts: {
  x: number
  y: number
  color?: string
  duration?: number
  maxScale?: number
}): Animation {
  const { x, y, color = ACCENT, duration = 1100, maxScale = 22 } = opts
  const ring = makeEl('div', {
    position: 'fixed',
    left: `${x}px`,
    top: `${y}px`,
    width: '12px',
    height: '12px',
    marginLeft: '-6px',
    marginTop: '-6px',
    border: `2px solid ${color}`,
    borderRadius: '999px',
    pointerEvents: 'none',
    zIndex: '10000',
  })
  overlay().appendChild(ring)
  const anim = ring.animate(
    [
      { transform: 'scale(0)', opacity: 1 },
      { transform: `scale(${maxScale})`, opacity: 0 },
    ],
    { duration, easing: 'cubic-bezier(0.2,0.8,0.2,1)', fill: 'forwards' }
  )
  anim.onfinish = () => ring.remove()
  return anim
}

/** Card-style flip on the X axis, swapping text content at the midpoint. */
export async function flipText(
  el: HTMLElement,
  newText: string,
  opts: { color?: string; duration?: number } = {}
): Promise<void> {
  const { color, duration = 220 } = opts
  await el.animate(
    [
      { transform: 'rotateX(0deg)', opacity: 1 },
      { transform: 'rotateX(90deg)', opacity: 0 },
    ],
    { duration: duration / 2, easing: 'ease-in', fill: 'forwards' }
  ).finished
  el.textContent = newText
  if (color) el.style.color = color
  await el.animate(
    [
      { transform: 'rotateX(90deg)', opacity: 0 },
      { transform: 'rotateX(0deg)', opacity: 1 },
    ],
    { duration: duration / 2, easing: 'ease-out', fill: 'forwards' }
  ).finished
}

const FRAGMENTS = [
  'ISO',
  'IEC',
  'IEEE',
  'NIST',
  'IETF',
  'W3C',
  'OASIS',
  'ITU',
  'BSI',
  'ANSI',
  'XSF',
  '3GPP',
  'BIPM',
  'ECMA',
  'OGC',
  'CalConnect',
  'Amd',
  'Cor',
  'DIS',
  'FDIS',
]

/** Spawn a single floating identifier fragment that drifts upward. */
export function floatingFragment(opts: {
  x?: number
  y?: number
  text?: string
  delay?: number
  color?: string
  size?: number
  duration?: number
} = {}): Animation {
  const {
    x,
    y,
    text = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
    delay = 0,
    color = 'rgba(41, 120, 161, 0.55)',
    size = 12,
    duration = 5200 + Math.random() * 2200,
  } = opts
  const startX = x ?? Math.random() * window.innerWidth
  const startY = y ?? window.innerHeight + 20
  const frag = makeEl(
    'div',
    {
      position: 'fixed',
      left: `${startX}px`,
      top: `${startY}px`,
      color,
      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: `${size}px`,
      fontWeight: '500',
      pointerEvents: 'none',
      zIndex: '99',
      willChange: 'transform,opacity',
    },
    text
  )
  overlay().appendChild(frag)
  const drift = (Math.random() - 0.5) * 120
  const rise = window.innerHeight + 100
  const anim = frag.animate(
    [
      { transform: 'translate(0, 0)', opacity: 0 },
      { transform: `translate(${drift / 2}px, -120px)`, opacity: 0.7, offset: 0.2 },
      { transform: `translate(${drift}px, -${rise}px)`, opacity: 0 },
    ],
    { duration, delay, easing: 'linear', fill: 'forwards' }
  )
  anim.onfinish = () => frag.remove()
  return anim
}

/** Static border "frame" that animates inward — used for ISO 27001 lockdown. */
export function lockdownFrame(opts: {
  color?: string
  duration?: number
} = {}): HTMLElement {
  const { color = '#34d399', duration = 600 } = opts
  const frame = makeEl('div', {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '9998',
    boxShadow: `inset 0 0 0 0 ${color}, inset 0 0 0 0 ${color}`,
  })
  overlay().appendChild(frame)
  frame.animate(
    [
      { boxShadow: `inset 0 0 0 0 ${color}, inset 0 0 0px 0 ${color}33` },
      {
        boxShadow: `inset 0 0 0 3px ${color}, inset 0 0 40px 0 ${color}55`,
      },
    ],
    { duration, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
  )
  return frame
}

/** Apply a momentary glow to an arbitrary element. */
export function glow(
  target: Element,
  opts: { color?: string; duration?: number } = {}
) {
  const { color = '#34d399', duration = 700 } = opts
  const rect = target.getBoundingClientRect()
  const glowEl = makeEl('div', {
    position: 'fixed',
    left: `${rect.left - 4}px`,
    top: `${rect.top - 4}px`,
    width: `${rect.width + 8}px`,
    height: `${rect.height + 8}px`,
    border: `2px solid ${color}`,
    borderRadius: '4px',
    pointerEvents: 'none',
    zIndex: '9999',
    opacity: '0',
  })
  overlay().appendChild(glowEl)
  const anim = glowEl.animate(
    [
      { opacity: 0, transform: 'scale(1)' },
      { opacity: 1, transform: 'scale(1)', offset: 0.3 },
      { opacity: 0, transform: 'scale(1.04)' },
    ],
    { duration, easing: 'ease-out', fill: 'forwards' }
  )
  anim.onfinish = () => glowEl.remove()
}

export { FRAGMENTS }
