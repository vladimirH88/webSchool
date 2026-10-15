import { createLesson } from '../types';

export default createLesson(5, {
  title: 'Рекурсивные CTE',
  subtitle: 'WITH RECURSIVE',
  concept: 'Рекурсивный CTE состоит из начального запроса и рекурсивной части, которая ссылается на предыдущий результат. Подходит для деревьев и иерархий.',
  example: 'WITH RECURSIVE numbers(n) AS (\n  SELECT 1\n  UNION ALL\n  SELECT n + 1 FROM numbers WHERE n < 5\n)\nSELECT n FROM numbers;',
  challenge: 'Определи условие остановки рекурсии в примере.',
  tip: 'Без корректного условия завершения рекурсивный запрос может не остановиться.',
});
