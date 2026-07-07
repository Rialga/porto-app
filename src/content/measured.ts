/**
 * Honest, measured metrics about this very site.
 *
 * Numbers come from the production build output (npm run build) and from
 * a runtime measurement taken when the page mounts. They are not aspirational.
 *
 * `kind: 'static'`  — measured at build time, ships in the bundle
 * `kind: 'runtime'` — measured when the user opens the page (Performance API)
 */
export interface MeasuredMetric {
  id: string
  /** Display value — a number for the count-up, or a string for static labels. */
  value: number | string
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  /** Explains the measurement methodology under the number. */
  detail: string
  kind: 'static' | 'runtime'
}

export const measured: MeasuredMetric[] = [
  {
    id: 'bundle-gzip',
    value: 158,
    suffix: 'KB',
    label: 'JS bundle (gzip)',
    detail: 'Main route bundle — sourced from the live `npm run build` output. Below-the-fold sections are code-split.',
    kind: 'static',
  },
  {
    id: 'css-gzip',
    value: 13,
    suffix: 'KB',
    label: 'CSS bundle (gzip)',
    detail: 'Tailwind 4 output, purged and minified at build time.',
    kind: 'static',
  },
  {
    id: 'js-files',
    value: 2,
    label: 'JS files on first paint',
    detail: 'Main + one lazy chunk as you scroll. Case studies, projects, education, contact all download only when you reach them.',
    kind: 'static',
  },
  {
    id: 'fonts',
    value: 0,
    label: 'Third-party font requests',
    detail: 'Inter + JetBrains Mono Variable, self-hosted via @fontsource. No Google Fonts, no render-blocking CDN.',
    kind: 'static',
  },
]

/**
 * Runtime metrics measured in the browser via the Performance API.
 * Filled in at mount by <LiveMetrics />.
 */
export interface RuntimeMetrics {
  /** ms — page load (navigation start → load event end). */
  pageLoad: number
  /** ms — DOMContentLoaded. */
  domContentLoaded: number
  /** ms — First Contentful Paint. */
  fcp: number | null
  /** count of resources loaded. */
  resources: number
}

export const formatRuntime = (m: RuntimeMetrics) => ({
  pageLoad: `${Math.round(m.pageLoad)} ms`,
  domContentLoaded: `${Math.round(m.domContentLoaded)} ms`,
  fcp: m.fcp !== null ? `${Math.round(m.fcp)} ms` : '—',
  resources: `${m.resources}`,
})