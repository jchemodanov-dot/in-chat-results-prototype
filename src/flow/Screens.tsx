import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ThemeContent } from "../content/themes";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Confetti } from "./Confetti";
import { RadarChart } from "./charts/RadarChart";
import { GaugeScore } from "./charts/GaugeScore";
import { ProjectionChart } from "./charts/ProjectionChart";
import { TriggersChart } from "./charts/TriggersChart";
import { PatternLoop } from "./charts/PatternLoop";
import { CountUp } from "./charts/CountUp";
import { Spark, Check, Key } from "../components/icons";

const spring = { type: "spring", stiffness: 260, damping: 20 } as const;
const pop = { type: "spring", stiffness: 340, damping: 17 } as const;

const HEAD = "text-[#22222e]";
const SUB = "text-[#6a6a7a]";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...pop, delay: 0.1 }}
      className="accent-chip inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-1.5 text-[12.5px] font-bold"
    >
      <Spark size={13} /> {children}
    </motion.span>
  );
}

/* ---------- 0 · Analyzing ------------------------------------------------ */
const ANALYZE = ["Читаю твою сессию", "Нахожу повторяющийся паттерн", "Считаю эмоциональный профиль", "Собираю твой план"];

export function AnalyzingScreen({ theme }: { theme: ThemeContent }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, ANALYZE.length)), 720);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-full flex flex-col items-center justify-center px-9 text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring} className="mb-9">
        <AnimatedIllustration id="scan" size={150} />
      </motion.div>
      <p className={`text-[15px] ${SUB} mb-5`}>{theme.scanLine}</p>
      <div className="w-full max-w-[280px] space-y-2.5 text-left">
        {ANALYZE.map((line, i) => {
          const done = step > i;
          const active = step === i;
          return (
            <div key={i} className="flex items-center gap-3" style={{ opacity: done || active ? 1 : 0.35 }}>
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: done ? "var(--accent)" : "transparent",
                  border: done ? "none" : "2px solid color-mix(in srgb, var(--accent) 35%, white)",
                }}
              >
                {done ? (
                  <Check size={13} strokeWidth={3} className="text-white" />
                ) : (
                  <motion.span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--accent)" }}
                    animate={{ opacity: active ? [0.3, 1, 0.3] : 0.3 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </span>
              <span className={`text-[14.5px] font-medium ${done ? HEAD : SUB}`}>{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 1 · Emotional profile (radar) -------------------------------- */
export function ProfileScreen({ theme }: { theme: ThemeContent }) {
  const top = [...theme.profile].sort((a, b) => b.value - a.value)[0];
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <Badge>{theme.badge}</Badge>
      <motion.h1
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className={`text-[25px] leading-[1.12] font-extrabold ${HEAD} tracking-tight mt-3 w-full`}
      >
        {theme.headline}
      </motion.h1>
      <p className={`text-[13.5px] ${SUB} mt-1.5 mb-1`}>Вот что я услышала — твой эмоциональный профиль</p>
      <RadarChart data={theme.profile} size={262} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className={`text-[14.5px] ${SUB} leading-[1.45] mt-1 max-w-[300px]`}
      >
        Сильнее всего сейчас звучит <b className="accent-text">«{top.label.toLowerCase()}»</b>. {theme.summary}
      </motion.p>
    </div>
  );
}

/* ---------- 2 · Balance score (gauge) ------------------------------------ */
export function BalanceScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-7 text-center">
      <motion.h2 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-[24px] font-extrabold ${HEAD} mb-1`}>
        Твой эмоциональный баланс
      </motion.h2>
      <p className={`text-[13.5px] ${SUB} mb-3`}>Это точка старта, а не приговор</p>
      <GaugeScore value={theme.balanceNow} target={theme.balanceTarget} size={216} />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-4 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_22px_-12px_rgba(40,50,90,0.25)]"
      >
        <span className="text-[14px] font-medium text-[#33333f]">
          Сейчас <b className={HEAD}>{theme.balanceNow}</b>. С планом обычно выходят к{" "}
          <b className="accent-text">
            ~<CountUp to={theme.balanceTarget} delay={1.6} />
          </b>
        </span>
      </motion.div>
      <div className="flex items-center gap-1.5 mt-3 text-[12px] text-[#9a9aa8]">
        <Key size={12} className="accent-text" />
        Приватно · это рефлексия, а не диагноз
      </div>
    </div>
  );
}

/* ---------- 3 · Trajectory (projection) ---------------------------------- */
export function TrajectoryScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <motion.h2 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-[24px] font-extrabold ${HEAD} mb-1`}>
        Куда ты можешь прийти
      </motion.h2>
      <p className={`text-[13.5px] ${SUB} mb-3 max-w-[300px]`}>
        Путь к <b className="accent-text">«{theme.outcome}»</b> с поддержкой обычно заметно короче
      </p>
      <div className="rounded-3xl bg-white p-3 pb-2 shadow-[0_10px_26px_-14px_rgba(40,50,90,0.3)]">
        <ProjectionChart now={theme.balanceNow} target={theme.balanceTarget} width={290} />
      </div>
      <div className="flex items-center gap-5 mt-3.5 text-[12.5px] font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-[3px] rounded-full" style={{ background: "var(--accent)" }} />
          <span className={HEAD}>с планом</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-[3px] rounded-full bg-[#b9bccb]" />
          <span className={SUB}>сам по себе</span>
        </span>
      </div>
    </div>
  );
}

/* ---------- 4 · Roadmap (4-week plan) ------------------------------------ */
export function RoadmapScreen({ theme }: { theme: ThemeContent }) {
  const weeks = [
    { t: "Понимание", s: theme.steps[0] },
    { t: "Паттерн", s: theme.steps[1] },
    { t: "Навыки", s: theme.steps[2] },
    { t: "Опора", s: `Закрепляем — ${theme.to.toLowerCase()}` },
  ];
  return (
    <div className="h-full flex flex-col justify-center px-6 relative">
      <Confetti />
      <motion.h2 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-[24px] font-extrabold ${HEAD} text-center`}>
        Твой план на 4 недели
      </motion.h2>
      <p className={`text-[13.5px] ${SUB} text-center mb-5`}>Шаг за шагом, в твоём темпе</p>
      <div className="relative pl-[42px]">
        <div className="thread-line absolute left-[17px] top-4 bottom-4 w-[2.5px] rounded-full opacity-60" />
        <div className="space-y-2.5">
          {weeks.map((w, i) => (
            <motion.div
              key={i}
              initial={{ x: -22, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.16, ...spring }}
              className="relative bg-white rounded-2xl p-3 shadow-[0_6px_18px_-10px_rgba(40,50,90,0.22)]"
            >
              <span
                className="absolute -left-[42px] top-1.5 w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold leading-none text-center shadow-[0_3px_8px_-2px_rgba(40,50,90,0.3)]"
                style={{ background: "var(--accent)" }}
              >
                {i + 1}&nbsp;нед
              </span>
              <div className="text-[15px] font-bold text-[#22222e] leading-tight">{w.t}</div>
              <div className="text-[13px] text-[#6a6a7a] leading-snug mt-0.5">{w.s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Triggers (what sets it off) ---------------------------------- */
export function TriggersScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-7 text-center">
      <motion.h2 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-[24px] font-extrabold ${HEAD} mb-1`}>
        Что чаще запускает это
      </motion.h2>
      <p className={`text-[13.5px] ${SUB} mb-7 max-w-[290px]`}>Знать свои триггеры — половина контроля над ними</p>
      <div className="w-full max-w-[320px]">
        <TriggersChart data={theme.triggers} />
      </div>
    </div>
  );
}

/* ---------- Loop (the self-reinforcing cycle) ---------------------------- */
export function LoopScreen({ theme }: { theme: ThemeContent }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <motion.h2 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-[24px] font-extrabold ${HEAD} mb-1`}>
        Как это закручивается
      </motion.h2>
      <p className={`text-[13.5px] ${SUB} mb-1 max-w-[300px]`}>Состояние часто само себя подпитывает по кругу</p>
      <PatternLoop steps={theme.loop} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className={`text-[14px] ${SUB} leading-[1.45] mt-1 max-w-[300px]`}
      >
        В следующей сессии разорвём этот круг в самом слабом месте.
      </motion.p>
    </div>
  );
}
