/**
 * Experience timeline entries — newest first.
 * Source of truth: ATS Resume V3 (PORTFOLIO.pdf) — bullets paraphrased
 * for the editorial web format, no fabricated numbers.
 */
export interface Experience {
  id: string
  company: string
  role: string
  period: string
  /** ISO period so we can format on case studies / CV. */
  start: string
  end: string | null
  location?: string
  highlights: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    id: 'pcs',
    company: 'PCS Payment Indonesia',
    role: 'Front-end Developer',
    period: 'Feb 2023 — Present',
    start: '2023-02',
    end: null,
    location: 'South Tangerang · Hybrid',
    highlights: [
      'Owned frontend development and built reusable React.js + Vue.js project boilerplates adopted across 5+ projects — cut project setup time by ~40% and improved cross-team consistency.',
      'Owned code review across projects, reducing QA bug occurrences by up to 25%.',
      'Introduced Vitest unit testing in core modules to lift coverage and reduce regression issues.',
      'Built scalable, responsive user interfaces from Figma in React.js and Vue.js — improving cross-device usability and user satisfaction.',
      'Developed reusable component libraries, cutting duplicate code and speeding feature delivery by 30%+.',
      'Collaborated with backend and QA teams to integrate APIs across HRIS and FSM systems — stable end-to-end functionality.',
      'Optimised frontend performance: cut page load time by 1.2s and improved Core Web Vitals on key modules.',
      'Mentored junior developers and contributed frontend best-practice guidelines adopted team-wide.',
    ],
    technologies: [
      'React.js',
      'Vue.js',
      'TypeScript',
      'Redux Toolkit',
      'RTK Query',
      'Vuex',
      'Pinia',
      'TanStack Query',
      'Tailwind CSS',
      'shadcn/ui',
      'Material UI',
      'Bootstrap',
      'Vite',
      'Vitest',
    ],
  },
  {
    id: 'tigernix',
    company: 'Tigernix Indonesia',
    role: 'Software Engineer',
    period: 'Oct 2021 — Dec 2022',
    start: '2021-10',
    end: '2022-12',
    location: 'Batam',
    highlights: [
      'Customised and extended 4+ Odoo frontend modules — improved usability and aligned UI with client business workflows.',
      'Built responsive UI components with Bootstrap across 3 ERP product lines; cross-browser, cross-device consistent.',
      'Collaborated with backend and functional teams to integrate modules — cut implementation issues by ~20% via early UI validation.',
      'Resolved 30+ UI bugs across production deployments, lifting application stability and end-user satisfaction.',
    ],
    technologies: ['Odoo ERP', 'jQuery', 'JavaScript', 'AJAX', 'Bootstrap'],
  },
  {
    id: 'kominfo',
    company: 'Kominfo Kota Padang',
    role: 'Full Stack Developer · Intern',
    period: 'Dec 2018 — Feb 2019',
    start: '2018-12',
    end: '2019-02',
    location: 'Padang',
    highlights: [
      'Built administrative dashboards in HTML, CSS and JavaScript to support internal operations.',
      'Designed MySQL schemas and implemented CRUD features end-to-end with Laravel + PHP.',
      'Worked independently while coordinating with supervisors to keep work aligned with project requirements.',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
]