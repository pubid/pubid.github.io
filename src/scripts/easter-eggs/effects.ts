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
