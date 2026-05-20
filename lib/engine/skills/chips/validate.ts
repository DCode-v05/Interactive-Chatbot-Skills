import type { ChipsWidget } from "@/lib/types/widgets/chips";
import {
  asObject,
  buildResult,
  checkPlaceholders,
  requireKeys,
  uniqueIds,
  type ValidationResult,
} from "../_shared/validate-helpers";

export function validateChips(input: unknown): ValidationResult {
  const issues: string[] = [];
  const data = asObject(input, issues);
  if (!data) return buildResult(issues, "");

  checkPlaceholders(data, issues);
  requireKeys(data, ["widget", "version", "chips"], issues);
  if (issues.length > 0) return buildResult(issues, "");

  if (data.widget !== "chips") {
    issues.push(`widget must be 'chips', got '${String(data.widget)}'`);
  }
  if (!Array.isArray(data.chips)) {
    issues.push(`chips must be an array`);
    return buildResult(issues, "");
  }
  const chips = data.chips as Array<Record<string, unknown>>;
  if (chips.length < 1 || chips.length > 6) {
    issues.push(`chips must have 1-6 entries, got ${chips.length}`);
  }
  uniqueIds(chips, "chip", issues);

  for (const c of chips) {
    for (const k of ["id", "label", "prompt"]) {
      if (!(k in c)) issues.push(`chip missing field '${k}': ${JSON.stringify(c)}`);
    }
    if (typeof c.label === "string" && c.label.length === 0) {
      issues.push(`chip '${c.id}' has empty label`);
    }
    if (typeof c.prompt === "string" && c.prompt.length === 0) {
      issues.push(`chip '${c.id}' has empty prompt`);
    }
  }

  return buildResult(
    issues,
    `OK: chips widget is valid (${chips.length} chip${chips.length === 1 ? "" : "s"})`,
  );
}

export function isChipsWidget(input: unknown): input is ChipsWidget {
  return validateChips(input).valid;
}
