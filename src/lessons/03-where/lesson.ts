import { createLesson } from '../types';

/** Материалы урока «Фильтрация данных с помощью WHERE». */
export default createLesson(1, {
  title: 'Фильтрация данных',
  subtitle: 'WHERE',
  concept:
    'WHERE оставляет только строки, удовлетворяющие условию. Текст сравнивают в кавычках, числа — без кавычек.',
  example: "SELECT name, salary FROM employees WHERE city = 'Москва';",
  challenge: 'Найди сотрудников с зарплатой выше 100 000.',
  query: 'SELECT name, salary FROM employees WHERE salary > 100000;',
  solution: 'SELECT name, salary FROM employees WHERE salary > 100000;',
  tip: 'WHERE применяется к строкам до группировки и вычисления агрегатов.',
});
