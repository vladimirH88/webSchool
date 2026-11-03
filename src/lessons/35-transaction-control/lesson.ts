import { createLesson } from '../types';

/** Материалы урока об управлении транзакциями. */
export default createLesson(7, {
  title: 'Управление транзакциями',
  subtitle: 'BEGIN · COMMIT · ROLLBACK',
  concept:
    'BEGIN начинает транзакцию, COMMIT фиксирует изменения, ROLLBACK отменяет незакоммиченные изменения. Точная синтаксическая форма зависит от СУБД.',
  example: 'BEGIN;\nUPDATE employees SET salary = salary * 1.05;\nROLLBACK;',
  challenge:
    'Какую команду выполнить, чтобы проверить изменения и не сохранять их?',
  tip: 'После эксперимента в транзакции явно выполни COMMIT или ROLLBACK.',
});
