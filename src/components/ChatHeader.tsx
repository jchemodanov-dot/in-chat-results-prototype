export function ChatHeader() {
  return (
    <div className="sticky top-0 z-20 bg-background/85 backdrop-blur-md">
      {/* Status bar */}
      <div className="flex items-center justify-between px-7 pt-3 pb-0.5 text-[14px] font-semibold text-text-primary tracking-tight">
        <span>17:46</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
            <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
            <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
            <rect x="9" y="3" width="3" height="8" rx="0.5" fill="currentColor" />
            <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor" />
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
            <path
              d="M7.5 1.5C9.97 1.5 12.24 2.42 14 4L7.5 10L1 4C2.76 2.42 5.03 1.5 7.5 1.5Z"
              fill="currentColor"
            />
          </svg>
          <svg width="26" height="11" viewBox="0 0 26 11" fill="none" aria-hidden>
            <rect
              x="0.5"
              y="0.5"
              width="22"
              height="10"
              rx="2.5"
              stroke="currentColor"
              strokeOpacity="0.5"
            />
            <rect x="2" y="2" width="19" height="7" rx="1.5" fill="currentColor" />
            <rect
              x="23.5"
              y="3.5"
              width="1.5"
              height="4"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      </div>
      {/* Title */}
      <div className="px-5 pt-3 pb-3">
        <h1 className="text-[22px] font-semibold text-text-primary tracking-tight leading-none">
          Чат
        </h1>
      </div>
    </div>
  );
}
