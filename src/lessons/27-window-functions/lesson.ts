import { createLesson } from '../types';

export default createLesson(5, {
  title: 'Оконные функции',
  subtitle: 'ROW_NUMBER · RANK · LEAD · LAG · OVER',
  concept: 'Оконная функция считает значения по связанному набору строк, не схлопывая строки в группы. OVER задаёт окно, PARTITION BY — разделы, ORDER BY — порядок внутри окна.',
  example: 'SELECT name, department, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;',
  challenge: 'Выбери функцию, которая вернёт предыдущую зарплату в упорядоченной выборке.',
  tip: 'ROW_NUMBER всегда уникален в окне; RANK оставляет пропуски после одинаковых значений.',
});
