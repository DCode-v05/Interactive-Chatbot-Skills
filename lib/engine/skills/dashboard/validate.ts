import type { DashboardWidget } from "@/lib/types/widgets/dashboard";
import {
  asObject,
  buildResult,
  checkPlaceholders,
  requireKeys,
  uniqueIds,
  type ValidationResult,
} from "../_shared/validate-helpers";

const DELTA_DIRECTIONS = new Set(["up", "down", "flat"]);

export function validateDashboard(input: unknown): ValidationResult {
  const issues: string[] = [];
  const data = asObject(input, issues);
  if (!data) return buildResult(issues, "");

  checkPlaceholders(data, issues);
  requireKeys(data, ["widget", "version", "variant"], issues);
  if (issues.length > 0) return buildResult(issues, "");

  if (data.widget !== "dashboard") {
    issues.push(`widget must be 'dashboard', got '${String(data.widget)}'`);
  }

  if (data.variant === "kpi") return validateKpi(data, issues);
  if (data.variant === "profile") return validateProfile(data, issues);
  if (data.variant === "kanban") return validateKanban(data, issues);
  if (data.variant === "pricing") return validatePricing(data, issues);
  issues.push(
    `variant must be 'kpi' | 'profile' | 'kanban' | 'pricing', got '${String(data.variant)}'`,
  );
  return buildResult(issues, "");
}

function validateKpi(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  if (!Array.isArray(data.tiles)) {
    issues.push(`tiles must be an array`);
    return buildResult(issues, "");
  }
  const tiles = data.tiles as Array<Record<string, unknown>>;
  if (tiles.length < 3 || tiles.length > 6) {
    issues.push(`tiles must have 3-6 entries, got ${tiles.length}`);
  }
  uniqueIds(tiles, "tile", issues);
  for (const t of tiles) {
    for (const k of ["id", "metric", "value", "clickPrompt"]) {
      if (typeof t[k] !== "string" || (t[k] as string).length === 0) {
        issues.push(`tile '${String(t.id ?? "?")}' missing non-empty '${k}'`);
      }
    }
    if (
      t.deltaText !== undefined &&
      (typeof t.deltaText !== "string" || (t.deltaText as string).length === 0)
    ) {
      issues.push(`tile '${String(t.id ?? "?")}' deltaText must be a non-empty string when present`);
    }
    if (
      t.deltaDirection !== undefined &&
      !DELTA_DIRECTIONS.has(String(t.deltaDirection))
    ) {
      issues.push(
        `tile '${String(t.id ?? "?")}' deltaDirection must be 'up' | 'down' | 'flat', got '${String(t.deltaDirection)}'`,
      );
    }
  }
  return buildResult(
    issues,
    `OK: dashboard/kpi valid (${tiles.length} tile${tiles.length === 1 ? "" : "s"})`,
  );
}

function validateProfile(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  requireKeys(data, ["name", "initials", "action"], issues);
  for (const k of ["name", "initials"]) {
    if (typeof data[k] !== "string" || (data[k] as string).length === 0) {
      issues.push(`${k} must be a non-empty string`);
    }
  }
  if (typeof data.initials === "string") {
    const len = (data.initials as string).length;
    if (len < 1 || len > 3) {
      issues.push(`initials must be 1-3 characters, got ${len}`);
    }
  }
  if (
    data.role !== undefined &&
    (typeof data.role !== "string" || (data.role as string).length === 0)
  ) {
    issues.push(`role must be a non-empty string when present`);
  }
  if (data.stats !== undefined) {
    if (!Array.isArray(data.stats)) {
      issues.push(`stats must be an array when present`);
    } else {
      const stats = data.stats as Array<Record<string, unknown>>;
      if (stats.length > 4) {
        issues.push(`stats must have 0-4 entries, got ${stats.length}`);
      }
      for (const s of stats) {
        for (const k of ["label", "value"]) {
          if (typeof s[k] !== "string" || (s[k] as string).length === 0) {
            issues.push(`stat missing non-empty '${k}': ${JSON.stringify(s)}`);
          }
        }
      }
    }
  }
  const action = data.action as Record<string, unknown> | undefined;
  if (!action || typeof action !== "object") {
    issues.push(`action must be an object { label, prompt }`);
  } else {
    for (const k of ["label", "prompt"]) {
      if (typeof action[k] !== "string" || (action[k] as string).length === 0) {
        issues.push(`action.${k} must be a non-empty string`);
      }
    }
  }
  return buildResult(
    issues,
    `OK: dashboard/profile valid (${String(data.name ?? "?")})`,
  );
}

function validateKanban(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  if (!Array.isArray(data.columns)) {
    issues.push(`columns must be an array`);
    return buildResult(issues, "");
  }
  const columns = data.columns as Array<Record<string, unknown>>;
  if (columns.length < 2 || columns.length > 4) {
    issues.push(`columns must have 2-4 entries, got ${columns.length}`);
  }
  uniqueIds(columns, "column", issues);

  const allCards: Array<Record<string, unknown>> = [];
  for (const col of columns) {
    for (const k of ["id", "name"]) {
      if (typeof col[k] !== "string" || (col[k] as string).length === 0) {
        issues.push(`column '${String(col.id ?? "?")}' missing non-empty '${k}'`);
      }
    }
    if (!Array.isArray(col.cards)) {
      issues.push(`column '${String(col.id ?? "?")}' cards must be an array`);
      continue;
    }
    const cards = col.cards as Array<Record<string, unknown>>;
    if (cards.length < 1 || cards.length > 6) {
      issues.push(
        `column '${String(col.id ?? "?")}' must have 1-6 cards, got ${cards.length}`,
      );
    }
    for (const c of cards) {
      for (const k of ["id", "title", "clickPrompt"]) {
        if (typeof c[k] !== "string" || (c[k] as string).length === 0) {
          issues.push(
            `card '${String(c.id ?? "?")}' in column '${String(col.id ?? "?")}' missing non-empty '${k}'`,
          );
        }
      }
      if (
        c.meta !== undefined &&
        (typeof c.meta !== "string" || (c.meta as string).length === 0)
      ) {
        issues.push(`card '${String(c.id ?? "?")}' meta must be a non-empty string when present`);
      }
      allCards.push(c);
    }
  }
  uniqueIds(allCards, "card", issues);

  return buildResult(
    issues,
    `OK: dashboard/kanban valid (${columns.length} columns, ${allCards.length} card${allCards.length === 1 ? "" : "s"})`,
  );
}

function validatePricing(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  if (typeof data.heading !== "string" || (data.heading as string).length === 0) {
    issues.push(`heading must be a non-empty string`);
  }
  if (!Array.isArray(data.tiers)) {
    issues.push(`tiers must be an array`);
    return buildResult(issues, "");
  }
  const tiers = data.tiers as Array<Record<string, unknown>>;
  if (tiers.length < 3 || tiers.length > 4) {
    issues.push(`tiers must have 3 or 4 entries, got ${tiers.length}`);
  }
  uniqueIds(tiers, "tier", issues);

  let recommendedCount = 0;
  for (const t of tiers) {
    for (const k of ["id", "name", "price"]) {
      if (typeof t[k] !== "string" || (t[k] as string).length === 0) {
        issues.push(`tier '${String(t.id ?? "?")}' missing non-empty '${k}'`);
      }
    }
    if (
      t.priceSuffix !== undefined &&
      (typeof t.priceSuffix !== "string" || (t.priceSuffix as string).length === 0)
    ) {
      issues.push(`tier '${String(t.id ?? "?")}' priceSuffix must be a non-empty string when present`);
    }
    if (typeof t.recommended !== "boolean") {
      issues.push(`tier '${String(t.id ?? "?")}' recommended must be a boolean`);
    } else if (t.recommended === true) {
      recommendedCount += 1;
    }
    if (!Array.isArray(t.features)) {
      issues.push(`tier '${String(t.id ?? "?")}' features must be an array`);
    } else {
      const features = t.features as Array<Record<string, unknown>>;
      if (features.length < 2 || features.length > 8) {
        issues.push(
          `tier '${String(t.id ?? "?")}' features must have 2-8 entries, got ${features.length}`,
        );
      }
      for (const f of features) {
        if (typeof f.text !== "string" || (f.text as string).length === 0) {
          issues.push(
            `tier '${String(t.id ?? "?")}' feature missing non-empty 'text': ${JSON.stringify(f)}`,
          );
        }
        if (typeof f.included !== "boolean") {
          issues.push(
            `tier '${String(t.id ?? "?")}' feature 'included' must be a boolean: ${JSON.stringify(f)}`,
          );
        }
      }
    }
    const cta = t.cta as Record<string, unknown> | undefined;
    if (!cta || typeof cta !== "object") {
      issues.push(`tier '${String(t.id ?? "?")}' cta must be an object { label, prompt }`);
    } else {
      for (const k of ["label", "prompt"]) {
        if (typeof cta[k] !== "string" || (cta[k] as string).length === 0) {
          issues.push(`tier '${String(t.id ?? "?")}' cta.${k} must be a non-empty string`);
        }
      }
    }
  }
  if (recommendedCount !== 1) {
    issues.push(
      `exactly ONE tier must have recommended=true, got ${recommendedCount}`,
    );
  }

  return buildResult(
    issues,
    `OK: dashboard/pricing valid (${tiers.length} tiers)`,
  );
}

export function isDashboardWidget(input: unknown): input is DashboardWidget {
  return validateDashboard(input).valid;
}
