import { createLesson } from '../types';

/** Материалы урока об обобщённых табличных выражениях CTE. */
export default createLesson(5, {
  title: 'Обобщённые табличные выражения',
  subtitle: 'WITH · CTE',
  concept:
    'CTE именует промежуточный результат в начале запроса. Он помогает разделить сложную логику на читаемые этапы и может использоваться дальше как источник данных.',
  example:
    'WITH high_earners AS (\n  SELECT name, salary FROM employees WHERE salary > 120000\n)\nSELECT name FROM high_earners;',
  challenge: 'Назови CTE и обратись к нему во внешнем запросе.',
  tip: 'CTE существует только в пределах одного SQL-запроса; это не постоянная таблица.',
});
