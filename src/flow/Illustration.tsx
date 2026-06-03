import { flowImage } from "./images";

/**
 * A generated character illustration shown as a soft "sticker" — rounded, with
 * a blurred accent glow behind it so it pops off the light screen. Falls back to
 * a soft accent tile if the image hasn't been generated yet.
 */
export function Illustration({
  id,
  size = 240,
  className = "",
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const src = flowImage(id);
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-2 rounded-full blur-2xl opacity-55"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          className="relative w-full h-full object-cover rounded-[34px] ring-1 ring-black/5 shadow-[0_18px_40px_-16px_rgba(40,50,90,0.45)]"
        />
      ) : (
        <div
          className="relative w-full h-full rounded-[34px]"
          style={{ background: "color-mix(in srgb, var(--accent) 22%, white)" }}
        />
      )}
    </div>
  );
}
