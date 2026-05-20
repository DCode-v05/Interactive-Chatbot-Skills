---
name: dashboard
description: Render composite tile / card surfaces (KPI grids, person profile cards, static kanban boards, tiered pricing plans) as a typed widget instead of an HTML blob. Trigger when the whole answer IS one of the four variants — e.g. "show me a SaaS KPI scorecard", "make a profile card for Jane Doe", "draw a kanban for these three columns", "render a 3-tier pricing plan".
allowed-tools:
---

# Dashboard Widget

You are generating an **interactive dashboard widget**, not a written answer. Output is JSON the Mini-BAP host renders inside the chat bubble. Each per-unit element (tile, card, CTA button) carries its own pre-baked click prompt that fires as the next user message when clicked. The widget has four variants — pick exactly one per turn.

## When to use this skill

**variant: `kpi`** — the answer is a small grid of metric tiles:

- "Show me a SaaS scorecard: MRR, churn, ARPU, NPS"
- "Build a KPI dashboard for our support team"
- "Summarize this quarter as 4 tiles"

**variant: `profile`** — the answer is a single-person summary card:

- "Render a profile card for Jane Doe, Eng Lead"
- "Make me a contact card for our new hire"
- "Show this user's stats card"

**variant: `kanban`** — the answer is a static multi-column task board (no drag-and-drop):

- "Draw a kanban with Backlog / In progress / Done"
- "Show these 8 tasks as a 3-column board"
- "Lay out our sprint as a kanban"

**variant: `pricing`** — the answer is tiered SaaS plans with one "Recommended" tier:

- "Render Free / Pro / Enterprise pricing"
- "Show a 3-tier pricing plan"
- "Make a pricing table with Pro recommended"

Do **not** use this skill when:

- The list belongs on a single column with checkboxes → use `list` variant `checklist`
- The answer is a vs-comparison with per-attribute winners → use `comparison-table`
- The whole answer is a single status line → use `notice` variant `banner`
- The answer is a 3–5 pill menu → use `chips`

## What to gather before writing

For **kpi**:

1. **3–6 tiles** — under 3 feels sparse, over 6 looks noisy.
2. **`metric`** — the small uppercase label (e.g. "MRR", "Churn"). Keep it short.
3. **`value`** — the big display number including units ("$42K", "4.2%", "32 min").
4. **`deltaText` + `deltaDirection`** (optional but recommended) — e.g. `"+12% MoM"` with direction `"up"`. The renderer draws a real SVG arrow icon (green up / red down / gray flat) — never emit Unicode `↑` `↓`.
5. **`clickPrompt`** per tile — the literal next-message string when the tile is clicked ("Drill into: MRR").

For **profile**:

1. **`name`** + **`initials`** (1–3 letters) — the renderer draws a circular BAP-red avatar with the initials in white.
2. **`role`** (optional) — title / company shown under the name.
3. **`stats`** (0–4) — small `label` + bold `value` pairs (e.g. `{ label: "TENURE", value: "3 yr" }`).
4. **`action`** — the ONE primary CTA button. Renderer wires `data-bap-prompt={action.prompt}` onto the button.

For **kanban**:

1. **2–4 columns** with stable kebab-case `id` and a display `name` ("Backlog", "In progress", "Done").
2. **1–6 cards per column** with stable kebab-case `id` (unique GLOBALLY across columns), `title`, optional `meta` line ("Due Fri", "P1"), and a `clickPrompt`.
3. The renderer shows the card count in each column header — no need to embed it in the name.

For **pricing**:

1. **3 or 4 tiers**, exactly ONE with `recommended: true`. The validator rejects 0 or 2+ recommended.
2. **`name`** in UPPERCASE (e.g. "FREE", "PRO", "ENTERPRISE"). **`price`** as a display string ("$0", "$29", "Custom"). Optional **`priceSuffix`** ("/mo", "/seat/yr").
3. **`features`** (2–8) per tier with `included: boolean`. The renderer draws a real SVG check icon for included and an SVG × icon for excluded — never emit Unicode `✓` / `✗`.
4. **`cta`** per tier — `label` + `prompt`. Enterprise typically routes to "Contact sales".

## Filling the template

Open `template.md`, copy the JSON skeleton for your chosen variant, fill the `[bracketed placeholders]`. See `examples/sample.md` for a worked vignette per variant.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

The validator checks: parses, no unfilled placeholders, required fields, `widget === "dashboard"`, variant-specific shape, ID uniqueness within scope, per-variant count bounds (`kpi`: 3–6 tiles; `kanban`: 2–4 columns × 1–6 cards each with globally unique card ids; `pricing`: 3 or 4 tiers with exactly one `recommended: true`; `profile`: `initials` 1–3 chars, 0–4 stats).

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. The host renders the JSON directly into the chat bubble — anything else breaks the render.
