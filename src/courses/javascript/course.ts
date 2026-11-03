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
        'Переменная связывает понятное имя со значением, чтобы к нему можно было обратиться позже. В JavaScript значение имеет тип, например строка, число или логическое значение.',
      details: [
        'Объявляй переменные через const, если не планируешь присваивать им новое значение. Такое имя нельзя переназначить.',
        'Используй let, когда значение должно измениться: например, счётчик уроков или текущий шаг.',
        'Строки записываются в кавычках, числа — без них. Оператор typeof помогает узнать тип значения.',
        'Шаблонная строка в обратных кавычках позволяет вставлять значения через ${имяПеременной}.',
      ],
      example:
        "const courseTitle = 'JavaScript';\nlet completedLessons = 0;\ncompletedLessons += 1;\nconsole.log(`${courseTitle}: ${completedLessons} из 5`);\nconsole.log(typeof courseTitle);",
      exampleOutput: 'JavaScript: 1 из 5\nstring',
      challenge:
        'Создай переменную const с именем города и let со счётчиком посещённых мест. Увеличь счётчик на один и выведи оба значения.',
      tip: 'Выбирай const по умолчанию, а let — только если переменную нужно переназначать.',
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
        'Функция — именованный блок кода, который можно вызывать много раз. Она может принимать параметры, выполнять действия и возвращать результат.',
      details: [
        'Параметры указываются в объявлении функции и работают как локальные переменные внутри неё.',
        'Аргументы — это конкретные значения, которые передаются при вызове функции.',
        'Оператор return завершает выполнение функции и отдаёт её результат вызывающему коду.',
        'Функции помогают не копировать один и тот же алгоритм и упрощают проверку кода.',
      ],
      example:
        'function calculateTotal(price, quantity) {\n  const total = price * quantity;\n  return total;\n}\n\nconst orderTotal = calculateTotal(250, 3);\nconsole.log(orderTotal);',
      exampleOutput: '750',
      challenge:
        'Напиши функцию calculateTotal(price, quantity), которая возвращает стоимость заказа. Проверь её с ценой 250 и количеством 3: результат должен быть 750.',
      tip: 'Если функция должна дать вызывающему коду значение, верни его через return.',
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
        'Массив хранит упорядоченную коллекцию значений. Индексы начинаются с нуля. Методы map и filter позволяют получить новые массивы, не меняя исходный.',
      details: [
        'Используй индекс в квадратных скобках, чтобы прочитать элемент: prices[0] — первый элемент.',
        'Метод map вызывает функцию для каждого элемента и собирает преобразованные значения в новый массив.',
        'Метод filter оставляет только те элементы, для которых функция-проверка вернула true.',
        'Оба метода принимают callback-функцию, которая получает текущий элемент массива.',
      ],
      example:
        'const prices = [10, 20, 30];\nconst doubledPrices = prices.map((price) => price * 2);\nconst affordablePrices = prices.filter((price) => price <= 20);\n\nconsole.log(doubledPrices);\nconsole.log(affordablePrices);',
      exampleOutput: '[20, 40, 60]\n[10, 20]',
      challenge:
        'Для массива оценок [4, 7, 9] создай новый массив оценок, увеличенных на один балл, а затем отфильтруй оценки не ниже 8.',
      tip: 'map изменяет форму значений, filter отбирает элементы — исходный массив остаётся прежним.',
      mode: 'reading',
      minutes: 6,
    },
  ],
};

export default course;
