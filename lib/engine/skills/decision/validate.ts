import type { DecisionWidget } from "@/lib/types/widgets/decision";
import {
  asObject,
  buildResult,
  checkPlaceholders,
  requireKeys,
  uniqueIds,
  type ValidationResult,
} from "../_shared/validate-helpers";

export function validateDecision(input: unknown): ValidationResult {
  const issues: string[] = [];
  const data = asObject(input, issues);
  if (!data) return buildResult(issues, "");

  checkPlaceholders(data, issues);
  requireKeys(data, ["widget", "version", "variant"], issues);
  if (issues.length > 0) return buildResult(issues, "");

  if (data.widget !== "decision") {
    issues.push(`widget must be 'decision', got '${String(data.widget)}'`);
  }
  if (data.variant === "tradeoff") return validateTradeoff(data, issues);
  if (data.variant === "destructive") return validateDestructive(data, issues);
  issues.push(
    `variant must be 'tradeoff' or 'destructive', got '${String(data.variant)}'`,
  );
  return buildResult(issues, "");
}

function validateTradeoff(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  if (typeof data.heading !== "string" || data.heading.length === 0) {
    issues.push(`heading must be a non-empty string`);
  }
  if (!Array.isArray(data.options)) {
    issues.push(`options must be an array`);
    return buildResult(issues, "");
  }
  const options = data.options as Array<Record<string, unknown>>;
  if (options.length < 2 || options.length > 4) {
    issues.push(`options must have 2-4 entries, got ${options.length}`);
  }
  uniqueIds(options, "option", issues);

  let recommendedCount = 0;
  for (const o of options) {
    for (const k of ["id", "label", "blurb", "chooseLabel", "choosePrompt"]) {
      if (typeof o[k] !== "string" || (o[k] as string).length === 0) {
        issues.push(`option '${String(o.id ?? "?")}' missing non-empty '${k}'`);
      }
    }
    if (typeof o.recommended !== "boolean") {
      issues.push(`option '${String(o.id ?? "?")}' recommended must be a boolean`);
    } else if (o.recommended) {
      recommendedCount++;
    }
  }
  if (recommendedCount !== 1) {
    issues.push(
      `exactly one option must have recommended: true (got ${recommendedCount})`,
    );
  }
  return buildResult(
    issues,
    `OK: decision/tradeoff valid (${options.length} options)`,
  );
}

function validateDestructive(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  for (const k of ["question", "actionLabel", "confirmedPrompt"]) {
    if (typeof data[k] !== "string" || (data[k] as string).length === 0) {
      issues.push(`${k} must be a non-empty string`);
    }
  }
  if (
    data.irreversibleNote !== undefined &&
    typeof data.irreversibleNote !== "string"
  ) {
    issues.push(`irreversibleNote, if present, must be a string`);
  }
  return buildResult(issues, `OK: decision/destructive valid`);
}

export function isDecisionWidget(input: unknown): input is DecisionWidget {
  return validateDecision(input).valid;
}
