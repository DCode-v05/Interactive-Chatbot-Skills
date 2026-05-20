/**
 * Diagram widget schema — five variants of node-link diagrams.
 *
 * The model emits STRUCTURE ONLY (nodes, edges, ids, labels, logical
 * positions). The renderer computes ALL pixel geometry: box positions on
 * a grid, edge endpoints clipped to box edges, arrow marker placement,
 * tree layout via post-order traversal, radial angles for mind maps,
 * and hardcoded Venn diagram geometry.
 *
 * This is the fix for the HTML finishing complaint that "arrows are not
 * perfect" — the model previously had to guess pixel coordinates and
 * routinely placed arrowheads inside boxes or floating midair. With JSON,
 * the renderer is the single source of truth for geometry.
 *
 * Variants:
 *   - flow:     flowchart with decision branches on a row/col grid
 *   - sequence: actor-vs-time message flow with request/response arrows
 *   - tree:     top-down hierarchy laid out via post-order traversal
 *   - mind:     central concept with radial branches at 360°/n
 *   - venn:     overlap diagram between 2 or 3 sets
 */

/* ---------------- flow ---------------- */

export interface DiagramFlowNode {
  id: string;
  /** Visible label inside the box. */
  label: string;
  /** Logical row position (0-indexed integer ≥ 0). */
  row: number;
  /** Logical column position (0-indexed integer ≥ 0). */
  col: number;
  /** Optional accent — at most one node may be accented. */
  accent?: boolean;
  /** Full prompt fired when the node is clicked. */
  clickPrompt: string;
}

export interface DiagramFlowEdge {
  /** Node id that the edge starts at. */
  from: string;
  /** Node id that the edge ends at. */
  to: string;
  /** Optional short edge label rendered midway along the polyline. */
  label?: string;
}

export interface DiagramFlowWidget {
  widget: "diagram";
  variant: "flow";
  version: "1.0";
  title?: string;
  /** 2–8 nodes, unique ids. */
  nodes: DiagramFlowNode[];
  /** 1–10 edges referencing existing node ids. */
  edges: DiagramFlowEdge[];
}

/* ---------------- sequence ---------------- */

export type DiagramSequenceMessageKind = "request" | "response";

export interface DiagramSequenceMessage {
  id: string;
  /** Source actor index (0-based, into the `actors` array). */
  fromIdx: number;
  /** Destination actor index (0-based, into the `actors` array). */
  toIdx: number;
  label: string;
  /** Visual style: request = BAP red solid, response = gray dashed. */
  kind: DiagramSequenceMessageKind;
  /** Full prompt fired when the message arrow is clicked. */
  clickPrompt: string;
}

export interface DiagramSequenceWidget {
  widget: "diagram";
  variant: "sequence";
  version: "1.0";
  title: string;
  /** 2–5 actor names (rendered as column headers with lifelines). */
  actors: string[];
  /** 3–10 messages between actors. */
  messages: DiagramSequenceMessage[];
}

/* ---------------- tree ---------------- */

export interface DiagramTreeNode {
  id: string;
  label: string;
  /** Optional accent — usually used to highlight the root. */
  accent?: boolean;
  /** Full prompt fired when the node is clicked. */
  clickPrompt: string;
  /** Optional children (max depth = 3 levels including the root). */
  children?: DiagramTreeNode[];
}

export interface DiagramTreeWidget {
  widget: "diagram";
  variant: "tree";
  version: "1.0";
  title?: string;
  /** Root node — its descendants form the rest of the tree. */
  root: DiagramTreeNode;
}

/* ---------------- mind ---------------- */

export interface DiagramMindBranch {
  id: string;
  label: string;
  /** Full prompt fired when the branch is clicked. */
  clickPrompt: string;
}

export interface DiagramMindWidget {
  widget: "diagram";
  variant: "mind";
  version: "1.0";
  title?: string;
  /** The central concept (rendered inside the BAP-red circle). */
  central: string;
  /** 3–6 radial branches. */
  branches: DiagramMindBranch[];
}

/* ---------------- venn ---------------- */

export interface DiagramVennSet {
  id: string;
  label: string;
}

export interface DiagramVennRegion {
  id: string;
  /** Visible label rendered at the centroid of the region. */
  label: string;
  /** Which sets this region represents (subset of the sets' ids). */
  setIds: string[];
  /** Full prompt fired when the region label is clicked. */
  clickPrompt: string;
}

export interface DiagramVennWidget {
  widget: "diagram";
  variant: "venn";
  version: "1.0";
  title?: string;
  /** 2 or 3 sets — drives circle geometry. */
  sets: DiagramVennSet[];
  /**
   * 3 regions for 2 sets (left-only, both, right-only), or 7 regions for
   * 3 sets (the standard 3-set Venn partition).
   */
  regions: DiagramVennRegion[];
}

/* ---------------- union ---------------- */

export type DiagramWidget =
  | DiagramFlowWidget
  | DiagramSequenceWidget
  | DiagramTreeWidget
  | DiagramMindWidget
  | DiagramVennWidget;
