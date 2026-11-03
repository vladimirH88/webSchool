import type { CourseModule } from './types';

const modules = import.meta.glob<{ default: CourseModule }>('./*/course.ts', {
  eager: true,
});

export const courses = Object.entries(modules)
  .map(([, module]) => module.default)
  .sort((left, right) => left.title.localeCompare(right.title, 'ru'));
