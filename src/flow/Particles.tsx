import { useMemo } from "react";

/**
 * Ambient floating light motes that drift upward — the screens never feel
 * static. Colour comes from the current --accent. Positions are randomised once
 * per mount (pure client app, so Math.random is fine).
 */
export function Particles({ count = 22 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 4,
        delay: -Math.random() * 12,
        duration: 9 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 60,
        opacity: 0.15 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="particle absolute rounded-full"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            background: "var(--accent)",
            boxShadow: `0 0 ${d.size * 3}px var(--accent)`,
            ["--op" as string]: `${d.opacity}`,
            ["--drift" as string]: `${d.drift}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
