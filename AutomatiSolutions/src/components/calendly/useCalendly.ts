import { useCallback, useEffect, useState } from 'react'

/**
 * Augments the global `Window` interface with Calendly’s popup widget API,
 * which is attached at runtime when the official widget script loads.
 */
declare global {
  interface Window {
    Calendly?: {
      /** Opens Calendly’s embedded scheduling UI in a popup overlay. */
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

/**
 * Official Calendly embed stylesheet URL (required for correct popup styling).
 * @see https://developer.calendly.com/getting-started
 */
export const CALENDLY_WIDGET_CSS_HREF =
  'https://assets.calendly.com/assets/external/widget.css'

/**
 * Official Calendly embed JavaScript URL (provides `window.Calendly`).
 * @see https://developer.calendly.com/getting-started
 */
export const CALENDLY_WIDGET_SCRIPT_SRC =
  'https://assets.calendly.com/assets/external/widget.js'

/**
 * Default scheduling page opened by {@link useCalendly} when no `url` option is passed.
 * Override per app or per call via {@link UseCalendlyOptions.url} or {@link OpenCalendlyPopup}.
 */
export const DEFAULT_CALENDLY_URL =
  'https://calendly.com/jdesmond10/free-consultation'

/**
 * Options for {@link useCalendly}.
 */
export type UseCalendlyOptions = {
  /**
   * Full Calendly event or scheduling URL (e.g. `https://calendly.com/username/event`).
   * Defaults to {@link DEFAULT_CALENDLY_URL}.
   */
  url?: string
}

/**
 * Function returned by {@link useCalendly} to open the Calendly popup.
 * No-ops if the widget script has not finished loading yet.
 */
export type OpenCalendlyPopup = () => void

/**
 * Value returned by {@link useCalendly}.
 */
export type UseCalendlyResult = {
  /**
   * Opens the Calendly popup for the hook’s configured `url`
   * (or {@link DEFAULT_CALENDLY_URL}).
   */
  openPopup: OpenCalendlyPopup

  /**
   * `true` once `window.Calendly` is available (widget script loaded).
   * Use to disable buttons or show a loading state until clicks will work.
   */
  isReady: boolean
}

/* ─── Shared asset loader (ref-counted so multiple routes/components share one script) ─── */

let assetRefCount = 0
let linkEl: HTMLLinkElement | null = null
let scriptEl: HTMLScriptElement | null = null
const onScriptLoadCallbacks: Array<() => void> = []

function flushScriptLoadCallbacks() {
  while (onScriptLoadCallbacks.length > 0) {
    const cb = onScriptLoadCallbacks.pop()
    cb?.()
  }
}

function acquireCalendlyAssets(onScriptLoad: () => void) {
  onScriptLoadCallbacks.push(onScriptLoad)

  if (assetRefCount === 0) {
    linkEl = document.createElement('link')
    linkEl.href = CALENDLY_WIDGET_CSS_HREF
    linkEl.rel = 'stylesheet'
    document.head.appendChild(linkEl)

    scriptEl = document.createElement('script')
    scriptEl.src = CALENDLY_WIDGET_SCRIPT_SRC
    scriptEl.async = true
    scriptEl.onload = () => {
      flushScriptLoadCallbacks()
    }
    document.head.appendChild(scriptEl)
  }

  assetRefCount += 1

  if (typeof window !== 'undefined' && window.Calendly) {
    flushScriptLoadCallbacks()
  }
}

function releaseCalendlyAssets() {
  assetRefCount -= 1
  if (assetRefCount > 0) return

  if (linkEl?.parentNode) {
    document.head.removeChild(linkEl)
  }
  if (scriptEl?.parentNode) {
    document.head.removeChild(scriptEl)
  }
  linkEl = null
  scriptEl = null
}

/**
 * Loads Calendly’s widget CSS/JS once (shared across all hook instances via ref counting)
 * and exposes a stable {@link OpenCalendlyPopup} for the configured scheduling URL.
 *
 * Use this on any route or component that should open the same (or a custom) Calendly meeting.
 * Multiple mounts increment a ref count; assets are removed only when the last consumer unmounts.
 *
 * @example
 * ```tsx
 * function NavbarBookButton() {
 *   const { openPopup, isReady } = useCalendly()
 *   return (
 *     <button type="button" disabled={!isReady} onClick={openPopup}>
 *       Book a call
 *     </button>
 *   )
 * }
 * ```
 *
 * @example Custom URL
 * ```tsx
 * const { openPopup } = useCalendly({
 *   url: 'https://calendly.com/your-org/discovery-call',
 * })
 * ```
 *
 * @param options - Optional {@link UseCalendlyOptions}; see {@link DEFAULT_CALENDLY_URL} for the default event.
 * @returns {@link UseCalendlyResult} with `openPopup` and `isReady`.
 */
export function useCalendly(
  options: UseCalendlyOptions = {},
): UseCalendlyResult {
  const url = options.url ?? DEFAULT_CALENDLY_URL
  const [isReady, setIsReady] = useState(
    () => typeof window !== 'undefined' && Boolean(window.Calendly),
  )

  useEffect(() => {
    const markReady = () => setIsReady(true)

    acquireCalendlyAssets(markReady)

    return () => {
      releaseCalendlyAssets()
    }
  }, [])

  const openPopup = useCallback<OpenCalendlyPopup>(() => {
    if (typeof window === 'undefined' || !window.Calendly) return
    window.Calendly.initPopupWidget({ url })
  }, [url])

  return { openPopup, isReady }
}
