/**
 * Plan widget schema — three variants:
 *   - steps:    3–6 numbered process steps with an optional "current" marker.
 *               The renderer draws REAL SVG numbered circles (filled BAP-red
 *               for the current step, outlined otherwise) so the "you are
 *               here" pip is deterministic instead of LLM-guessed.
 *   - dated:    3–8 chronological dated events in a 3-column layout
 *               (monospace date · dot + vertical line · content). One event
 *               may carry `accent: true` to mark the key milestone.
 *   - schedule: 2–8 overlapping Gantt-style tasks on a date axis. Bar
 *               positions are derived from `dateRange` by the renderer — the
 *               model only provides ISO dates, never pixel coordinates.
 */

export interface PlanStepsWidget {
  widget: "plan";
  variant: "steps";
  version: "1.0";
  title: string;
  /** 3–6 numbered steps. At most one may carry `current: true`. */
  items: Array<{
    id: string;
    /** Display number on the circle. Must increase monotonically across items. */
    n: number;
    title: string;
    /** Optional 1-line elaboration shown under the title. */
    body?: string;
    /** Marks the "you-are-here" step. At most one item per widget. */
    current: boolean;
    /** Full prompt fired when the step row is clicked. */
    clickPrompt: string;
  }>;
}

export interface PlanDatedWidget {
  widget: "plan";
  variant: "dated";
  version: "1.0";
  title: string;
  /** 3–8 events in chronological order. At most one may carry `accent: true`. */
  events: Array<{
    id: string;
    /** Free-form date label (e.g. "2024", "Jan 2026", "2026-05-20"). Display-only. */
    date: string;
    title: string;
    /** Optional 1-line elaboration shown under the title. */
    body?: string;
    /** Highlights the key / current / most-recent milestone in BAP red. */
    accent: boolean;
    /** Full prompt fired when the event row is clicked. */
    clickPrompt: string;
  }>;
}

export interface PlanScheduleTask {
  id: string;
  name: string;
  /** ISO date string (YYYY-MM-DD). Must fall within `dateRange`. */
  startISO: string;
  /** ISO date string (YYYY-MM-DD). Must fall within `dateRange` and be ≥ startISO. */
  endISO: string;
  /** Full prompt fired when the bar is clicked. */
  clickPrompt: string;
}

export interface PlanScheduleWidget {
  widget: "plan";
  variant: "schedule";
  version: "1.0";
  title: string;
  /** Defines the x-axis. All task dates (and `today`, if present) must fall inside this range. */
  dateRange: {
    startISO: string;
    endISO: string;
  };
  /** 2–8 tasks. */
  tasks: PlanScheduleTask[];
  /** Optional ISO date for the dotted "today" indicator. Must fall within dateRange. */
  today?: string;
}

export type PlanWidget = PlanStepsWidget | PlanDatedWidget | PlanScheduleWidget;
