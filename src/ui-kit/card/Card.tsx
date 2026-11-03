import type { HTMLAttributes } from 'react';
import './card.css';

/** Свойства контейнера-карточки, включая стандартные атрибуты `div`. */
type CardProps = HTMLAttributes<HTMLDivElement>;

/** Отображает содержимое в стилизованном контейнере-карточке. */
export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`ui-card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
