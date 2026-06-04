import { useState } from "react";
import { ArrowRight } from "../components/icons";

/** Persistent sticky CTA at the bottom of the chat — the next step. */
export function ChatCTA({ label }: { label: string }) {
  const [toast, setToast] = useState(false);
  return (
    <div className="pointer-events-none">
      <div className="h-12 bg-gradient-to-b from-transparent to-background" />
      <div className="bg-background px-4 pt-1 pb-6 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            setToast(true);
            window.setTimeout(() => setToast(false), 1700);
          }}
          className="w-full h-[54px] rounded-full text-white font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{ background: "var(--accent)", boxShadow: "0 12px 26px -10px color-mix(in srgb, var(--accent) 70%, transparent)" }}
        >
          {label}
          <ArrowRight size={18} />
        </button>
      </div>
      {toast && (
        <div className="fade-in absolute bottom-[94px] left-1/2 -translate-x-1/2 bg-[#22222e] text-white text-[13px] px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap pointer-events-none">
          Переход к персональному плану
        </div>
      )}
    </div>
  );
}
