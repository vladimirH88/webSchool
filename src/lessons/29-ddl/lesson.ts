import { createLesson } from '../types';

/** Материалы урока о командах создания и изменения структуры базы данных. */
export default createLesson(6, {
  title: 'Создание и изменение структуры',
  subtitle: 'CREATE · ALTER · DROP',
  concept:
    'DDL описывает структуру БД. CREATE создаёт объект, ALTER меняет его, DROP удаляет. Эти команды воздействуют на схему, а не только на отдельные строки.',
  example:
    'CREATE TABLE departments (\n  id INTEGER,\n  name VARCHAR(100)\n);\nALTER TABLE departments ADD COLUMN location TEXT;\nDROP TABLE old_departments;',
  challenge: 'Определи, какая команда добавляет столбец существующей таблице.',
  tip: 'Перед DROP проверь зависимые объекты и сделай резервную копию, если данные важны.',
});
