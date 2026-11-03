import { createLesson } from '../types';

export default createLesson(2, {
  title: 'Группировка',
  subtitle: 'GROUP BY',
  concept:
    'GROUP BY собирает строки с одинаковыми значениями в группы. Агрегаты затем вычисляются отдельно для каждой группы.',
  example: 'SELECT department, COUNT(*) FROM employees GROUP BY department;',
  challenge: 'Посчитай количество сотрудников в каждом отделе.',
  query:
    'SELECT department, COUNT(*) AS employee_count FROM employees GROUP BY department ORDER BY department;',
  solution:
    'SELECT department, COUNT(*) AS employee_count FROM employees GROUP BY department ORDER BY department;',
  tip: 'Каждый неагрегированный столбец в SELECT должен присутствовать в GROUP BY.',
});
