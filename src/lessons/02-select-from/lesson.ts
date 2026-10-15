import { createLesson } from '../types';

export default createLesson(1, {
  title: 'Базовый синтаксис',
  subtitle: 'SELECT · FROM',
  concept: 'SELECT выбирает столбцы, FROM задаёт источник строк. Используй * для всех полей, но в прикладных запросах лучше перечислять нужные столбцы.',
  example: 'SELECT name, role FROM employees;',
  challenge: 'Выведи имена и должности всех сотрудников.',
  query: 'SELECT name, role FROM employees;',
  solution: 'SELECT name, role FROM employees;',
  tip: 'Порядок в запросе фиксирован: сначала SELECT, затем FROM.',
});
