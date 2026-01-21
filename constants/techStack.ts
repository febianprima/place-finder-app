export interface TechStackCard {
  title: string;
  technologies: string[];
}

export const TECH_STACK_CONFIG: TechStackCard[] = [
  {
    title: 'Frontend',
    technologies: ['Next.js 16', 'TypeScript'],
  },
  {
    title: 'State Management',
    technologies: ['Redux Toolkit', 'Redux Thunk'],
  },
  {
    title: 'UI Library',
    technologies: ['Ant Design', 'Tailwind CSS'],
  },
  {
    title: 'Maps & API',
    technologies: ['Google Maps API', 'Places API'],
  },
];
