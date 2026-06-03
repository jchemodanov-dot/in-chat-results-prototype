import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ThemeContent } from "../content/themes";
import { ArrowRight } from "../components/icons";
import { Particles } from "./Particles";
import { FlowProgress } from "./FlowProgress";
import {
  ScanScreen,
  RevealScreen,
  InsightScreen,
  JourneyScreen,
  TransformScreen,
  PlanScreen,
} from "./Screens";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "55%" : "-55%", opacity: 0, scale: 0.95 }),
  center: { x: "0%", opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-55%" : "55%", opacity: 0, scale: 0.95 }),
};

export function RevealFlow({ theme }: { theme: ThemeContent }) {
  const STEPS = [
    { C: ScanScreen, cta: null as string | null, auto: 2700 },
    { C: RevealScreen, cta: "Дальше" },
    { C: InsightScreen, cta: "Дальше" },
    { C: JourneyScreen, cta: "Дальше" },
    { C: TransformScreen, cta: "Хочу так" },
    { C: PlanScreen, cta: theme.cta },
  ];

  const [index, setIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const s = Number(new URLSearchParams(window.location.search).get("screen"));
    return Number.isInteger(s) && s >= 1 && s <= 5 ? s : 0;
  });
  const [dir, setDir] = useState(1);
  const [toast, setToast] = useState(false);

  const isLast = index === STEPS.length - 1;
  const step = STEPS[index];
  const Current = step.C;

  function next() {
    setDir(1);
    setIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }
  function back() {
    setDir(-1);
    setIndex((i) => Math.max(i - 1, 0));
  }

  // auto-advance the scanning screen
  useEffect(() => {
    if (!step.auto) return;
    const t = setTimeout(next, step.auto);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function onCta() {
    if (isLast) {
      setToast(true);
      window.setTimeout(() => setToast(false), 2200);
    } else {
      next();
    }
  }

  const bg =
    "linear-gradient(178deg, color-mix(in srgb, var(--accent) 20%, white) 0%, " +
    "color-mix(in srgb, var(--accent) 7%, white) 52%, #ffffff 100%)";

  return (
    <div className="relative h-full overflow-hidden" style={{ background: bg }}>
      <Particles count={14} />

      {/* top bar: progress + back */}
      <div className="absolute top-0 inset-x-0 z-30 px-5 pt-4">
        <FlowProgress total={STEPS.length} current={index} />
        <div className="h-9 flex items-center">
          {index > 0 && (
            <button
              type="button"
              onClick={back}
              aria-label="Назад"
              className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-[#3a3a48] active:scale-90 transition-transform"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* tap layer (advance) + screens */}
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!isLast && index > 0) next();
        }}
      >
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-0 pt-[70px] pb-[116px]"
          >
            <Current theme={theme} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom CTA */}
      {step.cta && (
        <div className="absolute bottom-0 inset-x-0 z-30 px-6 pb-8 pt-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCta();
            }}
            className={`w-full h-[58px] rounded-full text-white font-bold text-[16.5px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform ${
              isLast ? "cta-breathe" : ""
            }`}
            style={{
              background: "var(--accent)",
              boxShadow: "0 14px 30px -10px color-mix(in srgb, var(--accent) 70%, transparent)",
            }}
          >
            {step.cta}
            {!isLast && <ArrowRight size={18} />}
          </button>
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-28 inset-x-0 z-40 flex justify-center px-6"
          >
            <div className="bg-[#22222e] text-white text-[14px] font-medium px-5 py-3 rounded-2xl shadow-xl">
              Добро пожаловать в твой план ✨
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
