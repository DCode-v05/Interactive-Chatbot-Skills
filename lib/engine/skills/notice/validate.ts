import type { NoticeWidget, Severity } from "@/lib/types/widgets/notice";
import {
  asObject,
  buildResult,
  checkPlaceholders,
  isHttpUrl,
  requireKeys,
  uniqueIds,
  type ValidationResult,
} from "../_shared/validate-helpers";

const SEVERITIES: ReadonlySet<Severity> = new Set([
  "success",
  "warning",
  "error",
  "info",
]);

export function validateNotice(input: unknown): ValidationResult {
  const issues: string[] = [];
  const data = asObject(input, issues);
  if (!data) return buildResult(issues, "");

  checkPlaceholders(data, issues);
  requireKeys(data, ["widget", "version", "variant"], issues);
  if (issues.length > 0) return buildResult(issues, "");

  if (data.widget !== "notice") {
    issues.push(`widget must be 'notice', got '${String(data.widget)}'`);
  }

  if (data.variant === "banner") return validateBanner(data, issues);
  if (data.variant === "sources") return validateSources(data, issues);
  issues.push(
    `variant must be 'banner' or 'sources', got '${String(data.variant)}'`,
  );
  return buildResult(issues, "");
}

function validateBanner(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  requireKeys(data, ["severity", "message"], issues);
  if (!SEVERITIES.has(data.severity as Severity)) {
    issues.push(
      `severity must be one of ${[...SEVERITIES].join(", ")}, got '${String(data.severity)}'`,
    );
  }
  if (typeof data.message !== "string" || data.message.length === 0) {
    issues.push(`message must be a non-empty string`);
  }
  if (data.learnMore !== undefined) {
    const lm = data.learnMore as Record<string, unknown> | null;
    if (!lm || typeof lm !== "object") {
      issues.push(`learnMore must be an object { label, prompt }`);
    } else {
      for (const k of ["label", "prompt"]) {
        if (typeof lm[k] !== "string" || (lm[k] as string).length === 0) {
          issues.push(`learnMore.${k} must be a non-empty string`);
        }
      }
    }
  }
  return buildResult(issues, `OK: notice/banner valid (severity=${String(data.severity)})`);
}

function validateSources(
  data: Record<string, unknown>,
  issues: string[],
): ValidationResult {
  if (!Array.isArray(data.sources)) {
    issues.push(`sources must be an array`);
    return buildResult(issues, "");
  }
  const sources = data.sources as Array<Record<string, unknown>>;
  if (sources.length < 1 || sources.length > 5) {
    issues.push(`sources must have 1-5 entries, got ${sources.length}`);
  }
  uniqueIds(sources, "source", issues);

  for (const s of sources) {
    for (const k of ["id", "url", "title", "domain"]) {
      if (typeof s[k] !== "string" || (s[k] as string).length === 0) {
        issues.push(`source '${String(s.id ?? "?")}' missing non-empty '${k}'`);
      }
    }
    if (typeof s.url === "string" && !isHttpUrl(s.url)) {
      issues.push(`source '${String(s.id ?? "?")}' url must be http(s)://, got '${s.url}'`);
    }
  }
  return buildResult(
    issues,
    `OK: notice/sources valid (${sources.length} source${sources.length === 1 ? "" : "s"})`,
  );
}

export function isNoticeWidget(input: unknown): input is NoticeWidget {
  return validateNotice(input).valid;
}
