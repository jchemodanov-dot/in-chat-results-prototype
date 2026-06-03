import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * A burst of light — the "бам". A central flash blooms and fades while sparks
 * fly outward. Mount it (via a React key) at the dramatic beat you want to hit.
 */
export function Burst({ sparks = 16, power = 1 }: { sparks?: number; power?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: sparks }, (_, i) => {
        const angle = (i / sparks) * Math.PI * 2 + Math.random() * 0.3;
        const dist = (90 + Math.random() * 90) * power;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          size: 3 + Math.random() * 5,
          dur: 0.7 + Math.random() * 0.5,
        };
      }),
    [sparks, power],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 240 * power,
          height: 240 * power,
          background: "radial-gradient(circle, var(--accent), transparent 65%)",
        }}
        initial={{ scale: 0, opacity: 0.95 }}
        animate={{ scale: 3.2, opacity: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-white"
        style={{ width: 60, height: 60, filter: "blur(8px)" }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {items.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, boxShadow: "0 0 10px var(--accent)" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.2 }}
          transition={{ duration: s.dur, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
