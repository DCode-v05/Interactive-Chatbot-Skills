/**
 * Decision widget schema — two variants:
 *   - tradeoff:    2–4 named options the user picks between (one recommended).
 *   - destructive: irreversible action with a confirm gate.
 *
 * The renderer wires the destructive variant's primary button with
 * `data-bap-confirm`, which the host's click delegator routes through
 * `window.confirm()` before firing the prompt.
 */

export interface DecisionTradeoffOption {
  /** Kebab-case stable id, unique within the widget. */
  id: string;
  /** Display name in the option card header. */
  label: string;
  /** 1–2 sentence summary of the option. */
  blurb: string;
  /** Exactly one option per widget may set this to true (the filled CTA). */
  recommended: boolean;
  /** Label on the CTA button. */
  chooseLabel: string;
  /** Prompt fired when the user clicks the CTA. */
  choosePrompt: string;
}

export interface DecisionTradeoffWidget {
  widget: "decision";
  variant: "tradeoff";
  version: "1.0";
  /** The decision being made (e.g. "REST vs GraphQL?"). */
  heading: string;
  /** 2–4 options. Exactly one must be `recommended: true`. */
  options: DecisionTradeoffOption[];
}

export interface DecisionDestructiveWidget {
  widget: "decision";
  variant: "destructive";
  version: "1.0";
  /** The action being confirmed (e.g. "Delete the staging database?"). */
  question: string;
  /** Optional note ("Cannot be undone."). */
  irreversibleNote?: string;
  /** Destructive verb shown on the red button ("Delete", "Send"). */
  actionLabel: string;
  /** Prompt fired AFTER the user confirms through the window.confirm() dialog. */
  confirmedPrompt: string;
}

export type DecisionWidget =
  | DecisionTradeoffWidget
  | DecisionDestructiveWidget;
