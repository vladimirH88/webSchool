import './progress-bar.css';

type ProgressBarProps = {
  value: number;
  label: string;
  className?: string;
};

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
