import type { CodeBlockWidget } from "@/lib/types/widgets/code-block";
import {
  asObject,
  buildResult,
  checkPlaceholders,
  requireKeys,
  type ValidationResult,
} from "../_shared/validate-helpers";

const MAX_CODE_LEN = 8000;
const LANGUAGE_RE = /^[a-z]+$/;

export function validateCodeBlock(input: unknown): ValidationResult {
  const issues: string[] = [];
  const data = asObject(input, issues);
  if (!data) return buildResult(issues, "");

  checkPlaceholders(data, issues);
  requireKeys(
    data,
    ["widget", "version", "filename", "language", "code", "explainPrompt"],
    issues,
  );
  if (issues.length > 0) return buildResult(issues, "");

  if (data.widget !== "code-block") {
    issues.push(`widget must be 'code-block', got '${String(data.widget)}'`);
  }

  for (const k of ["filename", "language", "code", "explainPrompt"]) {
    if (typeof data[k] !== "string" || (data[k] as string).length === 0) {
      issues.push(`${k} must be a non-empty string`);
    }
  }

  if (typeof data.code === "string" && data.code.length > MAX_CODE_LEN) {
    issues.push(
      `code must be <= ${MAX_CODE_LEN} chars, got ${data.code.length}`,
    );
  }

  if (typeof data.language === "string" && !LANGUAGE_RE.test(data.language)) {
    issues.push(
      `language must be lowercase letters only (a-z), got '${data.language}'`,
    );
  }

  return buildResult(
    issues,
    `OK: code-block widget is valid (${String(data.filename)}, ${String(data.language)}, ${typeof data.code === "string" ? data.code.length : 0} chars)`,
  );
}

export function isCodeBlockWidget(input: unknown): input is CodeBlockWidget {
  return validateCodeBlock(input).valid;
}
