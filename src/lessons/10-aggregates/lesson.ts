import { createLesson } from '../types';

export default createLesson(2, {
  title: 'Агрегатные функции',
  subtitle: 'COUNT · SUM · AVG · MIN · MAX',
  concept:
    'Агрегаты сводят набор строк к одному значению: COUNT считает, SUM суммирует, AVG находит среднее, MIN и MAX — границы диапазона.',
  example:
    'SELECT COUNT(*) AS headcount, AVG(salary) AS avg_salary FROM employees;',
  challenge: 'Посчитай число сотрудников и среднюю зарплату.',
  query:
    'SELECT COUNT(*) AS headcount, AVG(salary) AS avg_salary FROM employees;',
  solution:
    'SELECT COUNT(*) AS headcount, AVG(salary) AS avg_salary FROM employees;',
  tip: 'Большинство агрегатов игнорирует NULL; COUNT(*) считает все строки.',
});
