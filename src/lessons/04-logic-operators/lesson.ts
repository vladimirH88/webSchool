import { createLesson } from '../types';

/** Материалы урока «Операторы сравнения и логики». */
export default createLesson(1, {
  title: 'Операторы сравнения и логики',
  subtitle: '= · <> · AND · OR · NOT',
  concept:
    'Сравнения =, <>, >, <, >= и <= формируют условия. AND требует истинности обоих условий, OR — хотя бы одного, NOT инвертирует условие.',
  example:
    "SELECT name FROM employees WHERE city = 'Москва' AND salary >= 100000;",
  challenge: 'Найди сотрудников из Москвы с зарплатой не ниже 100 000.',
  query:
    "SELECT name, salary FROM employees WHERE city = 'Москва' AND salary >= 100000;",
  solution:
    "SELECT name, salary FROM employees WHERE city = 'Москва' AND salary >= 100000;",
  tip: 'AND выполняется раньше OR. Используй скобки, чтобы явно задавать порядок сложных условий.',
});
