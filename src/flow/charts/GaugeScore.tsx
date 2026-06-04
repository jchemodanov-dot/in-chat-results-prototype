import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

function pol(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function arc(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const [sx, sy] = pol(cx, cy, r, startDeg);
  const [ex, ey] = pol(cx, cy, r, endDeg);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

/** Radial 270° gauge with an animated fill, count-up number and a target tick. */
export function GaugeScore({
  value,
  target,
  size = 220,
  delay = 0.2,
}: {
  value: number;
  target?: number;
  size?: number;
  delay?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  const sw = 15;
  const START = -135;
  const SPAN = 270;
  const track = arc(cx, cy, r, START, START + SPAN);
  const valPath = arc(cx, cy, r, START, START + SPAN * (value / 100));
  const [tx, ty] = target != null ? pol(cx, cy, r, START + SPAN * (target / 100)) : [0, 0];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <path d={track} fill="none" stroke="#000" strokeOpacity={0.08} strokeWidth={sw} strokeLinecap="round" />
        <motion.path
          d={valPath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={sw}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay, ease: "easeOut" }}
        />
        {target != null && (
          <motion.circle
            cx={tx}
            cy={ty}
            r={6}
            fill="#fff"
            stroke="var(--accent)"
            strokeWidth={3}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 1.3, type: "spring", stiffness: 320, damping: 16 }}
            style={{ transformOrigin: `${tx}px ${ty}px` }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[46px] font-extrabold leading-none text-[#22222e]">
          <CountUp to={value} delay={delay} />
        </div>
        <div className="text-[12px] text-[#8a8a99] mt-1">из 100</div>
      </div>
    </div>
  );
}
