import { createLesson } from '../types';

export default createLesson(1, {
  title: 'Сортировка и лимиты',
  subtitle: 'ORDER BY · LIMIT',
  concept: 'ORDER BY сортирует строки. ASC означает возрастание и используется по умолчанию, DESC — убывание. LIMIT ограничивает число строк результата.',
  example: 'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;',
  challenge: 'Покажи трёх сотрудников с самой высокой зарплатой.',
  query: 'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;',
  solution: 'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;',
  tip: 'Сортировка применяется до LIMIT. Без ORDER BY состав ограниченной выборки не гарантирован.',
});
