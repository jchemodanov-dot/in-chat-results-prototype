// Resolve a theme/scan illustration URL by id. import.meta.glob means files that
// haven't been generated yet simply resolve to undefined instead of breaking the
// build, and newly generated ones are picked up on the next HMR reload.
const mods = import.meta.glob("../assets/flow/*.png", {
  eager: true,
  import: "default",
});

export function flowImage(id: string): string | undefined {
  for (const [path, url] of Object.entries(mods)) {
    if (path.endsWith(`/${id}.png`)) return url as string;
  }
  return undefined;
}
