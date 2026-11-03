import { createLesson } from '../types';

/** Материалы урока о внешних соединениях таблиц. */
export default createLesson(3, {
  title: 'Внешние соединения',
  subtitle: 'LEFT · RIGHT · FULL OUTER JOIN',
  concept:
    'LEFT JOIN сохраняет все строки левой таблицы, RIGHT — правой, FULL OUTER JOIN — обеих. Несовпавшие поля второй стороны заполняются NULL.',
  example:
    'SELECT d.name, e.name\nFROM departments d\nLEFT JOIN employees e ON e.department_id = d.id;',
  challenge: 'Какое соединение выберет отделы, в которых пока нет сотрудников?',
  tip: 'LEFT JOIN плюс фильтр WHERE по NULL-столбцу правой таблицы помогает находить строки без пары.',
});
