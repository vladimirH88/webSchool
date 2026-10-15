import { createLesson } from '../types';

export default createLesson(7, {
  title: 'Безопасность и права',
  subtitle: 'GRANT · REVOKE · DCL',
  concept: 'DCL управляет полномочиями: GRANT выдаёт право, REVOKE отзывает. Принцип наименьших привилегий ограничивает доступ только необходимыми действиями и объектами.',
  example: 'GRANT SELECT ON employees TO analyst;\nREVOKE UPDATE ON employees FROM analyst;',
  challenge: 'Какое право выдать роли аналитикам, если им нужно только читать таблицу?',
  tip: 'Не выдавай приложению или пользователю права владельца/администратора без необходимости.',
});
