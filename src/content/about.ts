/**
 * About section — bio paraphrased from ATS Resume V3 summary.
 */
export const about = {
  eyebrow: 'About',
  title: 'A senior front-end developer who owns the full lifecycle.',
  body: [
    'I’m Gani — a senior front-end developer with 3+ years building high-performance, user-focused web applications in React.js and Vue.js. I work the full front-end lifecycle, from Figma handoff to production, and collaborate closely with backend, QA and product teams.',
    'I care about clean reusable code and fast, accessible interfaces — the details that don’t ship in tickets: type ramps, motion timing, contrast in the long tail of the design system, and page-load time on a mid-range Android.',
  ],
  pillars: [
    {
      title: 'Reusable systems',
      body: 'Built reusable React + Vue project boilerplates adopted across 5+ projects — cutting project setup time by ~40% and improving cross-team consistency.',
    },
    {
      title: 'Code quality',
      body: 'Reviews across projects reduced QA bug occurrences by up to 25%. Introduced Vitest unit testing in core modules for higher coverage and fewer regressions.',
    },
    {
      title: 'Performance',
      body: 'Cut page load time by 1.2s and improved Core Web Vitals on key modules — performance treated as a feature, not an afterthought.',
    },
  ],
  focus: [
    'Design systems',
    'Reusable component libraries',
    'Performance budgets',
    'Accessibility',
    'DX & testing',
  ],
} as const

export type About = typeof about