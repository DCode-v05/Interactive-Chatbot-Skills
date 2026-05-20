import type { ListWidget } from "@/lib/types/widgets/list";
import {
  asObject,
  buildResult,
  checkPlaceholders,
  requireKeys,
  uniqueIds,
  type ValidationResult,
} from "../_shared/validate-helpers";

const VALID_ALIGNS = new Set(["left", "center", "right"]);

export function validateList(input: unknown): ValidationResult {
  const issues: string[] = [];
  const data = asObject(input, issues);
  if (!data) return buildResult(issues, "");

  checkPlaceholders(data, issues);
  requireKeys(data, ["widget", "version", "variant"], issues);
  if (issues.length > 0) return buildResult(issues, "");

  if (data.widget !== "list") {
    issues.push(`widget must be 'list', got '${String(data.widget)}'`);
  }
  if (data.variant === "checklist") return validateChecklist(data, issues);
  if (data.variant === "table") return validateTable(data, issues);
  issues.push(
    `variant must be 'checklist' or 'table', got '${String(data.variant)}'`,
  );
  return buildResult(issues, "");
}

function validateChecklist(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  if (!Array.isArray(data.items)) {
    issues.push(`items must be an array`);
    return buildResult(issues, "");
  }
  const items = data.items as Array<Record<string, unknown>>;
  if (items.length < 3 || items.length > 12) {
    issues.push(`items must have 3-12 entries, got ${items.length}`);
  }
  uniqueIds(items, "item", issues);
  for (const i of items) {
    for (const k of ["id", "label", "done", "clickPrompt"]) {
      if (!(k in i)) issues.push(`item '${String(i.id ?? "?")}' missing field '${k}'`);
    }
    if (typeof i.done !== "boolean") {
      issues.push(`item '${String(i.id ?? "?")}' done must be a boolean`);
    }
    if (typeof i.clickPrompt === "string" && i.clickPrompt.length === 0) {
      issues.push(`item '${String(i.id ?? "?")}' clickPrompt must be non-empty`);
    }
  }
  return buildResult(
    issues,
    `OK: list/checklist valid (${items.length} item${items.length === 1 ? "" : "s"})`,
  );
}

function validateTable(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  if (!Array.isArray(data.columns) || !Array.isArray(data.rows)) {
    issues.push(`columns and rows must both be arrays`);
    return buildResult(issues, "");
  }
  const columns = data.columns as Array<Record<string, unknown>>;
  const rows = data.rows as Array<Record<string, unknown>>;
  if (columns.length < 2 || columns.length > 4) {
    issues.push(`columns must have 2-4 entries, got ${columns.length}`);
  }
  if (rows.length < 2 || rows.length > 10) {
    issues.push(`rows must have 2-10 entries, got ${rows.length}`);
  }
  uniqueIds(columns, "column", issues);
  uniqueIds(rows, "row", issues);
  const colIds = columns.map((c) => String(c.id ?? ""));

  for (const c of columns) {
    for (const k of ["id", "label"]) {
      if (typeof c[k] !== "string" || (c[k] as string).length === 0) {
        issues.push(`column '${String(c.id ?? "?")}' missing non-empty '${k}'`);
      }
    }
    if (c.align !== undefined && !VALID_ALIGNS.has(String(c.align))) {
      issues.push(
        `column '${String(c.id ?? "?")}' align must be 'left' | 'center' | 'right', got '${String(c.align)}'`,
      );
    }
  }
  for (const r of rows) {
    for (const k of ["id", "cells", "clickPrompt"]) {
      if (!(k in r)) issues.push(`row '${String(r.id ?? "?")}' missing field '${k}'`);
    }
    const cells = (r.cells ?? {}) as Record<string, unknown>;
    for (const cid of colIds) {
      if (!(cid in cells)) {
        issues.push(`row '${String(r.id ?? "?")}' missing cell for column '${cid}'`);
      }
    }
  }
  return buildResult(
    issues,
    `OK: list/table valid (${columns.length} columns × ${rows.length} rows)`,
  );
}

export function isListWidget(input: unknown): input is ListWidget {
  return validateList(input).valid;
}
