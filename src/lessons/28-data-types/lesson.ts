import { createLesson } from '../types';

export default createLesson(5, {
  title: 'Продвинутые типы данных',
  subtitle: 'строки · даты · JSON / JSONB',
  concept:
    'Выбирай тип под смысл данных: числовой для сумм, DATE/TIMESTAMP для времени, строковые типы для текста. PostgreSQL JSON хранит исходный текст, JSONB — бинарное представление с эффективной обработкой.',
  example:
    'SELECT created_at::date, payload->>\'status\' AS status\nFROM events\nWHERE payload @> \'{"source":"web"}\'::jsonb;',
  challenge:
    'Какой тип PostgreSQL выбрать для частого поиска по ключам JSON-документа?',
  tip: 'Храни время в подходящем временном типе, а не в произвольной строке.',
});
