import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

/** Animated integer count-up (declarative — settles reliably). */
export function CountUp({
  to,
  duration = 1.4,
  delay = 0,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(mv, to, { duration, delay, ease: "easeOut" });
    return () => controls.stop();
  }, [to, duration, delay, mv]);
  return <motion.span>{rounded}</motion.span>;
}
