/**
 * Hero copy + the words that rotate in the headline.
 * Numbers in `stats` come from ATS Resume V3 (PORTFOLIO.pdf).
 */
export interface HeroStat {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

export const hero = {
  eyebrow: 'Available for new projects · Q3 2026',
  titleLead: 'Front-end developer',
  rotatingWords: ['building boilerplates', 'shipping UI', 'reducing load times', 'shipping UI'],
  titleTail: 'that hold up in production.',
  subtitle:
    'Senior Front-end Developer with 3+ years building high-performance, user-focused web apps in React.js and Vue.js. From Figma handoff to production — clean reusable code and fast, accessible interfaces.',
  primaryCta: { label: 'View selected work', href: '#work' },
  secondaryCta: { label: 'Read résumé', href: 'https://s.id/cv-gani' },
  stats: [
    { value: 5, suffix: '+', label: 'Projects on shared boilerplate' },
    { value: 40, prefix: '−', suffix: '%', label: 'Faster project setup' },
    { value: 25, prefix: '−', suffix: '%', label: 'Fewer QA bugs after review' },
    { value: 1.2, prefix: '−', suffix: 's', decimals: 1, label: 'Page-load time saved' },
  ] as HeroStat[],
} as const

export type Hero = typeof hero