import { createLesson } from '../types';

/** Материалы урока «Специальные операторы фильтрации». */
export default createLesson(1, {
  title: 'Специальные операторы фильтрации',
  subtitle: 'IN · BETWEEN · LIKE · IS NULL',
  concept:
    'IN проверяет значение по списку, BETWEEN — по включительному диапазону, LIKE ищет по шаблону (% — любая строка, _ — один символ), IS NULL проверяет отсутствие значения.',
  example:
    "SELECT name FROM employees WHERE department IN ('Design', 'Product');\nSELECT name FROM employees WHERE salary BETWEEN 90000 AND 120000;",
  challenge: 'Найди сотрудников из отделов Design и Product.',
  query:
    "SELECT name, department FROM employees WHERE department IN ('Design', 'Product');",
  solution:
    "SELECT name, department FROM employees WHERE department IN ('Design', 'Product');",
  tip: 'Для NULL всегда используй IS NULL или IS NOT NULL: сравнение через = NULL не работает.',
});
