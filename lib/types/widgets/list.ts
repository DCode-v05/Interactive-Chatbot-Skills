/**
 * List widget schema — two variants:
 *   - checklist: single-column list of items with done/todo state.
 *                The renderer draws REAL SVG checkbox icons (no Unicode
 *                glyphs, no font-rendering surprises).
 *   - table:     multi-column comparison / spec table. Each row click
 *                fires its own `clickPrompt`.
 */

export interface ListChecklistWidget {
  widget: "list";
  variant: "checklist";
  version: "1.0";
  title?: string;
  /** 3–12 items. */
  items: Array<{
    id: string;
    /** The thing to check off. */
    label: string;
    /** Whether the item is already complete. */
    done: boolean;
    /** Optional 1-line elaboration / helper text shown under the label. */
    note?: string;
    /** Full prompt fired when the row is clicked. */
    clickPrompt: string;
  }>;
}

export interface ListTableColumn {
  id: string;
  label: string;
  /** Horizontal alignment. Defaults to `"left"`. */
  align?: "left" | "center" | "right";
}

export interface ListTableRow {
  id: string;
  /** One value per column id. Missing column → renders as "—". */
  cells: Record<string, string>;
  /** Full prompt fired when the row is clicked. */
  clickPrompt: string;
}

export interface ListTableWidget {
  widget: "list";
  variant: "table";
  version: "1.0";
  title?: string;
  /** 2–4 columns. */
  columns: ListTableColumn[];
  /** 2–10 rows. */
  rows: ListTableRow[];
}

export type ListWidget = ListChecklistWidget | ListTableWidget;
