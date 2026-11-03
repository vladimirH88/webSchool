import { createLesson } from '../types';

/** Материалы урока об операторах EXISTS и NOT EXISTS. */
export default createLesson(4, {
  title: 'EXISTS и NOT EXISTS',
  subtitle: 'проверка наличия строк',
  concept:
    'EXISTS истинен, если подзапрос возвращает хотя бы одну строку. NOT EXISTS — если строк не найдено. Содержимое SELECT внутри обычно не важно.',
  example:
    'SELECT d.name\nFROM departments d\nWHERE EXISTS (\n  SELECT 1 FROM employees e WHERE e.department_id = d.id\n);',
  challenge: 'Как выбрать отделы, в которых нет ни одного сотрудника?',
  tip: 'Для отрицательной проверки NOT EXISTS часто безопаснее, чем NOT IN, особенно если подзапрос может вернуть NULL.',
});
