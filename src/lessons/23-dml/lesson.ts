import { createLesson } from '../types';

export default createLesson(4, {
  title: 'Изменение данных',
  subtitle: 'INSERT · UPDATE · DELETE',
  concept:
    'INSERT добавляет строки, UPDATE меняет существующие, DELETE удаляет строки. Условия WHERE в UPDATE и DELETE критичны: без них изменятся все строки таблицы.',
  example:
    "INSERT INTO departments (id, name) VALUES (10, 'Support');\nUPDATE employees SET city = 'Казань' WHERE id = 1;\nDELETE FROM employees WHERE id = 1;",
  challenge:
    'Найди в примерах команду, которая удалит все строки, если убрать WHERE.',
  tip: 'Перед UPDATE или DELETE сначала выполни SELECT с тем же WHERE и проверь целевые строки.',
});
