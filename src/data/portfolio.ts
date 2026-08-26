// Portfolio content — single source of truth
// Tone: editorial engineering notebook. Concrete, not boastful.

export const profile = {
  name: 'Muhamad Febri Algani',
  shortName: 'Febri Algani',
  role: 'Frontend Developer',
  location: 'South Tangerang, Indonesia',
  email: 'febrialganios@gmail.com',
  phone: '+62 857 1812 0287',
  status: 'Open to senior frontend roles',
  tagline:
    '4+ years of experience building beautiful, responsive web applications with React, Vue.js, and modern web technologies. I specialize in creating user-centered experiences that combine elegant design with robust functionality.',
  intro: [
    'I work mostly inside the messy middle: large existing codebases, internal users who actually need things to work, and stacks that have to hold up under real load.',
    'Most of my time goes into POSe, the operational backbone at PCS Payment Indonesia — back-office admin, merchant onboarding, HRIS, and the field tools our ops team carries into the field every day.',
    'I care about interfaces that respect the operator: dense data, predictable navigation, and components you can read in five seconds.',
  ],
  beyondCode: [
    {
      label: 'On Craft',
      body: 'I write code the way I design interfaces: small, named, predictable. The same component looks the same in every product it ships in. Tokens over magic numbers, primitive APIs that don\'t trap the next person into bad patterns, and a component library I could defend in code review without flinching.',
    },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Rialga' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhamad-febri-algani-311533205/' },
    { label: 'Email', href: 'mailto:febrialganios@gmail.com' },
  ],
} as const;

export interface Project {
  index: string; // "01", "02" — for editorial treatment
  title: string;
  short: string; // one-sentence description
  category: string;
  role: string;
  period: string;
  scope: string[]; // bullets — what's actually inside
  stack: string[];
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'POSe Portal',
    short: 'Back-office control hub for the POSe ecosystem — master data, transactions, and business reporting.',
    category: 'Admin / Internal Tooling',
    role: 'Frontend Developer',
    period: '02/2023 — Present',
    scope: [
      'Master Data Management for users, stores, merchants, menus',
      'Transaction dashboard',
      'Business reporting module — sales, merchant performance, audit trails',
    ],
    stack: ['Vue', 'Vuex', 'Axios', 'Bootstrap'],
  },
  {
    index: '02',
    title: 'POSe External',
    short: 'Merchant onboarding platform with a mobile webview integrated into the Android merchant app.',
    category: 'Public-facing / Mobile Web',
    role: 'Frontend Developer',
    period: '02/2023 — Present',
    scope: [
      'Commercial landing page for the merchant product',
      'Self-onboarding registration form',
      'Mobile webview tuned for the Android merchant container',
    ],
    stack: ['Vue', 'Vite', 'TanStack Query', 'Tailwind', 'Vuex'],
  },
  {
    index: '03',
    title: 'MENTOR',
    short: 'Field service management platform — full ticketing lifecycle with a real-time technician dashboard.',
    category: 'Operations / FSM',
    role: 'Frontend Developer',
    period: '02/2023 — Present',
    scope: [
      'Ticket creation, automated and manual assignment',
      'Real-time technician performance: SLA, response, resolution',
    ],
    stack: ['Vue', 'Vuex', 'Bootstrap'],
  },
  {
    index: '04',
    title: 'TAP',
    short: 'Mobile-first sales and operations tool for field users — visits, approvals, and ticketing on one screen.',
    category: 'Field Operations',
    role: 'Frontend Developer',
    period: '02/2023 — Present',
    scope: [
      'Field sales visit management and approvals',
      'Ticketing + dispatching for field users',
      'Admin reporting dashboard — sales, approvals, ticket metrics',
    ],
    stack: ['ReactJS', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
  },
  {
    index: '05',
    title: 'RE-KerjaYuk!',
    short: 'HRIS rewrite — moved attendance and finance from Laravel to React for performance and scale.',
    category: 'HRIS / Internal',
    role: 'Frontend Developer',
    period: '02/2023 — Present',
    scope: [
      'Re-engineered from a Laravel monolith to a React frontend',
      'Employee attendance workflows',
      'Finance operations module',
    ],
    stack: ['ReactJS', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
  },
  {
    index: '06',
    title: 'KY-Loyalty',
    short: 'Progressive web app for tracking and managing cashier reward points.',
    category: 'PWA / Rewards',
    role: 'Frontend Developer',
    period: '02/2023 — Present',
    scope: ['Cashier reward tracking', 'Reward point management', 'PWA install + offline-capable shell'],
    stack: ['ReactJS', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const techStack: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'Vue', 'Next.js', 'TypeScript', 'JavaScript (ES6+)'],
  },
  {
    label: 'State & Data',
    items: ['Redux Toolkit', 'RTK Query', 'Vuex', 'TanStack Query', 'Axios', 'Zustand'],
  },
  {
    label: 'Styling & UI',
    items: ['Tailwind CSS', 'SCSS', 'shadcn/ui', 'Bootstrap', 'Responsive Layout'],
  },
  {
    label: 'Tooling',
    items: ['Vite', 'Storybook', 'Webpack', 'ESLint', 'Git'],
  },
  {
    label: 'Testing & Quality',
    items: ['Jest', 'React Testing Library', 'Vue Test Utils', 'Playwright'],
  },
  {
    label: 'Practices',
    items: ['Component systems', 'Design tokens', 'Performance tuning', 'Accessibility', 'Mentoring'],
  },
];

export const nav = [
  { label: 'About', href: '#about', n: '01' },
  { label: 'Work', href: '#work', n: '02' },
  { label: 'Stack', href: '#stack', n: '03' },
  { label: 'Contact', href: '#contact', n: '04' },
] as const;