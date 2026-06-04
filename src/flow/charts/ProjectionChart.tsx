import { motion } from "framer-motion";

/**
 * The Noom move: a personalised trajectory. "С планом" rises from where you are
 * now to the target; "сам по себе" stays flat. Lines draw in, the area fills,
 * and the goal dot pops — making the payoff feel concrete and earned.
 */
export function ProjectionChart({
  now,
  target,
  width = 300,
  delay = 0.2,
}: {
  now: number;
  target: number;
  width?: number;
  delay?: number;
}) {
  const W = width;
  const H = width * 0.64;
  const padL = 12;
  const padR = 16;
  const padT = 18;
  const padB = 28;
  const N = 8;

  const x = (i: number) => padL + (i / N) * (W - padL - padR);
  const y = (v: number) => padT + (1 - v / 100) * (H - padT - padB);
  const easeOut = (p: number) => 1 - Math.pow(1 - p, 2.4);

  const planPts = Array.from({ length: N + 1 }, (_, i) => [x(i), y(now + (target - now) * easeOut(i / N))] as const);
  const flatPts = Array.from({ length: N + 1 }, (_, i) => [x(i), y(Math.max(now - 9, now - 11 * (i / N)))] as const);

  const toPath = (pts: readonly (readonly [number, number])[]) =>
    pts.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

  const planPath = toPath(planPts);
  const flatPath = toPath(flatPts);
  const areaPath = `${planPath} L ${x(N).toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;

  const [ex, ey] = planPts[N];
  const [sx, sy] = planPts[0];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id="projArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* baseline grid */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={padL} y1={y(g * 100)} x2={W - padR} y2={y(g * 100)} stroke="#000" strokeOpacity={0.05} />
      ))}

      {/* area under the plan line */}
      <motion.path
        d={areaPath}
        fill="url(#projArea)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.6 }}
      />

      {/* "on your own" line */}
      <motion.path
        d={flatPath}
        fill="none"
        stroke="#b9bccb"
        strokeWidth={2.5}
        strokeDasharray="2 6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay }}
      />

      {/* "with the plan" line */}
      <motion.path
        d={planPath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, delay }}
      />

      {/* start "ты здесь" dot */}
      <circle cx={sx} cy={sy} r={4.5} fill="#fff" stroke="#9aa0b5" strokeWidth={2.5} />

      {/* goal dot */}
      <motion.circle
        cx={ex}
        cy={ey}
        r={7}
        fill="var(--accent)"
        stroke="#fff"
        strokeWidth={3}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 1.25, type: "spring", stiffness: 320, damping: 15 }}
        style={{ transformOrigin: `${ex}px ${ey}px` }}
      />

      {/* x labels */}
      <text x={sx} y={H - 8} textAnchor="start" fontSize={11} fontWeight={700} className="fill-[#8a8a99]">
        Сейчас
      </text>
      <text x={ex} y={H - 8} textAnchor="end" fontSize={11} fontWeight={700} fill="var(--accent)">
        8 недель
      </text>
    </svg>
  );
}
