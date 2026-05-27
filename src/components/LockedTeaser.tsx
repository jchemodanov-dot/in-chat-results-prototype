import { useState } from "react";

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="9.5" rx="2.5" fill="#FF8A1F" />
      <path
        d="M8 11V8.2C8 6 9.8 4.2 12 4.2S16 6 16 8.2V11"
        stroke="#FF8A1F"
        strokeWidth="2"
      />
    </svg>
  );
}

interface LockedTeaserProps {
  onLockedTap: () => void;
}

export function LockedTeaser({ onLockedTap }: LockedTeaserProps) {
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(true);
    onLockedTap();
    window.setTimeout(() => setActive(false), 240);
  }

  return (
    <div className="mx-5 mt-4 fade-up-delay-2">
      <button
        type="button"
        onClick={handleClick}
        className={`
          w-full text-left
          rounded-[28px]
          bg-premium-soft
          p-[22px]
          border
          transition-all duration-200
          ${active ? "border-premium scale-[0.995] shadow-lift" : "border-premium/25"}
        `}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_-3px_rgba(255,138,31,0.5)] shrink-0">
            <LockIcon size={15} />
          </span>
          <h3 className="text-[22px] font-bold text-ink tracking-tight leading-tight">
            Твой скрытый паттерн
          </h3>
        </div>

        <p className="text-[18px] leading-[1.5] text-ink-soft mb-4">
          Мы нашли ещё один повторяющийся сценарий, который может влиять на твоё
          состояние в отношениях.
        </p>

        {/* Blur preview */}
        <div className="relative rounded-[18px] bg-white p-5 overflow-hidden border border-premium/15">
          <div
            className="space-y-3 select-none"
            style={{ filter: "blur(5px)" }}
            aria-hidden
          >
            <div className="h-3 rounded-full bg-[#DCDFEC] w-[92%]" />
            <div className="h-3 rounded-full bg-[#DCDFEC] w-[78%]" />
            <div className="h-3 rounded-full bg-[#DCDFEC] w-[85%]" />
            <div className="h-3 rounded-full bg-[#DCDFEC] w-[64%]" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white shadow-[0_6px_18px_-6px_rgba(255,138,31,0.5)] flex items-center justify-center">
              <LockIcon size={20} />
            </div>
            <span className="text-[14px] font-semibold text-premium">
              Откроем в персональном плане
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
