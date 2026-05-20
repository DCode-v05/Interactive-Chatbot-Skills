/**
 * Dashboard widget schema — four variants of composite tile / card surfaces:
 *   - kpi:     metric tile grid (big number + delta per tile)
 *   - profile: single-person summary with avatar + stats + primary action
 *   - kanban:  static multi-column task board (no drag-and-drop)
 *   - pricing: tiered SaaS plans with exactly one "Recommended" tier
 *
 * The renderer draws REAL SVG icons for the delta arrows (kpi) and the
 * included/excluded markers (pricing) so the model never has to emit
 * Unicode glyphs that render unpredictably across fonts.
 */

export interface DashboardKpiTile {
  /** Kebab-case stable id, unique within this widget. */
  id: string;
  /** Small uppercase label above the value (e.g. "MRR", "Churn"). */
  metric: string;
  /** Big number / display value ("$42K", "4.2%", "32 min"). */
  value: string;
  /** Optional delta caption ("+12% MoM", "−3% WoW"). */
  deltaText?: string;
  /** Direction drives the arrow icon + color. */
  deltaDirection?: "up" | "down" | "flat";
  /** Full prompt fired when the tile is clicked. */
  clickPrompt: string;
}

export interface DashboardKpiWidget {
  widget: "dashboard";
  variant: "kpi";
  version: "1.0";
  /** Optional header above the tile grid. */
  title?: string;
  /** 3–6 tiles, unique ids. */
  tiles: DashboardKpiTile[];
}

export interface DashboardProfileStat {
  /** Small uppercase label under the value. */
  label: string;
  /** Bold display value. */
  value: string;
}

export interface DashboardProfileAction {
  /** Visible button label (e.g. "Message", "View profile"). */
  label: string;
  /** Full prompt fired when the action button is clicked. */
  prompt: string;
}

export interface DashboardProfileWidget {
  widget: "dashboard";
  variant: "profile";
  version: "1.0";
  /** Person's display name. */
  name: string;
  /** 1–3 letters shown inside the avatar circle. */
  initials: string;
  /** Optional role / title shown under the name. */
  role?: string;
  /** 0–4 stats shown in a row under the name + role. */
  stats?: DashboardProfileStat[];
  /** Primary call-to-action button. */
  action: DashboardProfileAction;
}

export interface DashboardKanbanCard {
  /** Kebab-case stable id, unique across ALL columns in this widget. */
  id: string;
  /** Card title (1-line). */
  title: string;
  /** Optional meta line (e.g. "Due Fri", "@jane", "P1"). */
  meta?: string;
  /** Full prompt fired when the card is clicked. */
  clickPrompt: string;
}

export interface DashboardKanbanColumn {
  /** Kebab-case stable id, unique within this widget. */
  id: string;
  /** Column header label (e.g. "Backlog", "In progress", "Done"). */
  name: string;
  /** 1–6 cards in this column. */
  cards: DashboardKanbanCard[];
}

export interface DashboardKanbanWidget {
  widget: "dashboard";
  variant: "kanban";
  version: "1.0";
  /** Optional header above the board. */
  title?: string;
  /** 2–4 columns, unique ids. */
  columns: DashboardKanbanColumn[];
}

export interface DashboardPricingFeature {
  /** Feature description text. */
  text: string;
  /** Whether this tier includes the feature. Drives the check / cross icon. */
  included: boolean;
}

export interface DashboardPricingCta {
  /** Visible button label (e.g. "Start free", "Contact sales"). */
  label: string;
  /** Full prompt fired when the CTA is clicked. */
  prompt: string;
}

export interface DashboardPricingTier {
  /** Kebab-case stable id, unique within this widget. */
  id: string;
  /** Uppercase tier name shown above the price (e.g. "FREE", "PRO"). */
  name: string;
  /** Big display price ("$0", "$29", "Custom"). */
  price: string;
  /** Optional price suffix shown next to the price ("/mo", "/seat/yr"). */
  priceSuffix?: string;
  /** 2–8 features with included/excluded state per feature. */
  features: DashboardPricingFeature[];
  /** Per-tier call-to-action button. */
  cta: DashboardPricingCta;
  /** Exactly ONE tier in the widget must set this to `true`. */
  recommended: boolean;
}

export interface DashboardPricingWidget {
  widget: "dashboard";
  variant: "pricing";
  version: "1.0";
  /** Heading above the tier grid. */
  heading: string;
  /** 3 or 4 tiers; exactly one has `recommended: true`. */
  tiers: DashboardPricingTier[];
}

export type DashboardWidget =
  | DashboardKpiWidget
  | DashboardProfileWidget
  | DashboardKanbanWidget
  | DashboardPricingWidget;
