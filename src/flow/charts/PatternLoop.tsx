import { motion } from "framer-motion";

const pop = { type: "spring", stiffness: 320, damping: 17 } as const;

/**
 * The self-reinforcing loop — three stages on a ring with a turning cycle icon
 * in the centre. Makes the "this keeps spinning" insight visible and felt.
 */
export function PatternLoop({ steps, delay = 0.25 }: { steps: [string, string, string]; delay?: number }) {
  const W = 300;
  const H = 250;
  const cx = W / 2;
  const cy = 126;
  const R = 88;
  const nodeAng = [0, 120, 240];
  const headAng = [60, 180, 300];
  const pt = (ang: number, r = R): [number, number] => {
    const a = ((ang - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0">
        {/* the ring */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeOpacity={0.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay, ease: "easeInOut" }}
        />
        {/* direction arrowheads on the ring (clockwise) */}
        {headAng.map((ang, i) => {
          const [x, y] = pt(ang);
          return (
            <motion.path
              key={i}
              d="M -5 -4 L 6 0 L -5 4 Z"
              fill="var(--accent)"
              transform={`translate(${x} ${y}) rotate(${ang})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.85, scale: 1 }}
              transition={{ delay: delay + 0.9 + i * 0.1, ...pop }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          );
        })}
        {/* turning cycle icon in the centre */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box" }}
          opacity={0.9}
        >
          <path
            d={`M ${cx + 15} ${cy} A 15 15 0 1 1 ${cx + 4} ${cy - 14.4}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <path d={`M ${cx + 9} ${cy - 18} L ${cx + 4} ${cy - 14.4} L ${cx + 9} ${cy - 10}`} fill="var(--accent)" />
        </motion.g>
      </svg>

      {/* stage nodes */}
      {steps.map((s, i) => {
        const [x, y] = pt(nodeAng[i]);
        return (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[116px] text-center"
            style={{ left: x, top: y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.3 + i * 0.18, ...pop }}
          >
            <div className="rounded-2xl bg-white px-2.5 py-2 shadow-[0_6px_16px_-8px_rgba(40,50,90,0.32)]">
              <span className="block text-[10px] font-extrabold accent-text leading-none mb-1">{i + 1}</span>
              <span className="block text-[12px] font-semibold text-[#33333f] leading-tight">{s}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
