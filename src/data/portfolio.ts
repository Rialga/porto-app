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
    'Most of my time goes into POSe, the operational backbone at POSe ID — back-office admin, merchant onboarding, HRIS, and the field tools our ops team carries into the field every day.',
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

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  index: string; // "01", "02" — for editorial treatment
  slug: string; // stable id for routing / aria / layoutId
  title: string;
  short: string; // one-sentence description for the row
  category: string;
  role: string;
  period: string;
  scope: string[]; // bullets — what's actually inside
  stack: string[];

  // Rich detail content (used by the drawer)
  lead: string; // opening paragraph
  sections: ProjectSection[]; // 2-3 sub-sections
  highlights: string[]; // numbered highlights
  pullQuote: string;
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'pose-ppob',
    title: 'POSe PPOB',
    short: 'Payment platform for voucher and flash-sale operations — customer PWA, admin CMS, and Go middleware. Launched Apr 2026, ~500 active users.',
    category: 'Payments / PPOB',
    role: 'Frontend Developer',
    period: 'Since 08/2026',
    scope: [
      'Customer-facing Progressive Web App',
      'Admin CMS — vouchers, flash sales, and promos',
      'API touchpoints with the Go middleware',
    ],
    stack: ['TypeScript', 'JavaScript', 'PWA', 'CSS', 'Go'],
    lead: 'PPOB is POSe ID\'s payment platform — Payment Point Online Bank — spanning a customer-facing progressive web app, an admin dashboard for vouchers and flash sales, and a Go middleware that ties them together. Launched April 2026 with around 500 active users. I came on board in August 2026 and worked across the customer and admin surfaces.',
    sections: [
      {
        heading: 'Architecture',
        body: 'Three layers in the same repo family — a customer PWA that runs both inside the Android merchant WebView and as a standalone browser app, a TypeScript admin CMS, and a Go middleware backend. The PWA and CMS share the same product surface from different sides of the auth boundary.',
      },
      {
        heading: 'My contribution',
        body: 'Frontend across the customer PWA — product browsing, transaction flows — and the admin CMS where voucher operations, flash-sale windows, and promo tooling live. The two surfaces share patterns but have very different users: a buyer on a phone versus an operator at a desk.',
      },
      {
        heading: 'Constraint',
        body: 'The PWA runs inside an Android WebView at the merchant counter. That context shaped everything: touch targets, perceived latency, and the fact that the same code path also has to work in a standalone browser for dev and post-onboarding flows.',
      },
    ],
    highlights: [
      'Three-tier payment platform — customer PWA, admin CMS, Go middleware',
      'Customer PWA tuned to run both in-app WebView and standalone browser',
      'Admin CMS for vouchers, flash sales, and promotional operations',
      'Live since April 2026, around 500 active users at onboarding',
      'Frontend owned across two of three tiers — customer and operator',
    ],
    pullQuote:
      'Three tiers, one product — and the boundary I owned is the one customers actually touch.',
  },
  {
    index: '02',
    slug: 'pose-portal',
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
    lead: 'POSe Portal is the administrative core of the POSe ecosystem — the room where merchants, stores, users, and menus are shaped before they ever reach a cashier. Built as a Vue SPA on Vuex, with Axios carrying the data layer and Bootstrap carrying the dense UI. The interesting work wasn\'t visual; it was treating four master-data domains as a single source of truth while downstream systems kept moving.',
    sections: [
      {
        heading: 'Architecture',
        body: 'Vue + Vuex + Axios + Bootstrap. A modular Vuex store split per domain — user, store, merchant, menu — over a shared Axios instance with interceptors for auth and error normalization. Bootstrap\'s grid was the right call because the surface is dense admin UI, not a marketing site.',
      },
      {
        heading: 'My contribution',
        body: 'The MDM module across the four entity types, the Transaction Dashboard for real-time aggregated monitoring, and the Business Reporting module for sales analysis, merchant performance, and user audit trails. Each piece had to honor the data contracts that downstream systems depended on.',
      },
    ],
    highlights: [
      'Centralized back-office portal for the entire POSe ecosystem',
      'MDM module across four entity types: user, store, merchant, menu',
      'Real-time Transaction Dashboard for operational health monitoring',
      'Business Reporting — sales analysis, merchant performance, audit trails',
      'Vuex store modularized one module per domain',
    ],
    pullQuote:
      'Four master-data domains, one source of truth — and zero room for marketing UI.',
  },
  {
    index: '03',
    slug: 'pose-external',
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
    lead: 'POSe External is what a prospect sees before they\'re a merchant — the landing page, the self-registration form, and the Webview that loads inside the native Android POS app at first launch. Same Vue codebase, three very different contexts: desktop marketing site, mobile Webview, conversion funnel. Vite + Tailwind for build speed and design consistency; TanStack Query for server state; Vuex retained for shared client state.',
    sections: [
      {
        heading: 'My contribution',
        body: 'The landing page, the responsive self-registration form, and the Webview shell. The form is the load-bearing piece — it\'s the conversion point from "interested" to "merchant in our system" — and it had to feel frictionless inside an Android Webview.',
      },
      {
        heading: 'Constraints',
        body: 'A Webview inside an Android app has different perf assumptions than a desktop browser: touch targets, font scaling, backend latency. Optimizing for the Webview context shaped layout decisions more than the landing-page context did.',
      },
    ],
    highlights: [
      'Three-surface product: landing page, registration funnel, Android Webview',
      'End-to-end self-registration form feeding the merchant onboarding pipeline',
      'Layout optimized for Webview integration in the native Android app',
      'TanStack Query for server state, Vuex retained for shared client state',
      'Lead-generation surface for the wider POSe ecosystem',
    ],
    pullQuote:
      'Same codebase, three contexts — landing page, registration funnel, Android Webview at first launch.',
  },
  {
    index: '04',
    slug: 'mentor',
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
    lead: 'MENTOR is the web-based Field Service Management app that owns the lifecycle of a service ticket — creation, automated and manual assignment, status tracking, resolution — and keeps the technician performance scorecard honest. It shares the Vue + Vuex + Bootstrap stack with POSe Portal deliberately: same patterns, same store conventions, same component primitives. The interesting work was the ticket state machine and the SLA math behind the dashboard.',
    sections: [
      {
        heading: 'Architecture',
        body: 'Vue + Vuex + Bootstrap, same shape as POSe Portal. Vuex modules model each ticket stage; the performance dashboard reads from those same stores so the scorecard can\'t drift from operational reality.',
      },
      {
        heading: 'What\'s interesting',
        body: 'SLA achievement, response time, and resolution rate only matter if they reflect live ticket state — so polling and reconciliation logic got more attention than the chart components did.',
      },
    ],
    highlights: [
      'Service ticket lifecycle: creation, automated + manual assignment, status, resolution',
      'Technician performance dashboard — SLA, response time, resolution rate',
      'Shared Vue + Vuex + Bootstrap stack with POSe Portal — internal consistency',
      'Ticket state machine modeled in Vuex',
      'Web-based FSM serving field technician teams',
    ],
    pullQuote:
      'A ticket moves through five states — the dashboard only matters if those states are the ground truth.',
  },
  {
    index: '05',
    slug: 'tap',
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
    lead: 'TAP is the mobile-first FSM the sales and field ops teams actually carry — sales visits, transaction submissions, approvals, ticketing — all on a phone. It\'s also where the POSe ID front-end stack visibly modernized: React, Vite, Storybook, Redux Toolkit, Tailwind, replacing the inherited Vue/Vuex/Bootstrap pattern Portal and MENTOR sit on. Built the mobile views the field agents use daily plus the admin reporting surface management reads from.',
    sections: [
      {
        heading: 'My contribution',
        body: 'Mobile-first Sales Visit management — field agents record visits, submit transactions, request approvals. Integrated ticketing for field-originated complaints, and an admin dashboard surfacing sales, approval status, and ticket metrics.',
      },
      {
        heading: 'Why it matters',
        body: 'This is where the team\'s stack pivot is visible — every later POSe ID project (RE-KerjaYuk!, KY-Loyalty) shipped on this same React / Redux Toolkit / Tailwind / Vite / Storybook combination.',
      },
    ],
    highlights: [
      'Mobile-first FSM for field sales — visits, transactions, approvals',
      'Integrated ticketing and dispatching for field-originated complaints',
      'Admin reporting dashboard: sales, approvals, ticket metrics',
      'React + Vite + Storybook + Redux Toolkit + Tailwind stack',
      'Storybook-driven component development alongside feature work',
    ],
    pullQuote:
      'Vue/Vuex was the inherited stack; React/Redux Toolkit was the deliberate one.',
  },
  {
    index: '06',
    slug: 're-kerjayuk',
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
    lead: 'RE-KerjaYuk! is the same HRIS domain — attendance, finance, HR ops — rebuilt from Laravel into a React SPA. The motivation was concrete: the server-rendered app was hitting walls on interactivity and felt slow at scale. It shipped on React + Vite + Storybook + Redux Toolkit + Tailwind, the same stack TAP adopted. Same product, modernized architecture, features retained.',
    sections: [
      {
        heading: 'My contribution',
        body: 'Rebuilt attendance and finance flows as a modern SPA, keeping the existing API contracts intact so the rollout could phase in without breaking HR ops.',
      },
      {
        heading: 'Why it matters',
        body: 'This was a migration, not a rewrite. Attendance and finance had to keep working while the front-end was gutted — which meant disciplined API contracts and a phased rollout rather than a big-bang cutover.',
      },
    ],
    highlights: [
      'Rebuilt KerjaYuk! from Laravel to React for performance and scalability',
      'Retained core domain: employee attendance and finance',
      'React + Vite + Storybook + Redux Toolkit + Tailwind — aligned with TAP',
      'Storybook as the design-system foundation from day one',
      'Migration, not rewrite — same product, new rendering model',
    ],
    pullQuote:
      'Same product, new architecture — features stayed, the rendering model left.',
  },
  {
    index: '07',
    slug: 'ky-loyalty',
    title: 'KY-Loyalty',
    short: 'Progressive web app for tracking and managing cashier reward points.',
    category: 'PWA / Rewards',
    role: 'Frontend Developer',
    period: '02/2023 — Present',
    scope: ['Cashier reward tracking', 'Reward point management', 'PWA install + offline-capable shell'],
    stack: ['ReactJS', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
    lead: 'KY-Loyalty is a progressive web app for cashier rewards — record points, manage balances, the loyalty loop that runs alongside POSe. It shipped on the same React + Vite + Storybook + Redux Toolkit + Tailwind stack TAP and RE-KerjaYuk! settled into. Treated it as a PWA first, not a website, because the cashier usage pattern was always install-on-device.',
    sections: [
      {
        heading: 'What\'s interesting',
        body: 'PWAs have constraints normal React apps don\'t — install prompt, offline behavior, manifest discipline. Most of the interesting work was at that boundary, not in the rewards logic itself.',
      },
    ],
    highlights: [
      'PWA for cashier rewards — record and manage reward points',
      'Same React + Vite + Storybook + Redux Toolkit + Tailwind stack as TAP / RE-KerjaYuk!',
      'Installable, mobile-friendly PWA surface',
      'Sits alongside POSe as part of the merchant engagement loop',
      'Single-purpose, lightest project in the POSe ID portfolio',
    ],
    pullQuote:
      'PWA first, website second — the install boundary shaped more decisions than the rewards logic.',
  },
];

export interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'POSe ID',
    location: 'South Tangerang',
    role: 'Front-end Developer',
    period: '02/2023 — Present',
    current: true,
    bullets: [
      'Owned frontend across seven products — Portal, External, MENTOR, TAP, RE-KerjaYuk! (HRIS), KY-Loyalty, and PPOB.',
      'Drove the stack migration from Vue/Vuex/Bootstrap to React/Redux Toolkit + Vite + Storybook.',
      'Worked across admin, HRIS, merchant-facing, field operations, and customer surfaces.',
    ],
  },
  {
    company: 'Tigernix Indonesia',
    location: 'Batam',
    role: 'Software Engineer',
    period: '10/2021 — 12/2022',
    bullets: [
      'Software engineering across enterprise products and internal tooling.',
      'Worked across frontend and backend layers on shipping features end to end.',
    ],
  },
  {
    company: 'Kominfo',
    location: 'Padang',
    role: 'Full Stack Developer (Internship)',
    period: '12/2018 — 02/2019',
    bullets: [
      'Three-month full-stack internship building internal tools.',
      'Contributed to web applications alongside a senior engineering team.',
    ],
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
  { label: 'Experience', href: '#experience', n: '02' },
  { label: 'Work', href: '#work', n: '03' },
  { label: 'Stack', href: '#stack', n: '04' },
  { label: 'Contact', href: '#contact', n: '05' },
] as const;
