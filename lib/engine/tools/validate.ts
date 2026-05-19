/**
 * Widget structural + script safety validator. Mirrors HtmlBubble's
 * DOMPurify rules so the agent can self-check before submit_widget renders.
 */

export interface ValidationResult {
  valid: boolean;
  issues: string[];
  warnings: string[];
  summary: string;
}

const SENTINEL_START = "<!--bap-widget:start-->";
const SENTINEL_END = "<!--bap-widget:end-->";

const FORBIDDEN_TAG_RE = /<(iframe|style|object|embed)\b/i;
const EVENT_HANDLER_RE = /\son[a-z]+\s*=/i;
const SCRIPT_SRC_RE = /<script\b[^>]*\ssrc\s*=/i;
const FORM_ACTION_RE = /<form\b[^>]*\saction\s*=/i;
const FORM_METHOD_RE = /<form\b[^>]*\smethod\s*=/i;
const NETWORK_RE = /\b(fetch|XMLHttpRequest|navigator\.sendBeacon|new\s+EventSource|new\s+WebSocket)\s*\(/;
const DYNAMIC_CODE_RE = /\b(eval|new\s+Function|document\.write|setTimeout\s*\(\s*['"`]|setInterval\s*\(\s*['"`])/;

const MAX_WIDGET_BYTES = 20_000;

export function validateWidget(html: string): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const raw = html ?? "";

  if (!raw.includes(SENTINEL_START) || !raw.includes(SENTINEL_END)) {
    issues.push(
      `Missing required sentinels. Wrap your widget exactly in ${SENTINEL_START} ... ${SENTINEL_END}.`,
    );
  }

  const startCount = (raw.match(/<!--bap-widget:start-->/g) ?? []).length;
  const endCount = (raw.match(/<!--bap-widget:end-->/g) ?? []).length;
  if (startCount > 1 || endCount > 1) {
    issues.push(`Exactly ONE widget block per response. Found ${startCount} start / ${endCount} end sentinels.`);
  }

  const inner = extractInner(raw);

  if (FORBIDDEN_TAG_RE.test(inner)) {
    const tag = inner.match(FORBIDDEN_TAG_RE)?.[1] ?? "unknown";
    issues.push(`Forbidden tag <${tag}> present. Sanitizer will strip it. Remove or replace.`);
  }

  if (EVENT_HANDLER_RE.test(inner)) {
    issues.push(
      `Inline event handler (on*=) detected. Sanitizer strips these. ` +
        `Use addEventListener inside <script> instead.`,
    );
  }

  if (SCRIPT_SRC_RE.test(inner)) {
    issues.push(`<script src="..."> not allowed. Inline scripts only — paste the code directly.`);
  }

  if (FORM_ACTION_RE.test(inner)) {
    issues.push(`<form action="..."> not allowed. Forms never submit anywhere — handle via <script>.`);
  }
  if (FORM_METHOD_RE.test(inner)) {
    issues.push(`<form method="..."> not allowed. Forms never submit anywhere — handle via <script>.`);
  }

  const rootStyle = inner.match(/^<\w+[^>]*\sstyle=["']([^"']*)["']/im)?.[1] ?? "";
  const hasBg = /\bbackground/i.test(rootStyle);
  const hasColor = /\bcolor\s*:/i.test(rootStyle);
  if (!hasBg || !hasColor) {
    issues.push(
      `Contrast rule: widget root element must set BOTH background and color inline. ` +
        `Got: background=${hasBg ? "yes" : "no"}, color=${hasColor ? "yes" : "no"}.`,
    );
  }

  if (inner.length > MAX_WIDGET_BYTES) {
    issues.push(`Widget HTML is ${inner.length} bytes (max ${MAX_WIDGET_BYTES}). Trim styles or content.`);
  }

  const hasPromptTarget = /data-bap-prompt\s*=/i.test(inner);
  const hasExternalAnchor = /<a\b[^>]*\bhref\s*=[^>]*\btarget\s*=\s*["']_blank/i.test(inner);
  if (!hasPromptTarget && !hasExternalAnchor) {
    issues.push(
      `Widget has no click target. Every widget must have at least one ` +
        `\`data-bap-prompt="..."\` element (for follow-up) OR — only for source_cards — ` +
        `an \`<a href ... target="_blank" rel="noopener">\` link.`,
    );
  }

  // Tag balance — stack-based scan, so we can point at the SPECIFIC unclosed
  // tag (byte offset + verbatim opening snippet) rather than just "N opens
  // vs M closes" which the model can't act on. Void/SVG-leaf elements are
  // counted leniently (open without close is OK; close without open is not).
  const VOID_OR_LEAF = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "source", "track", "wbr",
    "circle", "ellipse", "rect", "line", "polyline", "polygon", "path",
    "stop", "use", "image",
  ]);
  const tagRe = /<(\/?)(\w+)(?:\s[^>]*?)?(\s*\/)?>/gi;

  type OpenFrame = { name: string; index: number; snippet: string };
  const stack: OpenFrame[] = [];
  const balanceIssues: string[] = [];
  const voidOpens = new Map<string, number>();
  const voidCloses = new Map<string, number>();

  for (const m of inner.matchAll(tagRe)) {
    const isClose = m[1] === "/";
    const name = m[2].toLowerCase();
    const isSelfClose = !!m[3];
    const at = m.index ?? 0;

    if (VOID_OR_LEAF.has(name)) {
      if (isClose) voidCloses.set(name, (voidCloses.get(name) ?? 0) + 1);
      else if (!isSelfClose) voidOpens.set(name, (voidOpens.get(name) ?? 0) + 1);
      continue;
    }
    if (isSelfClose) continue;

    if (!isClose) {
      stack.push({ name, index: at, snippet: m[0].slice(0, 80) });
    } else {
      let found = -1;
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === name) { found = i; break; }
      }
      if (found === -1) {
        balanceIssues.push(
          `</${name}> at byte ${at} has no matching <${name}> open.`,
        );
      } else {
        for (let i = stack.length - 1; i > found; i--) {
          const e = stack[i];
          balanceIssues.push(
            `<${e.name}> opened at byte ${e.index} (\`${e.snippet}\`) ` +
              `not closed before </${name}> at byte ${at}.`,
          );
        }
        stack.length = found;
      }
    }
  }
  for (const e of stack) {
    balanceIssues.push(
      `<${e.name}> opened at byte ${e.index} (\`${e.snippet}\`) was never closed. ` +
        `Add a matching </${e.name}> before the closing sentinel.`,
    );
  }
  for (const name of voidCloses.keys()) {
    const closes = voidCloses.get(name) ?? 0;
    const opens = voidOpens.get(name) ?? 0;
    if (closes > opens) {
      balanceIssues.push(
        `<${name}>: ${closes} </${name}> with only ${opens} <${name}> open(s).`,
      );
    }
  }

  if (balanceIssues.length > 0) {
    issues.push(
      `Tag balance off — ` + balanceIssues.slice(0, 4).join(" ") +
        (balanceIssues.length > 4 ? ` (+${balanceIssues.length - 4} more)` : ""),
    );
  }

  if (/<a\s[^>]*href=/i.test(inner)) {
    warnings.push(`<a href> detected. Only valid inside source_cards. For navigation, prefer <button data-bap-prompt>.`);
  }

  const scripts = Array.from(inner.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi));

  if (scripts.length > 0) {
    const allBody = scripts.map((m) => m[1]).join("\n");

    if (NETWORK_RE.test(allBody)) {
      issues.push(
        `Script attempts network call (fetch / XHR / WebSocket / sendBeacon). ` +
          `Mini-BAP widgets are purely client-side — remove network code.`,
      );
    }
    if (DYNAMIC_CODE_RE.test(allBody)) {
      issues.push(
        `Script uses dynamic-code construct (eval / new Function / document.write / string-form setTimeout). Remove it.`,
      );
    }

    const trimmed = allBody.trim();
    if (!/^\(function\s*\(/.test(trimmed) && !/^\(\s*\(\s*\)\s*=>/.test(trimmed) && !/^\(\s*async\s*function/.test(trimmed)) {
      warnings.push(`Recommend wrapping script body in an IIFE: (function(){ ... })();`);
    }

    const hasGetById = /document\.getElementById\s*\(\s*['"]bap-w-/.test(allBody);
    if (!hasGetById && allBody.length > 80) {
      warnings.push(`Recommend scoping queries to a root element with id="bap-w-..." via document.getElementById.`);
    }

    if (/<form\b/i.test(inner) && /addEventListener\s*\(\s*["']submit/.test(allBody) && !/preventDefault\s*\(\s*\)/.test(allBody)) {
      issues.push(`Form submit handler must call e.preventDefault() — otherwise the page navigates.`);
    }

    if (allBody.length > 4000) {
      warnings.push(`Script body is ${allBody.length} chars — consider trimming under 4000.`);
    }

    // .value vs .textContent mismatch — most common LLM bug for interactive widgets.
    const varToRole = new Map<string, string>();
    const bindingRe =
      /\b(?:var|let|const)\s+(\w+)\s*=\s*[\w.]+\.querySelector(?:All)?\s*\(\s*['"`]\[data-role=([^'"`\]\s]+)\][^)]*\)/g;
    let bm: RegExpExecArray | null;
    while ((bm = bindingRe.exec(allBody)) !== null) {
      varToRole.set(bm[1], bm[2]);
    }

    const isInputLike = (role: string): boolean => {
      const re = new RegExp(
        `<(input|select|textarea)\\b[^>]*\\bdata-role\\s*=\\s*['"]?${role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}['"\\s>]`,
        "i",
      );
      return re.test(inner);
    };

    const isDisplayElement = (role: string): boolean => {
      const re = new RegExp(
        `<(div|span|p|h[1-6]|output|td|th|li|label|small|b|i|em|strong|code|pre)\\b[^>]*\\bdata-role\\s*=\\s*['"]?${role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}['"\\s>]`,
        "i",
      );
      return re.test(inner);
    };

    const textWriteRe = /\b(\w+)\.textContent\s*=/g;
    let tw: RegExpExecArray | null;
    while ((tw = textWriteRe.exec(allBody)) !== null) {
      const v = tw[1];
      const role = varToRole.get(v);
      if (role && isInputLike(role)) {
        issues.push(
          `Script writes \`${v}.textContent\` but \`${v}\` is an <input>/<select>/<textarea> ` +
            `(data-role="${role}"). Inputs render their value from the .value property — ` +
            `textContent writes are invisible. Use \`${v}.value = ...\` instead.`,
        );
      }
    }

    const textReadRe = /\b(\w+)\.textContent\b(?!\s*=)/g;
    let tr: RegExpExecArray | null;
    while ((tr = textReadRe.exec(allBody)) !== null) {
      const v = tr[1];
      const role = varToRole.get(v);
      if (role && isInputLike(role)) {
        issues.push(
          `Script reads \`${v}.textContent\` but \`${v}\` is an <input>/<select>/<textarea> ` +
            `(data-role="${role}"). Use \`${v}.value\` instead.`,
        );
      }
    }

    const valueWriteRe = /\b(\w+)\.value\s*=/g;
    let vw: RegExpExecArray | null;
    while ((vw = valueWriteRe.exec(allBody)) !== null) {
      const v = vw[1];
      const role = varToRole.get(v);
      if (role && isDisplayElement(role)) {
        issues.push(
          `Script writes \`${v}.value\` but \`${v}\` is a display element ` +
            `(data-role="${role}"). Display elements show their .textContent — ` +
            `.value is invisible. Use \`${v}.textContent = ...\` instead.`,
        );
      }
    }
  }

  const valid = issues.length === 0;
  const summary = valid
    ? `Widget passes all structural checks (${inner.length} bytes${scripts.length > 0 ? `, ${scripts.length} script(s)` : ""}${warnings.length > 0 ? `, ${warnings.length} warning(s)` : ""}).`
    : `${issues.length} issue${issues.length === 1 ? "" : "s"} — fix and revalidate before render_widget.`;

  return { valid, issues, warnings, summary };
}

function extractInner(raw: string): string {
  const start = raw.indexOf(SENTINEL_START);
  const end = raw.indexOf(SENTINEL_END);
  if (start === -1 || end === -1 || end <= start) return raw;
  return raw.slice(start + SENTINEL_START.length, end).trim();
}
