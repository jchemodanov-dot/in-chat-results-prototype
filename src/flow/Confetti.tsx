import { useMemo } from "react";

const COLORS = [
  "#A86BCB",
  "#5784D8",
  "#CC8A45",
  "#7A6BE3",
  "#3FA396",
  "#F2C14E",
  "#EF7C9B",
  "#6FD3C7",
];

/**
 * A one-shot confetti rain for celebration beats (reveal, plan). Mount it via a
 * React key when you want it to fire again.
 */
export function Confetti({ count = 46 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 9,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.6,
        duration: 1.7 + Math.random() * 1.6,
        spin: (Math.random() > 0.5 ? 1 : -1) * (420 + Math.random() * 620),
        round: Math.random() > 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-40" aria-hidden>
      {bits.map((b) => (
        <span
          key={b.id}
          className="confetti absolute"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: b.color,
            borderRadius: b.round ? "50%" : "2px",
            ["--spin" as string]: `${b.spin}deg`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
