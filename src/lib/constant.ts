// ...existing constants...

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform with product catalog, shopping cart, and payment integration. Built with React and Redux for state management.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Stripe API'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, user authentication, and team collaboration features.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    technologies: ['Vue.js', 'Firebase', 'Vuetify'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },

  {
    id: '3',
    title: 'Analytics Dashboard',
    description:
      'A comprehensive analytics dashboard displaying real-time data visualization with charts and detailed metrics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['React', 'Chart.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '4',
    title: 'Weather Application',
    description:
      'A responsive weather app that fetches real-time weather data with location-based forecasting and detailed weather information.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
    technologies: ['React', 'OpenWeather API', 'Axios', 'CSS Grid'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
]

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'PCS Indonesia.',
    period: '2023 - Present',
    description:
      'Led the development of multiple web applications with focus on performance optimization and user experience. Mentored junior developers and established best practices for the team.',
    technologies: [
      'React',
      'RTK Query',
      'Vue.js',
      'Vuex',
      'Tanstack Query',
      'Tailwind CSS',
      'Shadcn UI',
      'Vite',
      'Bootstrap',
    ],
  },
  {
    id: '2',
    title: 'Sofware Engineer | Frontend',
    company: 'PT Tigernix Indonesia',
    period: '2021 - 2023',
    description:
      'Performed UI slicing and customization for Odoo modules that lacked a built-in frontend. Developed new web-based features using Bootstrap framework for responsive UI design.Collaborated with functional and backend teams to ensure ERP system compatibility and smooth integration.',
    technologies: ['Odoo', 'JQuery', 'JavaScript', 'SCSS', 'Bootstrap'],
  },
  {
    id: '3',
    title: 'Full Stack Developer | Intern',
    company: 'Kominfo Kota Padang',
    period: '2020 - 2021',
    description:
      'Developed administrative dashboards utilizing HTML, CSS, and JavaScript for internal operational use. Designed database structures and implemented CRUD functionality with PHP (Laravel) and MySQL. Took initiative to independently execute development tasks while actively collaborating with the supervisor to ensure alignment with project specifications.',
    technologies: ['Laravel', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
]

export interface SkillCategory {
  category: string
  skills: Array<{ name: string; proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert' }>
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend Frameworks',
    skills: [
      { name: 'React', proficiency: 'expert' },
      { name: 'Vue.js', proficiency: 'expert' },
      { name: 'Next.js', proficiency: 'expert' },
    ],
  },
  {
    category: 'Styling & UI',
    skills: [
      { name: 'Tailwind CSS', proficiency: 'expert' },
      { name: 'CSS/SCSS', proficiency: 'expert' },
      { name: 'Material-UI', proficiency: 'expert' },
      { name: 'Shadcn UI', proficiency: 'expert' },
      { name: 'Bootstrap', proficiency: 'expert' },
      { name: 'Responsive Design', proficiency: 'expert' },
    ],
  },
  {
    category: 'Tools & Libraries',
    skills: [
      { name: 'Git', proficiency: 'expert' },
      { name: 'RTK Query', proficiency: 'expert' },
      { name: 'Tanstack Query', proficiency: 'expert' },
      { name: 'Jest', proficiency: 'expert' },
      { name: 'Vuex', proficiency: 'expert' },
      { name: 'Axios', proficiency: 'expert' },
    ],
  },
  {
    category: 'Web Technologies',
    skills: [
      { name: 'JavaScript (ES6+)', proficiency: 'expert' },
      { name: 'HTML5', proficiency: 'expert' },
      { name: 'REST APIs', proficiency: 'expert' },
      { name: 'Web Performance', proficiency: 'expert' },
    ],
  },
]
