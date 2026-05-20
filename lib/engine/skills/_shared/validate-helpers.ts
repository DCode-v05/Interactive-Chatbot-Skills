/**
 * Cross-skill validator helpers. Used by each JSON skill's `validate.ts`
 * so the per-skill files only contain skill-specific rules.
 */

export interface ValidationResult {
  valid: boolean;
  issues: string[];
  summary: string;
}

// Match short, single-line [...] template placeholders.
const PLACEHOLDER_RE = /\[[A-Za-z][^\]\n"{}]*\]/g;

/** Recursive string-only walker. */
export function walkStrings(node: unknown, visit: (s: string) => void): void {
  if (typeof node === "string") visit(node);
  else if (Array.isArray(node)) for (const x of node) walkStrings(x, visit);
  else if (node !== null && typeof node === "object") {
    for (const v of Object.values(node as Record<string, unknown>))
      walkStrings(v, visit);
  }
}

/** Catch unfilled `[bracketed placeholders]` left over from template.md. */
export function checkPlaceholders(node: unknown, issues: string[]): void {
  walkStrings(node, (s) => {
    for (const m of s.matchAll(PLACEHOLDER_RE)) {
      issues.push(`unfilled placeholder still present in a string value: ${m[0]}`);
    }
  });
}

/** Require a set of top-level keys; push an issue per missing key. */
export function requireKeys(
  data: Record<string, unknown>,
  keys: readonly string[],
  issues: string[],
): void {
  for (const k of keys) {
    if (!(k in data)) issues.push(`missing required field: ${k}`);
  }
}

/** Assert that `input` is a plain object. Returns null + pushes issue on fail. */
export function asObject(
  input: unknown,
  issues: string[],
): Record<string, unknown> | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    issues.push(`Top-level value must be a JSON object.`);
    return null;
  }
  return input as Record<string, unknown>;
}

/** Build a final ValidationResult — valid iff `issues.length === 0`. */
export function buildResult(issues: string[], okSummary: string): ValidationResult {
  if (issues.length === 0) {
    return { valid: true, issues: [], summary: okSummary };
  }
  return {
    valid: false,
    issues,
    summary: `${issues.length} validation error${issues.length === 1 ? "" : "s"}`,
  };
}

/** Validate that each item has a unique `id` string. */
export function uniqueIds(
  items: Array<Record<string, unknown>>,
  noun: string,
  issues: string[],
): void {
  const ids = items.map((x) => String(x.id ?? ""));
  if (new Set(ids).size !== ids.length) {
    issues.push(`${noun} IDs must be unique, got: ${JSON.stringify(ids)}`);
  }
}

/** Validate http/https URL shape. */
export function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
