import type { ComponentType } from 'react';

export type CourseSection = {
  id: string;
  title: string;
  level: string;
  marker: string;
};

export type CourseLesson = {
  id: string;
  sectionId: string;
  title: string;
  subtitle: string;
  description: string;
  concept: string;
  details?: string[];
  example: string;
  exampleOutput?: string;
  challenge: string;
  tip: string;
  mode: 'practice' | 'reading';
  minutes: number;
};

export type CourseActivityProps = {
  lessonId: string;
  onComplete: () => void;
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  sections: CourseSection[];
  lessons: CourseLesson[];
  Activity?: ComponentType<CourseActivityProps>;
  Aside?: ComponentType;
};
