import { motion } from "framer-motion";
import { useMemo, useState } from "react";
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
const HEART_COLORS = ["#ff8fc7", "#c98be0", "#ff7eb6"];

/**
 * The illustration as a LIVING, playful hero. It bobs with squash-&-stretch,
 * breathes, sits on a pulsing glow and a slowly rotating ray halo, and is
 * trailed by floating hearts / sparkles. Tap it and it springs back and bursts
 * a shower of hearts/sparkles (without advancing the screen).
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
  const [pop, setPop] = useState(0);
  const isHeart = decor === "hearts";

  const motes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        top: 8 + Math.random() * 84,
        size: 9 + Math.random() * 13,
        delay: -Math.random() * 6,
        dur: 2.8 + Math.random() * 3,
        rise: 30 + Math.random() * 46,
        heart: Math.random() > 0.4,
      })),
    [],
  );

  const burst = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
        const d = (size / 2) * (0.55 + Math.random() * 0.5);
        return { id: i, x: Math.cos(a) * d, y: Math.sin(a) * d, size: 11 + Math.random() * 9 };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pop, size],
  );

  return (
    <div
      style={{ width: size, height: size }}
      className="relative cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setPop((p) => p + 1);
      }}
    >
      {/* rotating ray halo */}
      <motion.div
        className="absolute inset-[-16%] rounded-full pointer-events-none"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, color-mix(in srgb, var(--accent) 20%, transparent) 0deg 4deg, transparent 4deg 15deg)",
          WebkitMaskImage: "radial-gradient(closest-side, transparent 53%, #000 60%, transparent 82%)",
          maskImage: "radial-gradient(closest-side, transparent 53%, #000 60%, transparent 82%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      {/* pulsing glow */}
      <motion.div
        className="absolute inset-6 rounded-full blur-2xl pointer-events-none"
        style={{ background: "var(--accent)" }}
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [0.85, 1.1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* bobbing wrapper + squash/stretch image */}
      <motion.div
        className="relative w-full h-full"
        animate={{ y: [0, -20, 0], rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {src ? (
          <motion.img
            src={src}
            alt=""
            draggable={false}
            className="w-full h-full object-cover rounded-[18%] ring-1 ring-black/5 shadow-[0_26px_55px_-18px_rgba(40,50,90,0.5)]"
            animate={{ scaleX: [1, 1.05, 0.97, 1], scaleY: [1, 0.95, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileTap={{ scale: 0.93 }}
          />
        ) : (
          <div
            className="w-full h-full rounded-[18%]"
            style={{ background: "color-mix(in srgb, var(--accent) 22%, white)" }}
          />
        )}
      </motion.div>

      {/* ambient floating decor */}
      {decor !== "none" &&
        motes.map((m) => (
          <motion.span
            key={m.id}
            className="absolute pointer-events-none"
            style={{ left: `${m.left}%`, top: `${m.top}%` }}
            animate={{ y: [0, -m.rise, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: m.dur, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
          >
            {isHeart && m.heart ? (
              <Heart size={m.size} color={HEART_COLORS[m.id % HEART_COLORS.length]} />
            ) : (
              <Spark size={m.size} color={m.heart ? "#fff" : "color-mix(in srgb, var(--accent) 60%, white)"} />
            )}
          </motion.span>
        ))}

      {/* tap burst */}
      {pop > 0 && (
        <span key={pop} className="absolute inset-0 pointer-events-none">
          {burst.map((b) => (
            <motion.span
              key={b.id}
              className="absolute left-1/2 top-1/2"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: b.x, y: b.y, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              {isHeart ? (
                <Heart size={b.size} color={HEART_COLORS[b.id % HEART_COLORS.length]} />
              ) : (
                <Spark size={b.size} color="color-mix(in srgb, var(--accent) 70%, white)" />
              )}
            </motion.span>
          ))}
        </span>
      )}
    </div>
  );
}
