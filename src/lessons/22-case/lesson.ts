import { createLesson } from '../types';

/** Материалы урока об условной логике CASE WHEN. */
export default createLesson(4, {
  title: 'Условная логика',
  subtitle: 'CASE WHEN',
  concept:
    'CASE WHEN выбирает результат по первому истинному условию и возвращает значение из THEN. ELSE задаёт запасной вариант; END закрывает выражение.',
  example:
    "SELECT name,\n  CASE WHEN salary >= 120000 THEN 'выше среднего'\n       ELSE 'обычная' END AS salary_band\nFROM employees;",
  challenge:
    'Добавь категорию «высокая» для зарплаты от 120 000 и «обычная» для остальных.',
  tip: 'Все ветки CASE должны возвращать совместимые типы данных.',
});
