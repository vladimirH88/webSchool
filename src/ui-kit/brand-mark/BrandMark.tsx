import './brand-mark.css';

/** Рисует декоративный знак платформы в виде встроенного SVG. */
export function BrandMark() {
  return (
    <svg className="ui-brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="9" fill="currentColor" />
      <path
        d="m13 11-5 5 5 5m6-10 5 5-5 5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
