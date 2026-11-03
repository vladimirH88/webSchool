import { createLesson } from '../types';

export default createLesson(1, {
  title: 'Псевдонимы столбцов',
  subtitle: 'AS',
  concept:
    'AS задаёт столбцу результата понятное временное имя. Псевдоним не меняет схему таблицы; ключевое слово AS во многих диалектах можно опустить.',
  example:
    'SELECT name AS employee_name, salary AS monthly_salary FROM employees;',
  challenge: 'Переименуй salary в monthly_salary в результате.',
  query: 'SELECT name, salary AS monthly_salary FROM employees;',
  solution: 'SELECT name, salary AS monthly_salary FROM employees;',
  tip: 'Псевдонимы особенно полезны для агрегатов и вычисляемых выражений.',
});
