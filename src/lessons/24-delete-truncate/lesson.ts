import { createLesson } from '../types';

export default createLesson(4, {
  title: 'DELETE и TRUNCATE',
  subtitle: 'удаление строк · очистка таблицы',
  concept: 'DELETE удаляет выбранные строки и поддерживает WHERE. TRUNCATE быстро очищает всю таблицу без фильтра по строкам; детали блокировок и отката зависят от СУБД.',
  example: 'DELETE FROM sessions WHERE expires_at < CURRENT_DATE;\nTRUNCATE TABLE staging_import;',
  challenge: 'Какую команду выбрать для удаления только просроченных сессий?',
  tip: 'TRUNCATE не является синонимом DELETE без WHERE во всех аспектах: проверь поведение identity, триггеров и транзакций в своей СУБД.',
});
