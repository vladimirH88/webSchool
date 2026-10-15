import { createLesson } from '../types';

export default createLesson(7, {
  title: 'Транзакции и ACID',
  subtitle: 'атомарность · согласованность · изоляция · надёжность',
  concept: 'ACID — свойства транзакций: Atomicity выполняет всё или ничего, Consistency сохраняет ограничения, Isolation разделяет параллельные операции, Durability сохраняет подтверждённые изменения.',
  example: 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;',
  challenge: 'Какое свойство ACID гарантирует, что перевод не выполнится наполовину?',
  tip: 'Связывай несколько изменений одной бизнес-операции в транзакцию.',
});
