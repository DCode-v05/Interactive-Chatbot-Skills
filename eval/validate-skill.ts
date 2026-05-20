/**
 * Validate a single skill's example widget against the structural rules.
 *
 * Each skill's `scripts/validate.sh` delegates here:
 *   npx tsx eval/validate-skill.ts <path-to-skill-dir>
 *
 * Reads <skill-dir>/examples/sample.md, extracts the ```html``` fenced block,
 * wraps it in widget sentinels, and runs the shared validator. Prints the
 * result and exits nonzero on failure.
 */
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { validateWidget } from "@/lib/engine/tools/validate";

const skillDir = process.argv[2];
if (!skillDir) {
  console.error("Usage: tsx eval/validate-skill.ts <skill-dir>");
  process.exit(2);
}

const samplePath = join(skillDir, "examples", "sample.md");
let sampleSrc: string;
try {
  sampleSrc = readFileSync(samplePath, "utf8");
} catch (err) {
  console.error(`Failed to read ${samplePath}: ${(err as Error).message}`);
  process.exit(2);
}

const html = extractHtmlFence(sampleSrc);
const START = "<!--bap-widget:start-->";
const END = "<!--bap-widget:end-->";
const wrapped = `${START}\n${html}\n${END}`;

const result = validateWidget(wrapped);
const name = basename(skillDir);
console.log(`${name}: ${result.summary}`);
for (const w of result.warnings) console.log(`  warn: ${w}`);
if (!result.valid) {
  for (const i of result.issues) console.log(`  - ${i}`);
  process.exit(1);
}

function extractHtmlFence(md: string): string {
  const m = md.match(/```html\s*\r?\n([\s\S]*?)\r?\n```/);
  return m ? m[1] : md;
}
