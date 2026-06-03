/**
 * Story-style segmented progress at the top of the flow — the "you're moving
 * through something" cue that premium onboarding funnels use.
 */
export function FlowProgress({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[3.5px] flex-1 rounded-full bg-black/10 overflow-hidden"
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: i <= current ? "100%" : "0%",
              background: "var(--accent)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
