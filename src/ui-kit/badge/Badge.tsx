import type { HTMLAttributes } from 'react';
import './badge.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'success' | 'neutral' | 'warning';
};

export function Badge({ children, className = '', tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span className={`ui-badge ui-badge--${tone} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
