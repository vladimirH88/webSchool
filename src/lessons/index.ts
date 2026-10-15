import type { Lesson } from './types';

const modules = import.meta.glob<{ default: Lesson }>('./*/lesson.ts', { eager: true });

export const lessons = Object.entries(modules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([, module]) => module.default);
