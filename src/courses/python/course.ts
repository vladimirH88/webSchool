import type { CourseModule } from '../types';

const course: CourseModule = {
  id: 'python',
  title: 'Python',
  description:
    'Начни программировать на понятном языке и собери базу для своих первых проектов.',
  category: 'Разработка',
  icon: 'Py',
  color: '#39729b',
  sections: [
    { id: 'basics', title: 'Первые шаги', level: 'Начальный', marker: '🔵' },
    { id: 'collections', title: 'Коллекции', level: 'Начальный', marker: '🟣' },
  ],
  lessons: [
    {
      id: 'python-variables',
      sectionId: 'basics',
      title: 'Переменные и типы',
      subtitle: 'str · int · float · bool',
      description:
        'Познакомься с переменными и основными типами данных Python.',
      concept:
        'Переменная связывает имя со значением. Python определяет тип автоматически по присвоенному значению.',
      example: 'name = "Алекс"\nage = 24\nis_student = True',
      challenge: 'Какой тип данных подходит для хранения возраста и почему?',
      tip: 'Для строк используй кавычки, для целых чисел — запись без кавычек.',
      mode: 'reading',
      minutes: 4,
    },
    {
      id: 'python-conditions',
      sectionId: 'basics',
      title: 'Условия',
      subtitle: 'if · elif · else',
      description: 'Управляй ходом программы в зависимости от условий.',
      concept:
        'Конструкция if выполняет блок кода, когда условие истинно. elif проверяет следующий вариант, а else обрабатывает остальные случаи.',
      example:
        'if temperature > 25:\n    print("Тепло")\nelse:\n    print("Прохладно")',
      challenge: 'Какой блок выполнится, если temperature равна 20?',
      tip: 'В Python отступы определяют границы блока кода.',
      mode: 'reading',
      minutes: 5,
    },
    {
      id: 'python-lists',
      sectionId: 'collections',
      title: 'Списки',
      subtitle: 'индексы · append · цикл for',
      description:
        'Объединяй значения в последовательность и обрабатывай их по одному.',
      concept:
        'Список хранит значения в определённом порядке. К элементам обращаются по индексу, начиная с нуля, а метод append добавляет элемент в конец.',
      example:
        'tools = ["молоток", "пила"]\ntools.append("рулетка")\nprint(tools[0])',
      challenge: 'Как получить последний элемент списка tools?',
      tip: 'Индекс -1 обращается к последнему элементу списка.',
      mode: 'reading',
      minutes: 5,
    },
  ],
};

export default course;
