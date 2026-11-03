import { createLesson } from '../types';

export default createLesson(3, {
  title: 'CROSS JOIN и SELF JOIN',
  subtitle: 'декартово произведение · таблица с собой',
  concept:
    'CROSS JOIN создаёт все комбинации строк двух источников. SELF JOIN соединяет таблицу саму с собой, например для сопоставления сотрудника и руководителя.',
  example:
    'SELECT e.name, manager.name AS manager\nFROM employees e\nLEFT JOIN employees manager ON manager.id = e.manager_id;',
  challenge:
    'Придумай условие SELF JOIN для вывода сотрудника и его руководителя.',
  tip: 'CROSS JOIN может резко увеличить число строк: размер результата равен произведению размеров источников.',
});
