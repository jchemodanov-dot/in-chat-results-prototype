import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ThemeContent } from "../content/themes";
import { Illustration } from "./Illustration";
import { Confetti } from "./Confetti";
import { Spark, Check } from "../components/icons";

const spring = { type: "spring", stiffness: 260, damping: 20 } as const;
const pop = { type: "spring", stiffness: 340, damping: 17 } as const;

const HEAD = "text-[#22222e]";
const SUB = "text-[#6a6a7a]";

/* ---------- 0 · Scanning -------------------------------------------------- */
export function ScanScreen({ theme }: { theme: ThemeContent }) {
  const lines = ["Слушаю тебя…", theme.scanLine, "Собираю твой разбор…"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => Math.min(p + 1, lines.length - 1)), 820);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <div className="relative mb-12 w-[170px] h-[170px] flex items-center justify-center">
        {[0, 1, 2].map((k) => (
          <span
            key={k}
            className="pulse-ring absolute w-[150px] h-[150px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent) 38%, transparent), transparent 70%)",
              animationDelay: `${k * 0.6}s`,
            }}
          />
        ))}
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring}>
          <Illustration id="scan" size={150} />
        </motion.div>
      </div>
      <motion.p
        key={i}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-[20px] font-semibold ${HEAD} min-h-[56px] max-w-[280px]`}
      >
        {lines[i]}
      </motion.p>
      <p className={`text-[13px] ${SUB} mt-1`}>Spacey анализирует твою сессию</p>
    </div>
  );
}

/* ---------- 1 · Reveal ---------------------------------------------------- */
export function RevealScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-7 text-center relative">
      <Confetti />
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...pop, delay: 0.15 }}
        className="accent-chip inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 text-[13px] font-bold mb-6"
      >
        <Spark size={14} /> {theme.badge}
      </motion.span>
      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.05 }}
      >
        <Illustration id={theme.id} size={232} />
      </motion.div>
      <motion.h1
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className={`text-[27px] leading-[1.12] font-extrabold ${HEAD} tracking-tight mt-7 w-full px-1`}
      >
        {theme.headline}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className={`text-[15px] ${SUB} mt-3`}
      >
        Это про тебя. Давай покажу, что я увидела →
      </motion.p>
    </div>
  );
}

/* ---------- 2 · Insight --------------------------------------------------- */
export function InsightScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring}>
        <Illustration id={theme.id} size={144} />
      </motion.div>
      <motion.p
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.55 }}
        className={`text-[22px] leading-[1.4] font-semibold ${HEAD} mt-9`}
      >
        {theme.summary}
      </motion.p>
    </div>
  );
}

/* ---------- 3 · Journey (the quest) -------------------------------------- */
export function JourneyScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col justify-center px-6">
      <motion.h2
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-[24px] font-extrabold ${HEAD} text-center mb-3`}
      >
        Вот что разберём вместе
      </motion.h2>
      <div className="flex justify-center mb-4">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring}>
          <Illustration id="journey" size={132} />
        </motion.div>
      </div>
      <div className="space-y-2.5">
        {theme.steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.16, ...spring }}
            className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-[0_6px_18px_-10px_rgba(40,50,90,0.25)]"
          >
            <span
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[15px]"
              style={{ background: "var(--accent)" }}
            >
              {i + 1}
            </span>
            <span className="text-[14px] leading-[1.25] text-[#33333f] font-medium">{s}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + 3 * 0.16, ...pop }}
          className="flex items-center gap-3 rounded-2xl p-3"
          style={{ background: "color-mix(in srgb, var(--accent) 15%, white)" }}
        >
          <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[18px]">🏁</span>
          <span
            className="text-[15px] font-extrabold"
            style={{ color: "color-mix(in srgb, var(--accent) 72%, #2a2a38)" }}
          >
            {theme.outcome}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- 4 · Transformation ------------------------------------------- */
export function TransformScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-7 text-center">
      <motion.h2
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-[24px] font-extrabold ${HEAD} mb-9`}
      >
        Куда мы идём
      </motion.h2>
      <div className="flex items-stretch gap-2.5 w-full justify-center">
        <motion.div
          initial={{ x: -20, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={spring}
          className="flex-1 max-w-[130px] rounded-3xl bg-white p-4 shadow-sheet flex flex-col items-center justify-center"
        >
          <div className="text-[30px] grayscale opacity-80">🫥</div>
          <div className="text-[12.5px] font-semibold text-[#6a6a7a] mt-1.5 leading-tight">{theme.from}</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.35, ...pop }}
          className="flex items-center text-[26px] font-black"
          style={{ color: "var(--accent)" }}
        >
          →
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, ...spring }}
          className="flex-1 max-w-[130px] rounded-3xl p-4 shadow-sheet text-white flex flex-col items-center justify-center"
          style={{ background: "var(--accent)" }}
        >
          <div className="text-[30px]">✨</div>
          <div className="text-[12.5px] font-bold mt-1.5 leading-tight">{theme.to}</div>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className={`text-[15px] ${SUB} mt-9 max-w-[270px]`}
      >
        Я проведу тебя по этому пути — шаг за шагом, в твоём темпе.
      </motion.p>
    </div>
  );
}

/* ---------- 5 · Plan (the close) ----------------------------------------- */
export function PlanScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col justify-center px-6 relative">
      <Confetti />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={spring}
        className="flex justify-center mb-3"
      >
        <Illustration id={theme.id} size={116} />
      </motion.div>
      <motion.h2
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-[25px] font-extrabold ${HEAD} text-center leading-[1.12]`}
      >
        Твой персональный
        <br />
        план готов 🎉
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`text-center text-[14px] ${SUB} mt-2 mb-4`}
      >
        {theme.lockedSubline}
      </motion.p>
      <div className="bg-white rounded-[24px] p-4 shadow-sheet space-y-3">
        {theme.lockedItems.map((it, i) => (
          <motion.div
            key={i}
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 + i * 0.14, ...spring }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.45 + i * 0.14, ...pop }}
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white"
              style={{ background: "var(--accent)" }}
            >
              <Check size={13} strokeWidth={3} />
            </motion.span>
            <span className="text-[14px] text-[#33333f] font-medium">{it}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-1.5 mt-4 text-[13px] font-bold"
        style={{ color: "color-mix(in srgb, var(--accent) 70%, #2a2a38)" }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
        Готов к тебе прямо сейчас
      </motion.div>
    </div>
  );
}
