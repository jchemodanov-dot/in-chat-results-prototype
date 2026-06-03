interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

/** four-point sparkle — the "искра" / first spark of clarity */
export function Spark({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2c.6 5 1.9 6.4 7 7-5.1.6-6.4 2-7 7-.6-5-1.9-6.4-7-7 5.1-.6 6.4-2 7-7Z"
        fill="currentColor"
      />
      <path
        d="M19 13c.27 2.2 .8 2.73 3 3-2.2.27-2.73.8-3 3-.27-2.2-.8-2.73-3-3 2.2-.27 2.73-.8 3-3Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

/** a winding route between two nodes — the "путь / нить" metaphor */
export function Route({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 18.5C9.5 18.5 9.5 12 12 12C14.5 12 14.5 5.5 18 5.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="6" cy="18.5" r="2.3" fill="currentColor" />
      <circle cx="18" cy="5.5" r="2.3" fill="currentColor" />
    </svg>
  );
}

export function Check({ size = 16, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12.5 10 17.5 19.5 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** small key — a gentle "opens next" affordance, never the main object */
export function Key({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="8.5" cy="8.5" r="4.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M11.7 11.7 19 19M16.5 16.5l2-2M19 19l1.7-1.7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight({ size = 18, className, strokeWidth = 2.2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
