/**
 * Site-wide identity, SEO, and social metadata.
 * Imported by <SEO />, <Header />, <Footer />, and any component needing identity strings.
 */
export const site = {
  name: 'Muhamad Febri Algani',
  shortName: 'Gani',
  handle: '@rialga',
  role: 'Senior Frontend Engineer',
  location: 'South Tangerang, Indonesia',
  phone: '+62 857 1812 0287',
  email: 'febrialganios@gmail.com',
  resumeUrl: 'https://s.id/cv-gani',
  url: 'https://rialga.github.io/porto-app/',
  ogImage: 'https://rialga.github.io/porto-app/og-cover.png',
  twitter: 'rialga',
  builtWith: ['Vite', 'React 19', 'TypeScript', 'Tailwind 4', 'Framer Motion'],
  socials: [
    {
      type: 'github',
      label: 'GitHub',
      handle: 'Rialga',
      href: 'https://github.com/Rialga/',
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      handle: 'Muhamad Febri Algani',
      href: 'https://www.linkedin.com/in/muhamad-febri-algani-311533205/',
    },
    {
      type: 'email',
      label: 'Email',
      handle: 'febrialganios@gmail.com',
      href: 'mailto:febrialganios@gmail.com',
    },
  ] as const,
} as const

export type Site = typeof site
export type Social = (typeof site.socials)[number]