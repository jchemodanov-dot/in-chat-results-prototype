import { motion } from "framer-motion";

const SHADES = [
  "var(--accent)",
  "color-mix(in srgb, var(--accent) 62%, white)",
  "color-mix(in srgb, var(--accent) 40%, white)",
  "color-mix(in srgb, var(--accent) 22%, white)",
];

/** Emotion-composition donut: segments draw in, with a legend below. */
export function EmotionDonut({
  data,
  delay = 0.2,
}: {
  data: { label: string; value: number }[];
  delay?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const size = 172;
  const sw = 26;
  const r = (size - sw) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const top = [...data].sort((a, b) => b.value - a.value)[0];

  let acc = 0;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          const frac = d.value / total;
          const start = acc;
          acc += frac;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              strokeWidth={sw}
              strokeLinecap="butt"
              transform={`rotate(${start * 360 - 90} ${cx} ${cy})`}
              style={{ stroke: SHADES[i % SHADES.length] }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: frac }}
              transition={{ delay: delay + i * 0.12, duration: 0.7, ease: "easeOut" }}
            />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={12} fontWeight={700} style={{ fill: "#6a6a7a" }}>
          {top.label}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize={19} fontWeight={800} style={{ fill: "var(--accent)" }}>
          {Math.round((top.value / total) * 100)}%
        </text>
      </svg>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full max-w-[300px]">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: SHADES[i % SHADES.length] }} />
            <span className="text-[13px] text-[#33333f] font-medium">{d.label}</span>
            <span className="text-[12px] text-[#8a8a99] ml-auto font-semibold">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
