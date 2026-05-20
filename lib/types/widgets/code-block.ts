/**
 * Code-block widget schema. A filename header strip + monospace source
 * body, with two click targets: the filename span (fires `explainPrompt`
 * via `data-bap-prompt`) and a Copy button (clipboard utility, no chat
 * follow-up).
 *
 * Note: the discriminator uses a hyphen (`"code-block"`) to align with
 * comparison-table's convention. The folder on disk stays snake_case
 * (`lib/engine/skills/code_block/`); the registry maps the two.
 */
export interface CodeBlockWidget {
  widget: "code-block";
  version: "1.0";
  /** Filename shown in the header strip (e.g. "fetch_with_retry.py"). */
  filename: string;
  /** Lowercase language slug for the badge (e.g. "python", "sql", "ts"). */
  language: string;
  /**
   * The literal source. Preserved verbatim — the renderer escapes via
   * React's text-node escaping. Capped at 8000 chars for sanity.
   */
  code: string;
  /** Prompt fired when the user clicks the filename ("Explain this code"). */
  explainPrompt: string;
}
