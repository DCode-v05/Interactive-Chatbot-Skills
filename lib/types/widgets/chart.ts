/**
 * Chart widget schema — six variants for numeric data visualization.
 *
 * The model emits DATA ONLY (labels, values, ids, click prompts). The
 * renderer computes ALL geometry: axis ticks, bar positions, pie arc paths,
 * polygon points, color scales, percentages. This is the fix for the HTML
 * finishing issues (misaligned arrows, Unicode □ glyphs, axis labels
 * overlapping bars, etc.).
 *
 * Variants:
 *   - bar:     bar/column chart, 2–12 bars, values ≥ 0
 *   - pie:     part-to-whole, 2–6 slices, values > 0
 *   - scatter: XY correlation, 4–30 points, optional trend line
 *   - funnel:  conversion drop-off, 3–6 stages, counts > 0 and non-increasing
 *   - radar:   multi-axis comparison, 3–7 axes, 1–3 entities
 *   - heatmap: 2D density grid, sparse cells allowed
 */

export interface ChartBarWidget {
  widget: "chart";
  variant: "bar";
  version: "1.0";
  /** Chart title shown above the plot. */
  title: string;
  /** Optional 1-line subtitle / context line. */
  subtitle?: string;
  /** Optional y-axis units label (e.g. "$K", "users"). */
  yUnits?: string;
  /** 2–12 bars. */
  bars: Array<{
    id: string;
    /** X-axis label under the bar. */
    label: string;
    /** Bar height value. Must be ≥ 0. */
    value: number;
    /** Full prompt fired when the bar is clicked. */
    clickPrompt: string;
    /** Optional extra detail appended to the native hover <title>. */
    tooltipExtra?: string;
  }>;
}

export interface ChartPieWidget {
  widget: "chart";
  variant: "pie";
  version: "1.0";
  title: string;
  /** 2–6 slices. Renderer computes percentages from values. */
  slices: Array<{
    id: string;
    label: string;
    /** Must be > 0. */
    value: number;
    clickPrompt: string;
  }>;
}

export interface ChartScatterWidget {
  widget: "chart";
  variant: "scatter";
  version: "1.0";
  title: string;
  /** X-axis label (rendered under the axis). */
  xLabel: string;
  /** Y-axis label (rendered rotated next to the axis). */
  yLabel: string;
  /** Optional shared unit suffix for tick labels (e.g. "$K"). */
  units?: string;
  /** 4–30 points. */
  points: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    clickPrompt: string;
  }>;
  /** When true, renderer draws a simple linear-regression trend line. */
  trendLine?: boolean;
}

export interface ChartFunnelWidget {
  widget: "chart";
  variant: "funnel";
  version: "1.0";
  title: string;
  /** 3–6 stages. Counts must be > 0 and non-increasing. */
  stages: Array<{
    id: string;
    name: string;
    /** Absolute count at this stage. */
    count: number;
    clickPrompt: string;
  }>;
}

/** Color slot for radar entities — mapped to BAP red / cool blue / neutral. */
export type RadarEntityColor = "red" | "blue" | "gray";

export interface ChartRadarWidget {
  widget: "chart";
  variant: "radar";
  version: "1.0";
  title: string;
  /** 3–7 trait names. Order = clockwise from 12 o'clock. */
  axes: string[];
  /** Common ceiling for all entity values (e.g. 5 or 10). */
  maxValue: number;
  /** 1–3 entities. */
  entities: Array<{
    id: string;
    name: string;
    color: RadarEntityColor;
    /** Length must equal axes.length. Each in [0..maxValue]. */
    values: number[];
    clickPrompt: string;
  }>;
}

export interface ChartHeatmapWidget {
  widget: "chart";
  variant: "heatmap";
  version: "1.0";
  title: string;
  /** Column headers (e.g. ["00", "06", "12", "18"]). */
  xLabels: string[];
  /** Row headers (e.g. ["Mon", "Tue", ...]). */
  yLabels: string[];
  /** Intensity ceiling used to scale cell opacity. */
  maxValue: number;
  /** Sparse list of cells. Missing positions render as 0. */
  cells: Array<{
    xIdx: number;
    yIdx: number;
    value: number;
    clickPrompt: string;
  }>;
}

export type ChartWidget =
  | ChartBarWidget
  | ChartPieWidget
  | ChartScatterWidget
  | ChartFunnelWidget
  | ChartRadarWidget
  | ChartHeatmapWidget;
