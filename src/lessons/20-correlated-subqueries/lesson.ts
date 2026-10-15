import { createLesson } from '../types';

export default createLesson(4, {
  title: 'Коррелированные подзапросы',
  subtitle: 'внешняя ссылка · повторное вычисление',
  concept: 'Коррелированный подзапрос ссылается на столбец внешнего запроса и логически вычисляется для его строк. Часто его можно заменить JOIN или оконной функцией.',
  example: 'SELECT e.name\nFROM employees e\nWHERE e.salary > (\n  SELECT AVG(peer.salary)\n  FROM employees peer\n  WHERE peer.department = e.department\n);',
  challenge: 'Объясни, почему внутренний запрос использует значение department из внешней строки e.',
  tip: 'Используй псевдонимы для внешней и внутренней таблицы, чтобы не путать одинаковые имена столбцов.',
});
