import { createLesson } from '../types';

export default createLesson(1, {
  title: 'Уникальные значения',
  subtitle: 'DISTINCT',
  concept:
    'DISTINCT удаляет повторяющиеся комбинации выбранных столбцов. Он действует на всю строку результата, а не на каждый столбец по отдельности.',
  example: 'SELECT DISTINCT department FROM employees;',
  challenge: 'Выведи список городов без повторений.',
  query: 'SELECT DISTINCT city FROM employees ORDER BY city;',
  solution: 'SELECT DISTINCT city FROM employees ORDER BY city;',
  tip: 'Если выбрать несколько столбцов, уникальность определяется по их комбинации.',
});
