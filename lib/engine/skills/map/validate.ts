import type { MapRegion, MapWidget } from "@/lib/types/widgets/map";
import {
  asObject,
  buildResult,
  checkPlaceholders,
  requireKeys,
  uniqueIds,
  type ValidationResult,
} from "../_shared/validate-helpers";

const REGIONS: ReadonlySet<MapRegion> = new Set([
  "world",
  "europe",
  "us",
  "asia",
]);

const VIEWBOX_W = 600;
const VIEWBOX_H = 360;

export function validateMap(input: unknown): ValidationResult {
  const issues: string[] = [];
  const data = asObject(input, issues);
  if (!data) return buildResult(issues, "");

  checkPlaceholders(data, issues);
  requireKeys(data, ["widget", "version", "title", "region", "pins"], issues);
  if (issues.length > 0) return buildResult(issues, "");

  if (data.widget !== "map") {
    issues.push(`widget must be 'map', got '${String(data.widget)}'`);
  }

  if (typeof data.title !== "string" || data.title.length === 0) {
    issues.push(`title must be a non-empty string`);
  }

  if (data.caption !== undefined && typeof data.caption !== "string") {
    issues.push(`caption, when present, must be a string`);
  }

  if (!REGIONS.has(data.region as MapRegion)) {
    issues.push(
      `region must be one of ${[...REGIONS].join(", ")}, got '${String(data.region)}'`,
    );
  }

  if (!Array.isArray(data.pins)) {
    issues.push(`pins must be an array`);
    return buildResult(issues, "");
  }
  const pins = data.pins as Array<Record<string, unknown>>;
  if (pins.length < 1 || pins.length > 8) {
    issues.push(`pins must have 1-8 entries, got ${pins.length}`);
  }
  uniqueIds(pins, "pin", issues);

  for (const p of pins) {
    const pid = String(p.id ?? "?");
    for (const k of ["id", "name", "clickPrompt"]) {
      if (typeof p[k] !== "string" || (p[k] as string).length === 0) {
        issues.push(`pin '${pid}' missing non-empty '${k}'`);
      }
    }
    if (typeof p.x !== "number" || !Number.isFinite(p.x)) {
      issues.push(`pin '${pid}' x must be a finite number`);
    } else if (p.x < 0 || p.x > VIEWBOX_W) {
      issues.push(
        `pin '${pid}' x must be in [0..${VIEWBOX_W}], got ${p.x}`,
      );
    }
    if (typeof p.y !== "number" || !Number.isFinite(p.y)) {
      issues.push(`pin '${pid}' y must be a finite number`);
    } else if (p.y < 0 || p.y > VIEWBOX_H) {
      issues.push(
        `pin '${pid}' y must be in [0..${VIEWBOX_H}], got ${p.y}`,
      );
    }
  }

  if (data.routeIds !== undefined) {
    if (!Array.isArray(data.routeIds)) {
      issues.push(`routeIds, when present, must be an array of pin ids`);
    } else {
      const routeIds = data.routeIds as unknown[];
      if (routeIds.length < 2) {
        issues.push(
          `routeIds, when present, must have length >= 2, got ${routeIds.length}`,
        );
      }
      const pinIdSet = new Set(pins.map((p) => String(p.id ?? "")));
      for (const rid of routeIds) {
        if (typeof rid !== "string") {
          issues.push(`routeIds entries must be strings, got '${String(rid)}'`);
          continue;
        }
        if (!pinIdSet.has(rid)) {
          issues.push(`routeIds entry '${rid}' does not reference an existing pin id`);
        }
      }
    }
  }

  return buildResult(
    issues,
    `OK: map widget is valid (region=${String(data.region)}, ${pins.length} pin${pins.length === 1 ? "" : "s"}${Array.isArray(data.routeIds) ? `, route of ${(data.routeIds as unknown[]).length}` : ""})`,
  );
}

export function isMapWidget(input: unknown): input is MapWidget {
  return validateMap(input).valid;
}
