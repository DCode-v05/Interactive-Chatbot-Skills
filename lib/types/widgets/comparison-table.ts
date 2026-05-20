/**
 * Comparison-table widget schema.
 *
 * Mirror of the JSON shape documented in
 * `lib/engine/skills/comparison-table/template.md`. The agent emits a
 * `ComparisonTableWidget` object; `validateComparisonTable()` is the
 * runtime gate; `ComparisonTableWidget.tsx` is the renderer.
 *
 * Click prompts use template placeholders the host substitutes at
 * click time:
 *   {option}     — the option's `label`
 *   {attribute}  — the attribute's `label`
 *   {value}      — the cell's `value`
 *   {options}    — comma-joined list of all option labels
 */

export type CellFormat =
  | "text"
  | "number"
  | "currency"
  | "boolean"
  | "rating";

export interface ComparisonTableOption {
  /** Kebab-case stable id. Used as the key in `attribute.cells`. */
  id: string;
  /** Display name shown in the column header. */
  label: string;
  /** Optional 5–8 word descriptor under the label. */
  tagline?: string;
  /** Prompt fired when the user clicks this column header. */
  clickPromptTemplate: string;
}

export interface ComparisonTableCell {
  /** The actual value for this option on this attribute. Strings only — `format` controls how the cell renders. */
  value: string;
  /** Optional short qualifier (e.g. "500MB only" or "since v3.0"). */
  note?: string;
  /** Per-attribute winner highlight. At most one cell per attribute row may be true. */
  isWinner: boolean;
  /** Prompt fired when the user clicks this cell. */
  clickPromptTemplate: string;
}

export interface ComparisonTableAttribute {
  /** Kebab-case stable id, unique within the widget. */
  id: string;
  /** Row label (e.g. "Free tier", "Learning curve"). */
  label: string;
  /** How cells in this row are rendered. */
  format: CellFormat;
  /** Prompt fired when the user clicks the row label. */
  clickPromptTemplate: string;
  /** One cell per option id. Every option must be represented. */
  cells: Record<string, ComparisonTableCell>;
}

export interface ComparisonTableWidget {
  widget: "comparison-table";
  version: "1.0";
  /** One-line title (≤ 80 chars). */
  title: string;
  /** Optional one-line context. Empty string is valid. */
  subtitle?: string;
  /** 2–6 options being compared. */
  options: ComparisonTableOption[];
  /** 4–10 attributes (rows). */
  attributes: ComparisonTableAttribute[];
  /** 2–3 sentence neutral takeaway. */
  summary: string;
  /** Exactly 3 follow-up question chips shown below the table. */
  followUps: [string, string, string];
}
