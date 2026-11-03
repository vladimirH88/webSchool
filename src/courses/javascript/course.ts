import type { CourseModule } from '../types';

const course: CourseModule = {
  id: 'javascript',
  title: 'JavaScript',
  description:
    'Освой основы языка, чтобы создавать интерактивные сайты и веб-приложения.',
  category: 'Разработка',
  icon: 'JS',
  color: '#aa8424',
  sections: [
    { id: 'basics', title: 'Основы языка', level: 'Начальный', marker: '🟡' },
    {
      id: 'logic',
      title: 'Логика и функции',
      level: 'Начальный',
      marker: '🟠',
    },
  ],
  lessons: [
    {
      id: 'javascript-variables',
      sectionId: 'basics',
      title: 'Переменные и значения',
      subtitle: 'const · let · типы данных',
      description:
        'Научись хранить данные и выбирать подходящий тип переменной.',
      concept:
        'Переменные дают значениям имена. Используй const по умолчанию, а let — когда значение нужно переназначить.',
      example: "const name = 'Мира';\nlet score = 0;\nscore = score + 1;",
      challenge:
        'Чем const отличается от let и какой вариант выбрать для постоянного значения?',
      tip: 'Выбирай const, пока программе не потребуется присвоить переменной новое значение.',
      mode: 'reading',
      minutes: 4,
    },
    {
      id: 'javascript-functions',
      sectionId: 'logic',
      title: 'Функции',
      subtitle: 'параметры · return',
      description:
        'Создавай переиспользуемые блоки кода с входными данными и результатом.',
      concept:
        'Функция объединяет действия под одним именем. Параметры передают ей данные, а return возвращает результат.',
      example: 'function greet(name) {\n  return `Привет, ${name}!`;\n}',
      challenge: 'Что вернёт функция greet, если вызвать greet("Ли")?',
      tip: 'Функция без return возвращает undefined.',
      mode: 'reading',
      minutes: 5,
    },
    {
      id: 'javascript-arrays',
      sectionId: 'logic',
      title: 'Массивы и перебор',
      subtitle: 'map · filter',
      description:
        'Храни списки значений и преобразуй их выразительными методами.',
      concept:
        'Массив хранит упорядоченный список. map создаёт новый список преобразованных значений, а filter оставляет только подходящие.',
      example:
        'const prices = [10, 20, 30];\nconst doubled = prices.map((price) => price * 2);',
      challenge: 'Каким методом получить новый массив только из цен больше 15?',
      tip: 'map и filter не изменяют исходный массив — они возвращают новый.',
      mode: 'reading',
      minutes: 6,
    },
  ],
};

export default course;
