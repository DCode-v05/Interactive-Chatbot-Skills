/**
 * Widget skill catalog — loaded from disk at module init.
 *
 * Source of truth: `lib/engine/skills/<intent>/SKILL.md` (frontmatter +
 * design-note body) plus `lib/engine/skills/<intent>/examples/sample.html`.
 *
 * SKILL.md frontmatter shape:
 *   name: <intent slug, matches directory name>
 *   description: <appliesWhen — when to pick this skill>
 *   family: static | diagram | chart | dashboard | interactive
 *   needs_interactivity: true | false
 *   keywords: [list of strings]
 *   reminders: [optional list of skill-specific reminders]
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export interface WidgetSkill {
  intent: string;
  appliesWhen: string;
  keywords: string[];
  needsInteractivity: boolean;
  family: "static" | "diagram" | "chart" | "dashboard" | "interactive";
  designNote: string;
  reminders: string[];
  html: string;
}

export type WidgetIntent = string;

const SKILLS_DIR = join(process.cwd(), "lib", "engine", "skills");

const SKILLS: Record<string, WidgetSkill> = loadSkillsFromDisk();
const INTENTS: string[] = Object.keys(SKILLS).sort();

export const WIDGET_INTENTS: readonly string[] = INTENTS;

export function getSkill(intent: string): WidgetSkill | null {
  return SKILLS[intent] ?? null;
}

export function listSkills(): WidgetSkill[] {
  return INTENTS.map((i) => SKILLS[i]);
}

export function listIntents(): string[] {
  return [...INTENTS];
}

// --- loader ---------------------------------------------------------------

function loadSkillsFromDisk(): Record<string, WidgetSkill> {
  const out: Record<string, WidgetSkill> = {};
  const entries = readdirSync(SKILLS_DIR);
  for (const dir of entries) {
    const dirPath = join(SKILLS_DIR, dir);
    if (!statSync(dirPath).isDirectory()) continue;

    const skillPath = join(dirPath, "SKILL.md");
    const samplePath = join(dirPath, "examples", "sample.md");

    const skillSrc = readFileSync(skillPath, "utf8");
    const { data, body } = parseFrontmatter(skillSrc);

    const intent = asString(data.name, dir);
    if (intent !== dir) {
      throw new Error(
        `Skill name mismatch: directory "${dir}" vs frontmatter name "${intent}".`,
      );
    }

    const family = asString(data.family);
    if (!isFamily(family)) {
      throw new Error(`Skill "${intent}" has invalid family: "${family}".`);
    }

    const html = extractHtmlFromMd(readFileSync(samplePath, "utf8"));

    out[intent] = {
      intent,
      appliesWhen: asString(data.description),
      keywords: asStringList(data.keywords),
      needsInteractivity: data.needs_interactivity === true,
      family,
      designNote: body.trim(),
      reminders: asStringList(data.reminders),
      html,
    };
  }
  return out;
}

function isFamily(s: string): s is WidgetSkill["family"] {
  return (
    s === "static" ||
    s === "diagram" ||
    s === "chart" ||
    s === "dashboard" ||
    s === "interactive"
  );
}

// Minimal YAML frontmatter parser. Supports:
//   key: scalar-string         (quotes optional, trimmed)
//   key: true | false
//   key:                       (followed by indented "- item" list)
//     - item
//     - "quoted item"
// No nested maps, no multi-line strings. Sufficient for our SKILL.md schema.
function parseFrontmatter(src: string): {
  data: Record<string, unknown>;
  body: string;
} {
  if (!src.startsWith("---")) return { data: {}, body: src };
  const after = src.slice(3).replace(/^\r?\n/, "");
  const endMatch = after.match(/^---\s*$/m);
  if (!endMatch || endMatch.index === undefined) return { data: {}, body: src };
  const yamlBlock = after.slice(0, endMatch.index);
  const body = after.slice(endMatch.index + endMatch[0].length).replace(/^\r?\n/, "");

  const data: Record<string, unknown> = {};
  let currentList: string[] | null = null;

  for (const raw of yamlBlock.split(/\r?\n/)) {
    if (!raw.trim()) continue;

    if (currentList && /^\s+-\s/.test(raw)) {
      currentList.push(stripQuotes(raw.replace(/^\s+-\s*/, "").trim()));
      continue;
    }

    const m = raw.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    const value = m[2].trim();

    if (value === "") {
      currentList = [];
      data[key] = currentList;
    } else {
      currentList = null;
      data[key] = parseScalar(value);
    }
  }

  return { data, body };
}

function parseScalar(v: string): unknown {
  if (v === "true") return true;
  if (v === "false") return false;
  // Inline flow-list: [a, b, "c"]
  if (v.startsWith("[") && v.endsWith("]")) {
    return v
      .slice(1, -1)
      .split(",")
      .map((s) => stripQuotes(s.trim()))
      .filter((s) => s.length > 0);
  }
  return stripQuotes(v);
}

function stripQuotes(s: string): string {
  if (s.length >= 2) {
    const first = s.charAt(0);
    const last = s.charAt(s.length - 1);
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return s.slice(1, -1);
    }
  }
  return s;
}

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asStringList(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string" && x.length > 0);
}

// Extract the first ```html fenced block from a markdown sample. If no fence
// is present, treat the whole file as raw HTML — lenient fallback so a stub
// sample with just the HTML still works.
function extractHtmlFromMd(md: string): string {
  const m = md.match(/```html\s*\r?\n([\s\S]*?)\r?\n```/);
  if (m) return m[1];
  return md;
}
