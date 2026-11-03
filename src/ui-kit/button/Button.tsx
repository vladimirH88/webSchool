import type { ButtonHTMLAttributes } from 'react';
import './button.css';

/** Доступные визуальные варианты кнопки. */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text' | 'unstyled';

/** Свойства кнопки, включая стандартные атрибуты HTML-кнопки. */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Визуальный вариант кнопки. */
  variant: ButtonVariant;
};

/** Отображает кнопку с выбранным вариантом оформления. */
export function Button({
  children,
  className = '',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`ui-button ui-button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
