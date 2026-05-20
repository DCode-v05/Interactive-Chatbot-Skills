---
name: chart
description: Render numeric data as a typed chart widget instead of HTML or prose. Six variants — bar, pie, scatter, funnel, radar, heatmap. Trigger when the answer IS a quantitative visualization (trend, breakdown, correlation, drop-off, multi-axis comparison, density grid).
allowed-tools:
---

# Chart Widget

You are generating an **interactive chart widget**, not a written answer and not raw HTML. The widget has six variants — pick exactly one per turn.

You provide **DATA ONLY** — ids, labels, values, and click prompts. The renderer computes every pixel of geometry: axis ticks, bar positions, pie arc paths, polygon vertices, color scales, percentages. Do not try to lay anything out yourself.

## When to use this skill

**variant: `bar`** — a single numeric series across discrete categories or time buckets:

- "Revenue by quarter" → 4 bars
- "Top 8 customers by ARR"
- "Sign-ups per day this week"

**variant: `pie`** — part-to-whole with a small number of slices (≤ 6):

- "Headcount by department"
- "Spend by category last month"

**variant: `scatter`** — two-variable correlation, 4–30 points:

- "Ad spend vs revenue by campaign"
- "Latency vs payload size for each endpoint"

**variant: `funnel`** — strictly non-increasing conversion stages, 3–6:

- "Signup → activation → paid funnel"
- "Lead → qualified → demo → won"

**variant: `radar`** — multi-axis comparison of 1–3 entities across 3–7 traits, all on the same 0..N scale:

- "Slack vs Teams across 5 collab traits"
- "Strengths/weaknesses of this candidate vs the role profile"

**variant: `heatmap`** — 2D density grid (e.g. weekday × hour):

- "Sign-ups by day-of-week and hour"
- "Latency by region and time-of-day"

Do **not** use this skill when:

- The answer is a single number, status, or sentence → use `notice` (banner) or reply in prose
- The answer is a structured comparison of options across attributes → use `comparison-table`
- The answer is a tabular list → use `list` (variant `table`)
- The answer requires text explanation alongside the numbers → reply in prose with inline figures; chart is for when the chart IS the answer

## What to gather before writing

Common to every variant:

1. **The actual numbers.** Round only after you have the precise values. If a value is "approximately 38%", commit to a single number (38).
2. **Stable ids.** Use kebab-case (`q1-2024`, `mobile-app`, `engineering`). Ids must be unique within the chart.
3. **Click prompts.** Each data element fires its own full prompt as the next user message. Make it specific: "Show monthly breakdown for Engineering headcount", not "Tell me more".

Per variant:

- **bar** — `bars[].value` must be ≥ 0. Don't pre-sort unless time order matters; the renderer respects array order. 2–12 bars.
- **pie** — `slices[].value` must be > 0. The renderer computes percentages from the raw values, so do NOT pre-normalize to 100. 2–6 slices.
- **scatter** — Provide raw `x` and `y` numbers (the renderer scales them). 4–30 points. Set `trendLine: true` if a linear fit is meaningful.
- **funnel** — `stages[].count` must be strictly > 0 AND non-increasing (each stage ≤ the previous). The renderer computes drop-off and percent-of-top. 3–6 stages.
- **radar** — Pick a sensible `maxValue` (commonly 5 or 10). Every entity's `values` array must match `axes.length`, and each value must be in `[0..maxValue]`. Use `color: "red"` for the primary subject, `"blue"` for the comparator, `"gray"` for the baseline/benchmark.
- **heatmap** — `xLabels` is the column header strip, `yLabels` is the row strip. Cells are sparse — only include the `(xIdx, yIdx)` positions that have data. Missing positions render as 0. Indexes must be valid integer offsets into the label arrays.

## Filling the template

See `template.md` for all six JSON skeletons. See `examples/sample.md` for a worked example per variant.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

The validator enforces, per variant: required fields, count limits (2–12 bars, 2–6 slices, 4–30 points, 3–6 stages, 3–7 axes, 1–3 entities), unique ids, value-range rules (bar ≥ 0, pie > 0, funnel > 0 and non-increasing, radar values in [0..maxValue], heatmap indexes in range and values in [0..maxValue]), and that no `[bracketed placeholders]` survived from the template.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. No HTML. The host renders it directly with the typed React chart component.
