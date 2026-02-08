// ...existing constants...

export interface Project {
  id: string
  title: string
  subtitle: string
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
    title: 'POSe Portal',
    subtitle: 'Web Back Office Portal for POS Ecosystem',
    description:
      'Centralized Web Back Office Portal for POS ecosystem. Features include Master Data Management, transaction dashboard, and business reporting module for monitoring operational health and sales performance.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&h=300&fit=crop',
    technologies: ['Vue', 'Vuex', 'Axios', 'Tanstack Query' ,'Bootstrap'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
  },
  {
    id: '2',
    title: 'POSe External',
    subtitle: 'Merchant Onboarding Platform',
    description:
      'Landing page and merchant self-onboarding platform with responsive registration workflow and mobile webview optimization for Android integration.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop',
    technologies: ['Vue', 'Vite', 'Tanstack Query', 'Vue Shadcn', 'Tailwind', 'Vuex'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '3',
    title: 'MENTOR',
    subtitle: 'Field Service Management',
    description:
      'Web-based FSM platform with ticketing module and real-time performance dashboard to monitor SLA, response time, and ticket resolution rates.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=300&fit=crop',
    technologies: ['Vue', 'Vuex', 'Bootstrap'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '4',
    title: 'TAP',
    subtitle: 'Sales & Operations Management',
    description:
      'Mobile-first FSM platform for sales visit management, ticketing & dispatching integration, and admin reporting dashboard.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=300&fit=crop',
    technologies: ['ReactJS', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '5',
    title: 'KerjaYuk!',
    subtitle: 'HR Information System',
    description:
      'HRIS application for managing employee attendance and finance to streamline HR and Finance operations.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop',
    technologies: ['Laravel', 'jQuery', 'AJAX', 'Bootstrap'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '6',
    title: 'RE - KerjaYuk! (HRIS Revamp)',
    subtitle: 'HRIS Revamp',
    description:
      'Re-engineered HRIS from Laravel to ReactJS for better performance, scalability, and modern user experience.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
    technologies: ['ReactJS', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '7',
    title: 'KY - Loyalty',
    subtitle: 'Progressive Web App',
    description:
      'Progressive Web App for tracking cashier rewards and managing reward points with seamless user experience.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['ReactJS', 'Vite', 'Storybook', 'Redux Toolkit', 'Tailwind'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '8',
    title: 'School Registration Form',
    subtitle: 'Student Enrollment System',
    description:
      'Student enrollment system to enhance user experience and data accuracy in registration process.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=300&fit=crop',
    technologies: ['Odoo ERP', 'jQuery', 'AJAX', 'Bootstrap'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '9',
    title: 'Donation Platform',
    subtitle: 'Donation Management System',
    description: 'Web platform to facilitate and manage donations with user-friendly interface.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=300&fit=crop',
    technologies: ['Odoo ERP', 'jQuery', 'AJAX', 'Bootstrap'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: '10',
    title: 'E-Library',     
    subtitle: 'Library Management System',
    description:
      'Library management system with cataloging, borrowing, and return tracking features.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=300&fit=crop',
    technologies: ['Laravel', 'Bootstrap'],
    liveUrl: '',
    githubUrl: '',
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
    period: '02/2023 - Present',
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
    period: '10/2021 - 12/2022',
    description:
      'Performed UI slicing and customization for Odoo modules that lacked a built-in frontend. Developed new web-based features using Bootstrap framework for responsive UI design.Collaborated with functional and backend teams to ensure ERP system compatibility and smooth integration.',
    technologies: ['Odoo', 'JQuery', 'JavaScript', 'SCSS', 'Bootstrap'],
  },
  {
    id: '3',
    title: 'Full Stack Developer | Intern',
    company: 'Kominfo Kota Padang',
    period: '3 Months Internship | 12/2018 - 02/2019',
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
