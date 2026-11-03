import { createLesson } from '../types';

export default createLesson(6, {
  title: 'Индексы',
  subtitle: 'B-дерево · составные · кластеризация',
  concept:
    'Индекс ускоряет поиск, но занимает место и увеличивает стоимость записи. B-деревья подходят для диапазонов и сортировки; составной индекс зависит от порядка колонок. Значение кластеризации зависит от СУБД.',
  example:
    'CREATE INDEX idx_employees_department_salary\nON employees (department_id, salary);',
  challenge:
    'Какой столбец должен идти первым в составном индексе для частых фильтров по department_id и salary?',
  tip: 'Индексируй запросы, подтверждённые планом и измерениями; не создавай индекс наугад.',
});
