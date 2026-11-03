export const courseLevels = [
  { id: 1, title: 'Основы', label: 'Базовый', marker: '🟢' },
  { id: 2, title: 'Агрегация и группировка', label: 'Средний', marker: '🟡' },
  { id: 3, title: 'Несколько таблиц', label: 'Средний', marker: '🟠' },
  {
    id: 4,
    title: 'Подзапросы и изменение данных',
    label: 'Продвинутый',
    marker: '🔴',
  },
  { id: 5, title: 'Продвинутая аналитика', label: 'Продвинутый', marker: '🟣' },
  { id: 6, title: 'Проектирование и DDL', label: 'Продвинутый', marker: '🟤' },
  {
    id: 7,
    title: 'Оптимизация и администрирование',
    label: 'Экспертный',
    marker: '⚫',
  },
] as const;

export type CourseLevelId = (typeof courseLevels)[number]['id'];

export type Lesson = {
  section: CourseLevelId;
  sectionTitle: string;
  level: string;
  mode: 'practice' | 'reading';
  title: string;
  subtitle: string;
  description: string;
  concept: string;
  example: string;
  challenge: string;
  query: string;
  solution: string;
  tip: string;
};

type LessonContent = Pick<
  Lesson,
  'title' | 'subtitle' | 'concept' | 'example' | 'challenge' | 'tip'
> & {
  solution?: string;
  query?: string;
};

export function createLesson(
  section: CourseLevelId,
  content: LessonContent,
): Lesson {
  const courseLevel = courseLevels.find((item) => item.id === section);
  if (!courseLevel) throw new Error(`Unknown course level: ${section}`);

  const solution = content.solution ?? '';
  return {
    ...content,
    section,
    sectionTitle: courseLevel.title,
    level: courseLevel.label,
    mode: solution ? 'practice' : 'reading',
    description: `${courseLevel.marker} Уровень ${section} · ${courseLevel.title}`,
    query: content.query ?? (solution || content.example),
    solution,
  };
}
