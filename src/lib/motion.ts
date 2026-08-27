// Shared motion constants — single source of truth for timing & easing.
// Matches the editorial engineering aesthetic: out-expo for entries,
// in-quart for exits, snappy without bounce.

/** Out-expo-ish: fast settle, no overshoot. Default for reveals. */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** In-quart: decisive entry into exit state. */
export const EASE_IN_QUART = [0.7, 0, 0.84, 0] as const;

/** Material standard for opacity-only transitions. */
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

/** Reusable durations in ms. */
export const DURATION = {
  scrim: 0.24,
  panel: 0.42,
  panelExit: 0.32,
  layoutMorph: 0.5,
  contentReveal: 0.4,
  contentStagger: 0.06,
  bulletStagger: 0.08,
  pillStagger: 0.04,
  blurRestore: 0.2,
  closeFade: 0.15,
} as const;

/** Master timeline (ms) — relative to click. */
export const TIMELINE = {
  scrimStart: 0,
  panelStart: 80,
  metaStart: 520,
  descStart: 600,
  scopeStart: 700,
  pillStart: 900,
  archiveStart: 1050,
} as const;

/** Reduced-motion durations — instant or near-instant. */
export const REDUCED_DURATION = {
  scrim: 0.1,
  panel: 0.12,
  content: 0.08,
} as const;
