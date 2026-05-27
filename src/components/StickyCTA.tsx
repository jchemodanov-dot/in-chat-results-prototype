import { useState } from "react";

export function StickyCTA() {
  const [toast, setToast] = useState(false);

  function handleClick() {
    setToast(true);
    window.setTimeout(() => setToast(false), 1700);
  }

  return (
    <div className="pointer-events-none">
      {/* Gradient fade so the CTA does not cut content harshly */}
      <div className="h-14 bg-gradient-to-b from-transparent to-background" />
      <div className="bg-background px-5 pt-1 pb-7 pointer-events-auto">
        <p className="text-center text-[13px] text-text-secondary mb-2.5">
          Разберём, что с этим делать дальше?
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="
            w-full h-[56px] rounded-full
            bg-primary text-white
            font-semibold text-[16px]
            shadow-cta
            active:scale-[0.985]
            hover:bg-primary-dark
            transition-all duration-150
            flex items-center justify-center gap-2
          "
        >
          Смотреть план
          <span aria-hidden className="text-[18px] leading-none">
            →
          </span>
        </button>
      </div>

      {toast && (
        <div className="fade-in absolute bottom-[120px] left-1/2 -translate-x-1/2 bg-text-primary text-white text-[13px] px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap pointer-events-none">
          Переход к персональному плану
        </div>
      )}
    </div>
  );
}
