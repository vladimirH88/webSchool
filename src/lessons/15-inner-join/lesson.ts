import { createLesson } from '../types';

export default createLesson(3, {
  title: 'Внутреннее соединение',
  subtitle: 'INNER JOIN',
  concept:
    'INNER JOIN соединяет строки по условию ON и возвращает только совпавшие пары. Строки без пары в результат не попадают.',
  example:
    'SELECT e.name, d.name AS department\nFROM employees e\nINNER JOIN departments d ON d.id = e.department_id;',
  challenge:
    'Укажи, какие две таблицы и ключи нужно соединить, чтобы получить название отдела каждого сотрудника.',
  tip: 'Всегда задавай явное условие ON и используй короткие псевдонимы таблиц для читаемости.',
});
