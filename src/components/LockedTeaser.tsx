import { useState } from "react";

function LockIcon({ size = 14, color = "#FF8A1F" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2.5" fill={color} />
      <path
        d="M8 11V8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8V11"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}

export function LockedTeaser() {
  const [active, setActive] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  function handleClick() {
    setActive(true);
    setTooltip(true);
    window.setTimeout(() => setActive(false), 220);
    window.setTimeout(() => setTooltip(false), 1700);
  }

  return (
    <div className="mx-5 mt-3 mb-4 fade-up-delay-2 relative">
      <button
        type="button"
        onClick={handleClick}
        className={`
          relative w-full text-left
          rounded-[24px]
          bg-surface
          p-5
          border border-[#ECEEFA]
          shadow-[0_4px_18px_-10px_rgba(40,50,90,0.10)]
          transition-all duration-200
          ${active ? "scale-[0.99] bg-[#FBFBFF]" : ""}
        `}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,138,31,0.14)" }}
          >
            <LockIcon size={13} />
          </span>
          <h3 className="text-[16px] font-semibold text-text-primary">
            Твой скрытый паттерн
          </h3>
        </div>

        <p className="text-[14px] leading-[1.5] text-text-secondary mb-4">
          Мы нашли ещё один повторяющийся сценарий, который может влиять на твоё
          состояние в отношениях.
        </p>

        {/* Blur preview */}
        <div className="relative rounded-[16px] bg-[#F7F8FC] p-4 overflow-hidden">
          <div
            className="space-y-2.5 select-none"
            style={{ filter: "blur(5px)" }}
            aria-hidden
          >
            <div className="h-2.5 rounded-full bg-[#D7DAE8] w-[92%]" />
            <div className="h-2.5 rounded-full bg-[#D7DAE8] w-[78%]" />
            <div className="h-2.5 rounded-full bg-[#D7DAE8] w-[85%]" />
            <div className="h-2.5 rounded-full bg-[#D7DAE8] w-[65%]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white shadow-[0_6px_16px_-6px_rgba(255,138,31,0.45)] flex items-center justify-center">
              <LockIcon size={17} />
            </div>
          </div>
        </div>

        <p className="text-[13px] text-premium font-medium mt-3.5 flex items-center gap-1.5">
          <LockIcon size={11} />
          Откроем в персональном плане
        </p>

        {tooltip && (
          <div className="fade-in absolute -top-9 left-1/2 -translate-x-1/2 bg-text-primary text-white text-[12px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            Доступно в персональном плане
          </div>
        )}
      </button>
    </div>
  );
}
