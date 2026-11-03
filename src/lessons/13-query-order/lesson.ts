import { createLesson } from '../types';

/** Материалы урока о логическом порядке выполнения SQL-запроса. */
export default createLesson(2, {
  title: 'Порядок выполнения запроса',
  subtitle: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT',
  concept:
    'Логически SQL обрабатывается не в порядке записи: сначала источник FROM, затем фильтр WHERE, группировка и HAVING, проекция SELECT, сортировка и LIMIT.',
  example:
    'SELECT department, COUNT(*) AS n\nFROM employees\nWHERE salary > 90000\nGROUP BY department\nHAVING COUNT(*) > 1\nORDER BY n DESC\nLIMIT 5;',
  challenge:
    'Проследи, на каком этапе удаляются строки с зарплатой не выше 90 000.',
  tip: 'Логический порядок объясняет, почему алиас SELECT обычно доступен в ORDER BY, но не в WHERE.',
});
