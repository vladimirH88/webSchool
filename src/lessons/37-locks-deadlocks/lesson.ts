import { createLesson } from '../types';

/** Материалы урока о блокировках и взаимных блокировках. */
export default createLesson(7, {
  title: 'Блокировки и дедлоки',
  subtitle: 'LOCKS · DEADLOCKS',
  concept:
    'Блокировки координируют конкурентный доступ. Дедлок возникает, когда транзакции ждут ресурсы друг друга; СУБД обычно прерывает одну из них.',
  example:
    'BEGIN;\nSELECT * FROM accounts WHERE id = 1 FOR UPDATE;\nUPDATE accounts SET balance = balance - 10 WHERE id = 1;\nCOMMIT;',
  challenge:
    'Назови один способ снизить риск дедлоков при обновлении нескольких записей.',
  tip: 'Бери блокировки в одинаковом порядке и держи транзакции короткими.',
});
