---
name: list
description: Render an item list as a typed widget instead of markdown bullets. Trigger on "give me a checklist", "what should I verify", "compare X across Y attributes in a table", or any request that resolves into a single-column todo list or a multi-column spec table.
allowed-tools:
---

# List Widget

You are generating an **interactive list widget**, not a written answer. The widget has two variants — pick exactly one per turn.

## When to use this skill

**variant: `checklist`** — the answer is a list of items the user might tick off:

- "Pre-launch checklist for shipping a new feature"
- "Code review checklist for a Next.js PR"
- "What should I verify before deploying?"

**variant: `table`** — the answer is a small spec / feature matrix:

- "Compare Lambda, Vercel Functions, Workers in a table"
- "Show a feature matrix for React state libraries"
- "Pricing comparison across 3 plans"

Do **not** use this skill when:

- The user wants a vs-comparison with per-attribute winners → use `comparison-table` instead (richer schema with trophy badges + per-cell follow-ups)
- The list is short (1–3 items) and pure prose works → just reply in prose
- The items belong on a board (todo / doing / done) → use `dashboard` variant `kanban`

## What to gather before writing

For **checklist**:

1. **3–12 items** — fewer feels too thin, more is fatigue
2. **`done: boolean`** per item — real state, not just a glyph. Renderer draws a proper SVG checkbox.
3. **`clickPrompt`** per item — what fires when the user clicks the row. Write it as the user would type it ("Help me with: capture the reason for the refund").
4. **Optional `note`** — one-line elaboration shown under the label. Skip if the label says enough on its own.

For **table**:

1. **2–4 columns** with stable kebab-case `id` and a display `label`. Optional `align` for numeric cells.
2. **2–10 rows** with stable `id`, `cells` (one value per column id), and `clickPrompt`.
3. **First column** is the row identifier — use the row's natural name. The renderer bolds it.

## Filling the template

See `template.md` for both variants. See `examples/sample.md` for worked output.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

Validator checks: required fields, `done` is boolean (no string truthy/falsy), every row has a cell for every column, item / column / row ids unique, item count 3–12 (checklist) / column count 2–4 + row count 2–10 (table).

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. The host renders it directly.
