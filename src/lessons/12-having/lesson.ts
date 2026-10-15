import { createLesson } from '../types';

export default createLesson(2, {
  title: 'Фильтрация групп',
  subtitle: 'HAVING',
  concept: 'HAVING фильтрует группы после GROUP BY. В отличие от WHERE, он может проверять результаты агрегатных функций.',
  example: 'SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 1;',
  challenge: 'Найди отделы, в которых работает больше одного сотрудника.',
  query: 'SELECT department, COUNT(*) AS employee_count FROM employees GROUP BY department HAVING COUNT(*) > 1 ORDER BY department;',
  solution: 'SELECT department, COUNT(*) AS employee_count FROM employees GROUP BY department HAVING COUNT(*) > 1 ORDER BY department;',
  tip: 'Сначала WHERE исключает отдельные строки, затем GROUP BY создаёт группы, и только потом HAVING фильтрует группы.',
});
