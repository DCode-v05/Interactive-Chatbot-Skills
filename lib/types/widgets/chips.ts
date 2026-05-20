/**
 * Chips widget schema. Row of 3–5 follow-up pills, each fires its
 * pre-baked `prompt` when clicked.
 */
export interface ChipsWidget {
  widget: "chips";
  version: "1.0";
  /** Optional header above the pill row. */
  title?: string;
  /** 1–6 follow-up chips. */
  chips: Array<{
    /** Kebab-case stable id, unique within this widget. */
    id: string;
    /** Visible label on the pill (1–4 words). */
    label: string;
    /** Full prompt fired as the next user message when clicked. */
    prompt: string;
  }>;
}
