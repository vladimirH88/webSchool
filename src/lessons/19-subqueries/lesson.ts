import { createLesson } from '../types';

export default createLesson(4, {
  title: 'Подзапросы',
  subtitle: 'WHERE · FROM · SELECT',
  concept: 'Подзапрос — SELECT внутри другого запроса. В WHERE он может вернуть значение или набор значений, в FROM становится временной таблицей, в SELECT — скалярным значением.',
  example: 'SELECT name\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);',
  challenge: 'Найди сотрудников с зарплатой выше средней по компании.',
  tip: 'Скалярный подзапрос должен вернуть не более одного значения; подзапрос в FROM часто требует псевдоним.',
});
