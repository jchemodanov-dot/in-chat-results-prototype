import { motion } from "framer-motion";
import { useMemo } from "react";
import { flowImage } from "./images";

function Heart({ size = 14, color = "#ff7eb6" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.6-9.3-8.5C1 9.4 2.6 6 6 6c2 0 3.2 1.2 4 2.4C10.8 7.2 12 6 14 6c3.4 0 5 3.4 3.3 6.5C19 16.4 12 21 12 21z"
        fill={color}
      />
    </svg>
  );
}

function Spark({ size = 14, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2c.6 5 1.9 6.4 7 7-5.1.6-6.4 2-7 7-.6-5-1.9-6.4-7-7 5.1-.6 6.4-2 7-7Z" fill={color} />
    </svg>
  );
}

type Decor = "hearts" | "sparkles" | "none";

/**
 * The illustration as a LIVING hero: it never sits still. The whole sticker
 * gently bobs and sways, breathes (scale), sits on a pulsing accent glow, and
 * is surrounded by floating hearts / sparkles that rise and twinkle. Big by
 * default — it's meant to dominate the screen.
 */
export function AnimatedIllustration({
  id,
  size = 320,
  decor = "sparkles",
}: {
  id: string;
  size?: number;
  decor?: Decor;
}) {
  const src = flowImage(id);

  const motes = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        top: 12 + Math.random() * 78,
        size: 9 + Math.random() * 12,
        delay: -Math.random() * 6,
        dur: 3.4 + Math.random() * 3.2,
        rise: 26 + Math.random() * 34,
        heart: Math.random() > 0.45,
      })),
    [],
  );

  const heartColors = ["#ff8fc7", "#c98be0", "#ff7eb6"];

  return (
    <motion.div
      style={{ width: size, height: size }}
      className="relative"
      animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* pulsing glow */}
      <motion.div
        className="absolute inset-5 rounded-full blur-2xl"
        style={{ background: "var(--accent)" }}
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.88, 1.08, 0.88] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* breathing image */}
      {src ? (
        <motion.img
          src={src}
          alt=""
          draggable={false}
          className="relative w-full h-full object-cover rounded-[18%] ring-1 ring-black/5 shadow-[0_26px_55px_-18px_rgba(40,50,90,0.5)]"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div
          className="relative w-full h-full rounded-[18%]"
          style={{ background: "color-mix(in srgb, var(--accent) 22%, white)" }}
        />
      )}

      {/* floating decor */}
      {decor !== "none" &&
        motes.map((m) => (
          <motion.span
            key={m.id}
            className="absolute"
            style={{ left: `${m.left}%`, top: `${m.top}%` }}
            animate={{ y: [0, -m.rise, 0], opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
            transition={{ duration: m.dur, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
          >
            {decor === "hearts" && m.heart ? (
              <Heart size={m.size} color={heartColors[m.id % heartColors.length]} />
            ) : (
              <Spark size={m.size} color={m.heart ? "#fff" : "color-mix(in srgb, var(--accent) 60%, white)"} />
            )}
          </motion.span>
        ))}
    </motion.div>
  );
}
