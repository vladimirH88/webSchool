import type { HTMLAttributes } from 'react';
import './card.css';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`ui-card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
