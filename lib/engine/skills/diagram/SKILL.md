---
name: diagram
description: Render a node-link relationship as a typed widget instead of prose or an ASCII sketch. Trigger when the answer is fundamentally a graph â€” a flowchart, a sequence trace between actors, a hierarchy, a brainstormed central concept with branches, or set overlap. Five variants â€” pick exactly one per turn.
allowed-tools:
---

# Diagram Widget

You are generating an **interactive diagram widget**, not a written answer. The output is JSON the Skillet host renders inside the chat bubble. The widget has five variants â€” pick exactly one per turn.

**This skill is JSON-only.** You provide the graph **structure** (nodes, edges, ids, labels, *logical* positions like `row` / `col` / `fromIdx` / `setIds`). You **never** provide pixel coordinates, SVG markup, line endpoints, or arrow positions. The renderer computes every pixel â€” that is the entire point of this skill. The previous HTML version produced misaligned arrows because the model had to guess pixel coords; that is now physically impossible because the schema rejects pixels.

## When to use this skill

**variant: `flow`** â€” process flow / decision branches with arrows:

- "Show the sign-up flow", "deploy pipeline", "how does request â†’ response work"

**variant: `sequence`** â€” actor-to-actor messages over time:

- "Walk through the OAuth handshake", "trace a checkout request through the services"

**variant: `tree`** â€” strict parent â†’ child hierarchy:

- "Engineering org chart", "file tree", "decision tree for X"

**variant: `mind`** â€” central concept + radial branches (one level deep):

- "Brainstorm angles on launch positioning", "what topics does X cover"

**variant: `venn`** â€” overlap between 2 or 3 sets:

- "How do Python and JS overlap as backend languages", "common ground between OKRs, KPIs, and metrics"

Do **not** use this skill when:

- The answer is a list with no parent / child relationship â†’ use `list`
- The answer is numeric and demands axes â†’ use `chart`
- You want to compare two options attribute-by-attribute â†’ use `comparison-table`
- The "diagram" is really just a checklist of steps â†’ use `list` variant `checklist`
- Only 1â€“2 nodes exist â†’ just reply in prose

## What to gather before writing

For **flow**:

1. **2â€“8 nodes**. Each node has a stable `id`, short `label`, integer `row` â‰¥ 0, integer `col` â‰¥ 0, and a `clickPrompt`. The renderer arranges nodes on a grid based on `(row, col)`.
2. **1â€“10 edges**. Each edge is `{ from: <node id>, to: <node id>, label?: <short edge label> }`. The renderer computes endpoint clipping so arrows touch the box edges, never the box centers.
3. **â‰¤ 1 accent node** (typically the "start" or "decision" node). Accent flips the stroke to BAP red.

For **sequence**:

1. **2â€“5 actors** as a string array. Order matters â€” actor 0 is the leftmost lifeline.
2. **3â€“10 messages**. Each has `fromIdx` / `toIdx` (0-based indices into `actors`, must differ), `kind: "request" | "response"`, `label`, `id`, and `clickPrompt`. Order in the array = top-to-bottom rendering order.
3. Use `kind: "request"` for the primary forward path (renders BAP red solid) and `kind: "response"` for return values (renders gray dashed).

For **tree**:

1. A single `root` node, recursive `children?`. Each node has `id`, `label`, `clickPrompt`, optional `accent`, optional `children`.
2. **Depth â‰¤ 3 levels** (root counts as level 0). **Total nodes â‰¤ 12** including the root.
3. The renderer lays out the tree via post-order traversal â€” leaves get sequential x slots, parents are centered above their children. You do not specify positions.

For **mind**:

1. A single `central` concept string.
2. **3â€“6 branches**, each with `id`, `label`, `clickPrompt`.
3. The renderer places branches at evenly-spaced angles around the center. You do not specify angles.

For **venn**:

1. **2 or 3 sets**, each `{ id, label }`.
2. **Regions** describe each subset of sets that overlap:
   - For 2 sets `a, b`: exactly 3 regions with `setIds` of `["a"]`, `["a","b"]`, `["b"]`.
   - For 3 sets `a, b, c`: exactly 7 regions covering every non-empty subset â€” `["a"]`, `["b"]`, `["c"]`, `["a","b"]`, `["a","c"]`, `["b","c"]`, `["a","b","c"]`.
3. Each region has a `label` (what to render) and a `clickPrompt`.

## Filling the template

See `template.md` for all five variants' JSON skeletons. See `examples/sample.md` for worked vignettes.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

Validator checks: required fields per variant, integer grid coordinates, unique ids, node-count / edge-count / message-count bounds, edge endpoints reference real nodes, sequence indices in range and differ, tree depth â‰¤ 3 and â‰¤ 12 nodes globally unique, mind branch count 3â€“6, Venn set count exactly 2 or 3 and region count matches (3 for 2 sets, 7 for 3 sets), every region's `setIds` references defined set ids.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. **No SVG, no HTML, no pixel coordinates.** The host renders the JSON directly â€” geometry is the renderer's job.
