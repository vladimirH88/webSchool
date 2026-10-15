import { createLesson } from '../types';

export default createLesson(1, {
  title: 'Работа с NULL',
  subtitle: 'COALESCE · NULLIF',
  concept: 'NULL обозначает неизвестное или отсутствующее значение. COALESCE возвращает первое не-NULL значение; NULLIF(a, b) возвращает NULL, если a равно b.',
  example: "SELECT COALESCE(nickname, 'Без имени') FROM users;\nSELECT amount / NULLIF(quantity, 0) FROM orders;",
  challenge: 'Объясни, почему NULLIF(quantity, 0) защищает деление от нуля.',
  tip: 'NULL не равен даже самому себе: для проверки используй IS NULL, а для подстановки — COALESCE.',
});
