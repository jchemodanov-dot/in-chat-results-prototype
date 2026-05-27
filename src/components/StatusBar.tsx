export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-3.5 pb-1 text-[15px] font-semibold text-ink tracking-tight">
      <span>17:46</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
          <rect x="15" y="0.5" width="3" height="11.5" rx="0.6" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
          <path
            d="M8 2C10.6 2 13 3 14.8 4.7L8 11L1.2 4.7C3 3 5.4 2 8 2Z"
            fill="currentColor"
          />
        </svg>
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none" aria-hidden>
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="11"
            rx="3"
            stroke="currentColor"
            strokeOpacity="0.5"
          />
          <rect x="2" y="2" width="20" height="8" rx="1.8" fill="currentColor" />
          <rect
            x="24.5"
            y="4"
            width="1.8"
            height="4"
            rx="0.9"
            fill="currentColor"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
