import { motion } from "framer-motion";

/** Horizontal bars — what tends to set the state off. Bars grow in, staggered. */
export function TriggersChart({
  data,
  delay = 0.2,
}: {
  data: { label: string; value: number }[];
  delay?: number;
}) {
  return (
    <div className="w-full space-y-4">
      {data.map((d, i) => (
        <div key={i}>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-[14.5px] font-semibold text-[#33333f]">{d.label}</span>
            <span className="text-[13px] font-extrabold accent-text">{d.value}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-black/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--accent)" }}
              initial={{ width: 0 }}
              animate={{ width: `${d.value}%` }}
              transition={{ delay: delay + i * 0.14, duration: 0.85, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
