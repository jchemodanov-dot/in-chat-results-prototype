import { motion } from "framer-motion";
import type { ProfileDim } from "../../content/themes";

/**
 * Emotional-profile radar. The filled shape scales out of the centre on mount
 * (declarative — reliable under any render timing); grid + labels frame it.
 * Reads at a glance — "this is me, it has shape".
 */
export function RadarChart({
  data,
  size = 262,
  delay = 0.2,
}: {
  data: ProfileDim[];
  size?: number;
  delay?: number;
}) {
  const n = data.length;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.31;

  const pol = (r: number, i: number): [number, number] => {
    const a = ((i * 360) / n - 90) * (Math.PI / 180);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const poly = (r: number) => Array.from({ length: n }, (_, i) => pol(r, i).join(",")).join(" ");
  const dataPts = data.map((d, i) => pol(R * (d.value / 100), i));
  const dataPoly = dataPts.map((p) => p.join(",")).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* grid */}
      {[0.25, 0.5, 0.75, 1].map((lvl) => (
        <polygon key={lvl} points={poly(R * lvl)} fill="none" stroke="#000" strokeOpacity={0.07} />
      ))}
      {data.map((_, i) => {
        const [x, y] = pol(R, i);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#000" strokeOpacity={0.07} />;
      })}

      {/* data shape — scales out of centre */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.7, ease: [0.34, 1.1, 0.64, 1] }}
        style={{ transformOrigin: "50% 50%", transformBox: "view-box" }}
      >
        <polygon
          points={dataPoly}
          strokeLinejoin="round"
          style={{ fill: "var(--accent)", fillOpacity: 0.28, stroke: "var(--accent)", strokeWidth: 2.5 }}
        />
        {dataPts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.6} style={{ fill: "var(--accent)" }} />
        ))}
      </motion.g>

      {/* labels */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.5, duration: 0.4 }}>
        {data.map((d, i) => {
          const [lx, ly] = pol(R + 18, i);
          const cos = Math.cos(((i * 360) / n - 90) * (Math.PI / 180));
          const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
          return (
            <g key={i}>
              <text x={lx} y={ly - 2} textAnchor={anchor} fontSize={11.5} fontWeight={700} style={{ fill: "#3a3a48" }}>
                {d.label}
              </text>
              <text x={lx} y={ly + 11} textAnchor={anchor} fontSize={11} fontWeight={800} style={{ fill: "var(--accent)" }}>
                {d.value}
              </text>
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}
