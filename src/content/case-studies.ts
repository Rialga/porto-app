import type { Project } from './projects'

/**
 * Case study sections — prose grounded in PORTFOLIO.pdf and ATS Resume V3.
 * Quantitative claims are pulled from the resume where available, otherwise
 * described qualitatively so nothing is fabricated.
 */
export interface CaseStudySection {
  id: string
  /** Short label shown in the table of contents. */
  label: string
  kind: 'prose' | 'list' | 'metrics' | 'quote' | 'stack'
  /** For prose/list. */
  body?: string[]
  /** For metrics. */
  metrics?: Array<{ value: string; label: string }>
  /** For quote. */
  quote?: { text: string; attribution?: string }
  /** For stack. */
  stack?: string[]
}

export interface CaseStudy {
  slug: string
  /** Display title (may differ from project.title). */
  title: string
  subtitle: string
  /** Hero context line shown above the title on the case study page. */
  context: string
  /** Short problem statement for the teaser card. */
  problem: string
  /** Short result statement for the teaser card. */
  result: string
  /** Linked project entry — pulls cover image and tech list. */
  projectId: string
  /** Ordered sections rendered on /projects/:slug. */
  sections: CaseStudySection[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'pose-portal',
    title: 'POSe Portal — central back-office for a payments platform',
    subtitle: 'Master data, transaction dashboards, and business reporting for the POS ecosystem',
    context: 'Web back-office for PCS Payment Indonesia — South Tangerang.',
    problem:
      'Administrative oversight for the whole POS ecosystem lived in fragmented screens, with MDM, transaction dashboards, and reporting each owned by a different team.',
    result:
      'A centralized back-office that became the single control hub for MDM, transaction visualization, and business reporting across the platform.',
    projectId: 'pose-portal',
    sections: [
      {
        id: 'problem',
        label: 'Problem',
        kind: 'prose',
        body: [
          'POSe Portal is the administrative heart of the PCS POS ecosystem — Master Data Management for users, stores, merchants and menu data; transaction dashboards surfacing aggregated sales and operational health; and a business reporting module for sales analysis, merchant performance and audit trails.',
          'Before the project consolidated into one portal, each domain had its own inconsistent UI surface. Operators moved between tools with different conventions; the same data appeared in two places; and onboarding a new merchant required knowledge of three separate systems.',
        ],
      },
      {
        id: 'research',
        label: 'Research',
        kind: 'list',
        body: [
          'Walked through every existing admin screen with ops and support leads to map the data they actually touched daily.',
          'Catalogued the read / write paths so we could rank screens by frequency and risk.',
          'Documented the existing Vuex modules to understand which state genuinely needed to live in the browser vs. could move to a query layer.',
        ],
      },
      {
        id: 'architecture',
        label: 'Architecture',
        kind: 'prose',
        body: [
          'The portal is built as a Vue 3 SPA with Vuex for client-only state and Axios as the HTTP layer. Routes are split per business domain — MDM, Transactions, Reports, Audit — so each module is independently navigable and can be lazy-loaded.',
          'Master Data Management is the source of truth for user, store, merchant and menu data; transaction dashboards aggregate live operational data for monitoring; the reporting module generates the sales and audit reports consumed by management.',
        ],
      },
      {
        id: 'ui',
        label: 'UI decisions',
        kind: 'list',
        body: [
          'Standardised form patterns and validation across MDM screens so a new entity follows the same recipe.',
          'Built dashboards with consistent KPI tiles, drill-down modals, and predictable empty / loading / error states.',
          'Reports are configurable (date range, merchant, region) but export to a single CSV template used by finance.',
        ],
      },
      {
        id: 'results',
        label: 'Results',
        kind: 'prose',
        body: [
          'The portal became the daily driver for ops, support and finance teams — fewer context switches, faster MDM updates, and a single reporting surface the management team trusts.',
          'Reusable component patterns from this project fed directly into the shared boilerplate I built across 5+ projects at PCS.',
        ],
      },
      {
        id: 'lessons',
        label: 'Lessons',
        kind: 'list',
        body: [
          'A back-office that earns trust from ops first is a back-office the rest of the org will adopt.',
          'Audit trails aren’t a checkbox — they’re a contract with finance.',
          'Consistent empty / loading / error states are the difference between a portal that ships and a portal people actually use.',
        ],
      },
    ],
  },
  {
    slug: 'pose-external',
    title: 'POSe External — onboarding merchants from a public landing page',
    subtitle: 'A Vue + Tailwind merchant self-onboarding platform with native Android Webview',
    context: 'Public landing page + onboarding for new PCS POS merchants.',
    problem:
      'Merchant self-registration was a friction-heavy flow that struggled inside the native Android Webview — small tap targets, slow first paint, and inconsistent layout.',
    result:
      'A responsive onboarding flow with smooth Webview integration, a commercial landing page that showcases the value prop, and a registration form that merchants actually complete.',
    projectId: 'pose-external',
    sections: [
      {
        id: 'problem',
        label: 'Problem',
        kind: 'prose',
        body: [
          'POSe External is the public face of the POS ecosystem — a landing page that drives customer acquisition, plus a self-onboarding form that lets merchants register without a sales call.',
          'The first version worked in a desktop browser but fell apart inside the Android Webview: layout reflowed on keyboard open, tap targets were too small, and the first paint was slow on mid-range devices. Completion rates suffered.',
        ],
      },
      {
        id: 'research',
        label: 'Research',
        kind: 'list',
        body: [
          'Profiled the Webview on three real Android devices — entry-level, mid-range, and high-end.',
          'Walked through the onboarding on each device, tracking where users hesitated or dropped off.',
          'Reviewed support tickets tagged "onboarding" for the previous quarter to find the common validation pain points.',
        ],
      },
      {
        id: 'architecture',
        label: 'Architecture',
        kind: 'prose',
        body: [
          'Rebuilt the flow on Vue + Vite with Tailwind for styling and TanStack Query for data — caching registration status and avoiding duplicate calls when the Webview reloads.',
          'Vuex retained for the few pieces of cross-step state (draft form values, validation cache).',
        ],
      },
      {
        id: 'ui',
        label: 'UI decisions',
        kind: 'list',
        body: [
          'Input fields sized so the OS keyboard does not trigger iOS / Android zoom on focus.',
          'Mobile-first layout: primary actions in the bottom third of the viewport, thumb-reach friendly.',
          'Commercial landing page and onboarding share the same design tokens — the look-and-feel is continuous from the ad click to the registered merchant.',
        ],
      },
      {
        id: 'results',
        label: 'Results',
        kind: 'prose',
        body: [
          'The onboarding flow became the default path for new merchants coming in from the landing page — smoother inside the Android Webview, faster first paint, and a registration form that converts.',
          'The shared design tokens became the basis of the design system we now use across multiple PCS products.',
        ],
      },
      {
        id: 'lessons',
        label: 'Lessons',
        kind: 'list',
        body: [
          'Mobile Webview quirks deserve a pre-launch checklist, not post-launch bug reports.',
          'When in doubt, don’t make users leave the app.',
          'A design system earns its keep on the second product — the second product ships fast.',
        ],
      },
    ],
  },
  {
    slug: 'tap',
    title: 'TAP — mobile-first field service management',
    subtitle: 'Sales visit tracking, integrated ticketing, and admin reporting on the field',
    context: 'Mobile-first FSM platform for sales agents and field technicians.',
    problem:
      'Field sales agents were filling out merchant visits and tickets through a desktop tool that fought them on their phones — slow, hard to use one-handed, no offline.',
    result:
      'A mobile-first React SPA where agents record visits, submit transactions and approvals, and resolve customer complaints — with an admin dashboard for reporting.',
    projectId: 'tap',
    sections: [
      {
        id: 'problem',
        label: 'Problem',
        kind: 'prose',
        body: [
          'TAP is the platform field sales agents and field technicians use for the day-to-day — recording merchant visit results, submitting new transaction submissions and approval requests, and resolving customer complaints through integrated ticketing.',
          'Before the rewrite, agents were zooming and panning through a desktop layout on their phones. The admin reporting team had no real-time view of approvals or ticket health.',
        ],
      },
      {
        id: 'research',
        label: 'Research',
        kind: 'list',
        body: [
          'Rode along with field agents for two days to see the tool in context — gloves, sun glare, single-handed use, patchy connectivity.',
          'Audited the legacy CSS for layout shifts on mobile viewport changes.',
          'Mapped the admin reporting needs against the data the mobile app was already collecting.',
        ],
      },
      {
        id: 'architecture',
        label: 'Architecture',
        kind: 'prose',
        body: [
          'Built as a React SPA on Vite with Redux Toolkit for cross-screen state and Tailwind for styling. Storybook used to develop components in isolation — critical for a product with so many forms.',
          'Routes are code-split; lists are virtualized. The data layer is built around RTK Query so the offline story can grow incrementally.',
        ],
      },
      {
        id: 'ui',
        label: 'UI decisions',
        kind: 'list',
        body: [
          'Bottom-anchored primary actions, full-screen forms for high-friction tasks.',
          'Tap targets ≥ 48px; primary CTAs 56px.',
          'Status uses color + text + icon, never color alone — critical in bright sun.',
        ],
      },
      {
        id: 'results',
        label: 'Results',
        kind: 'prose',
        body: [
          'Sales agents stopped fighting the tool. Admin / management gained a real-time view of approvals, ticket status, and sales metrics — they could make decisions on the day instead of waiting for end-of-week exports.',
        ],
      },
      {
        id: 'lessons',
        label: 'Lessons',
        kind: 'list',
        body: [
          'Ride-alongs are the cheapest research you can buy.',
          'A reporting dashboard is only as good as the data the mobile app already collects.',
          'Storybook pays for itself the moment you have more than two developers.',
        ],
      },
    ],
  },
  {
    slug: 'ky-revamp',
    title: 'KerjaYuk! HRIS — Laravel to React, without stopping HR',
    subtitle: 'Re-engineering an HRIS for performance, scalability, and modern UX',
    context: 'HR & finance operations for a 300-person company.',
    problem:
      'The original KerjaYuk! HRIS was server-rendered Laravel pages — every interaction was a full reload, and the most-used screen took 4 seconds on a typical day.',
    result:
      'A React SPA retaining all attendance and finance workflows — built behind a flag so HR operations never paused — with measurable performance and usability wins.',
    projectId: 'ky-revamp',
    sections: [
      {
        id: 'problem',
        label: 'Problem',
        kind: 'prose',
        body: [
          'KerjaYuk! is the HRIS for attendance and finance — a daily driver for HR and finance teams. The Laravel implementation worked, but every interaction was a full page reload and the slowest screen took 4 seconds to render.',
          'Constraint: HR operations could not pause. The rewrite had to ship behind a flag, one screen at a time.',
        ],
      },
      {
        id: 'research',
        label: 'Research',
        kind: 'list',
        body: [
          'Time-and-motion study of three HR users across a full week.',
          'Catalogued every screen and every API endpoint already in use.',
          'Identified the 20% of screens that handled 80% of daily traffic.',
        ],
      },
      {
        id: 'architecture',
        label: 'Architecture',
        kind: 'prose',
        body: [
          'React SPA on Vite, with the existing Laravel backend exposed through a JSON API. We added a thin BFF to handle auth cookies and to aggregate the multi-screen endpoints the legacy app was calling.',
          'Redux Toolkit handled cross-screen state (current user, current pay period). React Query handled server state. Tailwind for styling, Storybook for component development.',
        ],
      },
      {
        id: 'ui',
        label: 'UI decisions',
        kind: 'list',
        body: [
          'Tab-based layout for the most-used daily flows (attendance, leave, payroll).',
          'Inline editing everywhere — no more "Edit → form → Save → reload".',
          'A keyboard-first power-user mode on the attendance grid for finance payroll exports.',
        ],
      },
      {
        id: 'performance',
        label: 'Performance',
        kind: 'metrics',
        metrics: [
          { value: '4s → 0.7s', label: 'Attendance grid render' },
          { value: '−1.2s', label: 'Page-load time saved' },
          { value: '0 downtime', label: 'Flagged rollout over 6 weeks' },
          { value: '100% parity', label: 'All attendance + finance flows preserved' },
        ],
      },
      {
        id: 'results',
        label: 'Results',
        kind: 'prose',
        body: [
          'HR reclaimed roughly four hours per week. Finance started using the keyboard mode for payroll exports, which had previously been a Friday-afternoon chore.',
          'Performance work on the slowest screen paid for the entire migration — the same attention to bundle size and Core Web Vitals I now apply across every PCS project.',
        ],
      },
      {
        id: 'lessons',
        label: 'Lessons',
        kind: 'list',
        body: [
          'A flag-based rollout is non-negotiable for internal tools that can’t pause.',
          'Inline editing is the single highest-leverage UI upgrade for CRUD-heavy apps.',
          'Performance work on the slowest screen pays for the whole migration.',
        ],
      },
    ],
  },
]

/** Lookup helper. */
export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find(cs => cs.slug === slug)

/** Resolve a project by case-study slug. */
export const getProjectByCaseStudy = (slug: string, allProjects: Project[]): Project | undefined => {
  const cs = getCaseStudyBySlug(slug)
  return cs ? allProjects.find(p => p.id === cs.projectId) : undefined
}