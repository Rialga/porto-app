/**
 * Skill taxonomy — mirrors the resume's exact grouping.
 * Source of truth: ATS Resume V3 (PORTFOLIO.pdf).
 */
export interface Skill {
  name: string
}

export interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React.js' },
      { name: 'Vue.js' },
      { name: 'Next.js' },
      { name: 'Vite' },
    ],
  },
  {
    id: 'state',
    label: 'State Management',
    skills: [
      { name: 'Redux Toolkit' },
      { name: 'RTK Query' },
      { name: 'Vuex' },
      { name: 'Pinia' },
    ],
  },
  {
    id: 'styling',
    label: 'Styling',
    skills: [
      { name: 'Tailwind CSS' },
      { name: 'Bootstrap' },
      { name: 'Material UI' },
      { name: 'shadcn/ui' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [{ name: 'Node.js' }, { name: 'Laravel' }],
  },
  {
    id: 'testing',
    label: 'Testing',
    skills: [{ name: 'Vitest' }],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [{ name: 'Git' }, { name: 'SVN' }],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [{ name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'PHP' }],
  },
]

/** Primary stack — the four I reach for first. */
export const primaryStack = ['React.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Vite'] as const