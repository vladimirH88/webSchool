import { createLesson } from '../types';

export default createLesson(3, {
  title: 'Множественные операции',
  subtitle: 'UNION · INTERSECT · EXCEPT',
  concept:
    'Операции множеств объединяют результаты совместимых SELECT: UNION убирает дубликаты, UNION ALL сохраняет, INTERSECT оставляет общие строки, EXCEPT — только строки первого запроса.',
  example: 'SELECT city FROM customers\nUNION\nSELECT city FROM suppliers;',
  challenge:
    'Выбери операцию, которая сохранит дубликаты городов из двух выборок.',
  tip: 'У запросов по обе стороны операции должно совпадать число и совместимость типов столбцов.',
});
