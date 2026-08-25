export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Think',
    description: 'Understanding the problem before touching a single pixel or line of code.',
  },
  {
    index: '02',
    title: 'Design',
    description: 'Building the visual direction — structure, hierarchy, and the details that hold it together.',
  },
  {
    index: '03',
    title: 'Build',
    description: 'Turning the idea into a working product, piece by piece.',
  },
  {
    index: '04',
    title: 'Evolve',
    description: 'Improve. Learn. Iterate. Nothing ships and stays static.',
  },
];
