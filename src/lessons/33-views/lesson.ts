import { createLesson } from '../types';

/** Материалы урока о представлениях и материализованных представлениях. */
export default createLesson(6, {
  title: 'Представления',
  subtitle: 'VIEW · MATERIALIZED VIEW',
  concept:
    'VIEW хранит определение запроса и показывает актуальный результат при обращении. Materialized view сохраняет снимок результата и требует обновления, но может ускорить тяжёлые чтения.',
  example:
    "CREATE VIEW engineering_team AS\nSELECT id, name, role\nFROM employees\nWHERE department = 'Engineering';",
  challenge:
    'Какой вид представления нужно обновлять, если он хранит материализованный результат?',
  tip: 'Материализованное представление ускоряет чтение ценой актуальности данных и дополнительного места.',
});
