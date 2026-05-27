interface StickyCTAProps {
  onAction: () => void;
}

export function StickyCTA({ onAction }: StickyCTAProps) {
  return (
    <div className="pointer-events-none">
      {/* Gradient fade so the CTA never cuts content harshly */}
      <div className="h-20 bg-gradient-to-b from-transparent to-app" />
      <div className="bg-app px-5 pt-4 pb-7 pointer-events-auto">
        <p className="text-center text-[15px] text-ink-soft mb-3">
          Разберём, что с этим делать дальше?
        </p>
        <button
          type="button"
          onClick={onAction}
          className="
            w-full h-[68px] rounded-full
            bg-primary text-white
            font-bold text-[24px]
            shadow-cta
            active:scale-[0.98]
            hover:bg-primary-dark
            transition-all duration-150
            flex items-center justify-center gap-2.5
          "
        >
          Смотреть план
          <span aria-hidden className="text-[26px] leading-none">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
