import type { HTMLAttributes } from 'react';
import './badge.css';

/** Свойства визуального бейджа, включая стандартные атрибуты `span`. */
type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Цветовая схема бейджа. */
  tone?: 'success' | 'neutral' | 'warning';
};

/** Отображает короткий статус с выбранной цветовой схемой. */
export function Badge({
  children,
  className = '',
  tone = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`ui-badge ui-badge--${tone} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
