import type { Lesson } from './types';

/** Загружает и упорядочивает уроки из всех папок курса. */
const modules = import.meta.glob<{ default: Lesson }>('./*/lesson.ts', {
  eager: true,
});

/** Полный список уроков, отсортированный по пути папки. */
export const lessons = Object.entries(modules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([, module]) => module.default);
