/**
 * Project catalogue. Tools lists mirror PORTFOLIO.pdf exactly.
 * Images use the existing Google Drive URLs.
 */
export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  /** Group tag, used for the work-section filter chips. */
  category: 'react' | 'vue' | 'mobile'
  image: string
  technologies: string[]
  /** When true, the card shows a "Featured" eyebrow. */
  featured?: boolean
  /** When true, also shown on the Featured Case Studies strip. */
  hasCaseStudy?: boolean
  /** Year the project shipped — shown as a corner badge. */
  year: string
  /** Optional live URL. */
  liveUrl?: string
  /** Optional repo URL. */
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: 'pose-portal',
    slug: 'pose-portal',
    title: 'POSe Portal',
    subtitle: 'Back Office & Master Data Management',
    description:
      'Centralized web back-office for the PCS POS ecosystem. Master Data Management (user, store, merchant, menu), real-time transaction dashboards, and a business reporting module.',
    category: 'vue',
    image: 'https://lh3.googleusercontent.com/d/19nhIfbB5jSppZH6Otcagd_XSJRrrEHa1',
    technologies: ['Vue', 'Vuex', 'Axios', 'Bootstrap'],
    featured: true,
    hasCaseStudy: true,
    year: '2024',
  },
  {
    id: 'pose-external',
    slug: 'pose-external',
    title: 'POSe External',
    subtitle: 'Merchant Onboarding & Mobile Webview',
    description:
      'Public landing page + merchant self-onboarding platform. Responsive registration workflow with native-Android Webview optimization.',
    category: 'vue',
    image: 'https://lh3.googleusercontent.com/d/1YzGa-nOBtRTxVfjddC6MshQQWtKtTNyz',
    technologies: ['Vue', 'Vite', 'TanStack Query', 'Tailwind', 'Vuex'],
    hasCaseStudy: true,
    year: '2024',
  },
  {
    id: 'mentor',
    slug: 'mentor',
    title: 'MENTOR',
    subtitle: 'Field Service Management',
    description:
      'Web-based FSM platform for service lifecycle and technician performance. Ticketing and a real-time performance dashboard.',
    category: 'vue',
    image: 'https://lh3.googleusercontent.com/d/1j_yENwIrPY6vzrZsr0Vda7aXhOhntkxi',
    technologies: ['Vue', 'Vuex', 'Bootstrap'],
    year: '2023',
  },
  {
    id: 'tap',
    slug: 'tap',
    title: 'TAP',
    subtitle: 'Mobile-first Sales & Operations FSM',
    description:
      'Mobile-first Sales & Operations Management. Field sales agents record visits, submit transactions and approvals; integrated ticketing; admin reporting dashboard.',
    category: 'mobile',
    image: 'https://lh3.googleusercontent.com/d/1Y60_aWIqSehukmFKBpck2p-O4ZsXcO-i',
    technologies: ['React', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
    hasCaseStudy: true,
    year: '2024',
  },
  {
    id: 'ky-revamp',
    slug: 'ky-revamp',
    title: 'KerjaYuk! HRIS — Revamp',
    subtitle: 'Re-engineered HRIS (Laravel → React)',
    description:
      'Re-engineered KerjaYuk! HRIS from Laravel to React. Retains attendance and finance workflows with modern React features.',
    category: 'react',
    image: 'https://lh3.googleusercontent.com/d/1kuWCmmL8N-NscE_TkQKKfR3PHEmO9kMN',
    technologies: ['React', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
    featured: true,
    hasCaseStudy: true,
    year: '2023',
  },
  {
    id: 'ky-loyalty',
    slug: 'ky-loyalty',
    title: 'KY Loyalty',
    subtitle: 'Progressive Web App for cashier rewards',
    description:
      'Progressive Web App for tracking cashier rewards with a seamless interface for recording and managing reward points.',
    category: 'react',
    image: 'https://lh3.googleusercontent.com/d/1vg22sMaF66EUVz8UZOiVSgNLlfJX9AiL',
    technologies: ['React', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
    year: '2023',
  },
]

/** Categories surfaced as filter chips above the work grid. */
export const projectCategories = [
  { id: 'all', label: 'All work' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'mobile', label: 'Mobile' },
] as const

export type ProjectCategory = (typeof projectCategories)[number]['id']