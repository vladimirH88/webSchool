import { lessons as sqlLessons } from '../../lessons';
import { courseLevels } from '../../lessons/types';
import type { CourseModule } from '../types';
import { SqlActivity } from './SqlActivity';
import { SqlAside } from './SqlAside';

const course: CourseModule = {
  id: 'sql',
  title: 'SQL с нуля',
  description:
    'От первого SELECT до оптимизации запросов и администрирования баз данных.',
  category: 'Разработка',
  icon: '⌘',
  color: '#258565',
  sections: courseLevels.map((level) => ({
    id: String(level.id),
    title: level.title,
    level: level.label,
    marker: level.marker,
  })),
  lessons: sqlLessons.map((lesson, index) => ({
    id: `sql-${index + 1}`,
    sectionId: String(lesson.section),
    title: lesson.title,
    subtitle: lesson.subtitle,
    description: lesson.description,
    concept: lesson.concept,
    example: lesson.example,
    challenge: lesson.challenge,
    tip: lesson.tip,
    mode: lesson.mode,
    minutes: 5,
  })),
  Activity: SqlActivity,
  Aside: SqlAside,
};

export default course;
