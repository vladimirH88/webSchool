import './progress-bar.css';

/** Свойства индикатора прогресса. */
type ProgressBarProps = {
  /** Текущий прогресс; значение ограничивается диапазоном от 0 до 100. */
  value: number;
  /** Доступное имя индикатора для вспомогательных технологий. */
  label: string;
  /** Дополнительные CSS-классы индикатора. */
  className?: string;
};

/** Отображает доступный индикатор прогресса с ограниченным значением. */
export function ProgressBar({
  value,
  label,
  className = '',
}: ProgressBarProps) {
  const boundedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`ui-progress-bar ${className}`.trim()}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={boundedValue}
    >
      <span style={{ width: `${boundedValue}%` }} />
    </div>
  );
}
