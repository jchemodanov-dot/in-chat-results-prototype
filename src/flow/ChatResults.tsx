import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { ThemeContent } from "../content/themes";
import { RadarChart } from "./charts/RadarChart";
import { EmotionDonut } from "./charts/EmotionDonut";
import { GaugeScore } from "./charts/GaugeScore";
import { TriggersChart } from "./charts/TriggersChart";
import { PatternLoop } from "./charts/PatternLoop";
import { ProjectionChart } from "./charts/ProjectionChart";
import { Spark } from "../components/icons";
import { flowImage } from "./images";

/* ---- card sub-blocks reused from the report -------------------------- */
function StrengthsBlock({ theme }: { theme: ThemeContent }) {
  return (
    <div className="w-full space-y-2">
      {theme.strengths.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span className="shrink-0 w-7 h-7 rounded-full accent-chip flex items-center justify-center">
            <Spark size={13} />
          </span>
          <span className="text-[13.5px] font-medium text-[#33333f] leading-snug">{s}</span>
        </div>
      ))}
      <div className="accent-zone accent-border border rounded-xl p-2.5 mt-1 text-center">
        <span className="text-[13.5px] text-[#33333f]">
          <b className="accent-text text-[15px]">{theme.normPct}%</b> описывают похожее
        </span>
        <p className="text-[12px] text-[#6a6a7a] italic mt-1 leading-snug">{theme.story}</p>
      </div>
    </div>
  );
}

function MiniTrajectory({ theme }: { theme: ThemeContent }) {
  const [mins, setMins] = useState(10);
  const target = Math.min(94, Math.max(theme.balanceNow + 12, Math.round(theme.balanceTarget + (mins - 10) * 1.8)));
  return (
    <div className="w-full">
      <ProjectionChart now={theme.balanceNow} target={target} width={286} />
      <div className="mt-2">
        <div className="flex justify-between items-baseline text-[12.5px] mb-1">
          <span className="text-[#33333f] font-medium">
            <b>{mins} мин/день</b>
          </span>
          <span className="accent-text font-extrabold">цель ~{target}</span>
        </div>
        <input
          type="range"
          min={5}
          max={20}
          value={mins}
          onChange={(e) => setMins(Number(e.target.value))}
          className="w-full cursor-pointer"
          style={{ accentColor: "var(--accent)" }}
        />
        <div className="flex items-center gap-4 mt-1.5 justify-center text-[11.5px] font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] rounded-full" style={{ background: "var(--accent)" }} />
            <span className="text-[#33333f]">с планом</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] rounded-full bg-[#b9bccb]" />
            <span className="text-[#6a6a7a]">сам по себе</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function RoadmapBlock({ theme }: { theme: ThemeContent }) {
  const weeks = [
    { t: "Понимание", s: theme.steps[0] },
    { t: "Паттерн", s: theme.steps[1] },
    { t: "Навыки", s: theme.steps[2] },
    { t: "Опора", s: `Закрепляем — ${theme.to.toLowerCase()}` },
  ];
  return (
    <div className="w-full relative pl-[38px]">
      <div className="thread-line absolute left-[15px] top-3 bottom-3 w-[2.5px] rounded-full opacity-60" />
      <div className="space-y-2">
        {weeks.map((w, i) => (
          <div key={i} className="relative">
            <span
              className="absolute -left-[38px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: "var(--accent)" }}
            >
              {i + 1}&nbsp;нед
            </span>
            <div className="text-[14px] font-bold text-[#22222e] leading-tight">{w.t}</div>
            <div className="text-[12.5px] text-[#6a6a7a] leading-snug">{w.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- chat item model ------------------------------------------------- */
type Item =
  | { kind: "text"; text: string }
  | { kind: "card"; title?: string; caption?: string; node: ReactNode };

function buildItems(theme: ThemeContent): Item[] {
  const top = [...theme.profile].sort((a, b) => b.value - a.value)[0];
  return [
    { kind: "text", text: "Спасибо, что доверилась и проговорила это 🤍" },
    {
      kind: "card",
      node: <img src={flowImage(theme.id)} alt="" className="w-[150px] h-[150px] object-cover rounded-[18px]" draggable={false} />,
    },
    { kind: "text", text: "Я собрала твой разбор — вот что я услышала." },
    { kind: "text", text: `${theme.headline} 🧵` },
    {
      kind: "card",
      title: "Эмоциональный профиль",
      caption: `Сильнее всего звучит «${top.label.toLowerCase()}». ${theme.summary}`,
      node: <RadarChart data={theme.profile} size={244} />,
    },
    { kind: "card", title: "Из чего складывается", node: <EmotionDonut data={theme.composition} /> },
    {
      kind: "card",
      title: "Эмоциональный баланс",
      caption: `Сейчас ${theme.balanceNow}. С планом обычно выходят к ~${theme.balanceTarget}. Это точка старта, а не приговор.`,
      node: <GaugeScore value={theme.balanceNow} target={theme.balanceTarget} size={196} />,
    },
    { kind: "text", text: "Смотри, что чаще это запускает:" },
    { kind: "card", title: "Что запускает", node: <TriggersChart data={theme.triggers} /> },
    { kind: "text", text: "И как это закручивается по кругу:" },
    { kind: "card", title: "Твой цикл", node: <PatternLoop steps={theme.loop} /> },
    { kind: "text", text: "Но у тебя уже есть, на что опереться 💛" },
    { kind: "card", title: "Опора", node: <StrengthsBlock theme={theme} /> },
    { kind: "text", text: "Вот куда ты можешь прийти — подвигай ползунок:" },
    { kind: "card", title: "Куда придёшь", node: <MiniTrajectory theme={theme} /> },
    { kind: "text", text: "Я собрала тебе план на 4 недели:" },
    { kind: "card", title: "План на 4 недели", node: <RoadmapBlock theme={theme} /> },
    { kind: "text", text: "Готова посмотреть, что дальше? 👇" },
  ];
}

/* ---- bubbles --------------------------------------------------------- */
function TextBubble({ text }: { text: string }) {
  return (
    <div className="fade-up px-3 mb-2.5">
      <div className="inline-block bg-white rounded-[18px] rounded-tl-[6px] px-3.5 py-2.5 shadow-[0_2px_10px_-4px_rgba(40,50,90,0.12)] max-w-[86%]">
        <p className="text-[15px] text-[#22222e] leading-[1.4]">{text}</p>
      </div>
    </div>
  );
}

function CardBubble({ title, caption, children }: { title?: string; caption?: string; children: ReactNode }) {
  return (
    <div className="fade-up px-3 mb-2.5">
      <div className="bg-white rounded-[20px] rounded-tl-[6px] p-3.5 shadow-[0_6px_20px_-10px_rgba(40,50,90,0.18)] border border-black/[0.04]">
        {title && <div className="text-[11px] font-bold uppercase tracking-[0.08em] accent-text mb-2.5">{title}</div>}
        <div className="flex justify-center">{children}</div>
        {caption && <p className="text-[13px] text-[#5a5a68] mt-3 leading-[1.45]">{caption}</p>}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="fade-up px-3 mb-2.5">
      <div className="inline-flex gap-1.5 bg-white rounded-[18px] rounded-tl-[6px] px-4 py-3.5 shadow-[0_2px_10px_-4px_rgba(40,50,90,0.12)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#b9bccb]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- the chat -------------------------------------------------------- */
export function ChatResults({ theme, instant = false }: { theme: ThemeContent; instant?: boolean }) {
  const items = useMemo(() => buildItems(theme), [theme]);
  const [revealed, setRevealed] = useState(instant ? items.length : 0);
  const [typing, setTyping] = useState(!instant);
  const bottomRef = useRef<HTMLDivElement>(null);
  const avatar = flowImage("scan");

  useEffect(() => {
    if (instant || revealed >= items.length) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const next = items[revealed];
    const dur = next.kind === "card" ? 750 : 520;
    const t = setTimeout(() => setRevealed((r) => r + 1), dur);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, instant]);

  useEffect(() => {
    if (instant) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [revealed, typing, instant]);

  const streaming = revealed < items.length;

  return (
    <div className="min-h-full pb-2">
      {/* header */}
      <div className="sticky top-0 z-20 bg-background/85 backdrop-blur-md px-4 py-2.5 flex items-center gap-3 border-b border-black/5">
        <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-black/5 shrink-0" style={{ background: "color-mix(in srgb, var(--accent) 18%, white)" }}>
          {avatar && <img src={avatar} alt="" className="w-full h-full object-cover" draggable={false} />}
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-bold text-[#22222e]">Spacey</div>
          <div className="text-[12px] accent-text font-medium">{streaming ? "печатает…" : "AI-психолог · в сети"}</div>
        </div>
      </div>

      {/* user's own message */}
      <div className="fade-up px-3 mt-3 mb-3 flex justify-end">
        <div className="accent-zone-strong rounded-[18px] rounded-tr-[6px] px-3.5 py-2.5 max-w-[86%]">
          <p className="text-[15px] text-[#22222e] leading-[1.4]">{theme.userMessage}</p>
        </div>
      </div>

      {/* streamed AI items */}
      {items.slice(0, revealed).map((it, i) =>
        it.kind === "text" ? (
          <TextBubble key={i} text={it.text} />
        ) : (
          <CardBubble key={i} title={it.title} caption={it.caption}>
            {it.node}
          </CardBubble>
        ),
      )}

      {typing && <Typing />}
      <div ref={bottomRef} className="h-[150px]" aria-hidden />
    </div>
  );
}
