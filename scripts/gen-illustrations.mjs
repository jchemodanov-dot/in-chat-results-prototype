// Generates bright, playful flat illustrations for the reveal flow via the
// OpenAI image API (gpt-image-2). Run ONCE locally — output PNGs are committed,
// the API key is NOT (read from env, never written to disk):
//
//   $env:OPENAI_API_KEY='sk-...'; node scripts/gen-illustrations.mjs
//   node scripts/gen-illustrations.mjs relationships   # single id
//
// Vibe: friendly, warm, optimistic, gamified — cute character mascots & hopeful
// scenes on soft pastel backgrounds. Premium mobile-app illustration style.

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "src", "assets", "flow");

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY env var.");
  process.exit(1);
}

const STYLE =
  "Friendly modern flat vector illustration in a bright, cheerful, playful yet " +
  "premium mobile-app style. Bold rounded shapes, clean confident outlines, " +
  "warm optimistic palette, simple expressive cute characters with little dot " +
  "faces and thin doodle limbs. Soft solid pastel lavender-periwinkle background. " +
  "Hopeful, gentle, emotionally warm, NOT clinical, NOT sad. Absolutely no text, " +
  "no words, no letters, no UI. Single clear centered subject, generous padding.";

const ITEMS = [
  {
    id: "scan",
    motif:
      "a cute friendly glowing little assistant mascot shaped like a soft rounded star with a kind warm smile, attentively listening, small floating heart and sparkle dots around it, caring and calm",
  },
  {
    id: "journey",
    motif:
      "a cute happy little character standing at the foot of a friendly rounded mountain, looking up through binoculars toward a bright flag at the summit, a colorful playful dashed path winding up to the top, optimistic adventure",
  },
  {
    id: "relationships",
    accent: "#A86BCB",
    motif:
      "two cute puzzle-piece characters with happy faces warmly hugging each other and fitting together, a few little hearts floating around them, cozy and secure",
  },
  {
    id: "anxiety",
    accent: "#5784D8",
    motif:
      "a cute round character calmly taking a deep relaxed breath, a small grey storm cloud above gently turning into a soft sunshine, serene relief",
  },
  {
    id: "burnout",
    accent: "#CC8A45",
    motif:
      "a cute little potted plant character that was drooping now perking back up with a happy smile under a warm friendly sun, energy returning",
  },
  {
    id: "self-esteem",
    accent: "#7A6BE3",
    motif:
      "a small cute character looking into a hand mirror and seeing a bright confident shining star version of itself smiling back, self-worth and warmth",
  },
  {
    id: "loneliness",
    accent: "#3FA396",
    motif:
      "two cute characters on small floating islands gently reaching out and connecting hands across a gap, a warm glowing little heart between them, hopeful togetherness",
  },
  {
    id: "boundaries",
    accent: "#5C63CC",
    motif:
      "a cute character standing tall and calm, confidently holding up a friendly rounded shield with a gentle proud smile, steady and safe",
  },
];

async function generate(spec, model) {
  const color = spec.accent ? ` Main accent color ${spec.accent}.` : "";
  const prompt = `${spec.motif}.${color} ${STYLE}`;
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model,
      prompt,
      size: "1024x1024",
      quality: process.env.IMG_QUALITY || "high",
      n: 1,
    }),
    signal: AbortSignal.timeout(170000),
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`HTTP ${res.status}: ${text.slice(0, 400)}`);
    err.status = res.status;
    throw err;
  }
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("No b64_json: " + JSON.stringify(json).slice(0, 300));
  return Buffer.from(b64, "base64");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const filter = process.argv[2];
  const list = filter ? ITEMS.filter((t) => t.id === filter) : ITEMS;
  const model = "gpt-image-2";

  for (const spec of list) {
    try {
      const buf = await generate(spec, model);
      const out = join(OUT_DIR, `${spec.id}.png`);
      await writeFile(out, buf);
      console.log(`OK ${spec.id} -> ${(buf.length / 1024).toFixed(0)} KB`);
    } catch (e) {
      console.error(`FAIL ${spec.id}: ${e.message}`);
    }
  }
}

main();
