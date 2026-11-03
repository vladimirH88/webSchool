import { createLesson } from '../types';

export default createLesson(7, {
  title: 'Процедуры, функции и триггеры',
  subtitle: 'programmable objects',
  concept:
    'Функция обычно возвращает значение и может использоваться в выражении; процедура вызывается отдельной командой и может управлять транзакцией в некоторых СУБД. Триггер запускает логику при событии таблицы.',
  example:
    'CREATE FUNCTION double_value(value INTEGER)\nRETURNS INTEGER\nLANGUAGE SQL\nRETURN value * 2;',
  challenge:
    'Какой программируемый объект автоматически срабатывает при INSERT или UPDATE?',
  tip: 'Проверяй особенности синтаксиса, управления транзакциями и переносимости в документации конкретной СУБД.',
});
