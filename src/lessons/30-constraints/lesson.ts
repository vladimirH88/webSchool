import { createLesson } from '../types';

/** Материалы урока об ограничениях целостности данных. */
export default createLesson(6, {
  title: 'Ограничения целостности',
  subtitle: 'PRIMARY KEY · FOREIGN KEY · UNIQUE · CHECK · DEFAULT',
  concept:
    'Ограничения защищают качество данных: PRIMARY KEY идентифицирует строку, FOREIGN KEY проверяет связь, UNIQUE запрещает дубли, CHECK проверяет условие, DEFAULT задаёт значение по умолчанию.',
  example:
    'CREATE TABLE employees (\n  id INTEGER PRIMARY KEY,\n  email TEXT UNIQUE,\n  salary INTEGER CHECK (salary >= 0),\n  active BOOLEAN DEFAULT TRUE\n);',
  challenge: 'Какое ограничение запретит отрицательную зарплату?',
  tip: 'Переноси правила целостности в БД, чтобы они действовали для всех клиентов приложения.',
});
