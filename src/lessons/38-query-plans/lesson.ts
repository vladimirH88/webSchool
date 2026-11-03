import { createLesson } from '../types';

export default createLesson(7, {
  title: 'Оптимизация запросов',
  subtitle: 'EXPLAIN · ANALYZE',
  concept:
    'EXPLAIN показывает план выполнения: сканирование, соединения и оценки стоимости. EXPLAIN ANALYZE действительно исполняет запрос и сравнивает фактические строки и время с оценками.',
  example:
    'EXPLAIN ANALYZE\nSELECT name FROM employees WHERE department_id = 4;',
  challenge:
    'Почему перед EXPLAIN ANALYZE для UPDATE или DELETE нужно быть особенно осторожным?',
  tip: 'Сравнивай estimated rows и actual rows: сильное расхождение может указывать на неточные статистики.',
});
